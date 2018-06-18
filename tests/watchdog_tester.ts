import {Watchdog} from '../src/Watchdog';

const interval = parseInt(process.argv[2], 10);
const times = parseInt(process.argv[3], 10);
const lock = process.argv[4];

const watchdog = new Watchdog(interval, times);
watchdog.start();

if(lock)
    while(true);
