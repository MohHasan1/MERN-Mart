import bcrypt from "bcryptjs";

const users = [
    {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123', 10),
        isAdmin: true,
    },
    {
        name: 'Sam',
        email: 'sam@gmail.com',
        password: bcrypt.hashSync('123', 10),
        isAdmin: false,
    },
    {
        name: 'neal',
        email: 'neal@gmail.com',
        password: bcrypt.hashSync('123', 10),
        isAdmin: false,
    },
    {
        name: 'liam',
        email: 'liam@gmail.com',
        password: bcrypt.hashSync('123', 10),
        isAdmin: false,
    },
];

export default users;