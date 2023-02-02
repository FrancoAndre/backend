import { Request, Response } from "express";
import prisma from "../../services/prisma.js";

export interface ILogisticsRequisition {
    createdAt?: Date;
    userId: string;
}


const LogisticsRequisition = {

    async main(req: Request, res: Response){
        const requisition: ILogisticsRequisition[] = await prisma.logisticsRequisition.findMany({});

        res.status(200).json({ status: "success_requisitions", requisition });
    },

    async create(req: Request, res: Response) {
        const requisition: ILogisticsRequisition | null = await prisma.logisticsRequisition.create({
            data: {
                userId: req.body.userId
            }
        });

        res.status(200).json({ status: "success_create_requisition", requisition });
    }

}

export default LogisticsRequisition;
