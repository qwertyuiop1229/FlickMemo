export function createSyncRecovery({retry,eligible,schedule=setTimeout,cancel=clearTimeout}) {
    let session=null,connected=false,attempt=0,timer=null,flight=null,epoch=0;
    const clear=()=>{if(timer!==null)cancel(timer);timer=null;};
    function arm(){
        if(timer!==null||flight||!session||connected||!eligible())return;
        const ticket=epoch;
        timer=schedule(async()=>{
            timer=null;
            if(ticket!==epoch||connected||!session||!eligible())return;
            attempt=Math.min(attempt+1,4);
            const task=Promise.resolve().then(retry);flight=task;
            try{await task;}catch{}finally{if(flight===task)flight=null;if(ticket===epoch)arm();}
        },Math.min(20_000*2**attempt,120_000));
    }
    return {
        session(key){++epoch;clear();flight=null;session=key;connected=false;attempt=0;},
        connection(value){connected=value;clear();if(value)attempt=0;else arm();},
        refresh(){clear();arm();},
        stop(){++epoch;session=null;flight=null;clear();}
    };
}
