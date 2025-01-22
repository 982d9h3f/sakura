import { Box } from "@chakra-ui/react";
import CheckoutForm from './CheckoutForm';
import StyledText from './StyledText';
interface CheckoutProps {
	creatorId?: string;
	userId?: string;
}

const CheckoutContent: React.FC<CheckoutProps> = ({ }) => {
	return (
		<>
			<Box textAlign="center" mb={8}>
				<StyledText lang="en" fontSize="2xl" color="gray.800" mb={2}>
					Sakura Medal
				</StyledText>
				<Box my={2}>
					<StyledText lang="en">
						Made in Japan
					</StyledText>
					<StyledText lang="en">
						20mm×20mm×1.5mm, Weight:4.7g
					</StyledText>
					<StyledText lang="en">
						With an engraved 99.9% Silver certification
					</StyledText>
				</Box>
				<StyledText lang="en" fontSize="18px">
					Price: $33.00
				</StyledText>
				<StyledText lang="en">
					Stock: 100 pieces
				</StyledText>
				<Box my={5} maxW="300px" textAlign="center" mx="auto"><CheckoutForm /></Box>
			</Box>
		</>);
};

export default CheckoutContent;
