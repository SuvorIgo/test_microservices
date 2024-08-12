import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { NatsContext, RpcException } from "@nestjs/microservices";
import { throwError } from "rxjs";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToRpc().getContext<NatsContext>();

        return throwError(() => new HttpException(exception.message, exception.getStatus()));
    }
}