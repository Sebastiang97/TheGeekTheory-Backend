import { db } from "../../../store/prisma/prismaSql.js";
import { baseRoutes } from "../common/base.routes.js";

let router = baseRoutes("category").getRoutes()

router.get("/products/:categoryId", async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId
        const productsCategory = await db.getUnique("product", {
            where: {
                categoryId: parseInt(categoryId),
            },
            include: {
                urlImage: true,
            },
        })
        return res.status(200).json(productsCategory)
    } catch (error) {
        console.log({error})
        return res.status(400).json({error})
    }
})

export default router;
