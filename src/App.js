import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css';
import Play from './component/Play';
import PlayUp from './component/PlayUp';
import Lobby from './component/Lobby';
import Login from './component/Login';
import Sign from './component/Sign';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Login></Login>}></Route>
          <Route path='/sign' exact element={<Sign></Sign>}></Route>
          <Route path='/lobby' exact element={<Lobby></Lobby>}></Route>
          <Route path='/play' exact element={<PlayUp></PlayUp>}></Route>
          <Route path='/before' exact element={<Play></Play>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
