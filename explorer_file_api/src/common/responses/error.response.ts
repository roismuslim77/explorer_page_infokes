import { Injectable,BadRequestException, NotFoundException } from "@nestjs/common";

@Injectable()
export class ErrorResponseHelper {
    constructor (){}

    async returnErrorResponse(code, message = 'error'){
        return new Promise (function (resolve, reject){
            let ret = {
                err_code : code,
                err_msg : message
            }
            
            throw new BadRequestException(ret)
        })
    }
}