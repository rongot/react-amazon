import express from "express"
import asyncHandler from "express-async-handler"
import { ProductModel } from "../models/productModel"

export const productRouter = express.Router()
//api/products
productRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find()
    res.json(products)
  })
)

productRouter.get(
  "/categories",
  asyncHandler(async (req, res) => {
    const categories = await ProductModel.find().distinct("category")
    res.json(categories)
  })
)
//
productRouter.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug })
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: "Product Not Found" })
    }
  })
)

productRouter.get(
  "/search/:search",
  asyncHandler(async (req, res) => {
    const search = await ProductModel.findOne({ category: req.params.search })
    if (search) {
      res.json(search)
    } else {
      res.json({ message: `hi ${req.params.search} not found` })
    }
  })
)
