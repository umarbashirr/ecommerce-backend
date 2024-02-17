export default class ApiResponse {
  public success: boolean;
  constructor(
    public statusCode: number,
    public message: string,
    public data: any = null
  ) {
    this.statusCode = statusCode;
    this.success = statusCode >= 200 && statusCode < 300;
    this.message = message;
    this.data = data;
  }
}
