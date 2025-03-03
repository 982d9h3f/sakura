// src/app/page.tsx
"use client";

import React from "react";
import {
	Box,
	Flex,
	Image,
	useBreakpointValue,
} from "@chakra-ui/react";
import MainVisual from "../../components/MainVisual";
import SectionImages from "../../components/SectionImages";
import LargeImage from "../../components/LargeImage";
import Gallery from "../../components/Gallery";
import Story from "../../components/Story";
import Checkout from '../../components/Checkout';
const images = Array.from({ length: 8 }, (_, i) => {
	const imageIndex = i + 1;
	return `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/sakura/${imageIndex}.webp`;
}).filter(Boolean);
import MedalViewer from '../../components/MedalModel';
import StyledText from "components/StyledText";
import Footer from "components/Footer";
const Home: React.FC = () => {
	const showMedalViewer = useBreakpointValue({ base: "none", md: "block" });
	const showMedalImage = useBreakpointValue({ base: "flex", md: "none" });
	return (
		<>
			<Box position="relative">
				<Box
					position="sticky"
					top="0" left={0}
					h="0"
					bg="white"
					zIndex={-1}
				>
					<Image
						src={images[7]}
						alt="Sakura 1"
						w="45%"
						h="50vh"
						objectFit="cover"
						ml={{ base: "10px", md: "30px" }}
					/>
				</Box>
				<MainVisual />
				<SectionImages />
				<LargeImage />
			</Box>
			<Box position="relative">
				<Box
					position="sticky"
					top="0" right={0}
					h="0"
					bg="white"
					zIndex={-1}
				>
					<Flex h="100vh" direction={{ base: "column", md: "row" }}>
						<Box flex="1" />
						<Box
							flex="1"
							display="flex"
							justifyContent="center"
							alignItems="center"
						>
							<Box display={showMedalViewer}>
								<MedalViewer width={400} height={400} />
							</Box>
							<Box
								w="100%"
								maxW="400px"
								mr="5px"
								display={showMedalImage}
							>
								<img src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/sakura/medal_trans.png`} alt="Medal" />
							</Box>
						</Box>
					</Flex>
				</Box>
				<Gallery />
				<Flex h="80vh" direction={{ base: "column", md: "row" }}>
					<Box bg="white" flex="1" />
					<Box flex="1" />
				</Flex>
				<Story />
				<Box
					textAlign="center"
					h="120vh"
					display="flex"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					bg="rgba(0,0,0,0.5)"
					px={8}
				>
					<StyledText lang="en" color="white">
						{`Their journey has only just begun. It reminds us of what Apple's early creations mean today.`}
					</StyledText>
					<Box my={1} />
					<StyledText lang="jp" color="white">
						{`彼らの旅はまだ始まったばかりだ。アップルの初期のクリエイションが今日どのような意味を持つのかを思い出させてくれる。`}
					</StyledText>
				</Box>
			</Box>
			<Checkout />
			<Footer/>
		</>
	);
};
export default Home;