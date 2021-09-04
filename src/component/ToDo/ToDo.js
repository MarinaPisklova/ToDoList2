import Note from "../Note/Note";
import React from 'react';
import styles from './ToDo.module.scss';
import Counter from "../Counter/Counter";
import Header from "../Header/Header";
import { Form } from "react-bootstrap";

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [
                { id: 0, text: "Купить молоко", status: true },
                { id: 1, text: "Сделать уборку", status: true },
                { id: 2, text: "Убрать зимние вещи", status: false },
            ],
            newNoteText: '',
            isLengthMatch: true,
        };
        this.tabs = [
            { type: 0, name: "Все", isActive: true },
            { type: 1, name: "Выполненные", isActive: false },
            { type: 2, name: "Невыполненные", isActive: false },
        ];
        this.state.filteredNotes = this.getFilteredNotes(this.state.notes);
        this.onChangeNote = this.onChangeNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onKeyPressHandler = this.onKeyPressHandler.bind(this);
        this.onClickTabs = this.onClickTabs.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeStatus(id) {
        let newNotes = this.state.notes.map(note => {
            if (note.id === id)
                note.status = !note.status;
            return note;
        });

        this.setState({
            notes: newNotes,
            filteredNotes: this.getFilteredNotes(newNotes),
        })
    }

    deleteNote(id) {
        let newNotes = this.state.notes;
        let indexNote;

        newNotes.forEach((note, index) => {
            if (note.id === id)
                indexNote = index;
        });
        newNotes.splice(indexNote, 1);

        this.setState({
            notes: newNotes,
            filteredNotes: this.getFilteredNotes(newNotes),
        })
    }

    onChangeNote(e) {
        if (e.target.value !== '\n') {
            if (e.target.value.length > 20) {
                this.setState({
                    isLengthMatch: false,
                });
            }
            else {
                this.setState({
                    newNoteText: e.target.value,
                    isLengthMatch: true,
                });
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    onKeyPressHandler(event) {

        if (event.charCode === 13 && this.state.isLengthMatch) {
            if (this.state.newNoteText.length !== 0) {
                let newNotes = this.state.notes;
                newNotes.push({ id: newNotes[newNotes.length - 1].id + 1, text: this.state.newNoteText, status: false });
                this.setState({
                    notes: newNotes,
                    filteredNotes: this.getFilteredNotes(newNotes),
                    newNoteText: '',
                })
            }
        }
    }

    onClickTabs(type) {
        this.tabs.forEach(tab => {
            tab.isActive = tab.type === type ? true : false;
        });

        this.setState({
            filteredNotes: this.getFilteredNotes(this.state.notes),
        })
    }

    getFilteredNotes(newNotes) {
        const type = this.getFilterType();
        if (type === 0) {
            return newNotes;
        }
        else if (type === 1) {
            return newNotes.filter(note => note.status === true);
        }
        else if (type === 2) {
            return newNotes.filter(note => note.status === false);
        }
    }

    getFilterType() {
        return this.tabs.filter(tab => tab.isActive)[0].type;
    }

    render() {
        const ToDoItems = this.state.filteredNotes.map(item => <Note key={item.text} note={item} deleteNote={this.deleteNote} onChangeStatus={this.onChangeStatus} />);
        const TabsItems = this.tabs.map(tab => <div className={tab.isActive ? (styles.tabs__item + " " + styles.tabs__item_active) : styles.tabs__item} key={tab.name} onClick={() => {
            this.onClickTabs(tab.type);
        }}>{tab.name}</div>);

        return (
            <div className={styles.todo}>
                <Header />
                <div>
                    <div className={styles.todo__input + ' ' + styles.input}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Control className={styles.input__textarea} onKeyPress={this.onKeyPressHandler} onChange={this.onChangeNote} value={this.state.newNoteText} type="email" placeholder="Записать что-то еще..." />
                        </Form>
                        {
                            !this.state.isLengthMatch
                            && <p className={styles.input__warning}>Длина записи не может превышать 20</p>
                        }
                    </div>
                    <div className={styles.todo__list + ' ' + styles.list} >
                        <div className={styles.list__tabs + ' ' + styles.tabs}>
                            {TabsItems}
                        </div>
                        <ul className={styles.list__items + ' ' + styles.items}>{ToDoItems}</ul>
                    </div>
                </div>
                <Counter notes={this.state.notes} />
            </div >
        )
    }
}

export default ToDo;