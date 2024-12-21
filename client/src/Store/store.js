import { configureStore } from '@reduxjs/toolkit'
import usersReducer from "../Features/UserSlice";
import carsReducer from "../Features/CarSlice";
import postReducer from "../Features/CommentSlice"
export const store = configureStore({
  reducer: {
    users:usersReducer,
    cars:carsReducer,
    posts: postReducer,
  },
})
