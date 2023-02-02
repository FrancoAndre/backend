import { Request, Response } from 'express';
import prisma from '../../services/prisma.js';

export interface ICategories {
    id:          string;
    description: string;
    active:     string;
    createdAt:   Date;
}

const Category = {

    async main(req: Request, res: Response) {
        const categories: ICategories[] = await prisma.category.findMany({
            orderBy: {
                description: 'asc'
            }
        });
        res.status(200).json({ status: 'success_categories', categories })

   },

   async create(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> {


      const categoryDescription: ICategories | null = await prisma.category.findUnique({
        where : {
            description: req.body.description
        }
      })

      if(categoryDescription){
        return res.status(400).json({ status: 'error', message: 'categoria já cadastrada!' })
      }

      const category: ICategories | null = await prisma.category.create({
        data : {
          description: req.body.description,
          userId: req.body.userId,
          active: 'SIM'
        }
      });
      res.status(200).json({ status: 'success_create_category', category })
  },


  async update(req: Request, res: Response) {

      const category: ICategories | null = await prisma.category.update(
        {
          where: {
            id: req.body.id
          },
          data : {
            description: req.body.description
          }
        });

      res.status(200).json({ status: 'success_update_category', category })
  },

  async delete(req: Request, res: Response) {

    const category: ICategories | null = await prisma.category.findUnique({
      where: {
        id: req.body.id
      }
    });

    if(!category){
      return res.status(400).json({ status: 'error', message: 'Categoria não existe!' })
    }

      await prisma.category.update(
        {
          where: {
            id: req.body.id
          },
          data: {
            active: 'NAO',
          }
        });

      res.status(200).json({ status: 'success_deleted_category' })
  },


  async getOneByCategoryWithProducts(req: Request, res: Response) {
    const categoryDescription = await prisma.category.findFirst({
        where : {
            description:  req.body.description ?? 'Doces',
        }
      }).Product({
        where: {
            active: 'SIM'
        }
      });

      res.status(200).json({ status: 'sucess_category_with_products', categoryDescription })
  }
}

export default Category;
