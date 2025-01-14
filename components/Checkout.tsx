import { Box, Flex} from "@chakra-ui/react";
import CheckoutContent from "./CheckoutContent";
interface CheckoutProps {
	creatorId?: string;
	userId?: string;
}

const Checkout: React.FC<CheckoutProps> = ({ }) => {
	return (
		<>
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
					<Box maxW="480px">
						<CheckoutContent/>
					</Box>
				</Box>
				<Box flex="1" />
			</Flex>
		</>);
};

export default Checkout;
