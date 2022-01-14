import {Request, Response} from 'express'
import { request } from 'http'


const getAllUsers = async(req: Request, res: Response) => {

     
    res.status(500).json({
        Status: 'error',
        message: 'This route is not yet defined'
    })
}


const createUser = async(req: Request, res: Response) => {


}

export default getAllUsers