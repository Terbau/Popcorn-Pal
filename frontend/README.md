[<- To main README.md](../README.md)

# Frontend

This is the frontend for the app PopcornPal.

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
npm run dev
```

## How to generate graphql types

When you make changes to the graphql schema in the backend, or when you create or modify a query/mutation in the frontend, you need to regenerate the types for the frontend. This is for typescript to understand and provide type safety and intellisense. You can regenerate types using the following command in the `/frontend` folder:

```
npm run generate
```