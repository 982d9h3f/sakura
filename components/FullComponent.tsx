import React from 'react';
import { Flex, Box, Text ,Grid } from '@chakra-ui/react';
import RandomImageSwitcher from './RandomImageSwitcher';
import ProductInfo from './ProductInfo';
interface FullComponentProps {
	decryptedUrl: string[][];
	text: string[];
	creatorId:string;
	userId:string;
}
const FullComponent: React.FC<FullComponentProps> = ({ decryptedUrl, text,creatorId,userId }) => {
	return (
		<Box w="100%" p={0}>
			<Grid
				templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
				gap={0}
				w="100%"
			>
				{[0, 1, 2].map((index) => (
					<Box key={index} textAlign="center" minHeight="200px">
						<Flex
							direction="column"
							justify="flex-end"
							h="auto"
							minH="2.5em"
							mb={2}
						>
							<Text>{text[index]}</Text>
						</Flex>

						<Box
							w="100%"
							h="200px"
							minHeight="200px"
							bg="gray.200"
							overflow="hidden"
						>
							<RandomImageSwitcher imageSet={decryptedUrl[index]} />
						</Box>
					</Box>
				))}
			</Grid>
			<ProductInfo creatorId={creatorId} userId={userId}/>
		</Box>
	);
};

export default FullComponent;
