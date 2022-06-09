import React from "react";
import {
  Box,
  SimpleGrid,
  ListItem,
  Link,
  ListIcon,
  List,
  useColorModeValue,
} from "@chakra-ui/react";
import { ISocialLink } from "interfaces/ISocialLink";

interface Props {
  socialLinks: ISocialLink[];
}

function SocialLinks(props: Props) {
  const { socialLinks } = props;
  const iconColor = useColorModeValue("gray", "white");

  return (
    <Box>
      <SimpleGrid
        as={List}
        columns={[1, 2, 3]}
        spacing={2}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {socialLinks.map(({ href, value, icon }: any) => {
          return (
            <ListItem
              key={href}
              textDecoration={"dotted"}
              textOverflow={"ellipsis"}
              overflow={"hidden"}
              whiteSpace={"nowrap"}
            >
              <ListIcon as={icon} color={iconColor} />
              <Link href={href} isExternal>
                {value}
              </Link>
            </ListItem>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default SocialLinks;
