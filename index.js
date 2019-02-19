function createStore (reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state.
  // 3. Listen to changes on the state.
  // 4. Update the state

  /*1*/
  let state
  
  /*2*/
  const getState = () => state

  /*3*/
  let listeners = []

  const subscribe = (listener) => {
    listeners.push(listener)

    return () => {
      listeners = listeners.filter(l => l !== listener) // for unsuscribe
    }
  }

  /*4*/
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}
//-----------------------------------

/***** App code *****/

/* Create Reducer */
function todos (state = [], action) {
  if (action.type === 'ADD_TODO') {
    return state.concat([action.todo])
  }

  return state
}

//------------------------
const store = createStore(todos);

store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

const unsubscribe = store.subscribe(() => {
  console.log('The store changed.')
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
})
