import {ActionType} from '../action-types';
import {CellTypes} from '../cell';

export type Direction = 'up' | 'down';

export interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    data: string;
  };
}

export type Action =
  | InsertCellBeforeAction
  | MoveCellAction
  | DeleteCellAction
  | UpdateCellAction;
