const global = require('../global/index')
const jwt = require('jsonwebtoken');
const User = require('../models/User')

const Auth = async (req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, global.randomKey);
        const user = await User.findOne({_id: decoded.id, 'jwsToken.token': token})
        
        if(!user){
            throw new Error()
        }

        req.user = user
        next();
        
    } catch (error) {
        res.status(401).send({error: 'Unauthorized User'})
    }
}


module.exports = Auth