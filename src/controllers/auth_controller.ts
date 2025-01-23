import { Request, Response, NextFunction } from 'express';
import userModel from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const wrongDetails = "wrong email or password";
const missingDetails = "missing email or password";

type TokenPayload = {
    _id: string;
};

const register = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).send(missingDetails);
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModel.create({
            email: email,
            password: hashedPassword,
        });
        return res.status(200).send(user);
    } catch (error) {
        return res.status(400).send(error);
    }
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if (!token) {
        res.status(401).send("missing token");
    } else if (!process.env.TOKEN_SECRET) {
        res.status(400).send("missing auth configuration");
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
            if (err) {
                console.log(err);
                res.status(403).send("invalid token");
                return;
            }

            const payload = data as TokenPayload;
            req.query.userId = payload._id;

            next();
        });
    }
};

const login = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).send(wrongDetails);
    }

    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).send(wrongDetails);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).send(wrongDetails);
        }

        if (!process.env.TOKEN_SECRET) {
            return res.status(400).send("missing auth configuration");
        }

        const token = jwt.sign(
            { _id: user._id },
            process.env.TOKEN_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRATION }
        );

        return res.status(200).send({
            email: user.email,
            _id: user._id,
            token: token,
        });
    } catch (error) {
        return res.status(400).send(error);
    }
};

export default { register, login };