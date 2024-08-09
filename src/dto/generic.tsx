export interface GenericResponseDto<T> {
  code: number;
  message: string;
  transaction_id: string;
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
    public transaction_id: string,
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

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
