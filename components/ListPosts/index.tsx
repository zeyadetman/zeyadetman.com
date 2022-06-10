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
        <ListItem key={slug} w="fit-content">
          <Link href={`/posts/${slug}`}>
            <Heading type="h4" fontSize="2xl">
              {data.title}
            </Heading>
          </Link>
          <HStack>
            <Text fontSize="sm" as="time" dateTime={data.date}>
              {data.date}
            </Text>
            {data.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="outline"
                fontSize="10"
                bg="#ffc700"
                color="black"
              >
                {tag}
              </Badge>
            ))}
          </HStack>
        </ListItem>
      );
    });
  };

  return (
    <List w="full" spacing={6}>
      {renderPosts()}
    </List>
  );
}

export default ListPosts;
