import {Dispatch} from 'redux';

import {ActionType} from '../action-types';
import {
  Action,
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  BundleStartAction,
  BundleCompleteAction,
} from '../actions';

import {Bundler} from '../../bundler';

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

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes,
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id: id,
      type: cellType,
    },
  };
};

export const createBundle = (cellId: string, inputCode: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await Bundler(inputCode);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId: cellId,
        bundle: {
          code: result.code,
          err: result.err,
        },
      },
    });
  };
};
