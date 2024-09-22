import { FileArray } from "express-fileupload";
import { BaseService } from "./BaseService";
import { ResourceImage } from "./ResourceImage";

export interface ResourceImageService extends BaseService<ResourceImage>{
    uploadImages(files: FileArray): Promise<string[]>
}