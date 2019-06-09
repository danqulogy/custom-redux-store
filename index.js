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
    };

    return {
        getState,
        subscribe,
        dispatch
    }
}


// App Code -
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

// Action creators
function addTodo(todo) {
    return {
        type: ADD_TODO,
        todo
    }
}

function removeTodo(id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

function toggleTodo(id){
    return {
        type: TOGGLE_TODO,
        id
    }
}

function addGoal(goal) {
    return {
        type: TOGGLE_TODO,
        goal
    }
}

function removeGoal(id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}

// todos reducer function
function todos(state = [], action) {

    switch (action.type) {
        case ADD_TODO:
        {
            return state.concat([action.todo]);
        }
        case REMOVE_TODO:
        {
            return state.filter((todo)=> todo.id !== action.id);
        }

        case TOGGLE_TODO:
        {
            return state.map((todo) => todo.id !== action.id ? todo : Object.assign({}, todo, {complete: !todo.complete}));
        }
        default:
            return  state;
    }

}

// goals reducer function
function goals(state = [], action) {

    switch (action.type) {
        case ADD_GOAL:
        {
            return state.concat([action.goal]);
        }
        case REMOVE_GOAL:
        {
            return state.filter((goal)=> goal.id !== action.id);
        }

        default:
            return  state;
    }

}

// root reducer
function app(state ={},action){
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}

const store = createStore(app);
store.subscribe(()=> {
    console.log('The new state is: ', store.getState());
});

store.dispatch(addTodo({
    id: 0,
    name: 'Learn React',
    complete: false
}));

store.dispatch(addTodo({
    id: 1,
    name: 'Learn Redux',
    complete: false
}));

store.dispatch(toggleTodo(0));

store.dispatch(removeTodo(1));

store.dispatch(addGoal({
    id: 0,
    name: 'Become an expert in react/react native development'
}));

store.dispatch(addGoal({
    id: 1,
    name: 'Become an expert in PHP'
}));

store.dispatch(removeGoal(1));


