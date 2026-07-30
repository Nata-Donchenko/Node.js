"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAverage(arr) {
    if (arr.length === 0)
        return 0;
    const sum = arr.reduce((acc, el) => {
        return acc + el;
    }, 0);
    const average = sum / arr.length;
    return average;
}
console.log(getAverage([1, 2, 3, 4, 5]));
console.log(getAverage([]));
