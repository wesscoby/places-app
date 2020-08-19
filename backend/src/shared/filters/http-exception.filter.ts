import { 
  ExceptionFilter, Catch, 
  ArgumentsHost, HttpException 
} from '@nestjs/common';
import { Request, Response } from 'express';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    const name = exception.name;

    response
      .status(status)
      .json({
        statusCode: status,
        name,
        message,
        path: request.url,
        timestamp: new Date().toISOString()
      });
  }
}