import * as bcrypt from "bcryptjs";
import { Injectable } from "graphql-modules";
import * as jwt from "jsonwebtoken";

export interface UserType {
    id: string;
    name: string;
    email: string;
    phone?: string;
    createdAt: Date;
    token: string;
    password: string;
    role: string;
    authenticateUser?(password: string);
    createToken?();
    toJSON?();
}

export class User implements UserType {

    public static hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
    public id: string;
    public name: string;
    public email: string;
    public phone?: string;
    public createdAt: Date;
    public token: string;
    public role: string;
    public password: string;
    public authenticateUser?(password) {
        return bcrypt.compareSync(password, this.password);
    }
    public createToken?() {
        return jwt.sign({
            name: this.name,
            email: this.email,
            role: this.role,
        },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
    }
    public toJSON?() {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            token: this.createToken(),
        };
    }
}
