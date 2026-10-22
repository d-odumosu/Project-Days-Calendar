import {
  calculateCommemorativeDate,
  getFirstDayOfTheMonth,
  getLastDayOfTheMonth,
  getNumberOfDaysInTheMonth,
} from "./common.mjs";
import days from "./days.json" with { type: "json" };
import assert from "node:assert";
import test from "node:test";

/**
 * Tests that the function returns the correct weekday
 * for the first day of a given month.
 */
test("getFirstDayOfTheMonth returns the correct weekday", () => {
  assert.equal(getFirstDayOfTheMonth(2024, 9), 2);
  assert.equal(getFirstDayOfTheMonth(1996, 1), 4);
});

/**
 * Tests that the function returns the correct weekday
 * for the last day of a given month.
 */
test("getLastDayOfTheMonth returns the correct weekday", () => {
  assert.equal(getLastDayOfTheMonth(2026, 9), 6);
  assert.equal(getLastDayOfTheMonth(2024, 9), 4);
});

/**
 * Tests that the function returns the correct number of days
 * in a month, including a leap-year February.
 */
test("getNumberOfDaysInTheMonth returns the number of days in a month", () => {
  assert.equal(getNumberOfDaysInTheMonth(2024, 1), 29); //test for leap year
  assert.equal(getNumberOfDaysInTheMonth(2026, 1), 28);
});

/**
 * Tests that Ada Lovelace Day is calculated on the correct
 * month, weekday, and date for 2024.
 */
test("calculateCommemorativeDate calculates a Ada Lovelace Day", () => {
  const adaDay = days.find((day) => day.name === "Ada Lovelace Day");
  assert.equal(calculateCommemorativeDate(adaDay, 2024).getMonth(), 9);
  assert.equal(calculateCommemorativeDate(adaDay, 2024).getDay(), 2);
  assert.equal(calculateCommemorativeDate(adaDay, 2024).getDate(), 8);
});

/**
 * Tests that International Binturong Day is calculated
 * correctly for different years.
 */
test("calculateCommemorativeDate calculates International Binturong Day", () => {
  const binturongDay = days.find(
    (day) => day.name === "International Binturong Day",
  );
  assert.equal(calculateCommemorativeDate(binturongDay, 2021).getMonth(), 4);
  assert.equal(calculateCommemorativeDate(binturongDay, 2021).getDate(), 8);
  assert.equal(calculateCommemorativeDate(binturongDay, 2030).getDate(), 11);
});

/**
 * Tests that International Vulture Awareness Day is calculated
 * correctly for different years.
 */
test("calculateCommemorativeDate calculates International Vulture Awareness Day", () => {
  const vultureDay = days.find(
    (day) => day.name === "International Vulture Awareness Day",
  );

  assert.equal(calculateCommemorativeDate(vultureDay, 2018).getMonth(), 8);
  assert.equal(calculateCommemorativeDate(vultureDay, 2018).getDate(), 1);
  assert.equal(calculateCommemorativeDate(vultureDay, 2027).getDate(), 4);
});

/**
 * Tests that International Red Panda Day is calculated
 * correctly for different years.
 */
test("calculateCommemorativeDate calculates International Red Panda Day", () => {
  const redPandaDay = days.find(
    (day) => day.name === "International Red Panda Day",
  );

  assert.equal(calculateCommemorativeDate(redPandaDay, 2021).getMonth(), 8);
  assert.equal(calculateCommemorativeDate(redPandaDay, 2021).getDate(), 18);
  assert.equal(calculateCommemorativeDate(redPandaDay, 2030).getDate(), 21);
});

/**
 * Tests that World Lemur Day is calculated correctly
 * for different years.
 */
test("calculateCommemorativeDate calculates World Lemur Day", () => {
  const lemurDay = days.find((day) => day.name === "World Lemur Day");

  assert.equal(calculateCommemorativeDate(lemurDay, 2018).getMonth(), 9);
  assert.equal(calculateCommemorativeDate(lemurDay, 2018).getDate(), 26);
  assert.equal(calculateCommemorativeDate(lemurDay, 2027).getDate(), 29);
});
