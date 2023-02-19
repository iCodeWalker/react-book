import produce from 'immer';

import {ActionType} from '../action-types';
import {Action} from '../actions';
import {Cell} from '../cell';

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellReducer = produce(
  (state: CellState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const {id, data} = action.payload;

        state.data[id].data = data;
        return state;

      case ActionType.MOVE_CELL:
        const {direction} = action.payload;

        const index = state.order.findIndex(id => id === action.payload.id);

        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return state;

      case ActionType.DELETE_CELL:
        delete state.data[action.payload]; // for deleting from data

        state.order = state.order.filter(id => id !== action.payload); // for deleting from array

        return state;
      case ActionType.INSERT_CELL_BEFORE:
        const newCell: Cell = {
          id: randomId(),
          type: action.payload.type,
          data: '',
        };

        state.data[newCell.id] = newCell;

        const currentIndex = state.order.findIndex(
          id => id === action.payload.id,
        );

        if (currentIndex < 0) {
          state.order.push(newCell.id);
        } else {
          state.order.splice(currentIndex, 0, newCell.id);
        }
        return state;

      default:
        return state;
    }
  },
);

const randomId = () => {
  return Math.random().toString(36);
};

// const cellReducer = (
//   state: CellState = initialState,
//   action: Action,
// ): CellState => {
//   switch (action.type) {
//     case ActionType.UPDATE_CELL:
//       const {id, data} = action.payload;

//       return {
//         ...state,
//         data: {
//           ...state.data,
//           [id]: {
//             ...state.data[id],
//             data: data,
//           },
//         },
//       };
//     case ActionType.INSERT_CELL_BEFORE:
//       return state;
//     case ActionType.MOVE_CELL:
//       return state;
//     case ActionType.DELETE_CELL:
//       return state;

//     default:
//       return state;
//   }
// };

export default cellReducer;
