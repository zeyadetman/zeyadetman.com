import { HStack, Stack, Text, Badge } from '@chakra-ui/layout';
import React from 'react';

interface Props {}

function CareerStack(props: {
	career: { company: string; date: string; techStack: [string] };
}) {
	const { company, date, techStack } = props.career;
	const renderJobStack = () => {
		return techStack.map((tech) => <Badge size="xs">{tech}</Badge>);
	};

	return (
		<Stack key={company}>
			<HStack justify="space-between">
				<Text fontWeight="bold" fontSize="lg">
					{company}
				</Text>
				<Text color="gray.500" fontSize="sm">
					{date}
				</Text>
			</HStack>
			<HStack>{renderJobStack()}</HStack>
		</Stack>
	);
}

export default CareerStack;
