import { b4Transport, TCompanyInn } from '../transport';

class LandingCurrentCompanyStorage {
  private _companyInn: TCompanyInn | null = null;

  public get companyInn(): TCompanyInn | null {
    return this._companyInn;
  }

  public set companyInn(inn: TCompanyInn | null) {
    console.log(inn);
    this._companyInn = inn;
  }

  public addCompany(): void {
    this._companyInn && b4Transport.addCompany(this._companyInn);
  }
}

export const landingCurrentCompanyStorage = new LandingCurrentCompanyStorage();
