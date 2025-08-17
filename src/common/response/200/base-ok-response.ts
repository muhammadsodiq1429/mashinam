export class BaseOkResponse {
  constructor(
    public statusCode: number,
    public message: string,
    data: any,
    dataName: string
  ) {
    this[dataName] = data;
    this.message = message;
    this.statusCode = statusCode;
  }
}
