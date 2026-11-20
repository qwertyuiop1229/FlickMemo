// Node-side polling for asynchronous IPC. A Promise itself is never a success value.
import {setTimeout as delay} from 'node:timers/promises';

export function unchangedFor(select, durationMs, now = () => performance.now()) {
    let previous;
    let since;
    return state => {
        const value = select(state);
        const time = now();
        if (since === undefined || !Object.is(value, previous)) {
            previous = value;
            since = time;
        }
        return time - since >= durationMs;
    };
}
export async function waitForAsyncState(read, matches, {timeout=10_000,interval=50,description='状態の変更'}={}) {
    const deadline=performance.now()+timeout;
    let last;
    do {
        last=await read();
        if(await matches(last))return last;
        const remaining=deadline-performance.now();
        if(remaining<=0)break;
        await delay(Math.min(interval,remaining));
    }while(performance.now()<=deadline);
    throw new Error(`${description}がタイムアウトしました。最終状態: ${JSON.stringify(last)}`);
}
