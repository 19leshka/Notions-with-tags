import React from 'react';
import './App.css';
import './scss/page.scss';
import Sidebar from './components/Sidebar/Sidebar';
import store from './redux/store';
import {Provider} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {loadNotesThunkCreator} from './redux/pagesReducer';
import NotionArea from './components/NotionArea/NotionArea';
import ServerError from './components/ServerError';

const App = React.memo(() => {
  const dispatch = useDispatch();
  
  
  React.useEffect(() => {
    dispatch(loadNotesThunkCreator());
  },[])
  const serverIsStarted = useSelector((state) => state.pages.serverIsStarted);
  
  return (
    <div className="app">
        {serverIsStarted
        ? <div className="appContainer"><Sidebar/>
            <Routes>
              <Route path="/note/*" element={<NotionArea/>}/>
            </Routes></div>
        : <ServerError/>
        }
    </div>
  );
})

const NotionApp = () => {
  return (
    <BrowserRouter>
        <Provider store={store}>
          <App/>
        </Provider>
      </BrowserRouter>
  )
}

export default NotionApp;
