import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  VStack,
} from "@chakra-ui/react";
import Heading from "components/Heading";
import ListPosts from "components/ListPosts";
import type {
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from "next";
import Image from "next/image";
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

const SearchInput = () => {
  return (
    <FormControl>
      <FormLabel htmlFor="searchInput">Search all posts.</FormLabel>
      <InputGroup size="sm">
        <Input id="searchInput" type="text" placeholder="Search..." />
        <InputRightAddon
          _hover={{
            //TODO: disable when search is empty
            cursor: "pointer",
            bg: "black",
            color: "white",
            border: "1px solid black",
          }}
        >
          Search
        </InputRightAddon>
      </InputGroup>
    </FormControl>
  );
};

const Home = (props: Props) => {
  const { posts } = props;
  console.log({ posts });

  return (
    <VStack
      minH="inherit"
      minW="inherit"
      display="flex"
      alignItems="center"
      justifyContent="center"
      spacing="8"
    >
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
        <SearchInput />
      </HStack>
      <ListPosts posts={posts} />
    </VStack>
  );
};

export default Home;
