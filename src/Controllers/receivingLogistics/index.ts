import { Request, Response } from "express";
import prisma from "../../services/prisma.js";

export interface IReceivingLogistics {
    createdAt:          Date;
    userReceivingId?:   string;
    paidOff? : boolean | null;
    datePaidOff?: Date | null;
    userPaidOffId?: string | null;
    numberInvoice?: string | null;
    altUserId?: string | null;
    status: string;
}


const ReceivingLogistics = {

    async main(req: Request, res: Response) {
        const receiving: IReceivingLogistics[] = await prisma.receivingLogistics.findMany({
            where: {
                status: req.body.status
            },
            include: {
                userReceiving: {
                    select: {
                        name: true
                    }
                }
            }
        });
        res.status(200).json({ status: 'success_receivingLogistics', receiving });
    },

    async create(req: Request, res: Response) {
        const receiving: IReceivingLogistics | null = await prisma.receivingLogistics.create({
            data: {
             userReceivingId: req.body.userId,
             numberInvoice: req.body.numberInvoice,
             status: 'PENDENTE'
            }
        });





        res.status(200).json({ status: 'success_receivingLogistics', receiving });
    },


    async getOne(req: Request, res: Response) {
        const receiving: IReceivingLogistics[] = await prisma.receivingLogistics.findMany({
            where: {
                id: req.body.receivingId
            },
            include: {
                userReceiving: {
                    select: {
                        name: true
                    }
                }
            }
        });
        res.status(200).json({ status: 'success_receivingLogistics', receiving });
    },



}


export default ReceivingLogistics;
