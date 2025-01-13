"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Heading, Text, VStack, Spinner, Button, Divider, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default function CancelPage() {
	const searchParams = useSearchParams();
	const sessionId = searchParams.get("session_id");
	const [sessionData, setSessionData] = useState<any>(null);
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

	const { shipping_details, customer_details, metadata } = sessionData;

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
					Order Canceled
				</Heading>
				<Text fontSize="lg" color="gray.600" mb="6">
					Your order was canceled. If this was a mistake, you can try again.
				</Text>
				<Divider mb="6" borderColor="pink.200" />

				<Button as={NextLink} href={homeLink} colorScheme="pink" size="lg">
					Home
				</Button>
			</Box>
		</Box>
	);
}
