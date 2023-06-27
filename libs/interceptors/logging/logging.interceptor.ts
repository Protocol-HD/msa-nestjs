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
    const type = context.getType();

    if (type === 'http') {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest();
      const response = ctx.getResponse();

      const requestUrl = request.originalUrl;
      const requestMethod = request.method;
      const requestIp = request.socket.remoteAddress;
      const requestBody = request.body;
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
    } else if (type === 'rpc') {
      const [, res] = context.getArgs();
      Logger.log(`Request: ${JSON.stringify(res.args[1])}`);

      return next.handle().pipe(
        tap((context: any) => {
          Logger.log(`Response: ${JSON.stringify(context)}`);
        }),
      );
    }
  }
}
