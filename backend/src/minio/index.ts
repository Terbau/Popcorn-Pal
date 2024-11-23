import * as minio from "minio";

if (!process.env.MINIO_ACCESS_KEY || !process.env.MINIO_SECRET_KEY) {
  throw new Error("Missing MINIO_ACCESS_KEY or MINIO_SECRET");
}

const HOST = "it2810-21.idi.ntnu.no";
const PORT = 9000;

export const MINIO_ENDPOINT = `${HOST}:${PORT}`;

export const minioClient = new minio.Client({
  endPoint: HOST,
  port: PORT,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});
