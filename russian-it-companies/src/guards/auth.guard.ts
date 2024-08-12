import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class AuthUserGuard implements CanActivate {
    constructor(
        @Inject('AUTH_SERVICE')
        private readonly authService: ClientProxy,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const { success } = await lastValueFrom(this.authService.send({ cmd: 'check-user-auth' }, { headers: request.headers }));

            if (!success) {

            } else {
                return true
            }
        } catch {
            throw new UnauthorizedException();
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}   