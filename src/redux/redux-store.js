import { createStore } from "redux";
import ToDoReducer from './ToDoReducer';

let store = createStore(ToDoReducer);

export default store;