"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMinutesToDate = addMinutesToDate;
function addMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60 * 1000);
}
