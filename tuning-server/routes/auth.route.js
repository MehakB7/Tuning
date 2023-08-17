const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const jwt = require("jsonwebtoken");

// aws.config.update({ region: "us-east-1" }); // Replace with your AWS region

const cognito = new aws.CognitoIdentityServiceProvider();
const USER_POOL_ID = process.env.USER_POOL_ID; // Replace with your User Pool ID
const CLIENT_ID = process.env.CLIENT_ID; // Replace with your App Client ID
const JWT_SECRET = process.env.JWT_SECRET;


console.log(CLIENT_ID, process.env);


router.post("/signup", (req, res) => {
  const { email, password, name, bio, avatar } = req.body;

  const params = {
    ClientId: CLIENT_ID,
    Username: email.split('@')[0],
    Password: password,
    UserAttributes: [
      { Name: "name", Value: name },
      { Name: "email", Value: email }
    ],
  };

  cognito.signUp(params, (error, data) => {
    if (error) {
      console.error("Error signing up:", error);
      return res.status(500).json({ error });
    }

    res.status(201).json({ message: "User created successfully" });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: email.split("@")[0],
      PASSWORD: password,
    },
  };

  cognito.initiateAuth(params, (error, data) => {
    if (error) {
      console.error("Error logging in:", error);
      return res.status(401).json({ error });
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  });
});

router.post("/confirm-signup", (req, res) => {
  const { email, confirmationCode } = req.body;

  const params = {
    ClientId: CLIENT_ID,
    ConfirmationCode: confirmationCode,
    Username: email.split("@")[0],
  };


  cognito.confirmSignUp(params, (error, data) => {
    if (error) {
      console.error("Error confirming signup:", error);
      return res.status(500).json({ error });
    }

    res.json({ message: "Signup confirmed successfully" });
  });
});

// Handle password reset using the ForgotPassword flow
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  const params = {
    ClientId: CLIENT_ID,
    Username: email.split("@")[0]
  };

  cognito.forgotPassword(params, (error, data) => {
    if (error) {
      console.error("Error initiating password reset:", error);
      return res.status(500).json({ error });
    }

    res.json({ message: "Password reset initiated" });
  });
});

router.post("/reset-password", (req, res) => {
  const { email, newPassword, confirmationCode } = req.body;

  const params = {
    ClientId: CLIENT_ID,
    Username: email.split("@")[0],
    ConfirmationCode: confirmationCode,
    Password: newPassword,
  };

  cognito.confirmForgotPassword(params, (error, data) => {
    if (error) {
      console.error("Error resetting password:", error);
      return res.status(500).json({ error });
    }

    res.json({ message: "Password reset successful" });
  });
});

router.get("/whoami", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "JWT token missing from headers" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    // The decodedToken will contain user claims
    res.json(decodedToken);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    res.status(400).json({ error: "Invalid JWT token" });
  }
});

router.get("/users", async (req, res) => {
  const { pageNum, pageSize, name } = req.query; // Get the page number from the query parameter

  const params = {
    ClientId: CLIENT_ID,
    AttributesToGet: ["email", "name", "custom:bio", "custom:avatar"], // Add the attributes you want to retrieve
    Limit: pageSize,
    PaginationToken: pageNum,
    Filter: `name ^= "${name}"`, // Provide the pagination token
  };

  try {
    const userList = await cognito.listUsers(params).promise();
    res.json(userList);
  } catch (error) {
    console.error("Error fetching user list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;
