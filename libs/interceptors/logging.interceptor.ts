import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const type = context.getType();
    console.log(type);

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
      const [req, res] = context.getArgs();
      Logger.log(
        `Request: ${JSON.stringify(res.args[1])} ${JSON.stringify(req)}`,
      );

      return next.handle().pipe(
        tap((context: any) => {
          Logger.log(`Response: ${JSON.stringify(context)}`);
        }),
      );
    } else if (context.getType<GqlContextType>() == 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);

      Logger.log(
        `Request: ${JSON.stringify(gqlContext.getContext().req.body)}`,
      );

      return next.handle().pipe(
        tap((context: any) => {
          Logger.log(`Response: ${JSON.stringify(context)}`);
        }),
      );
    }
  }
}
