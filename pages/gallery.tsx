import React, { ReactElement, useState } from "react";
import {
  Text,
  Box,
  HStack,
  Flex,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { Img } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import GalleryContainer from "react-photo-gallery";
import { FiX, FiMapPin, FiFileText } from "react-icons/fi";

export async function getStaticProps({
  locale,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<unknown>> {
  const photos = await (
    await fetch("https://api.500px.com/graphql", {
      headers: {
        "content-type": "application/json",
      },
      referrer: "https://500px.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: '{"operationName":"OtherPhotosQuery","variables":{"username":"zeyadetman","pageSize":20},"query":"query OtherPhotosQuery($username: String!, $pageSize: Int) {\\n  user: userByUsername(username: $username) {\\n    ...OtherPhotosPaginationContainer_user_RlXb8\\n    id\\n  }\\n}\\n\\nfragment OtherPhotosPaginationContainer_user_RlXb8 on User {\\n  photos(first: $pageSize, privacy: PROFILE, sort: ID_DESC) {\\n    edges {\\n      node {\\n        id\\n        legacyId\\n        canonicalPath\\n        width\\n        height\\n        name\\n        isLikedByMe\\n        notSafeForWork\\n     description\\n        location\\n        photographer: uploader {\\n          id\\n          legacyId\\n          username\\n          displayName\\n          canonicalPath\\n          followedByUsers {\\n            isFollowedByMe\\n          }\\n        }\\n        images(sizes: [33, 35]) {\\n          size\\n          url\\n          jpegUrl\\n          webpUrl\\n          id\\n        }\\n        __typename\\n      }\\n      cursor\\n    }\\n    totalCount\\n    pageInfo {\\n      endCursor\\n      hasNextPage\\n    }\\n  }\\n}\\n"}',
      method: "POST",
    })
  ).json();

  const images = photos.data.user.photos?.edges?.reverse().map((edge: any) => {
    return {
      id: edge?.node?.id,
      image: {
        url: edge?.node?.images[1]?.url,
        webpUrl: edge?.node?.images[1]?.webpUrl,
      },
      name: edge?.node?.name,
      width: edge?.node?.width,
      height: edge?.node?.height,
      location: edge?.node?.location,
      description: edge?.node?.description,
    };
  });

  return {
    props: {
      images,
    },
  };
}

function Gallery(props: any): ReactElement {
  const { images } = props;
  const [selectedImage, selectImage] = useState<null | any>(null);

  return (
    <>
      <Box mt="12">
        <VStack width="full" display={selectedImage ? "none" : ""}>
          <GalleryContainer
            photos={images.map((i: any) => ({
              ...i,
              src: i.image.url,
            }))}
            direction={"row"}
            renderImage={(record) => {
              return (
                // eslint-disable-next-line
                // @ts-ignore

                <Img
                  onClick={() => {
                    selectImage(record.photo);
                  }}
                  {...record.photo}
                  style={{
                    margin: record.margin,
                    border: "2px solid #eee",
                    padding: "8px 12px",
                  }}
                />
              );
            }}
          />
        </VStack>

        <VStack width="full" display={!selectedImage ? "none" : ""}>
          <HStack justify="end" width="full">
            <Icon
              as={FiX}
              onClick={() => {
                selectImage(null);
              }}
              fontSize="3xl"
              cursor="pointer"
              color={useColorModeValue("black", "white")}
            />
          </HStack>
          <Flex align="center" justify="center">
            <Img
              src={selectedImage?.image?.webpUrl}
              alt={selectedImage?.name}
            />
          </Flex>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            textTransform="capitalize"
            mt="24px !important"
            mb="0 !important"
            align="center"
            color={useColorModeValue("black", "white")}
          >
            {selectedImage?.name}
          </Text>

          {selectedImage?.location ? (
            <Text
              fontSize="sm"
              fontWeight="medium"
              mt="0 !important"
              align="center"
            >
              <Icon as={FiMapPin} title={"location"} />{" "}
              {selectedImage?.location}
            </Text>
          ) : null}

          {selectedImage?.description ? (
            <Text
              fontSize="sm"
              fontWeight="medium"
              mt="6px !important"
              align="center"
            >
              <Icon as={FiFileText} title={"description"} />{" "}
              {selectedImage?.description}
            </Text>
          ) : null}
        </VStack>
      </Box>
    </>
  );
}

export default Gallery;
