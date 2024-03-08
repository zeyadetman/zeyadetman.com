import { socials } from "@/app/components/layout/config/socials";

export const renderSocials = () => {
  return socials.map((social) => (
    <li key={social.name}>
      <button className="btn btn-ghost btn-circle btn-sm">
        <social.icon size={16} />
      </button>
    </li>
  ));
};
