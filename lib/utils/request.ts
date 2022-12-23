import undici, { Dispatcher } from 'undici';

import { MessariError } from './errors/messari/messari.error';
import { QueryResult } from 'lib/typings';

import { getRequestErrorMessage } from '../constraints/errors';

export class Request {
  private request: typeof undici.request;

  constructor(private config: ConfigProps) {
    this.request = undici.request;
  }

  public async get<T>(endpoint: string): Promise<T | MessariError> {
    const res = await this.request(`${this.config.baseURL}/${endpoint}`, {
      method: 'GET',
      headers: this.config.headers
    }).then((val: Dispatcher.ResponseData) => val.body.json());

    if ((res as QueryResult).status.error_code) {
      const messariError = res as QueryResult;
      const errorMessage: string = getRequestErrorMessage(messariError.status.error_code);

      return new MessariError(
        errorMessage,
        messariError.status.error_code,
        messariError.status.timestamp
      );
    }

    return res as T;
  }
}

type ConfigProps = Pick<RequestConfig, 'headers'> & {
  baseURL: string
}

type RequestConfig = Omit<Dispatcher.RequestOptions,
  'origin' |
  'path' |
  'method'> & Partial<Pick<Dispatcher.RequestOptions, 'method'>> & {
    dispatcher?: Dispatcher
  }