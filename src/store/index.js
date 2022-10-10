import { createSlice, configureStore } from '@reduxjs/toolkit';
//NOTE: KEEP EVERY CREATESLICE IN SEPERATE FILE IN BIG APPLICATIONS, COUNTER SLICE,AUTH SLICE IN SEPERATE FILE AND CONFIGURE STORE IN INDEX FILE
const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({ //createSlice wants an object as an argument //we are preparing slice of our globle states
 name: 'counter',  //every slice need name, name is up to you not could be same as counter in intial state
 initialState: initialCounterState,
 reducers: {  //reducers is also an object, a map of all the reducers this slice/state needs
    increment(state) { //you can add methods of any name of your choice
        state.counter++;  //yoy are not mutates the state by doing this as redux toolkit do it
    },                   //every method needs state, here we dont need action
    decrement(state) {
        state.counter--;
    },  
    increase(state, action) {
        state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
        state.showCounter = !state.showCounter;
    },          
 }
});

const initialAuthState = {
    isAuthenticated: false
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
});

const store = configureStore({ //configureStore create a store, it makes merging multiple reducers into 1 redicer easier
    reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },  //configureStore we pass an object
}); 

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;

/*const counterReducer = (state = initialState, action) => {
    if (action.type === 'increment') {
        return{
            counter: state.counter + 1,
            showCounter: state.showCounter //default
        };
    }
    if (action.type === 'increase') {
        return{
            counter: state.counter + action.amount, //this is the action payload
            showCounter: state.showCounter
        };
    }
    if (action.type === 'decrement') {
        return{
            counter: state.counter - 1,
            showCounter: state.showCounter 
        };
    }

    if (action.type === 'toggle') {
        return{
            showCounter: !state.showCounter,
            counter: state.counter //default
        }
    }
    return state;
};*/

//if we do the code like above we have the below essues so we use reduxtoolkit and its createSlice function

//the objects which we return in the reducer WILL NOT be merged with the exisiting state BUT they will overwrite the exixiting state
//we must ALWAYS set all the other states when we update a piece of state. like this 
//counter: state.counter + 1,
//           showCounter: state.showCounter //BECAUSE WE OVERWRITE THE ALL STATE
//you should NEVER mutate:changes the existing state, like this
//state.counter++
//return state;
//instead ALWAYS OVERWRITE it by returning a BRAND NEW STATE OBJECT
//and bcz objects & arrays are reference values in JS, its easy to accidently overwrite & change the existing state
//