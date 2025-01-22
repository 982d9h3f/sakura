import { Box, Flex } from "@chakra-ui/react";
import CheckoutContent from "./CheckoutContent";
import ImageGallery from "./ImageGallery";
interface CheckoutProps {
	creatorId?: string;
	userId?: string;
}

const Checkout: React.FC<CheckoutProps> = ({ }) => {
	return (
		<Flex
			h={{base:"100%",md:"100vh"}}
			bg="white"
			justifyContent="space-between"
			alignItems="center"
			px={{ base: 0, md: 10 }}
			direction={{ base: "column-reverse", md: "row" }}
		>
			<Flex justifyContent="center" alignItems="center" w={{ base: "100%", md: "50%" }} py={{base:"50px",md:0}}>
				<Box maxW="800px" w="100%">
					<CheckoutContent />
				</Box>
			</Flex>
			<Flex justifyContent="center" alignItems="center" w={{ base: "100%", md: "50%" }}>
				<Box w="100%">
					<ImageGallery />
				</Box>
			</Flex>
		</Flex>
	);
};

export default Checkout;

/*


			<Flex h="100vh" direction={{ base: "column", md: "row" }}>
				<Box
					bg="white"
					flex="1"
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					px={8}
				>
					<ImageGallery/>
					<Box maxW="480px">
						<CheckoutContent/>
					</Box>
				</Box>
				<Box flex="1" />
			</Flex>

*/
