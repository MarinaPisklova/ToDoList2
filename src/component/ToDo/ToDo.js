import React from 'react';
import styles from './ToDo.module.scss';
import Counter from "../Counter/Counter";
import Header from "../Header/Header";
import { Form } from "react-bootstrap";
import Warning from "../Warning/Warning";
import Tabs from "../Tabs/Tabs";
import Notes from "../Notes/Notes";

const ToDo = (props) => {
    let onChangeNote = (e) => {
        props.changeNote(e.target.value);
    }

    let handleSubmit = (event) => {
        event.preventDefault();
    }

    let onKeyPressHandler = (event) => {
        if (event.charCode === 13 && props.state.isLengthMatch) {
            if (props.state.newNoteText.length !== 0) {
                props.addNote(props.state.newNoteText);
            }
        }
    }

    return (
        <div className={styles.todo}>
            <Header />
            <div>
                <div className={styles.todo__input + ' ' + styles.input}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Control className={styles.input__textarea} onKeyPress={onKeyPressHandler} onChange={onChangeNote} value={props.state.newNoteText} type="text" placeholder="Записать что-то еще..." />
                        <Warning isLengthMatch={props.state.isLengthMatch} messageLength={props.state.messageLength}/>
                    </Form>
                    
                </div>
                <div className={styles.todo__list + ' ' + styles.list} >
                    <Tabs tabs={props.state.tabs} onClickTab={props.onClickTab}/>
                    <Notes notes={props.state.filteredNotes} deleteNote={props.deleteNote} onChangeStatus={props.toggleStatus}/>
                </div>
            </div>
            <Counter notes={props.state.notes} />
        </div >
    )
}

export default ToDo;