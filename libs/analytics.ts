import countapi from 'countapi-js';
import { site } from '../configs/site';

export const getViews = async (slug: string): Promise<number> => {
	const { value: views } = await countapi.get(site.namespace, slug);
	return views;
};

export const hitPath = async (slug: string): Promise<number> => {
	const { value: views } = await countapi.hit(site.namespace, slug);
	return views;
};

// eslint-disable-next-line
const createKey = () => {
	countapi
		.create({
			namespace: site.namespace,
			key: '',
			value: 0,
		})
		.then((result) => {
			console.log({ result });
		});
};
