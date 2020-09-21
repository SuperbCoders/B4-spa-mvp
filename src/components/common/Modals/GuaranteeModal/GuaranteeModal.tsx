import * as React from 'react';

import {
  Modal,
  Form,
  FormGroup,
  ControlLabel,
  Input,
  SelectPicker,
  DatePicker
} from 'rsuite';
import { TGuaranteeRequest } from '../../../../transport';

import { Button } from '../../Button';
import { guaranteeService } from './guarantee.service';
import { calculateDays, guaranteeTypesItems, lawSelectItems } from './utils';

type TGuaranteeModalProps = {
  toggle: VoidFunction;
  show: boolean;
};

type TGuaranteeModalState = Omit<
  TGuaranteeRequest,
  'startDate' | 'endDate' | 'purchaseDate'
> & {
  startDate: Date | null;
  endDate: Date | null;
  purchaseDate: Date | null;
};

export function GuaranteeModal({
  show,
  toggle
}: TGuaranteeModalProps): JSX.Element {
  const [data, setData] = React.useState<TGuaranteeModalState>({
    purchaseNumber: '',
    bgType: '',
    law: '',
    purchaseDate: null,
    startDate: null,
    endDate: null
  });

  function setFieldUpdater(
    field: keyof TGuaranteeRequest
  ): (value: string | Date) => void {
    return (value: string | Date): void =>
      setData({
        ...data,
        [field]: value
      });
  }

  function setDateUpdater(
    field: keyof TGuaranteeRequest
  ): (value: Date) => void {
    return (value: Date): void => {
      ((field === 'startDate' &&
        ((data.endDate && value < data.endDate) || !data.endDate)) ||
        (field === 'endDate' &&
          ((data.startDate && value > data.startDate) || !data.startDate)) ||
        field === 'purchaseDate') &&
        setData({ ...data, [field]: value });
    };
  }

  function handleSubmit(): void {
    if (Object.values(data).every(Boolean)) {
      const tender = {
        ...data,
        startDate: data.startDate?.toISOString(),
        endDate: data.endDate?.toISOString(),
        purchaseDate: data.purchaseDate?.toISOString()
      };
      // @ts-ignore не раздупляет ts проверку выше
      guaranteeService.sendGuarantee(tender).then((): void => toggle());
    }
  }

  const daysCounter =
    (data.startDate &&
      data.endDate &&
      calculateDays(data.startDate, data.endDate)) ||
    0;

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
              onSelect={setFieldUpdater('bgType')}
              data={guaranteeTypesItems}
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
                <DatePicker
                  type="text"
                  placeholder="дд/мм/гггг"
                  format="DD-MM-YYYY"
                  value={data.startDate || void 0}
                  onOk={setDateUpdater('startDate')}
                />
              </FormGroup>
            </div>
            <div className="form-column">
              <FormGroup>
                <ControlLabel className="form-label">
                  Дата окончания гарантии
                </ControlLabel>
                <DatePicker
                  placeholder="дд/мм/гггг"
                  format="DD-MM-YYYY"
                  onOk={setDateUpdater('endDate')}
                  value={data.endDate || void 0}
                />
              </FormGroup>
            </div>
            <div className="form-column bank-guarantee-form">
              <ControlLabel className="form-label">Итого дней:</ControlLabel>
              <div className="bank-guarantee-form-total-days">
                {daysCounter}
              </div>
            </div>
          </div>

          <div className="form-columns">
            <div className="form-column">
              <FormGroup>
                <ControlLabel className="form-label">
                  Реестровый № торгов
                </ControlLabel>
                <Input
                  type="text"
                  placeholder="2343523532"
                  onChange={setFieldUpdater('purchaseNumber')}
                />
              </FormGroup>
            </div>
            <div className="form-column">
              <FormGroup>
                <ControlLabel className="form-label">Закон</ControlLabel>
                <SelectPicker
                  className="form-select"
                  cleanable={false}
                  searchable={false}
                  data={lawSelectItems}
                  onSelect={setFieldUpdater('law')}
                />
              </FormGroup>
            </div>
            <div className="form-column">
              <FormGroup>
                <ControlLabel className="form-label">
                  Дата тендера(аукциона)
                </ControlLabel>
                <DatePicker
                  placeholder="дд/мм/гггг"
                  format="DD-MM-YYYY"
                  onOk={setDateUpdater('purchaseDate')}
                />
              </FormGroup>
            </div>
          </div>
          <FormGroup>
            <Button
              className="bank-guarantee-form-submit"
              skin="inverse"
              onClick={handleSubmit}
            >
              Отправить заявку
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
