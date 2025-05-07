import { Injectable } from "@nestjs/common"

@Injectable()
export class SuccessResponseHelper {
    constructor (){}

    async returnSuccessResponse(code, message = 'success'){
        return new Promise (function (resolve, reject){
            let ret = {
                success_code : code,
                success_msg : message
            }
            
            resolve(ret)
        })
    }
}