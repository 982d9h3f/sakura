import React from 'react';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import MedalViewer from './MedalModel';
import CheckoutForm from './CheckoutForm';
interface ProductInfoProps {
	creatorId:string;
	userId:string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({creatorId,userId}) => {
	return (<>
		<Flex w="100%" h="300px" display="flex" justifyContent="center" alignItems="center" my={5}>
			<Box>
				<MedalViewer height={180} width={180} />
			</Box>
			<Box display="flex" justifyContent="center" alignItems="center">
				<Box>
					<Box mb={4}>
						<Text>{`銀価格が急騰中！！`}</Text>
						<Text>{`白く輝く純銀製`}</Text>
						<Text>{`本物がわかるあなたへ💖✨️`}</Text>
					</Box>
					<Box mb={4}>
						<Text fontSize="12px">{`限定コンテンツがずーっと見放題`}</Text>
						<Text fontSize="xl" fontWeight="bold" color="red.500">{`価格: $33.00`}</Text>
						<Text fontSize="12px" color="gray.500">{`（税込み）`}</Text>
						<Text fontSize="12px" color="gray.500">{`特典はコイン購入後に即時付与`}</Text>
					</Box>
					<Box fontSize="12px" color="gray.600">
						<Text>{`※数量限定販売、在庫がなくなり次第終了となります。`}</Text>
						<Text>
							{`詳細は`}
							<Text as="a" href="/terms" color="blue.500" textDecoration="underline">
								利用規約
							</Text>
							{`をご覧ください。`}
						</Text>
					</Box>
				</Box>
			</Box>
		</Flex>
		<CheckoutForm creatorId={creatorId} userId={userId}/>
	</>
	);
};

export default ProductInfo;

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