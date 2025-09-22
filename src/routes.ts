import { Router } from "express";
import { ProductRoutes } from "./api/components/product/Infraestructure/ProductRoutes";
import { CategoryRoutes } from "./api/components/category/Infraestructure/CategoryRoutes";
import { AuthRoutes } from "./api/components/auth/infraestructure/AuthRoutes";
import { UserRoutes } from "./api/components/user/Infraestructure/UserRoutes";
import { SubCategoryRoutes } from "./api/components/subcategory/Infraestructure/SubCategoryRoutes";
import { PayerRoutes } from "./api/components/payer/Infraestructure/PayerRoutes";
import { PayRoutes } from "./api/components/pay/Infraestructure/PayRoutes";
import { ProductPayRoutes } from "./api/components/productsPay/Infraestructure/ProductPayRoutes";
import { PrintRoutes } from "./api/components/print/Infraestructure/PrintRoutes";
import { WhatsAppRoutes } from "./api/components/whatsapp/infraestructure/WhatsappRoutes";
import { GeneralProductRoutes } from "./api/components/GeneralProduct/Infraestructure/GeneralProductRoutes";
import { ProductIndividualRoutes } from "./api/components/productIndividual/Infraestructure/ProductIndividualRoutes";

export class AppRoutes {


    static get routes(): Router {
  
      const router = Router();
  
      router.use('/api/generalProducts', GeneralProductRoutes.routes );
      router.use('/api/productsIndividual', ProductIndividualRoutes.routes );
      router.use('/api/products', ProductRoutes.routes );
      router.use('/api/categories', CategoryRoutes.routes );
      router.use('/api/subcategories', SubCategoryRoutes.routes );
      router.use('/api/auth', AuthRoutes.routes );
      router.use('/api/users', UserRoutes.routes );
      router.use('/api/pay', PayRoutes.routes );
      router.use('/api/payer', PayerRoutes.routes );
      router.use('/api/productspay', ProductPayRoutes.routes );
      router.use('/api/print', PrintRoutes.routes );
      router.use('/api/whatsapp', WhatsAppRoutes.routes );
      
  
  
      return router;
    }
  
  
  }
  