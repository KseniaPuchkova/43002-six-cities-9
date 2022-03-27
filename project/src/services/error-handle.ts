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
        toast.info(response.data.error);
        break;
      case HttpCode.Unauthorized:
        toast.info(response.data.error);
        break;
      case HttpCode.NotFound:
        toast.info(response.data.error);
        break;
    }
  }
};

export const getStatusCode = (error: ErrorType): number => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;
  if (response) {
    return response.status;
  }

  return -1;
};
