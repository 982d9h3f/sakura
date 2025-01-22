// src/app/page.tsx
"use client";

import React from "react";
import {
	Box,
	Flex,
	Image,
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
import InfoModal from '../../components/InfoModal';
import StyledText from "components/StyledText";
import Terms from "components/Terms";
import Privacy from "components/Privacy";
const Home: React.FC = () => {
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
							<Box>
								<MedalViewer width={400} height={400} />
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
			<Flex
				py={6}
				px={10}
				textAlign="end"
				bg="pink.200"
				align="center"
				justify="flex-end"
				gap={{ base: 1, md: 4 }}
				direction={{ base: "column", md: "row" }}
			>
				<StyledText lang="en">
					&copy; {new Date().getFullYear()} SAKURA. All Rights Reserved.
				</StyledText>
				<Privacy />
				<Terms />
				<InfoModal />
			</Flex>
		</>
	);
};
export default Home;