import jwt from "jsonwebtoken";


const generateToken = (res, userId) => {
    // token
    const token = jwt.sign({userId: userId}, process.env.JWT_SECRET, {expiresIn: '15d'});

    // set JWT as HTTP-only cookie: (15-days)
    res.cookie('jwt', token, {httpOnly: true, secure: process.env.NODE_ENV !== 'development', sameSite: 'strict', maxAge: 15*24*60*60*100});
};

export default generateToken;