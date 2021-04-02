import { Injectable, UnauthorizedException, HttpStatus ,CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from "jsonwebtoken";

let ACCESS_TOKEN_SECRET = "AccessSecret";
let REFRESH_TOKEN_SECRET = "RefreshSecret";

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Request", authHeader);
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
                console.log("User", user);
                request.user = user
            }
        });
    }
    return true
    // return validateRequest(request);
  }
}