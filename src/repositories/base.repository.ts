import { v4 } from "uuid";
import {
  DeleteItemCommand,
  GetItemCommand,
  GetItemInput,
  PutItemCommand,
  PutItemInput,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const dbClient: DynamoDBClient = new DynamoDBClient({});

export default abstract class BaseRepository {
  constructor() {}

  createEntity = async (data: any): Promise<any> => {
    data.id = v4();

    const params: PutItemInput = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: marshall(data),
    };
    await dbClient.send(new PutItemCommand(params));
    return data;
  };

  updateEntity = async (id: string, data: any): Promise<any> => {
    console.log(data);
    console.log(id);
    data.id = id;
    const params: PutItemInput = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: marshall(data),
    };

    await dbClient.send(new PutItemCommand(params));
    return data;
  };
  // updateEntity = async (id: string, data: any): Promise<any> => {
  //   const objKeys = Object.keys(data);
  //   const params: UpdateItemCommandInput = {
  //     TableName: process.env.DYNAMODB_TABLE_NAME,
  //     Key: marshall({ id }),
  //     UpdateExpression: `SET ${objKeys
  //       .map((_, index) => `#key${index} = :value${index}`)
  //       .join(", ")}`,
  //     ExpressionAttributeNames: objKeys.reduce(
  //       (acc, key, index) => ({
  //         ...acc,
  //         [`#key${index}`]: key,
  //       }),
  //       {}
  //     ),
  //     ExpressionAttributeValues: marshall(
  //       objKeys.reduce(
  //         (acc, key, index) => ({
  //           ...acc,
  //           [`:value${index}`]: data[key],
  //         }),
  //         {}
  //       )
  //     ),
  //   };
  //   await dbClient.send(new UpdateItemCommand(params));
  //   data.id = id;
  //   return data;
  // };

  findAllEntity = async (): Promise<any> => {
    const { Items } = await dbClient.send(
      new ScanCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
      } as ScanCommandInput)
    );

    const data = Items?.map((item: any) => unmarshall(item)) || [];
    return data;
  };

  findEntityById = async (id: string): Promise<any> => {
    const params: GetItemInput = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ id }),
    };

    const { Item } = await dbClient.send(new GetItemCommand(params));
    if (!Item) {
      throw Error(
        JSON.stringify({
          error: {
            statusCode: 404,
            message: `Entity with ID ${id} not found`,
          },
        })
      );
    }

    return unmarshall(Item!);
  };

  deleteEntity = async (id: string): Promise<any> => {
    const params: any = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ id }),
    };

    const { Item } = await dbClient.send(new GetItemCommand(params));
    if (!Item) {
      throw Error(
        JSON.stringify({
          error: {
            statusCode: 404,
            message: `Entity with ID ${id} not found`,
          },
        })
      );
    }

    await dbClient.send(new DeleteItemCommand(params));
    return `Entity with ID ${id} deleted`;
  };
}
