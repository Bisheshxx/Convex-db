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

export interface IUsers {
  email?: string;
  userType?: "student" | "teacher";
  classCode?: string;
}
export interface Tasks {
  _creationTime: number;
  _id: string;
  classCode: string;
  creatorEmail: string;
  creatorID: string;
  description: string;
  title: string;
}

export interface ClerkError {
  status: number;
  clerkError: boolean;
  errors: ClerkErrorType[];
}

export interface ClerkErrorType {
  code: string;
  message: string;
  longMessage: string;
  meta: Meta;
}

export interface Meta {
  paramName: string;
}
