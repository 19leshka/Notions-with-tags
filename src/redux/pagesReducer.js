const ADD_NOTE = "ADD_NOTE";

const initialState = {
    notionPages: [
        {
            id: 0,
            title: "First note"
        },
        {
            id: 1,
            title: "Second note"
        },
        {
            id: 2,
            title: "Homework"
        },
        {
            id: 3,
            title: "Relax"
        }
    ]
}

const pagesReducer = (state = initialState, action) => {
    const stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case ADD_NOTE:
            const prevPages = stateCopy.notionPages.sort((a,b) => a.id + b.id);
            let pages = stateCopy.notionPages.push({
                id: prevPages[0].id + 1,
                title: action.value
            })
            return { ...stateCopy, notionPages: pages}
        default:
            return state;
    }
}

export const addNoteActionCreator = (value) => ({
    type: ADD_NOTE,
    value: value
});

export default pagesReducer;