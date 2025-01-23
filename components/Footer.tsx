// FooterComponent.tsx
import { Flex } from '@chakra-ui/react';
import StyledText from 'components/StyledText';
import Privacy from 'components/Privacy';
import Terms from 'components/Terms';
import InfoModal from 'components/InfoModal';

const Footer: React.FC = () => {
	const fontSize = "14px";
    return (
        <Flex
            py={6} px={10}
            w="100%"
            textAlign="end"
            bg="pink.200"
            align="center"
            justify="flex-end"
            gap={{ base: 1, md: 4 }}
            direction={{ base: "column", md: "row" }}
        >
            <StyledText lang="en" fontSize={fontSize}>&copy; {new Date().getFullYear()} SAKURA. All Rights Reserved.</StyledText>
			<InfoModal  fontSize={fontSize}/>
            <Privacy  fontSize={fontSize}/>
            <Terms  fontSize={fontSize}/>
        </Flex>
    );
};

export default Footer;
