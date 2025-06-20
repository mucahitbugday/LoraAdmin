import { Request, Response, NextFunction } from 'express';
import envConfig from '../config/envConfig';
export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      ...(envConfig.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  // Log unexpected errors
  console.error('Unexpected error:', err);

  // Default error response
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    ...(envConfig.NODE_ENV === 'development' && {
      actualError: err.message,
      stack: err.stack
    }),
  });
};

export default errorHandler; 