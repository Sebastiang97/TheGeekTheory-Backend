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

  

export class GeneralProductController {
    constructor(
        private service: GeneralProductService,
        private tagService: TagService,
        private productTagService: ProductTagService
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
        })
        let generalProduct = req.body
        delete generalProduct.tags
        let tagsNames:string[] =  req.body.tags
        generalProduct.price = parseFloat(req.body.price)
        let tags:Tag[] = []

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

    delete = (_: Request, __: Response, ) => {
        
    }
}