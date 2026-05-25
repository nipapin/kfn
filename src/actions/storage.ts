import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const endpoint = process.env.S3_URL;
const region = process.env.S3_REGION || "ru-1";
const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_KEY;
const bucket = process.env.S3_BUCKET;
const directory = (process.env.S3_DIRECTORY ?? "").replace(/^\/+|\/+$/g, "");

export const isS3Enabled = Boolean(endpoint && accessKeyId && secretAccessKey && bucket);

let _client: S3Client | null = null;
const getClient = () => {
	if (_client) return _client;
	if (!isS3Enabled) throw new Error("S3 не настроен (нет S3_URL / S3_BUCKET / ключей)");
	_client = new S3Client({
		endpoint,
		region,
		credentials: { accessKeyId: accessKeyId as string, secretAccessKey: secretAccessKey as string },
		forcePathStyle: true
	});
	return _client;
};

const buildKey = (folder: string, filename: string) => {
	const parts = [directory, folder, filename].filter(Boolean);
	return parts.join("/");
};

const buildPublicUrl = (key: string) => {
	const base = (endpoint as string).replace(/\/+$/, "");
	return `${base}/${bucket}/${key}`;
};

export interface S3UploadResult {
	src: string;
	key: string;
}

export const uploadToS3 = async (params: { folder: string; filename: string; body: Buffer; contentType: string }): Promise<S3UploadResult> => {
	const key = buildKey(params.folder, params.filename);
	await getClient().send(
		new PutObjectCommand({
			Bucket: bucket,
			Key: key,
			Body: params.body,
			ContentType: params.contentType,
			ACL: "public-read",
			CacheControl: "public, max-age=31536000, immutable"
		})
	);
	return { src: buildPublicUrl(key), key };
};

export const deleteFromS3 = async (key: string) => {
	await getClient().send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
};

export const getS3PublicHost = () => {
	if (!endpoint) return null;
	try {
		return new URL(endpoint).host;
	} catch {
		return null;
	}
};
