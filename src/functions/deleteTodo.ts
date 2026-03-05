// import "reflect-metadata";
// import { APIGatewayProxyEvent, Context } from "aws-lambda";
// import { container } from "tsyringe";
// import TodoService from "../services/todo.service";
// import middy from "middy";
// import errorHandler from "../utils/errorHandler";

// const todoService = container.resolve(TodoService);

// export const handler = middy(
//   async (event: APIGatewayProxyEvent, context: Context) => {
//     const id: string = event.pathParameters!.id as string;

//     return todoService.delete!(id)
//       .then(() => ({
//         statusCode: 200,
//         body: JSON.stringify("Deleted"),
//       }))
//       .catch((err: any) => {
//         const error = JSON.parse(err.message);
//         return {
//           statusCode: error.error.statusCode,
//           body: JSON.stringify({
//             error: error.error.message,
//           }),
//         };
//       });
//   }
// ).use(errorHandler());
