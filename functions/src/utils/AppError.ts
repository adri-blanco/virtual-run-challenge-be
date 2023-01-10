export type AppErrorType = {
  status: 400 | 401 | 403 | 500;
  message: string;
  extra: object;
};

function AppError(message: string, status = 400, extra = {}) {
  return {
    status,
    message,
    extra,
  };
}

export default AppError;
