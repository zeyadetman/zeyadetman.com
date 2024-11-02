import { socials } from "@/app/_components/layout/config/socials";

export const renderSocials = () => {
  return socials.map((social) => (
    <li key={social.name}>
      <button
        onClick={() => {
          window.open(social.href, "_blank");
        }}
        className="btn btn-ghost btn-circle btn-sm"
      >
        <social.icon size={16} />
      </button>
    </li>
  ));
};
