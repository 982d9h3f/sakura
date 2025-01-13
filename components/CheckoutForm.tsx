import React, { useState } from 'react';
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { countries, countries2, countries3, countries4, countries5 } from './countries';
import axios from 'axios';
import Select from 'react-select';

interface CheckoutProps {
	creatorId?: string;
	userId?: string;
}

interface CountryOption {
	value: string;
	label: string;
}

const CheckoutForm: React.FC<CheckoutProps> = ({ creatorId, userId }) => {
	const [loading, setLoading] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);

	const handleCheckout = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/calculate-shipping', {
				selectedCountry,
				quantity: 1,
				creatorId,
				userId,
			});
			console.log('Server Response:', response.data);
			if (response.status === 200 && response.data.url) {
				window.location.href = response.data.url;
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleCountryChange = (selectedOption: CountryOption | null) => {
		setSelectedCountry(selectedOption);
	};

	const allCountries = [...countries2, ...countries3, ...countries4, ...countries5, ...countries];
	const countryOptions: CountryOption[] = allCountries.map((country) => ({
		value: country.code,
		label: country.name,
	}));

	return (
		<>
			<Box w="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
				<Flex
					w="100%"
					direction="row"
					align="center"
					flex="1"
					mb={3}
					justify="center"
				>
					<Text
						fontSize="md"
						color="gray.800"
						mr={4}
						whiteSpace="nowrap"
						lineHeight="1.5"
					>
						Select Your Country:
					</Text>
					<Box flex="1" maxWidth="350px">
						<Select
							instanceId="checkout-country-select"
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
				<Button
					colorScheme="pink"
					size="lg"
					w="100%"
					onClick={handleCheckout}
					disabled={loading || !selectedCountry}
				>
					Order
				</Button>
			</Box>
		</>
	);
};

export default CheckoutForm;

/*
import React, { useState } from 'react';
import { Box, Flex, Text,Button } from "@chakra-ui/react";
import { countries, countries2, countries3, countries4, countries5 } from './countries';
import axios from 'axios';
import Select from 'react-select';

interface CheckoutProps {
	creatorId?: string;
	userId?: string;
}

const CheckoutForm: React.FC<CheckoutProps> = ({ creatorId, userId }) => {
	const [loading, setLoading] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState(null);
	const handleCheckout = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/calculate-shipping', {
				selectedCountry,
				quantity: 1,
				creatorId,
				userId,
			});
			console.log('Server Response:', response.data);
			if (response.status === 200 && response.data.url) {
				window.location.href = response.data.url;
			} else {
			
			}
		} catch {
		} finally {
			setLoading(false);
		}
	};
	const handleCountryChange = (selectedOption: any) => {
		setSelectedCountry(selectedOption);
	};
	const allCountries = [...countries2, ...countries3, ...countries4, ...countries5, ...countries];
	const countryOptions = allCountries.map((country) => ({
		value: country.code,
		label: country.name,
	}));


	return (
		<>
			<Box w="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
				<Flex
					w="100%"
					direction="row"
					align="center"
					flex="1"
					mb={3}
					justify="center" // 水平方向に中央揃え
				>
					<Text
						fontSize="md"
						color="gray.800"
						mr={4}
						whiteSpace="nowrap"
						lineHeight="1.5"
					>
						Select Your Country:
					</Text>
					<Box flex="1" maxWidth="350px">
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
				<Button
					colorScheme="pink"
					size="lg"
					w="100%"
					onClick={handleCheckout}
					disabled={loading || !selectedCountry}
				>
					Order
				</Button>
			</Box>
		</>
	);

};

export default CheckoutForm;
*/
