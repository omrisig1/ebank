/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
import { expect } from "chai";
import V from "../../src/validations/validator";
import sinon from "sinon";

describe('The validations module - functions by field', () => {
  before(() => {
    sinon.restore();
  });

  afterEach(() => {
    sinon.restore();
  });

  // individualIdValidation function
  context(`#individualIdValidation - On Success`, () => {
    it(`should exist as function`, () => {
      expect(V.individualIdValidation).to.be.a('function');
      expect(V.individualIdValidation).to.be.instanceOf(Function);
    });
    it(`account with id 1000001 is valid`, async () => {
      sinon.stub(V, 'IndividualIDUnique').resolves(true);
      await V.individualIdValidation('1000001');
      expect(V.individualIdValidation).to.not.throw();
    });
  });
  context(`#individualIdValidation - On failure`, () => {
    it(`account with id abc isn't valid - should throw error`, async () => {
      try {
        await V.individualIdValidation('abc');
      } catch (err) {
        expect((err as any).message).to.equal('Field individual_id value is not numeric');
      }
    });
  });

  // balanceValidation function
  context(`#balanceValidation - On Success`, () => {
    it(`should exist as function`, () => {
      expect(V.balanceValidation).to.be.a('function');
      expect(V.balanceValidation).to.be.instanceOf(Function);
    });
    it(`balance 1000 is valid`, () => {
      expect(() => V.balanceValidation(1000, '0')).to.not.throw();
    });
  });
  context(`#balanceValidation - On failure`, () => {
    it(`balance -5 isn't valid - should throw error`, () => {
      try {
        V.balanceValidation(-5, '0');
      } catch (err) {
        expect((err as any).message).to.equal('balance should be greater than 0.');
      }
    });
  });

  // amountValidation function
  context(`#amountValidation - On Success`, () => {
    it(`should exist as function`, () => {
      expect(V.amountValidation).to.be.a('function');
      expect(V.amountValidation).to.be.instanceOf(Function);
    });
    it(`amount 1000 is valid`, () => {
      expect(() => V.amountValidation('1000')).to.not.throw();
    });
  });
  context(`#amountValidation - On failure`, () => {
    it(`amount -5 isn't valid - should throw error`, () => {
      try {
        V.amountValidation(-5);
      } catch (err) {
        expect((err as any).message).to.equal('amount should be positive.');
      }
    });
    it(`amount abc isn't valid - should throw error`, () => {
      try {
        V.amountValidation('abc');
      } catch (err) {
        expect((err as any).message).to.equal('Field amount value is not numeric');
      }
    });
  });

  // companyIdValidation function
  context(`#companyIdValidation - On Success`, () => {
    it(`should exist as function`, () => {
      expect(V.companyIdValidation).to.be.a('function');
      expect(V.companyIdValidation).to.be.instanceOf(Function);
    });
    it(`company id 12345678 is valid`, () => {
      expect(() => V.companyIdValidation('12345622')).to.not.throw();
    });
  });
  context(`#companyIdValidation - On failure`, () => {
    it(`company id 1234567 isn't valid - should throw error`, () => {
      try {
        V.companyIdValidation('1234567');
      } catch (err) {
        expect((err as any).message).to.equal('Field company_id = 1234567, should be greater than 10000000.');
      }
    });
    it(`company id 123456789 isn't valid - should throw error`, () => {
      try {
        V.companyIdValidation('123456789');
      } catch (err) {
        expect((err as any).message).to.equal('company_id length should be equal to 8 digits.');
      }
    });
    it(`company id abc isn't valid - should throw error`, () => {
    try {
        V.companyIdValidation('abc');
    } catch (err) {
        expect((err as any).message).to.equal('Field company_id value is not numeric');
    }
    });
  });
});
