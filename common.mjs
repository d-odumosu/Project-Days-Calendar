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

export function getFirstDayOfTheMonth(year, month) {
  // we will calculate how many empty cells comes before
  return new Date(year, month, 1).getDay();
}
export function getLastDayOfTheMonth(year, month) {
  // we will calculate how many empty cells come after
  return new Date(year, month + 1, 0).getDay();
}
export function getNumberOfDaysInTheMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function calculateCommemorativeDate(dateObj, year) {
  const commemorativeDate = {
    name: dateObj.name,
    monthName: months[dateObj.monthName],
    dayName: weekDays[dateObj.dayName],
    occurrence: occurrences[dateObj.occurrence],
  };

  const numberOfDays = getNumberOfDaysInTheMonth(
    year,
    commemorativeDate.monthName,
  );
  // handle 'last' occurrence
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
