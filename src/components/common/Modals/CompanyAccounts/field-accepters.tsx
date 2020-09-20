import * as React from 'react';
import { FormControlProps } from 'rsuite';

import MaskedInput from 'react-input-mask';

function useHandleChange(
  onChange: FormControlProps['onChange']
): (event: React.SyntheticEvent<HTMLInputElement>) => void {
  const handleChange = React.useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>): void =>
      onChange && onChange(event.currentTarget.value, event),
    []
  );

  return handleChange;
}

export function BicAccepter({
  onChange,
  ...props
}: FormControlProps): JSX.Element {
  const handleChange = useHandleChange(onChange);

  return (
    <MaskedInput
      mask="999999999"
      className="rs-input big-input"
      maskChar={null}
      style={{ width: '420px' }}
      onChange={handleChange}
      {...props}
    />
  );
}

export function AccountNumberAccepter({
  onChange,
  ...props
}: FormControlProps): JSX.Element {
  const handleChange = useHandleChange(onChange);

  return (
    <MaskedInput
      mask="9999999999999999"
      className="rs-input big-input"
      maskChar={null}
      style={{ width: '420px' }}
      onChange={handleChange}
      {...props}
    />
  );
}
