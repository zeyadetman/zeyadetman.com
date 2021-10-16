import { useColorModeValue } from '@chakra-ui/color-mode';
import { HStack, Stack, Text, Badge } from '@chakra-ui/layout';
import React, { ReactElement } from 'react';
import { ICareer } from '../../interfaces/career';

function CareerStack(props: { career: ICareer; key: string }): ReactElement {
	const { company, date, techStack } = props.career;
	const renderJobStack = () => {
		return techStack.map((tech: string) => (
			<Badge ms="0 !important" size="xs" key={tech}>
				{tech}
			</Badge>
		));
	};

	return (
		<Stack key={company} mb="12px !important">
			<HStack justify="space-between">
				<Text
					fontWeight="bold"
					fontSize="lg"
					color={useColorModeValue('blackMid', 'whiteMid')}
				>
					{company}
				</Text>
				<Text color="gray.500" fontSize="sm">
					{date}
				</Text>
			</HStack>
			<HStack flexWrap="wrap" style={{ gap: '8px 8px' }}>
				{renderJobStack()}
			</HStack>
		</Stack>
	);
}

export default CareerStack;
