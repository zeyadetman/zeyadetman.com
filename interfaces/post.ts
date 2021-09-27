import { ReadTimeResults } from 'reading-time';

export interface IPost {
	content: string;
	excerpt: string | undefined;
	data: {
		[key: string]: any;
	};
	fileName: string;
	readingTime: ReadTimeResults;
}
