import * as React from 'react';

import { modalWrapperService } from '../../../../services';
import { userCompanyDataSended } from '../../../../stores';
import { Button } from '../../Button';
import { Dropzone } from './Dropzone';
import { FileList } from './FilesList';

import './style.scss';

export function UploadCompanyDocumentsForm(): JSX.Element {
  const [isUploaded, setIsUploaded] = React.useState(false);

  React.useEffect((): VoidFunction => {
    const sub = userCompanyDataSended.documentsSended$.subscribe(setIsUploaded);

    return (): void => sub.unsubscribe();
  }, []);

  return (
    <div className="upload-documents-form-wrapper">
      <div className="upload-documents-form-title">
        {!isUploaded && `Приложить сканы документов`}
      </div>
      <div>
        {!isUploaded && (
          <div className="upload-documents-form-content">
            <div className="upload-documents-form-row">
              <div className="upload-documents-form-dropzone-col">
                <div className="mvp-dropzone">
                  <Dropzone />
                </div>
              </div>
              <div className="upload-documents-form-disclaimer-col">
                <div className="documents-disclaimer">
                  <h3 className="documents-disclaimer-title">
                    Список документов, которые необходимо приложить
                  </h3>

                  <ul className="documents-disclaimer-list">
                    <li className="documents-disclaimer-list-item">
                      Бухгалтерская отчетность (год)
                    </li>
                    <li className="documents-disclaimer-list-item">
                      Бухгалтерская отчетность (квартал)
                    </li>
                    <li className="documents-disclaimer-list-item">Устав</li>
                    <li className="documents-disclaimer-list-item">
                      Решение/Доверенность
                    </li>
                    <li className="documents-disclaimer-list-item">Паспорт</li>
                    <li className="documents-disclaimer-list-item">
                      Договор Аренды /право Cобстветнности
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <FileList />
          </div>
        )}
        {isUploaded && (
          <div className="info-modal-results">
            <p>
              Cпасибо! 
              <br />
              Мы обрабатываем документы
            </p>
            <Button
              skin="light"
              className="info-modal-results-button"
              onClick={modalWrapperService.closeModal}
            >
              Вернуться на главную
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
