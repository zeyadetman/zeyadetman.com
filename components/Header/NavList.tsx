import { HStack, List, ListItem } from "@chakra-ui/react";
import Link from "components/Link";
import config from "config";
import React from "react";

interface Props {}

function NavList(props: Props) {
  const {} = props;
  const renderNavList = () => {
    return config.navList.map((item) => {
      return (
        <ListItem key={item.name}>
          <Link href={item.path}>{item.name}</Link>
        </ListItem>
      );
    });
  };

  return (
    <List
      as={HStack}
      justifyContent="center"
      gap={[4, 8]}
      my={[4, 8]}
      py={[2, 4]}
      borderY="1px solid"
      flexWrap={"wrap"}
    >
      {renderNavList()}
    </List>
  );
}

export default NavList;
