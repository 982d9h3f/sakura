import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import RandomImageSwitcher from './RandomImageSwitcher';
import ProductInfo from './ProductInfo';
interface FullComponentProps {
	decryptedUrl: string[];
	text: string[];
}

const Section2: React.FC<FullComponentProps> = ({ decryptedUrl, text }) => {
	const imgsets = decryptedUrl.slice(0, 3);
	return (
		<Box h="100%">
			<Text mb={2}>{text[0]}</Text>
			<Box w="100%" h="70vh" bg="gray.200">
				<RandomImageSwitcher imageSet={imgsets} />
			</Box>
			<ProductInfo/>
		</Box>
	);
};

export default Section2;
