const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const UserPostgreSQL = require('../models/UserPostgreSQL');

// Déterminer le modèle à utiliser en fonction du type de base de données
const DB_TYPE = process.env.DB_TYPE || 'mongodb';
const UserModel = DB_TYPE === 'postgres' ? UserPostgreSQL : User;

const authController = {
    login: async (req, res, next) => {
        const { email, password } = req.body;

        try {
            const existingUser = await UserModel.findOne({ email: email });
            
            if (!existingUser) {
                return res.status(401).json({
                    success: false,
                    message: "Utilisateur non trouvé"
                });
            }

            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: "Mot de passe incorrect"
                });
            }

            const token = jwt.sign(
                {
                    userId: DB_TYPE === 'postgres' ? existingUser.id : existingUser._id,
                    email: existingUser.email
                },
                process.env.JWT_SECRET || 'votre_secret_jwt',
                { expiresIn: "1h" }
            );

            res.status(200).json({
                success: true,
                data: {
                    userId: DB_TYPE === 'postgres' ? existingUser.id : existingUser._id,
                    email: existingUser.email,
                    token: token,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    signup: async (req, res, next) => {
        const { name, email, password } = req.body;

        try {
            const existingUser = await UserModel.findOne({ email: email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "L'utilisateur existe déjà"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            
            let newUser;
            if (DB_TYPE === 'postgres') {
                newUser = await UserModel.create({
                    name,
                    email,
                    password: hashedPassword,
                });
            } else {
                newUser = new User({
                    name,
                    email,
                    password: hashedPassword,
                });
                await newUser.save();
            }

            const token = jwt.sign(
                {
                    userId: DB_TYPE === 'postgres' ? newUser.id : newUser._id,
                    email: newUser.email
                },
                process.env.JWT_SECRET || 'votre_secret_jwt',
                { expiresIn: "1h" }
            );

            res.status(201).json({
                success: true,
                data: {
                    userId: DB_TYPE === 'postgres' ? newUser.id : newUser._id,
                    email: newUser.email,
                    token: token
                },
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = authController;