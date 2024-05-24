import React, { useState } from 'react';
import './App.css';
import { Todo } from './components/Todo';
import { TData, TFilter } from './types/Types';
import { data } from './mock/data';
import { v1 } from 'uuid';

function App() {
	const [tasks, setTasks] = useState<Array<TData>>(data);

	const addTask = (inputValue: string, todoId: string) => {
		const newTask = { taskId: v1(), title: inputValue, isDone: false };
		// if (newTask.title.trim() === '') return;
		setTasks(tasks.map(item => (item.id === todoId ? { ...item, tasks: [...item.tasks, newTask] } : item)));
	};

	const removeTask = (todoId: string, taskId: string) => {
		setTasks(
			tasks.map(todo =>
				todo.id === todoId ? { ...todo, tasks: todo.tasks.filter(task => task.taskId !== taskId) } : todo
			)
		);
	};

	const onChangeFilter = (filter: TFilter, todoId: string) => {
		setTasks(tasks.map(todo => (todo.id === todoId ? { ...todo, filter: filter } : todo)));
	};

	const changeTaskStatus = (todoId: string, taskId: string, status: boolean) => {
		setTasks(
			tasks.map(todo =>
				todo.id === todoId
					? { ...todo, tasks: todo.tasks.map(item => (item.taskId === taskId ? { ...item, isDone: status } : item)) }
					: todo
			)
		);
	};

	const removeTodoList = (todoId: string) => setTasks(tasks.filter(todo => todo.id !== todoId));

	const filteredTasks = tasks.map(item => {
		switch (item.filter) {
			case 'active':
				return { ...item, tasks: item.tasks.filter(task => !task.isDone) };
			case 'completed':
				return { ...item, tasks: item.tasks.filter(task => task.isDone) };
			default:
				return { ...item };
		}
	});

	return (
		<div className='App'>
			{filteredTasks.map(item => (
				<div key={item.id}>
					<button onClick={() => removeTodoList(item.id)}>Удалить todolist</button>
					<Todo
						addTask={addTask}
						removeTask={removeTask}
						onChangeFilter={onChangeFilter}
						changeTaskStatus={changeTaskStatus}
						todoId={item.id}
						title={item.title}
						filter={item.filter}
						tasks={item.tasks}
						students={item.students}
					/>
				</div>
			))}
		</div>
	);
}

export default App;

//--------------------------------------------------------------
// import React from 'react';
// import './App.css';
// import {Todo} from "./Todo";
//
// export type DataType = {
//     title: string
//     tasks: Array<TasksType>
//     students: Array<string>
// }
// export type TasksType = {
//     taskId: number
//     title: string
//     isDone: boolean
// }
//
//
// function App() {
//     const data1= {
//         title: "What to do",
//         tasks: [
//             {taskId: 1, title: "HTML&CSS2", isDone: true},
//             {taskId: 2, title: "JS2", isDone: true}
//         ],
//         students: [
//             'Jago Wormald1',
//             'Saul Milne2',
//             'Aariz Hester3',
//             'Dion Reeve4',
//             'Anisa Ortega5',
//             'Blade Cisneros6',
//             'Malaikah Phelps7',
//             'Zeeshan Gallagher8',
//             'Isobella Vo9',
//             'Rizwan Mathis10',
//             'Menaal Leach11',
//             'Kian Walton12',
//             'Orion Lamb13',
//             'Faizah Huynh14',
//             'Crystal Vaughan15',
//             'Vivien Hickman16',
//             'Stuart Lu17',
//             'Karol Davison18',
//             'Dario Burns19',
//             'Chloe Rich20',
//             'Martyna Felix',
//             'Nida Glass',
//             'Maeve Miles',
//             'Hasnain Puckett',
//             'Ayman Cano',
//             'Safwan Perry',
//             'Fox Kelly',
//             'Louise Barlow',
//             'Malaki Mcgill',
//             'Leanna Cline',
//             'Willard Hodge',
//             'Amelia Dorsey',
//             'Kiah Porter',
//             'Jeanne Daly',
//             'Mohsin Armstrong',
//             'Laurie Rangel',
//             'Princess Tierney',
//             'Kasim Kendall',
//             'Darryl Cope',
//             'Elysha Ray',
//             'Liyana Harris',
//             'Kashif Blackburn',
//             'Atif Zimmerman',
//             'Sila Hartley',
//             'Ralphie Hebert',
//         ]
//     }
//     const data2 = {
//         title: "What to learn",
//         tasks: [
//             {taskId: 1, title: "HTML&CSS", isDone: true},
//             {taskId: 2, title: "JS", isDone: true}
//         ],
//         students: [
//             'Rick Kane',
//             'Finnlay Bentley',
//             'Samia North',
//             'Isaac Morton',
//             'Lily-Ann Clifford',
//             'Thalia Park',
//             'Sapphire Cruz',
//             'Cieran Vazquez',
//             'Anya Estes',
//             'Dominika Field',
//             'Rosanna Chung',
//             'Safiyah Davey',
//             'Ryley Beasley',
//             'Kalvin Trejo',
//             'Evie-Mae Farrell',
//             'Juliet Valencia',
//             'Astrid Austin',
//             'Lyle Montgomery',
//             'Nisha Mora',
//             'Kylie Callaghan',
//             'Star Wilks',
//             'Marissa Colley',
//             'Asa Fuller',
//             'Leigh Kemp',
//             'Avleen Dawson',
//             'Sammy Bonilla',
//             'Acacia Becker',
//             'Coral Shepherd',
//             'Melina Molina',
//             'Kiran Bailey',
//             'Clara Escobar',
//             'Alexandru Horn',
//             'Brandon-Lee Mercado',
//             'Elouise Weston',
//             'King Long',
//             'Kerri Searle',
//             'Kanye Hamer',
//             'Elwood Benitez',
//             'Mikail Whitaker',
//             'Bobby Hardy',
//             'Talha Ferry',
//             'Priscilla Landry',
//             'Olivia-Grace Cain',
//             'Kiaan Wallace',
//             'Wesley Padilla90',
//             'Ella-Grace Wooten91',
//             'Kaif Molloy92',
//             'Kamal Broadhurst93',
//             'Bianca Ferrell94',
//             'Micheal Talbot95',
//         ]
//     }
//
//     return (
//         <div className="App">
//             <Todo data={data1}/>
//             <Todo data={data2}/>
//         </div>
//     );
// }
//
// export default App;

// import React from 'react';
// import {DataType} from "./App";
//
// type  TasksPropsType = {
//     data: DataType
// }
//
// export const Todo = (props: TasksPropsType) => {
//     return (
//         <div>
//             <h1>{props.data.title}</h1>
//             <ul>
//                 {props.data.tasks.map(el => {
//                     return (
//                         <li>
//                             <span>{el.taskId}</span>
//                             <span>{el.title}</span>
//                             <span>{el.isDone}</span>
//                         </li>
//                     )
//                 })}
//             </ul>
//
//             <ul>
//                 {props.data.students.map(el => {
//                     return (
//                         <li>{el}</li>
//                     )
//                 })}
//             </ul>
//         </div>
//     );
// };

//--------------------------------------------------------------
