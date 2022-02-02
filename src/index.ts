import log from '@ajar/marker';
import { multiplyR } from './calc.js';
import saySomething from './myModule.js';
import config from '../config.json';

const conf = JSON.parse(JSON.stringify(config));
console.log(conf.test);
console.log(conf.scripts.one);

const multiplied = multiplyR(3, 4, 5);
console.log(multiplied);

const response = saySomething('hello');
log.magenta(response);
