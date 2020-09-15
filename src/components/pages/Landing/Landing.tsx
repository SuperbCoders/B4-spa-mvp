import React from 'react';
import { PageLayout } from '../../common/PageLayout';

import { SvgIcon } from '../../common/SvgIcon';
import { Button } from '../../common/Button';

import { ReactComponent as CheckRound } from 'assets/images/svg/check-round.svg';
import { ReactComponent as Shield } from 'assets/images/svg/shield.svg';
import { ReactComponent as Bolt } from 'assets/images/svg/bolt.svg';
import { ReactComponent as Search } from 'assets/images/svg/search.svg';
import { ReactComponent as Smile } from 'assets/images/svg/smile.svg';

import './style.scss';

export function Landing(): JSX.Element {
  return (
    <PageLayout>
      <div className="landing">
        <section className="landing-comparsion">
          <header className="landing-comparsion-header">
            <h2 className="landing-comparsion-header-title">
              Кто ты в мире госзакупок?
            </h2>
            <p className="landing-comparsion-header-subtitle">
              АО «Уралтрансмаш»{' '}
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
                  <span className="landing-features-item-text">5 из 23</span>
                </div>
                <div className="landing-features-item">
                  <span className="landing-features-item-label">
                    Рост выручки на
                  </span>
                  <span className="landing-features-item-text">10%</span>
                </div>
                <div className="landing-features-item">
                  <span className="landing-features-item-label">
                    Получил гарантий на
                  </span>
                  <span className="landing-features-item-text">2 000 000₽</span>
                </div>
              </div>

              <div className="landing-comparsion-card-bottom landing-features">
                <div className="landing-features-item">
                  <span className="landing-features-item-label">I квартал</span>
                  <span className="landing-features-item-text">
                    24 654 928 ₽
                  </span>
                </div>
                <div className="landing-features-item">
                  <span className="landing-features-item-label">
                    II квартал
                  </span>
                  <span className="landing-features-item-text">
                    345 234 928 ₽
                  </span>
                </div>
                <div className="landing-features-item">
                  <span className="landing-features-item-label">
                    III квартал
                  </span>
                  <span className="landing-features-item-text">
                    782 677 988 ₽
                  </span>
                </div>
                <div className="landing-features-item">
                  <span className="landing-features-item-label">
                    IV квартал
                  </span>
                  <span className="landing-features-item-text">
                    963 758 928 ₽
                  </span>
                </div>
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
                  <span className="landing-features-item-text">30</span>
                </div>
                <div className="landing-features-item">
                  <span className="landing-features-item-label">
                    Упущенная выгода
                  </span>
                  <span className="landing-features-item-text">
                    23 000 000 ₽
                  </span>
                </div>
                <div className="landing-features-item">
                  <span className="landing-features-item-label">
                    Переплатил за гарантии
                  </span>
                  <span className="landing-features-item-text">20%</span>
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
                  Как конкурент ООО «Кранстрой»
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
                  <span className="landing-features-item-text">50%</span>
                </div>
                <div className="landing-features-item">
                  <span className="landing-features-item-label">
                    Побед в тендерах
                  </span>
                  <span className="landing-features-item-text">56 из 97</span>
                </div>
                <div className="landing-features-item">
                  <span className="landing-features-item-label">
                    Экономия на получении гарантий
                  </span>
                  <span className="landing-features-item-text">150 000 ₽</span>
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

            <Button appearance="primary" size="lg">
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
  );
}
