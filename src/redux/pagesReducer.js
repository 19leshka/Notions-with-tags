import API from './../API/api';

const ADD_NOTE = "ADD_NOTE";
const SET_SERVER_IS_STARTED = "SET_SERVER_IS_STARTED";
const DELETE_NOTE = "DELETE_NOTE";
const SET_NOTES = "SET_NOTES";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const CHANGE_TITLE = "CHANGE_TITLE";
const CHANGE_TEXT = "CHANGE_TEXT";
const CHANGE_ACTIVE_NOTES = "CHANGE_ACTIVE_NOTES";

const initialState = {
    notionPages: null,
    currentPage: {
        id: null,
        title: "",
        text: "",
        tags: []
    },
    activeNotes: [],
    serverIsStarted: null
}

const pagesReducer = (state = initialState, action) => {
    const stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case SET_NOTES:
            return { ...stateCopy, notionPages: action.value}
        case ADD_NOTE:
            if(stateCopy.notionPages !== null) {
                const prevPages = JSON.parse(JSON.stringify(stateCopy)).notionPages.sort((a,b) => b.id - a.id);
                stateCopy.notionPages.push({
                    id: prevPages[0].id + 1,
                    title: action.value,
                    text: "",
                    tags: []
                })
            }else{
                stateCopy.notionPages = [{
                    id: 0,
                    title: action.value,
                    text: "",
                    tags: []
                }]
            }
            return { ...stateCopy}
        case SET_CURRENT_PAGE:
            stateCopy.currentPage = action.value;
            return { ...stateCopy }
        case DELETE_NOTE:
            const withoutDel = stateCopy.notionPages.filter(note => {
                if(note.id !== action.value) return note;
            });
            return { ...stateCopy, notionPages: withoutDel }
        case CHANGE_TITLE:
            const newNoteTitle = action.value;
            stateCopy.notionPages.find(note => {
                if(note.id === newNoteTitle.id) return true;
            }).title = newNoteTitle.title;
            stateCopy.currentPage.title = newNoteTitle.title;
            return { ...stateCopy }
        case CHANGE_TEXT:
            const newNoteText = action.value;
            const note = stateCopy.notionPages.find(note => {
                if(note.id === newNoteText.id) return true;
            });
            note.text = newNoteText.text
            note.tags = newNoteText.tags
            stateCopy.currentPage.text = newNoteText.text;
            stateCopy.currentPage.tags = newNoteText.tags;
            return { ...stateCopy }
        case CHANGE_ACTIVE_NOTES:
            return { ...stateCopy, activeNotes: action.value }
        case SET_SERVER_IS_STARTED:
            return { ...stateCopy, serverIsStarted: action.value }
        default:
            return state;
    }
}

export const loadNotesThunkCreator = () => async (dispatch) => {
    try{
        const response = await API.loadNotes();
        dispatch(setNotesActionCreator(response.data));
        dispatch(setServerIsStartedActionCreator(true))
    }catch(e){
        dispatch(setServerIsStartedActionCreator(false))
    }
}

export const loadCurrentPageThunkCreator = (id) => async (dispatch) => {
    const response = await API.loadNoteById(id);
    dispatch(setCurrentPageActionCreator(response.data));
}

export const putPageThunkCreator = (id, note) => async (dispatch) => {
    const response = await API.putNoteById(id, note);
    dispatch(changeTitleActionCreator(note));
}

export const deletePageThunkCreator = (id) => async (dispatch) => {
    const response = await API.deleteNoteById(id);
    dispatch(deleteNoteActionCreator(id));
}

export const postNewNoteThunkCreator = (title) => async (dispatch, getState) => {
    dispatch(addNoteActionCreator(title));
    const id = JSON.parse(JSON.stringify(getState().pages.notionPages)).sort((a,b) => b.id - a.id)[0].id
    API.postNote({
        id: id,
        title: title,
        text: "",
        tags: []
    });
}

export const addNoteActionCreator = (value) => ({
    type: ADD_NOTE,
    value: value
});

export const deleteNoteActionCreator = (id) => ({
    type: DELETE_NOTE,
    value: id
});

export const setNotesActionCreator = (value) => ({
    type: SET_NOTES,
    value: value
});

export const setCurrentPageActionCreator = (value) => ({
    type: SET_CURRENT_PAGE,
    value: value
});

export const changeTitleActionCreator = (value) => ({
    type: CHANGE_TITLE,
    value: value
});

export const changeTextActionCreator = (value) => ({
    type: CHANGE_TEXT,
    value: value
})

export const changeActiveNotesActionCreator = (value) => ({
    type: CHANGE_ACTIVE_NOTES,
    value: value
});

export const setServerIsStartedActionCreator = (value) => ({
    type: SET_SERVER_IS_STARTED,
    value: value
});

export default pagesReducer;