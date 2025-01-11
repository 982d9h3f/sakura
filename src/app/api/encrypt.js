//api/encrypt.js

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';
import { base64ToUint8Array, getFixedEncryptionKey } from '../utils/crypto';


/**
 * Convert and encrypt an image from the public folder.
 * @param fileName - The name of the file in the public folder.
 */
export async function convertAndEncryptImage(fileName) {
  try {
    // Publicフォルダの画像パスを取得
    const publicFolder = path.join(process.cwd(), 'public');
    const inputFilePath = path.join(publicFolder, fileName);

    // ファイルが存在するかチェック
    if (!fs.existsSync(inputFilePath)) {
      throw new Error(`File not found: ${inputFilePath}`);
    }

    // WebPへの変換
    const webpBuffer = await sharp(inputFilePath).webp().toBuffer();

    // 暗号化キーの取得
    const key = await getFixedEncryptionKey();

    // IV (初期化ベクトル) の生成
    const iv = crypto.randomBytes(12);

    // 暗号化
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encryptedBuffer = Buffer.concat([cipher.update(webpBuffer), cipher.final()]);
    const authTag = cipher.getAuthTag();

    // 暗号化データにシグネチャとIVを追加
    const signature = Buffer.from('ENC:');
    const finalData = Buffer.concat([signature, iv, authTag, encryptedBuffer]);

    // 暗号化ファイルの保存
    const outputFilePath = path.join(publicFolder, `${path.basename(fileName, path.extname(fileName))}.enc`);
    fs.writeFileSync(outputFilePath, finalData);

    console.log(`Encrypted file created: ${outputFilePath}`);
  } catch (error) {
    console.error('Error converting and encrypting image:', error);
  }
}

// コマンドライン引数からファイル名を取得して実行
(async () => {
  const args = process.argv.slice(2); // コマンドライン引数を取得
  if (args.length === 0) {
    console.error('Usage: node <script-file> <image-file-name>');
    process.exit(1); // エラー終了
  }

  const fileName = args[0]; // 最初の引数をファイル名として使用
  await convertAndEncryptImage(fileName);
})();
