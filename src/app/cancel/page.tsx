// api/cancel/page.tsx
import React, { Suspense } from "react";
import { VStack, Spinner, Text } from "@chakra-ui/react";
import CancelPageContent from "./CancelPageContent"; // 分割したコンポーネントをインポート

export default function CancelPage() {
	return (
		<Suspense
			fallback={
				<VStack align="center" justify="center" h="100vh" bg="pink.50">
					<Spinner size="xl" color="pink.500" />
					<Text fontSize="lg" color="pink.500">
						Loading...
					</Text>
				</VStack>
			}
		>
			<CancelPageContent />
		</Suspense>
	);
}
