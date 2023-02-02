
import { Request, Response } from "express";
import prisma from "../../services/prisma.js";


export interface StockMaterials {
    receivingId : string;
    receivingMaterialId: string;
    productId: string;
    quantity: number;
    unitOfMeasure: string;
    requisitionId?: string | null;
    referenceId?: string | null;
}

const StockMaterials = {

    async main(req: Request, res: Response) {
        const stock: StockMaterials[] = await prisma.stockOfMaterials.findMany({
            include: {
                product: {
                    select: {
                        name: true,
                    }
                }
            }
        });
        res.status(200).json({status: "success_stock", stock});
    },

    async create(req: Request, res: Response) {

        const stockFind = await prisma.stockOfMaterials.findFirst({
            where: {
                receivingId: req.body.receivingId
            }
        });

        if(stockFind) {
            res.status(400).json({status: "Recebimento já realizado!"});
            return;
        }

        let data: StockMaterials[] = [];

        req.body.stocks.map((stock: StockMaterials) => {
            data.push({
                receivingId:    req.body.receivingId,
                productId:      stock.productId,
                unitOfMeasure:  stock.unitOfMeasure?? '',
                quantity:       Number(stock.quantity),
                receivingMaterialId: stock.receivingMaterialId,
            })
        });

        await prisma.stockOfMaterials.createMany({
            data
        })

        res.status(200).json({status: "success_create_stock"});
    }

}

export default StockMaterials;
