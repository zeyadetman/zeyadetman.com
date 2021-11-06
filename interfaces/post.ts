import { ReadTimeResults } from 'reading-time';

export interface IPost {
	content: string;
	excerpt: string | undefined;
	data: {
		[key: string]: unknown;
	};
	fileName: string;
	readingTime: ReadTimeResults;
	locale: 'en' | 'ar';
}
