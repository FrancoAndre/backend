import { Request, Response } from 'express';
import prisma from '../../services/prisma.js';

export interface IProduct {
    id:          string;
    name:        string;
    saleValue:   any;
    active:      string;
    categoryId?:  string;
    createdAt?:   Date;
    userId?:      string;
    image?:       string;
    minimumAmount: any;
    quantity: number;
}

const Product = {

    async main(req: Request, res: Response) {
        const products: IProduct[] = await prisma.product.findMany({
            select: {
                name: true,
                id: true,
                saleValue: true,
                active: true,
                categoryId: true,
                createdAt: true,
                userId: true,
                image: true,
                minimumAmount: true,
                quantity: true,
                category: {
                    select: {
                        description: true
                    }
                }
            }
        });

        res.status(200).json({ status: 'success_products', products })
   },

   async create(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> {
      const productFind: IProduct | null = await prisma.product.findUnique({
        where : {
            name: req.body.name
        }
      })

      if(productFind){
        return res.status(400).json({ status: 'error', message: 'Produto já cadastrado!' })
      }


      const product: IProduct | null = await prisma.product.create({
        data : {
            name:        req.body.name,
            saleValue:   Number(req.body.saleValue),
            active:      'SIM',
            categoryId:  req.body.categoryId,
            userId:      req.body.userId,
            image:      req.body.image,
            minimumAmount: Number(req.body.minimumAmount),
            quantity: req.body.quantity
        }
      });

     // await prisma.$queryRaw`update Product set image=${req.body.image} where id=${product.id}`;

      res.status(200).json({ status: 'success_create_product', product })
  },


  async update(req: Request, res: Response) {
      const products: IProduct | null = await prisma.product.update(
        {
          where: {
            id: req.body.id
          },
          data : {
            name:        req.body.name,
            saleValue:   Number(req.body.saleValue),
            categoryId:  req.body.categoryId,
            image:      req.body.image,
            minimumAmount: Number(req.body.minimumAmount),
            quantity: req.body.quantity
          }
        });

    //  await prisma.$queryRaw`update Product set image=${req.body.image} where id=${products.id}`;

      res.status(200).json({ status: 'success_update_product',  products})

  },

  async delete(req: Request, res: Response) {

    const product: IProduct | null = await prisma.product.findUnique({
      where: {
        id: req.body.id
      }
    });

    if(!product){
      return res.status(400).json({ status: 'error', message: 'Produto não existe!' })
    }

      await prisma.product.update(
        {
          where: {
            id: req.body.id
          },
          data: {
            active: 'NAO',
          }
        });

      res.status(200).json({ status: 'success_deleted_product' })
  },


  async updateStock(req: Request, res: Response) {

     await prisma.product.update({
      where: {
        id: req.body.id
      },
      data: {
        quantity: req.body.quantity
      }
    });

    res.status(200).json({status: 'quantity_updated_success'});
  }
}

export default Product;
