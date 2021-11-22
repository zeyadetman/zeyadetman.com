export interface ISite {
	name: string;
	description: string;
	username: string;
	baseUrl: string;
	namespace: string;
	openToWork: boolean;
	email: string;
	githubRepo: string;
	twitter: {
		username: string;
	};
	social: {
		linkedin?: string;
		stackoverflow?: string;
		github?: string;
	};
	post?: {
		excerpt?: {
			noOfLines?: number;
		};
	};
}
