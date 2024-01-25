import dayjs from 'dayjs/esm';

import { IEmployee, NewEmployee } from './employee.model';

export const sampleWithRequiredData: IEmployee = {
  id: 14863,
};

export const sampleWithPartialData: IEmployee = {
  id: 22409,
  from: dayjs('2024-01-24'),
};

export const sampleWithFullData: IEmployee = {
  id: 9384,
  nr: 31725,
  lastName: 'Rohan',
  firstName: 'Shany',
  from: dayjs('2024-01-25'),
};

export const sampleWithNewData: NewEmployee = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
