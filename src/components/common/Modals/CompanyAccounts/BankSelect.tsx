import * as React from 'react';
import ReactDadataBox, { BankResponseType } from 'react-dadata-box';

export type TBankItem = { bik: string; bankName: string };

type TBankSelectProps = {
  onSelect: (value: TBankItem) => void;
};

const customStyle = { 'react-dadata__suggestions': { borderRadius: '15px' } };

export function BankSelect({ onSelect }: TBankSelectProps): JSX.Element {
  const handleSelect = React.useCallback(
    (value: BankResponseType): void =>
      onSelect({
        bik: value.data.bic || '',
        bankName: value.data.name?.payment || ''
      }),
    [onSelect]
  );

  return (
    <ReactDadataBox
      token="6df51bc0b039ab7994d1745c428d95c3e18088e0"
      query=""
      type="bank"
      placeholder="Введите название или БИК банка"
      customStyles={customStyle}
      // @ts-ignore - тут с типами херь какая-то, не могу понять
      onChange={handleSelect}
      // tslint:disable-next-line:jsx-no-lambda
      customInput={(props: unknown): JSX.Element => (
        <input {...props} className="rs-input big-input" />
      )}
    />
  );
}
