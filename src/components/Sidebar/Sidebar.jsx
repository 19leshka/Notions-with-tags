import s from './Sidebar.module.css';
import NotePage  from './NotePage';
import Search  from './Search';
import {useSelector, useDispatch} from 'react-redux';
import {postNewNoteThunkCreator} from './../../redux/pagesReducer';

const Sidebar = (props) => {
    const dispatch = useDispatch();
    const notionPages = useSelector((state) => state.pages.notionPages)
    const activeNotes = useSelector((state) => state.pages.activeNotes)

    const pages = notionPages && notionPages.map(page => {
        if(activeNotes.includes(page.id)) {
            return <NotePage key={page.id} active={true} id={page.id} a title={page.title}/>
        }else{
            return <NotePage key={page.id} active={false} id={page.id} a title={page.title}/>
        }
        
    });

    const addPage = () => {
        dispatch(postNewNoteThunkCreator("New note"))
    }

    return (
        <nav>
            <Search notes={notionPages}/>
            <div onClick={() => addPage()} className={s.addPage}>
                +
            </div>
            <div className="sidebar_container">
                {pages}
            </div>
        </nav>
    )
}

export default Sidebar;