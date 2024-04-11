import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import store from './store.js';
import React from 'react';
import { loadUser } from './action/useraction';
import About from './Components/About/About'
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Front from  './Components/Body/Front';
import LoginSignup from './Components/User/LoginSignup'
import Profile from './Components/User/Profile';
import UpdateProfile from './Components/User/UpdateProfile';
import UserOptions from './Components/Header/UserOptions'

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  React.useEffect(()=>{

    store.dispatch(loadUser())
  },[dispatch]);

  return (
    
    <Router>
      {isAuthenticated && <UserOptions user={user} />}
      <Header/>
      <Routes>
      <Route path="/" element={<Front/>} />
      <Route path= "/about" element = {<About/>}/>
      <Route exact path = "/login" element = {<LoginSignup/>}/>
      {isAuthenticated &&  <Route exact path = "/account" element = {<Profile/>}/>}
      {isAuthenticated &&  <Route exact path = "/me/update" element = {<UpdateProfile/>}/>}
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
