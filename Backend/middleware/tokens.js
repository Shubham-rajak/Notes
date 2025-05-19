import jwt, {decode} from 'jsonwebtoken'
import userModel from '../models/users.model.js'

export const auth = async (req, res, next) => {
    let token = null;
    try{
        if(req.headers.authorization){
            token = req.headers.authorization;
            let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            console.log(token);
            if(decoded){
                const user = await userModel.filter({_id: decode.id}).select('-password');
                req.user = user;
                next();
            }else{
                return res.status(401).json({
                    message: 'Invalid token',
                })
            }
        }else{
            return res.status(401).json({
                message: 'Invalid token'
            })
        }
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

export const admin = async (req, res, next) => {
    try{
        if(req.user.role !== 'admin'){
            return res.status(401).json({
                message: 'You are not authorized to perform this action'
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
}

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token)
    if(!token){
        return res.status(401).json({
            message: "Access token missing",
            success: false
        });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log("Verify token " + JSON.stringify(user));
        if(err) return res.json({
            message: err.name === "TokenExpiredError" ? "Access token expired" : "Invalid access token",
            success: false
        });
        req.user = user;
        console.log("Now going to next step...");
        next();
    })
}