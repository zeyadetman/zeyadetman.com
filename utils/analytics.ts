import config from "config";
import countapi from "countapi-js";

export const getViews = async (slug: string): Promise<number> => {
  const { value: views } = await countapi.get(config.namespace, slug);
  return views;
};

export const hitPath = async (slug: string): Promise<number> => {
  const { value: views } = await countapi.hit(config.namespace, slug);
  return views;
};

// eslint-disable-next-line
// const createKey = () => {
//   countapi
//     .create({
//       namespace: config.namespace,
//       key: "",
//       value: 0,
//     })
//     .then((result) => {
//       console.log({ result });
//     });
// };
