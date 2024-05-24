export type TTask = {
	taskId: string;
	title: string;
	isDone: boolean;
};

export type TData = {
	id: string;
	title: string;
	filter: TFilter;
	tasks: TTask[];
	students: string[];
};

export type TFilter = 'all' | 'active' | 'completed';
