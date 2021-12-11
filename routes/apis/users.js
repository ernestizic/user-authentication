const express = require("express");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const passport = require("passport");

// SIGN UP (Create a user)
router.post("/register", async (req, res) => {
  // check if a user exists before registering
  const user = await User.findOne({ email: req.body.email });

  try {
    if (user) {
      return res.status(400).json({
        success: false,
        msg: "User already exists with this email",
      });
    } else {
      if (req.body.password != req.body.confirmPassword) {
        return res.status(400).json({
          success: false,
          msg: "Passwords do not match",
        });
      }
      //   Hash password before subitting to DB
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
      };
      const nUser = await User.create(newUser);

      //   Sign JWT
      jwt.sign(
        { id: nUser.id },
        process.env.SECRET_KEY,
        { expiresIn: "10h" },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({
            success: true,
            data: nUser,
            token,
          });
        }
      );
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error!",
    });
  }
});


// Login User
router.post("/login", async (req, res) => {
  // check if a user exists before logging in
  const user = await User.findOne({ email: req.body.email });

  try {
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "No User Found",
      });
    }

    //   Check if password is correct and login
    if (await bcrypt.compare(req.body.password, user.password)) {
      //   Sign JWT
      jwt.sign(
        { id: user.id },
        process.env.SECRET_KEY,
        { expiresIn: "10h" },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({
            success: true,
            data: user,
            token,
          });
        }
      );
    } else {
        return res.status(400).json({
            success: false,
            msg: "Password incorrect"
        })
    }
  } catch (err) {
      return res.status(500).json({
          success: false,
          error: err
      })
  }
});


// Get User data
router.get("/userdata", passport.authenticate('jwt', { session: false }), async(req, res)=> {
    const user = await User.findById(req.user.id).select("-password")

    return res.status(200).json({
        success: true,
        data: user
    })
})

module.exports = router;
