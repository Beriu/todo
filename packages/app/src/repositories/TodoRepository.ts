import { Todo } from "../types";

export default class TodoRepository {

    private apiEndpoint: string = '';

    constructor(apiUrl: string) {
        this.apiEndpoint = `${apiUrl}/todos`;
    }

    async find(id: string) {
        const response = await fetch(`${this.apiEndpoint}/${id}`, {
            method: 'GET', 
            mode: 'cors', 
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    }

    async getAll() {
        const response = await fetch(this.apiEndpoint, {
            method: 'GET', 
            mode: 'cors', 
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    }

    async update(dto: Todo) {
        const response = await fetch(`${this.apiEndpoint}/${dto.id}`, {
            method: 'PUT', 
            mode: 'cors', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto),
        });
        return response.json();
    }

    async delete(id: string) {
        const response = await fetch(`${this.apiEndpoint}/${id}`, {
            method: 'DELETE', 
            mode: 'cors', 
            headers: { 'Content-Type': 'application/json' },
        });
        return response;
    }

    async create(content: string) {
        const response = await fetch(this.apiEndpoint, {
            method: 'POST', 
            mode: 'cors', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        });
        return response.json();
    }
}