import cors from "cors"
import express from "express"
// import { sampleProducts } from "./data"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { productRouter } from "./router/productRouter"
import { seedRouter } from "./router/seedRouter"
import { userRouter } from "./router/userRouter"
import { orderRouter } from "./router/orderRouter"
import { keyRouter } from "./router/keyRouter"

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/rgamazondb"

mongoose.set("strictQuery", true)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb")
  })
  .catch(() => {
    console.log("error mongodb")
  })

const app = express()
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productRouter)
app.use("/api/seed", seedRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)
app.use("/api/keys", keyRouter)
// app.get("/api/products", (req: Request, res: Response) => {
//   res.json(sampleProducts)
// })

// app.get("/api/products/:slug", (req: Request, res: Response) => {
//   res.json(sampleProducts.find((x) => x.slug === req.params.slug))
// })

// app.post

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
