import * as React from 'react';

import { Modal } from 'rsuite';
import { userCompanyDataSended } from '../../../stores';
import { Button } from '../Button';
import { Dropzone } from '../Dropzone';

type TUploadMpdalProps = {
  toggle: VoidFunction;
  show: boolean;
};

export function UploadModal({ show, toggle }: TUploadMpdalProps): JSX.Element {
  const [isUploaded, setIsUploaded] = React.useState(false);

  React.useEffect((): VoidFunction => {
    const sub = userCompanyDataSended.documentsSended$.subscribe(setIsUploaded);

    return (): void => sub.unsubscribe();
  }, []);

  return (
    <Modal
      dialogClassName="modal upload-modal"
      overflow={false}
      size="lg"
      show={show}
      onHide={toggle}
      backdrop={true}
    >
      <Modal.Header>{!isUploaded && `Приложить сканы документов`}</Modal.Header>
      <Modal.Body>
        {!isUploaded && (
          <div className="upload-modal-row">
            <div className="upload-modal-dropzone-col">
              <div className="mvp-dropzone">
                <Dropzone />
              </div>
            </div>
            <div className="upload-modal-disclaimer-col">
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
              onClick={toggle}
            >
              Вернуться на главную
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
