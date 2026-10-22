const months = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};
const weekDays = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};
const occurrences = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5,
};

/**
 * Gets the weekday number of the first day of a month.
 *
 * @param {number} year - The year of the month.
 * @param {number} month - The month number, where January is 0.
 * @returns {number} The weekday number, where Sunday is 0 and Saturday is 6.
 */
export function getFirstDayOfTheMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
/**
 * Gets the weekday number of the last day of a month.
 *
 * @param {number} year - The year of the month.
 * @param {number} month - The month number, where January is 0.
 * @returns {number} The weekday number, where Sunday is 0 and Saturday is 6.
 */
export function getLastDayOfTheMonth(year, month) {
  return new Date(year, month + 1, 0).getDay();
}
/**
 * Gets the number of days in a month.
 *
 * @param {number} year - The year of the month.
 * @param {number} month - The month number, where January is 0.
 * @returns {number} The number of days in the month.
 */
export function getNumberOfDaysInTheMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Calculates the date of a commemorative day for a given year.
 *
 * The commemorative day is determined by its month, weekday,
 * and occurrence within the month. The function also handles
 * commemorative days that occur on the last specified weekday.
 *
 * @param {object} dateObj - The commemorative day data.
 * @param {number} year - The year to calculate the date for.
 * @returns {Date} The calculated commemorative date.
 */
export function calculateCommemorativeDate(dateObj, year) {
  const commemorativeDate = {
    monthName: months[dateObj.monthName],
    dayName: weekDays[dateObj.dayName],
    occurrence: occurrences[dateObj.occurrence],
  };

  const numberOfDays = getNumberOfDaysInTheMonth(
    year,
    commemorativeDate.monthName,
  );
// Handle "last" occurrence by starting from the last day of the month
  // and moving backwards until the correct weekday is found.
  if (dateObj.occurrence === "last") {
    const date = new Date(year, commemorativeDate.monthName + 1, 0);

    while (date.getDay() !== commemorativeDate.dayName) {
      date.setDate(date.getDate() - 1);
    }

    return date;
  }
  const date = new Date(year, commemorativeDate.monthName, 1);

  let occurrence = 0;

  for (let i = 0; i < numberOfDays; i++) {
    const dateDay = date.getDay();

    if (dateDay === commemorativeDate.dayName) {
      occurrence++;
      if (occurrence === commemorativeDate.occurrence) {
        return date;
      }
    }
    date.setDate(date.getDate() + 1);
  }
}

/**
 * Formats a Date object as YYYYMMDD.
 *
 * This format is used for the dates in the iCalendar file.
 *
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date.
 */
export function formatDate(date) {
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
}

