import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Editor from './Editor';
import HomePage from './HomePage';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<HomePage/>}/>
        <Route path = "/newpage" element = {<Editor/>}/>
        <Route path = "/signin" element = {<Signin/>}/>
        <Route path = "/signup" element = {<Signup/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
