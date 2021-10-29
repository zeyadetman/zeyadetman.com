import { FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi';
import { DiStackoverflow } from 'react-icons/di';
import { HiOutlineMail } from 'react-icons/hi';
import { site } from '../../configs/site';

export interface ISocialIcon {
	label: string;
	href: string;
	icon: JSX.Element;
	hidden: boolean;
}

export const socialLinks: ISocialIcon[] = [
	{
		label: 'Twitter',
		href: `https://twitter.com/${site.twitter.username}`,
		icon: <FiTwitter />,
		hidden: !site.twitter.username,
	},
	{
		label: 'Linkedin',
		href: `https://www.linkedin.com/in/${site.social.linkedin}`,
		icon: <FiLinkedin />,
		hidden: !site.social.linkedin,
	},
	{
		label: 'Stack Overflow',
		href: `https://stackoverflow.com/users/${site.social.stackoverflow}`,
		icon: <DiStackoverflow />,
		hidden: !site.social.stackoverflow,
	},
	{
		label: 'Github',
		href: `https://www.github.com/${site.social.github}`,
		icon: <FiGithub />,
		hidden: !site.social.github,
	},
	{
		label: 'Email',
		href: `mailto:${site.email}`,
		icon: <HiOutlineMail />,
		hidden: !site.email,
	},
];
