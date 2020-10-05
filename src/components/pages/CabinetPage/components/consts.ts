import { combineLatest } from 'rxjs';
import {
  userCompanyDataSended,
  currentCompanyStorage
} from '../../../../stores';
import { throttleTime } from 'rxjs/operators';

const DEBOUNCE_TIME = 300;

export const processNotificationCardVisibilityStreams$ = combineLatest([
  userCompanyDataSended.companyAccountsSended$,
  userCompanyDataSended.documentsSended$,
  currentCompanyStorage.currentCompany$
]).pipe(throttleTime(DEBOUNCE_TIME));

export const uploadCompanyAccountsActionCardVisibilityStreams$ = combineLatest([
  currentCompanyStorage.currentCompany$,
  userCompanyDataSended.companyAccountsSended$
]).pipe(throttleTime(DEBOUNCE_TIME));

export const uploadDocumentsActionCardVisibilityStreams = combineLatest([
  currentCompanyStorage.currentCompany$,
  userCompanyDataSended.documentsSended$
]).pipe(throttleTime(DEBOUNCE_TIME));
