import * as axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:3001/",
    withCredentials: true
});

const API = {
    loadNotes () {
        return instance.get('notionPages');
    },
    loadNoteById (id) {
        return instance.get(`notionPages/${id}`)
    },
    postNote (note) {
        return instance.post(`notionPages`, note)
    },
    deleteNoteById (id) {
        return instance.delete(`notionPages/${id}`)
    },
    putNoteById (id, note) {
        return instance.put(`notionPages/${id}`, note)
    }
}

export default API;