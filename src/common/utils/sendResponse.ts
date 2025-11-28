export const sendResponse = (data: any) => {
  const responseData: any = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null,
  };
  return responseData;
};
