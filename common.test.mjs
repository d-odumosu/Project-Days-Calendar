import {
  calculateCommemorativeDate,
  getFirstDayOfTheMonth,
  getLastDayOfTheMonth,
  getNumberOfDaysInTheMonth,
} from "./common.mjs";
import days from "./days.json" with { type: "json" };
import assert from "node:assert";
import test from "node:test";

test("getFirstDayOfTheMonth returns the correct weekday", () => {
  assert.equal(getFirstDayOfTheMonth(2024, 9), 2);
  assert.equal(getFirstDayOfTheMonth(1996, 1), 4);
});
test("getLastDayOfTheMonth returns the correct weekday", () => {
  assert.equal(getLastDayOfTheMonth(2026, 9), 6);
  assert.equal(getLastDayOfTheMonth(2024, 9), 4);
});
test("getNumberOfDaysInTheMonth return the number of days in a month", () => {
  assert.equal(getNumberOfDaysInTheMonth(2024, 1), 29); //test for leap year
  assert.equal(getNumberOfDaysInTheMonth(2026, 1), 28);
});

test("calculateCommemorativeDate calculates a Ada Lovelace Day", () => {
  const adaDay = days.find((day) => day.name === "Ada Lovelace Day");
  assert.equal(calculateCommemorativeDate(adaDay, 2024).getMonth(), 9);
  assert.equal(calculateCommemorativeDate(adaDay, 2024).getDay(), 2);
  assert.equal(calculateCommemorativeDate(adaDay, 2024).getDate(), 8);
});
test("calculateCommemorativeDate calculates International Binturong Day", () => {
  const binturongDay = days.find(
    (day) => day.name === "International Binturong Day",
  );
  assert.equal(calculateCommemorativeDate(binturongDay, 2021).getMonth(), 4);
  assert.equal(calculateCommemorativeDate(binturongDay, 2021).getDate(), 8);
  assert.equal(calculateCommemorativeDate(binturongDay, 2030).getDate(), 11);
});

test("calculateCommemorativeDate calculates International Vulture Awareness Day", () => {
  const vultureDay = days.find(
    (day) => day.name === "International Vulture Awareness Day",
  );

  assert.equal(calculateCommemorativeDate(vultureDay, 2018).getMonth(), 8);
  assert.equal(calculateCommemorativeDate(vultureDay, 2018).getDate(), 1);
  assert.equal(calculateCommemorativeDate(vultureDay, 2027).getDate(), 4);
});

test("calculateCommemorativeDate calculates International Red Panda Day", () => {
  const redPandaDay = days.find(
    (day) => day.name === "International Red Panda Day",
  );

  assert.equal(calculateCommemorativeDate(redPandaDay, 2021).getMonth(), 8);
  assert.equal(calculateCommemorativeDate(redPandaDay, 2021).getDate(), 18);
  assert.equal(calculateCommemorativeDate(redPandaDay, 2030).getDate(), 21);
});

test("calculateCommemorativeDate calculates World Lemur Day", () => {
  const lemurDay = days.find((day) => day.name === "World Lemur Day");

  assert.equal(calculateCommemorativeDate(lemurDay, 2018).getMonth(), 9);
  assert.equal(calculateCommemorativeDate(lemurDay, 2018).getDate(), 26);
  assert.equal(calculateCommemorativeDate(lemurDay, 2027).getDate(), 29);
});
