import { db } from "../../../store/prisma/prismaSql.js"

const getAll = async (req, res) => {
    try {
        const products = await db.get("product")
        return res.status(200).json(products)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error })
    }
}

const get = async (req, res) => {

    try {
        const id = req.params.id;
        const product = await db.getById("product", parseInt(id))
        if (!product) {
            return res.status(400).json({ error: "that id isn't exists" })
        }
        return res.status(200).json(product)
    } catch (error) {
        return res.status(400).json({ error })
    }
}

const create = async (req, res) => {
    try {
        const product = await db.create("product", {
            name: "producto 1",
            price: 12.4,
            categoryId: 6
        })
        return res.status(200).json({ product })
    } catch (error) {
        return res.status(400).json({ error })
    }
}

const update = async (req, res) => {

    try {
        let prod = req.body
        const id = req.params.id
        const product = await db.update("product", {
            id: parseInt(id),
            name: prod.name,
            price: prod.price,
            categoryId: prod.categoryId
        })
        return res.status(200).json(prod)
    } catch (error) {
        return res.status(400).json({ error })
    }

}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await db.deleteById("product", parseInt(id))
        return res.status(200).json(product)
    } catch (error) {
        return res.status(400).json({ error })
    }
}

export const productController = {
    getAll,
    get,
    create,
    update,
    deleteProduct
}