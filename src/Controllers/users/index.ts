
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../../services/prisma.js';

export interface IUsers {
    id?:              string;
    name:             string;
    userName:         string;
    password?:        string;
    userAdm?:         boolean;
    active?:          string;
    createdAt:        Date;
    avatar?:          string | null;
}

const Users = {

    async main(req: Request, res: Response) {
         const users: IUsers[] = await prisma.user.findMany();
          res.status(200).json({ status: 'success_users', users })
    },

    async create(req: Request, res: Response) {

        const userByEmail: IUsers | null = await prisma.user.findUnique({
          where: {
            userName: req.body.userName
          }
        });

        if(userByEmail){
          return res.status(400).json({ status: 'error', message: 'user name já cadastrado!' })
        }

        const user: IUsers = await prisma.user.create({
          data : {
            name: req.body.name,
            active: 'SIM',
            userAdm: req.body.userAdm,
            password: req.body.password,
            avatar:  req.body.avatar ?? '',
            userName: req.body.userName
          }
        });
        res.status(200).json({ status: 'success_create_user', user })
    },

    async update(req: Request, res: Response) {

      try {
        const user: IUsers | null = await prisma.user.update(
          {
            where: {
              id: req.body.userId
            },
            data : {
              name: req.body.name,
              avatar: req.body.avatar,
              password: req.body.password,
            }
          });

        res.status(200).json({ status: 'success_update_user', user })
      }
      catch(err){
        res.status(400).json({ status: 'error_update_user', message: 'Por favor selecione outra imagem!' })
      }
    },

    async delete(req: Request, res: Response) {

      const userById: IUsers | null = await prisma.user.findUnique({
        where: {
          id: req.body.id
        }
      });

      if(!userById){
        return res.status(400).json({ status: 'error', message: 'Usuário não existe!' })
      }

        await prisma.user.update(
          {
            where: {
              id: req.body.id
            },
            data: {
              active: 'NAO',
            }
          });

        res.status(200).json({ status: 'success_deleted_user' })
    },

    async login(req: Request, res: Response){

        const user: IUsers[] = await prisma.user.findMany({
          where: {
            userName: req.body.email,
            password: req.body.password
          }
        });

        if(!user || user.length<=0){
          return res.status(400).json({ status: 'error', message: 'Usuário ou senha incorretos!' })
        }else{
          if(user[0].active === 'NAO') {
            return res.status(400).json({ status: 'error', message: 'Usuário desativado, favor verificar com o administrador do sistema!' })
          }

          const token = jwt.sign({id: user[0].id, adm: user[0].userAdm}, process.env.SECRET_KEY!, { expiresIn: '14h' });

          return res.status(200).json({
                status: 'success_login',
                data: {
                  user: {
                    userId: user[0].id,
                    name: user[0].name,
                    userAdm: user[0].userAdm,
                  },
                  token: token,
                }
         });
        }
    },

    async validateToken(req: Request, res: Response) {
        const { token } = req.body;
        let validate = false;
        let adm = false;

        jwt.verify(token, process.env.SECRET_KEY!, function(err: any, decoded: any) {
            if (err) {
                validate=false;
            }else{
                if (decoded.adm){
                    adm = true;
                }
                validate=true;

            }
        });

        res.status(200).json({ validate, adm })
    },

    async findOne(req: Request, res: Response) {
      const users: IUsers[] = await prisma.user.findMany({
        where: {
          id: req.body.userId
        },
        select: {
          id: false,
          name: true,
          userName: true,
          password: false,
          userAdm: false,
          createdAt: true,
          avatar: true,
          active: false,
        }
      });
       res.status(200).json({ status: 'success_users', users })
 },

}


export default Users;
