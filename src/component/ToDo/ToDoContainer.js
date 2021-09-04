import { connect } from "react-redux";
import ToDo from "./ToDo";
import { toggleStatus, deleteNote, changeNote, onClickTab, addNote } from './../../redux/ToDoReducer';


let mapStateToProps = (state) =>{
    return {
        state,
    }
}

let ToDoContainer = connect(mapStateToProps, {toggleStatus, deleteNote, changeNote, onClickTab, addNote})(ToDo);

export default ToDoContainer;