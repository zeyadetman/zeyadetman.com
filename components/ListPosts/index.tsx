import { Badge, HStack, List, ListItem, Text } from "@chakra-ui/react";
import Heading from "components/Heading";
import Link from "components/Link";
import React from "react";

interface Props {
  posts: any[];
}

function ListPosts(props: Props) {
  const { posts } = props;
  const renderPosts = () => {
    return posts.map(({ data, slug }) => {
      return (
        <ListItem
          key={slug}
          display="flex"
          justifyContent={[
            "center",
            "center",
            "space-between",
            "space-between",
          ]}
          alignItems={["flex-start", "flex-start", "center", "center"]}
          flexDirection={["column", "column", "row", "row"]}
        >
          <HStack
            flexDir={data.lang === "ar" ? "row-reverse" : "row"}
            columnGap={2}
          >
            {data.isThread && (
              <Badge variant="thread" _hover={{ cursor: "" }}>
                thread
              </Badge>
            )}
            <Link
              href={`/posts/${slug}`}
              chackraProps={{
                ms: "0px !important",
              }}
            >
              <Heading
                type="h4"
                fontSize="xl"
                dir={data.lang === "ar" ? "rtl" : "ltr"}
              >
                {data.title}
              </Heading>
            </Link>
          </HStack>
          <Text fontSize="sm" as="time" opacity="0.7" dateTime={data.date}>
            {data.date}
          </Text>
        </ListItem>
      );
    });
  };

  return posts.length ? (
    <List w="full" spacing={4}>
      {renderPosts()}
    </List>
  ) : (
    <Text>No posts found</Text>
  );
}

export default ListPosts;
