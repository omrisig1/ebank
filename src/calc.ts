import random from './utils.js';

/**
 * @param nums any number of numbers :)
 * @returns the sum of all numbers passed
 */
export function sum(...nums: number[]) {
  return nums.reduce((t, n) => t + n);
}
/**
 * @param m multiplier
 * @param nums any number of numbers
 * @returns an array of multiplied numbers
 */
export function multiply(m: number, ...nums: number[]) {
  return nums.map((n) => m * n);
}
/**
 * multiplyR will multiply numbers randomly
 * @param nums any number of numbers
 * @returns an array of multiplied numbers
 */
export function multiplyR(...nums: number[]) {
  const m = random(6);
  return nums.map((n) => m * n);
}
