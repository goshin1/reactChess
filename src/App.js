import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css';
import PlayBot from './component/PlayBot';
import PlayUp from './component/PlayUp';
import Lobby from './component/Lobby';
import Login from './component/Login';
import Sign from './component/Sign';
import Room from './component/Room';
import Exit from './component/Exit';
import Update from './component/Update';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Login></Login>}></Route>
          <Route path='/sign' exact element={<Sign></Sign>}></Route>
          <Route path='/lobby' exact element={<Lobby></Lobby>}></Route>
          <Route path='/room' exact element={<Room></Room>}></Route>
          <Route path='/play' exact element={<PlayUp></PlayUp>}></Route>
          <Route path='/playBot' exact element={<PlayBot></PlayBot>}></Route>
          <Route path='/exit' exact element={<Exit></Exit>}></Route>
          <Route path='/update' exact element={<Update></Update>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
