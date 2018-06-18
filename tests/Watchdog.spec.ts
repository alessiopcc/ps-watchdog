import {ChildProcess, fork} from 'child_process';
import {resolve as path_resolve} from 'path';

describe('Watchdog', () => 
{
    const interval = 1000;
    const times = 2;
    let tester: ChildProcess;
    
    beforeEach(() => 
    {
        if(tester)
            tester.kill();
    })

    test('should run with responsive event loop', (done) => 
    {
        const tester = fork(path_resolve(__dirname, 'watchdog_tester.js'), [interval.toString(), times.toString()], {stdio: ['inherit', 'inherit', 'inherit', 'ipc']});
        setTimeout(() =>
        {
            if(tester.killed)
                done(new Error('Should run'));
            else
            {
                tester.kill();
                done();
            }
        }, interval * (times + 1));
    });

    test('should exit with unresponsive event loop', (done) => 
    {
        expect.assertions(1);

        const start = Date.now();
        const tester = fork(path_resolve(__dirname, 'watchdog_tester.js'), [interval.toString(), times.toString(), 'true'], {stdio: ['inherit', 'inherit', 'inherit', 'ipc']});
        tester.on('exit', () =>
        {
            expect(Date.now() - start).toBeGreaterThanOrEqual(interval * times)
            done();
        });
    });
});
