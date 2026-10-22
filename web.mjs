import {
    calculateCommemorativeDate,
    getFirstDayOfTheMonth,
    getLastDayOfTheMonth,
    getNumberOfDaysInTheMonth,

} from "./common.mjs";
import datesObj from "./days.json" with {type: "json"};

const monthYear = document.querySelector("#month-year");
const previousMonthButton = document.querySelector("#previous-month");
const nextMonthButton = document.querySelector("#next-month");
const monthSelect = document.querySelector("#month-select");
const yearInput = document.querySelector("#year-input");
const goToDateButton = document.querySelector("#go-to-date");
const calendarDays = document.querySelector("#calendar-days");
const template = document.querySelector("#day-template");

const state = {
    currentYear: "",
    currentMonth: ""
}
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

/**
 * Updates the calendar heading with the currently selected month and year.
 */
function updateMonthYear() {
    monthYear.textContent =
        `${monthNames[state.currentMonth]} ${state.currentYear}`;
}

/**
 * Initialises the calendar using the current month and year.
 */
function initialiseCalendar() {
    const today = new Date();

    state.currentYear = today.getFullYear();
    state.currentMonth = today.getMonth();
    renderCalendar(state.currentYear, state.currentMonth, datesObj)
}

/**
 * Moves the calendar to the previous month.
 * If the current month is January, it moves to December
 * and decreases the year by one.
 */
function goToPreviousMonth() {
    if (state.currentMonth === 0) {
        state.currentMonth = 11
        state.currentYear -= 1
    } else {
        state.currentMonth -= 1
    }
    renderCalendar(state.currentYear, state.currentMonth, datesObj)
}

/**
 * Moves the calendar to the next month.
 * If the current month is December, it moves to January
 * and increases the year by one.
 */
function goToNextMonth() {
    if (state.currentMonth === 11) {
        state.currentMonth = 0
        state.currentYear += 1
    } else {
        state.currentMonth += 1
    }
    renderCalendar(state.currentYear, state.currentMonth, datesObj)
}

/**
 * Updates the calendar to the month and year selected by the user.
 */
function goToSelectedDate() {
    state.currentMonth = Number(monthSelect.value)
    state.currentYear = Number(yearInput.value)
    renderCalendar(state.currentYear, state.currentMonth, datesObj)
}

/**
 * Renders the calendar for the specified month and year.
 *
 * @param {number} year - The year to display.
 * @param {number} month - The month to display, where January is 0.
 * @param {Array} datesObj - The commemorative days to display.
 */
function renderCalendar(year, month, datesObj) {
    calendarDays.innerHTML = ""
    const firstDayOfTheMonth = getFirstDayOfTheMonth(year, month)
    const lastWeekDayOfTheMonth = getLastDayOfTheMonth(year, month)
    const numberOfDaysInTheMonth = getNumberOfDaysInTheMonth(year, month)

    for (let i = 0; i < firstDayOfTheMonth; i++) {
        const emptyCell = createEmptyCalendarCell()
        calendarDays.appendChild(emptyCell)
    }
    for (let i = 1; i <= numberOfDaysInTheMonth; i++) {
        const numberCell = createCalendarDay(i)

        datesObj.forEach((dateObj) => {
            const commemorativeDay = displayCommemorativeDays(dateObj, year);
            if (commemorativeDay.day === i && commemorativeDay.month === month) {
                const commemorativeDayElement =
                    numberCell.querySelector(".commemorative-days");

                commemorativeDayElement.textContent = dateObj.name;
            }
        });
        calendarDays.appendChild(numberCell)
    }
    for (let i = lastWeekDayOfTheMonth + 1; i <= 6; i++) {
        const emptyCell = createEmptyCalendarCell()
        calendarDays.appendChild(emptyCell)
    }
    updateMonthYear()
}

/**
 * Creates a copy of the calendar-day template.
 *
 * @returns {DocumentFragment} A cloned calendar cell.
 */
function cloneCalendarCell() {
    return template.content.cloneNode(true)
}

/**
 * Creates an empty calendar cell used for padding
 * before or after the days of the month.
 *
 * @returns {DocumentFragment} An empty calendar cell.
 */
function createEmptyCalendarCell() {
    return cloneCalendarCell()
}

/**
 * Creates a calendar cell containing a day number.
 *
 * @param {number} date - The day number to display.
 * @returns {DocumentFragment} A calendar cell containing the day number.
 */
function createCalendarDay(date) {
    const day = cloneCalendarCell()
    const dayNumberElement = day.querySelector(".day-number")
    dayNumberElement.textContent = date
    return day
}


/**
 * Calculates the date of a commemorative day and returns
 * its day and month numbers.
 *
 * @param {object} dateObj - The commemorative day data.
 * @param {number} year - The year in which to calculate the date.
 * @returns {{day: number, month: number}} The calculated day and month.
 */
function displayCommemorativeDays(dateObj, year) {
    const commemorativeDay = calculateCommemorativeDate(dateObj, year)
    return {
        day: commemorativeDay.getDate(),
        month: commemorativeDay.getMonth()
    }
}

previousMonthButton.addEventListener("click", goToPreviousMonth);
nextMonthButton.addEventListener("click", goToNextMonth);
goToDateButton.addEventListener("click", goToSelectedDate);

window.onload = initialiseCalendar;