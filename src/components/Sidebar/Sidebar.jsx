import {NavLink} from 'react-router-dom';

const Sidebar = (props) => {
    const pages = props.pages.map(page => <NavLink to={`/note/${page.id}`} key={page.id}><div id={page.id} className="page">
        {page.title}
    </div></NavLink>);

    return (
        <sidebar>
            <div className="sidebar_container">
                {pages}
            </div>
        </sidebar>
    )
}

export default Sidebar;