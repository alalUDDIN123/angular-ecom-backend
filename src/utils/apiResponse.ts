import type { Response } from "express";

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T | null;
  errors?: any;
  meta?: any;
}

export const sendResponse = <T>(
  res: Response,
  options: ApiResponse<T>
) => {
  const {
    success,
    statusCode,
    message,
    data = null,
    errors = null,
    meta = null
  } = options;

  return res.status(statusCode).json({
    success,
    statusCode,
    message,
    data,
    errors,
    meta
  });
};
