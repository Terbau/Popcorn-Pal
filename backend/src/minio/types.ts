import type { UploadedObjectInfo } from "minio/dist/main/internal/type";

export interface UploadInfo {
  objectInfo: UploadedObjectInfo;
  publicUrl: string;
}
