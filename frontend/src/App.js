import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Welcome from './welcome/Welcome';
import OurNeeds from './our-needs/OurNeeds';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Welcome/>} />
        <Route exact path="/our-needs" element={<OurNeeds/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
