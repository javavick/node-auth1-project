const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const Users = require("../data/helpers/dbModel.js");

// POST "/api/register"
router.post("/register", (req, res) => {
  Users.add(req.body)
    .then((users) => {
      const payload = { id: users.id, username: users.username };
      res.status(201).json(payload);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// POST "/api/login"
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then((user) => {
      const validatedPassword = bcrypt.compareSync(password, user.password);

      if (user && validatedPassword) {
        res.json({ message: `${user.username} has logged in successfully!` });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET "/api/users"
router.get("/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.json(
        users.map((user) => {
          return { id: user.id, username: user.username };
        })
      );
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
