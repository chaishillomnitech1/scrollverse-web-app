/**
 * Massive.com S3-compatible file storage helper
 * Uses the AWS SDK S3 client pointed at Massive's endpoint.
 * Credentials: MASSIVE_API_KEY (access key), MASSIVE_BUCKET_ID (bucket), MASSIVE_ENDPOINT
 */
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const MASSIVE_ENDPOINT = process.env.MASSIVE_ENDPOINT ?? "https://files.massive.com";
const MASSIVE_API_KEY = process.env.MASSIVE_API_KEY ?? "";
const MASSIVE_BUCKET_ID = process.env.MASSIVE_BUCKET_ID ?? "flatfiles";

// Massive uses the API key as both access key and secret key
const massiveClient = new S3Client({
  endpoint: MASSIVE_ENDPOINT,
  region: "us-east-1", // Massive requires a region string even if not used
  credentials: {
    accessKeyId: MASSIVE_API_KEY,
    secretAccessKey: MASSIVE_API_KEY,
  },
  forcePathStyle: true, // Required for S3-compatible endpoints
});

/**
 * Upload a file to Massive.com storage
 */
export async function massivePut(
  key: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream"
): Promise<{ key: string; url: string }> {
  await massiveClient.send(
    new PutObjectCommand({
      Bucket: MASSIVE_BUCKET_ID,
      Key: key,
      Body: data,
      ContentType: contentType,
    })
  );
  const url = `${MASSIVE_ENDPOINT}/${MASSIVE_BUCKET_ID}/${key}`;
  return { key, url };
}

/**
 * Get a presigned URL for a file in Massive.com storage (expires in 1 hour by default)
 */
export async function massiveGet(
  key: string,
  expiresIn = 3600
): Promise<{ key: string; url: string }> {
  const command = new GetObjectCommand({
    Bucket: MASSIVE_BUCKET_ID,
    Key: key,
  });
  const url = await getSignedUrl(massiveClient, command, { expiresIn });
  return { key, url };
}

/**
 * Delete a file from Massive.com storage
 */
export async function massiveDelete(key: string): Promise<void> {
  await massiveClient.send(
    new DeleteObjectCommand({
      Bucket: MASSIVE_BUCKET_ID,
      Key: key,
    })
  );
}

/**
 * List files in Massive.com storage with optional prefix
 */
export async function massiveList(
  prefix = "",
  maxKeys = 100
): Promise<Array<{ key: string; size: number; lastModified: Date }>> {
  const result = await massiveClient.send(
    new ListObjectsV2Command({
      Bucket: MASSIVE_BUCKET_ID,
      Prefix: prefix,
      MaxKeys: maxKeys,
    })
  );
  return (result.Contents ?? []).map((obj) => ({
    key: obj.Key ?? "",
    size: obj.Size ?? 0,
    lastModified: obj.LastModified ?? new Date(),
  }));
}
