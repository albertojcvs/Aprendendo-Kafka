import express, { request } from 'express'
import { createUserController } from './useCases/CreateUser';
import { deleteUserController } from './useCases/DeleteUser';


const routes = express.Router();

routes.post('/users',(request,response) => {
    return createUserController.handle(request,response)
} )

routes.delete('/users/:id',(request,response) => {
    return deleteUserController.handle(request,response)
} )
