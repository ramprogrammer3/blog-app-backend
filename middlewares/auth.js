
const jwt = require('jsonwebtoken');

exports.auth = async(req,res,next)=>{

    try {
        // extracting token from cookie, header,or body
        const token = req.cookies.token ||
        req.body.token ||
        req.header('Authorization').replace("Bearer ","");

        // If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

        try {
            // verifying token
            const decode = jwt.verify(token,'ramkumarsha256')
            req.user = decode;
            console.log(decode)
            
        } catch (error) {
            // If JWT verification fails, return 401 Unauthorized response
			return res
            .status(401)
            .json({ success: false, message: "token is invalid" });
        }

        next();
        
    } catch (error) {
        return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
    }

}