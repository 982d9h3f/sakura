'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // URL パラメータを取得
import {
	Box,
	Text,
	VStack,
	useBreakpointValue,
	Container,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
} from '@chakra-ui/react';
import { fetchAndDecryptFiles2 } from '../../../utils/crypto';
import FullComponent from '../../../../components/FullComponent';
import Section2 from '../../../../components/Section2';
import axios from 'axios';
import SpinningBoxes from '../../../../components/SpinningBoxes';
import StoryText from '../../../../components/StoryText';
import CheckoutContent from '../../../../components/CheckoutContent';
import { Colab, emptyColab } from '@/lib/types/Colab';
const UserPage: React.FC = () => {
	const { id } = useParams() as { id: string };
	const headerFontSize = useBreakpointValue({ base: '2xl', md: '4xl' });
	const [decryptedUrls, setDecryptedUrls] = useState<string[]>([]);
	const [start, setStart] = useState(false);
	const [state, setState] = useState(0);
	const [colab, setColab] = useState<Colab>(emptyColab);
	useEffect(() => {
		const fetchImages = async () => {
			try {
				const pageData = await axios.post('/api/getData', { id });
				setColab(pageData.data.colab);
				const combinePath = [
					...pageData.data.colab.contentTmp.split(','),
					...pageData.data.colab.content.split(','),
				];
				const decryptedBlobs = await fetchAndDecryptFiles2(combinePath);
				const urls = decryptedBlobs.map((blob) => URL.createObjectURL(blob));
				setDecryptedUrls(urls);
				setStart(true);
				setState(1);
			} catch {
				setState(2);
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

	useEffect(() => {
		const link = document.createElement('link');
		link.href = 'https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700&display=swap';
		link.rel = 'stylesheet';
		document.head.appendChild(link);
		return () => {
			document.head.removeChild(link);
		};
	}, []);


	const d = useBreakpointValue({ base: 180, md: 220 });
	if (!d) return null;
	return (
		<Box fontFamily="'Zen Maru Gothic', sans-serif" fontSize="16px">
			<SpinningBoxes keepAnimation={!start && state == 0} />
			{state == 1 ?
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
							{colab?.language == "jp" ? 'コラボ企画！！' : 'Collaboration'}
						</Text>
						<Text as="h1" fontSize={headerFontSize} textAlign="center">
							SAKURA
						</Text>
						<Text as="h1" fontSize={headerFontSize} textAlign="center">
							✕
						</Text>
						<Box w="100%"><img src={decryptedUrls[0]} /></Box>
						<VStack spacing="100px" align="center" mt="100px">
							<Text fontSize="18px" textAlign="center" fontWeight="bold">
								{colab?.language == "jp" ? colab?.textLpJP?.split(',')[0] || '' : colab?.textLpEN?.split(',')[0] || ''}
							</Text>
							<Box
								w="100%"
								display="flex"
								flexDirection="column"
								alignItems="center"
								textAlign="center"
							>
								<Text fontSize="18px">
									{colab?.language == "jp" ? colab?.textLpJP?.split(',')[1] || '' : colab?.textLpEN?.split(',')[1] || ''}
								</Text>
								<Box m={5}>
									<Box maxW="200px">
										<img src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/sakura/medal_trans.png`} alt="Medal" />
									</Box>
								</Box>
								<Text fontSize="18px">
									{colab?.language == "jp" ? colab?.textLpJP?.split(',')[2] || '' : colab?.textLpEN?.split(',')[2] || ''}
								</Text>
							</Box>

							<Text fontSize="lg" textAlign="center">
								{colab?.language == "jp" ? colab?.textLpJP?.split(',')[3] || '' : colab?.textLpEN?.split(',')[3] || ''}
							</Text>
							<Text fontSize="lg" textAlign="center">
								{colab?.language == "jp" ? colab?.textLpJP?.split(',')[4] || '' : colab?.textLpEN?.split(',')[4] || ''}
								<Box as="span" fontSize="2xl" color="pink.500">
									{colab?.language == "jp" ? colab?.textLpJP?.split(',')[5] || '' : colab?.textLpEN?.split(',')[5] || ''}
								</Box>{' '}
								{colab?.language == "jp" ? colab?.textLpJP?.split(',')[6] || '' : colab?.textLpEN?.split(',')[6] || ''}
							</Text>
							<Text textAlign="center">{colab?.language == "jp" ? colab?.textLpJP?.split(',')[7] || '' : colab?.textLpEN?.split(',')[7] || ''}</Text>
							<Text fontSize="lg" textAlign="center">
								<Box as="span" fontSize="2xl" color="pink.500">
									{colab?.language == "jp" ? colab?.textLpJP?.split(',')[8] || '' : colab?.textLpEN?.split(',')[8] || ''}
								</Box>
								{colab?.language == "jp" ? colab?.textLpJP?.split(',')[9] || '' : colab?.textLpEN?.split(',')[9] || ''}
							</Text>
						</VStack>
						<Accordion allowToggle my="50px" border="none" _focus={{ boxShadow: 'none' }}>
							<AccordionItem border="none">
								<h2>
									<AccordionButton
										bg="pink"
										maxW="300px"
										mx="auto"
										display="flex"
										justifyContent="center"
										alignItems="center"
										borderRadius="10px"
										border="none"
										_focus={{ boxShadow: 'none' }}
									>
										<Box flex="1" textAlign="center" color="black">
											{colab?.language == "jp" ? "あける💖" : "Open💖"}
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel p={0}>
									<Box my="50px" />
									<FullComponent decryptedUrl={section1Images} Colab={colab} />
									<Section2 decryptedUrl={section2Images} text={colab.language == 'jp' ? colab.textJP.split(',')[0] : colab.textEN.split(',')[0]} Colab={colab} />
									<Section2 decryptedUrl={section3Images} text={colab.language == 'jp' ? colab.textJP.split(',')[1] : colab.textEN.split(',')[1]} Colab={colab} />
									<Section2 decryptedUrl={section4Images} text={colab.language == 'jp' ? colab.textJP.split(',')[2] : colab.textEN.split(',')[2]} Colab={colab} />
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					</Box>
				</Container>
				:
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
					<Box w="100%" p={3}>
						<Text fontSize="25px" textAlign="center" my={5}>
							SAKURA Medal Story
						</Text>
						<StoryText />
						<Box m={5} w="100%" textAlign="center">
							<Box maxW="200px" mx="auto">
								<img src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/sakura/medal_trans.png`} alt="Medal" />
							</Box>
						</Box>
						<CheckoutContent />
					</Box>
				</Container>
			}
		</Box>
	);
};

export default UserPage;


/*

									<MedalViewer width={d} height={d} />
									<MedalViewer width={d} height={d} />
									<MedalViewer width={d} height={d} />
									<MedalViewer width={d} height={d} />
									<MedalViewer width={d} height={d} />
									<MedalViewer width={d} height={d} />
									<MedalViewer width={d} height={d} />


																	<FullComponent decryptedUrl={section1Images} text={text.slice(10, 13)} creatorId={inviterId} userId={visitorId} />
								<Section2 decryptedUrl={section2Images} text={text.slice(10, 13)} creatorId={inviterId} userId={visitorId} />
								<Section2 decryptedUrl={section3Images} text={text.slice(10, 13)} creatorId={inviterId} userId={visitorId} />
								<Section2 decryptedUrl={section4Images} text={text.slice(10, 13)} creatorId={inviterId} userId={visitorId} />

*/

