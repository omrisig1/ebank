import log from '@ajar/marker';
import { multiplyR } from './calc.js';
import saySomething from './myModule.js';

const multiplied = multiplyR(3, 4, 5);
console.log(multiplied);

const response = saySomething('hello');
log.magenta(response);
