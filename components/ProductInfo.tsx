import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
//import MedalViewer from './MedalModel';
import CheckoutForm from './CheckoutForm';
import { Colab } from '@/lib/types/Colab';
interface ProductInfoProps {
	Colab: Colab;
}
const ProductInfo: React.FC<ProductInfoProps> = ({Colab }) => {
	return (
		<Box p={3}>
			<Flex w="100%" h="300px" display="flex" justifyContent="center" alignItems="center">
				<Box w="100%" maxW="150px" mr="5px">
					<img src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/sakura/medal_trans.png`} alt="Medal" />
				</Box>
				<Box display="flex" justifyContent="center" alignItems="center">
					<Box>
						<Box mb={4}>
							{Colab?.language == "jp" ?
								(<>
									<Text>{Colab?.textMedalJP?.split(',')[0] || ''}</Text>
									<Text>{Colab?.textMedalJP?.split(',')[1] || ''}</Text>
								</>)
								:
								(<>
									<Text fontSize="20px">{Colab?.textMedalEN?.split(',')[0] || ''}</Text>
									<Text>{Colab?.textMedalEN?.split(',')[1] || ''}</Text>
								</>)
							}
						</Box>
						<Box mb={4}>
							{Colab?.language == "jp" ?
								(<>
									<Text fontSize="xl" fontWeight="bold" color="red.500">{`価格 : $33.00`}</Text>
									<Text fontSize="12px" color="gray.500">{`（税込み）`}</Text>
								</>)
								:
								(<>
									<Text fontSize="14px">{Colab?.textMedalEN?.split(',')[3] || ''}</Text>
									<Text fontSize="xl" fontWeight="bold" color="red.500">{`Price : $33.00`}</Text>
									<Text fontSize="14px" color="gray.500">{`（Tax included）`}</Text>
									<Text fontSize="14px" color="gray.500">{Colab?.textMedalEN?.split(',')[4] || ''}</Text>
								</>)
							}
						</Box>
						<Box fontSize="12px" color="gray.600">
							<Text>{Colab?.language == "jp" ? `※数量限定販売、在庫がなくなり次第終了となります。` : '※ Limited quantities available. Sales will end once stock runs out.'}</Text>
						</Box>
					</Box>
				</Box>
			</Flex>
			<Box mb={10}>
				<CheckoutForm Colab={Colab}/>
			</Box>
		</Box>
	);
};
export default ProductInfo;



/*

import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
//import MedalViewer from './MedalModel';
import CheckoutForm from './CheckoutForm';
import { Colab } from '@/lib/types/Colab';
interface ProductInfoProps {
	Colab: Colab;
}
const ProductInfo: React.FC<ProductInfoProps> = ({Colab }) => {
	return (
		<Box p={3}>
			<Flex w="100%" h="300px" display="flex" justifyContent="center" alignItems="center">
				<Box w="100%" maxW="150px" mr="5px">
					<img src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/sakura/medal_trans.png`} alt="Medal" />
				</Box>
				<Box display="flex" justifyContent="center" alignItems="center">
					<Box>
						<Box mb={4}>
							{Colab?.language == "jp" ?
								(<>
									<Text>{Colab?.textMedalJP?.split(',')[0] || ''}</Text>
									<Text>{Colab?.textMedalJP?.split(',')[1] || ''}</Text>
									<Text>{Colab?.textMedalJP?.split(',')[2] || ''}</Text>
								</>)
								:
								(<>
									<Text>{Colab?.textMedalEN?.split(',')[0] || ''}</Text>
									<Text>{Colab?.textMedalEN?.split(',')[1] || ''}</Text>
									<Text>{Colab?.textMedalEN?.split(',')[2] || ''}</Text>
								</>)
							}
						</Box>
						<Box mb={4}>
							{Colab?.language == "jp" ?
								(<>
									<Text fontSize="12px">{Colab?.textMedalJP?.split(',')[3] || ''}</Text>
									<Text fontSize="xl" fontWeight="bold" color="red.500">{`価格 : $33.00`}</Text>
									<Text fontSize="12px" color="gray.500">{`（税込み）`}</Text>
									<Text fontSize="12px" color="gray.500">{Colab?.textMedalJP?.split(',')[4] || ''}</Text>
								</>)
								:
								(<>
									<Text fontSize="14px">{Colab?.textMedalEN?.split(',')[3] || ''}</Text>
									<Text fontSize="xl" fontWeight="bold" color="red.500">{`Price : $33.00`}</Text>
									<Text fontSize="14px" color="gray.500">{`（Tax included）`}</Text>
									<Text fontSize="14px" color="gray.500">{Colab?.textMedalEN?.split(',')[4] || ''}</Text>
								</>)
							}
						</Box>
						<Box fontSize="12px" color="gray.600">
							<Text>{Colab?.language == "jp" ? `※数量限定販売、在庫がなくなり次第終了となります。` : '※ Limited quantities available. Sales will end once stock runs out.'}</Text>
						</Box>
					</Box>
				</Box>
			</Flex>
			<Box mb={10}>
				<CheckoutForm Colab={Colab}/>
			</Box>
		</Box>
	);
};
export default ProductInfo;


*/