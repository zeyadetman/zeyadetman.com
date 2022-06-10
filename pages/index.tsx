import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  VStack,
} from "@chakra-ui/react";
import ListPosts from "components/ListPosts";
import type { GetStaticPropsContext } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPosts } from "utils/posts";

interface Props {
  posts: any[];
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}

const SearchInput = ({ setSearchText, searchText }: any) => {
  return (
    <FormControl>
      <FormLabel htmlFor="searchInput">Search all posts.</FormLabel>
      <InputGroup size="sm">
        <Input
          id="searchInput"
          type="text"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          placeholder="Search..."
        />
      </InputGroup>
    </FormControl>
  );
};

const Home = (props: Props) => {
  const { posts } = props;
  const [postsList, updatePostsList] = useState(posts);
  const [value, setValue] = useState("");

  useEffect(() => {
    const updatedPosts = posts.filter((post: any) => {
      return post.text.includes(value);
    });

    updatePostsList(updatedPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <VStack minH="inherit" minW="inherit" spacing="8">
      <Box pos="relative" w="full" h="32">
        <Image
          src="/assets/illustrations/home.svg"
          alt="Home"
          layout="fill"
          objectFit="contain"
          className="color-mode-respected"
        />
      </Box>
      <HStack w="full">
        <SearchInput setSearchText={setValue} searchText={value} />
      </HStack>
      <ListPosts posts={postsList} />
    </VStack>
  );
};

export default Home;
