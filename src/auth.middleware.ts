import { Injectable, NestMiddleware, UnauthorizedException, ExecutionContext, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";

let ACCESS_TOKEN_SECRET = "AccessSecret";
let REFRESH_TOKEN_SECRET = "RefreshSecret";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request...', req.headers['authorization']);
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        console.log("token", token);
        if(token == null){
            throw new UnauthorizedException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Api key is required',
              });
        }
        else{
            jwt.verify(token, ACCESS_TOKEN_SECRET, (err,user) => {
                if(err){
                    throw new UnauthorizedException({
                        status: HttpStatus.UNAUTHORIZED,
                        error: 'Invalid Api key',
                    });
                }
                else{
                    console.log("User", user)
                    req.user = user;
                    next();
                }
            });
        }
    }
}
