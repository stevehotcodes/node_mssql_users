import express, {json} from 'express'

import userRouter from './routes/usersRoutes'


const app=express()
app.use(json())// middleware

app.use("/user", userRouter)
app.listen(4000, ()=>{
    console.log("Server Running...")
})