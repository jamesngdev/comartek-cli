import { %NAME_PASCALCASE%Variables, Promotion } from '@/graphql/generated/graphql';
import { AppError } from '@commons/types';
import {
  %UPPER_SNAKE%,
  %UPPER_SNAKE%_ERROR,
  %UPPER_SNAKE%_SUCCESS,
  %NAME_PASCALCASE%ActionType,
} from '../action-types';

export const %NAME_CAMELCASE%Action = (payload: %NAME_PASCALCASE%Variables): %NAME_PASCALCASE%ActionType => ({
  type: %UPPER_SNAKE%,
  payload,
});

export const %NAME_CAMELCASE%SuccessAction = (payload: Promotion): %NAME_PASCALCASE%ActionType => ({
  type: %UPPER_SNAKE%_SUCCESS,
  payload,
});

export const %NAME_CAMELCASE%ErrorAction = (payload: AppError): %NAME_PASCALCASE%ActionType => ({
  type: %UPPER_SNAKE%_ERROR,
  payload,
});
