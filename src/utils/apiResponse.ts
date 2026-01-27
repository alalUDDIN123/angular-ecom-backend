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
  return res.status(options.statusCode).json({
    success: options.success,
    statusCode: options.statusCode,
    message: options.message,
    data: options.data ?? null,
    errors: options.errors ?? null,
    meta: options.meta ?? null
  });
};
