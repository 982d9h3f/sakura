// hooks/useDecryptedImages.ts
import { useEffect, useState } from 'react';
import { decryptFile } from '../utils/crypto';  // decryptFile 関数のインポート

interface DecryptedImage {
	name: string;
	url: string;
}

export function useDecryptedImages() {
	const [images, setImages] = useState<DecryptedImage[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// 固定の画像ファイル名リスト（実際には API などで取得）
	const encryptedFileNames = ['image1.webp.enc', 'image2.webp.enc'];
	const CLOUDFRONT_BASE_URL = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;
	const IMAGE_DIRECTORY = 'sakura/encript';

	useEffect(() => {
		async function fetchAndDecryptImages() {
			try {
				const decryptedImages: DecryptedImage[] = [];

				for (const fileName of encryptedFileNames) {
					const fileUrl = `${CLOUDFRONT_BASE_URL}/${IMAGE_DIRECTORY}/${fileName}`;
					const response = await fetch(fileUrl);
					if (!response.ok) {
						console.error(`Failed to fetch ${fileUrl}`);
						continue;
					}
					const encryptedBlob = await response.blob();
					const decryptedBlob = await decryptFile(encryptedBlob);
					// ブラウザ上で表示するための URL を生成
					const decryptedUrl = URL.createObjectURL(decryptedBlob);
					// 元のファイル名から拡張子を除去（必要に応じて変更）
					const originalName = fileName.replace('.enc', '');
					decryptedImages.push({ name: originalName, url: decryptedUrl });
				}

				setImages(decryptedImages);
			} catch (err: any) {
				console.error(err);
				setError('Failed to load images');
			} finally {
				setLoading(false);
			}
		}

		fetchAndDecryptImages();
	}, []);

	return { images, loading, error };
}
