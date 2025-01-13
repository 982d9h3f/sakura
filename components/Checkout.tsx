import { useState } from 'react';
import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import { countries, countries2, countries3, countries4, countries5 } from './countries';
import axios from 'axios';
import Select from 'react-select';
import CheckoutForm from './CheckoutForm';
const formatPostalCode = (value: string): string => {
	// 数字と小文字のみを受け付け、ハイフン付きの形式に変換
	const cleanValue = value.replace(/[^a-z0-9]/g, ''); // 非小文字・非数字を削除
	if (cleanValue.length <= 3) {
		return cleanValue;
	} else if (cleanValue.length <= 7) {
		return `${cleanValue.slice(0, 3)}-${cleanValue.slice(3)}`;
	}
	return `${cleanValue.slice(0, 3)}-${cleanValue.slice(3, 7)}`;
};

interface CheckoutProps {
	creatorId?: string;
	userId?: string;
}

const Checkout: React.FC<CheckoutProps> = ({ creatorId, userId }) => {

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
				<Box
					bg="white"
					flex="1"
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					px={8}
				>
					<Box maxW="480px">
						<Box textAlign="center" mb={8}>
							<Text {...EN}>
								{`Their journey has only just begun. It reminds us of what Apple's early
									creations mean today.`}
							</Text>
							<Text {...JP}>
								{`彼らの旅はまだ始まったばかりだ。アップルの初期のクリエイションが今日どのような意味を持つのかを思い出させてくれる。`}
							</Text>
						</Box>
						<Box textAlign="center" mb={3}>
							<Text fontSize="2xl" fontWeight="bold" color="gray.800" mb={2}>
								Sakura Medal
							</Text>
							<Text fontSize="lg" color="gray.600" mb={2}>
								Price: $33.00
							</Text>
							<Text fontSize="lg" color="gray.600" mb={2}>
								Stock: 100 pieces
							</Text>
						</Box>
						<CheckoutForm />
					</Box>
				</Box>
				<Box flex="1" />
			</Flex>
		</>);
};

export default Checkout;
