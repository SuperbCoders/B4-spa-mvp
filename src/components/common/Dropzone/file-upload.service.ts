import { BehaviorSubject, Observable } from 'rxjs';
import {
  currentCompanyStorage,
  firebaseStore,
  userCompanyDataSended
} from '../../../stores';
import {
  b4Transport,
  TCompanyFileResponse,
  TCompanyInn,
  TCompanyLandingInfo,
  TFileUploadResponse
} from '../../../transport';

class FileUploadService {
  private files: TCompanyFileResponse[] = [];
  private currentCompany: TCompanyInn | null = null;
  // @ts-ignore
  private _allFilesUploaded$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  public allFilesUploaded$: Observable<
    boolean
  > = this._allFilesUploaded$.asObservable();

  constructor() {
    this.getFilesList();
  }

  public getFilesList(): void {
    firebaseStore.isLoggedIn$.subscribe((isLoggedIn: boolean): void => {
      isLoggedIn &&
        b4Transport
          .getFilesList()
          .then((files: TCompanyFileResponse[]): void => {
            this.files = files;
            userCompanyDataSended.setDocumentsSended(files.length > 0);

            currentCompanyStorage.currentCompany$.subscribe(
              (currentCompany: TCompanyLandingInfo | null): void => {
                this.currentCompany = currentCompany?.inn || null;
                this.filterCompanyFiles();
              }
            );
          });
    });
  }

  public uploadFiles(files: File[]): void {
    const uploads = files.map(
      (file: File, index: number): Promise<TFileUploadResponse> => {
        const formData = new FormData();
        formData.append('file', file);
        return b4Transport.uploadFile(formData);
      }
    );

    Promise.all(uploads).then((serverDatas: TFileUploadResponse[]): void => {
      const dataPromises = serverDatas.map(
        (serverData: TFileUploadResponse): Promise<TCompanyFileResponse> => {
          const { currentCompany } = currentCompanyStorage;

          if (!currentCompany) {
            throw new Error(
              'InvalidProgrammState: Компания уже должна быть указана'
            );
          }

          return b4Transport.mapFileIdWithCompany(
            serverData.id,
            currentCompany.inn
          );
        }
      );

      Promise.all(dataPromises).then(
        (uploaded: TCompanyFileResponse[]): void => {
          this.files.push(...uploaded);
          this._allFilesUploaded$.next(true);
          userCompanyDataSended.setDocumentsSended(this.files.length > 0);
        }
      );
    });
  }

  private filterCompanyFiles(): void {
    const filtered = this.files.filter(
      (file: TCompanyFileResponse): boolean =>
        file.company === this.currentCompany
    );

    this._allFilesUploaded$.next(filtered.length > 0);
    userCompanyDataSended.setDocumentsSended(filtered.length > 0);
  }
}

export const fileUploadService = new FileUploadService();
