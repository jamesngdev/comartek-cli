import { %output% } from '@/graphql/generated/graphql';
import {
  CREATE_PROMOTION,
  CREATE_PROMOTION_ERROR,
  CREATE_PROMOTION_SUCCESS,
  %NAME_PASCALCASE%ActionType,
} from '../action-types';

export interface %NAME_PASCALCASE%State {
  loading: boolean;
  data?: %output%;
}

const initState: %NAME_PASCALCASE%State = {
  loading: false,
};

// tslint:disable-next-line:typedef
export default function %NAME_PASCALCASE%Reducer(state = initState, actions: %NAME_PASCALCASE%ActionType) {
  switch (actions.type) {
    case CREATE_PROMOTION:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PROMOTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: actions.payload,
      };
    case CREATE_PROMOTION_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
