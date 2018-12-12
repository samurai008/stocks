import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher.1';

class TodoStore extends EventEmitter {
	constructor() {
		super();
		this.todos = [
			{
				id: 232,
				text: 'Apples',
				complete: false
			},
			{
				id: 4333,
				text: 'Mangoes',
				complete: false
			},
		];
	}

	createToDo(text) {
		const id = Date.now();

		this.todos.push({
			id,
			text,
			complete: false
		});

		this.emit('change');
	}

	handleActions(action) {
		switch(action.type) {
			case 'CREATE_TODO':
				this.createToDo(action.text);
				break;
			default:
				console.log('unknown action2222');
		}
	}

	getAll() {
		return this.todos;
	}
}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));
window.dispatcher = dispatcher;
window.todoStore = todoStore;
export default todoStore;