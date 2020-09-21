export function calculateDays(from: Date, to: Date): number {
  const diff = to.getTime() - from.getTime();

  // tslint:disable-next-line:no-magic-numbers
  return Math.floor(diff / (1000 * 3600 * 24));
}

export const lawSelectItems = [
  {
    value: 'ФЗ-44',
    label: 'ФЗ-44'
  },
  {
    value: 'ФЗ-223',
    label: 'ФЗ-223'
  }
];

export const guaranteeTypesItems = [
  {
    value: 'first',
    label: 'This is the first option'
  },
  {
    value: 'second',
    label: 'This is the second option'
  }
];
