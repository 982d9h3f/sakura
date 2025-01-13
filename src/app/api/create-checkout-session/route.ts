import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {});

export async function POST(req: NextRequest) {
	try {
		const origin = req.headers.get('origin');
		if (!origin) {
			return new NextResponse(JSON.stringify({ error: 'Origin is not available' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// 地域別送料定義
		const shippingRates = {
			"Asia": 1000, // 第1地帯
			"Europe": 2000, // 第2地帯
			"NorthAmerica": 2500, // 第3地帯
			"Oceania": 2500, // 第4地帯
			"Other": 3000 // 第5地帯
		};

		// Stripe Checkout セッションの作成
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'jpy',
						product_data: {
							name: 'Sakura Medal',
						},
						unit_amount: 5000, // 商品価格
					},
					quantity: 1,
				},
			],
			mode: 'payment',
			shipping_address_collection: {
				allowed_countries: ['JP', 'US', 'CN', 'KR', 'DE', 'FR', 'AU'], // 許可する国をリストアップ
			},
			shipping_options: [
				{
					shipping_rate_data: {
						type: 'fixed_amount',
						fixed_amount: {
							amount: shippingRates["Asia"], // 第1地帯の送料
							currency: 'jpy',
						},
						display_name: 'Shipping to Asia',
						delivery_estimate: {
							minimum: { unit: 'business_day', value: 3 },
							maximum: { unit: 'business_day', value: 7 },
						},
					},
				},
				{
					shipping_rate_data: {
						type: 'fixed_amount',
						fixed_amount: {
							amount: shippingRates["Europe"], // 第2地帯の送料
							currency: 'jpy',
						},
						display_name: 'Shipping to Europe',
						delivery_estimate: {
							minimum: { unit: 'business_day', value: 5 },
							maximum: { unit: 'business_day', value: 10 },
						},
					},
				},
				{
					shipping_rate_data: {
						type: 'fixed_amount',
						fixed_amount: {
							amount: shippingRates["NorthAmerica"], // 第3地帯の送料
							currency: 'jpy',
						},
						display_name: 'Shipping to North America',
						delivery_estimate: {
							minimum: { unit: 'business_day', value: 5 },
							maximum: { unit: 'business_day', value: 10 },
						},
					},
				},
				{
					shipping_rate_data: {
						type: 'fixed_amount',
						fixed_amount: {
							amount: shippingRates["Oceania"], // 第4地帯の送料
							currency: 'jpy',
						},
						display_name: 'Shipping to Oceania',
						delivery_estimate: {
							minimum: { unit: 'business_day', value: 5 },
							maximum: { unit: 'business_day', value: 10 },
						},
					},
				},
				{
					shipping_rate_data: {
						type: 'fixed_amount',
						fixed_amount: {
							amount: shippingRates["Other"], // 第5地帯の送料
							currency: 'jpy',
						},
						display_name: 'Shipping to Other Regions',
						delivery_estimate: {
							minimum: { unit: 'business_day', value: 7 },
							maximum: { unit: 'business_day', value: 14 },
						},
					},
				},
			],
			success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${origin}/cancel`,
		});

		// セッション ID を返す
		return NextResponse.json({ id: session.id });
	} catch (error) {
		console.error('Error creating checkout session:', error);
		return new NextResponse(JSON.stringify({ error: 'Failed to create session' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
