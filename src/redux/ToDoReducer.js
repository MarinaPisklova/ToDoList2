const TOGGLE_STATUS = "TOGGLE_STATUS";
const DELETE_NOTE = "DELETE_NOTE";
const CHANGE_NOTE = "CHANGE_NOTE";
const CLICK_TABS = "CLICK_TABS";
const ADD_NOTE = "ADD_NOTE";

let initialState = {
    notes: [
        { id: 0, text: "Купить молоко", status: true },
        { id: 1, text: "Сделать уборку", status: true },
        { id: 2, text: "Убрать зимние вещи", status: false },
    ],
    filteredNotes: [
        { id: 0, text: "Купить молоко", status: true },
        { id: 1, text: "Сделать уборку", status: true },
        { id: 2, text: "Убрать зимние вещи", status: false },
    ],
    newNoteText: '',
    messageLength: 20,
    isLengthMatch: true,
    tabs: [
        { type: 0, name: "Все", isActive: true },
        { type: 1, name: "Выполненные", isActive: false },
        { type: 2, name: "Невыполненные", isActive: false },
    ],
};

const ToDoReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_STATUS: {
            let newNotes = state.notes.map(note => {
                if (note.id === action.id)
                    note.status = !note.status;
                return note;
            });

            return Object.assign({}, state, {
                notes: newNotes,
                filteredNotes: getFilteredNotes(newNotes, state.tabs),
            });
        }
        case DELETE_NOTE: {
            let newNotes = state.notes;
            let indexNote;

            newNotes.forEach((note, index) => {
                if (note.id === action.id)
                    indexNote = index;
            });
            newNotes.splice(indexNote, 1);

            return Object.assign({}, state, {
                notes: newNotes,
                filteredNotes: getFilteredNotes(newNotes, state.tabs),
            });
        }
        case CHANGE_NOTE: {
            if (action.value !== '\n') {
                if (action.value.length > state.messageLength) {
                    return Object.assign({}, state, {
                        isLengthMatch: false,
                    });
                }
                else {
                    console.log(action.value)
                    return Object.assign({}, state, {
                        newNoteText: action.value,
                        isLengthMatch: true,
                    });
                }
            }
            break;
        }
        case CLICK_TABS: {
            let newTabs = state.tabs;
            newTabs.forEach(tab => {
                tab.isActive = tab.type === action.tabType ? true : false;
            });

            return Object.assign({}, state, {
                tabs: newTabs,
                filteredNotes: getFilteredNotes(state.notes, newTabs),
            });
        }
        case ADD_NOTE: {
            let newNotes = state.notes;
            newNotes.push({ id: newNotes[newNotes.length - 1].id + 1, text: action.newNote, status: false });

            return Object.assign({}, state, {
                notes: newNotes,
                filteredNotes: getFilteredNotes(newNotes, state.tabs),
                newNoteText: '',
            });
        }
        default: {
            return state;
        }
    }

}

const getFilteredNotes = (newNotes, tabs) => {
    const type = getFilterType(tabs);
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

const getFilterType = (tabs) => {
    return tabs.filter(tab => tab.isActive)[0].type;
}

export const toggleStatus = (id) => ({ type: TOGGLE_STATUS, id });
export const deleteNote = (id) => ({ type: DELETE_NOTE, id });
export const changeNote = (value) => ({ type: CHANGE_NOTE, value });
export const onClickTab = (tabType) => ({ type: CLICK_TABS, tabType });
export const addNote = (newNote) => ({ type: ADD_NOTE, newNote });

export default ToDoReducer;