// src/app/api/fetch-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
if (!process.env.STRIPE_SECRET_KEY) {
	throw new Error('Missing Stripe secret key in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2024-12-18.acacia', // StripeのAPIバージョン
});

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const sessionId = searchParams.get('session_id');

	if (!sessionId) {
		console.warn('Request missing session ID:', request.url);
		return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
	}

	try {
		console.log('Fetching session data for ID:', sessionId);

		// セッションの取得と拡張フィールドの指定
		const session = await stripe.checkout.sessions.retrieve(sessionId, {
			expand: ['customer_details', 'shipping_details'],
		});

		// ログにセッションデータの概要を出力
		console.log('Fetched session data:', {
			id: session.id,
			amount_total: session.amount_total,
			currency: session.currency,
			customer_details: session.customer_details,
			shipping_details: session.shipping_details,
			metadata: session.metadata,
		});

		return NextResponse.json(session);
	} catch {

		return NextResponse.json(
			{ status: 500 }
		);
	}
}
