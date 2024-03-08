import { allPosts } from "contentlayer/generated";

interface Options {
  query?: string;
  sort?: "asc" | "desc";
}

export const listPosts = (
  options: Options = {
    sort: "desc",
  }
) => {
  let result = [...allPosts];

  if (options.query) {
    result = result.filter((post) =>
      post.body?.raw
        .toLowerCase()
        .includes((options.query as string).toLowerCase())
    );
  }

  if (options.sort === "asc") {
    result.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(a.date).valueOf() - new Date(b.date).valueOf();
      }
      return 0;
    });
  } else {
    result.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
      }
      return 0;
    });
  }

  return result;
};
