import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AuthStore } from '../stores/auth.store';
import {
  TCompanyInn,
  TCompanyLandingInfo,
  TCompanyAccount,
  TCompanyAccountRequest,
  TFileUploadResponse,
  TCompanyFileResponse,
  TUserCompaniesResponse,
  TCompanyRecommendsResponse,
  TGuaranteeRequest
} from './models';

const target = 'http://35.228.15.198';

class B4Transport {
  private static ENDPOINT: string = '/api/v1';

  public getCompanyLandingInfoByINN(
    inn: TCompanyInn
  ): Promise<TCompanyLandingInfo> {
    return this.get(`${target}${B4Transport.ENDPOINT}/companies/${inn}`);
  }

  public getCompanyAccounts(): Promise<TCompanyAccount[]> {
    return this.get(`${target}${B4Transport.ENDPOINT}/company_props`);
  }

  public setCompanyAccount(
    newAccount: TCompanyAccountRequest
  ): Promise<TCompanyAccount> {
    return this.post(
      `${target}${B4Transport.ENDPOINT}/company_props`,
      newAccount
    );
  }

  public editCompanyAccount(
    editedAccount: Partial<TCompanyAccount>
  ): Promise<TCompanyAccount> {
    return this.patch(
      `${target}${B4Transport.ENDPOINT}/company_props/${editedAccount.id}`,
      editedAccount
    );
  }

  public getCurrentUserCompanies(): Promise<TUserCompaniesResponse> {
    return this.get(`${target}${B4Transport.ENDPOINT}/user/me`);
  }

  public addCompany(inn: string): Promise<{ inn: TCompanyInn }> {
    return this.patch(`${target}${B4Transport.ENDPOINT}/user/add_company`, {
      inn
    });
  }

  public uploadFile(file: FormData): Promise<TFileUploadResponse> {
    return this.post(
      `${target}${B4Transport.ENDPOINT}/filestorage/api_files/`,
      file
    );
  }

  public getFilesList(): Promise<TCompanyFileResponse[]> {
    return this.get(`${target}${B4Transport.ENDPOINT}/company_files`);
  }

  public mapFileIdWithCompany(
    file: number,
    company: TCompanyInn
  ): Promise<TCompanyFileResponse> {
    return this.post(`${target}${B4Transport.ENDPOINT}/company_files`, {
      file,
      company
    });
  }

  public deleteFile(id: number): Promise<void> {
    return this.delete(
      `${target}${B4Transport.ENDPOINT}/filestorage/api_files/${id}`
    );
  }

  public getRecommends(): Promise<TCompanyRecommendsResponse[]> {
    return this.get(`${target}${B4Transport.ENDPOINT}/company_recommends`);
  }

  public sendGuarantee(guarantee: TGuaranteeRequest): Promise<void> {
    return this.post(`${target}${B4Transport.ENDPOINT}/warranties`, guarantee);
  }

  private get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    const defaultConfig = this.getDefaultConfig();

    return axios
      .get(url, { ...defaultConfig, ...config })
      .then(({ data }: AxiosResponse<T>): T => data);
  }

  private patch<T, M>(
    url: string,
    userData: T,
    config: AxiosRequestConfig = {}
  ): Promise<M> {
    const defaultConfig = this.getDefaultConfig();

    return axios
      .patch(url, userData, { ...defaultConfig, ...config })
      .then(({ data }: AxiosResponse<M>): M => data);
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

  private delete<T>(url: string): Promise<T> {
    return axios.delete(url);
  }

  // private put<T, M>(
  //   url: string,
  //   userData: T,
  //   config: AxiosRequestConfig = {}
  // ): Promise<M> {
  //   const defaultConfig = this.getDefaultConfig();

  //   return axios
  //     .put(url, userData, { ...defaultConfig, ...config })
  //     .then(({ data }: AxiosResponse<M>): M => data);
  // }

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
