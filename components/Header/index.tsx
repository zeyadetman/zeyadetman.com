import Heading from "components/Heading";
import Link from "components/Link";
import config from "config";
import React from "react";

interface Props {}

function Header(props: Props) {
  const {} = props;

  return (
    <header>
      <Heading type="h1">
        <Link href="/">{config.name}</Link>
      </Heading>
    </header>
  );
}

export default Header;
