import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TCompanyInn, TCompanyLandingInfo } from './models';

class B4Transport {
  private static ENDPOINT: string = '/api/v1';

  public getCompanyLandingInfoByINN(
    inn: TCompanyInn
  ): Promise<TCompanyLandingInfo> {
    return this.get(`${B4Transport.ENDPOINT}/companies/${inn}`);
  }

  private get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return axios.get(url, config).then(({ data }: AxiosResponse<T>): T => data);
  }
}

export const b4Transport = new B4Transport();
