import { ChangeEvent, useState } from 'react';
import { TFilter, TTask } from '../types/Types';

type TTasksProps = {
	todoId: string;
	title: string;
	filter: TFilter;
	tasks: TTask[];
	students: string[];
	addTask: (inputValue: string, todoId: string) => void;
	removeTask: (todoId: string, taskId: string) => void;
	onChangeFilter: (filter: TFilter, todoId: string) => void;
	changeTaskStatus: (todoId: string, taskId: string, status: boolean) => void;
};

export const Todo = ({
	title,
	filter,
	tasks,
	students,
	todoId,
	addTask,
	removeTask,
	onChangeFilter,
	changeTaskStatus,
}: TTasksProps) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [error, setError] = useState<boolean>(false);

	const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setError(false);
		setInputValue(e.currentTarget.value);
	};

	const setNewTask = () => {
		if (inputValue.trim() === '') {
			setError(true);
		} else {
			addTask(inputValue, todoId);
		}
	};

	return (
		<div>
			<h2>{title}</h2>
			<div className='flex'>
				<div className='rubber'>
					<input className={error ? 'error' : ''} value={inputValue} onChange={onHandleChange} type='text' />
					{error && <span className='text'>This field is required!</span>}
				</div>
				<button onClick={setNewTask}>+</button>
			</div>
			<ul>
				{tasks.length ? (
					tasks.map(item => (
						<li key={item.taskId}>
							<label htmlFor=''>
								<input
									onChange={() => changeTaskStatus(todoId, item.taskId, !item.isDone)}
									className={item.isDone ? 'done' : ''}
									checked={item.isDone}
									type='checkbox'
								/>
								{item.title}
							</label>
							<button onClick={() => removeTask(todoId, item.taskId)}>x</button>
						</li>
					))
				) : (
					<span>Task list is empty!</span>
				)}
			</ul>
			<div className='wrapper'>
				<button className={filter === 'all' ? 'active' : ''} onClick={() => onChangeFilter('all', todoId)}>
					All
				</button>
				<button className={filter === 'active' ? 'active' : ''} onClick={() => onChangeFilter('active', todoId)}>
					Active
				</button>
				<button className={filter === 'completed' ? 'active' : ''} onClick={() => onChangeFilter('completed', todoId)}>
					Completed
				</button>
			</div>
			<ul>
				{students.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</div>
	);
};
