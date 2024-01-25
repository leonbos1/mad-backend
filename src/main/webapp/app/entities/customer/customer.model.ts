import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';
import { IRental } from 'app/entities/rental/rental.model';
import { ILocation } from 'app/entities/location/location.model';

export interface ICustomer {
  id: number;
  nr?: number | null;
  lastName?: string | null;
  firstName?: string | null;
  from?: dayjs.Dayjs | null;
  systemUser?: Pick<IUser, 'id' | 'login'> | null;
  rentals?: IRental[] | null;
  location?: ILocation | null;
}

export type NewCustomer = Omit<ICustomer, 'id'> & { id: null };
