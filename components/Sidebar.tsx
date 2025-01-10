'use client'; // この行を追加してクライアントコンポーネントにする
import { Box } from "@chakra-ui/react";
const Sidebar: React.FC = () => {
	const handleScroll = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};
	return (
		<Box
			w="160px"
			color="white"
			textShadow="0px 0px 8px rgba(0, 0, 0, 0.8)"
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			gap="20px"
		>
			<Box
				as="button"
				onClick={() => handleScroll("Home")}
				_hover={{ color: "pink.300" }}
			>
				Home
			</Box>
			<Box
				as="button"
				onClick={() => handleScroll("Concepts")}
				_hover={{ color: "pink.300" }}
			>
				Concepts
			</Box>
			<Box
				as="button"
				onClick={() => handleScroll("Story")}
				_hover={{ color: "pink.300" }}
			>
				Story
			</Box>
			<Box
				as="button"
				onClick={() => handleScroll("Collection")}
				mb={6}
				_hover={{ color: "pink.300" }}
			>
				Collection
			</Box>
		</Box>
	);
};

export default Sidebar;
