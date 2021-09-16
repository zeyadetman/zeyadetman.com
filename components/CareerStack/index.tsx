import { HStack, Stack, Text } from '@chakra-ui/layout';
import React from 'react';

interface Props {}

function CareerStack(props: { career: { company: string; date: string } }) {
	const { company, date } = props.career;

	return (
		<Stack key={company}>
			<HStack justify="space-between">
				<Text>{company}</Text>
				<Text color="gray.500" fontSize="sm">
					{date}
				</Text>
			</HStack>
		</Stack>
	);
}

export default CareerStack;
