import { Router } from "express";
import {  ProductIndividualController } from "./ProductIndividual.controller";
import { getRepo } from "../../common/Infrastructure/GetRepo";
import { Product } from "../Domain/Product";
import { ProductServiceImpl } from "./ProductServiceImpl";
import { ColorGeneralProductServiceImpl } from "../../common/Infrastructure/ColorGeneralProductServiceImpl";
import { ColorImageServiceImpl } from "../../common/Infrastructure/ColorImageServiceImpl";
import { ColorImageSizeServiceImpl } from "../../common/Infrastructure/ColorImageSizeServiceImpl";
import { ColorGeneralProduct } from "../../common/Domain/ColorGeneralProduct";
import { ColorImage } from "../../common/Domain/ColorImage";
import { ColorImageSize } from "../../common/Domain/ColorImageSize";

export class ProductIndividualRoutes{
    static get routes(): Router {
        const router = Router();
        const productRepository = getRepo<Product>("product")
        const colorGeneralProductRepository = getRepo<ColorGeneralProduct>("colorGeneralProduct")
        const colorImageRepository = getRepo<ColorImage>("colorImage")
        const colorImageSizeRepository = getRepo<ColorImageSize>("colorImageSize")
        const productServiceImpl = new ProductServiceImpl(productRepository)
        const colorGeneralProductServiceImpl = new ColorGeneralProductServiceImpl(colorGeneralProductRepository)
        const colorImageServiceImpl = new ColorImageServiceImpl(colorImageRepository)
        const colorImageSizeServiceImpl = new ColorImageSizeServiceImpl(colorImageSizeRepository)
        
        const productController = new ProductIndividualController(
            productServiceImpl,
            colorGeneralProductServiceImpl,
            colorImageServiceImpl,
            colorImageSizeServiceImpl
        )
        

        router.get("/", productController.list)

        router.post("/", productController.create)
        
        
        return router
    }
}