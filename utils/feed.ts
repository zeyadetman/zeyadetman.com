import config from "config";
import { Feed } from "feed";
import fs from "fs";

export const generateRSSFeed = (articles: any[]): void => {
  const baseUrl = config.baseUrl;
  const author = {
    name: config.name,
    email: config.email,
    link: `https://twitter.com/${config.username}`,
  };

  const feed = new Feed({
    title: `Articles by ${config.name}`,
    description: config.description,
    id: baseUrl,
    link: baseUrl,
    language: "en",
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    author,
    copyright: config.username,
  });

  articles.forEach((post) => {
    const {
      text,
      fileName,
      data: { date, title },
    } = post;
    const url = `${baseUrl}/posts/${fileName}`;

    feed.addItem({
      //eslint-disable-next-line
      //@ts-ignore
      title: title || "No Title",
      id: url,
      link: url,
      content: text,
      author: [author],
      //eslint-disable-next-line
      //@ts-ignore
      date: date ? new Date(date) : new Date(),
    });
  });

  fs.writeFileSync("public/rss.xml", feed.rss2());
};
