import dispatcher from "../dispatcher/dispatcher";

// Export your actions here!
export function createTodo(text) {
	dispatcher.dispatch({
		type: 'CREATE_TODO',
		text
	})
}