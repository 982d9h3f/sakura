import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Text, Input, Button, useBreakpointValue } from "@chakra-ui/react";
import { countries, countries2, countries3, countries4, countries5 } from './countries';
import axios from 'axios';
import Select from 'react-select';
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

const CheckoutForm: React.FC<CheckoutProps> = ({ creatorId, userId }) => {

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
	const [quantity, setQuantity] = useState(1); // 数量の状態を管理

	const handleIncrease = () => {
		if (quantity < 25) {
			setQuantity((prev) => prev + 1);
		}
	};

	const handleDecrease = () => {
		if (quantity > 1) {
			setQuantity((prev) => prev - 1);
		}
	};
	const [postalCode, setPostalCode] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [selectedCountry, setSelectedCountry] = useState(null);

	const handleCheckout = async () => {
		setLoading(true);
		setError(null);

		try {
			console.log('Sending Request:', { selectedCountry, quantity });

			const response = await axios.post('/api/calculate-shipping', {
				selectedCountry,
				quantity,
				creatorId,
				userId,
			});

			console.log('Server Response:', response.data);

			if (response.status === 200 && response.data.url) {
				// サーバーから返されたURLにリダイレクト
				window.location.href = response.data.url;
			} else {
				setError(response.data.error || 'Failed to start checkout.');
			}
		} catch (err) {
			const errorMessage = err.response?.data?.error || 'An unexpected error occurred.';
			setError(errorMessage);
			console.error('Checkout error:', errorMessage);
		} finally {
			setLoading(false);
		}
	};

	// react-select の選択ハンドラー
	const handleCountryChange = (selectedOption: any) => {
		setSelectedCountry(selectedOption);
	};

	const allCountries = [...countries2, ...countries3, ...countries4, ...countries5, ...countries];
	const countryOptions = allCountries.map((country) => ({
		value: country.code,
		label: country.name,
	}));

	const [parentWidth, setParentWidth] = useState<number | null>(null);
	const parentRef = useRef<HTMLDivElement>(null);
	const threshold = 1600;

	useEffect(() => {
		const observer = new ResizeObserver((entries) => {
			for (let entry of entries) {
				if (entry.contentBoxSize) {
					setParentWidth(entry.contentRect.width);
				}
			}
		});

		if (parentRef.current) {
			observer.observe(parentRef.current);
		}

		return () => {
			if (parentRef.current) {
				observer.unobserve(parentRef.current);
			}
		};
	}, []);

	return (
		<>
			<Box w="100%">
				<Flex
					direction={{ base: 'column', md: 'row' }}
					align="center"
					justify="space-between"
					mb={4}
					gap={4} // フォーム間のスペースを設定
					wrap="wrap"
				>
					{/* 国入力フォーム */}
					<Flex direction="row" align="center" flex="1" minWidth="350px">
						<Text
							fontSize="md"
							color="gray.800"
							mr={4}
							whiteSpace="nowrap"
							lineHeight="1.5"
						>
							Select Your Country:
						</Text>
						<Box flex="1">
							<Select
								options={countryOptions}
								placeholder=""
								value={selectedCountry}
								onChange={handleCountryChange}
								isSearchable
								styles={{
									control: (base) => ({
										...base,
										borderColor: '#CBD5E0',
										boxShadow: 'none',
										height: '40px',
										'&:hover': { borderColor: '#A0AEC0' },
									}),
								}}
							/>
						</Box>
					</Flex>

					{/* 数量フォーム */}
					<Flex direction="row" align="center" gap={3} flex="1" height="40px" minWidth="350px">
						<Text
							fontSize="md"
							color="gray.800"
							lineHeight="1.5"
							height="40px"
							display="flex"
							alignItems="center"
						>
							Quantity:
						</Text>
						<Input
							type="number"
							value={quantity}
							readOnly
							textAlign="center"
							w="60px"
							mx={2}
							height="40px"
						/>
						<Button
							onClick={handleIncrease}
							size="sm"
							disabled={quantity === 25}
							height="40px"
						>
							+
						</Button>
						<Button
							onClick={handleDecrease}
							size="sm"
							disabled={quantity === 1}
							height="40px"
						>
							-
						</Button>
					</Flex>
				</Flex>
				<Button
					colorScheme="pink"
					size="lg"
					w="100%"
					onClick={handleCheckout}
					disabled={loading || !selectedCountry}
				>
					Proceed to Order
				</Button>
			</Box>
		</>
	);

};

export default CheckoutForm;
