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
MINIO_ACCESS_KEY="<access key>"
MINIO_SECRET_KEY="<secret key>"
```

## Running the application (locally)

```
npm start
```

## Running the application on our VM

We use github workflows for starting our backend on the VM. In the case that the backend is not working, you can navigate to [this page](https://git.ntnu.no/IT2810-H24/T21-Project-2/actions/workflows/deploy-backend.yml) and click on the `Run workflow` button. This will manually trigger a rebuild and restart of our backend on the VM.

If you need to manually start the backend, connect to the VM and use the following commands:

```
cd /home/bragebau/backend 
pm2 start npm --name "backend" -- run start -- --port 3001
```

## How to generate graphql types

When you make changes to the graphql schema on the backend, you need to regenerate the types. This is for typescript to understand and provide type safety and intellisense. You can regenerate types using the following command in the `/backend` folder.

```
npm run generate
```