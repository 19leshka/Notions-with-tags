import React  from 'react';
import {changeActiveNotesActionCreator} from './../../redux/pagesReducer';
import {useDispatch} from 'react-redux';

const Search = ({notes}) => {
    const dispatch = useDispatch();
    const findTags = (e) => {
        const ids = []
        if(e.target.value !== ''){notes.forEach(note => {
            note.tags.forEach(tag => {
                if(tag.includes(`#${e.target.value}`)) ids.push(note.id)                
            })
        })}
        dispatch(changeActiveNotesActionCreator(ids))
    }

    return (
        <div className="searchContainer">
            <input placeholder="inpit keyword" type="text" onChange={e => findTags(e)}/>
        </div>
    )
}

export default Search;