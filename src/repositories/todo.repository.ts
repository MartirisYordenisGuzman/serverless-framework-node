import { injectable } from "tsyringe";
import BaseRepository from "./base.repository";
import {
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

const dbClient: DynamoDBClient = new DynamoDBClient({});

@injectable()
export default class TodoRepository extends BaseRepository {
  setDone = async (id: string, isDone: boolean): Promise<string> => {
    console.log(id);
    console.log(isDone);
    const params: UpdateItemCommandInput = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ id }),
      UpdateExpression: "SET #isDone = :isDone",
      ExpressionAttributeNames: {
        "#isDone": "isDone",
      },
      ExpressionAttributeValues: {
        ":isDone": {
          BOOL: isDone,
        },
      },
    };

    await dbClient.send(new UpdateItemCommand(params));

    return `Todo with ID ${id} is done`;
  };
}
