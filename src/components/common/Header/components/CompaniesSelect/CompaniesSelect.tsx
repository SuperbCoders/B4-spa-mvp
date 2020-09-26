import * as React from 'react';
import { Dropdown } from 'rsuite';
import { SvgIcon } from '../../../SvgIcon';

import { ReactComponent as CaretDown } from '../../../../../assets/images/svg/caret-down.svg';

import { currentCompanyStorage } from '../../../../../stores';
import { TCompanyLandingInfo } from '../../../../../transport';

function renderTitle(children: React.ReactNode): React.ReactNode {
  return (
    <div className="header-dropdown-toggle">
      <div className="header-dropdown-label">{children}</div>
      <SvgIcon className="header-dropdown-icon">
        <CaretDown width="12" height="7" />
      </SvgIcon>
    </div>
  );
}

export function CompaniesSelect(): JSX.Element | null {
  const [
    currentCompany,
    setCurrentCompany
  ] = React.useState<TCompanyLandingInfo | null>(null);
  const [companies, setCompanies] = React.useState<TCompanyLandingInfo[]>([]);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect((): VoidFunction => {
    const sub1 = currentCompanyStorage.currentCompany$.subscribe(
      setCurrentCompany
    );
    const sub2 = currentCompanyStorage.allCompanies$.subscribe(setCompanies);

    return (): void => {
      sub1.unsubscribe();
      sub2.unsubscribe();
    };
  }, []);

  const handleSelect = (companyInn: TCompanyLandingInfo['inn']): void => {
    currentCompanyStorage.setCurrentCompany(companyInn);
  };

  return companies.length ? (
    <div className="page-header__company" ref={ref}>
      <Dropdown
        placement="bottomEnd"
        className="header-dropdown"
        onSelect={handleSelect}
        trigger="click"
        title={currentCompany?.companyShortName}
        renderTitle={renderTitle}
      >
        {companies.map(
          (company: TCompanyLandingInfo): JSX.Element => (
            <Dropdown.Item eventKey={company.inn} key={company.inn}>
              {company.companyShortName}
            </Dropdown.Item>
          )
        )}
      </Dropdown>
    </div>
  ) : null;
}
