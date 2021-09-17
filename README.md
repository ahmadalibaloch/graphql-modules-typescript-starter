# GraphQL 🍇 Starter with GraphQL Modules 🌿
It is a full fledged 👌 setup using Node.js, Express (Typescript, express-graphql), [GraphQL Modules](https://www.graphql-modules.com/) with other utilities. Graphql Modules give you enterprise grade tooling 😎 for seperation of concern under an application with DI([dependency injection](https://www.graphql-modules.com/docs/di/introduction), services, middlewars and more 🚀). The graphql modules application outputs a single schema for the GraphqlHTTP ([express-graphql](https://graphql.org/graphql-js/express-graphql/) or apollo server).


## Following feature is covered in initial commit for User Entity in HelloWorld
- 📝 Registration
- 🔓 Login & Authentication
- 🔏 Authorization
- 📁 Additional features like winston logger  setup, codegen, tsconfig, API docs generation and HMR with ts-node, nodemon, cors with node.js server setup, and ws inspection for graphql

## Technology Stack
- Node.js 16+ latest ATM(at the moment) 
- Express 4+ latest ATM
- GraphQL Modules 1.4+ latest ATM
- TypeScript 4.4+ latest ATM


## Requirements

[NodeJS](https://nodejs.org/en/)

[Yarn](https://yarnpkg.com/en/)
Yarn is used to manage API server dependencies, so we're going to need that. You can install it using Homebrew (or any of the other methods mentioned in [the install docs](https://yarnpkg.com/lang/en/docs/install/)):



## Getting Started

After cloning go to the directory & then install the dependencies

```
yarn install
```

## Start server

Create your own local ```.env``` file in the top-level directory. Make sure it's formatted like ```sample.env``` with the right credentials. T

Run in development mode

```
yarn dev
```
Run in development mode with node inspect

```
yarn dev-debug

```

Run in production mode

```
yarn prod
```

## Testing

### Manual Testing

Goto [localhost://http://localhost:4000/graphql](http://localhost:4000/graphql) after `yarn dev`

Run a mutation to register user and create JWT token (in HelloWorld it maintains a server side array instead of DB 😂 ),
```
mutation register($input: Register!) {
  register(input: $input) {
    email,
    name,
    token,
    id
  }
}
// variables
{
  "input": {"name": "Hello", "email": "hello@gmail.com", "password": "123"}
}
```

Login with this mutation

```
mutation login($input: Login){
  login(input: $input){
    id,
    name, 
    email
  }
}
// variables
{
  "input": {"email": "hello@gmail.com", "password": "123"}
}
```

### Automated tests
WIP
