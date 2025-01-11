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
			color="white"
			textShadow="0px 0px 8px rgba(0, 0, 0, 0.8)"
			display="flex"
			flexDirection="row"
			alignItems="left"
			justifyContent="left"
			gap="20px"
			mb="10px"
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
				_hover={{ color: "pink.300" }}
			>
				Collection
			</Box>
		</Box>
	);
};

export default Sidebar;
