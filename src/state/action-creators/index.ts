import {ActionType} from '../action-types';
import {
  Action,
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellBeforeAction,
} from '../actions';
import {CellTypes} from '../cell';
import {Direction} from '../actions';

export const updateCell = (id: string, data: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id: id,
      data: data,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id: id,
      direction: direction,
    },
  };
};

export const insertCellBefore = (
  id: string,
  cellType: CellTypes,
): InsertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id: id,
      type: cellType,
    },
  };
};
