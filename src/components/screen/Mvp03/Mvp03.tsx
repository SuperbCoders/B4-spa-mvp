import React, { useState } from 'react';

import { WithAuth } from '../../../WithAuth';

import { Tooltip, Whisper } from 'rsuite';

import PageLayout from 'components/common/PageLayout';
import Button from 'components/common/Button';
import IconButton from 'components/common/IconButton';
import { GuaranteeModal } from 'components/common/Modals';

import { Card, CardContent, CardFooter } from 'components/common/Card';

import { ReactComponent as Featured } from 'assets/images/svg/featured.svg';
import { ReactComponent as FeaturedOutline } from 'assets/images/svg/featured-outline.svg';
import { ReactComponent as Plus } from 'assets/images/svg/plus.svg';

import './style.scss';

export const MVP03 = WithAuth(
  (): JSX.Element => {
    const [modalOpen, processModalOpen] = useState(false);
    const modalToggle = () => processModalOpen(!modalOpen);

    return (
      <PageLayout>
        <div className="mvp-content">
          <section className="tenders-group">
            <aside className="tenders-group-date">
              <date>24 мая</date>
            </aside>
            <div className="tenders-group-cards">
              <Card className="tender">
                <CardContent className="tender-body">
                  <div className="tender-info">
                    <Button
                      size="sm"
                      appearance="primary"
                      className="tender-risk-rate"
                    >
                      Вероятность победы:
                      <span className="tender-risk-rate-percent">78%</span>
                      <span className="tender-risk-rate-cta">
                        <span role="img" aria-label="Огонь">
                          🔥
                        </span>
                        &nbsp;Давай!
                      </span>
                    </Button>
                    <div className="tender-title">
                      Закупка услуг по изготовлению и монтажу мебели в ЦПО.
                      Общество с ограниченной ответственностью “КТ Мобайл”
                    </div>
                    <div className="tender-company">
                      Общество с ограниченной ответственностью
                      “БрингМеталлСервис”
                    </div>
                  </div>
                  <div className="tender-price">492 343 734 ₽</div>
                </CardContent>
                <CardFooter className="tender-footer">
                  <div className="tender-meta">
                    <span className="tender-number">№ 345363634643</span>
                    <span className="tender-date">№ 345363634643</span>
                    <span className="tender-jurisdiction">ФЗ-223</span>
                  </div>
                  <IconButton
                    skin="orange"
                    appearance="ghost"
                    className="tender-favorites"
                    icon={<FeaturedOutline width="20" height="20" />}
                  />
                  <div className="tender-guarantee-status">
                    Гарантия одобрена
                    <span className="tender-guarantee-status-price">
                      5 000 ₽
                    </span>
                  </div>
                  <Button
                    skin="light"
                    appearance="ghost"
                    arrow
                    className="tender-proceed-btn"
                  >
                    Изучить тендер
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          <section className="tenders-group">
            <aside className="tenders-group-date">
              <date>24 мая</date>
            </aside>
            <div className="tenders-group-cards">
              <Card className="tender">
                <CardContent className="tender-body">
                  <div className="tender-info">
                    <Button
                      size="sm"
                      appearance="primary"
                      className="tender-risk-rate"
                    >
                      Вероятность победы:
                      <span className="tender-risk-rate-percent">78%</span>
                      <span className="tender-risk-rate-cta">
                        <span role="img" aria-label="Огонь">
                          🔥
                        </span>
                        &nbsp;Давай!
                      </span>
                    </Button>
                    <div className="tender-title">
                      Закупка услуг по изготовлению и монтажу мебели в ЦПО.
                      Общество с ограниченной ответственностью “КТ Мобайл”
                    </div>
                    <div className="tender-company">
                      Общество с ограниченной ответственностью
                      “БрингМеталлСервис”
                    </div>
                  </div>
                  <div className="tender-price">492 343 734 ₽</div>
                </CardContent>
                <CardFooter className="tender-footer">
                  <div className="tender-meta">
                    <span className="tender-number">№ 345363634643</span>
                    <span className="tender-date">№ 345363634643</span>
                    <span className="tender-jurisdiction">ФЗ-223</span>
                  </div>
                  <IconButton
                    skin="orange"
                    className="tender-favorites"
                    icon={<Featured width="20" height="20" />}
                  />
                  <div className="tender-guarantee-status">
                    Гарантия одобрена
                    <span className="tender-guarantee-status-price">
                      5 000 ₽
                    </span>
                  </div>
                  <Button
                    skin="light"
                    appearance="ghost"
                    arrow
                    className="tender-proceed-btn"
                  >
                    Изучить тендер
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          <section className="tenders-group">
            <aside className="tenders-group-date">
              <date>24 мая</date>
            </aside>
            <div className="tenders-group-cards">
              <Card className="tender">
                <CardContent className="tender-body">
                  <div className="tender-info">
                    <Button
                      size="sm"
                      appearance="primary"
                      className="tender-risk-rate"
                    >
                      Вероятность победы:
                      <span className="tender-risk-rate-percent">78%</span>
                      <span className="tender-risk-rate-cta">
                        <span role="img" aria-label="Огонь">
                          🔥
                        </span>
                        &nbsp;Давай!
                      </span>
                    </Button>
                    <div className="tender-title">
                      Закупка услуг по изготовлению и монтажу мебели в ЦПО.
                      Общество с ограниченной ответственностью “КТ Мобайл”
                    </div>
                    <div className="tender-company">
                      Общество с ограниченной ответственностью
                      “БрингМеталлСервис”
                    </div>
                  </div>
                  <div className="tender-price">492 343 734 ₽</div>
                </CardContent>
                <CardFooter className="tender-footer">
                  <div className="tender-meta">
                    <span className="tender-number">№ 345363634643</span>
                    <span className="tender-date">№ 345363634643</span>
                    <span className="tender-jurisdiction">ФЗ-223</span>
                  </div>
                  <IconButton
                    skin="orange"
                    appearance="ghost"
                    className="tender-favorites"
                    icon={<FeaturedOutline width="20" height="20" />}
                  />
                  <div className="tender-guarantee-status">
                    Гарантия одобрена
                    <span className="tender-guarantee-status-price">
                      5 000 ₽
                    </span>
                  </div>
                  <Button
                    skin="light"
                    appearance="ghost"
                    arrow
                    className="tender-proceed-btn"
                  >
                    Изучить тендер
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>
        </div>

        <GuaranteeModal show={modalOpen} toggle={modalToggle} />

        <Whisper
          placement="topEnd"
          trigger="hover"
          speaker={
            <Tooltip className="mvp-tooltip">Заявка на гарантию</Tooltip>
          }
        >
          <IconButton
            onClick={modalToggle}
            className="guarantee-add-button"
            skin="primary"
            circle
            icon={<Plus width="24" height="24" />}
          />
        </Whisper>
      </PageLayout>
    );
  }
);
