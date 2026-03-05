import { injectable } from "tsyringe";
import Todo from "../models/Todo";
import BaseService from "./base.service";
import TodoRepository from "../repositories/todo.repository";

@injectable()
export default class TodoService extends BaseService<Todo> {
  constructor(private todoRepository: TodoRepository) {
    super(todoRepository);
    delete this.delete;
  }

  async setDone(id: string, isDone: boolean): Promise<any> {
    return await this.todoRepository.setDone(id, isDone);
  }
}
