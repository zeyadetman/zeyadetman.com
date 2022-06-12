import {
  FiFacebook,
  FiGithub,
  FiTwitter,
  FiYoutube,
  FiCodepen,
  FiCodesandbox,
  FiInstagram,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";
import { FaStackOverflow, FaReddit } from "react-icons/fa";
import { ISocialLink } from "interfaces/ISocialLink";

const socialLinks: ISocialLink[] = [
  {
    icon: FiFacebook,
    value: "zeyadetman",
    href: "https://facebook.com/zeyadetman",
  },
  {
    icon: FiGithub,
    value: "zeyadetman",
    href: "https://github.com/zeyadetman",
  },
  {
    icon: FiTwitter,
    value: "@zeyadetman",
    href: "https://twitter.com/zeyadetman",
  },
  {
    icon: FiYoutube,
    value: "zeyadetman",
    href: "https://youtube.com/zeyadetman",
  },
  {
    icon: FiCodepen,
    value: "zeyadetman",
    href: "https://codepen.com/zeyadetman",
  },
  {
    icon: FiCodesandbox,
    value: "zeyadetman",
    href: "https://codesandbox.com/u/zeyadetman",
  },
  {
    icon: FiInstagram,
    value: "zeyadetman",
    href: "https://instagram.com/zeyadetman",
  },
  {
    icon: FiLinkedin,
    value: "zeyadetman",
    href: "https://linkedin.com/in/zeyadetman",
  },
  {
    icon: FiMail,
    value: "zeyadetman@gmail.com",
    href: "mailto:zeyadetman@gmail.com",
  },
  {
    icon: FaStackOverflow,
    value: "zeyadetman",
    href: "https://stackoverflow.com/users/5721245/zeyad-etman",
  },
  {
    icon: FaReddit,
    value: "zeyadetman",
    href: "https://reddit.com/user/zeyadetman",
  },
];

export default socialLinks;
