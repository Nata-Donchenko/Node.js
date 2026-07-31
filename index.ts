function reverseArray<T>(arr: T[]): T[] {
    return arr.reverse();
}

const arr = [1, 2, 3];
const reversedArr = reverseArray(arr);
const arr2 = ['a', 'b', 'c'];
const reversedArr2 = reverseArray(arr2);
console.log(reversedArr);
console.log(reversedArr === arr);
console.log(reversedArr2);
console.log(reversedArr2 === arr2);