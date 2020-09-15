import * as React from 'react';

import {
  Modal,
  Form,
  FormGroup,
  ControlLabel,
  Input,
  SelectPicker
} from 'rsuite';
import { ItemDataType } from 'rsuite/lib/@types/common';

import { Button } from '../Button';

type TGuaranteeModalProps = {
  toggle: VoidFunction;
  show: boolean;
};

export function GuaranteeModal({
  show,
  toggle
}: TGuaranteeModalProps): JSX.Element {
  return (
    <Modal
      dialogClassName="modal guarantee-modal"
      overflow={false}
      show={show}
      onHide={toggle}
      size="lg"
      backdrop={true}
    >
      <Modal.Header>Заявка на гарантию</Modal.Header>
      <Modal.Body>
        <Form className="form bank-guarantee-form">
          <FormGroup className="form-group bank-guarantee-form-type">
            <ControlLabel className="form-label">
              Вид банковской гарантии
            </ControlLabel>
            <SelectPicker
              className="form-select"
              cleanable={false}
              searchable={false}
              data={((): ItemDataType[] => {
                return [
                  {
                    value: 'first',
                    label: 'This is the first option'
                  },
                  {
                    value: 'second',
                    label: 'This is the second option'
                  }
                ];
              })()}
            />
          </FormGroup>
          <p className="bank-guarantee-form-disclaimer">
            Данная гарантия на обеспечение гарантийных обязательств свыше срока
            действия контракта. Если Вам требуется гарантия на обеспечение
            гарантийных обязательств в пределах срока действия контракта,
            необходимо выбрать тип “Банковская гарантия на исполнение контракта”
            и затем указать наличие гарантийных обязательств.
          </p>

          <div className="form-columns">
            <div className="form-column">
              <FormGroup>
                <ControlLabel className="form-label">
                  Дата начала гарантии
                </ControlLabel>
                <Input type="text" placeholder="дд/мм/гггг" />
              </FormGroup>
            </div>
            <div className="form-column">
              <FormGroup>
                <ControlLabel className="form-label">
                  Дата окончания гарантии
                </ControlLabel>
                <Input type="text" placeholder="дд/мм/гггг" />
              </FormGroup>
            </div>
            <div className="form-column bank-guarantee-form">
              <ControlLabel className="form-label">Итого дней:</ControlLabel>
              <div className="bank-guarantee-form-total-days">17</div>
            </div>
          </div>

          <div className="form-columns">
            <div className="form-column">
              <FormGroup>
                <ControlLabel className="form-label">
                  Реестровый № торгов
                </ControlLabel>
                <Input type="text" placeholder="2343523532" />
              </FormGroup>
            </div>
            <div className="form-column">
              <FormGroup>
                <ControlLabel className="form-label">Закон</ControlLabel>
                <SelectPicker
                  className="form-select"
                  cleanable={false}
                  searchable={false}
                  data={((): ItemDataType[] => {
                    return [
                      {
                        value: 'first',
                        label: 'This is the first option'
                      },
                      {
                        value: 'second',
                        label: 'This is the second option'
                      }
                    ];
                  })()}
                />
              </FormGroup>
            </div>
            <div className="form-column">
              <FormGroup>
                <ControlLabel className="form-label">
                  Дата тендера(аукциона)
                </ControlLabel>
                <Input type="text" placeholder="дд/мм/гггг" />
              </FormGroup>
            </div>
          </div>
          <FormGroup>
            <Button className="bank-guarantee-form-submit" skin="inverse">
              Отправить заявку
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
