import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import { Colab } from '@/lib/types/Colab';
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

		// テンポラリテーブルからデータを取得
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
		const [creatorId, visitorId, language,inviter,pageUserIds] = value.split('_');

		// テンポラリテーブル削除
		const deleteParams = {
			TableName: `mySnap-tmp`,
			Key: { id },
		};

		// mySnap-sakura から default と creatorId を取得
		const sakuraTableName = `mySnap-sakura`;
		const sakuraBatchParams = {
			RequestItems: {
				[sakuraTableName]: {
					Keys: [{ id: 'default' }, { id: creatorId }],
				},
			},
		};

		// 並列で非同期処理を実行
		const [, sakuraData] = await Promise.all([
			dynamoDB.delete(deleteParams).promise(),
			dynamoDB.batchGet(sakuraBatchParams).promise(),
		]);

		// sakura データの処理
		const sakuraItems = sakuraData.Responses?.[sakuraTableName] || [];
		const defaultItem = sakuraItems.find((item) => item.id === 'default') || {};
		const creatorIdItem = sakuraItems.find((item) => item.id === creatorId) || {};

		const mergedColab: Colab = {
			creatorId,
			visitorId,
			language,
			userId: creatorIdItem.userId || defaultItem.userId || '',
			content: creatorIdItem.content || defaultItem.content || '',
			contentTmp: creatorIdItem.contentTmp || defaultItem.contentTmp || '',
			textJP: creatorIdItem.textJP || defaultItem.textJP || '',
			textEN: creatorIdItem.textEN || defaultItem.textEN || '',
			textLpJP: creatorIdItem.textLpJP || defaultItem.textLpJP || '',
			textLpEN: creatorIdItem.textLpEN || defaultItem.textLpEN || '',
			textMedalJP: creatorIdItem.textMedalJP || defaultItem.textMedalJP || '',
			textMedalEN: creatorIdItem.textMedalEN || defaultItem.textMedalEN || '',
			postDate: creatorIdItem.postDate || defaultItem.postDate || '',
			inviter,
			pageUserIds,
		};

		// 結果を返す
		return NextResponse.json({
			success: true,
			colab: mergedColab,
		});
	} catch (error) {
		console.error('Error:', error);
		return NextResponse.json(
			{ success: false, message: 'Internal server error.' },
			{ status: 500 }
		);
	}
}
