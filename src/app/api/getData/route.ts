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
		const [inviterId, visitorId, language] = value.split('_');

		// キャッシュテーブルのデータ取得
		const cacheTableName = `${process.env.NEXT_PUBLIC_DYNAMO_PREFIX}-cache`;
		const cacheParams = {
			TableName: cacheTableName,
			Key: { id: 'sakura' },
			ProjectionExpression: `#lang`,
			ExpressionAttributeNames: {
				'#lang': language,
			},
		};

		// テンポラリテーブル削除
		/*
		const deleteParams = {
			TableName: `mySnap-tmp`,
			Key: { id },
		};*/

		// mySnap-sakura から default と inviterId を取得
		const sakuraTableName = `mySnap-sakura`;
		const sakuraBatchParams = {
			RequestItems: {
				[sakuraTableName]: {
					Keys: [{ id: 'default' }, { id: inviterId }],
				},
			},
		};

		// 並列で非同期処理を実行
		//const [cacheData, _, sakuraData] = await Promise.all([
		const [cacheData, sakuraData] = await Promise.all([
			dynamoDB.get(cacheParams).promise(), // キャッシュテーブル取得
			//dynamoDB.delete(deleteParams).promise(), // テンポラリテーブル削除
			dynamoDB.batchGet(sakuraBatchParams).promise(), // mySnap-sakura データ取得
		]);

		// キャッシュデータの処理
		const text = cacheData.Item ? cacheData.Item[language] : null;

		// sakura データの処理
		const sakuraItems = sakuraData.Responses?.[sakuraTableName] || [];
		const defaultItem = sakuraItems.find((item) => item.id === 'default') || {};
		const inviterItem = sakuraItems.find((item) => item.id === inviterId) || {};

		console.log('defaultItem', defaultItem);
		console.log('inviterItem', inviterItem);
		// default のデータを inviterId のデータでオーバーライド
		const mergedColab: Colab = {
			inviterId,
			visitorId,
			language,
			userId: inviterItem.userId || defaultItem.userId || '',
			content: inviterItem.content || defaultItem.content || '',
			contentTmp: inviterItem.contentTmp || defaultItem.contentTmp || '',
			textJP: inviterItem.textJP || defaultItem.textJP || '',
			textEN: inviterItem.textEN || defaultItem.textEN || '',
			textLpJP: inviterItem.textLpJP || defaultItem.textLpJP || '',
			textLpEN: inviterItem.textLpEN || defaultItem.textLpEN || '',
			textMedalJP: inviterItem.textMedalJP || defaultItem.textMedalJP || '',
			textMedalEN: inviterItem.textMedalEN || defaultItem.textMedalEN || '',
			postDate: inviterItem.postDate || defaultItem.postDate || '',
		};


		console.log('mergedColab', mergedColab);

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
