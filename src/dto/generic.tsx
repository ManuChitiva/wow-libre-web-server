export interface GenericResponseDto<T> {
  code: number;
  message: string;
  transactionId: string;
  data: T;
}

export interface BadRequestDto {
  numberOfInvalid: number;
  valuesInvalid: string[];
}

export class ErrorResponseImpl implements BadRequestDto {
  constructor(public numberOfInvalid: number, public valuesInvalid: string[]) {}
}

export class GenericResponseImpl<T> implements GenericResponseDto<T> {
  constructor(
    public code: number,
    public message: string,
    public transactionId: string,
    public data: T
  ) {}
}

export class GenericClientError extends Error {
  public statusCode: number;
  public responseData: GenericResponseImpl<ErrorResponseImpl>;

  constructor(
    message: string,
    statusCode: number,
    responseData: GenericResponseImpl<ErrorResponseImpl>
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.responseData = responseData;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InternalServerError extends Error {
  public statusCode: number;
  public responseData: GenericResponseImpl<void>;

  constructor(
    message: string,
    statusCode: number,
    responseData: GenericResponseImpl<void>
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.responseData = responseData;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
