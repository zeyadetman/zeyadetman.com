import { HStack, Stack, Text, Badge } from '@chakra-ui/layout';
import React from 'react';

interface Props {}

function CareerStack(props: {
	career: { company: string; date: string; techStack: [string] };
}) {
	const { company, date, techStack } = props.career;
	const renderJobStack = () => {
		return techStack.map((tech) => (
			<Badge ms="0 !important" size="xs">
				{tech}
			</Badge>
		));
	};

	return (
		<Stack key={company} mb="12px !important">
			<HStack justify="space-between">
				<Text fontWeight="bold" fontSize="lg">
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
