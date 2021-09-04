import React from 'react';
import styles from './Note.module.scss'
import trash from '../../images/trash.svg'

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.deleteThisNote = this.deleteThisNote.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }

    deleteThisNote() {
        this.props.deleteNote(this.props.note.id);
    }

    changeStatus() {
        this.props.onChangeStatus(this.props.note.id);
    }

    render() {
        return (
            <div>
                <li className={styles.note}>
                    <div className={styles.note__container}>
                        <div className={styles.note__checkbox + ' ' + styles.checkbox}>
                            <input className={styles.checkbox__input} id='checkbox' type='checkbox' onChange={this.changeStatus} checked={this.props.note.status}></input>
                            <label className={styles.checkbox__label}></label>
                        </div>
                        <div className={styles.note__text + ' ' + styles.text} onClick={this.changeStatus}>{this.props.note.text}</div>
                    </div>
                    <img className={styles.note__trash} onClick={this.deleteThisNote} src={trash} alt="trash"></img>
                </li>
            </div>

        )
    }
}

export default Note