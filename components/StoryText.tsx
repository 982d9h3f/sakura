// components/StoryText.tsx
"use client";
import React from "react";
import StyledText from "./StyledText";
import { Box } from "@chakra-ui/react";
const StoryText: React.FC = () => {
	const m = 8;
	const m2=1;
	return (
		<>
			<StyledText lang="en" color={{base:"white",md:"gray.600"}}>
				{`Sado Island's mines produced a vast amount of silver, making it one of
          the leading global producers during the Edo period.`}
			</StyledText>
			<Box my={m2}/>
			<StyledText lang="jp" color={{base:"white",md:"gray.600"}}>
				{`佐渡の鉱山は膨大な量の銀を産出し、江戸時代には世界有数の産地となった。`}
			</StyledText>
			<Box my={m} />
			<StyledText lang="en" color={{base:"white",md:"gray.600"}}>
				{`Sado’s silver, known for its high purity and brilliance, was exported
          beyond Japan, contributing significantly to international trade. It
          played a vital role in the economies of Europe, Asia, and other
          regions, symbolizing Japan’s craftsmanship and economic influence.`}
			</StyledText>
			<Box my={m2}/>
			<StyledText lang="jp" color={{base:"white",md:"gray.600"}}>
				{`佐渡の銀は、その純度の高さと輝きで知られ、日本国外にも輸出され、国際貿易に大きく貢献した。
          ヨーロッパ、アジアなどの経済において重要な役割を果たし、日本の工芸技術と経済的影響力を象徴していた。`}
			</StyledText>
			<Box my={m} />
			<StyledText lang="en" color={{base:"white",md:"gray.600"}}>
				{`We collaborated with a global platform that is promising but still in
          its early stages. As a gesture of support and belief in their success,
          we designed a silver medal. The "Silver 999" designation represents the
          high quality of Sado silver and symbolizes success on a global scale.`}
			</StyledText>
			<Box my={m2}/>
			<StyledText lang="jp" color={{base:"white",md:"gray.600"}}>
				{`私たちは、有望ではあるがまだ初期段階にあるグローバル・プラットフォームとコラボレートした。
          彼らの成功への支援と信念の証として、私たちは銀メダルをデザインした。「シルバー999」は
          佐渡銀の品質の高さを表し、世界規模での成功を象徴している。`}
			</StyledText>
			<Box my={m} />
			<StyledText lang="en" color={{base:"white",md:"gray.600"}}>
				{`The design playfully reflects their brand identity. A modernized
          Japanese art pattern is combined with their dolphin logo, set against a
          backdrop of the sea. The unisex design embodies a sense of modernity
          while incorporating Japanese elements through the wave motif and the
          choice of materials.`}
			</StyledText>
			<Box my={m2}/>
			<StyledText lang="jp" color={{base:"white",md:"gray.600"}}>
				{`このデザインは、彼らのブランド・アイデンティティを遊び心たっぷりに反映している。
          モダナイズされた日本のアートパターンが、海を背景にしたイルカのロゴと組み合わされている。
          波のモチーフや素材選びで和の要素を取り入れながら、ユニセックスなデザインで
          モダンさを体現している。`}
			</StyledText>
		</>
	);
};

export default StoryText;
