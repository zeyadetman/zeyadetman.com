import { useColorModeValue } from '@chakra-ui/color-mode';

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
						bg: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
						color: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
					},
				},
			},
		}),
	},
	Link: {
		variants: (props: any) => ({
			default: {
				color: props.colorMode === 'dark' ? 'grey.500' : '#1a85ff',
			},
			nav: {
				color: 'black',
			},
			title: {
				color: 'black',
			},
		}),
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
					bg: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
					color: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
				},
				_active: {
					bg: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
					color: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
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
				backgroundColor: '#ffc700',
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
