export type HttpRequest<
TBody = any,
TParams = any,
THeaders = any,
TuserUid = any,
TFiles = any> =
{
  body?: TBody;
  params?: TParams;
  headers?: THeaders;
  userUid?: TuserUid;
  files?: TFiles;
};
