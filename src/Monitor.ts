import {platform} from 'os';
import ps_tree from 'ps-tree';

class Monitor
{
    private _pid: number;
    private _interval: number;

    private _timer: any;

    public constructor(pid: number, timeout: number, times: number)
    {
        this._pid = pid;
        this._interval = timeout * times;

        process.on('message', () => 
        {
            clearTimeout(this._timer)
            this._timer = setTimeout(() => 
            {
                ps_tree(this._pid, (_, children) => 
                {
                    console.error('Watchdog detected unresponsize event loop. Terminating...')
                    for(const proc of children) 
                    {
                        const child_pid = parseInt(proc.PID, 10);
                        if(child_pid === process.pid)
                            continue;
                        if(platform() === 'win32' && parseInt(proc.PPID, 10) === process.pid)
                            continue;

                        process.kill(child_pid, 'SIGKILL')
                    }
                    process.kill(this._pid, 'SIGKILL')
                    process.exit(0);
                })
            }, this._interval)
        });
    }
}

if(process.argv.length < 5 || process.argv.length > 6)
    console.error('Arguments must be <pid> <timeout> <times>')

const pid = parseInt(process.argv[2], 10);
const timeout = parseInt(process.argv[3], 10);
const times = parseInt(process.argv[4], 10);

new Monitor(pid, timeout, times)
