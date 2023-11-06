const express =require("express")
const app = express()
const MongoDBConnection = require('./DbConfig/dbConfig')
const productRouter =require("./Routers/product.router")
const userRouter =require("./Routers/user.router")
const cartRouter =require("./Routers/cart.router")
const cors = require("cors")
require('dotenv').config()

MongoDBConnection()

app.use(cors())
app.use(express.json())

app.use('/',productRouter)
app.use('/user',userRouter)
app.use('/cart',cartRouter)


app.listen(process.env.PORT,()=>console.log(`Server is running is ${process.env.PORT} PORT`))