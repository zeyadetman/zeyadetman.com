export enum Language {
  AR = "AR",
  EN = "EN",
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  username: "zeyadetman",
  baseUrl: "https://zeyadetman.com",
  namespace: "zeyadetman-blog",
  githubRepo: "https://github.com/zeyadetman/zeyadetman.com",
  firstName: "Zeyad",
  name: "Zeyad Etman",
  email: "zeyad.etman@gmail.com",
  twitter: "https://twitter.com/zeyadetman",
  github: "https://github.com/zeyadetman",
  description: "Thoughts about software development and Life",
  navList: [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Gallery",
      path: "/gallery",
    },
    {
      name: "LinkedIn",
      path: "https://linkedin.com/in/zeyadetman",
      external: true,
    },
    {
      name: "Github",
      path: "https://github.com/zeyadetman",
      external: true,
    },
    {
      name: "Books",
      path: "https://zeyadetman.notion.site/Books-c3175b769e704c5da66182df52e4ac61",
      external: true,
    },
    {
      name: "Notes",
      path: "https://notes.zeyadetman.com",
      external: true,
    },
  ],
  languages: [Language.AR, Language.EN],
};
