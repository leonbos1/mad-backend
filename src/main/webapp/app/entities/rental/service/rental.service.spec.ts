import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IRental } from '../rental.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../rental.test-samples';

import { RentalService, RestRental } from './rental.service';

const requireRestSample: RestRental = {
  ...sampleWithRequiredData,
  fromDate: sampleWithRequiredData.fromDate?.format(DATE_FORMAT),
  toDate: sampleWithRequiredData.toDate?.format(DATE_FORMAT),
};

describe('Rental Service', () => {
  let service: RentalService;
  let httpMock: HttpTestingController;
  let expectedResult: IRental | IRental[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RentalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Rental', () => {
      const rental = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(rental).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Rental', () => {
      const rental = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(rental).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Rental', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Rental', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Rental', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRentalToCollectionIfMissing', () => {
      it('should add a Rental to an empty array', () => {
        const rental: IRental = sampleWithRequiredData;
        expectedResult = service.addRentalToCollectionIfMissing([], rental);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(rental);
      });

      it('should not add a Rental to an array that contains it', () => {
        const rental: IRental = sampleWithRequiredData;
        const rentalCollection: IRental[] = [
          {
            ...rental,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRentalToCollectionIfMissing(rentalCollection, rental);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Rental to an array that doesn't contain it", () => {
        const rental: IRental = sampleWithRequiredData;
        const rentalCollection: IRental[] = [sampleWithPartialData];
        expectedResult = service.addRentalToCollectionIfMissing(rentalCollection, rental);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(rental);
      });

      it('should add only unique Rental to an array', () => {
        const rentalArray: IRental[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const rentalCollection: IRental[] = [sampleWithRequiredData];
        expectedResult = service.addRentalToCollectionIfMissing(rentalCollection, ...rentalArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const rental: IRental = sampleWithRequiredData;
        const rental2: IRental = sampleWithPartialData;
        expectedResult = service.addRentalToCollectionIfMissing([], rental, rental2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(rental);
        expect(expectedResult).toContain(rental2);
      });

      it('should accept null and undefined values', () => {
        const rental: IRental = sampleWithRequiredData;
        expectedResult = service.addRentalToCollectionIfMissing([], null, rental, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(rental);
      });

      it('should return initial array if no Rental is added', () => {
        const rentalCollection: IRental[] = [sampleWithRequiredData];
        expectedResult = service.addRentalToCollectionIfMissing(rentalCollection, undefined, null);
        expect(expectedResult).toEqual(rentalCollection);
      });
    });

    describe('compareRental', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRental(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareRental(entity1, entity2);
        const compareResult2 = service.compareRental(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareRental(entity1, entity2);
        const compareResult2 = service.compareRental(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareRental(entity1, entity2);
        const compareResult2 = service.compareRental(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
