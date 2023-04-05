import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  Flex,
  VStack,
} from "@chakra-ui/react";
import Heading from "components/Heading";
import ListPosts from "components/ListPosts";
import { Language } from "config";
import Image from "next/image";
import { useEffect, useState } from "react";
import { generateRSSFeed } from "utils/feed";
import { getPosts } from "utils/posts";
import { BiRss } from "react-icons/bi";
import Link from "components/Link";

interface Props {
  posts: any[];
}

export async function getStaticProps() {
  const posts = await getPosts();
  generateRSSFeed(posts);

  return {
    props: {
      posts,
    },
  };
}

const SearchInput = ({
  setSearchText,
  langsSelected,
  updateLangsSelected,
}: any) => {
  const updateLangsList = (newLang: string) => {
    if (langsSelected.includes(newLang)) {
      const restLanguages = langsSelected.filter(
        (lang: string) => lang !== newLang
      );

      updateLangsSelected(restLanguages);
    } else {
      updateLangsSelected([...langsSelected, newLang]);
    }
  };

  return (
    <FormControl>
      <Flex alignItems="center">
        <FormLabel htmlFor="searchInput" mr="0">
          Search all posts.
        </FormLabel>
        <Link href="/rss.xml">
          <BiRss fontSize="28px" />
        </Link>
      </Flex>
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
      <ButtonGroup
        size="sm"
        isAttached
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          borderTop="none"
          onClick={() => {
            updateLangsList(Language.AR);
          }}
          variant={langsSelected.includes(Language.AR) ? "solid" : "outline"}
        >
          AR
        </Button>
        <Button
          borderTop="none"
          onClick={() => {
            updateLangsList(Language.EN);
          }}
          variant={langsSelected.includes(Language.EN) ? "solid" : "outline"}
          ms="0px !important"
        >
          EN
        </Button>
      </ButtonGroup>
    </FormControl>
  );
};

const Home = (props: Props) => {
  const { posts } = props;
  const [postsList, updatePostsList] = useState(posts);
  const [langsSelected, updateLangsSelected] = useState<string[]>([
    Language.EN,
  ]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const updatedPosts = posts.filter((post: any) => {
      const lang = post?.data?.lang
        ? post?.data?.lang.toUpperCase()
        : Language.EN;
      if (
        post.text.includes(value) &&
        (langsSelected.length === 0 || langsSelected.includes(lang))
      ) {
        return post.text.includes(value);
      }
    });

    updatePostsList(updatedPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, langsSelected]);

  return (
    <VStack minH="inherit" minW="inherit" spacing="8">
      <Box className="logo-container" pos="relative" w="full" h="48">
        <Image
          src="/logo.png"
          alt="Home"
          layout="fill"
          objectFit="contain"
          className="color-mode-respected"
          priority
        />
      </Box>
      <Heading type="h2" size="lg" display="flex" alignItems="baseline">
        I&apos;m writing about Technology and Life.
      </Heading>
      <HStack w="full">
        <SearchInput
          setSearchText={setValue}
          langsSelected={langsSelected}
          updateLangsSelected={updateLangsSelected}
        />
      </HStack>
      <ListPosts posts={postsList} />
    </VStack>
  );
};

export default Home;
