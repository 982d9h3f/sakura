"use client";
import React from "react";
import { Box, Image, Flex, Text } from "@chakra-ui/react";
import FadeInWhenVisible from "./FadeInWhenVisible";

const LargeImage: React.FC = () => {
	const EN = {
		fontSize: "17px",
		color: "gray.600",
		textShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
	};

	const JP = {
		fontSize: "16px",
		color: "gray.600",
		textShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
		mt: "8px",
		mb: "50px",
	};

	return (
		<Flex h="100vh" w="100%" display="flex" justifyContent="center" alignItems="center" direction={{ base: "column", md: "row" }}>
			<Box w="100%" display="flex" justifyContent="center" alignItems="center">
				<Box h={{base:"50vh",md:"100vh"}}  p={{base:10,md:0}} w="100%" display="flex" justifyContent="center" alignItems="center">
					<Image
						src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/sakura/5.webp`}
						alt="Sakura 5"
						objectFit="cover"
						borderRadius="lg"
						boxShadow="md"
					/>
				</Box>
			</Box>
			<FadeInWhenVisible>
				<Box p={10} w="100%" gap={10}>
					<Text {...EN}>
						the craftsmanship — jewelry that whispers tales of elegance, precious
						metals that gleam with heritage, and artisanal creations that honor
						centuries of artistry.
					</Text>
					<Text {...JP}>
						職人の技 - エレガンスの物語をささやくジュエリー、伝統の輝きを放つ貴金属、
						何世紀にもわたる芸術性を称える職人技の作品。
					</Text>
				</Box>
			</FadeInWhenVisible>
		</Flex>
	);
};

export default LargeImage;
