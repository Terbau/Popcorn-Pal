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

## Configuration

A `.env` file is needed for running the backend. The contents should be (ofc replacing the password field):

```
DATABASE_URL="postgresql://postgres:password@it2810-21.idi.ntnu.no:5432/prosjekt2"
```

## Running the application (locally)

```
npm start
```

## Running the application on our VM

```
cd /home/bragebau/backend 
pm2 start npm --name "backend" -- run start -- --port 3001
```

## How to generate graphql types

The backend is responsible for generating the graphql typescript types for both the frontend and the backend. Running the command below will automatically copy the types into the frontend package.

```
npm run generate
```