import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import RandomImageSwitcher from './RandomImageSwitcher';
import ProductInfo from './ProductInfo';
import { Colab } from '@/lib/types/Colab';
interface FullComponentProps {
	decryptedUrl: string[];
	text: string;
	Colab:Colab;
}

const Section2: React.FC<FullComponentProps> = ({ decryptedUrl, text, Colab}) => {
	const imgsets = decryptedUrl.slice(0, 3);
	return (
		<Box h="100%">
			<Text mb={2}>{text}</Text>
			<Box w="100%" h="70vh" bg="gray.200">
				<RandomImageSwitcher imageSet={imgsets} />
			</Box>
			<ProductInfo Colab={Colab}/>
		</Box>
	);
};

export default Section2;
