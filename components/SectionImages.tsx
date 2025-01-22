"use client";
import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import FadeInWhenVisible from "./FadeInWhenVisible";

const SectionImages: React.FC = () => {
	const images = Array.from({ length: 8 }, (_, i) => {
		const imageIndex = i + 1;
		return `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/sakura/${imageIndex}.webp`;
	});

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
		<Flex h={{base:"100%",md:"100vh"}} direction={{ base: "column", md: "row" }}>
			<Box
				bg="pink.100"
				flex="1"
				py={12}
				px={8}
				display="flex"
				alignItems="center"
				justifyContent="center"
				textAlign={{ base: "center", md: "left" }}
			>
				<Box>
					<FadeInWhenVisible>
						<Image
							src={images[0]}
							alt="Sakura 1"
							maxH="70vh"
							objectFit="cover"
							borderRadius="lg"
							boxShadow="md"
							mr={{ base: 0, md: 8 }}
							mb={{ base: 8, md: 0 }}
						/>
					</FadeInWhenVisible>
					<FadeInWhenVisible>
						<Image
							src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/sakura/3.webp`}
							alt="Sakura 3"
							maxW="230px"
							objectFit="cover"
							borderRadius="lg"
							boxShadow="md"
							mt={{ base: "-180px", md: "-180px" }}
							ml={{ base: 0, md: "20px" }}
							mb={{ base: 8, md: 0 }}
						/>
					</FadeInWhenVisible>
				</Box>
			</Box>
			<Box
				bg="white"
				flex="1"
				py={12}
				px={8}
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<FadeInWhenVisible>
					<Box maxW="800px">
						<Text {...EN}>
							In the heart of Japan, where tradition dances with innovation, SAKURA
							takes root. Inspired by the delicate cherry blossom, a timeless emblem
							of fleeting beauty and renewal, we bring the soul of Japan to the
							world stage.
						</Text>
						<Text {...JP}>
							伝統と革新が踊る日本の中心で、SAKURAは根を下ろします。儚い美と再生の象徴である繊細な桜の花からインスピレーションを受け、
							日本の心を世界の舞台へ
						</Text>
					</Box>
				</FadeInWhenVisible>
			</Box>
		</Flex>
	);
};

export default SectionImages;
