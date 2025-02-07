import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Welcome from './welcome/Welcome';
import OurNeeds from './our-needs/OurNeeds';
import Main from './main/main';
import Requirements from './requirements/Requirements';
import Users from './users/Users';
import Camps from './camps/Camp';
import AddUserForm from './users/addUser';
import AddRequirementForm from './requirements/addRequirement';
import Items from './items/Item';
import AddItemForm from './items/addItem';
import AddCampForm from './camps/addCamp';
import Volunteers from './volunteers/volunteers';
import AddVolunteerForm from './volunteers/addVolunteer';
import Orders from './order/order';
import AddOrderForm from './order/addOrder';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/our-needs" element={<OurNeeds />} />
          <Route path="/main" element={<Main />} >
            <Route path="users" element={<Users/>} />
            <Route path="addUser" element={<AddUserForm />} />
            <Route path="editUser/:id" element={<AddUserForm/>} />

            <Route path="requirements" element={<Requirements />} />
            <Route path="addRequirement" element={<AddRequirementForm />} />
            <Route path="editRequirement/:id" element={<AddRequirementForm/>} />

            
            <Route path="camps" element={<Camps />} />
            <Route path="addCamp" element={<AddCampForm />} />
            <Route path="editCamp/:id" element={<AddCampForm/>} />

            <Route path="items" element={<Items />} />
            <Route path="addItem" element={<AddItemForm />} />
            <Route path="editItem/:id" element={<AddItemForm/>} />

             <Route path="volunteers" element={<Volunteers />} />
            <Route path="addVolunteer" element={<AddVolunteerForm />} />
            <Route path="editVolunteer/:id" element={<AddVolunteerForm/>} />
            
            <Route path="orders" element={<Orders />} />
            <Route path="addOrder" element={<AddOrderForm />} />
            <Route path="editOrder/:id" element={<AddOrderForm/>} />






          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
