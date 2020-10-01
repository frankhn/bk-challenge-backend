import { Response } from "express"

interface Data {
    status: number
    data?: any
    message?: string
    token?:string 
}

const JsonResponseWrapper = (res: Response, data: Data) => {
    return res.status(data.status).json({
        ...data
    })
}

export default JsonResponseWrapper;
