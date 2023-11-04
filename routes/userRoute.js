const express = require('express');
const router = express.Router();

const {register,login,update,deleteUser} = require("../controllers/userControllers");

router.post("/register",register);
router.post("/login",login)
router.put('/update/:id',update)
router.delete("/delete/:id",deleteUser);


module.exports = router;