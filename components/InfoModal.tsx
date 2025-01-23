"use client";

import { useState } from "react";
import axios from "axios";
import { Box, VStack, Heading, Text, Button } from "@chakra-ui/react";
import StyledText from "./StyledText";

/**
 * データベースから取得する可能性があるデータ構造をユニオン型で表現
 * - string: エラー文や "Loading..." 等を格納
 * - { value: LegalText[] }: Dynamo から取得した利用規約の配列などを格納
 */
type FetchedContent = string | { value: LegalText[] };

/**
 * LegalText の定義
 */
export type LegalText = {
	title: string;
	content: string;
	type?: "title";
};

/**
 * モーダルに渡すプロパティの型定義
 */
interface ModalProps {
	onClose: () => void;
	// content は string（メッセージ）か、{ value: LegalText[] } のどちらかと想定
	content: FetchedContent | null;
}

const Modal: React.FC<ModalProps> = ({ onClose, content }) => {
	return (
		<Box
			position="fixed"
			top="0"
			left="0"
			w="100vw"
			h="100vh"
			bg="rgba(0,0,0,0.4)"
			zIndex={1000}
			display="flex"
			alignItems="center"
			justifyContent="center"
			overflow="hidden"
		>
			<Box w="100%" maxW="500px" bg="rgba(235,235,235,1)" p={5} borderRadius="20px">
				{typeof content === "string" ? (
					// content が string の場合（例: エラーメッセージや "Loading..."）
					<Text>{content}</Text>
				) : content && content.value ? (
					// content が { value: LegalText[] } の場合
					<Box textAlign="left" maxHeight="80vh" overflowY="auto" width="100%">
						<VStack spacing={2} align="start">
							{content.value.map((item: LegalText, index: number) => (
								<Box key={index}>
									{item.type === "title" ? (
										<>
											<Heading as="h2" size="lg" mb={1}>
												{item.title}
											</Heading>
											{item.content && <Text>{item.content}</Text>}
										</>
									) : item.title ? (
										<Box>
											<Text as="span" fontWeight="bold">
												{`${item.title} : `}
											</Text>
											<Text as="span">{item.content}</Text>
										</Box>
									) : (
										<Text>{item.content}</Text>
									)}
								</Box>
							))}
						</VStack>
					</Box>
				) : (
					<p>No data available</p>
				)}
				<Button onClick={onClose} colorScheme="pink" mt={3}>
					Close
				</Button>
			</Box>
		</Box>
	);
};

interface InfoModalProps {
	fontSize?: string;
  }

  const InfoModal: React.FC<InfoModalProps> = ({ fontSize = '16px' }) => {
	const [isOpenJP, setIsOpenJP] = useState(false);
	const [isOpenEN, setIsOpenEN] = useState(false);
	const [dataJP, setDataJP] = useState<FetchedContent | null>(null);
	const [dataEN, setDataEN] = useState<FetchedContent | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async () => {
		setLoading(true);
		setError(null);

		try {
			const [responseJP, responseEN] = await Promise.all([
				axios.post("/api/readDynamo", {
					tableName: `${process.env.NEXT_PUBLIC_DYNAMO_PREFIX}-cache`,
					id: "Info",
				}),
				axios.post("/api/readDynamo", {
					tableName: `${process.env.NEXT_PUBLIC_DYNAMO_PREFIX}-cache`,
					id: "InfoEN",
				}),
			]);

			setDataJP(responseJP.data.item);
			setDataEN(responseEN.data.item);
		} catch (err) {
			// 未使用警告を回避するためにログ出力
			console.error(err);
			setError("Failed to fetch data");
		} finally {
			setLoading(false);
		}
	};

	const handleOpenModalJP = async () => {
		await fetchData();
		setIsOpenJP(true);
	};

	const handleOpenModalEN = async () => {
		await fetchData();
		setIsOpenEN(true);
	};

	return (
		<Box textAlign="center">
			<StyledText lang="en" onClick={handleOpenModalEN} cursor="pointer" fontSize={fontSize}>
				Consumer Protection
			</StyledText>
			{isOpenEN && (
				<Modal
					onClose={() => setIsOpenEN(false)}
					content={loading ? "Loading..." : error || dataEN}
				/>
			)}

			<StyledText lang="jp" onClick={handleOpenModalJP} cursor="pointer" fontSize={fontSize}>
				特定商取引法に基づく表記
			</StyledText>
			{isOpenJP && (
				<Modal
					onClose={() => setIsOpenJP(false)}
					content={loading ? "Loading..." : error || dataJP}
				/>
			)}
		</Box>
	);
};

export default InfoModal;
