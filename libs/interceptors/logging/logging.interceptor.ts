import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();

    const request = ctx.getRequest();
    const requestUrl = request.originalUrl;
    const requestMethod = request.method;
    const requestIp = request.socket.remoteAddress;
    const requestBody = request.body;

    const response = ctx.getResponse();
    const responseStatusCode = response.statusCode;

    Logger.log(
      `Request(${requestIp}): ${requestUrl} ${requestMethod} ${JSON.stringify(
        requestBody,
      )}`,
    );

    return next.handle().pipe(
      tap((context: any) => {
        Logger.log(
          `Response(${requestIp}): ${requestUrl} ${responseStatusCode} ${JSON.stringify(
            context,
          )}`,
        );
      }),
    );
  }
}
