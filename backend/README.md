[<- To main README.md](../README.md)

# Backend

This is the backend for the app PopcornPal.

## Prerequisites

```
Node.js v22.5+
npm v10.8+.
```

## Installation

```
npm install
```

## Running the application

```
npm start
```

## How to generate graphql types

The backend is responsible for generating the graphql typescript types for both the frontend and the backend. Running the command below will automatically copy the types into the frontend package.

```
npm run codegen
```