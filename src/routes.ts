import express, { Request, Response } from "express";
import Users from "./Controllers/users/index.js";
import Categories from "./Controllers/categories/index.js";
import {validateUser}  from './services/validUser.js';
import Product from "./Controllers/products/index.js";
import ReceivingLogistics from "./Controllers/receivingLogistics/index.js";
import ReceivingLogisticsMaterials from "./Controllers/receivingLogisticsMaterials/index.js";
import StockMaterials from "./Controllers/stockMaterials/index.js";
import LogisticsRequisition from "./Controllers/logisticsRequisition/index.js";
import LogisticsRequisitionMaterials from "./Controllers/logisticsRequisitionMaterials/index.js";

const routes = express.Router();

routes.get("/", (req: Request, res: Response) => {
    return res.json({ hello: "Hwlloe" });
});

/*USERS*/
routes.get("/users", validateUser, Users.main);
routes.post("/users", Users.create);
routes.put("/users", validateUser, Users.update);
routes.delete("/users", validateUser, Users.delete);
routes.post("/authenticate", Users.login);
routes.post("/authenticate/validateToken", Users.validateToken);
routes.post("/users/findOne", validateUser, Users.findOne);

routes.post("/categories", validateUser, Categories.main);
routes.post("/categories/add", validateUser, Categories.create);
routes.put("/categories/update", validateUser, Categories.update);
routes.delete("/categories/delete", validateUser, Categories.delete);
routes.post("/categories/getOneByCategory",  Categories.getOneByCategoryWithProducts);

routes.post("/products", validateUser, Product.main);
routes.post("/products/add", validateUser, Product.create);
routes.put("/products/update", validateUser, Product.update);
routes.delete("/products/delete", validateUser, Product.delete);
routes.delete("/products/updateStock", validateUser, Product.updateStock);

routes.post("/receivingLogistics/add", validateUser, ReceivingLogistics.create);
routes.post("/receivingLogistics", validateUser, ReceivingLogistics.main);
routes.post("/receivingLogistics/getOne", validateUser, ReceivingLogistics.getOne);

routes.get("/receivingLogisticsMaterials", validateUser, ReceivingLogisticsMaterials.main);
routes.post("/receivingLogisticsMaterials/getOne", validateUser, ReceivingLogisticsMaterials.getOne);
routes.post("/receivingLogisticsMaterials/add", validateUser, ReceivingLogisticsMaterials.create);

routes.get("/stockMaterials", validateUser, StockMaterials.main);
routes.post("/stockMaterials/add", validateUser, StockMaterials.create);

routes.get("/logisticsRequisition", validateUser, LogisticsRequisition.main);
routes.post("/logisticsRequisition/add", validateUser, LogisticsRequisition.create);

routes.post("/logisticsRequisitionMaterials", validateUser, LogisticsRequisitionMaterials.main);
routes.post("/logisticsRequisitionMaterials/add", validateUser, LogisticsRequisitionMaterials.create);



export default routes;
