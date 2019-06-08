## Store
Responsible for 
* Getting the state
* Listening for Changes
* Updating the state

### Subscribing or Listening to State changes
* The user must be able to subscribe to state changes and get notified accordingly as
 the state changes.
* The user must be a able to subscribe to state change multiple times apparently from 
different parts of the app
* This means that the store must be able to keep track or subscribers (or listeners) 
so that the store can announce back to them whenever the application state changes.
* So with our listeners as an array encapsulated in our store factory object, 
whenever some sought of action changes the state we can loop through the listeners 
array and invoke all of the functions and return the new state of the store.


### Updating the state
* Actions might modify the state of our store based on defined events recognized by our app.
* An action will therefore consist of an event name and an optional payload data object to
help fulfil that intended action.
* In the redux pattern our ultimate goal is to achieve predictability in our store. That is at
any point in time we should be able to know which action or series of action led to this 
current state.
* So as an overview, we have a state tree and collection of actions that can change the state
based on some events which we will describe in code using strings. 
* if we need a way to update our state, a function could do this. The function will take
two (2) arguments the current state and the action which occured. The based on the action and 
its payload this said function will be responsible for returning the new updated state.
The most important thing is that the the function that returns the new state must be 
a pure function, that is must not have side effects.

* So basically two rules gorvern this system:

    -  Only an event can change the state of the store
    -   The function that returns this new state must be a pure function
* This leads us to is called a reducer function.

### Store Dispatch
* the function dispatches actions against the store
* the store state changes inside the dispatch function and we need to publish the
changes to our listeners. We can do this by looping through listeners array and invoking 
them.






