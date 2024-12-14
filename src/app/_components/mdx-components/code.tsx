import { codeToHtml } from "shiki";
import type { BundledLanguage, BundledTheme } from "shiki";

type Props = {
  code: string;
  lang?: BundledLanguage;
  theme?: BundledTheme;
};

export const Code = async ({
  code,
  lang = "javascript",
  theme = "github-dark",
}: Props) => {
  const match = /language-(\w+)/.exec(lang || "")?.[1] || "";
  const html = await codeToHtml(code, {
    lang: match,
    theme,
  });

  return <div dir="ltr" dangerouslySetInnerHTML={{ __html: html }}></div>;
};
