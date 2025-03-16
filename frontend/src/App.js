import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Welcome from "./welcome/Welcome";
import AboutUs from './aboutus/AboutUs';
import ContactUs from "./Contact/Contact";
import OurNeeds from "./our-needs/OurNeeds";
import Login from "./Login/login";
import Main from "./main/main";
import Requirements from "./requirements/Requirements";
import Users from "./users/Users";
import Camps from "./camps/Camp";
import AddUserForm from "./users/addUser";
import AddRequirementForm from "./requirements/addRequirement";
import Items from "./items/Item";
import AddItemForm from "./items/addItem";
import AddCampForm from "./camps/addCamp";
import Volunteers from "./volunteers/volunteers";
import AddVolunteerForm from "./volunteers/addVolunteer";
import Orders from "./order/order";
import Dashboard from "./dashboard/Dashboard";
import { AuthProvider } from "./Auth/AuthContext";
import ProtectedRoute
 from "./Auth/ProtectedRoute";
import AddOrderForm from "./order/addOrder";
import ChangePassword from "./ChangePassword/ChangePassword";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Welcome />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />

            <Route exact path="/our-needs" element={<OurNeeds />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/Signup" element={<Login />} />

            <Route element={<ProtectedRoute/>}>
              <Route path="/main" element={<Main/>}>
              <Route path="" element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="addUser" element={<AddUserForm />} />
              <Route path="editUser/:id" element={<AddUserForm />} />

              <Route path="requirements" element={<Requirements />} />
              <Route path="addRequirement" element={<AddRequirementForm />} />
              <Route
                path="editRequirement/:id"
                element={<AddRequirementForm />}
              />

              <Route path="camps" element={<Camps />} />
              <Route path="addCamp" element={<AddCampForm />} />
              <Route path="editCamp/:id" element={<AddCampForm />} />

              <Route path="items" element={<Items />} />
              <Route path="addItem" element={<AddItemForm />} />
              <Route path="editItem/:id" element={<AddItemForm />} />

              <Route path="volunteers" element={<Volunteers />} />
              <Route path="addVolunteer" element={<AddVolunteerForm />} />
              <Route path="editVolunteer/:id" element={<AddVolunteerForm />} />

              <Route path="orders" element={<Orders />} />
              <Route path="addorder" element={<AddOrderForm />} />
              <Route path="updateOrder/:id" element={<AddOrderForm />} />

              <Route path="change-password" element={<ChangePassword></ChangePassword>}></Route>
            </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
