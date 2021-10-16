import { useColorModeValue } from '@chakra-ui/color-mode';
import { HStack, Stack, Text, Badge } from '@chakra-ui/layout';
import React, { ReactElement } from 'react';
import { ICareer } from '../../interfaces/career';

function CareerStack(props: {
	career: ICareer;
	key: string;
	stackProps?: unknown;
	isChild?: boolean;
}): ReactElement {
	const { company, date, techStack, childs } = props.career;
	const renderJobStack = () => {
		return techStack.map((tech: string) => (
			<Badge ms="0 !important" size="xs" key={tech}>
				{tech}
			</Badge>
		));
	};

	const renderChilds = () => {
		if (!childs || childs?.length === 0) return null;

		return childs.map((career: ICareer) => (
			<CareerStack key={career.company} career={career} isChild />
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
					{props.isChild && (
						<Badge variant="tag" size="xs" me={2}>
							related to above
						</Badge>
					)}
					{company}
				</Text>
				<Text color="gray.500" fontSize="sm">
					{date}
				</Text>
			</HStack>
			<HStack flexWrap="wrap" style={{ gap: '8px 8px' }}>
				{renderJobStack()}
			</HStack>

			{renderChilds()}
		</Stack>
	);
}

export default CareerStack;
