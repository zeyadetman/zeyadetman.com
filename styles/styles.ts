export const customStyles = {
	Text: {
		paragraph: (): Record<string, unknown> => ({
			fontSize: 'sm',
			whiteSpace: 'pre-line',
			mb: 4,
		}),
		subTitle: (): Record<string, unknown> => ({
			fontSize: 'sm',
			my: 2,
			fontWeight: 'normal',
		}),
		subDescription: {
			fontSize: 'xs',
			ms: 1,
			fontWeight: 300,
			fontStyle: 'italic',
			display: 'inline',
		},
		highlightRed: (): Record<string, unknown> => ({
			fontStyle: 'italic',
			fontWeight: 700,
			background: 'red',
			p: '2px 10px',
			mt: 2,
			w: 'fit-content',
			color: 'whiteDark',
			display: 'inline-block',
			as: 'span',
		}),
	},
	Heading: {
		pageTitle: {},
		sectionTitle: ({ color }: { color: string }): Record<string, unknown> => ({
			size: 'xl',
			mb: 2,
			fontWeight: 'bold',
			as: 'h2',
			...(color ? { color } : {}),
		}),
	},
};
