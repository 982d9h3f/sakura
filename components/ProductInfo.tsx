import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
//import MedalViewer from './MedalModel';
import CheckoutForm from './CheckoutForm';
interface ProductInfoProps {
	creatorId: string;
	userId: string;
	text: string[];
	lang: string;
}
const ProductInfo: React.FC<ProductInfoProps> = ({ creatorId, userId, text, lang }) => {

	return (
		<Box p={3}>
			<Flex w="100%" h="300px" display="flex" justifyContent="center" alignItems="center" my={5}>
				<Box w="100%" maxW="150px" mr="5px">
					<img src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/sakura/medal_trans.png`} alt="Medal" />
				</Box>
				<Box display="flex" justifyContent="center" alignItems="center">
					<Box>
						<Box mb={4}>
							<Text>{text[0]}</Text>
							<Text>{text[1]}</Text>
							<Text>{text[2]}</Text>
						</Box>
						<Box mb={4}>
							<Text fontSize="12px">{text[3]}</Text>
							<Text fontSize="xl" fontWeight="bold" color="red.500">{lang == "jp" ? `価格 : $33.00` : `Price : $33.00`}</Text>
							<Text fontSize="12px" color="gray.500">{lang == "jp" ? `（税込み）` : `tax included`}</Text>
							<Text fontSize="12px" color="gray.500">{text[4]}</Text>
						</Box>
						<Box fontSize="12px" color="gray.600">
							<Text>{lang == "jp" ? `※数量限定販売、在庫がなくなり次第終了となります。` : '※ Limited quantities available. Sales will end once stock runs out.'}</Text>
						</Box>
					</Box>
				</Box>
			</Flex>
			<Box mb={5}>
				<CheckoutForm creatorId={creatorId} userId={userId} text={text[5]} />
			</Box>
		</Box>
	);
};

export default ProductInfo;
/*

						<Text>
							{`詳細は`}
							<Text as="a" href="/terms" color="blue.500" textDecoration="underline">
								利用規約
							</Text>
							{`をご覧ください。`}
						</Text>


			<Box w="100%" maxW="200px">
				{isMobile ? (
					<img src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/sakura/medal_trans.png`} alt="Medal" />
				) : (
					<MedalViewer height={180} width={180} />
				)}
			</Box>
*/

/*
		<Button
			colorScheme="pink"
			size="lg"
			w="100%"
			onClick={() => alert('Proceed to Order')}
			mb="80px"
		>
			会員コインをゲットする
		</Button>

*/