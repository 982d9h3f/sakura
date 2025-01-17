import React from 'react';
import { Flex, Box, Text ,Grid } from '@chakra-ui/react';
import RandomImageSwitcher from './RandomImageSwitcher';
import ProductInfo from './ProductInfo';
import { Colab, emptyColab } from '@/lib/types/Colab';
interface FullComponentProps {
	decryptedUrl: string[][];
	Colab:Colab;
}
const FullComponent: React.FC<FullComponentProps> = ({ decryptedUrl, Colab }) => {
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
							<Text>{Colab?.textJP?.split(',')[index]||''}</Text>
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
			<ProductInfo Colab={Colab}/>
		</Box>
	);
};

export default FullComponent;

//	<ProductInfo creatorId={creatorId} userId={userId