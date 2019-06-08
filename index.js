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
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

function todos(state = {todos: []}, action) {

    switch (action.type) {
        case ADD_TODO:
        {
            state.todos = state.todos.concat([action.todo]);
            return state;
        }
        case REMOVE_TODO:
        {
            state.todos = state.todos.filter((t)=> t.id !== action.id);
            return  state;
        }

        case TOGGLE_TODO:
        {
            state.todos.map((todo) => todo.id !== action.id ? todo : Object.assign({}, todo, {complete: !todo.complete}));
            return state;
        }
        default:
            return  state;
    }

}

const store = createStore(todos);
store.subscribe(()=> {
    console.log('The new state is: ', store.getState());
});

store.dispatch({
    type: ADD_TODO,
    todo: {
        id: 0,
        name: 'Learn React',
        complete: false
    }
});

store.dispatch({
    type: ADD_TODO,
    todo: {
        id: 1,
        name: 'Learn Redux',
        complete: false
    }
});

store.dispatch({
    type: TOGGLE_TODO,
    id: 0
});

store.dispatch({
    type: REMOVE_TODO,
    id: 1
});
