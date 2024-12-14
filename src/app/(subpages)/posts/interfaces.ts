import { JSXElementConstructor, ReactElement } from "react";

export type Metadata = {
  title: string;
  date: string;
  summary: string;
  image?: string;
  slug?: string;
  lang?: string;
  isDraft?: boolean;
};

export interface Post {
  metadata: Metadata;
  slug: string;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
  rawContent: string;
}
