import { BaseServiceImpl } from "./ServiceImpl/BaseServiceImpl";
import { SubCategoryProductService } from "../Domain/SubCategoryProductService";
import { SubCategoryProduct } from "../Domain/SubCategoryProduct";

export class SubCategoryProductServiceImpl extends BaseServiceImpl<SubCategoryProduct> implements SubCategoryProductService{
}