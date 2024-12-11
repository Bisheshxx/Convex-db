export interface IClerkError {
  status: number;
  clerkError: boolean;
  errors: IErrorClerk[];
}

export interface IErrorClerk {
  code: string;
  message: string;
  longMessage: string;
  meta: IMetaClerk;
}

export interface IMetaClerk {
  paramName: string;
}
