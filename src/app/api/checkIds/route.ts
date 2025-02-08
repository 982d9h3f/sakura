// src/app/api/checkIds/route.ts
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
		const { visitorId, creatorId,lang } = body;
		if (!visitorId || !creatorId || !lang) {
			return NextResponse.json(
				{ message: 'Missing required fields: visitorId and creatorId' },
				{ status: 400 }
			);
		}

		const tableName = `${process.env.NEXT_PUBLIC_DYNAMO_PREFIX}-mypage`;

		const visitorParams = {
			TableName: tableName,
			KeyConditionExpression: '#id = :idValue',
			ExpressionAttributeNames: { '#id': 'id' },
			ExpressionAttributeValues: { ':idValue': visitorId },
		};

		const visitorData = await dynamoDB.query(visitorParams).promise();

		const inviterParams = {
			TableName: tableName,
			KeyConditionExpression: '#id = :idValue',
			ExpressionAttributeNames: { '#id': 'id' },
			ExpressionAttributeValues: { ':idValue': creatorId },
		};

		const inviterData = await dynamoDB.query(inviterParams).promise();

		const visitorExists = visitorData.Items && visitorData.Items.length > 0;
		const inviterExists = inviterData.Items && inviterData.Items.length > 0;

		if (!visitorExists || !inviterExists) {
			return NextResponse.json(
				{ success: false, message: 'Neither visitorId nor creatorId found in the table.' },
				{ status: 404 }
			);
		}

		const cacheTableName = `${process.env.NEXT_PUBLIC_DYNAMO_PREFIX}-cache`;
        const cacheParams = {
            TableName: cacheTableName,
            Key: { id: 'sakura' },
			ProjectionExpression: `#lang`,
			ExpressionAttributeNames: {
				'#lang': lang,
			},
        };

		const cacheData = await dynamoDB.get(cacheParams).promise();
		const text = cacheData.Item ? cacheData.Item[lang] : null; 
		
		return NextResponse.json({
			success: true,
			visitorExists,
			inviterExists,
			text,
		});
	} catch  {	}
}
