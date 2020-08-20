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
    const code = exception.getStatus();
    // const request = ctx.getRequest<Request>().url;

    const error = {
      code: exception.getStatus(),
      message: exception.message,
      path: ctx.getRequest<Request>().url,
      timestamp: new Date().toISOString()
    }

    response.status(code).json({ error });
  }
}