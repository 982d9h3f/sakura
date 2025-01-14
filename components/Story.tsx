"use client";
import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import StoryText from "./StoryText";
const Story: React.FC = () => {
	return (
		<Flex direction={{ base: "column", md: "row" }}>
			<Box
				bg="white"
				flex="1"
				display="flex"
				alignItems="center"
				justifyContent="center"
				px={8}
			>
				<Box>
					<Text fontSize="25px" color="gray.600" textShadow="0px 0px 8px rgba(0, 0, 0, 0.3)" mb={1}>
						Story
					</Text>
					<Box maxW="500px">
						<StoryText/>
					</Box>
				</Box>
			</Box>
			<Box bg="rgba(0,0,0,0)" flex="1" />
		</Flex>
	);
};

export default Story;
