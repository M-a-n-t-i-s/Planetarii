import express  from 'express'
import cors from "cors";
import mongoose from "mongoose"
import {addFactory, getAll, removeFactory,  updateFactory} from "./controllers/FactoryController.js";

mongoose.connect('mongodb+srv://admin:admin@cluster0.v1drtez.mongodb.net/blog?retryWrites=true&w=majority').then(
    ()=> console.log("DB ok")
).catch((err)=> console.log('DB error',err))

const app =express();

app.use(cors())
app.use(express.json())

app.get('/', getAll)

app.post('/factory',addFactory)
app.patch('/factory/:id',updateFactory)
app.delete('/factory/:id',removeFactory)

app.listen(4444, (err)=>{
    if(err) {
        return console.log(err)
    }
    console.log('Server OK')
})

