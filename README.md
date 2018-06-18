# Ps-watchdog module
Kills the current process and all the children when the JavaScript event loop is busy for more than a configurable amount of time.

It forks a new process that waits for a periodical keepalive from the event loop.

## Installing

```sh
npm install ps-watchdog
```

## Using

```javascript
import {Watchdog} from 'ps-watchdog';

const interval = 1000;
const times = 2;
const watchdog = new Watchdog(interval, times);
watchdog.start();
```

*interval*: keepalive interval in milliseconds  
*times*: number of times the process can miss the keepalive before getting killed

## License
[MIT](https://github.com/alessiopcc/ps-watchdog/blob/master/LICENSE)

## Author
Alessio Paccoia <<alessio.paccoia@cubbit.io>>
