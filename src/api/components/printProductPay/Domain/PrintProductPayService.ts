import { FileArray } from "express-fileupload";
import { BaseService } from "../../common/Domain/BaseService";
import { PrintProductPay } from "./PrintProductPay";

export interface PrintProductPayService extends BaseService<PrintProductPay>{
    uploadImages(files: FileArray): Promise<string[]>
}