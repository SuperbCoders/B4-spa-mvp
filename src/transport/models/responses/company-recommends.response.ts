export type TCompanyRecommendsResponse = {
  id: number;
  company: string;
  /**
   * Полное название конкурента
   */
  competitorFullName: string;
  /**
   * Сокращенное название конкурента
   */
  competitorShortName: string;
  /**
   * Рост выручки конкурента в процентах
   */
  competitorGrowthPercent: string;
  /**
   * Номер счета
   */
  accountNumber: string;
  /**
   * Сумма
   */
  total: string;
  /**
   * Дата публикации
   */
  publishedAt: string;
  /**
   * ФЗ
   */
  federalLaw: string;
  /**
   * Одобрена гарантия
   */
  warrantyApproved: boolean;
  /**
   * Сумма гарантии
   */
  warrantySum: number;
};
