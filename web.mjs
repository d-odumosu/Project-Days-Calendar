import {
    calculateCommemorativeDate,
    getFirstDayOfTheMonth,
    getLastDayOfTheMonth,
    getNumberOfDaysInTheMonth,

} from "./common.mjs";
import days from "./days.json" with { type: "json" };

const monthYear = document.querySelector("#month-year");
const previousMonthButton = document.querySelector("#previous-month");
const nextMonthButton = document.querySelector("#next-month");
const monthSelect = document.querySelector("#month-select");
const yearInput = document.querySelector("#year-input");
const goToDateButton = document.querySelector("#go-to-date");
const calendarDays = document.querySelector("#calendar-days");
const template = document.querySelector("#day-template");


//Page setup
function initialiseCalendar() {}

//Navigation
function goToPreviousMonth(){}
function goToNextMonth(){}
function goToSelectedDate(){}



function renderCalendar(year, month, datesObj) {
    calendarDays.innerHTML = ""
    const firstDayOfTheMonth = getFirstDayOfTheMonth(year, month)
    const lastWeekDayOfTheMonth = getLastDayOfTheMonth(year, month)
    const numberOfDaysInTheMonth = getNumberOfDaysInTheMonth(year, month)

    for(let i = 0; i < firstDayOfTheMonth; i++){
        const emptyCell = createEmptyCalendarCell()
        calendarDays.appendChild(emptyCell)
    }
    for(let i = 1; i <= numberOfDaysInTheMonth; i++){
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
    for(let i = lastWeekDayOfTheMonth + 1; i <= 6; i++){
        const emptyCell = createEmptyCalendarCell()
        calendarDays.appendChild(emptyCell)
    }
}

function cloneCalendarCell() {
    return template.content.cloneNode(true)
}

function createEmptyCalendarCell(){
    return cloneCalendarCell()
}

function createCalendarDay(date){
    const day = cloneCalendarCell()
    const dayNumberElement = day.querySelector(".day-number")
    dayNumberElement.textContent = date
    return day
}

function displayCommemorativeDays(dateObj, year){
    const commemorativeDay = calculateCommemorativeDate(dateObj, year)
    return commemorativeDay.getDate()
}




window.onload = initialiseCalendar;