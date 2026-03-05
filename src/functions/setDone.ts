import "reflect-metadata";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { container } from "tsyringe";
import TodoService from "../services/todo.service";

const todoService = container.resolve(TodoService);

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
) => {
  const id = event.pathParameters!.id as string;
  const { isDone } = JSON.parse(event.body!);

  return todoService.setDone!(id, isDone).then((res) => ({
    statusCode: 201,
    body: JSON.stringify(res),
  }));
};
