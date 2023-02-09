import { RequestHandler } from "express"
import { Repository } from "typeorm"
import { Todo } from "../models/Todo"

export default class TodoController {

    constructor(private todoRepository: Repository<Todo>) {}

    find: RequestHandler = async (req, res) => {
        try {
            
            const { id } = req.params;

            /** Maybe put this in a middleware */
            if(id.length !== 16) res.status(400).send({ error: 'Invalid id.' });

            const todo = await this.todoRepository.findOne({ where: { id } });
            if(!todo) res.status(404).send({ error: 'Not found.' });
            res.json(todo);
        }catch(error: any) {
            res.status(400).send({ error: error?.message ?? error });
        }
    }

    getAll: RequestHandler = async (req, res) => { 
        try {
            const todos = await this.todoRepository.find();
            res.json(todos);
        }catch(error: any) {
            res.status(400).send({ error: error?.message ?? error });
        }
    }

    create: RequestHandler = async (req, res) => {
        try {
            const { content } = req.body;
            if(!content) res.status(400).send({ error: 'Invalid payload.' });
            const todo = await this.todoRepository.save({ content });
            res.json(todo);
        }catch(error: any) {
            res.status(400).send({ error: error?.message ?? error });
        }
    }

    update: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const dto = req.body;
            const { affected } = await this.todoRepository.update({ id }, dto);
            
            if(affected && affected > 0) {
                res.json(await this.todoRepository.findOne({ where: { id }}));
                return;
            }
            res.status(400).json({ error: 'No updates performed' });
        }catch(error: any) {
            res.status(400).send({ error: error?.message ?? error });
        }
    }

    delete: RequestHandler = async (req, res) => {
        try {
            
            const { id } = req.params;
            const todo = await this.todoRepository.delete({ id });
            res.status(200).end();
        }catch(error: any) {
            res.status(400).send({ error: error?.message ?? error });
        }
    }
}