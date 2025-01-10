"use client";
import React from "react";
import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";

const OrderSection: React.FC = () => {
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
							Their journey has only just begun. It reminds us of what Apple's early
							creations mean today.
						</Text>
						<Text {...JP}>
							彼らの旅はまだ始まったばかりだ。アップルの初期のクリエイションが今日どのような意味を持つのかを思い出させてくれる。
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
							onClick={() => alert("Proceed to Order")}
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
