import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';

AWS.config.update({
	region: process.env.AWS_REGION!,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	httpOptions: {
		timeout: 1000,
	},
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const botUserAgents: RegExp[] = [
	/Googlebot/i,
	/Bingbot/i,
	/Yahoo/i,
	/DuckDuckBot/i,
	/Baiduspider/i,
	/YandexBot/i,
	/facebot/i,
	/Twitterbot/i
];

interface RequestBody {
	tableName: string;
	id: string;
	sortKey?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
	console.log('Received request:', req.method);

	const userAgent = req.headers.get('user-agent') || '';
	if (botUserAgents.some((bot) => bot.test(userAgent))) {
		return NextResponse.json({ success: false, message: 'Access denied for bots' }, { status: 403 });
	}

	try {
		const { tableName, id, sortKey }: RequestBody = await req.json();

		if (!tableName || !id) {
			return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
		}

		const key: { id: string; date?: string } = { id };
		if (sortKey) {
			key.date = sortKey;
		}

		const params = {
			TableName: tableName,
			Key: key,
		};

		const data = await dynamoDB.get(params).promise();

		if (data.Item) {
			return NextResponse.json({ success: true, item: data.Item }, { status: 200 });
		} else {
			if (sortKey) {
				return NextResponse.json({ success: true, item: null }, { status: 200 });
			} else {
				const queryParams = {
					TableName: tableName,
					KeyConditionExpression: '#id = :id',
					ExpressionAttributeNames: {
						'#id': 'id',
					},
					ExpressionAttributeValues: {
						':id': id,
					},
				};
				const queryData = await dynamoDB.query(queryParams).promise();
				return NextResponse.json({ success: true, item: queryData.Items?.[0] || null }, { status: 200 });
			}
		}
	} catch (error) {
		console.error('DynamoDB error:', error);
		return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
	}
}
