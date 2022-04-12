import request from 'axios';
import {toast} from 'react-toastify';
import {ErrorType} from '../types/error';
import {HttpCode} from '../const';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HttpCode.BadRequest:
        toast.info(response.data.error, {position: 'bottom-left'});
        break;
      case HttpCode.Unauthorized:
        toast.info(response.data.error, {position: 'bottom-left'});
        break;
      case HttpCode.NotFound:
        toast.info(response.data.error, {position: 'bottom-left'});
        break;
    }
  }
};
