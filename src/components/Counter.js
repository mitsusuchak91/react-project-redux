import { useSelector, useDispatch } from 'react-redux'; //useSelector is custom hook made by redux team
import classes from './Counter.module.css'; //useSelector allow us to automatically select a part of our state managed by our store
import { counterActions } from '../store/index';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter.counter); //check last comments
  const show = useSelector(state => state.counter.showCounter);

  const incrementHandler = () => {
    dispatch(counterActions.increment()); //should be same as index.js file in store action.type === 'increment'
  };
  const increaseHandler = () => {
    dispatch(counterActions.increase(5));//this is the action payload, this extra property amount should be same as in index.js file of store action.amount
  };
  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };
 
  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increse by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

//const counter = useSelector(state => state.counter); //this counter is managed by redux
//this function will be executed for us by react-redux, 
//it will then pass to redux state so the managed data into this function when it executes it
//& then basically executes this code (states.counter) to retrive the part of the state 
//so the useSelector gives us overall return value

//great thing is when you use useSlector(), react redux will automatically set up a subscription to the redux store for this component
//so your component will be updated and will receive latest counter automatically when ever that data changes in the redux store

//useDispatch()
//dispatch is a function which we can call which will dispatch an action against our redux store
//action is an object so we add a property such as type:
//its your action and your property, you can add what ever property name you want 
