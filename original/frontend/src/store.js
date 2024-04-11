import { configureStore } from "@reduxjs/toolkit";
import {allUsersReducer, profileReducer, userDetailsReducer, userReducer} from "./reeducers/userReducer"

const store = configureStore({
  reducer: {
     user : userReducer,
     userDetail : userDetailsReducer,
     profile:profileReducer, 
     allUser : allUsersReducer,
     allUsers : allUsersReducer
  }
});



export default store;