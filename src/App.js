import './App.css';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import store from './redux/store';
import {Provider} from 'react-redux';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Provider store={store}>
          <SidebarContainer/>
          <Routes>
            <Route path="/note/*" element={<div>wwqeweq</div>}/>
          </Routes>
          <main>

          </main>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
