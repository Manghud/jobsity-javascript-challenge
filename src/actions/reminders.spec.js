import {
  addReminder
} from './reminders';
import { ADD_REMINDER } from './types/reminders';

describe('addReminder', () => {
  it('should be a function', () => {
    expect(addReminder).toEqual(expect.any(Function));
  });
  describe('if it receives data', () => {
    let data;
    beforeEach(() => {
      data = {
        city: 'asdfada',
        color: '#000000',
        date: new Date('Date Tue Feb 11 2020 22:22:56 GMT-0500 (Colombia Standard Time)'),
        description: 'Mock',
        frontendId: '13e04b09-9efb-4d15-80e3-61fa339afd25',
        time: '12:00'
      };
    });
    it('should return an ADD_REMINDER action', () => {
      const result = addReminder(data);
      expect(result).toEqual({
        type: ADD_REMINDER,
        payload: {
          data: expect.objectContaining(data),
          indices: expect.objectContaining({
            yearId: expect.anything(),
            monthId: expect.anything(),
            dayId: expect.anything(),
            hourId: expect.anything()
          })
        }
      });
    });
    it('should return null when description is null', () => {
      const result = addReminder({ ...data, description: null });
      expect(result).toEqual(null);
    });
    it('should return null when description is empty', () => {
      const result = addReminder({ ...data, description: '' });
      expect(result).toEqual(null);
    });
    it('should return null when description is undefined', () => {
      const result = addReminder({ ...data, description: null });
      expect(result).toEqual(null);
    });
    it('should return null when no description longer than 30 characters', () => {
      const result = addReminder({ ...data, description: 'sample description is longer than 30 characters for sure' });
      expect(result).toEqual(null);
    });
    it('should return null when date is undefined', () => {
      const result = addReminder({ ...data, date: undefined });
      expect(result).toEqual(null);
    });
    it('should return null when date is null', () => {
      const result = addReminder({ ...data, date: null });
      expect(result).toEqual(null);
    });
    it('should return null when date is empty', () => {
      const result = addReminder({ ...data, date: null });
      expect(result).toEqual(null);
    });
    it('should return null when date is not a valid javascript date', () => {
      const result = addReminder({ ...data, date: 'Dates Tue Feb 11 2020' });
      expect(result).toEqual(null);
    });
    it('should return null when time is undefined', () => {
      const result = addReminder({ ...data, time: undefined });
      expect(result).toEqual(null);
    });
    it('should return null when time is null', () => {
      const result = addReminder({ ...data, time: null });
      expect(result).toEqual(null);
    });
    it('should return null when time is not in the right format', () => {
      const result = addReminder({ ...data, time: '2:00' });
      expect(result).toEqual(null);
    });
    it('should return null when time has invalid hours', () => {
      const result = addReminder({ ...data, time: '24:00' });
      expect(result).toEqual(null);
    });
    it('should return null when time has invalid minutes', () => {
      const result = addReminder({ ...data, time: '23:60' });
      expect(result).toEqual(null);
    });
    it('should return null when city is undefined', () => {
      const result = addReminder({ ...data, city: undefined });
      expect(result).toEqual(null);
    });
    it('should return null when city is empty', () => {
      const result = addReminder({ ...data, city: '' });
      expect(result).toEqual(null);
    });
    it('should return null when city is null', () => {
      const result = addReminder({ ...data, city: null });
      expect(result).toEqual(null);
    });
  });
});