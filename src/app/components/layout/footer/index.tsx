"use client";

import { renderSocials } from "@/app/components/layout/utils/renderSocials";
import Image from "next/image";

interface FooterProps {}

export const Footer = ({}: FooterProps) => {
  return (
    <footer className="footer flex flex-wrap gap-2 items-center justify-between p-10">
      <aside>
        <Image
          src="/signature.webp"
          className="invert-[70%]"
          alt="Signature"
          width={100}
          height={100}
        />
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <ul className="menu menu-horizontal gap-1">{renderSocials()}</ul>
        </div>
      </nav>
    </footer>
  );
};
