import { Request, Response } from "express";
import { ColorSizeService } from "../Domain/ColorSizeService";

  

export class ColorSizeController {
    constructor(
        private service: ColorSizeService,

    ){
    }

    list = (_: Request, res: Response, ) => {
        return 
    }

    getById = (_: Request, __: Response, ) => {
        return
    }

    create = (req: Request, res: Response, ) => {
        

    }

    update = (_: Request, __: Response, ) => {
        return
        
    }

    delete = (_: Request, __: Response, ) => {
        return
    }
}