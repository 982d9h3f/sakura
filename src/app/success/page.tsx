// src/app/success/page.tsx

"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Heading, Text, VStack, Spinner, Button, Divider } from "@chakra-ui/react";
import NextLink from "next/link";
import Stripe from 'stripe';
interface StripeSession {
	id: string;
	amount_total: number | null;
	currency: string | null;
	customer_details?: Stripe.Checkout.Session.CustomerDetails | null;
	shipping_details?: Stripe.Checkout.Session.ShippingDetails | null;
	metadata?: {
		[key: string]: string;
	};
}

export default function SuccessPage() {
	const searchParams = useSearchParams();
	const sessionId = searchParams.get("session_id");
	const [sessionData, setSessionData] = useState<StripeSession>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchSessionData() {
			if (!sessionId) return;
			try {
				const response = await fetch(`/api/fetch-session?session_id=${sessionId}`);
				const data = await response.json();
				setSessionData(data);
			} catch (error) {
				console.error("Error fetching session data:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchSessionData();
	}, [sessionId]);

	if (loading)
		return (
			<VStack align="center" justify="center" h="100vh" bg="pink.50">
				<Spinner size="xl" color="pink.500" />
				<Text fontSize="lg" color="pink.500">
					Loading...
				</Text>
			</VStack>
		);

	if (!sessionData)
		return (
			<VStack align="center" justify="center" h="100vh" bg="pink.50">
				<Text fontSize="xl" color="pink.500">
					Session not found.
				</Text>
				<Button as={NextLink} href="/" colorScheme="pink">
					Go Home
				</Button>
			</VStack>
		);

	const { amount_total, currency, shipping_details, customer_details, metadata } = sessionData;

	const homeLink = metadata?.creatorId && metadata?.userId
		? `${process.env.NEXT_PUBLIC_APP_URL}`
		: "/";


	return (
		<Box
			bg="pink.50"
			minH="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
			padding="4"
		>
			<Box
				bg="white"
				boxShadow="lg"
				borderRadius="md"
				padding="8"
				maxWidth="600px"
				width="full"
				textAlign="center"
				color="pink.300"
			>
				<Heading as="h1" size="xl" mb="4">
					Thank you for your purchase!
				</Heading>
				<Text fontSize="lg" color="gray.600" mb="6">
					Your payment was successful.
				</Text>
				<Text fontSize="md" fontWeight="bold">
					Order Summary
				</Text>
				<Divider mb="6" borderColor="pink.200" />
				<VStack align="start" spacing="2" mb="6" fontSize="16px" color="gray.600">
					<Text>
						<strong>Total Amount :</strong>{" "}
						{amount_total
							? `${(amount_total / 100).toFixed(2)} ${currency?.toUpperCase() || "USD"}`
							: "N/A"}
					</Text>
					<Text >
						<strong>Name :</strong> {shipping_details?.name}
					</Text>
					<Text >
						<strong>Address :</strong> {shipping_details?.address?.line1} {shipping_details?.address?.city} {shipping_details?.address?.state} {shipping_details?.address?.postal_code} {shipping_details?.address?.country}
					</Text>
					<Text fontSize="md">
						<strong>Email :</strong> {customer_details?.email}
					</Text>
				</VStack>
				<Divider mb="6" borderColor="pink.200" />
				<Button as={NextLink} href={homeLink} colorScheme="pink" size="lg">
					Home
				</Button>
			</Box>
		</Box>
	);
}