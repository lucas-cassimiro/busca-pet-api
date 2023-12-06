import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { UserData } from "../interfaces/UserData";
import prisma from "../../../config/clientPrisma";

export class UserController {
    async create(req: Request, res: Response) {
        try {
            const { email, password_hash, cellphone, full_name } =
        req.body as UserData; // recebe os dados da requisição, ou seja, as informações enviadas lá do formulário

            const findUser = await prisma.user.findUnique({
                where: {
                    email,
                },
            }); // está verificando se o e-mail existe lá no Banco de Dados

            if (findUser)
                return res.status(404).json({ message: "E-mail já cadastrado." });
            // está fazendo a verificação, se o usuário existir, retorna um status 404 e uma mensagem

            const newUser = {
                email,
                password_hash,
                cellphone,
                full_name,
            };

            const hash = bcrypt.hashSync(newUser.password_hash, 10);

            newUser.password_hash = hash;

            await prisma.user.create({
                data: newUser,
            });

            return res.status(201).json({ message: "Usuário criado com sucesso." });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Erro ao criar usuário." });
        }
    }
}
