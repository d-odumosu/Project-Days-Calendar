import {calculateCommemorativeDate, formatDate} from "./common.mjs";
import daysData from "./days.json" with {type: "json"};
import {writeFile} from "node:fs/promises";

/**
 * Generates an iCalendar file containing one whole-day event
 * for each commemorative day from 2020 through 2030.
 *
 * The commemorative dates are calculated using the shared
 * date-calculation function from common.mjs.
 */
let events = "";

/**
 * Loops through each year from 2020 to 2030 and creates
 * an iCalendar event for every commemorative day.
 */
for (let year = 2020; year <= 2030; year++) {
    for (const day of daysData) {
        const commemorativeDate = calculateCommemorativeDate(day, year);
        /**
         * The end date is one day after the commemorative date
         * because iCalendar whole-day events use an exclusive end date.
         */
        const endDate = new Date(commemorativeDate);
        endDate.setDate(endDate.getDate() + 1);

        const formattedDate = formatDate(commemorativeDate);
        const formattedEndDate = formatDate(endDate);

        /**
         * Creates a unique identifier for each event using
         * the commemorative day name and year.
         */
        const uid = `${day.name}-${year}`;

        /**
         * Creates the timestamp showing when the event was generated.
         */
        const timestamp =
            new Date()
                .toISOString()
                .slice(0, 19)
                .replaceAll("-", "")
                .replaceAll(":", "") + "Z";
        const event = `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${timestamp}
SUMMARY:${day.name}
DTSTART;VALUE=DATE:${formattedDate}
DTEND;VALUE=DATE:${formattedEndDate}
END:VEVENT`;
        events += event + "\n";
    }
}

/**
 * Creates the complete iCalendar file by wrapping all events
 * inside the required VCALENDAR structure.
 */

// VERSION:2.0 specifies that the file follows the iCalendar 2.0 format.
const calendar = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Days Calendar//EN
${events}END:VCALENDAR`;

/**
 * Writes the generated calendar data to days.ics.
 */
await writeFile("days.ics", calendar);
