import {ChildProcess, fork} from 'child_process';
import {resolve as path_resolve} from 'path';

export class Watchdog
{   
    private _monitor: ChildProcess;
    private _timeout: number;

    public constructor(timeout: number, times: number)
    {
        this._timeout = timeout;
        this._monitor = fork(path_resolve(__dirname, 'Monitor.js'), [process.pid.toString(), timeout.toString(), times.toString()], {stdio: ['inherit', 'inherit', 'inherit', 'ipc']});
    }

    public start(): void
    {
        setInterval(() => this._monitor.send(''), this._timeout);
        this._monitor.send('');
    }

    public stop(): void
    {
        this._monitor.kill();
    }
}
