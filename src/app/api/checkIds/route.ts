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
		const { visitorId, inviterId } = body;

		console.log('Request Body:', body);

		if (!visitorId || !inviterId) {
			return NextResponse.json(
				{ message: 'Missing required fields: visitorId and inviterId' },
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
			ExpressionAttributeValues: { ':idValue': inviterId },
		};

		const inviterData = await dynamoDB.query(inviterParams).promise();

		const visitorExists = visitorData.Items && visitorData.Items.length > 0;
		const inviterExists = inviterData.Items && inviterData.Items.length > 0;

		if (!visitorExists || !inviterExists) {
			return NextResponse.json(
				{ success: false, message: 'Neither visitorId nor inviterId found in the table.' },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			success: true,
			visitorExists,
			inviterExists,
		});
	} catch (error) {
		console.error('Error querying DynamoDB:', error);
		return NextResponse.json(
			{ message: 'Internal Server Error', error: error.message },
			{ status: 500 }
		);
	}
}
