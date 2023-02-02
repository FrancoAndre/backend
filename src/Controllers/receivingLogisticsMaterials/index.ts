import { Request, Response } from "express";
import prisma from "../../services/prisma.js";

export interface IReceivingLogisticsMaterials {
    receivingId:    string;
    productId:      string;
    unitOfMeasure: string;
    quantity:       number;
    unitaryValue:   number;
    totalValue:     number;
}


const ReceivingLogisticsMaterials = {

    async main(req: Request, res: Response) {
        const receivingMaterials: IReceivingLogisticsMaterials[] = await prisma.receivingLogisticsMaterials.findMany({
            include: {
                product:{
                    select: {
                        name: true,
                    }
                }
            }
        });
        res.status(200).json({ status: 'success_receivingLogistics', receivingMaterials });
    },

    async create(req: Request, res: Response) {

        let data: IReceivingLogisticsMaterials[] = [];

        req.body.products.map((product: IReceivingLogisticsMaterials) => {
            data.push({
                receivingId:    req.body.receivingId,
                productId:      product.productId,
                unitOfMeasure:  product.unitOfMeasure?? '',
                quantity:       Number(product.quantity),
                unitaryValue:   Number(product.unitaryValue),
                totalValue:     Number(product.totalValue),
            })
        });
        await prisma.receivingLogisticsMaterials.createMany({
            data
        });
        res.status(200).json({ status: 'success_receivingLogistics_materials' });
    },


    async getOne(req: Request, res: Response) {
        const receivingMaterials: IReceivingLogisticsMaterials[] = await prisma.receivingLogisticsMaterials.findMany({
            where: {
                receivingId: req.body.receivingId
            },
            include: {
                product:{
                    select: {
                        name: true,
                    }
                }
            }
        });
        res.status(200).json({ status: 'success_receivingLogistics', receivingMaterials });
    },
}


export default ReceivingLogisticsMaterials;
