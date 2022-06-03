import React  from 'react';
import {connect} from 'react-redux';
import Sidebar from './Sidebar';

class SidebarContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Sidebar {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => ({
   pages: state.pages.notionPages
})

const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);