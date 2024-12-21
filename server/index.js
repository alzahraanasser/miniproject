import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import bcrypt from "bcrypt";
import CarModel from "./Models/CarModel.js";
import CommentModel from "./Models/CommentModel.js";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());

//Database connection
dotenv.config();
const URI =`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@carrentcluster.iimxl.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority&appName=CarRentCluster`;
 

mongoose.connect(URI);
app.listen(process.env.PORT, () => {
  console.log("You are connected");
});

app.post("/registerUser", async (req, res) => {
  try {
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    });

    await user.save();
  res.send({user:user, msg:"Document saved successfully"})

}
catch(error) {
  console.error(error);
  res.status(500).json({error:"An unexpected error occurred"})

}
}); 

app.post("/booking", async (req, res) => {
  try {
    console.log("Request body received:", req.body); // Log the request payload
    const newBooking = new CarModel({
      wilayat: req.body.wilayat,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });

    await newBooking.save();
    console.log("Booking saved successfully:", newBooking); // Log success
    res.status(201).json({ message: "Booking created successfully", newBooking });
  } catch (error) {
    console.error("Error saving booking:", error.message); // Log the error message
    console.error(error.stack); // Log the error stack trace
    res.status(500).json({
      error: "Failed to create booking",
      details: error.message, // Return error message for debugging
    });
  }
});

app.post("/savePost", async (req, res) => {
  try {
    const postMsg = req.body.postMsg;
    const email = req.body.email;

    const post = new CommentModel({
      postMsg: postMsg,
      email: email,
    });

    await post.save();
    res.send({ post: post, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/getPosts", async (req, res) => {
  try {
    // Fetch all posts from the "CommentModel" collection, sorted by createdAt in descending order
    const posts = await CommentModel.find({}).sort({ createdAt: -1 });

    const countPost = await CommentModel.countDocuments({});

    res.send({ posts: posts, count: countPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" })
  }
  });

  
//PUT API - likePost
app.put("/likePost/:postId/", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;
    try {
    //search the postId if it exists
    const postToUpdate = await CommentModel.findOne({ _id: postId });
    if (!postToUpdate) {
      return res.status(404).json({ msg: "Post not found." });
    }
    //Search the user Id from the array of users who liked the post.
    const userIndex = postToUpdate.likes.users.indexOf(userId);
    //indexOf method returns the index of the first occurrence of a specified value in an array.
    //If the value is not found, it returns -1.
    //This code will toogle from like to unlike
    if (userIndex !== -1) {
      // User has already liked the post, so unlike it
      const udpatedPost = await CommentModel.findOneAndUpdate(
        { _id: postId },
        {
          $inc: { "likes.count": -1 }, // Decrement the like count $inc and $pull are update operators
          $pull: { "likes.users": userId }, // Remove userId from the users array
        },
        { new: true } // Return the modified document
      );
  
      res.json({ post: udpatedPost, msg: "Post unliked." });
    } else {
      // User hasn't liked the post, so like it
      const updatedPost = await CommentModel.findOneAndUpdate(
        { _id: postId },
        {
          $inc: { "likes.count": 1 }, // Increment the like count
          $addToSet: { "likes.users": userId }, // Add userId to the users array if not already present
        },
        { new: true } // Return the modified document
      );
  
      res.json({ post: updatedPost, msg: "Post liked." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
  });
  
  app.put("/likePost/:postId/", async (req, res) => {
    const postId = req.params.postId; //Extract the ID of the post from the URL
    const userId = req.body.userId;
    try {
   
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    }
  });


//Express route for login

app.post("/login", async (req, res) => { 
try { 
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (!user) { 
    res.status(500).send({ msg: " Couldn't find the user" });
    
  }
  else if (user.password !== password) {
    res.status(500).json({ msg: "Password is incorrect" });
    
  }
  else {
    res.send({user: user,msg:"Authentication Login successfuly"})
  }
}
catch (error) { 
  res.status(500).json({error:"An unexpected error occurred"})
}
})

app.post("/logout", async (req, res) => {
res.send({ msg: "Logged out successfully" })
})

app.get("/getrent", async (req, res) => {
  try {
    // Fetch all posts from the "CarModel" collection
    const rent = await CarModel.find({}).sort({ createdAt: -1 });

    const countrent = await CarModel.countDocuments({});

    res.send({ rent: rent ,count: countrent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" })
  }
  });
