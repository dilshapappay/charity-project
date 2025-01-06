import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Welcome from './welcome/Welcome';
import OurNeeds from './our-needs/OurNeeds';
import Main from './main/main';
import Requirements from './requirements/Requirements';
import Users from './users/Users';
import Camps from './camps/Camp';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/our-needs" element={<OurNeeds />} />
          <Route path="/main" element={<Main />} >
            <Route path="users" element={<Users/>} />
            <Route path="requirements" element={<Requirements />} />
            <Route path="camps" element={<Camps />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
