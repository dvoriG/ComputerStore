import { hash, compare } from "bcrypt";

import { generateToken } from "../config/generateToken.js";
import { UserModel, userValidator, userValidatorForLogin } from "../Models/user.js";

// export const signUp = async (req, res) => {
    
//     let validate = userValidator(req.body);
//     if (validate.error)
//         return res.status(400)
//             .json({ type: "not valid body", messge: validate.error.details[0].message });
//     let { userName, password, email } = req.body;
//     try {
//         let sameUser = await UserModel.findOne({ userName: userName })
//         if (sameUser)
//             return res.status(409).json({ type: "same user", message: "user with same credentials already exists" })
//              if (!user || !await compare(req.body.password, user.password))
//              return res.status(409).json({ type: "same user", message: "user with same credentials already exists" })
//         let hashedPassword = await hash(password, 15);
//         let newUser = new UserModel({ userName, password: hashedPassword, email });
//         await newUser.save();
//         let token = generateToken(newUser);
//         return res.json({ token, userName: newUser.userName, email: newUser.email })

//     } catch (err) {
//         res.status(400).json({ type: "error", message: err.message })
//     }
// }

export const signUp = async (req, res) => {
    
    let validate = userValidator(req.body);
    if (validate.error)
        return res.status(400)
            .json({ type: "not valid body", messge: validate.error.details[0].message });
    let { userName, password, email } = req.body;
    try {
        let sameUser = await UserModel.findOne({ userName: userName })
        if (sameUser)
            return res.status(409).json({ type: "same user", message: "user with same credentials already exists" })
        let hashedPassword = await hash(password, 15);
        let newUser = new UserModel({ userName, password: hashedPassword, email });
        await newUser.save();
        let token = generateToken(newUser);
        return res.json({ token, userName: newUser.userName, email: newUser.email ,role:newUser.role,_id:newUser._id})
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

export const logIn = async (req, res) => {


    let validate = userValidatorForLogin(req.body);
    if (validate.error)
        return res.status(400).json({ type: "not valid body ", message: validate.error.details[0].message });

    try {
        let user = await UserModel.findOne({ userName: req.body.userName })
        if (!user || !await compare(req.body.password, user.password))
            res.status(404).json({ type: "no such user", message: "please sign up" })

        let token = generateToken(user);

        return res.json({ token, userName: user.userName, email: user.email ,role:user.role,_id:user._id })
        //

    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}
export const getAllUsers = async (req, res) => {
    try {

        const allUsers = await UserModel.find({}, "-password");//כדי שלא ישלוף את הסיסימא
        res.json(allUsers)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }

}

