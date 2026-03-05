import "reflect-metadata";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { container } from "tsyringe";
import TodoService from "../services/todo.service";

const todoService = container.resolve(TodoService);

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
) => {
  return todoService.findAll!().then((res) => ({
    statusCode: 200,
    body: JSON.stringify(res),
  }));
};
