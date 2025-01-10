"use client";
import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const Story: React.FC = () => {
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
		mb: "60px",
	};

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
						<Text {...EN}>
							Sado Island's mines produced a vast amount of silver, making it one of
							the leading global producers during the Edo period.
						</Text>
						<Text {...JP}>
							佐渡の鉱山は膨大な量の銀を産出し、江戸時代には世界有数の産地となった。
						</Text>

						<Text {...EN}>
							Sado’s silver, known for its high purity and brilliance, was exported
							beyond Japan, contributing significantly to international trade. It
							played a vital role in the economies of Europe, Asia, and other
							regions, symbolizing Japan’s craftsmanship and economic influence.
						</Text>
						<Text {...JP}>
							佐渡の銀は、その純度の高さと輝きで知られ、日本国外にも輸出され、国際貿易に大きく貢献した。
							ヨーロッパ、アジアなどの経済において重要な役割を果たし、日本の工芸技術と経済的影響力を象徴していた。
						</Text>

						<Text {...EN}>
							We collaborated with a global platform that is promising but still in
							its early stages. As a gesture of support and belief in their success,
							we designed a silver medal. The "Silver 999" designation represents the
							high quality of Sado silver and symbolizes success on a global scale.
						</Text>
						<Text {...JP}>
							私たちは、有望ではあるがまだ初期段階にあるグローバル・プラットフォームとコラボレートした。
							彼らの成功への支援と信念の証として、私たちは銀メダルをデザインしました。「シルバー999」は
							佐渡銀の品質の高さを表し、世界規模での成功を象徴しています。
						</Text>

						<Text {...EN}>
							The design playfully reflects their brand identity. A modernized
							Japanese art pattern is combined with their dolphin logo, set against a
							backdrop of the sea. The unisex design embodies a sense of modernity
							while incorporating Japanese elements through the wave motif and the
							choice of materials.
						</Text>
						<Text {...JP}>
							このデザインは、彼らのブランド・アイデンティティを遊び心たっぷりに反映している。
							モダナイズされた日本のアートパターンが、海を背景にしたイルカのロゴと組み合わされている。
							波のモチーフや素材選びで和の要素を取り入れながら、ユニセックスなデザインで
							モダンさを体現している。
						</Text>
					</Box>
				</Box>
			</Box>
			<Box bg="rgba(0,0,0,0)" flex="1" />
		</Flex>
	);
};

export default Story;
