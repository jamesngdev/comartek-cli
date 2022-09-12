import { %input%, %output% } from '@/graphql/generated/graphql';
import { AppError } from '@commons/types';

export const %UPPER_SNAKE% = '%UPPER_SNAKE%';
export const %UPPER_SNAKE%_SUCCESS = '%UPPER_SNAKE%_SUCCESS';
export const %UPPER_SNAKE%_ERROR = '%UPPER_SNAKE%_ERROR';

export interface %NAME_PASCALCASE%Action {
  type: typeof %UPPER_SNAKE%;
  payload: %input%;
}

export interface %NAME_PASCALCASE%SuccessAction {
  type: typeof %UPPER_SNAKE%_SUCCESS;
  payload: %output%;
}

export interface %NAME_PASCALCASE%ErrorAction {
  type: typeof %UPPER_SNAKE%_ERROR;
  payload: AppError;
}

export type %NAME_PASCALCASE%ActionType =
  | %NAME_PASCALCASE%Action
  | %NAME_PASCALCASE%SuccessAction
  | %NAME_PASCALCASE%ErrorAction;
