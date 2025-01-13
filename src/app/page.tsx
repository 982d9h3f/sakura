"use client";
// 参考サイト https://fillinglife.co/en/
import React from "react";
import {
	Box,
	Flex,
	Text,
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
				<Flex h="30vh" direction={{ base: "column", md: "row" }}>
					<Box bg="white" flex="1" />
					<Box flex="1" />
				</Flex>
				<Checkout/>
			</Box>
			<Box py={6} textAlign="center" bg="pink.200">
				<Text fontSize="sm">
					&copy; {new Date().getFullYear()} SAKURA. All Rights Reserved.
				</Text>
			</Box>
		</>
	);
};

export default Home;
//		<OrderSection />