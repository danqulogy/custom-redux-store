// Library Code - State management
function createStore(reducer) {
    let state ;
    let listeners = [];

    const getState =  ()=>state;
    const subscribe = (listener)=>{
        listeners.push(listener);
        // in order to unsubscribe
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        }
    };
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}


// App Code - reducer function
function todos(state = {todos: []}, action) {
    if (action.type === 'ADD_TODO'){
        // adds the new _todo to the existing list of todos
        state.todos = state.todos.concat([action.todo]);
        return state;
    }

    if (action.type === 'REMOVE_TODO'){
        state.todos = state.todos.filter((t)=> t.id !== action.id);
        return  state;
    }

    if (action.type === 'TOGGLE_TODO'){
        let selectedTodo = (state.todos.filter((t)=> t.id === action.id)[0]);
        if (selectedTodo){
            let indexOfSelectedTodo = state.todos.indexOf(selectedTodo);
            state.todos[indexOfSelectedTodo].complete = !state.todos[indexOfSelectedTodo].complete
        }
        return state;
    }
    return  state;
}

const store = createStore(todos);
store.subscribe(()=> {
    console.log('The new state is: ', store.getState());
});

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn React',
        complete: false
    }
});

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 1,
        name: 'Learn Redux',
        complete: false
    }
});

store.dispatch({
    type: 'TOGGLE_TODO',
    id: 0
});

store.dispatch({
    type: 'REMOVE_TODO',
    id: 1
});
