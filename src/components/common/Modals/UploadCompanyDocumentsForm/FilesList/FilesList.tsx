import * as React from 'react';
import { fileUploadService } from '../Dropzone';
import {
  TProcessUploadFile,
  TProcessUploadFiles
} from '../file-upload.service';
import { Button } from '../../../Button';
import { FileListItem } from './FileListItem';
import './style.scss';

export const FileList = React.memo(
  (): JSX.Element => {
    const [processingFiles, setProcessingFiles] = React.useState<
      TProcessUploadFiles
    >({});
    React.useEffect((): VoidFunction => {
      const sub = fileUploadService.processUploadingFiles$.subscribe(
        setProcessingFiles
      );

      return (): void => {
        fileUploadService.reset();
        sub.unsubscribe();
      };
    }, []);

    const values = Object.values(processingFiles);

    return (
      <>
        <div className="company-file-list">
          {values.map(
            (processingFile: TProcessUploadFile): JSX.Element => (
              <FileListItem
                onDeleteFile={fileUploadService.deleteFile}
                info={processingFile}
                key={processingFile.fileName}
              />
            )
          )}
        </div>

        {values.length > 0 && (
          <div className="company-file-list__button-wrapper">
            <Button
              onClick={fileUploadService.mapFilesToCompany}
              skin="light"
              className="info-modal-results-button"
            >
              Отправить
            </Button>
          </div>
        )}
      </>
    );
  }
);
