// src/app/success/page.tsx

import React, { Suspense } from "react";
import { VStack, Spinner, Text } from "@chakra-ui/react";
import SuccessPageContent from "./SuccessPageContent"; // ロジック部分をインポート

export default function SuccessPage() {
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
			<SuccessPageContent />
		</Suspense>
	);
}
