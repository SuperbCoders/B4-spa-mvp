import * as React from 'react';
import { Tender } from './Tender';
import { tendersService } from './tenders.service';
import { useRxStream } from '../../../../../utils/hooks';

export const TendersList = React.memo(
  (): JSX.Element => {
    const tenders = useRxStream(tendersService.tenders$, []);

    return (
      <>
        {tenders.map(
          (tender): JSX.Element => (
            <Tender {...tender} key={tender.id} />
          )
        )}
      </>
    );
  }
);

TendersList.displayName = 'TendersList';
