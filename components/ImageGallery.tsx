"use client";
import { useState } from "react";
import { Box, Image, VStack, Text } from "@chakra-ui/react";
interface ImageGalleryProps {
	images?: string[];
}
const images = [
	"/1.jpg",
	"/2.jpg",
	"/3.jpg",
	"/4.jpg"
];
const ImageGallery: React.FC<ImageGalleryProps> = () => {
	const [selectedImage, setSelectedImage] = useState(images[0]);
	return (
		<Box display="flex" alignItems="center" gap={6} position="relative">
			<Box
				position="relative"
				boxSize={{ base: "300px", md: "500px", lg: "600px" }}
				borderRadius="md"
				overflow="hidden"
				boxShadow="xl"
			>
				<Image src={selectedImage} alt="Selected Image" boxSize="100%" objectFit="cover" />
				<Box
					position="absolute"
					top="0"
					left="0"
					width="100%"
					height="100%"
					bg="rgba(0, 0, 0, 0.4)"  // Dark overlay
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Box p={5}>
						<Text fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} color="white" fontWeight="bold">
							These are sample images.
						</Text>
						<Text fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} color="white" fontWeight="bold">
							The Sakura Medal is scheduled to be released by late February.
						</Text>
					</Box>
				</Box>
			</Box>
			<VStack spacing={4}>
				{images.map((img, index) => (
					<Box
						key={index}
						position="relative"
						cursor="pointer"
						border={selectedImage === img ? "3px solid pink" : "3px solid transparent"}
						borderRadius="md"
						overflow="hidden"
						boxSize={{ base: "80px", md: "100px", lg: "120px" }}
						_hover={{ border: "3px solid gray.300" }}
						onClick={() => setSelectedImage(img)}
					>
						<Image src={img} alt={`Thumbnail ${index}`} boxSize="100%" objectFit="cover" />

						{/* Overlay on thumbnails as well */}
						<Box
							position="absolute"
							top="0"
							left="0"
							width="100%"
							height="100%"
							bg="rgba(0, 0, 0, 0.4)"
							display="flex"
							alignItems="center"
							justifyContent="center"
						>
							<Text fontSize="sm" color="white" fontWeight="bold">
								Coming Soon
							</Text>
						</Box>
					</Box>
				))}
			</VStack>
		</Box>
	);
};

export default ImageGallery;
