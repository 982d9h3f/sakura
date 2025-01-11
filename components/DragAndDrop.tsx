import React, { useState } from "react";
import { encryptFile } from "../src/utils/crypto"; // crypto.tsのユーティリティをインポート

interface DragAndDropProps {
	onDrop: (files: File[]) => void;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ onDrop }) => {
	const [isDragging, setIsDragging] = useState(false);
	const [downloadLinks, setDownloadLinks] = useState<{ name: string; url: string }[]>([]);

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);

		const files = Array.from(e.dataTransfer.files);
		const imageFiles = files.filter((file) =>
			["image/jpeg", "image/png"].includes(file.type)
		);

		if (imageFiles.length > 0) {
			// WebP変換後に暗号化
			const encryptedFiles = await Promise.all(
				imageFiles.map(async (file) => {
					const webpFile = await convertToWebP(file);
					return encryptFile(webpFile);
				})
			);

			// ダウンロードリンク作成
			const links = encryptedFiles.map((blob, index) => {
				const url = URL.createObjectURL(blob);
				const originalFileName = imageFiles[index].name;
				const encryptedFileName = originalFileName.replace(/\.\w+$/, ".webp");
				return { name: encryptedFileName, url };
			});
			setDownloadLinks(links);

			// 親コンポーネントに渡す
			onDrop(imageFiles);
		}
	};

	const convertToWebP = async (file: File): Promise<File> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = (event) => {
				const img = new Image();
				img.src = event.target?.result as string;
				img.onload = () => {
					const canvas = document.createElement("canvas");
					const ctx = canvas.getContext("2d");
					if (!ctx) {
						reject(new Error("Canvas context not available"));
						return;
					}

					canvas.width = img.width;
					canvas.height = img.height;
					ctx.drawImage(img, 0, 0);

					canvas.toBlob(
						(blob) => {
							if (blob) {
								const webpFile = new File(
									[blob],
									file.name.replace(/\.\w+$/, ".webp"),
									{
										type: "image/webp",
									}
								);
								resolve(webpFile);
							} else {
								reject(new Error("Failed to create WebP blob"));
							}
						},
						"image/webp",
						0.8 // 圧縮品質（0.0 - 1.0）
					);
				};
				img.onerror = (err) => reject(err);
			};

			reader.onerror = (err) => reject(err);
			reader.readAsDataURL(file);
		});
	};

	return (
		<div>
			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				style={{
					border: isDragging ? "2px dashed #4CAF50" : "2px dashed #ccc",
					padding: "20px",
					borderRadius: "5px",
					textAlign: "center",
					background: isDragging ? "#f0fff0" : "#fafafa",
					color: "#333",
				}}
			>
				{isDragging
					? "Drop the file here!"
					: "Drag and drop files here, or click to upload."}
			</div>
			<div style={{ marginTop: "20px" }}>
				{downloadLinks.length > 0 && (
					<div>
						<h3>Download Encrypted Files:</h3>
						<ul>
							{downloadLinks.map((link, index) => (
								<li key={index}>
									<a href={link.url} download={link.name}>
										Download {link.name}
									</a>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default DragAndDrop;
