import { Box, Text } from "@chakra-ui/react";
import CheckoutForm from './CheckoutForm';
interface CheckoutProps {
	creatorId?: string;
	userId?: string;
}

const CheckoutContent: React.FC<CheckoutProps> = ({ }) => {

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
		mb: "16px",
	};

	return (
		<>
			<Box textAlign="center" mb={8}>
				<Text {...EN}>
					{`Their journey has only just begun. It reminds us of what Apple's early
									creations mean today.`}
				</Text>
				<Text {...JP}>
					{`彼らの旅はまだ始まったばかりだ。アップルの初期のクリエイションが今日どのような意味を持つのかを思い出させてくれる。`}
				</Text>
			</Box>
			<Box textAlign="center" mb={8}>
				<Text fontSize="2xl" color="gray.800" mb={2}>
					Sakura Medal
				</Text>
				<Text fontSize="lg" color="gray.600" mb={2}>
					Price: $33.00
				</Text>
				<Text fontSize="lg" color="gray.600" mb={2}>
					Stock: 100 pieces
				</Text>
			</Box>
			<Box mb={5}><CheckoutForm /></Box>
		</>);
};

export default CheckoutContent;
