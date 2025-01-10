"use client";
import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import Sidebar from "./Sidebar"; // パスは適宜変更してください

const MainVisual: React.FC = () => {
	return (
		<Box
			bgImage={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/sakura/bg2.webp`}
			bgPosition="center"
			bgRepeat="no-repeat"
			bgSize="cover"
			h="100vh"
		>
			<Box position="absolute" top={0} left={0} p="30px">
				<Sidebar />
				<Heading as="h1" fontSize="4xl" color="white" mb={0}>
					SAKURA
				</Heading>
				<Text fontSize="lg" fontWeight="bold" mb={2} color="gray.200" opacity={0.8}>
					Blossoming Dreams in the heart of Japan
				</Text>
			</Box>
		</Box>
	);
};

export default MainVisual;
