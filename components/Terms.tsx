"use client";

import { useState } from 'react';
import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react';
import StyledText from './StyledText';
import { termsTextJp, termsTextEn, LegalText } from './TermsText';
interface ModalProps {
	onClose: () => void;
	termsText: LegalText[];
}

const Modal: React.FC<ModalProps> = ({ onClose, termsText }) => {
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
			<Box w="100%" maxW="800px" bg="rgba(235,235,235,1)" py={5} pl={5} pr={2} borderRadius="20px" overflowY="auto">
				<Box textAlign="left" maxHeight="80vh" overflowY="auto" width="100%">
					<VStack spacing={2} align="start">
						{termsText.map((item: LegalText, index: number) => (
							<Box key={index}>
								{item.type === "title" ? (
									<>
										<Heading as="h2" size="lg" mb={1} mt={5}>
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
				<Button onClick={onClose} colorScheme='pink' mt={3}>
					Close
				</Button>
			</Box>
		</Box>
	);
};

interface TermsProps {
	fontSize?: string;
}

const Terms: React.FC<TermsProps> = ({ fontSize = '16px' }) => {
	const [isOpenJP, setIsOpenJP] = useState(false);
	const [isOpenEN, setIsOpenEN] = useState(false);

	const handleOpenModalJP = async () => {
		setIsOpenJP(true);
	};

	const handleOpenModalEN = async () => {
		setIsOpenEN(true);
	};

	return (
		<Box textAlign="center">
			<StyledText
				lang="jp"
				onClick={handleOpenModalEN}
				cursor="pointer"
				fontSize={fontSize}
			>
				Terms of Use
			</StyledText>
			{isOpenEN && (
				<Modal
					onClose={() => setIsOpenEN(false)}
					termsText={termsTextEn}
				/>
			)}
			<StyledText
				lang="jp"
				onClick={handleOpenModalJP}
				cursor="pointer"
				fontSize={fontSize}
			>
				利用規約
			</StyledText>
			{isOpenJP && (
				<Modal
					onClose={() => setIsOpenJP(false)}
					termsText={termsTextJp}
				/>
			)}
		</Box>
	);
};

export default Terms;
