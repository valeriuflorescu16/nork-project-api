const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth");
const Admin = require("../models/admin");

router.post("/admin/login", async (req, res) => {
  try {
    const admin = await Admin.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await admin.generateAuthToken();
    res.send({ admin, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/admin/logout", auth, async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.admin.save();

    res.send();
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }
});

module.exports = router;