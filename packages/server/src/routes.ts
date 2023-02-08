import { Router } from "express";
import TodosController from "./controllers/TodosController";
import { todosRepository } from "./datasource";

const todosController = new TodosController(
    todosRepository
);

const router = Router();

router.get('/todos/:id', todosController.find);
router.get('/todos', todosController.getAll);
router.post('/todos', todosController.create);
router.put('/todos/:id', todosController.update);
router.delete('/todos/:id', todosController.delete);

export default router;
