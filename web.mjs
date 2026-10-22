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

function updateMonthYear() {
    monthYear.textContent =
        `${monthNames[state.currentMonth]} ${state.currentYear}`;
}

function initialiseCalendar() {
    const today = new Date();

    state.currentYear = today.getFullYear();
    state.currentMonth = today.getMonth();
    renderCalendar(state.currentYear, state.currentMonth, datesObj)
}


function goToPreviousMonth() {
    if (state.currentMonth === 0) {
        state.currentMonth = 11
        state.currentYear -= 1
    } else {
        state.currentMonth -= 1
    }
    renderCalendar(state.currentYear, state.currentMonth, datesObj)
}

function goToNextMonth() {
    if (state.currentMonth === 11) {
        state.currentMonth = 0
        state.currentYear += 1
    }
    else{
        state.currentMonth += 1
    }
    renderCalendar(state.currentYear, state.currentMonth, datesObj)
}

function goToSelectedDate() {
    state.currentMonth = Number(monthSelect.value)
    state.currentYear = Number(yearInput.value)
    renderCalendar( state.currentYear, state.currentMonth, datesObj)
}


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
            if (commemorativeDay === i) {
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

function cloneCalendarCell() {
    return template.content.cloneNode(true)
}

function createEmptyCalendarCell() {
    return cloneCalendarCell()
}

function createCalendarDay(date) {
    const day = cloneCalendarCell()
    const dayNumberElement = day.querySelector(".day-number")
    dayNumberElement.textContent = date
    return day
}

function displayCommemorativeDays(dateObj, year) {
    const commemorativeDay = calculateCommemorativeDate(dateObj, year)
    return commemorativeDay.getDate()
}

previousMonthButton.addEventListener("click", goToPreviousMonth);
nextMonthButton.addEventListener("click", goToNextMonth);
goToDateButton.addEventListener("click", goToSelectedDate);

window.onload = initialiseCalendar;