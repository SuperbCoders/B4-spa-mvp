import * as React from 'react';
import { Whisper, Tooltip, IconButton } from 'rsuite';
import { ModalsOpenerService } from '../../modals-opener.service';
import { ReactComponent as Plus } from '../../../../../assets/images/svg/plus.svg';

import './style.scss';
import { currentCompanyStorage } from '../../../../../stores';
import { TCompanyLandingInfo } from '../../../../../transport';

export const WarriantyClaimFormOpenButton = React.memo(
  (): JSX.Element => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(
      (): VoidFunction => {
        const sub = currentCompanyStorage.currentCompany$.subscribe(
          (currentCompany: TCompanyLandingInfo | null): void => {
            setIsVisible(Boolean(currentCompany?.wasProcessed));
          }
        );

        return (): void => sub.unsubscribe();
      }
    );

    if (!isVisible) return <></>;

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
);

WarriantyClaimFormOpenButton.displayName = 'WarriantyClaimFormOpenButton';
