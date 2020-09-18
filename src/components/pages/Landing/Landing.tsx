import * as React from 'react';
import { PageLayout } from '../../common/PageLayout';

import { SvgIcon } from '../../common/SvgIcon';
import { Button } from '../../common/Button';

import { ReactComponent as CheckRound } from './assets/check-round.svg';
import { ReactComponent as Shield } from './assets/shield.svg';
import { ReactComponent as Bolt } from './assets/bolt.svg';
import { ReactComponent as Search } from './assets/search.svg';
import { ReactComponent as Smile } from './assets/smile.svg';

import { LandingDataService } from './landing-data.service';

import './style.scss';
import { TCompanyInn, TCompanyLandingInfo } from '../../../transport';
import { RouteChildrenProps } from 'react-router-dom';
import {
  firebaseStore,
  landingCurrentCompanyStorage,
  ModalsStore
} from '../../../stores';

export const COMPANY_INN_ROUTE_KEY: string = 'company';

export function Landing({ match }: RouteChildrenProps): JSX.Element {
  const [info, setInfo] = React.useState<TCompanyLandingInfo | null>(null);
  const [isUserLoggedIn, setIsLoggedIn] = React.useState(false);
  const companyInn: TCompanyInn = (match as {
    params: { [key: string]: TCompanyInn };
  })?.params[COMPANY_INN_ROUTE_KEY];

  React.useEffect((): VoidFunction => {
    const dataService = new LandingDataService();
    const sub1 = dataService.data$.subscribe(setInfo);
    const sub2 = firebaseStore.isLoggedIn$.subscribe(setIsLoggedIn);
    dataService.getLandingDataByInn(companyInn);

    return (): void => {
      sub1.unsubscribe();
      sub2.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect((): void => {
    landingCurrentCompanyStorage.companyInn = isUserLoggedIn
      ? null
      : companyInn;
  }, [isUserLoggedIn, companyInn]);

  const onLoginButtonClick = (): void => {
    ModalsStore.instance.openLoginModal();
  };

  return info ? (
    <PageLayout>
      <div className="landing">
        <section className="landing-comparsion">
          <header className="landing-comparsion-header">
            <h2 className="landing-comparsion-header-title">
              Кто ты в мире госзакупок?
            </h2>
            <p className="landing-comparsion-header-subtitle">
              {info.companyShortName}
              <SvgIcon className="landing-comparsion-header-subtitle-icon">
                <CheckRound width="22" height="22" />
              </SvgIcon>
            </p>
          </header>

          <article className="landing-comparsion-section">
            <h3 className="landing-section-title">Неплохие цифры!</h3>

            <div className="landing-comparsion-card landing-comparsion-card-not-bad">
              <div className="landing-comparsion-card-top landing-features">
                <div className="landing-features-item">
                  <span className="landing-features-item-label">
                    Побед в торгах
                  </span>
                  <span className="landing-features-item-text">
                    {`${info.purchasesWins} из ${info.purchasesTotal}`}
                  </span>
                </div>
                <div className="landing-features-item">
                  <span className="landing-features-item-label">
                    Рост выручки на
                  </span>
                  <span className="landing-features-item-text">{`${info.revenueGrowthPerc}%`}</span>
                </div>
                <div className="landing-features-item">
                  <span className="landing-features-item-label">
                    Получил гарантий на
                  </span>
                  <span className="landing-features-item-text">
                    {`${Number(info.revenueGrowth)}₽`}
                  </span>
                </div>
              </div>

              <div className="landing-comparsion-card-bottom landing-features">
                {info.revenue2018 && (
                  <div className="landing-features-item">
                    <span className="landing-features-item-label">2018</span>
                    <span className="landing-features-item-text">
                      {`${Number(info.revenue2018)} ₽`}
                    </span>
                  </div>
                )}
                {info.revenue2019 && (
                  <div className="landing-features-item">
                    <span className="landing-features-item-label">2019</span>
                    <span className="landing-features-item-text">
                      {`${Number(info.revenue2019)} ₽`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </article>

          <article className="landing-comparsion-section">
            <h3 className="landing-section-title">Но...</h3>

            <div className="landing-comparsion-card landing-comparsion-card-but">
              <div className="landing-comparsion-card-top landing-features">
                <div className="landing-features-item">
                  <span className="landing-features-item-label">
                    Пропустил <br />
                    потенциально торгов
                  </span>
                  <span className="landing-features-item-text">
                    {info.purchasesLost}
                  </span>
                </div>
                <div className="landing-features-item">
                  <span className="landing-features-item-label">
                    Упущенная выгода
                  </span>
                  <span className="landing-features-item-text">
                    {`${Number(info.revenueLost)} ₽`}
                  </span>
                </div>
                <div className="landing-features-item">
                  <span className="landing-features-item-label">
                    Переплатил за гарантии
                  </span>
                  <span className="landing-features-item-text">{`${info.bgOverpaymentPerc}%`}</span>
                </div>
              </div>
            </div>
          </article>

          <article className="landing-comparsion-section">
            <h3 className="landing-section-title">
              А ведь можно гораздо лучше!
            </h3>

            <section className="landing-comparsion-card landing-comparsion-card-you-can-better">
              <header className="landing-comparsion-card-header">
                <h3 className="landing-comparsion-card-header-title">
                  {`Как конкурент ${info.competitor.companyShortName}`}
                </h3>
                <p className="landing-comparsion-card-header-subtitle">
                  ОКВЭД 72.20 Мордовская обл
                </p>
              </header>
              <div className="landing-comparsion-card-top landing-features">
                <div className="landing-features-item">
                  <span className="landing-features-item-label">
                    Рост за год
                  </span>
                  <span className="landing-features-item-text">{`${info.competitor.revenueGrowthPerc}%`}</span>
                </div>
                <div className="landing-features-item">
                  <span className="landing-features-item-label">
                    Побед в тендерах
                  </span>
                  <span className="landing-features-item-text">{`${info.competitor.purchasesWins} из ${info.competitor.purchasesTotal}`}</span>
                </div>
                <div className="landing-features-item">
                  <span className="landing-features-item-label">
                    Экономия на получении гарантий
                  </span>
                  <span className="landing-features-item-text">{`${info.competitor.bgSavingEconomy} ₽`}</span>
                </div>
              </div>
            </section>
          </article>
        </section>

        <section className="landing-cta">
          <h3 className="landing-section-title">
            B4 помогает зарабатывать <br /> на тендерах БОЛЬШЕ
          </h3>

          <div className="landing-cta-benefits">
            <div className="landing-cta-benefit dont-miss">
              <SvgIcon className="landing-cta-benefit-icon">
                <CheckRound width="66" height="66" />
              </SvgIcon>

              <p>Не упускай торги</p>
            </div>

            <div className="landing-cta-benefit guarantee">
              <SvgIcon className="landing-cta-benefit-icon">
                <CheckRound width="66" height="66" />
              </SvgIcon>

              <p>Бери гарантии по 2%</p>
            </div>
          </div>

          <div className="landing-cta-button">
            <p className="landing-cta-button-label">Чтобы начать</p>

            <Button appearance="primary" size="lg" onClick={onLoginButtonClick}>
              Cоздай досье своей компании
            </Button>
          </div>
        </section>

        <section className="landing-highlights">
          <h3 className="landing-section-title">
            Сервис B4 нужен каждому,
            <br />
            кто участвует в госзакупках
          </h3>

          <article className="landing-highlight">
            <SvgIcon rounded className="landing-highlight-icon">
              <Shield width="32" height="36" />
            </SvgIcon>

            <p className="landing-highlight-text">
              Банковские гарантии <br />
              напрямую от банков, дешевле, <br />
              чем через агентов
            </p>
          </article>

          <article className="landing-highlight">
            <SvgIcon rounded className="landing-highlight-icon">
              <Search width="26" height="26" />
            </SvgIcon>

            <p className="landing-highlight-text">
              Рекомендательная система подскажет тендеры, которые подходят
              именно твоей компании
            </p>
          </article>

          <article className="landing-highlight">
            <SvgIcon rounded className="landing-highlight-icon">
              <Bolt width="26" height="28" />
            </SvgIcon>

            <p className="landing-highlight-text">
              Все БЫСТРО И ПРОСТО: для каждого рекомендованного тендера уже
              предодобрена гарантия{' '}
            </p>
          </article>

          <article className="landing-highlight">
            <SvgIcon rounded className="landing-highlight-icon">
              <Smile width="33" height="33" />
            </SvgIcon>

            <p className="landing-highlight-text">
              Быстрая доставка негатива: <br />
              исполнительные производства, <br />
              снижение лимитов, тревога по БКИ
            </p>
          </article>
        </section>
      </div>
    </PageLayout>
  ) : (
    <>'kekek'</>
  );
}
