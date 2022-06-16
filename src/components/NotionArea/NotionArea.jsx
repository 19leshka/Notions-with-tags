import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import {loadCurrentPageThunkCreator, changeTitleActionCreator, changeTextActionCreator, putPageThunkCreator} from './../../redux/pagesReducer';
import {useLocation} from 'react-router';
import Tag from './Tag'; 

const NotionArea = (props) => {
    const location = useLocation().pathname.split('note/')[1];

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(loadCurrentPageThunkCreator(location));
    },[location])

    const note = useSelector((state) => state.pages.currentPage);

    const onTitleChange = (e) => {
        dispatch(changeTitleActionCreator({
            id: note.id,
            title: e.target.value,
            text: note.text,
            tags: note.tags
        }));;
    }
    
    const onTextChange = (e) => {
        const tags = findTags(e.target.value)
        dispatch(changeTextActionCreator({
            id: note.id,
            title: note.title,
            text: e.target.value,
            tags: tags
        }));
    }

    const findTags = (string) => {
        let hashTags, i, len, word, words;
        words = string.split(/[\s\r\n]+/);
        hashTags = [];
        for (i = 0, len = words.length; i < len; i++) {
            word = words[i];
            if (word.indexOf('#') === 0) {
            hashTags.push(word);
            }
        }
        return hashTags;
    } 

    const mapText = (text) => {
        const newText = text.split(/[\s\r\n]+/).map(word => {
            if (word.indexOf('#') === 0) {
                return <span><span className="tagInText">{word}</span> </span>;
            }else{
                return `${word} `
            }
        })
        return newText;
    }

    const saveNote = () => {
        dispatch(putPageThunkCreator(note.id, {
            id: note.id,
            title: note.title,
            text: note.text,
            tags: note.tags
        }))
    }

    return (
        <div className="notionArea">
            <div className="noteTitle">
                <textarea name="title" className="titleArea" onChange={(e) => {onTitleChange(e)}} value={note.title} onBlur={() => saveNote()}/>
                {/* <div contenteditable="true" className="titleArea" onInput={e => onTitleChange(e)} onBlur={() => saveNote()}>{note.title}</div> */}
            </div>
            <hr />
            <div className="textAreaContainer">
                {/* {!titleAreaActive 
                ? <div onClick={() => setTitleAreaActive(true)} className="textArea">{mapText(note.text)}</div>
                : <textarea name="title" className="textArea" onChange={(e) => {onTextChange(e)}} value={note.text} onBlur={() => {
                    saveNote()
                    setTitleAreaActive(false)
                    }}/>} */}
                    <textarea name="title" className="textArea" onChange={(e) => {onTextChange(e)}} value={note.text} onBlur={() => {
                    saveNote()}}/>
                    {/* <div contenteditable="true" onInput={(e) => {onTextChange(e)}} className="textArea">{mapText(note.text)} </div> */}
            </div>
            <div className="tagsContainer">
                {note.tags && note.tags.map((tag, i)=> <Tag key={i} tag={tag}/>)}
            </div>
        </div>
    )
}

export default NotionArea;