import * as React from 'react';
import { TCompanyRecommendsResponse } from '../../../../../transport';
import { Tender } from './Tender';
import { tendersService } from './tenders.service';

export const TendersList = React.memo(
  (): JSX.Element => {
    const [tenders, setTenders] = React.useState<TCompanyRecommendsResponse[]>(
      []
    );

    React.useEffect((): VoidFunction => {
      const sub = tendersService.tenders$.subscribe(setTenders);
      tendersService.getCompanyTenders();

      return (): void => sub.unsubscribe();
    }, []);

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
