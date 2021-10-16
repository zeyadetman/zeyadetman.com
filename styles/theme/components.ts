export const components = {
	Checkbox: {
		baseStyle: (props: any) => ({
			control: {
				bg: props.colorMode === 'dark' ? 'black' : 'white',
				outline: 'none',
				_checked: {
					bg: props.colorMode === 'dark' ? 'white' : 'black',
					border: 'none',
					_hover: {
						bg: props.colorMode === 'dark' ? 'white' : 'black',
						color: props.colorMode === 'dark' ? 'black' : 'white',
					},
				},
			},
		}),
	},
	Link: {
		variants: {
			default: (props: any) => ({
				color: props.colorMode === 'dark' ? 'orange' : 'blue',
			}),
			nav: (props: any) => ({
				color: props.colorMode === 'dark' ? 'whiteDark' : 'black',
			}),
			title: (props: any) => ({
				color: props.colorMode === 'dark' ? 'whiteDark' : 'black',
			}),
		},
		defaultProps: {
			variant: 'default',
		},
	},
	Button: {
		variants: {
			solid: (props: any) => ({
				bg: props.colorMode === 'dark' ? 'white' : 'black',
				color: props.colorMode === 'dark' ? 'black' : 'white',
				borderRadius: 0,
				_hover: {
					bg: props.colorMode === 'dark' ? 'white' : 'black',
					color: props.colorMode === 'dark' ? 'black' : 'white',
				},
				_active: {
					bg: props.colorMode === 'dark' ? 'white' : 'black',
					color: props.colorMode === 'dark' ? 'black' : 'white',
				},
			}),
			outline: {
				borderRadius: 0,
			},
		},
	},
	Input: {
		sizes: {
			md: {
				field: {
					borderRadius: 'none',
					fontSize: 'sm',
					px: 4,
					py: 2,
				},
			},
		},
		variants: {
			outline: {
				field: {
					_hover: {
						bg: 'backgroundHoverColor',
						boxShadow: 'none',
					},
					_focus: {
						borderColor: 'black',
						boxShadow: 'none',
					},
				},
			},
			inset: {
				field: {
					_hover: {
						bg: 'transparent',
					},
				},
			},
		},
		defaultProps: {},
	},
	Badge: {
		variants: {
			tag: {
				backgroundColor: 'orange',
				color: 'black',
			},
		},
		sizes: {
			sm: {
				fontSize: 'sm',
			},
			xs: {
				fontSize: '0.7rem',
				fontWeight: 'normal',
				textTransform: 'none',
			},
		},
	},
};
