import { Request, Response } from "express";
import { GeneralProductService } from "../Domain/GeneralProductService";
import { CreateGeneralProduct } from "../Application/CreateGeneralProduct";
import { GetGeneralProductsById } from "../Application/GetGeneralProductsById";
import { GetGeneralProductsBySubcategoryId } from "../Application/GetGeneralProductsBySubcategoryId";
import { GetTagsByNames } from "../../tag/Application/GetTagsByNames";
import { TagService } from "../../tag/Domain/TagService";
import { ProductTagService } from "../../common/Domain/ProductTagService";
import { Tag } from "../../tag/Domain/Tag";
import { CreateGeneralProductTags } from "../../common/Application/CreateGeneralProductTags";
import { PARSE_INT } from "../../../../utils/parseInt";
import { TO_STRING } from "../../../../utils/ToString";
import { GET_FILTER_PAGINATION_QUERY } from "../../../../utils/GetFilterByQuery";
import { GetGeneralProductsByFilters } from "../Application/GetGeneralProductsByFilters";
import { GET_NEXT_PREVIOUS_CURSOR } from "../../../../utils/GetPaginationQuery";
import { DeleteColorGeneralProducts } from "../../common/Application/DeleteColorGeneralProducts";
import { GeneralProduct } from "../Domain/GeneralProduct";
import { GetProductByGPId } from "../../productIndividual/Application/GetProductByGPId";
import { DeleteGeneralProduct } from "../Application/DeleteGeneralProduct";
import { ProductService } from "../../productIndividual/Domain/ProductService";
import { DeleteManyProducts } from "../../productIndividual/Application/DeleteManyProducts";
import { ResourceImageService } from "../../common/Domain/ResourceImageService";
import { DeleteProductsTagsByGPId } from "../../common/Application/DeleteProductsTagsByGPId";
import { ColorImageService } from "../../common/Domain/ColorImageService";
import { ColorGeneralProductService } from "../../common/Domain/ColorGeneralProductService";
import { ColorImageSizeService } from "../../common/Domain/ColorImageSizeService";
import { toArrayStringLowercase } from "../../../../utils/toArrayStringLowercase";
import { GET_CODE } from "../../../../utils/GetCode";

  

export class GeneralProductController {
    constructor(
        private service: GeneralProductService,
        private productService: ProductService,
        private resourceImageService: ResourceImageService,
        private tagService: TagService,
        private productTagService: ProductTagService,
        private colorGeneralProductService: ColorGeneralProductService,
        private colorImageService: ColorImageService,
        private colorImageSizeService: ColorImageSizeService,

    ){
    }

    list = (_: Request, __: Response, ) => {
       
    }

    getById = (req: Request, res: Response, ) => {
        const {id} = req.params
        return new GetGeneralProductsById(this.service)
            .execute(id)
            .then(generealProduct=>{
                return res.status( 200 ).json(generealProduct)
            })
            .catch(error => {
                console.log(error)
                return res.status( 400 ).json(error)
            })
        
    }

    getFilter = (req: Request, res: Response, ) => {
        console.log("getFilter")
        const cursor = req.query.cursor as string
        const direction = req.query.direction as string
        const limit = PARSE_INT(req.query.limit) as number
        const tags:string[] = TO_STRING(req.query.tags as string)
        const subCategoryId:string = req.query.subCategoryId as string

        console.log({
            limit, 
            cursor, 
            direction, 
            orderBy: "desc",
            tags, 
            subCategoryId
        })
        
        const query = GET_FILTER_PAGINATION_QUERY({
            limit, 
            cursor, 
            direction, 
            orderBy: "desc",
            tags, 
            subCategoryId
        })

         console.log({
            query
        })
        return new GetGeneralProductsByFilters(this.service)
            .execute(query)
            .then(generealProduct=>{
                return res.status( 200 ).json(GET_NEXT_PREVIOUS_CURSOR(generealProduct))
            })
            .catch(error => {
                console.log({error})
                return res.status( 400 ).json(error)
            })
        
    }

    getBySubCategoryId = (req: Request, res: Response)=>{
        const {subCategoryId} = req.params
        return new GetGeneralProductsBySubcategoryId(this.service)
            .execute(subCategoryId)
            .then(generalProducts=>{
                return res.status(200).json(generalProducts)
            })
            .catch(error => {
                console.log(error)
                return res.status( 400 ).json(error)
            })

    }

    create = (req: Request, res: Response, ) => { 
        console.log({
            body: req.body,
            tagsNames: req.body.tags
        })

        let tagsNames:string[] = toArrayStringLowercase(req.body.tags)
        let generalProduct:any = {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            isVisible: req.body.isVisible,
            categoryId: req.body.categoryId,
            code: GET_CODE(req.body.title),
            subCategoryId: req.body.subCategoryId
        }
        // delete generalProduct.tags

        generalProduct.price = parseFloat(req.body.price)
        let tags:Tag[] = []

        console.log({tagsNames})
        return new GetTagsByNames(this.tagService)
            .execute(tagsNames)
            .then(newTags=>{
                console.log({newTags})
                tags = newTags
                console.log({generalProduct})
                return new CreateGeneralProduct(this.service)
                    .execute(generalProduct)
            })
            .then(newGeneralProduct=>{
                console.log({newGeneralProduct})
                generalProduct = newGeneralProduct
                return new CreateGeneralProductTags(this.productTagService)
                    .execute(generalProduct.id, tags)
            })
            .then(productTags=>{
                console.log({productTags})
                return new GetGeneralProductsById(this.service)
                    .execute(generalProduct.id)
            })
            .then(generalProduct=>{
                return res.status(200).json(generalProduct)
            })
            .catch(error => {
                console.log(error)
                return res.status( 400 ).json(error)
            })
    }

    update = (_: Request, __: Response, ) => {
        
    }

    delete = (req: Request, res: Response, ) => {
        const {id} = req.params
        let gP: GeneralProduct[]
        return new GetGeneralProductsById(this.service)
            .execute(id)
            .then(generalProduct=>{
                console.log("first")
                gP = generalProduct
                return new DeleteProductsTagsByGPId(this.productTagService)
                    .execute(generalProduct[0].id)
            })
            .then(_=>{
                console.log("second")
                return new DeleteColorGeneralProducts(
                    this.colorGeneralProductService,
                    this.colorImageService,
                    this.colorImageSizeService,
                    this.resourceImageService
                )
                .execute(gP[0].id)
            })
            .then(_=>{
                console.log("third")
                return new GetProductByGPId(this.productService)
                .execute(gP[0].id)
            })
            .then(products=>{
                console.log("fourth")
                return new DeleteManyProducts(
                    this.productService,
                    this.resourceImageService
                ).execute(products)
            })
            .then(_=>{
                console.log("fifth")
                return new DeleteGeneralProduct(this.service)
                    .execute(gP[0].id)
            }).then(_=>{
                return res.status(200).json({ok: true})
            })
            .catch(error => {
                console.log(error)
                return res.status( 400 ).json(error)
            })
    }
}