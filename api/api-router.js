const router = require("express").Router();

const bcrypt = require("bcryptjs");

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const restricted = require("../auth/restricted-middleware.js");

router.use("/auth", authRouter);
router.use("/users", restricted, usersRouter);

router.get("/hash", (req, res) => {
  const authentication = req.headers.authentication;

  const hash = bcrypt.hashSync(authentication, 8);

  res.json({ originalValue: authentication, hashedValue: hash });
});

router.get("/", (req, res) => {
  res.json({ api: "It's alive" });
});

module.exports = router;
