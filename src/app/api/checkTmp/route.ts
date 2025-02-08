import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';

AWS.config.update({
	region: process.env.AWS_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { id } = body;
		const tmp = {
			TableName: `mySnap-tmp`,
			KeyConditionExpression: '#id = :idValue',
			ExpressionAttributeNames: { '#id': 'id' },
			ExpressionAttributeValues: { ':idValue': id },
		};
		const tmpData = await dynamoDB.query(tmp).promise();
		const tmpExists = tmpData.Items && tmpData.Items.length > 0;
		if (!tmpData.Items || !tmpExists) {
			return NextResponse.json(
				{ success: true, message: 'page is loaded' },
				{ status: 404 }
			);
		}

		// テンポラリテーブルの最初のアイテムを取得
		const value = tmpData.Items[0]?.value || '';
		const [creatorId, visitorId, language] = value.split('_');

		// キャッシュテーブルからデータを取得
		const cacheTableName = `${process.env.NEXT_PUBLIC_DYNAMO_PREFIX}-cache`;
		const cacheParams = {
			TableName: cacheTableName,
			Key: { id: 'sakura' },
			ProjectionExpression: `#lang`,
			ExpressionAttributeNames: {
				'#lang': language,
			},
		};
		const cacheData = await dynamoDB.get(cacheParams).promise();
		const text = cacheData.Item ? cacheData.Item[language] : null;

		// テンポラリテーブルからデータを削除
		/*const deleteParams = {
			TableName: `mySnap-tmp`,
			Key: { id },
		};
		await dynamoDB.delete(deleteParams).promise(); // アイテムを削除
		*/
		return NextResponse.json({
			success: true,
			creatorId,
			visitorId,
			language,
			text,
		});
	} catch {
		return NextResponse.json(
			{ success: false, message: 'Internal server error.' },
			{ status: 500 }
		);
	}
}
