import * as React from 'react';
import { Dropdown } from 'rsuite';
import { SvgIcon } from '../../../SvgIcon';

import { ReactComponent as CaretDown } from '../../../../../assets/images/svg/caret-down.svg';

import { useOnClickOutside } from './useOnClickOutside';
import { currentCompanyStorage } from '../../../../../stores';
import { TCompanyLandingInfo } from '../../../../../transport';

function renderTitle(
  toggle: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  companyName: string
): () => JSX.Element {
  return (): JSX.Element => (
    <div className="header-dropdown-toggle" onClick={toggle}>
      <div className="header-dropdown-label">{companyName}</div>
      <SvgIcon className="header-dropdown-icon">
        <CaretDown width="12" height="7" />
      </SvgIcon>
    </div>
  );
}

export function CompaniesSelect(): JSX.Element | null {
  const [isDropdownOpen, setDropdownState] = React.useState(false);
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

  const toggle = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): boolean => {
    setDropdownState(!isDropdownOpen);

    event.stopPropagation();
    return false;
  };

  const closeDropdown = (): void => {
    setDropdownState(false);
  };

  const handleSelect = (companyInn: TCompanyLandingInfo['inn']): void => {
    currentCompanyStorage.setCurrentCompany(companyInn);
  };

  useOnClickOutside(ref, (): void => closeDropdown());

  return companies.length ? (
    <div className="header-company" ref={ref}>
      <Dropdown
        placement="bottomEnd"
        className="header-dropdown"
        open={isDropdownOpen}
        onSelect={handleSelect}
        renderTitle={renderTitle(
          toggle,
          currentCompany?.companyShortName || ''
        )}
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
