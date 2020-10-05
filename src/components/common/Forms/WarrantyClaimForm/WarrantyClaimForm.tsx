import * as React from 'react';

import {
  Form,
  FormGroup,
  ControlLabel,
  Input,
  SelectPicker,
  DatePicker
} from 'rsuite';
import { modalWrapperService } from '../../../../services';
import { TGuaranteeRequest } from '../../../../transport';

import { Button } from '../../Button';
import { guaranteeService } from './guarantee.service';
import { calculateDays, guaranteeTypesItems, lawSelectItems } from './utils';

import './style.scss';
import { FormWrapper, SuccessNotifier } from '../components';

type TGuaranteeModalState = Omit<
  TGuaranteeRequest,
  'startDate' | 'endDate' | 'purchaseDate'
> & {
  startDate: Date | null;
  endDate: Date | null;
  purchaseDate: Date | null;
};

export function WarrantyClaimForm(): JSX.Element {
  const [data, setData] = React.useState<TGuaranteeModalState>({
    purchaseNumber: '',
    bgType: '',
    law: '',
    email: '',
    purchaseDate: null,
    startDate: null,
    endDate: null
  });

  const [isSended, setIsSended] = React.useState(false);

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
      guaranteeService
        // @ts-ignore не раздупляет ts проверку выше
        .sendGuarantee(tender)
        .then((): void => setIsSended(true));
    }
  }

  const daysCounter =
    (data.startDate &&
      data.endDate &&
      calculateDays(data.startDate, data.endDate)) ||
    0;

  return (
    <FormWrapper title={!isSended ? 'Заявка на гарантию' : ''}>
      {!isSended && (
        <Form className="warranty-form">
          <FormGroup style={{ width: '420px', marginBottom: '30px' }}>
            <ControlLabel className="warranty-form-label">
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
          <p className="warranty-form-disclaimer">
            Данная гарантия на обеспечение гарантийных обязательств свыше срока
            действия контракта. Если Вам требуется гарантия на обеспечение
            гарантийных обязательств в пределах срока действия контракта,
            необходимо выбрать тип “Банковская гарантия на исполнение контракта”
            и затем указать наличие гарантийных обязательств.
          </p>

          <div className="warranty-form-columns">
            <div className="warranty-form-column">
              <FormGroup>
                <ControlLabel className="warranty-form-label">
                  Дата начала гарантии
                </ControlLabel>
                <DatePicker
                  type="text"
                  placeholder="дд/мм/гггг"
                  format="DD-MM-YYYY"
                  oneTap
                  value={data.startDate || void 0}
                  onSelect={setDateUpdater('startDate')}
                />
              </FormGroup>
            </div>
            <div className="warranty-form-column">
              <FormGroup>
                <ControlLabel className="warranty-form-label">
                  Дата окончания гарантии
                </ControlLabel>
                <DatePicker
                  placeholder="дд/мм/гггг"
                  format="DD-MM-YYYY"
                  oneTap
                  onSelect={setDateUpdater('endDate')}
                  value={data.endDate || void 0}
                />
              </FormGroup>
            </div>
            <div className="warranty-form-column">
              <ControlLabel className="warranty-form-label">
                Итого дней:
              </ControlLabel>
              <div className="warranty-form-total-days">{daysCounter}</div>
            </div>
          </div>

          <div className="warranty-form-columns">
            <div className="warranty-form-column">
              <FormGroup>
                <ControlLabel className="warranty-form-label">
                  Реестровый № торгов
                </ControlLabel>
                <Input
                  type="text"
                  placeholder="2343523532"
                  onChange={setFieldUpdater('purchaseNumber')}
                />
              </FormGroup>
            </div>
            <div className="warranty-form-column">
              <FormGroup>
                <ControlLabel className="warranty-form-label">
                  Закон
                </ControlLabel>
                <SelectPicker
                  className="warranty-form-select"
                  cleanable={false}
                  searchable={false}
                  data={lawSelectItems}
                  onSelect={setFieldUpdater('law')}
                />
              </FormGroup>
            </div>
            <div className="warranty-form-column">
              <FormGroup>
                <ControlLabel className="warranty-form-label">
                  Дата тендера(аукциона)
                </ControlLabel>
                <DatePicker
                  placeholder="дд/мм/гггг"
                  format="DD-MM-YYYY"
                  oneTap
                  onSelect={setDateUpdater('purchaseDate')}
                />
              </FormGroup>
            </div>
          </div>
          <FormGroup style={{ width: '420px', marginBottom: '30px' }}>
            <ControlLabel className="warranty-form-label">
              Электронная почта
            </ControlLabel>
            <Input
              type="text"
              placeholder="example@example.com"
              onChange={setFieldUpdater('email')}
            />
          </FormGroup>
          <FormGroup>
            <Button
              className="warranty-form-submit"
              skin="inverse"
              onClick={handleSubmit}
            >
              Отправить заявку
            </Button>
          </FormGroup>
        </Form>
      )}
      {isSended && (
        <SuccessNotifier
          onClick={modalWrapperService.closeModal}
          buttonText="Вернуться на главную"
          text={
            <>
              <p className="warranty-success-text">Cпасибо!</p>
              <p className="warranty-success-text">
                Мы обрабатываем вашу заявку
              </p>
            </>
          }
        />
      )}
    </FormWrapper>
  );
}
