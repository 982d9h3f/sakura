'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // URL パラメータを取得
import {
	Box,
	Text,
	VStack,
	Heading,
	useBreakpointValue,
	Container,
	Button,
	Flex,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
} from '@chakra-ui/react';
import DragAndDrop from "../../../../components/DragAndDrop";
import { fetchAndDecryptFiles } from '../../../utils/crypto';
import FullComponent from '../../../../components/FullComponent';
import Section2 from '../../../../components/Section2';
import axios from 'axios'; // Axios をインポート
const UserPage: React.FC = () => {
	const { id } = useParams() as { id: string };
	const headerFontSize = useBreakpointValue({ base: '2xl', md: '4xl' });
	const [decryptedUrls, setDecryptedUrls] = useState<string[]>([]); // 復号後のURLを保存するステート
	const [error, setError] = useState<string | null>(null); // エラーを保存するステート
	const [inviterId, setInviterId] = useState("");
	const [visitorId, setVisitorId] = useState("");
	const fileNames = [
		'Header.webp', 'medal.png',
		'010.webp', '011.webp', '012.webp',
		'023.webp', '021.webp', '022.webp',
		'030.webp', '031.webp', '032.webp',
	];
	const textArray1 = [`✔毎晩出来立てエッ◯`, `✔4K画質エッ◯ `, `✔画面開いてエッ◯`, `銀価格が急騰中！！`, `白く輝く本物の純銀製`, `大切な資産になるピュアシルバー✨️`];
	useEffect(() => {
		const fetchImages = async () => {
			try {
				const [inviterId, visitorId, language] = id?.split('_') || [];
				const response = await axios.post('/api/checkIds', { inviterId, visitorId, });
				const decryptedBlobs = await fetchAndDecryptFiles(fileNames);
				const urls = decryptedBlobs.map((blob) => URL.createObjectURL(blob));
				setDecryptedUrls(urls);
				if (response.data.success) {
					console.log('OK');
					setInviterId(inviterId);
					setVisitorId(visitorId);
				} else {
					setError(response.data.message);
				}
			} catch (err: any) {
				console.log('NG');
				setError(err.message || 'An error occurred while fetching data.');
			}
		};
		fetchImages();
		return () => {
			decryptedUrls.forEach((url) => URL.revokeObjectURL(url));
		};
	}, [id]);

	const section1Images = [
		[decryptedUrls[2], decryptedUrls[3], decryptedUrls[4]],
		[decryptedUrls[5], decryptedUrls[6], decryptedUrls[7]],
		[decryptedUrls[8], decryptedUrls[9], decryptedUrls[10]],
		[decryptedUrls[1]]
	];
	const section2Images = [decryptedUrls[2], decryptedUrls[3], decryptedUrls[4], decryptedUrls[1]];
	const section3Images = [decryptedUrls[5], decryptedUrls[6], decryptedUrls[7], decryptedUrls[1]];
	const section4Images = [decryptedUrls[8], decryptedUrls[9], decryptedUrls[10], decryptedUrls[1]];
	return (
		<Box >
			<DragAndDrop onDrop={() => { }} />
			<Container
				maxW="800px"
				borderRadius="lg"
				p={{base:0,md:4}}
				shadow="md"
				bg="pink.100"
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				textAlign="center"
			>
				<Box w="100%">
					<Text>
						コラボレーション
					</Text>
					<Heading as="h1" fontSize={headerFontSize} textAlign="center">
						SAKURA
					</Heading>
					<Heading as="h1" fontSize={headerFontSize} textAlign="center">
						✕
					</Heading>
					<Box w="100%"><img src={decryptedUrls[0]}/></Box>


					<VStack spacing="100px" align="center" mt="100px">
						<Text fontSize="18px" textAlign="center">
							ちょ～特別な会員コインです🤗 SAKURAさんが作ってくれました👏
						</Text>
						<Box maxW="300px">
							<img src={decryptedUrls[1]} alt="Special Coin" />
							<Text fontSize="18px" textAlign="center" mt={1}>
								とっても重宝されるピュアシルバー製！
							</Text>
						</Box>

						<Text fontSize="lg" textAlign="center">
							そしてそして、、何より重要な、、
						</Text>
						<Text fontSize="lg" textAlign="center">
							メダル購入者に{' '}
							<Box as="span" fontFamily="'Caveat', cursive" fontSize="2xl" color="pink.500">
								ドキドキ
							</Box>{' '}
							の会員特典💖
						</Text>
						<Text textAlign="center">こんなの！あんなのが🫣</Text>
						<Text fontSize="lg" textAlign="center">
							<Box as="span" fontFamily="'Caveat', cursive" fontSize="2xl" color="pink.500">
								ずーっと
							</Box>
							見放題👀🈲18❌️⏬️⏬️⏬️⏬️
						</Text>
					</VStack>
					<Accordion allowToggle my="50px">
						<AccordionItem>
							<h2>
								<AccordionButton
									bg="pink"
									maxW="300px"
									mx="auto" /* 水平方向の中央寄せ */
									display="flex"
									justifyContent="center" /* ボタン内のテキストとアイコンを中央揃え */
									alignItems="center"
									borderRadius="10px"
								>
									<Box flex="1" textAlign="center" color="black">
										あける
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel p={0}>
								<Box my="50px"/>
								<FullComponent decryptedUrl={section1Images} text={textArray1} />
								<Section2 decryptedUrl={section2Images} text={textArray1} />
								<Section2 decryptedUrl={section3Images} text={textArray1} />
								<Section2 decryptedUrl={section4Images} text={textArray1} />
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
				</Box>
			</Container>
		</Box>
	);
};

export default UserPage;

//					<FullComponent decryptedUrl={section2Images} text={textArray2}/>
//				<FullComponent decryptedUrl={section3Images} text={textArray3}/>