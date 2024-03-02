import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";


// @desc Auth user and get token (jwt)
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Look for the user to login:
    const user = await User.findOne({email});

    // if user exit and pass matches:
    if (user && (await user.checkPassword(password)))
    {
        // generate Token token :
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });

    } else{
        // 401 = unauthorized
        res.status(401);
        throw new Error('Invalid Email/Password');
    }
});


// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   // check if user exist:
   const userExist = await User.findOne({ email });

   if (userExist) {
        // 400 = client error:
        res.status(400);
        throw new Error('User already exist');  
   } 
   else 
   {
        const user = await User.create({name, email, password});

        if (user)
        {
            // generate token:
            generateToken(res, user._id);

            // response the user created:
            res.status(201).json(
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                }
            );
        }
        else
        {
            res.status(400);
            throw new Error('Invalid user data!');
        }
   }
});


// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
    // clear cookie:
    res.cookie('jwt', '', {httpOnly:true, expires: new Date(0)});

    res.status(200).json( { message: 'Logged out successfully! '} )
});


// @desc Get user profile (using session)
// @route GET /api/users/profile
// @access Public
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user)
    {
        res.status(200).json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        );
    }
    else
    {
        res.status(404);
        throw new Error('User not found!');
    }

});


// @desc update user profile (using token)
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user)
    {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        
        if (req.body.password)
        {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    }
    else
    {
        res.status(404);
        throw new Error('User not found!');
    }
});


// @desc get all user
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send("All user")
});

// @desc get single user
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send("single user")
});


// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send("del user")
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send("update user")
});




export { loginUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser};




