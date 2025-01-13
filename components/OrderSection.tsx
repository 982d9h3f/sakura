"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
// 環境変数を明示的にチェック
const stripePromise = (async () => {
	const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
	if (!publishableKey) {
	  throw new Error("Stripe Publishable Key is not defined in environment variables");
	}
	return loadStripe(publishableKey);
  })();
const OrderSection: React.FC = () => {
	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(false);
	const EN = {
		fontSize: "17px",
		color: "gray.600",
		textShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
	};

	const JP = {
		fontSize: "16px",
		color: "gray.600",
		textShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
		mt: "8px",
		mb: "16px",
	};

	const handleCheckout = async () => {
		setLoading(true);

		try {
			// API を呼び出してセッション ID を取得
			const res = await axios.post("/api/create-checkout-session", {
				quantity, // 必要に応じて数量を送信
			});

			const { id } = res.data;

			const stripe = await stripePromise;
			if (stripe) {
				await stripe.redirectToCheckout({ sessionId: id });
			}
		} catch (error) {
			console.error("Error during checkout:", error);
			alert("Failed to initiate checkout. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Flex h="100vh" direction={{ base: "column", md: "row" }}>
				{/* 左半分 */}
				<Box
					bg="white"
					flex="1"
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					px={8}
				>
					<Box maxW="480px" textAlign="center">
						<Text {...EN}>
							{`Their journey has only just begun. It reminds us of what Apple's early
							creations mean today.`}
						</Text>
						<Text {...JP}>
							{`彼らの旅はまだ始まったばかりだ。アップルの初期のクリエイションが今日どのような意味を持つのかを思い出させてくれる。`}
						</Text>
					</Box>


					<Box textAlign="center" mb={8}>
						<Text fontSize="2xl" fontWeight="bold" color="gray.800" mb={2}>
							Sakura Medal
						</Text>
						<Text fontSize="lg" color="gray.600" mb={2}>
							Price: ¥5,000
						</Text>
						<Text fontSize="lg" color="gray.600" mb={2}>
							Stock: 100 pieces
						</Text>
					</Box>

					<Box w="100%" maxW="400px">
						<Text fontSize="md" color="gray.800" mb={2}>
							Quantity:
						</Text>
						<Input
							type="number"
							defaultValue={1}
							min={1}
							max={25} // 在庫数に応じて変更
							size="md"
							mb={4}
						/>

						{/* 注文ボタン */}
						<Button
							colorScheme="pink"
							size="lg"
							w="100%"
							onClick={handleCheckout}
						>
							Proceed to Order
						</Button>
					</Box>
				</Box>
				<Box flex="1" />
			</Flex>
		</>
	);
};

export default OrderSection;
