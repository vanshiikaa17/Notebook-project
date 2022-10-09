var jwt=require('jsonwebtoken');

const fetchuser=(req,res,next)=>{
    //Get user from the jwt token 
    const token=req.header('authToken');
    if(!token){
        res.status(401).send({error:"Invalid token"});

    }
    try{
        const data=jwt.verify(token, process.env.JWT_SECRET);

        //adding the user to req
        req.user=data.user;
        //calling next middleware
        next();
    }catch(error){
        res.status(401).send({error:"Invalid token"});

    }
}

module.exports =fetchuser;