import "reflect-metadata";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { container } from "tsyringe";
import middy from "middy";
import TodoService from "../services/todo.service";
import errorHandler from "../utils/errorHandler";
import validator from "../utils/validator";
import { todoSchema } from "../utils/validationRules";

const todoService = container.resolve(TodoService);

export const handler = middy(
  async (event: APIGatewayProxyEvent, context: Context) => {
    const data = JSON.parse(event.body!);

    return todoService.save!(data)
      .then((res) => ({
        statusCode: 201,
        body: JSON.stringify(res),
      }))
      .catch((err: Error) => ({
        statusCode: 500,
        body: JSON.stringify(err.message),
      }));
  }
)
  .use(validator(todoSchema))
  .use(errorHandler());
