// src/app/api/calculate-shipping/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { countries, countries2, countries3, countries4, countries5 } from '../../../../components/countries';
import { v4 as uuidv4 } from 'uuid';
const allCountries = [
	...countries,
	...countries2,
	...countries3,
	...countries4,
	...countries5,
];

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
	apiVersion: '2024-12-18.acacia',
});

const getCountryCode = (countryName: string): string | undefined => {
	const country = allCountries.find((c) => c.name === countryName);
	return country?.code; // ここがundefinedでないことを確認
};

// Define shipping costs for each group in USD
const exchangeRateJPYToUSD = 150;
const shippingRates: { [key: string]: number } = {
	group1: parseFloat((210 / exchangeRateJPYToUSD).toFixed(2)), // 350円 → 約2.92 USD
	group2: parseFloat((380 / exchangeRateJPYToUSD).toFixed(2)), // 380円 → 約3.17 USD
	group3: parseFloat((510 / exchangeRateJPYToUSD).toFixed(2)), // 510円 → 約4.25 USD
	group4: parseFloat((830 / exchangeRateJPYToUSD).toFixed(2)), // 830円 → 約6.92 USD
	group5: parseFloat((550 / exchangeRateJPYToUSD).toFixed(2)), // 550円 → 約4.58 USD
};
//書留費
const registeredMailFee = parseFloat((460 / exchangeRateJPYToUSD).toFixed(2));

// Function to determine the shipping cost based on the country name
const getShippingCost = (countryName: string): number => {
	if (countries.some((country) => country.name === countryName)) {
		return shippingRates.group1;
	} else if (countries2.some((country) => country.name === countryName)) {
		return shippingRates.group2;
	} else if (countries3.some((country) => country.name === countryName)) {
		return shippingRates.group3;
	} else if (countries4.some((country) => country.name === countryName)) {
		return shippingRates.group4;
	} else if (countries5.some((country) => country.name === countryName)) {
		return shippingRates.group5;
	}
	throw new Error('Invalid country code or unsupported country.');
};

const getTotalShippingCost = (countryName: string, isRegistered: boolean): number => {
	let shippingCost = getShippingCost(countryName);
	if (isRegistered) {
		shippingCost += registeredMailFee;
	}
	return shippingCost;
};

// Export a named POST handler
export async function POST(request: NextRequest) {
	try {
		const { selectedCountry, quantity, creatorId, userId, inviterId, pageUserIds } = await request.json();
		console.log('Request Data:', { selectedCountry, quantity });

		const shippingCost = getTotalShippingCost(selectedCountry.label, true);
		console.log('Shipping Cost:', shippingCost);

		const itemPriceUSD = 33;
		const totalAmountInCents = Math.round(itemPriceUSD * quantity * 100);
		console.log('Total Amount (cents):', totalAmountInCents);

		const origin = request.headers.get('origin') || 'http://localhost:3000';
		console.log('Origin:', origin);

		const countryCode = getCountryCode(selectedCountry.label);
		if (!countryCode || countryCode.length !== 2) {
			throw new Error('Invalid country name or unsupported country.');
		}
		const orderId = uuidv4();
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			customer: 'cus_Rjrhm9YV0zQKxm', // 既存のカスタマーIDを指定
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: { name: `Sakura Medal (Shipping Included)` }, // 商品名に「送料込み」を明記
						unit_amount: totalAmountInCents,
					},
					quantity,
				},
			],
			mode: 'payment',
			success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
			metadata: {
				creatorId,
				userId,
				quantity,
				orderId,
				inviterId,
				pageUserIds,
			},
		});
		/*
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: { name: 'Sakura Medal' },
						unit_amount: totalAmountInCents,
					},
					quantity,
				},
			],
			shipping_address_collection: { allowed_countries: [countryCode as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry] },
			shipping_options: [
				{
					shipping_rate_data: {
						type: 'fixed_amount',
						fixed_amount: { amount: Math.round(shippingCost * 100), currency: 'usd' },
						display_name: `Shipping to ${selectedCountry.label}(Registered)`,
						delivery_estimate: { minimum: { unit: 'business_day', value: 5 }, maximum: { unit: 'business_day', value: 10 } },
					},
				},
			],
			mode: 'payment',
			success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
			metadata: {
				creatorId,
				userId,
				quantity,
				orderId,
				inviterId,
				pageUserIds,
			},
		});
		*/


		return NextResponse.json({ id: session.id, url: session.url });

	} catch {

		return NextResponse.json(
			{ status: 500 }
		);
	}

}


/*

// src/app/api/calculate-shipping/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { countries, countries2, countries3, countries4, countries5 } from '../../../../components/countries';
import { v4 as uuidv4 } from 'uuid'; 
const allCountries = [
	...countries,
	...countries2,
	...countries3,
	...countries4,
	...countries5,
];

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
	apiVersion: '2024-12-18.acacia',
});

const getCountryCode = (countryName: string): string | undefined => {
	const country = allCountries.find((c) => c.name === countryName);
	return country?.code; // ここがundefinedでないことを確認
};

// Define shipping costs for each group in USD
const exchangeRateJPYToUSD = 150;
const shippingRates: { [key: string]: number } = {
	group1: parseFloat((210 / exchangeRateJPYToUSD).toFixed(2)), // 350円 → 約2.92 USD
	group2: parseFloat((380 / exchangeRateJPYToUSD).toFixed(2)), // 380円 → 約3.17 USD
	group3: parseFloat((510 / exchangeRateJPYToUSD).toFixed(2)), // 510円 → 約4.25 USD
	group4: parseFloat((830 / exchangeRateJPYToUSD).toFixed(2)), // 830円 → 約6.92 USD
	group5: parseFloat((550 / exchangeRateJPYToUSD).toFixed(2)), // 550円 → 約4.58 USD
};
//書留費用
const registeredMailFee = parseFloat((460 / exchangeRateJPYToUSD).toFixed(2)); 

// Function to determine the shipping cost based on the country name
const getShippingCost = (countryName: string): number => {
	if (countries.some((country) => country.name === countryName)) {
		return shippingRates.group1;
	} else if (countries2.some((country) => country.name === countryName)) {
		return shippingRates.group2;
	} else if (countries3.some((country) => country.name === countryName)) {
		return shippingRates.group3;
	} else if (countries4.some((country) => country.name === countryName)) {
		return shippingRates.group4;
	} else if (countries5.some((country) => country.name === countryName)) {
		return shippingRates.group5;
	}
	throw new Error('Invalid country code or unsupported country.');
};

const getTotalShippingCost = (countryName: string, isRegistered: boolean): number => {
	let shippingCost = getShippingCost(countryName);
	if (isRegistered) {
		shippingCost += registeredMailFee;
	}
	return shippingCost;
};

// Export a named POST handler
export async function POST(request: NextRequest) {
	try {
		const { selectedCountry, quantity, creatorId, userId, inviterId, pageUserIds} = await request.json();
		console.log('Request Data:', { selectedCountry, quantity });

		const shippingCost = getTotalShippingCost(selectedCountry.label, true);
		console.log('Shipping Cost:', shippingCost);

		const itemPriceUSD = 33;
		const totalAmountInCents = Math.round(itemPriceUSD * quantity * 100);
		console.log('Total Amount (cents):', totalAmountInCents);

		const origin = request.headers.get('origin') || 'http://localhost:3000';
		console.log('Origin:', origin);

		const countryCode = getCountryCode(selectedCountry.label);
		if (!countryCode || countryCode.length !== 2) {
			throw new Error('Invalid country name or unsupported country.');
		}
		const orderId = uuidv4();
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: { name: 'Sakura Medal' },
						unit_amount: totalAmountInCents,
					},
					quantity,
				},
			],
			shipping_address_collection: { allowed_countries: [countryCode as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry] },
			shipping_options: [
				{
					shipping_rate_data: {
						type: 'fixed_amount',
						fixed_amount: { amount: Math.round(shippingCost * 100), currency: 'usd' },
						display_name: `Shipping to ${selectedCountry.label}(Registered)`,
						delivery_estimate: { minimum: { unit: 'business_day', value: 5 }, maximum: { unit: 'business_day', value: 10 } },
					},
				},
			],
			mode: 'payment',
			success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
			metadata: {
				creatorId,
				userId,
				quantity,
				orderId,
				inviterId,
				pageUserIds,
			},
		});


		return NextResponse.json({ id: session.id, url: session.url });

	} catch  {

		return NextResponse.json(
			{ status: 500 }
		);
	}

}


*/