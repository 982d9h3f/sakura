import React, { useState } from 'react';
import {
	Box,
	Flex,
	Text,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalFooter,
	ModalCloseButton,
	Checkbox,
	useDisclosure,
} from "@chakra-ui/react";
import { countries, countries2, countries3, countries4, countries5 } from './countries';
import axios from 'axios';
import Select from 'react-select';
import { Colab } from '@/lib/types/Colab';

interface CheckoutProps {
	Colab?: Colab;
}

interface CountryOption {
	value: string;
	label: string;
}

const CheckoutForm: React.FC<CheckoutProps> = ({ Colab }) => {
	const [loading, setLoading] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
	const [agreed, setAgreed] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleCheckout = async () => {
		if (!selectedCountry || !agreed) return;
		setLoading(true);
		try {
			const response = await axios.post('/api/calculate-shipping', {
				selectedCountry,
				quantity: 1,
				creatorId: Colab?.inviterId,
				userId: Colab?.visitorId,
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

	const allCountries = [...countries, ...countries2, ...countries3, ...countries4, ...countries5];
	const countryOptions: CountryOption[] = allCountries.map((country) => ({
		value: country.code,
		label: country.name,
	}));

	return (
		<>
			<Box w="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
				<Button
					colorScheme="pink"
					size="lg"
					w="100%"
					onClick={onOpen}
					disabled={loading}
				>
					{Colab
						? Colab.language === "jp"
							? Colab.textMedalJP?.split(',')[5] || 'デフォルト日本語テキスト'
							: Colab.textMedalEN?.split(',')[5] || 'Default English text'
						: 'Proceed to order'}
				</Button>
			</Box>

			{/* Modal for region selection and agreement */}
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent mt="10vh">
					<ModalCloseButton />
					<ModalBody>
						<Flex direction="column" gap={4} p={3}>
							<Text fontSize="16px" fontWeight="bold" mt={1} color="gray.600">
								Select Your Country:
							</Text>
							<Box>
								<Select
									instanceId="checkout-country-select"
									options={countryOptions}
									placeholder="Select your country"
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
							<Checkbox
								isChecked={agreed}
								onChange={(e) => setAgreed(e.target.checked)}
								colorScheme="pink"
							>
								<Text as="span" textDecoration="underline" color="gray.600">
									I agree to the terms and conditions
								</Text>
							</Checkbox>
						</Flex>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="pink"
							mr={3}
							onClick={handleCheckout}
							isDisabled={!selectedCountry || !agreed || loading}
						>
							Confirm and Proceed
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
export default CheckoutForm;