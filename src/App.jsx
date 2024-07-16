
import { Routes, Route,  Navigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from "./pages/newUser/NewUser";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import CitiesAdmin from './pages/cities/CitiesAdmin';
import Search from './pages/search/Search';
import { UserListDataContextProvider } from './context/userContext/UserContext';

import './App.css'

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  console.log("isLoggedIn::", isLoggedIn)
  //if (!isLoggedIn || isLoggedIn == null) {
   // console.log("here", isLoggedIn)
  //  return <Navigate to='/login'/>;
 // }
  return (
    <>
     {isLoggedIn == "true" && (
       <Topbar/>
     )}
     <div className="container">
        {isLoggedIn == "true" && (
          <Sidebar />
        )}
        <UserListDataContextProvider>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>} />
            <Route
              exact
              path="/"
              element={isLoggedIn == "true" ? <Home /> : <Login />}
            />
            {isLoggedIn == "true" && (
              <>
                <Route path="/users" element={<UserList/>}/>
                <Route path="/user/:userId" element={<User/>}/>
                <Route path="/newuser" element={<NewUser/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/citiesadmin" element={<CitiesAdmin/>}/>
              </>
              )}
          </Routes>
        </UserListDataContextProvider>
     </div>
    </>
  )
}

export default App
