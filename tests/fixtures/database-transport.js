import {initializeApp,deleteApp} from 'firebase/app';
import {getDatabase,onValue,ref,goOffline} from 'firebase/database';
import {configureDatabaseTransport} from '../../platform/databaseTransport.js';
localStorage.setItem('firebase:previous_websocket_failure','true');
configureDatabaseTransport(new URL(location.href).searchParams.get('fixed')==='true');
const app=initializeApp({databaseURL:'https://flickmemo-qwe-default-rtdb.asia-southeast1.firebasedatabase.app'});
const db=getDatabase(app);
const remove=onValue(ref(db,'.info/connected'),snapshot=>{
 document.getElementById('result').textContent=snapshot.val()===true?'connected':'disconnected';
});
window.stopProbe=async()=>{remove();goOffline(db);await deleteApp(app);};
