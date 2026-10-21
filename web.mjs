import daysData from "./days.json" with { type: "json" };
import {
    getFirstDayOfTheMonth,
    getLastDayOfTheMonth,
    getNumberOfDaysInTheMonth,
    calculateCommemorativeDate
} from "./common.mjs";

const monthYear = document.querySelector("#month-year");

const previousMonthButton = document.querySelector("#previous-month");
const nextMonthButton = document.querySelector("#next-month");

const monthSelect = document.querySelector("#month-select");
const yearInput = document.querySelector("#year-input");
const goToDateButton = document.querySelector("#go-to-date");

const calendarDays = document.querySelector("#calendar-days");
const dayTemplate = document.querySelector("#day-template");


//Page setup
function initialiseCalendar() {}

//Navigation
function goToPreviousMonth(){}
function goToNextMonth(){}
function goToSelectedDate(){}


//Calendar creation
function renderCalendar(){}
function createCalendarDay(){}
function createEmptyCalendarCell(){}


//Commemorative days
function displayCommemorativeDays(){}
function addCommemorativeDayToCalendar(){}



window.onload = initialiseCalendar;