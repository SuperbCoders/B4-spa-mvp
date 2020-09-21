import * as React from 'react';
import { fileUploadService } from '../Dropzone';
import {
  TProcessUploadFile,
  TProcessUploadFiles
} from '../file-upload.service';
import { FileListItem } from './FileListItem';
import './style.scss';

export const FileList = React.memo(
  (): JSX.Element => {
    const [processingFiles, setProcessingFiles] = React.useState<
      TProcessUploadFiles
    >({});
    React.useEffect(
      (): VoidFunction => {
        const sub = fileUploadService.processUploadingFiles$.subscribe(
          setProcessingFiles
        );

        return (): void => sub.unsubscribe();
      }
    );

    return (
      <div className="company-file-list">
        {Object.values(processingFiles).map(
          (processingFile: TProcessUploadFile): JSX.Element => (
            <FileListItem
              onDeleteFile={fileUploadService.deleteFile}
              info={processingFile}
              key={processingFile.fileName}
            />
          )
        )}
      </div>
    );
  }
);
