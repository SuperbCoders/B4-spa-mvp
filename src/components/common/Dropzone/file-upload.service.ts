import { BehaviorSubject, Observable } from 'rxjs';
import { currentCompanyStorage } from '../../../stores';
import { b4Transport, TFileUploadResponse } from '../../../transport';

class FileUploadService {
  // @ts-ignore
  private _allFilesUploaded$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  public allFilesUploaded$: Observable<
    boolean
  > = this._allFilesUploaded$.asObservable();

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
        (serverData: TFileUploadResponse): Promise<unknown> => {
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

      Promise.all(dataPromises).then((): void =>
        this._allFilesUploaded$.next(true)
      );
    });
  }
}

export const fileUploadService = new FileUploadService();
