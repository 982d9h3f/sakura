"use client";
import React from "react";
import { Box, Text, Grid, GridItem, Image } from "@chakra-ui/react";

const Gallery: React.FC = () => {
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
    <Box h="110vh" w="100%" display="flex" justifyContent="center" alignItems="center" bg="white">
      <Box py={12} px={8} textAlign="center">
        <Box maxW="4xl" mx="auto" mb={8}>
          <Text {...EN}>
			{`Just as cherry blossoms captivate hearts worldwide, we share the grace,
            precision, and artistry of Japan with every piece we create, every story
            we help shape.`}
          </Text>
          <Text {...JP}>
			{`            桜の花が世界中の人々の心を魅了するように、私たちは日本の優美さ、正確さ、芸術性を、
            私たちが創り出すすべての作品、そして私たちが形作るすべてのストーリーを分かち合っています。`}
          </Text>
        </Box>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={6}
          maxW="6xl"
          mx="auto"
        >
          {images.slice(0).map((src, index) => (
            <GridItem key={index} boxShadow="md" borderRadius="lg" overflow="hidden">
              <Image
                src={src}
                alt={`Sakura image ${index + 1}`}
                objectFit="cover"
                w="100%"
                h="200px"
                transition="transform 0.3s"
                _hover={{ transform: "scale(1.05)" }}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Gallery;
