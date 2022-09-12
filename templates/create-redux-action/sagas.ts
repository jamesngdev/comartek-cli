import { %output% } from '@/graphql/generated/graphql';
import { %NAME_PASCALCASE% } from '../../services/api';
import { call, put } from '@redux-saga/core/effects';
import { %NAME_PASCALCASE%Action } from '../action-types';
import { %NAME_CAMELCASE%ErrorAction, %NAME_CAMELCASE%SuccessAction } from '../actions/create';

export default function* %NAME_CAMELCASE%Sagas(actions: %NAME_PASCALCASE%Action) {
  try {
    const data: %output% = yield call(%NAME_PASCALCASE%, actions.payload);
    yield put(%NAME_CAMELCASE%SuccessAction(data));
  } catch (error) {
    yield put(%NAME_CAMELCASE%ErrorAction(error));
  }
}
