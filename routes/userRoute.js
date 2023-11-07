const express = require('express');
const router = express.Router();
const {auth} = require("../middlewares/auth");

const {register,login,update,deleteUser, getAUser} = require("../controllers/userControllers");

router.post("/register",register);
router.post("/login",login)
router.put('/update/:id',auth,update)
router.delete("/delete/:id",auth,deleteUser);
router.get("/getAUser",auth,getAUser)


module.exports = router;