import React, { useCallback } from 'react';
import classnames from 'classnames';
import { useDropzone } from 'react-dropzone';

import { SvgIcon } from '../SvgIcon';
import { Button } from '../Button';

import { ReactComponent as DocumentsAdd } from 'assets/images/svg/documents-add.svg';

import './style.scss';

type TDropZoneProps = {};

export function Dropzone(props: TDropZoneProps): JSX.Element {
  const onDrop = useCallback((acceptedFiles: Array<File>): void => {
    console.log('::: drop', acceptedFiles);
    // Do something with the files
  }, []);

  const {
    // acceptedFiles,
    getRootProps,
    getInputProps,

    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop });

  const classNames = classnames({
    dropzone: true,

    'is-error': !!isDragReject,
    'is-active': !!isDragActive,
    'is-accepted': !!isDragAccept
  });

  return (
    <div className={classNames} {...getRootProps()}>
      <div className="dropzone-area">
        <input {...getInputProps()} />
        <SvgIcon>
          <DocumentsAdd width="62" height="62" />
        </SvgIcon>
      </div>
      <Button className="dropzone-file-select-button" theme="inverse">
        Выбрать файл
      </Button>
      <p className="dropzone-disclaimer">Или добавьте файл сюда</p>
    </div>
  );
}
