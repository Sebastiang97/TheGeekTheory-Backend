import { FileArray } from "express-fileupload";
import { BaseService } from "../../common/Domain/BaseService";
import { Print } from "./Print";

export interface PrintService extends BaseService<Print>{
    uploadImages(files: FileArray): Promise<string[]>
}