import { Request, Response } from "express";
import prisma from "../../services/prisma.js";


export interface ILogisticsRequisition {
    requisitionId: string;
    productId: string;
    quantity: number;
}

const LogisticsRequisitionMaterials = {
    async main(req: Request, res: Response) {
        const requisitionMaterials: ILogisticsRequisition[] = await prisma.logisticsRequisitionMaterials.findMany({
            where: {
                requisitionId: req.body.requisionId
            },
            include: {
                product: {
                    select: {
                        name: true,
                    }
                }
            }
        });
        res.status(200).json({ status: "success_requisition_materials", requisitionMaterials});
    },

    async create(req: Request, res: Response) {

        let data: ILogisticsRequisition[] = [];

        req.body.products.map((product: ILogisticsRequisition) => {
            data.push({
                requisitionId:  req.body.requisitionId,
                productId:      product.productId,
                quantity:       Number(product.quantity),
            })
        });
        await prisma.logisticsRequisitionMaterials.createMany({
            data
        });
        res.status(200).json({ status: 'success_receivingLogistics_materials' });
    }
}

export default LogisticsRequisitionMaterials;
