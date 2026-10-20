// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.
import { calculateCommemorativeDate, formatDate } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };
import { writeFile } from "node:fs/promises";
let events = "";
//creating events for the year 2020 - 2030 inclusive
for (let year = 2020; year <= 2030; year++) {
  //looping through the daysdata to get all commemorative events
  for (const day of daysData) {
    const commemorativeDate = calculateCommemorativeDate(day, year);
    const endDate = new Date(commemorativeDate);
    endDate.setDate(endDate.getDate() + 1);
    //formatting the dates
    const formattedDate = formatDate(commemorativeDate);
    const formattedEndDate = formatDate(endDate);
    //unique identifier for each event using the naem and the year
    const uid = `${day.name}-${year}`;
    //when event was generated
    const timestamp =
      new Date()
        .toISOString()
        .slice(0, 19)
        .replaceAll("-", "")
        .replaceAll(":", "") + "Z";
    const event = `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${timestamp}
SUMMARY:${day.nsame}
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
// we use Node.js's built-in node:fs/promises module to write the data to a file. //await is used so that Javascript doesn't execute while the file hasn't finished writing
await writeFile("days.ics", calendar);
