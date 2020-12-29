const express = require("express");
const { authCheck, adminCheck } = require("../middlewares/auth");
const router = express.Router();
const { createOrUpdateUser, currentUser } = require("../controllers/auth");
router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);
module.exports = router;
