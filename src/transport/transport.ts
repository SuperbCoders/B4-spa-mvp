import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AuthStore } from '../stores/auth.store';
import { TCompanyInn, TCompanyLandingInfo, TCompanyAccount } from './models';

const target = 'http://35.228.15.198';
class B4Transport {
  private static ENDPOINT: string = '/api/v1';

  public getCompanyLandingInfoByINN(
    inn: TCompanyInn
  ): Promise<TCompanyLandingInfo> {
    return this.get(`${target}${B4Transport.ENDPOINT}/companies/${inn}`);
  }

  public getCompanyAccounts(): Promise<TCompanyAccount> {
    return this.get(`${target}${B4Transport.ENDPOINT}/company_props`);
  }

  public setCompanyAccount(
    newAccount: Partial<TCompanyAccount>
  ): Promise<TCompanyAccount> {
    return this.post(
      `${target}${B4Transport.ENDPOINT}/company_props`,
      newAccount
    );
  }

  private get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    const defaultConfig = this.getDefaultConfig();

    return axios
      .get(url, { ...defaultConfig, ...config })
      .then(({ data }: AxiosResponse<T>): T => data);
  }

  private post<T, M>(
    url: string,
    userData: T,
    config: AxiosRequestConfig = {}
  ): Promise<M> {
    const defaultConfig = this.getDefaultConfig();

    return axios
      .post(url, userData, { ...defaultConfig, ...config })
      .then(({ data }: AxiosResponse<M>): M => data);
  }

  private getDefaultConfig(): AxiosRequestConfig {
    const defaultConfig: AxiosRequestConfig = {};
    const token = AuthStore.getUserJWTToken();

    if (token) {
      defaultConfig.headers = { Authorization: `JWT ${token}` };
    }

    return defaultConfig;
  }
}

export const b4Transport = new B4Transport();
