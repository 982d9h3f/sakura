// app/utils/crypto.ts

/**
 * Convert a Base64 string to a Uint8Array.
 * @param base64 - The Base64 encoded string.
 * @returns Uint8Array representation of the string.
 */
export function base64ToUint8Array(base64: string): Uint8Array {
	const binaryString = atob(base64);
	const length = binaryString.length;
	const bytes = new Uint8Array(length);
	for (let i = 0; i < length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return bytes;
}
/**
 * Retrieve the fixed encryption key from the environment.
 * @returns A CryptoKey object derived from the fixed key.
 */
/**
 * Encrypt a file using the fixed encryption key.
 * @param file - The file to encrypt.
 * @returns A Promise resolving to a Blob containing the encrypted data.
 */
export async function encryptFile(file: File): Promise<Blob> {
	const key = await getFixedEncryptionKey();
	const iv = crypto.getRandomValues(new Uint8Array(12)); // ランダムIV生成
	const fileData = await file.arrayBuffer();

	// ファイルデータを暗号化
	const encryptedData = await crypto.subtle.encrypt(
		{
			name: 'AES-GCM',
			iv,
		},
		key,
		fileData
	);

	// シグネチャを追加
	const signature = new TextEncoder().encode('ENC:'); // 4バイトのシグネチャ
	const combinedData = new Uint8Array(signature.byteLength + iv.byteLength + encryptedData.byteLength);
	combinedData.set(signature, 0); // シグネチャを先頭に追加
	combinedData.set(iv, signature.byteLength); // 次にIVを追加
	combinedData.set(new Uint8Array(encryptedData), signature.byteLength + iv.byteLength); // 暗号化データを追加

	return new Blob([combinedData], { type: file.type });
}
export async function getFixedEncryptionKey(): Promise<CryptoKey> {
	const base64Key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
	if (!base64Key) {
		throw new Error('Encryption key is missing in .env');
	}

	const rawKey = base64ToUint8Array(base64Key);

	// Import the key as an AES-GCM key
	return crypto.subtle.importKey(
		'raw',
		rawKey,
		{ name: 'AES-GCM' },
		false, // `extractable` should be false for security
		['encrypt', 'decrypt']
	);
}

export async function isEncrypted(blob: Blob): Promise<boolean> {
	const arrayBuffer = await blob.arrayBuffer();
	const uint8Array = new Uint8Array(arrayBuffer.slice(0, 4)); // 先頭4バイトを取得
	const signature = new TextDecoder().decode(uint8Array);
	return signature === 'ENC:';
}
/**
 * Decrypt an encrypted Blob using the fixed encryption key.
 * @param encryptedBlob - The encrypted Blob.
 * @returns A Promise resolving to a Blob containing the decrypted data.
 */
export async function decryptFile(encryptedBlob: Blob): Promise<Blob> {
	// 暗号化済みかチェック
	const isEncryptedFile = await isEncrypted(encryptedBlob);
	if (!isEncryptedFile) {
		// 暗号化されていなければそのまま返す
		return encryptedBlob;
	}

	const key = await getFixedEncryptionKey();
	const encryptedData = await encryptedBlob.arrayBuffer();

	// シグネチャをスキップしてIVとデータを抽出
	const iv = new Uint8Array(encryptedData.slice(4, 16)); // 4バイト目から12バイト分がIV
	const data = encryptedData.slice(16); // 16バイト目以降が暗号化データ

	// データを復号
	const decryptedData = await crypto.subtle.decrypt(
		{
			name: 'AES-GCM',
			iv,
		},
		key,
		data
	);

	return new Blob([decryptedData], { type: encryptedBlob.type });
}

/**
 * Fetch and decrypt a list of files from a fixed directory.
 * @param fileNames - An array of file names to fetch and decrypt.
 * @returns A Promise resolving to an array of decrypted Blobs.
 */
export async function fetchAndDecryptFiles(fileNames: string[]): Promise<Blob[]> {
	// 固定のベースURL
	const baseUrl = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/sakura/encrypto`;

	try {
		// ファイルごとにfetchとdecrypt処理を並列実行
		const decryptedBlobs = await Promise.all(
			fileNames.map(async (fileName) => {
				const fileUrl = `${baseUrl}/${fileName}`;
				const response = await fetch(fileUrl);

				if (!response.ok) {
					console.error(`Failed to fetch file: ${fileUrl}`);
					throw new Error(`Failed to fetch file: ${fileUrl}`);
				}

				// Fetch the encrypted file as a Blob
				const encryptedBlob = await response.blob();

				// Decrypt the file using decryptFile function
				const decryptedBlob = await decryptFile(encryptedBlob);

				return decryptedBlob; // decrypted Blob を返す
			})
		);

		return decryptedBlobs; // 全ての Blob を含む配列を返す
	} catch (error) {
		console.error('Error while fetching or decrypting files:', error);
		throw new Error('Failed to fetch and decrypt files');
	}
}

/*
export async function fetchAndDecryptFiles(fileNames: string[]): Promise<Blob[]> {
	// 固定のベースURL
	const baseUrl = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/sakura/encrypto`;

	try {
		const decryptedBlobs: Blob[] = [];

		for (const fileName of fileNames) {
			const fileUrl = `${baseUrl}/${fileName}`;
			const response = await fetch(fileUrl);

			if (!response.ok) {
				console.error(`Failed to fetch file: ${fileUrl}`);
				continue;
			}

			// Fetch the encrypted file as a Blob
			const encryptedBlob = await response.blob();

			// Decrypt the file using decryptFile function
			const decryptedBlob = await decryptFile(encryptedBlob);

			// Add the decrypted blob to the result list
			decryptedBlobs.push(decryptedBlob);
		}

		return decryptedBlobs;
	} catch (error) {
		console.error('Error while fetching or decrypting files:', error);
		throw new Error('Failed to fetch and decrypt files');
	}
}*/
