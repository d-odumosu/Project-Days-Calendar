import {calculateCommemorativeDate, formatDate} from "./common.mjs";
import daysData from "./days.json" with {type: "json"};
import {writeFile} from "node:fs/promises";

let events = "";
for (let year = 2020; year <= 2030; year++) {
    for (const day of daysData) {
        const commemorativeDate = calculateCommemorativeDate(day, year);
        const endDate = new Date(commemorativeDate);
        endDate.setDate(endDate.getDate() + 1);
        const formattedDate = formatDate(commemorativeDate);
        const formattedEndDate = formatDate(endDate);
        const uid = `${day.name}-${year}`;
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

const calendar = `BEGIN:VCALENDAR
//Specifies that the file follows the iCalendar 2.0 format.
VERSION:2.0
PRODID:-//Days Calendar//EN
${events}END:VCALENDAR`;
await writeFile("days.ics", calendar);
