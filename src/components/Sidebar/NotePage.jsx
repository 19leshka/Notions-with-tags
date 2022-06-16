import React  from 'react';
import {NavLink} from 'react-router-dom';
import {deletePageThunkCreator} from './../../redux/pagesReducer';
import {useDispatch} from 'react-redux';

const NotePage = ({id, title, active}) => {
    const dispatch = useDispatch();

    const onDelete = (e) => {
        dispatch(deletePageThunkCreator(id));
    }

    return (
        <NavLink to={`/note/${id}`}><div id={id} className={active ? "activeNotePage" : "notePage"}>
                {title}
            <button className="deleteNotePage" onClick={(e) => onDelete(e)}>x</button>
        </div></NavLink>
    )
}

export default NotePage;