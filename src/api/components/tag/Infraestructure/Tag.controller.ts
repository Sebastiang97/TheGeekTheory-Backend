import { Request, Response } from "express"
import { GetTags } from "../Application/GetCategories"
import { tagSchema } from "./SchemaValidation/TagSchema"
import { CreateTag } from "../Application/CreateTag"
import { Updatetag } from "../Application/Updatetag"
import { GetTagByName } from "../Application/GetTagByName"
import { TagServiceImpl } from "./TagServiceImpl"
import { PARSE_INT } from "../../../../utils/parseInt"
import { GET_NEXT_PREVIOUS_CURSOR, GET_PAGINATION_QUERY } from "../../../../utils/GetPaginationQuery"
import { GetTagsByCursor } from "../Application/GetTagsByCursor"



export class TagController {
    constructor(
        private service: TagServiceImpl,
        
    ){
    }

    list = (_: Request, res: Response, ) => {
        return new GetTags(this.service)
            .execute()
            .then(tags => res.json( tags ))
            .catch(error => res.status( 400 ).json( { error } ))
    }

    listByCursor = (req: Request, res: Response, ) => {
        const cursor = req.query.cursor as string
        const direction = req.query.direction as string
        const limit = PARSE_INT(req.query.limit) as number
        
        const query = GET_PAGINATION_QUERY({limit, cursor, direction})

        return new GetTagsByCursor(this.service)
            .execute(query)
            .then(tags =>{
                return res.status(200).json(GET_NEXT_PREVIOUS_CURSOR(tags))
            }).catch(err => {
                console.log(err)
                return res.status(400).json(err)
            })
    }

    getById = (req: Request, res: Response, ) => {
        const {name} = req.params

        return new GetTagByName(this.service)
            .execute(name)
            .then(tag=> res.json( tag ))
            .catch(error => res.status( 400 ).json( { error } ))

    }

    getByName = (req: Request, res: Response, ) => {
        let {name} = req.params
        name = name.toLowerCase()
        console.log({name})
        return new GetTagByName(this.service)
            .execute(name)
            .then(tag=> res.json( tag ))
            .catch(error => res.status( 400 ).json( { error } ))

    }

    create = (req: Request, res: Response, ) => {
        let tag: any = {
            name: req.body.name,
            displayName: req.body.name.toLowerCase()
        }
        const result = tagSchema.safeParse(tag)
        if(!result.success){
            return res.status(400).json({error: 'El recurso enviado no cumple'})
        }
        
        
        return new CreateTag(this.service)
            .execute(tag)
            .then(categoryEntity => {
                return res.json(categoryEntity)
            })
            .catch(error => {
                console.log(error)                
                return res.status( 400 ).json( { error } )
            })
    }

    update = (req: Request, res: Response, ) => {
        const {id} = req.params
        let categoryUpdateDTO = {
            name: req.body.name
        }
        const result = tagSchema.safeParse(categoryUpdateDTO)
        if(!result.success){
            return res.status(400).json({error: result.error.issues})
        }
        
        return new Updatetag(this.service)
            .execute(categoryUpdateDTO, id)
            .then(tag=>{
                return res.json(tag)
            })
            .catch(error => {
                console.log(error)                
                return res.status( 400 ).json( { error } )
            })
    }

    delete = (__: Request, _: Response, ) => {

        
    }
}