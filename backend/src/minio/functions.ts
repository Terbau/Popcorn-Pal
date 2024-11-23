import type { FileUpload } from "graphql-upload-minimal";
import { MINIO_ENDPOINT, minioClient } from "./index.js";
import sanitize from "sanitize-filename";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";
import type { UploadInfo } from "./types";
import { PassThrough } from "node:stream";

export const AVATAR_BUCKET = "avatars";
export const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
export const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

export const uploadAvatar = async (
  file: Promise<FileUpload>,
): Promise<UploadInfo> => {
  return await uploadFile(AVATAR_BUCKET, file);
};

export const uploadFile = async (
  bucket: string,
  file: Promise<FileUpload>,
): Promise<UploadInfo> => {
  const {
    createReadStream,
    mimetype,
    filename: unsanitizedFilename,
  } = await file;
  const sanitizedFilename = sanitize(unsanitizedFilename);

  if (!sanitizedFilename) {
    throw new Error("Invalid filename");
  }

  const fileExtension = path.extname(sanitizedFilename).toLowerCase();

  if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
    throw new Error("Invalid file type");
  }

  if (!ALLOWED_MIME_TYPES.includes(mimetype)) {
    throw new Error("Invalid file type");
  }

  const newFileName = `${uuidv4()}${fileExtension}`;

  const fileStream = createReadStream();
  const chunks = [];
  let fileSize = 0;

  for await (const chunk of fileStream) {
    chunks.push(chunk);
    fileSize += chunk.length;
    if (fileSize > MAX_FILE_SIZE) {
      throw new Error("File exceeds the maximum size of 1MB");
    }
  }

  // Create a new stream from the chunks
  const buffer = Buffer.concat(chunks);
  const sizeChecker = new PassThrough();
  sizeChecker.end(buffer);

  const objectInfo = await minioClient.putObject(
    bucket,
    newFileName,
    sizeChecker,
    undefined,
    {
      "Content-Type": mimetype,
    },
  );

  return {
    objectInfo,
    publicUrl: `http://${MINIO_ENDPOINT}/${bucket}/${newFileName}`,
  };
};
