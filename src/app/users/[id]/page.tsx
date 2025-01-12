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
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	SimpleGrid,
} from '@chakra-ui/react';
//import DragAndDrop from "../../../../components/DragAndDrop";
import { fetchAndDecryptFiles } from '../../../utils/crypto';
import FullComponent from '../../../../components/FullComponent';
import Section2 from '../../../../components/Section2';
import axios from 'axios';
import MedalViewer from '../../../../components/MedalModel';
const UserPage: React.FC = () => {
	const { id } = useParams() as { id: string };
	const headerFontSize = useBreakpointValue({ base: '2xl', md: '4xl' });
	const [decryptedUrls, setDecryptedUrls] = useState<string[]>([]);
	const [text,setText]=useState([]);
	const fileNames = [
		'Header.webp', 'medal.png',
		'010.webp', '011.webp', '012.webp',
		'023.webp', '021.webp', '022.webp',
		'030.webp', '031.webp', '032.webp',
	];
	useEffect(() => {
		const fetchImages = async () => {
			try {
				const [inviterId, visitorId] = id?.split('_') || [];
				const response = await axios.post('/api/checkIds', { inviterId, visitorId, });
				const decryptedBlobs = await fetchAndDecryptFiles(fileNames);
				const urls = decryptedBlobs.map((blob) => URL.createObjectURL(blob));
				setDecryptedUrls(urls);
				setText(response.data.head.split(','));
			} catch {
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
	];
	const section2Images = [decryptedUrls[2], decryptedUrls[3], decryptedUrls[4]];
	const section3Images = [decryptedUrls[5], decryptedUrls[6], decryptedUrls[7]];
	const section4Images = [decryptedUrls[8], decryptedUrls[9], decryptedUrls[10]];

	const d = useBreakpointValue({ base: 180, md: 220 });
	if (!d) return null;
	return (
		<Box >
			<Container
				maxW="800px"
				borderRadius="lg"
				p={{ base: 0, md: 4 }}
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
					<Box w="100%"><img src={decryptedUrls[0]} /></Box>
					<VStack spacing="100px" align="center" mt="100px">
						<Text fontSize="18px" textAlign="center">
							{text[0]}
						</Text>
						<Box
							w="100%"
							display="flex"
							flexDirection="column"
							alignItems="center"
							textAlign="center"
						>
							<Text fontSize="18px">
								{text[1]}
							</Text>
							<Box w={{ base: d * 2, md: d * 3 }} mr={{ base: 0, md: 8 }} my={5}>
								<SimpleGrid
									columns={{ base: 2, md: 4 }}
									spacing={0}
								>
									<MedalViewer width={d} height={d} />
									<MedalViewer width={d} height={d} />
									<MedalViewer width={d} height={d} />
									<MedalViewer width={d} height={d} />
									<MedalViewer width={d} height={d} />
									<MedalViewer width={d} height={d} />
									<MedalViewer width={d} height={d} />
									<MedalViewer width={d} height={d} />
								</SimpleGrid>
							</Box>
							<Text fontSize="18px">
								{text[2]}
							</Text>
						</Box>

						<Text fontSize="lg" textAlign="center">
							{text[3]}
						</Text>
						<Text fontSize="lg" textAlign="center">
							{text[4]}
							<Box as="span" fontFamily="'Caveat', cursive" fontSize="2xl" color="pink.500">
								{text[5]}
							</Box>{' '}
							{text[6]}
						</Text>
						<Text textAlign="center">{text[7]}</Text>
						<Text fontSize="lg" textAlign="center">
							<Box as="span" fontFamily="'Caveat', cursive" fontSize="2xl" color="pink.500">
								{text[8]}
							</Box>
							{text[9]}
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
								<Box my="50px" />
								<FullComponent decryptedUrl={section1Images} text={text.slice(10, 13)} />
								<Section2 decryptedUrl={section2Images} text={text.slice(10, 13)} />
								<Section2 decryptedUrl={section3Images} text={text.slice(10, 13)} />
								<Section2 decryptedUrl={section4Images} text={text.slice(10, 13)} />
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