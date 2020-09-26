import * as React from 'react';
import { Whisper, Tooltip, IconButton } from 'rsuite';
import { ModalsOpenerService } from '../../modals-opener.service';
import { ReactComponent as Plus } from '../../../../../assets/images/svg/plus.svg';

import './style.scss';

export function WarriantyClaimFormOpenButton(): JSX.Element {
  return (
    <Whisper
      placement="topEnd"
      trigger="hover"
      speaker={<Tooltip className="mvp-tooltip">Заявка на гарантию</Tooltip>}
    >
      <IconButton
        onClick={ModalsOpenerService.openWarrantyModal}
        className="guarantee-add-button"
        skin="primary"
        circle
        icon={<Plus width="24" height="24" />}
      />
    </Whisper>
  );
}
