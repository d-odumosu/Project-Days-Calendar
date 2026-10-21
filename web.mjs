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


//Calendar creation
function renderCalendar(){}

function cloneCalendarCell() {
    return template.content.cloneNode(true)
}

function createEmptyCalendarCell(){
    return cloneCalendarCell()
}

function createCalendarDay(){
    const day = cloneCalendarCell()
    const dayNumber = day.querySelector(".day-number")
    const commemorativeDay = day.querySelector(".commemorative-days")
    return day
}


//Commemorative days
function displayCommemorativeDays(){}
function addCommemorativeDayToCalendar(){}



window.onload = initialiseCalendar;