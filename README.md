# Serverless Todo API

A serverless todo application built with Node.js, TypeScript, and AWS Lambda using the Serverless Framework.

## Features

- Create, read, update, and delete todos
- Mark todos as done/undone
- Built with TypeScript for type safety
- DynamoDB for data persistence
- API Gateway caching enabled
- Dependency injection with TSyringe
- Input validation with Joi

## Prerequisites

- Node.js (v20.x)
- AWS CLI configured
- Serverless Framework CLI

## Installation

```bash
npm install
```

## Development

Start the local development server:

```bash
npm run start:dev
```

This will start the serverless offline plugin on `http://localhost:3000`.

## Deployment

Deploy to AWS:

```bash
serverless deploy
```

Deploy to a specific stage:

```bash
serverless deploy --stage prod
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/`      | Create a new todo |
| GET    | `/`      | Get all todos |
| GET    | `/{id}`  | Get todo by ID |
| PUT    | `/{id}`  | Update todo |
| PATCH  | `/{id}/done` | Mark todo as done/undone |

### Request/Response Examples

#### Create Todo
```bash
POST /
{
  "title": "Learn Serverless",
  "description": "Build a todo app with AWS Lambda",
  "isDone": false
}
```

#### Update Todo
```bash
PUT /{id}
{
  "title": "Updated title",
  "description": "Updated description",
  "isDone": true
}
```

## Project Structure

```
src/
├── functions/          # Lambda function handlers
├── interfaces/         # TypeScript interfaces
├── models/            # Data models
├── repositories/      # Data access layer
├── services/          # Business logic layer
└── utils/             # Utility functions
resources/             # CloudFormation resources
```

## Technologies Used

- **Runtime**: Node.js 20.x
- **Language**: TypeScript
- **Framework**: Serverless Framework
- **Database**: AWS DynamoDB
- **API**: AWS API Gateway
- **Validation**: Joi
- **DI Container**: TSyringe
- **Middleware**: Middy

## Environment Variables

- `DYNAMODB_TABLE_NAME`: DynamoDB table name (auto-configured)

## License

ISC