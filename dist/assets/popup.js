import"./modulepreload-polyfill.js";var Ra={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oc={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H=function(n,e){if(!n)throw Xn(e)},Xn=function(n){return new Error("Firebase Database ("+oc.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ac=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Hd=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Eo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,h=r>>2,u=(r&3)<<4|a>>4;let f=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(f=64)),i.push(t[h],t[u],t[f],t[p])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(ac(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Hd(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const u=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||c==null||u==null)throw new Vd;const f=r<<2|a>>4;if(i.push(f),c!==64){const p=a<<4&240|c>>2;if(i.push(p),u!==64){const w=c<<6&192|u;i.push(w)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Vd extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const lc=function(n){const e=ac(n);return Eo.encodeByteArray(e,!0)},xs=function(n){return lc(n).replace(/\./g,"")},Ps=function(n){try{return Eo.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gd(n){return cc(void 0,n)}function cc(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!qd(t)||(n[t]=cc(n[t],e[t]));return n}function qd(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yd=()=>Kd().__FIREBASE_DEFAULTS__,Zd=()=>{if(typeof process>"u"||typeof Ra>"u")return;const n=Ra.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Jd=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Ps(n[1]);return e&&JSON.parse(e)},Io=()=>{try{return Yd()||Zd()||Jd()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},uc=n=>{var e,t;return(t=(e=Io())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Qd=n=>{const e=uc(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},dc=()=>{var n;return(n=Io())===null||n===void 0?void 0:n.config},hc=n=>{var e;return(e=Io())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xd(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[xs(JSON.stringify(t)),xs(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function je(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Co(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(je())}function eh(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function th(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function fc(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function nh(){const n=je();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function ih(){return oc.NODE_ADMIN===!0}function sh(){try{return typeof indexedDB=="object"}catch{return!1}}function rh(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oh="FirebaseError";class on extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=oh,Object.setPrototypeOf(this,on.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ji.prototype.create)}}class ji{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?ah(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new on(s,a,i)}}function ah(n,e){return n.replace(lh,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const lh=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oi(n){return JSON.parse(n)}function Ne(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pc=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=Oi(Ps(r[0])||""),t=Oi(Ps(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},ch=function(n){const e=pc(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},uh=function(n){const e=pc(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Un(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Ns(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Os(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Ls(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(xa(r)&&xa(o)){if(!Ls(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function xa(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ei(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)i[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)i[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const f=i[u-3]^i[u-8]^i[u-14]^i[u-16];i[u]=(f<<1|f>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,h;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),h=1518500249):(c=r^o^a,h=1859775393):u<60?(c=r&o|a&(r|o),h=2400959708):(c=r^o^a,h=3395469782);const f=(s<<5|s>>>27)+c+l+h+i[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=f}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function hh(n,e){const t=new fh(n,e);return t.subscribe.bind(t)}class fh{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");ph(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=Pr),s.error===void 0&&(s.error=Pr),s.complete===void 0&&(s.complete=Pr);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function ph(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Pr(){}function zn(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,H(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},lr=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Be(n){return n&&n._delegate?n._delegate:n}class gn{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new ht;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(vh(e))try{this.getOrInitializeService({instanceIdentifier:ln})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=ln){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ln){return this.instances.has(e)}getOptions(e=ln){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){var i;const s=this.normalizeInstanceIdentifier(t),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:_h(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=ln){return this.component?this.component.multipleInstances?e:ln:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function _h(n){return n===ln?void 0:n}function vh(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new gh(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ve;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ve||(ve={}));const bh={debug:ve.DEBUG,verbose:ve.VERBOSE,info:ve.INFO,warn:ve.WARN,error:ve.ERROR,silent:ve.SILENT},wh=ve.INFO,Eh={[ve.DEBUG]:"log",[ve.VERBOSE]:"log",[ve.INFO]:"info",[ve.WARN]:"warn",[ve.ERROR]:"error"},Ih=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Eh[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ko{constructor(e){this.name=e,this._logLevel=wh,this._logHandler=Ih,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ve))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?bh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ve.DEBUG,...e),this._logHandler(this,ve.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ve.VERBOSE,...e),this._logHandler(this,ve.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ve.INFO,...e),this._logHandler(this,ve.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ve.WARN,...e),this._logHandler(this,ve.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ve.ERROR,...e),this._logHandler(this,ve.ERROR,...e)}}const Ch=(n,e)=>e.some(t=>n instanceof t);let Pa,Na;function kh(){return Pa||(Pa=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Sh(){return Na||(Na=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const mc=new WeakMap,Zr=new WeakMap,gc=new WeakMap,Nr=new WeakMap,So=new WeakMap;function Th(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(qt(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&mc.set(t,n)}).catch(()=>{}),So.set(e,n),e}function Ah(n){if(Zr.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});Zr.set(n,e)}let Jr={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Zr.get(n);if(e==="objectStoreNames")return n.objectStoreNames||gc.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return qt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Rh(n){Jr=n(Jr)}function xh(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Or(this),e,...t);return gc.set(i,e.sort?e.sort():[e]),qt(i)}:Sh().includes(n)?function(...e){return n.apply(Or(this),e),qt(mc.get(this))}:function(...e){return qt(n.apply(Or(this),e))}}function Ph(n){return typeof n=="function"?xh(n):(n instanceof IDBTransaction&&Ah(n),Ch(n,kh())?new Proxy(n,Jr):n)}function qt(n){if(n instanceof IDBRequest)return Th(n);if(Nr.has(n))return Nr.get(n);const e=Ph(n);return e!==n&&(Nr.set(n,e),So.set(e,n)),e}const Or=n=>So.get(n);function Nh(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=qt(o);return i&&o.addEventListener("upgradeneeded",l=>{i(qt(o.result),l.oldVersion,l.newVersion,qt(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Oh=["get","getKey","getAll","getAllKeys","count"],Lh=["put","add","delete","clear"],Lr=new Map;function Oa(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Lr.get(e))return Lr.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Lh.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Oh.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return Lr.set(e,r),r}Rh(n=>({...n,get:(e,t,i)=>Oa(e,t)||n.get(e,t,i),has:(e,t)=>!!Oa(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Fh(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Fh(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Qr="@firebase/app",La="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const At=new ko("@firebase/app"),Mh="@firebase/app-compat",Bh="@firebase/analytics-compat",Uh="@firebase/analytics",zh="@firebase/app-check-compat",$h="@firebase/app-check",Wh="@firebase/auth",jh="@firebase/auth-compat",Hh="@firebase/database",Vh="@firebase/data-connect",Gh="@firebase/database-compat",qh="@firebase/functions",Kh="@firebase/functions-compat",Yh="@firebase/installations",Zh="@firebase/installations-compat",Jh="@firebase/messaging",Qh="@firebase/messaging-compat",Xh="@firebase/performance",ef="@firebase/performance-compat",tf="@firebase/remote-config",nf="@firebase/remote-config-compat",sf="@firebase/storage",rf="@firebase/storage-compat",of="@firebase/firestore",af="@firebase/vertexai-preview",lf="@firebase/firestore-compat",cf="firebase",uf="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr="[DEFAULT]",df={[Qr]:"fire-core",[Mh]:"fire-core-compat",[Uh]:"fire-analytics",[Bh]:"fire-analytics-compat",[$h]:"fire-app-check",[zh]:"fire-app-check-compat",[Wh]:"fire-auth",[jh]:"fire-auth-compat",[Hh]:"fire-rtdb",[Vh]:"fire-data-connect",[Gh]:"fire-rtdb-compat",[qh]:"fire-fn",[Kh]:"fire-fn-compat",[Yh]:"fire-iid",[Zh]:"fire-iid-compat",[Jh]:"fire-fcm",[Qh]:"fire-fcm-compat",[Xh]:"fire-perf",[ef]:"fire-perf-compat",[tf]:"fire-rc",[nf]:"fire-rc-compat",[sf]:"fire-gcs",[rf]:"fire-gcs-compat",[of]:"fire-fst",[lf]:"fire-fst-compat",[af]:"fire-vertex","fire-js":"fire-js",[cf]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ds=new Map,hf=new Map,eo=new Map;function Da(n,e){try{n.container.addComponent(e)}catch(t){At.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function $n(n){const e=n.name;if(eo.has(e))return At.debug(`There were multiple attempts to register component ${e}.`),!1;eo.set(e,n);for(const t of Ds.values())Da(t,n);for(const t of hf.values())Da(t,n);return!0}function To(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function mt(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ff={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Kt=new ji("app","Firebase",ff);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pf{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new gn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Kt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ti=uf;function _c(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:Xr,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw Kt.create("bad-app-name",{appName:String(s)});if(t||(t=dc()),!t)throw Kt.create("no-options");const r=Ds.get(s);if(r){if(Ls(t,r.options)&&Ls(i,r.config))return r;throw Kt.create("duplicate-app",{appName:s})}const o=new yh(s);for(const l of eo.values())o.addComponent(l);const a=new pf(t,i,o);return Ds.set(s,a),a}function vc(n=Xr){const e=Ds.get(n);if(!e&&n===Xr&&dc())return _c();if(!e)throw Kt.create("no-app",{appName:n});return e}function Yt(n,e,t){var i;let s=(i=df[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),At.warn(a.join(" "));return}$n(new gn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mf="firebase-heartbeat-database",gf=1,Li="firebase-heartbeat-store";let Dr=null;function yc(){return Dr||(Dr=Nh(mf,gf,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Li)}catch(t){console.warn(t)}}}}).catch(n=>{throw Kt.create("idb-open",{originalErrorMessage:n.message})})),Dr}async function _f(n){try{const t=(await yc()).transaction(Li),i=await t.objectStore(Li).get(bc(n));return await t.done,i}catch(e){if(e instanceof on)At.warn(e.message);else{const t=Kt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});At.warn(t.message)}}}async function Fa(n,e){try{const i=(await yc()).transaction(Li,"readwrite");await i.objectStore(Li).put(e,bc(n)),await i.done}catch(t){if(t instanceof on)At.warn(t.message);else{const i=Kt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});At.warn(i.message)}}}function bc(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vf=1024,yf=30*24*60*60*1e3;class bf{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Ef(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Ma();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=yf}),this._storage.overwrite(this._heartbeatsCache))}catch(i){At.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Ma(),{heartbeatsToSend:i,unsentEntries:s}=wf(this._heartbeatsCache.heartbeats),r=xs(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return At.warn(t),""}}}function Ma(){return new Date().toISOString().substring(0,10)}function wf(n,e=vf){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Ba(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Ba(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Ef{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return sh()?rh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await _f(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Fa(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Fa(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Ba(n){return xs(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function If(n){$n(new gn("platform-logger",e=>new Dh(e),"PRIVATE")),$n(new gn("heartbeat",e=>new bf(e),"PRIVATE")),Yt(Qr,La,n),Yt(Qr,La,"esm2017"),Yt("fire-js","")}If("");var Cf="firebase",kf="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Yt(Cf,kf,"app");var Nn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function wc(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}function rs(n){throw new Error('Could not dynamically require "'+n+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Ec={exports:{}};/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/(function(n,e){(function(t){n.exports=t()})(function(){return function t(i,s,r){function o(c,h){if(!s[c]){if(!i[c]){var u=typeof rs=="function"&&rs;if(!h&&u)return u(c,!0);if(a)return a(c,!0);var f=new Error("Cannot find module '"+c+"'");throw f.code="MODULE_NOT_FOUND",f}var p=s[c]={exports:{}};i[c][0].call(p.exports,function(w){var g=i[c][1][w];return o(g||w)},p,p.exports,t,i,s,r)}return s[c].exports}for(var a=typeof rs=="function"&&rs,l=0;l<r.length;l++)o(r[l]);return o}({1:[function(t,i,s){var r=t("./utils"),o=t("./support"),a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";s.encode=function(l){for(var c,h,u,f,p,w,g,y=[],v=0,_=l.length,b=_,C=r.getTypeOf(l)!=="string";v<l.length;)b=_-v,u=C?(c=l[v++],h=v<_?l[v++]:0,v<_?l[v++]:0):(c=l.charCodeAt(v++),h=v<_?l.charCodeAt(v++):0,v<_?l.charCodeAt(v++):0),f=c>>2,p=(3&c)<<4|h>>4,w=1<b?(15&h)<<2|u>>6:64,g=2<b?63&u:64,y.push(a.charAt(f)+a.charAt(p)+a.charAt(w)+a.charAt(g));return y.join("")},s.decode=function(l){var c,h,u,f,p,w,g=0,y=0,v="data:";if(l.substr(0,v.length)===v)throw new Error("Invalid base64 input, it looks like a data url.");var _,b=3*(l=l.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(l.charAt(l.length-1)===a.charAt(64)&&b--,l.charAt(l.length-2)===a.charAt(64)&&b--,b%1!=0)throw new Error("Invalid base64 input, bad content length.");for(_=o.uint8array?new Uint8Array(0|b):new Array(0|b);g<l.length;)c=a.indexOf(l.charAt(g++))<<2|(f=a.indexOf(l.charAt(g++)))>>4,h=(15&f)<<4|(p=a.indexOf(l.charAt(g++)))>>2,u=(3&p)<<6|(w=a.indexOf(l.charAt(g++))),_[y++]=c,p!==64&&(_[y++]=h),w!==64&&(_[y++]=u);return _}},{"./support":30,"./utils":32}],2:[function(t,i,s){var r=t("./external"),o=t("./stream/DataWorker"),a=t("./stream/Crc32Probe"),l=t("./stream/DataLengthProbe");function c(h,u,f,p,w){this.compressedSize=h,this.uncompressedSize=u,this.crc32=f,this.compression=p,this.compressedContent=w}c.prototype={getContentWorker:function(){var h=new o(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new l("data_length")),u=this;return h.on("end",function(){if(this.streamInfo.data_length!==u.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),h},getCompressedWorker:function(){return new o(r.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},c.createWorkerFrom=function(h,u,f){return h.pipe(new a).pipe(new l("uncompressedSize")).pipe(u.compressWorker(f)).pipe(new l("compressedSize")).withStreamInfo("compression",u)},i.exports=c},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(t,i,s){var r=t("./stream/GenericWorker");s.STORE={magic:"\0\0",compressWorker:function(){return new r("STORE compression")},uncompressWorker:function(){return new r("STORE decompression")}},s.DEFLATE=t("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(t,i,s){var r=t("./utils"),o=function(){for(var a,l=[],c=0;c<256;c++){a=c;for(var h=0;h<8;h++)a=1&a?3988292384^a>>>1:a>>>1;l[c]=a}return l}();i.exports=function(a,l){return a!==void 0&&a.length?r.getTypeOf(a)!=="string"?function(c,h,u,f){var p=o,w=f+u;c^=-1;for(var g=f;g<w;g++)c=c>>>8^p[255&(c^h[g])];return-1^c}(0|l,a,a.length,0):function(c,h,u,f){var p=o,w=f+u;c^=-1;for(var g=f;g<w;g++)c=c>>>8^p[255&(c^h.charCodeAt(g))];return-1^c}(0|l,a,a.length,0):0}},{"./utils":32}],5:[function(t,i,s){s.base64=!1,s.binary=!1,s.dir=!1,s.createFolders=!0,s.date=null,s.compression=null,s.compressionOptions=null,s.comment=null,s.unixPermissions=null,s.dosPermissions=null},{}],6:[function(t,i,s){var r=null;r=typeof Promise<"u"?Promise:t("lie"),i.exports={Promise:r}},{lie:37}],7:[function(t,i,s){var r=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",o=t("pako"),a=t("./utils"),l=t("./stream/GenericWorker"),c=r?"uint8array":"array";function h(u,f){l.call(this,"FlateWorker/"+u),this._pako=null,this._pakoAction=u,this._pakoOptions=f,this.meta={}}s.magic="\b\0",a.inherits(h,l),h.prototype.processChunk=function(u){this.meta=u.meta,this._pako===null&&this._createPako(),this._pako.push(a.transformTo(c,u.data),!1)},h.prototype.flush=function(){l.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){l.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new o[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var u=this;this._pako.onData=function(f){u.push({data:f,meta:u.meta})}},s.compressWorker=function(u){return new h("Deflate",u)},s.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(t,i,s){function r(p,w){var g,y="";for(g=0;g<w;g++)y+=String.fromCharCode(255&p),p>>>=8;return y}function o(p,w,g,y,v,_){var b,C,k=p.file,T=p.compression,x=_!==c.utf8encode,D=a.transformTo("string",_(k.name)),A=a.transformTo("string",c.utf8encode(k.name)),U=k.comment,Z=a.transformTo("string",_(U)),S=a.transformTo("string",c.utf8encode(U)),F=A.length!==k.name.length,m=S.length!==U.length,B="",oe="",j="",X=k.dir,$=k.date,ee={crc32:0,compressedSize:0,uncompressedSize:0};w&&!g||(ee.crc32=p.crc32,ee.compressedSize=p.compressedSize,ee.uncompressedSize=p.uncompressedSize);var O=0;w&&(O|=8),x||!F&&!m||(O|=2048);var P=0,te=0;X&&(P|=16),v==="UNIX"?(te=798,P|=function(G,we){var Re=G;return G||(Re=we?16893:33204),(65535&Re)<<16}(k.unixPermissions,X)):(te=20,P|=function(G){return 63&(G||0)}(k.dosPermissions)),b=$.getUTCHours(),b<<=6,b|=$.getUTCMinutes(),b<<=5,b|=$.getUTCSeconds()/2,C=$.getUTCFullYear()-1980,C<<=4,C|=$.getUTCMonth()+1,C<<=5,C|=$.getUTCDate(),F&&(oe=r(1,1)+r(h(D),4)+A,B+="up"+r(oe.length,2)+oe),m&&(j=r(1,1)+r(h(Z),4)+S,B+="uc"+r(j.length,2)+j);var K="";return K+=`
\0`,K+=r(O,2),K+=T.magic,K+=r(b,2),K+=r(C,2),K+=r(ee.crc32,4),K+=r(ee.compressedSize,4),K+=r(ee.uncompressedSize,4),K+=r(D.length,2),K+=r(B.length,2),{fileRecord:u.LOCAL_FILE_HEADER+K+D+B,dirRecord:u.CENTRAL_FILE_HEADER+r(te,2)+K+r(Z.length,2)+"\0\0\0\0"+r(P,4)+r(y,4)+D+B+Z}}var a=t("../utils"),l=t("../stream/GenericWorker"),c=t("../utf8"),h=t("../crc32"),u=t("../signature");function f(p,w,g,y){l.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=w,this.zipPlatform=g,this.encodeFileName=y,this.streamFiles=p,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}a.inherits(f,l),f.prototype.push=function(p){var w=p.meta.percent||0,g=this.entriesCount,y=this._sources.length;this.accumulate?this.contentBuffer.push(p):(this.bytesWritten+=p.data.length,l.prototype.push.call(this,{data:p.data,meta:{currentFile:this.currentFile,percent:g?(w+100*(g-y-1))/g:100}}))},f.prototype.openedSource=function(p){this.currentSourceOffset=this.bytesWritten,this.currentFile=p.file.name;var w=this.streamFiles&&!p.file.dir;if(w){var g=o(p,w,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:g.fileRecord,meta:{percent:0}})}else this.accumulate=!0},f.prototype.closedSource=function(p){this.accumulate=!1;var w=this.streamFiles&&!p.file.dir,g=o(p,w,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(g.dirRecord),w)this.push({data:function(y){return u.DATA_DESCRIPTOR+r(y.crc32,4)+r(y.compressedSize,4)+r(y.uncompressedSize,4)}(p),meta:{percent:100}});else for(this.push({data:g.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},f.prototype.flush=function(){for(var p=this.bytesWritten,w=0;w<this.dirRecords.length;w++)this.push({data:this.dirRecords[w],meta:{percent:100}});var g=this.bytesWritten-p,y=function(v,_,b,C,k){var T=a.transformTo("string",k(C));return u.CENTRAL_DIRECTORY_END+"\0\0\0\0"+r(v,2)+r(v,2)+r(_,4)+r(b,4)+r(T.length,2)+T}(this.dirRecords.length,g,p,this.zipComment,this.encodeFileName);this.push({data:y,meta:{percent:100}})},f.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},f.prototype.registerPrevious=function(p){this._sources.push(p);var w=this;return p.on("data",function(g){w.processChunk(g)}),p.on("end",function(){w.closedSource(w.previous.streamInfo),w._sources.length?w.prepareNextSource():w.end()}),p.on("error",function(g){w.error(g)}),this},f.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},f.prototype.error=function(p){var w=this._sources;if(!l.prototype.error.call(this,p))return!1;for(var g=0;g<w.length;g++)try{w[g].error(p)}catch{}return!0},f.prototype.lock=function(){l.prototype.lock.call(this);for(var p=this._sources,w=0;w<p.length;w++)p[w].lock()},i.exports=f},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(t,i,s){var r=t("../compressions"),o=t("./ZipFileWorker");s.generateWorker=function(a,l,c){var h=new o(l.streamFiles,c,l.platform,l.encodeFileName),u=0;try{a.forEach(function(f,p){u++;var w=function(_,b){var C=_||b,k=r[C];if(!k)throw new Error(C+" is not a valid compression method !");return k}(p.options.compression,l.compression),g=p.options.compressionOptions||l.compressionOptions||{},y=p.dir,v=p.date;p._compressWorker(w,g).withStreamInfo("file",{name:f,dir:y,date:v,comment:p.comment||"",unixPermissions:p.unixPermissions,dosPermissions:p.dosPermissions}).pipe(h)}),h.entriesCount=u}catch(f){h.error(f)}return h}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(t,i,s){function r(){if(!(this instanceof r))return new r;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var o=new r;for(var a in this)typeof this[a]!="function"&&(o[a]=this[a]);return o}}(r.prototype=t("./object")).loadAsync=t("./load"),r.support=t("./support"),r.defaults=t("./defaults"),r.version="3.10.1",r.loadAsync=function(o,a){return new r().loadAsync(o,a)},r.external=t("./external"),i.exports=r},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(t,i,s){var r=t("./utils"),o=t("./external"),a=t("./utf8"),l=t("./zipEntries"),c=t("./stream/Crc32Probe"),h=t("./nodejsUtils");function u(f){return new o.Promise(function(p,w){var g=f.decompressed.getContentWorker().pipe(new c);g.on("error",function(y){w(y)}).on("end",function(){g.streamInfo.crc32!==f.decompressed.crc32?w(new Error("Corrupted zip : CRC32 mismatch")):p()}).resume()})}i.exports=function(f,p){var w=this;return p=r.extend(p||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:a.utf8decode}),h.isNode&&h.isStream(f)?o.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):r.prepareContent("the loaded zip file",f,!0,p.optimizedBinaryString,p.base64).then(function(g){var y=new l(p);return y.load(g),y}).then(function(g){var y=[o.Promise.resolve(g)],v=g.files;if(p.checkCRC32)for(var _=0;_<v.length;_++)y.push(u(v[_]));return o.Promise.all(y)}).then(function(g){for(var y=g.shift(),v=y.files,_=0;_<v.length;_++){var b=v[_],C=b.fileNameStr,k=r.resolve(b.fileNameStr);w.file(k,b.decompressed,{binary:!0,optimizedBinaryString:!0,date:b.date,dir:b.dir,comment:b.fileCommentStr.length?b.fileCommentStr:null,unixPermissions:b.unixPermissions,dosPermissions:b.dosPermissions,createFolders:p.createFolders}),b.dir||(w.file(k).unsafeOriginalName=C)}return y.zipComment.length&&(w.comment=y.zipComment),w})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(t,i,s){var r=t("../utils"),o=t("../stream/GenericWorker");function a(l,c){o.call(this,"Nodejs stream input adapter for "+l),this._upstreamEnded=!1,this._bindStream(c)}r.inherits(a,o),a.prototype._bindStream=function(l){var c=this;(this._stream=l).pause(),l.on("data",function(h){c.push({data:h,meta:{percent:0}})}).on("error",function(h){c.isPaused?this.generatedError=h:c.error(h)}).on("end",function(){c.isPaused?c._upstreamEnded=!0:c.end()})},a.prototype.pause=function(){return!!o.prototype.pause.call(this)&&(this._stream.pause(),!0)},a.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},i.exports=a},{"../stream/GenericWorker":28,"../utils":32}],13:[function(t,i,s){var r=t("readable-stream").Readable;function o(a,l,c){r.call(this,l),this._helper=a;var h=this;a.on("data",function(u,f){h.push(u)||h._helper.pause(),c&&c(f)}).on("error",function(u){h.emit("error",u)}).on("end",function(){h.push(null)})}t("../utils").inherits(o,r),o.prototype._read=function(){this._helper.resume()},i.exports=o},{"../utils":32,"readable-stream":16}],14:[function(t,i,s){i.exports={isNode:typeof Buffer<"u",newBufferFrom:function(r,o){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(r,o);if(typeof r=="number")throw new Error('The "data" argument must not be a number');return new Buffer(r,o)},allocBuffer:function(r){if(Buffer.alloc)return Buffer.alloc(r);var o=new Buffer(r);return o.fill(0),o},isBuffer:function(r){return Buffer.isBuffer(r)},isStream:function(r){return r&&typeof r.on=="function"&&typeof r.pause=="function"&&typeof r.resume=="function"}}},{}],15:[function(t,i,s){function r(k,T,x){var D,A=a.getTypeOf(T),U=a.extend(x||{},h);U.date=U.date||new Date,U.compression!==null&&(U.compression=U.compression.toUpperCase()),typeof U.unixPermissions=="string"&&(U.unixPermissions=parseInt(U.unixPermissions,8)),U.unixPermissions&&16384&U.unixPermissions&&(U.dir=!0),U.dosPermissions&&16&U.dosPermissions&&(U.dir=!0),U.dir&&(k=v(k)),U.createFolders&&(D=y(k))&&_.call(this,D,!0);var Z=A==="string"&&U.binary===!1&&U.base64===!1;x&&x.binary!==void 0||(U.binary=!Z),(T instanceof u&&T.uncompressedSize===0||U.dir||!T||T.length===0)&&(U.base64=!1,U.binary=!0,T="",U.compression="STORE",A="string");var S=null;S=T instanceof u||T instanceof l?T:w.isNode&&w.isStream(T)?new g(k,T):a.prepareContent(k,T,U.binary,U.optimizedBinaryString,U.base64);var F=new f(k,S,U);this.files[k]=F}var o=t("./utf8"),a=t("./utils"),l=t("./stream/GenericWorker"),c=t("./stream/StreamHelper"),h=t("./defaults"),u=t("./compressedObject"),f=t("./zipObject"),p=t("./generate"),w=t("./nodejsUtils"),g=t("./nodejs/NodejsStreamInputAdapter"),y=function(k){k.slice(-1)==="/"&&(k=k.substring(0,k.length-1));var T=k.lastIndexOf("/");return 0<T?k.substring(0,T):""},v=function(k){return k.slice(-1)!=="/"&&(k+="/"),k},_=function(k,T){return T=T!==void 0?T:h.createFolders,k=v(k),this.files[k]||r.call(this,k,null,{dir:!0,createFolders:T}),this.files[k]};function b(k){return Object.prototype.toString.call(k)==="[object RegExp]"}var C={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(k){var T,x,D;for(T in this.files)D=this.files[T],(x=T.slice(this.root.length,T.length))&&T.slice(0,this.root.length)===this.root&&k(x,D)},filter:function(k){var T=[];return this.forEach(function(x,D){k(x,D)&&T.push(D)}),T},file:function(k,T,x){if(arguments.length!==1)return k=this.root+k,r.call(this,k,T,x),this;if(b(k)){var D=k;return this.filter(function(U,Z){return!Z.dir&&D.test(U)})}var A=this.files[this.root+k];return A&&!A.dir?A:null},folder:function(k){if(!k)return this;if(b(k))return this.filter(function(A,U){return U.dir&&k.test(A)});var T=this.root+k,x=_.call(this,T),D=this.clone();return D.root=x.name,D},remove:function(k){k=this.root+k;var T=this.files[k];if(T||(k.slice(-1)!=="/"&&(k+="/"),T=this.files[k]),T&&!T.dir)delete this.files[k];else for(var x=this.filter(function(A,U){return U.name.slice(0,k.length)===k}),D=0;D<x.length;D++)delete this.files[x[D].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(k){var T,x={};try{if((x=a.extend(k||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:o.utf8encode})).type=x.type.toLowerCase(),x.compression=x.compression.toUpperCase(),x.type==="binarystring"&&(x.type="string"),!x.type)throw new Error("No output type specified.");a.checkSupport(x.type),x.platform!=="darwin"&&x.platform!=="freebsd"&&x.platform!=="linux"&&x.platform!=="sunos"||(x.platform="UNIX"),x.platform==="win32"&&(x.platform="DOS");var D=x.comment||this.comment||"";T=p.generateWorker(this,x,D)}catch(A){(T=new l("error")).error(A)}return new c(T,x.type||"string",x.mimeType)},generateAsync:function(k,T){return this.generateInternalStream(k).accumulate(T)},generateNodeStream:function(k,T){return(k=k||{}).type||(k.type="nodebuffer"),this.generateInternalStream(k).toNodejsStream(T)}};i.exports=C},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(t,i,s){i.exports=t("stream")},{stream:void 0}],17:[function(t,i,s){var r=t("./DataReader");function o(a){r.call(this,a);for(var l=0;l<this.data.length;l++)a[l]=255&a[l]}t("../utils").inherits(o,r),o.prototype.byteAt=function(a){return this.data[this.zero+a]},o.prototype.lastIndexOfSignature=function(a){for(var l=a.charCodeAt(0),c=a.charCodeAt(1),h=a.charCodeAt(2),u=a.charCodeAt(3),f=this.length-4;0<=f;--f)if(this.data[f]===l&&this.data[f+1]===c&&this.data[f+2]===h&&this.data[f+3]===u)return f-this.zero;return-1},o.prototype.readAndCheckSignature=function(a){var l=a.charCodeAt(0),c=a.charCodeAt(1),h=a.charCodeAt(2),u=a.charCodeAt(3),f=this.readData(4);return l===f[0]&&c===f[1]&&h===f[2]&&u===f[3]},o.prototype.readData=function(a){if(this.checkOffset(a),a===0)return[];var l=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,l},i.exports=o},{"../utils":32,"./DataReader":18}],18:[function(t,i,s){var r=t("../utils");function o(a){this.data=a,this.length=a.length,this.index=0,this.zero=0}o.prototype={checkOffset:function(a){this.checkIndex(this.index+a)},checkIndex:function(a){if(this.length<this.zero+a||a<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+a+"). Corrupted zip ?")},setIndex:function(a){this.checkIndex(a),this.index=a},skip:function(a){this.setIndex(this.index+a)},byteAt:function(){},readInt:function(a){var l,c=0;for(this.checkOffset(a),l=this.index+a-1;l>=this.index;l--)c=(c<<8)+this.byteAt(l);return this.index+=a,c},readString:function(a){return r.transformTo("string",this.readData(a))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var a=this.readInt(4);return new Date(Date.UTC(1980+(a>>25&127),(a>>21&15)-1,a>>16&31,a>>11&31,a>>5&63,(31&a)<<1))}},i.exports=o},{"../utils":32}],19:[function(t,i,s){var r=t("./Uint8ArrayReader");function o(a){r.call(this,a)}t("../utils").inherits(o,r),o.prototype.readData=function(a){this.checkOffset(a);var l=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,l},i.exports=o},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(t,i,s){var r=t("./DataReader");function o(a){r.call(this,a)}t("../utils").inherits(o,r),o.prototype.byteAt=function(a){return this.data.charCodeAt(this.zero+a)},o.prototype.lastIndexOfSignature=function(a){return this.data.lastIndexOf(a)-this.zero},o.prototype.readAndCheckSignature=function(a){return a===this.readData(4)},o.prototype.readData=function(a){this.checkOffset(a);var l=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,l},i.exports=o},{"../utils":32,"./DataReader":18}],21:[function(t,i,s){var r=t("./ArrayReader");function o(a){r.call(this,a)}t("../utils").inherits(o,r),o.prototype.readData=function(a){if(this.checkOffset(a),a===0)return new Uint8Array(0);var l=this.data.subarray(this.zero+this.index,this.zero+this.index+a);return this.index+=a,l},i.exports=o},{"../utils":32,"./ArrayReader":17}],22:[function(t,i,s){var r=t("../utils"),o=t("../support"),a=t("./ArrayReader"),l=t("./StringReader"),c=t("./NodeBufferReader"),h=t("./Uint8ArrayReader");i.exports=function(u){var f=r.getTypeOf(u);return r.checkSupport(f),f!=="string"||o.uint8array?f==="nodebuffer"?new c(u):o.uint8array?new h(r.transformTo("uint8array",u)):new a(r.transformTo("array",u)):new l(u)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(t,i,s){s.LOCAL_FILE_HEADER="PK",s.CENTRAL_FILE_HEADER="PK",s.CENTRAL_DIRECTORY_END="PK",s.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",s.ZIP64_CENTRAL_DIRECTORY_END="PK",s.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(t,i,s){var r=t("./GenericWorker"),o=t("../utils");function a(l){r.call(this,"ConvertWorker to "+l),this.destType=l}o.inherits(a,r),a.prototype.processChunk=function(l){this.push({data:o.transformTo(this.destType,l.data),meta:l.meta})},i.exports=a},{"../utils":32,"./GenericWorker":28}],25:[function(t,i,s){var r=t("./GenericWorker"),o=t("../crc32");function a(){r.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}t("../utils").inherits(a,r),a.prototype.processChunk=function(l){this.streamInfo.crc32=o(l.data,this.streamInfo.crc32||0),this.push(l)},i.exports=a},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(t,i,s){var r=t("../utils"),o=t("./GenericWorker");function a(l){o.call(this,"DataLengthProbe for "+l),this.propName=l,this.withStreamInfo(l,0)}r.inherits(a,o),a.prototype.processChunk=function(l){if(l){var c=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=c+l.data.length}o.prototype.processChunk.call(this,l)},i.exports=a},{"../utils":32,"./GenericWorker":28}],27:[function(t,i,s){var r=t("../utils"),o=t("./GenericWorker");function a(l){o.call(this,"DataWorker");var c=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,l.then(function(h){c.dataIsReady=!0,c.data=h,c.max=h&&h.length||0,c.type=r.getTypeOf(h),c.isPaused||c._tickAndRepeat()},function(h){c.error(h)})}r.inherits(a,o),a.prototype.cleanUp=function(){o.prototype.cleanUp.call(this),this.data=null},a.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,r.delay(this._tickAndRepeat,[],this)),!0)},a.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(r.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},a.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var l=null,c=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":l=this.data.substring(this.index,c);break;case"uint8array":l=this.data.subarray(this.index,c);break;case"array":case"nodebuffer":l=this.data.slice(this.index,c)}return this.index=c,this.push({data:l,meta:{percent:this.max?this.index/this.max*100:0}})},i.exports=a},{"../utils":32,"./GenericWorker":28}],28:[function(t,i,s){function r(o){this.name=o||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}r.prototype={push:function(o){this.emit("data",o)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(o){this.emit("error",o)}return!0},error:function(o){return!this.isFinished&&(this.isPaused?this.generatedError=o:(this.isFinished=!0,this.emit("error",o),this.previous&&this.previous.error(o),this.cleanUp()),!0)},on:function(o,a){return this._listeners[o].push(a),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(o,a){if(this._listeners[o])for(var l=0;l<this._listeners[o].length;l++)this._listeners[o][l].call(this,a)},pipe:function(o){return o.registerPrevious(this)},registerPrevious:function(o){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=o.streamInfo,this.mergeStreamInfo(),this.previous=o;var a=this;return o.on("data",function(l){a.processChunk(l)}),o.on("end",function(){a.end()}),o.on("error",function(l){a.error(l)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var o=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),o=!0),this.previous&&this.previous.resume(),!o},flush:function(){},processChunk:function(o){this.push(o)},withStreamInfo:function(o,a){return this.extraStreamInfo[o]=a,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var o in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,o)&&(this.streamInfo[o]=this.extraStreamInfo[o])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var o="Worker "+this.name;return this.previous?this.previous+" -> "+o:o}},i.exports=r},{}],29:[function(t,i,s){var r=t("../utils"),o=t("./ConvertWorker"),a=t("./GenericWorker"),l=t("../base64"),c=t("../support"),h=t("../external"),u=null;if(c.nodestream)try{u=t("../nodejs/NodejsStreamOutputAdapter")}catch{}function f(w,g){return new h.Promise(function(y,v){var _=[],b=w._internalType,C=w._outputType,k=w._mimeType;w.on("data",function(T,x){_.push(T),g&&g(x)}).on("error",function(T){_=[],v(T)}).on("end",function(){try{var T=function(x,D,A){switch(x){case"blob":return r.newBlob(r.transformTo("arraybuffer",D),A);case"base64":return l.encode(D);default:return r.transformTo(x,D)}}(C,function(x,D){var A,U=0,Z=null,S=0;for(A=0;A<D.length;A++)S+=D[A].length;switch(x){case"string":return D.join("");case"array":return Array.prototype.concat.apply([],D);case"uint8array":for(Z=new Uint8Array(S),A=0;A<D.length;A++)Z.set(D[A],U),U+=D[A].length;return Z;case"nodebuffer":return Buffer.concat(D);default:throw new Error("concat : unsupported type '"+x+"'")}}(b,_),k);y(T)}catch(x){v(x)}_=[]}).resume()})}function p(w,g,y){var v=g;switch(g){case"blob":case"arraybuffer":v="uint8array";break;case"base64":v="string"}try{this._internalType=v,this._outputType=g,this._mimeType=y,r.checkSupport(v),this._worker=w.pipe(new o(v)),w.lock()}catch(_){this._worker=new a("error"),this._worker.error(_)}}p.prototype={accumulate:function(w){return f(this,w)},on:function(w,g){var y=this;return w==="data"?this._worker.on(w,function(v){g.call(y,v.data,v.meta)}):this._worker.on(w,function(){r.delay(g,arguments,y)}),this},resume:function(){return r.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(w){if(r.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new u(this,{objectMode:this._outputType!=="nodebuffer"},w)}},i.exports=p},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(t,i,s){if(s.base64=!0,s.array=!0,s.string=!0,s.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",s.nodebuffer=typeof Buffer<"u",s.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")s.blob=!1;else{var r=new ArrayBuffer(0);try{s.blob=new Blob([r],{type:"application/zip"}).size===0}catch{try{var o=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);o.append(r),s.blob=o.getBlob("application/zip").size===0}catch{s.blob=!1}}}try{s.nodestream=!!t("readable-stream").Readable}catch{s.nodestream=!1}},{"readable-stream":16}],31:[function(t,i,s){for(var r=t("./utils"),o=t("./support"),a=t("./nodejsUtils"),l=t("./stream/GenericWorker"),c=new Array(256),h=0;h<256;h++)c[h]=252<=h?6:248<=h?5:240<=h?4:224<=h?3:192<=h?2:1;c[254]=c[254]=1;function u(){l.call(this,"utf-8 decode"),this.leftOver=null}function f(){l.call(this,"utf-8 encode")}s.utf8encode=function(p){return o.nodebuffer?a.newBufferFrom(p,"utf-8"):function(w){var g,y,v,_,b,C=w.length,k=0;for(_=0;_<C;_++)(64512&(y=w.charCodeAt(_)))==55296&&_+1<C&&(64512&(v=w.charCodeAt(_+1)))==56320&&(y=65536+(y-55296<<10)+(v-56320),_++),k+=y<128?1:y<2048?2:y<65536?3:4;for(g=o.uint8array?new Uint8Array(k):new Array(k),_=b=0;b<k;_++)(64512&(y=w.charCodeAt(_)))==55296&&_+1<C&&(64512&(v=w.charCodeAt(_+1)))==56320&&(y=65536+(y-55296<<10)+(v-56320),_++),y<128?g[b++]=y:(y<2048?g[b++]=192|y>>>6:(y<65536?g[b++]=224|y>>>12:(g[b++]=240|y>>>18,g[b++]=128|y>>>12&63),g[b++]=128|y>>>6&63),g[b++]=128|63&y);return g}(p)},s.utf8decode=function(p){return o.nodebuffer?r.transformTo("nodebuffer",p).toString("utf-8"):function(w){var g,y,v,_,b=w.length,C=new Array(2*b);for(g=y=0;g<b;)if((v=w[g++])<128)C[y++]=v;else if(4<(_=c[v]))C[y++]=65533,g+=_-1;else{for(v&=_===2?31:_===3?15:7;1<_&&g<b;)v=v<<6|63&w[g++],_--;1<_?C[y++]=65533:v<65536?C[y++]=v:(v-=65536,C[y++]=55296|v>>10&1023,C[y++]=56320|1023&v)}return C.length!==y&&(C.subarray?C=C.subarray(0,y):C.length=y),r.applyFromCharCode(C)}(p=r.transformTo(o.uint8array?"uint8array":"array",p))},r.inherits(u,l),u.prototype.processChunk=function(p){var w=r.transformTo(o.uint8array?"uint8array":"array",p.data);if(this.leftOver&&this.leftOver.length){if(o.uint8array){var g=w;(w=new Uint8Array(g.length+this.leftOver.length)).set(this.leftOver,0),w.set(g,this.leftOver.length)}else w=this.leftOver.concat(w);this.leftOver=null}var y=function(_,b){var C;for((b=b||_.length)>_.length&&(b=_.length),C=b-1;0<=C&&(192&_[C])==128;)C--;return C<0||C===0?b:C+c[_[C]]>b?C:b}(w),v=w;y!==w.length&&(o.uint8array?(v=w.subarray(0,y),this.leftOver=w.subarray(y,w.length)):(v=w.slice(0,y),this.leftOver=w.slice(y,w.length))),this.push({data:s.utf8decode(v),meta:p.meta})},u.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=u,r.inherits(f,l),f.prototype.processChunk=function(p){this.push({data:s.utf8encode(p.data),meta:p.meta})},s.Utf8EncodeWorker=f},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(t,i,s){var r=t("./support"),o=t("./base64"),a=t("./nodejsUtils"),l=t("./external");function c(g){return g}function h(g,y){for(var v=0;v<g.length;++v)y[v]=255&g.charCodeAt(v);return y}t("setimmediate"),s.newBlob=function(g,y){s.checkSupport("blob");try{return new Blob([g],{type:y})}catch{try{var v=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return v.append(g),v.getBlob(y)}catch{throw new Error("Bug : can't construct the Blob.")}}};var u={stringifyByChunk:function(g,y,v){var _=[],b=0,C=g.length;if(C<=v)return String.fromCharCode.apply(null,g);for(;b<C;)y==="array"||y==="nodebuffer"?_.push(String.fromCharCode.apply(null,g.slice(b,Math.min(b+v,C)))):_.push(String.fromCharCode.apply(null,g.subarray(b,Math.min(b+v,C)))),b+=v;return _.join("")},stringifyByChar:function(g){for(var y="",v=0;v<g.length;v++)y+=String.fromCharCode(g[v]);return y},applyCanBeUsed:{uint8array:function(){try{return r.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return r.nodebuffer&&String.fromCharCode.apply(null,a.allocBuffer(1)).length===1}catch{return!1}}()}};function f(g){var y=65536,v=s.getTypeOf(g),_=!0;if(v==="uint8array"?_=u.applyCanBeUsed.uint8array:v==="nodebuffer"&&(_=u.applyCanBeUsed.nodebuffer),_)for(;1<y;)try{return u.stringifyByChunk(g,v,y)}catch{y=Math.floor(y/2)}return u.stringifyByChar(g)}function p(g,y){for(var v=0;v<g.length;v++)y[v]=g[v];return y}s.applyFromCharCode=f;var w={};w.string={string:c,array:function(g){return h(g,new Array(g.length))},arraybuffer:function(g){return w.string.uint8array(g).buffer},uint8array:function(g){return h(g,new Uint8Array(g.length))},nodebuffer:function(g){return h(g,a.allocBuffer(g.length))}},w.array={string:f,array:c,arraybuffer:function(g){return new Uint8Array(g).buffer},uint8array:function(g){return new Uint8Array(g)},nodebuffer:function(g){return a.newBufferFrom(g)}},w.arraybuffer={string:function(g){return f(new Uint8Array(g))},array:function(g){return p(new Uint8Array(g),new Array(g.byteLength))},arraybuffer:c,uint8array:function(g){return new Uint8Array(g)},nodebuffer:function(g){return a.newBufferFrom(new Uint8Array(g))}},w.uint8array={string:f,array:function(g){return p(g,new Array(g.length))},arraybuffer:function(g){return g.buffer},uint8array:c,nodebuffer:function(g){return a.newBufferFrom(g)}},w.nodebuffer={string:f,array:function(g){return p(g,new Array(g.length))},arraybuffer:function(g){return w.nodebuffer.uint8array(g).buffer},uint8array:function(g){return p(g,new Uint8Array(g.length))},nodebuffer:c},s.transformTo=function(g,y){if(y=y||"",!g)return y;s.checkSupport(g);var v=s.getTypeOf(y);return w[v][g](y)},s.resolve=function(g){for(var y=g.split("/"),v=[],_=0;_<y.length;_++){var b=y[_];b==="."||b===""&&_!==0&&_!==y.length-1||(b===".."?v.pop():v.push(b))}return v.join("/")},s.getTypeOf=function(g){return typeof g=="string"?"string":Object.prototype.toString.call(g)==="[object Array]"?"array":r.nodebuffer&&a.isBuffer(g)?"nodebuffer":r.uint8array&&g instanceof Uint8Array?"uint8array":r.arraybuffer&&g instanceof ArrayBuffer?"arraybuffer":void 0},s.checkSupport=function(g){if(!r[g.toLowerCase()])throw new Error(g+" is not supported by this platform")},s.MAX_VALUE_16BITS=65535,s.MAX_VALUE_32BITS=-1,s.pretty=function(g){var y,v,_="";for(v=0;v<(g||"").length;v++)_+="\\x"+((y=g.charCodeAt(v))<16?"0":"")+y.toString(16).toUpperCase();return _},s.delay=function(g,y,v){setImmediate(function(){g.apply(v||null,y||[])})},s.inherits=function(g,y){function v(){}v.prototype=y.prototype,g.prototype=new v},s.extend=function(){var g,y,v={};for(g=0;g<arguments.length;g++)for(y in arguments[g])Object.prototype.hasOwnProperty.call(arguments[g],y)&&v[y]===void 0&&(v[y]=arguments[g][y]);return v},s.prepareContent=function(g,y,v,_,b){return l.Promise.resolve(y).then(function(C){return r.blob&&(C instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(C))!==-1)&&typeof FileReader<"u"?new l.Promise(function(k,T){var x=new FileReader;x.onload=function(D){k(D.target.result)},x.onerror=function(D){T(D.target.error)},x.readAsArrayBuffer(C)}):C}).then(function(C){var k=s.getTypeOf(C);return k?(k==="arraybuffer"?C=s.transformTo("uint8array",C):k==="string"&&(b?C=o.decode(C):v&&_!==!0&&(C=function(T){return h(T,r.uint8array?new Uint8Array(T.length):new Array(T.length))}(C))),C):l.Promise.reject(new Error("Can't read the data of '"+g+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(t,i,s){var r=t("./reader/readerFor"),o=t("./utils"),a=t("./signature"),l=t("./zipEntry"),c=t("./support");function h(u){this.files=[],this.loadOptions=u}h.prototype={checkSignature:function(u){if(!this.reader.readAndCheckSignature(u)){this.reader.index-=4;var f=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+o.pretty(f)+", expected "+o.pretty(u)+")")}},isSignature:function(u,f){var p=this.reader.index;this.reader.setIndex(u);var w=this.reader.readString(4)===f;return this.reader.setIndex(p),w},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var u=this.reader.readData(this.zipCommentLength),f=c.uint8array?"uint8array":"array",p=o.transformTo(f,u);this.zipComment=this.loadOptions.decodeFileName(p)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var u,f,p,w=this.zip64EndOfCentralSize-44;0<w;)u=this.reader.readInt(2),f=this.reader.readInt(4),p=this.reader.readData(f),this.zip64ExtensibleData[u]={id:u,length:f,value:p}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var u,f;for(u=0;u<this.files.length;u++)f=this.files[u],this.reader.setIndex(f.localHeaderOffset),this.checkSignature(a.LOCAL_FILE_HEADER),f.readLocalPart(this.reader),f.handleUTF8(),f.processAttributes()},readCentralDir:function(){var u;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER);)(u=new l({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(u);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var u=this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);if(u<0)throw this.isSignature(0,a.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(u);var f=u;if(this.checkSignature(a.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===o.MAX_VALUE_16BITS||this.diskWithCentralDirStart===o.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===o.MAX_VALUE_16BITS||this.centralDirRecords===o.MAX_VALUE_16BITS||this.centralDirSize===o.MAX_VALUE_32BITS||this.centralDirOffset===o.MAX_VALUE_32BITS){if(this.zip64=!0,(u=this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(u),this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,a.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var p=this.centralDirOffset+this.centralDirSize;this.zip64&&(p+=20,p+=12+this.zip64EndOfCentralSize);var w=f-p;if(0<w)this.isSignature(f,a.CENTRAL_FILE_HEADER)||(this.reader.zero=w);else if(w<0)throw new Error("Corrupted zip: missing "+Math.abs(w)+" bytes.")},prepareReader:function(u){this.reader=r(u)},load:function(u){this.prepareReader(u),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},i.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(t,i,s){var r=t("./reader/readerFor"),o=t("./utils"),a=t("./compressedObject"),l=t("./crc32"),c=t("./utf8"),h=t("./compressions"),u=t("./support");function f(p,w){this.options=p,this.loadOptions=w}f.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(p){var w,g;if(p.skip(22),this.fileNameLength=p.readInt(2),g=p.readInt(2),this.fileName=p.readData(this.fileNameLength),p.skip(g),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((w=function(y){for(var v in h)if(Object.prototype.hasOwnProperty.call(h,v)&&h[v].magic===y)return h[v];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+o.pretty(this.compressionMethod)+" unknown (inner file : "+o.transformTo("string",this.fileName)+")");this.decompressed=new a(this.compressedSize,this.uncompressedSize,this.crc32,w,p.readData(this.compressedSize))},readCentralPart:function(p){this.versionMadeBy=p.readInt(2),p.skip(2),this.bitFlag=p.readInt(2),this.compressionMethod=p.readString(2),this.date=p.readDate(),this.crc32=p.readInt(4),this.compressedSize=p.readInt(4),this.uncompressedSize=p.readInt(4);var w=p.readInt(2);if(this.extraFieldsLength=p.readInt(2),this.fileCommentLength=p.readInt(2),this.diskNumberStart=p.readInt(2),this.internalFileAttributes=p.readInt(2),this.externalFileAttributes=p.readInt(4),this.localHeaderOffset=p.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");p.skip(w),this.readExtraFields(p),this.parseZIP64ExtraField(p),this.fileComment=p.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var p=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),p==0&&(this.dosPermissions=63&this.externalFileAttributes),p==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var p=r(this.extraFields[1].value);this.uncompressedSize===o.MAX_VALUE_32BITS&&(this.uncompressedSize=p.readInt(8)),this.compressedSize===o.MAX_VALUE_32BITS&&(this.compressedSize=p.readInt(8)),this.localHeaderOffset===o.MAX_VALUE_32BITS&&(this.localHeaderOffset=p.readInt(8)),this.diskNumberStart===o.MAX_VALUE_32BITS&&(this.diskNumberStart=p.readInt(4))}},readExtraFields:function(p){var w,g,y,v=p.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});p.index+4<v;)w=p.readInt(2),g=p.readInt(2),y=p.readData(g),this.extraFields[w]={id:w,length:g,value:y};p.setIndex(v)},handleUTF8:function(){var p=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=c.utf8decode(this.fileName),this.fileCommentStr=c.utf8decode(this.fileComment);else{var w=this.findExtraFieldUnicodePath();if(w!==null)this.fileNameStr=w;else{var g=o.transformTo(p,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(g)}var y=this.findExtraFieldUnicodeComment();if(y!==null)this.fileCommentStr=y;else{var v=o.transformTo(p,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(v)}}},findExtraFieldUnicodePath:function(){var p=this.extraFields[28789];if(p){var w=r(p.value);return w.readInt(1)!==1||l(this.fileName)!==w.readInt(4)?null:c.utf8decode(w.readData(p.length-5))}return null},findExtraFieldUnicodeComment:function(){var p=this.extraFields[25461];if(p){var w=r(p.value);return w.readInt(1)!==1||l(this.fileComment)!==w.readInt(4)?null:c.utf8decode(w.readData(p.length-5))}return null}},i.exports=f},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(t,i,s){function r(w,g,y){this.name=w,this.dir=y.dir,this.date=y.date,this.comment=y.comment,this.unixPermissions=y.unixPermissions,this.dosPermissions=y.dosPermissions,this._data=g,this._dataBinary=y.binary,this.options={compression:y.compression,compressionOptions:y.compressionOptions}}var o=t("./stream/StreamHelper"),a=t("./stream/DataWorker"),l=t("./utf8"),c=t("./compressedObject"),h=t("./stream/GenericWorker");r.prototype={internalStream:function(w){var g=null,y="string";try{if(!w)throw new Error("No output type specified.");var v=(y=w.toLowerCase())==="string"||y==="text";y!=="binarystring"&&y!=="text"||(y="string"),g=this._decompressWorker();var _=!this._dataBinary;_&&!v&&(g=g.pipe(new l.Utf8EncodeWorker)),!_&&v&&(g=g.pipe(new l.Utf8DecodeWorker))}catch(b){(g=new h("error")).error(b)}return new o(g,y,"")},async:function(w,g){return this.internalStream(w).accumulate(g)},nodeStream:function(w,g){return this.internalStream(w||"nodebuffer").toNodejsStream(g)},_compressWorker:function(w,g){if(this._data instanceof c&&this._data.compression.magic===w.magic)return this._data.getCompressedWorker();var y=this._decompressWorker();return this._dataBinary||(y=y.pipe(new l.Utf8EncodeWorker)),c.createWorkerFrom(y,w,g)},_decompressWorker:function(){return this._data instanceof c?this._data.getContentWorker():this._data instanceof h?this._data:new a(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],f=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},p=0;p<u.length;p++)r.prototype[u[p]]=f;i.exports=r},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(t,i,s){(function(r){var o,a,l=r.MutationObserver||r.WebKitMutationObserver;if(l){var c=0,h=new l(w),u=r.document.createTextNode("");h.observe(u,{characterData:!0}),o=function(){u.data=c=++c%2}}else if(r.setImmediate||r.MessageChannel===void 0)o="document"in r&&"onreadystatechange"in r.document.createElement("script")?function(){var g=r.document.createElement("script");g.onreadystatechange=function(){w(),g.onreadystatechange=null,g.parentNode.removeChild(g),g=null},r.document.documentElement.appendChild(g)}:function(){setTimeout(w,0)};else{var f=new r.MessageChannel;f.port1.onmessage=w,o=function(){f.port2.postMessage(0)}}var p=[];function w(){var g,y;a=!0;for(var v=p.length;v;){for(y=p,p=[],g=-1;++g<v;)y[g]();v=p.length}a=!1}i.exports=function(g){p.push(g)!==1||a||o()}}).call(this,typeof Nn<"u"?Nn:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(t,i,s){var r=t("immediate");function o(){}var a={},l=["REJECTED"],c=["FULFILLED"],h=["PENDING"];function u(v){if(typeof v!="function")throw new TypeError("resolver must be a function");this.state=h,this.queue=[],this.outcome=void 0,v!==o&&g(this,v)}function f(v,_,b){this.promise=v,typeof _=="function"&&(this.onFulfilled=_,this.callFulfilled=this.otherCallFulfilled),typeof b=="function"&&(this.onRejected=b,this.callRejected=this.otherCallRejected)}function p(v,_,b){r(function(){var C;try{C=_(b)}catch(k){return a.reject(v,k)}C===v?a.reject(v,new TypeError("Cannot resolve promise with itself")):a.resolve(v,C)})}function w(v){var _=v&&v.then;if(v&&(typeof v=="object"||typeof v=="function")&&typeof _=="function")return function(){_.apply(v,arguments)}}function g(v,_){var b=!1;function C(x){b||(b=!0,a.reject(v,x))}function k(x){b||(b=!0,a.resolve(v,x))}var T=y(function(){_(k,C)});T.status==="error"&&C(T.value)}function y(v,_){var b={};try{b.value=v(_),b.status="success"}catch(C){b.status="error",b.value=C}return b}(i.exports=u).prototype.finally=function(v){if(typeof v!="function")return this;var _=this.constructor;return this.then(function(b){return _.resolve(v()).then(function(){return b})},function(b){return _.resolve(v()).then(function(){throw b})})},u.prototype.catch=function(v){return this.then(null,v)},u.prototype.then=function(v,_){if(typeof v!="function"&&this.state===c||typeof _!="function"&&this.state===l)return this;var b=new this.constructor(o);return this.state!==h?p(b,this.state===c?v:_,this.outcome):this.queue.push(new f(b,v,_)),b},f.prototype.callFulfilled=function(v){a.resolve(this.promise,v)},f.prototype.otherCallFulfilled=function(v){p(this.promise,this.onFulfilled,v)},f.prototype.callRejected=function(v){a.reject(this.promise,v)},f.prototype.otherCallRejected=function(v){p(this.promise,this.onRejected,v)},a.resolve=function(v,_){var b=y(w,_);if(b.status==="error")return a.reject(v,b.value);var C=b.value;if(C)g(v,C);else{v.state=c,v.outcome=_;for(var k=-1,T=v.queue.length;++k<T;)v.queue[k].callFulfilled(_)}return v},a.reject=function(v,_){v.state=l,v.outcome=_;for(var b=-1,C=v.queue.length;++b<C;)v.queue[b].callRejected(_);return v},u.resolve=function(v){return v instanceof this?v:a.resolve(new this(o),v)},u.reject=function(v){var _=new this(o);return a.reject(_,v)},u.all=function(v){var _=this;if(Object.prototype.toString.call(v)!=="[object Array]")return this.reject(new TypeError("must be an array"));var b=v.length,C=!1;if(!b)return this.resolve([]);for(var k=new Array(b),T=0,x=-1,D=new this(o);++x<b;)A(v[x],x);return D;function A(U,Z){_.resolve(U).then(function(S){k[Z]=S,++T!==b||C||(C=!0,a.resolve(D,k))},function(S){C||(C=!0,a.reject(D,S))})}},u.race=function(v){var _=this;if(Object.prototype.toString.call(v)!=="[object Array]")return this.reject(new TypeError("must be an array"));var b=v.length,C=!1;if(!b)return this.resolve([]);for(var k=-1,T=new this(o);++k<b;)x=v[k],_.resolve(x).then(function(D){C||(C=!0,a.resolve(T,D))},function(D){C||(C=!0,a.reject(T,D))});var x;return T}},{immediate:36}],38:[function(t,i,s){var r={};(0,t("./lib/utils/common").assign)(r,t("./lib/deflate"),t("./lib/inflate"),t("./lib/zlib/constants")),i.exports=r},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(t,i,s){var r=t("./zlib/deflate"),o=t("./utils/common"),a=t("./utils/strings"),l=t("./zlib/messages"),c=t("./zlib/zstream"),h=Object.prototype.toString,u=0,f=-1,p=0,w=8;function g(v){if(!(this instanceof g))return new g(v);this.options=o.assign({level:f,method:w,chunkSize:16384,windowBits:15,memLevel:8,strategy:p,to:""},v||{});var _=this.options;_.raw&&0<_.windowBits?_.windowBits=-_.windowBits:_.gzip&&0<_.windowBits&&_.windowBits<16&&(_.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new c,this.strm.avail_out=0;var b=r.deflateInit2(this.strm,_.level,_.method,_.windowBits,_.memLevel,_.strategy);if(b!==u)throw new Error(l[b]);if(_.header&&r.deflateSetHeader(this.strm,_.header),_.dictionary){var C;if(C=typeof _.dictionary=="string"?a.string2buf(_.dictionary):h.call(_.dictionary)==="[object ArrayBuffer]"?new Uint8Array(_.dictionary):_.dictionary,(b=r.deflateSetDictionary(this.strm,C))!==u)throw new Error(l[b]);this._dict_set=!0}}function y(v,_){var b=new g(_);if(b.push(v,!0),b.err)throw b.msg||l[b.err];return b.result}g.prototype.push=function(v,_){var b,C,k=this.strm,T=this.options.chunkSize;if(this.ended)return!1;C=_===~~_?_:_===!0?4:0,typeof v=="string"?k.input=a.string2buf(v):h.call(v)==="[object ArrayBuffer]"?k.input=new Uint8Array(v):k.input=v,k.next_in=0,k.avail_in=k.input.length;do{if(k.avail_out===0&&(k.output=new o.Buf8(T),k.next_out=0,k.avail_out=T),(b=r.deflate(k,C))!==1&&b!==u)return this.onEnd(b),!(this.ended=!0);k.avail_out!==0&&(k.avail_in!==0||C!==4&&C!==2)||(this.options.to==="string"?this.onData(a.buf2binstring(o.shrinkBuf(k.output,k.next_out))):this.onData(o.shrinkBuf(k.output,k.next_out)))}while((0<k.avail_in||k.avail_out===0)&&b!==1);return C===4?(b=r.deflateEnd(this.strm),this.onEnd(b),this.ended=!0,b===u):C!==2||(this.onEnd(u),!(k.avail_out=0))},g.prototype.onData=function(v){this.chunks.push(v)},g.prototype.onEnd=function(v){v===u&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=v,this.msg=this.strm.msg},s.Deflate=g,s.deflate=y,s.deflateRaw=function(v,_){return(_=_||{}).raw=!0,y(v,_)},s.gzip=function(v,_){return(_=_||{}).gzip=!0,y(v,_)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(t,i,s){var r=t("./zlib/inflate"),o=t("./utils/common"),a=t("./utils/strings"),l=t("./zlib/constants"),c=t("./zlib/messages"),h=t("./zlib/zstream"),u=t("./zlib/gzheader"),f=Object.prototype.toString;function p(g){if(!(this instanceof p))return new p(g);this.options=o.assign({chunkSize:16384,windowBits:0,to:""},g||{});var y=this.options;y.raw&&0<=y.windowBits&&y.windowBits<16&&(y.windowBits=-y.windowBits,y.windowBits===0&&(y.windowBits=-15)),!(0<=y.windowBits&&y.windowBits<16)||g&&g.windowBits||(y.windowBits+=32),15<y.windowBits&&y.windowBits<48&&!(15&y.windowBits)&&(y.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new h,this.strm.avail_out=0;var v=r.inflateInit2(this.strm,y.windowBits);if(v!==l.Z_OK)throw new Error(c[v]);this.header=new u,r.inflateGetHeader(this.strm,this.header)}function w(g,y){var v=new p(y);if(v.push(g,!0),v.err)throw v.msg||c[v.err];return v.result}p.prototype.push=function(g,y){var v,_,b,C,k,T,x=this.strm,D=this.options.chunkSize,A=this.options.dictionary,U=!1;if(this.ended)return!1;_=y===~~y?y:y===!0?l.Z_FINISH:l.Z_NO_FLUSH,typeof g=="string"?x.input=a.binstring2buf(g):f.call(g)==="[object ArrayBuffer]"?x.input=new Uint8Array(g):x.input=g,x.next_in=0,x.avail_in=x.input.length;do{if(x.avail_out===0&&(x.output=new o.Buf8(D),x.next_out=0,x.avail_out=D),(v=r.inflate(x,l.Z_NO_FLUSH))===l.Z_NEED_DICT&&A&&(T=typeof A=="string"?a.string2buf(A):f.call(A)==="[object ArrayBuffer]"?new Uint8Array(A):A,v=r.inflateSetDictionary(this.strm,T)),v===l.Z_BUF_ERROR&&U===!0&&(v=l.Z_OK,U=!1),v!==l.Z_STREAM_END&&v!==l.Z_OK)return this.onEnd(v),!(this.ended=!0);x.next_out&&(x.avail_out!==0&&v!==l.Z_STREAM_END&&(x.avail_in!==0||_!==l.Z_FINISH&&_!==l.Z_SYNC_FLUSH)||(this.options.to==="string"?(b=a.utf8border(x.output,x.next_out),C=x.next_out-b,k=a.buf2string(x.output,b),x.next_out=C,x.avail_out=D-C,C&&o.arraySet(x.output,x.output,b,C,0),this.onData(k)):this.onData(o.shrinkBuf(x.output,x.next_out)))),x.avail_in===0&&x.avail_out===0&&(U=!0)}while((0<x.avail_in||x.avail_out===0)&&v!==l.Z_STREAM_END);return v===l.Z_STREAM_END&&(_=l.Z_FINISH),_===l.Z_FINISH?(v=r.inflateEnd(this.strm),this.onEnd(v),this.ended=!0,v===l.Z_OK):_!==l.Z_SYNC_FLUSH||(this.onEnd(l.Z_OK),!(x.avail_out=0))},p.prototype.onData=function(g){this.chunks.push(g)},p.prototype.onEnd=function(g){g===l.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=g,this.msg=this.strm.msg},s.Inflate=p,s.inflate=w,s.inflateRaw=function(g,y){return(y=y||{}).raw=!0,w(g,y)},s.ungzip=w},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(t,i,s){var r=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";s.assign=function(l){for(var c=Array.prototype.slice.call(arguments,1);c.length;){var h=c.shift();if(h){if(typeof h!="object")throw new TypeError(h+"must be non-object");for(var u in h)h.hasOwnProperty(u)&&(l[u]=h[u])}}return l},s.shrinkBuf=function(l,c){return l.length===c?l:l.subarray?l.subarray(0,c):(l.length=c,l)};var o={arraySet:function(l,c,h,u,f){if(c.subarray&&l.subarray)l.set(c.subarray(h,h+u),f);else for(var p=0;p<u;p++)l[f+p]=c[h+p]},flattenChunks:function(l){var c,h,u,f,p,w;for(c=u=0,h=l.length;c<h;c++)u+=l[c].length;for(w=new Uint8Array(u),c=f=0,h=l.length;c<h;c++)p=l[c],w.set(p,f),f+=p.length;return w}},a={arraySet:function(l,c,h,u,f){for(var p=0;p<u;p++)l[f+p]=c[h+p]},flattenChunks:function(l){return[].concat.apply([],l)}};s.setTyped=function(l){l?(s.Buf8=Uint8Array,s.Buf16=Uint16Array,s.Buf32=Int32Array,s.assign(s,o)):(s.Buf8=Array,s.Buf16=Array,s.Buf32=Array,s.assign(s,a))},s.setTyped(r)},{}],42:[function(t,i,s){var r=t("./common"),o=!0,a=!0;try{String.fromCharCode.apply(null,[0])}catch{o=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{a=!1}for(var l=new r.Buf8(256),c=0;c<256;c++)l[c]=252<=c?6:248<=c?5:240<=c?4:224<=c?3:192<=c?2:1;function h(u,f){if(f<65537&&(u.subarray&&a||!u.subarray&&o))return String.fromCharCode.apply(null,r.shrinkBuf(u,f));for(var p="",w=0;w<f;w++)p+=String.fromCharCode(u[w]);return p}l[254]=l[254]=1,s.string2buf=function(u){var f,p,w,g,y,v=u.length,_=0;for(g=0;g<v;g++)(64512&(p=u.charCodeAt(g)))==55296&&g+1<v&&(64512&(w=u.charCodeAt(g+1)))==56320&&(p=65536+(p-55296<<10)+(w-56320),g++),_+=p<128?1:p<2048?2:p<65536?3:4;for(f=new r.Buf8(_),g=y=0;y<_;g++)(64512&(p=u.charCodeAt(g)))==55296&&g+1<v&&(64512&(w=u.charCodeAt(g+1)))==56320&&(p=65536+(p-55296<<10)+(w-56320),g++),p<128?f[y++]=p:(p<2048?f[y++]=192|p>>>6:(p<65536?f[y++]=224|p>>>12:(f[y++]=240|p>>>18,f[y++]=128|p>>>12&63),f[y++]=128|p>>>6&63),f[y++]=128|63&p);return f},s.buf2binstring=function(u){return h(u,u.length)},s.binstring2buf=function(u){for(var f=new r.Buf8(u.length),p=0,w=f.length;p<w;p++)f[p]=u.charCodeAt(p);return f},s.buf2string=function(u,f){var p,w,g,y,v=f||u.length,_=new Array(2*v);for(p=w=0;p<v;)if((g=u[p++])<128)_[w++]=g;else if(4<(y=l[g]))_[w++]=65533,p+=y-1;else{for(g&=y===2?31:y===3?15:7;1<y&&p<v;)g=g<<6|63&u[p++],y--;1<y?_[w++]=65533:g<65536?_[w++]=g:(g-=65536,_[w++]=55296|g>>10&1023,_[w++]=56320|1023&g)}return h(_,w)},s.utf8border=function(u,f){var p;for((f=f||u.length)>u.length&&(f=u.length),p=f-1;0<=p&&(192&u[p])==128;)p--;return p<0||p===0?f:p+l[u[p]]>f?p:f}},{"./common":41}],43:[function(t,i,s){i.exports=function(r,o,a,l){for(var c=65535&r|0,h=r>>>16&65535|0,u=0;a!==0;){for(a-=u=2e3<a?2e3:a;h=h+(c=c+o[l++]|0)|0,--u;);c%=65521,h%=65521}return c|h<<16|0}},{}],44:[function(t,i,s){i.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(t,i,s){var r=function(){for(var o,a=[],l=0;l<256;l++){o=l;for(var c=0;c<8;c++)o=1&o?3988292384^o>>>1:o>>>1;a[l]=o}return a}();i.exports=function(o,a,l,c){var h=r,u=c+l;o^=-1;for(var f=c;f<u;f++)o=o>>>8^h[255&(o^a[f])];return-1^o}},{}],46:[function(t,i,s){var r,o=t("../utils/common"),a=t("./trees"),l=t("./adler32"),c=t("./crc32"),h=t("./messages"),u=0,f=4,p=0,w=-2,g=-1,y=4,v=2,_=8,b=9,C=286,k=30,T=19,x=2*C+1,D=15,A=3,U=258,Z=U+A+1,S=42,F=113,m=1,B=2,oe=3,j=4;function X(d,M){return d.msg=h[M],M}function $(d){return(d<<1)-(4<d?9:0)}function ee(d){for(var M=d.length;0<=--M;)d[M]=0}function O(d){var M=d.state,L=M.pending;L>d.avail_out&&(L=d.avail_out),L!==0&&(o.arraySet(d.output,M.pending_buf,M.pending_out,L,d.next_out),d.next_out+=L,M.pending_out+=L,d.total_out+=L,d.avail_out-=L,M.pending-=L,M.pending===0&&(M.pending_out=0))}function P(d,M){a._tr_flush_block(d,0<=d.block_start?d.block_start:-1,d.strstart-d.block_start,M),d.block_start=d.strstart,O(d.strm)}function te(d,M){d.pending_buf[d.pending++]=M}function K(d,M){d.pending_buf[d.pending++]=M>>>8&255,d.pending_buf[d.pending++]=255&M}function G(d,M){var L,I,E=d.max_chain_length,R=d.strstart,z=d.prev_length,W=d.nice_match,N=d.strstart>d.w_size-Z?d.strstart-(d.w_size-Z):0,V=d.window,J=d.w_mask,q=d.prev,ne=d.strstart+U,Ie=V[R+z-1],fe=V[R+z];d.prev_length>=d.good_match&&(E>>=2),W>d.lookahead&&(W=d.lookahead);do if(V[(L=M)+z]===fe&&V[L+z-1]===Ie&&V[L]===V[R]&&V[++L]===V[R+1]){R+=2,L++;do;while(V[++R]===V[++L]&&V[++R]===V[++L]&&V[++R]===V[++L]&&V[++R]===V[++L]&&V[++R]===V[++L]&&V[++R]===V[++L]&&V[++R]===V[++L]&&V[++R]===V[++L]&&R<ne);if(I=U-(ne-R),R=ne-U,z<I){if(d.match_start=M,W<=(z=I))break;Ie=V[R+z-1],fe=V[R+z]}}while((M=q[M&J])>N&&--E!=0);return z<=d.lookahead?z:d.lookahead}function we(d){var M,L,I,E,R,z,W,N,V,J,q=d.w_size;do{if(E=d.window_size-d.lookahead-d.strstart,d.strstart>=q+(q-Z)){for(o.arraySet(d.window,d.window,q,q,0),d.match_start-=q,d.strstart-=q,d.block_start-=q,M=L=d.hash_size;I=d.head[--M],d.head[M]=q<=I?I-q:0,--L;);for(M=L=q;I=d.prev[--M],d.prev[M]=q<=I?I-q:0,--L;);E+=q}if(d.strm.avail_in===0)break;if(z=d.strm,W=d.window,N=d.strstart+d.lookahead,V=E,J=void 0,J=z.avail_in,V<J&&(J=V),L=J===0?0:(z.avail_in-=J,o.arraySet(W,z.input,z.next_in,J,N),z.state.wrap===1?z.adler=l(z.adler,W,J,N):z.state.wrap===2&&(z.adler=c(z.adler,W,J,N)),z.next_in+=J,z.total_in+=J,J),d.lookahead+=L,d.lookahead+d.insert>=A)for(R=d.strstart-d.insert,d.ins_h=d.window[R],d.ins_h=(d.ins_h<<d.hash_shift^d.window[R+1])&d.hash_mask;d.insert&&(d.ins_h=(d.ins_h<<d.hash_shift^d.window[R+A-1])&d.hash_mask,d.prev[R&d.w_mask]=d.head[d.ins_h],d.head[d.ins_h]=R,R++,d.insert--,!(d.lookahead+d.insert<A)););}while(d.lookahead<Z&&d.strm.avail_in!==0)}function Re(d,M){for(var L,I;;){if(d.lookahead<Z){if(we(d),d.lookahead<Z&&M===u)return m;if(d.lookahead===0)break}if(L=0,d.lookahead>=A&&(d.ins_h=(d.ins_h<<d.hash_shift^d.window[d.strstart+A-1])&d.hash_mask,L=d.prev[d.strstart&d.w_mask]=d.head[d.ins_h],d.head[d.ins_h]=d.strstart),L!==0&&d.strstart-L<=d.w_size-Z&&(d.match_length=G(d,L)),d.match_length>=A)if(I=a._tr_tally(d,d.strstart-d.match_start,d.match_length-A),d.lookahead-=d.match_length,d.match_length<=d.max_lazy_match&&d.lookahead>=A){for(d.match_length--;d.strstart++,d.ins_h=(d.ins_h<<d.hash_shift^d.window[d.strstart+A-1])&d.hash_mask,L=d.prev[d.strstart&d.w_mask]=d.head[d.ins_h],d.head[d.ins_h]=d.strstart,--d.match_length!=0;);d.strstart++}else d.strstart+=d.match_length,d.match_length=0,d.ins_h=d.window[d.strstart],d.ins_h=(d.ins_h<<d.hash_shift^d.window[d.strstart+1])&d.hash_mask;else I=a._tr_tally(d,0,d.window[d.strstart]),d.lookahead--,d.strstart++;if(I&&(P(d,!1),d.strm.avail_out===0))return m}return d.insert=d.strstart<A-1?d.strstart:A-1,M===f?(P(d,!0),d.strm.avail_out===0?oe:j):d.last_lit&&(P(d,!1),d.strm.avail_out===0)?m:B}function ue(d,M){for(var L,I,E;;){if(d.lookahead<Z){if(we(d),d.lookahead<Z&&M===u)return m;if(d.lookahead===0)break}if(L=0,d.lookahead>=A&&(d.ins_h=(d.ins_h<<d.hash_shift^d.window[d.strstart+A-1])&d.hash_mask,L=d.prev[d.strstart&d.w_mask]=d.head[d.ins_h],d.head[d.ins_h]=d.strstart),d.prev_length=d.match_length,d.prev_match=d.match_start,d.match_length=A-1,L!==0&&d.prev_length<d.max_lazy_match&&d.strstart-L<=d.w_size-Z&&(d.match_length=G(d,L),d.match_length<=5&&(d.strategy===1||d.match_length===A&&4096<d.strstart-d.match_start)&&(d.match_length=A-1)),d.prev_length>=A&&d.match_length<=d.prev_length){for(E=d.strstart+d.lookahead-A,I=a._tr_tally(d,d.strstart-1-d.prev_match,d.prev_length-A),d.lookahead-=d.prev_length-1,d.prev_length-=2;++d.strstart<=E&&(d.ins_h=(d.ins_h<<d.hash_shift^d.window[d.strstart+A-1])&d.hash_mask,L=d.prev[d.strstart&d.w_mask]=d.head[d.ins_h],d.head[d.ins_h]=d.strstart),--d.prev_length!=0;);if(d.match_available=0,d.match_length=A-1,d.strstart++,I&&(P(d,!1),d.strm.avail_out===0))return m}else if(d.match_available){if((I=a._tr_tally(d,0,d.window[d.strstart-1]))&&P(d,!1),d.strstart++,d.lookahead--,d.strm.avail_out===0)return m}else d.match_available=1,d.strstart++,d.lookahead--}return d.match_available&&(I=a._tr_tally(d,0,d.window[d.strstart-1]),d.match_available=0),d.insert=d.strstart<A-1?d.strstart:A-1,M===f?(P(d,!0),d.strm.avail_out===0?oe:j):d.last_lit&&(P(d,!1),d.strm.avail_out===0)?m:B}function pe(d,M,L,I,E){this.good_length=d,this.max_lazy=M,this.nice_length=L,this.max_chain=I,this.func=E}function Te(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=_,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new o.Buf16(2*x),this.dyn_dtree=new o.Buf16(2*(2*k+1)),this.bl_tree=new o.Buf16(2*(2*T+1)),ee(this.dyn_ltree),ee(this.dyn_dtree),ee(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new o.Buf16(D+1),this.heap=new o.Buf16(2*C+1),ee(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new o.Buf16(2*C+1),ee(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function Ee(d){var M;return d&&d.state?(d.total_in=d.total_out=0,d.data_type=v,(M=d.state).pending=0,M.pending_out=0,M.wrap<0&&(M.wrap=-M.wrap),M.status=M.wrap?S:F,d.adler=M.wrap===2?0:1,M.last_flush=u,a._tr_init(M),p):X(d,w)}function Ze(d){var M=Ee(d);return M===p&&function(L){L.window_size=2*L.w_size,ee(L.head),L.max_lazy_match=r[L.level].max_lazy,L.good_match=r[L.level].good_length,L.nice_match=r[L.level].nice_length,L.max_chain_length=r[L.level].max_chain,L.strstart=0,L.block_start=0,L.lookahead=0,L.insert=0,L.match_length=L.prev_length=A-1,L.match_available=0,L.ins_h=0}(d.state),M}function ze(d,M,L,I,E,R){if(!d)return w;var z=1;if(M===g&&(M=6),I<0?(z=0,I=-I):15<I&&(z=2,I-=16),E<1||b<E||L!==_||I<8||15<I||M<0||9<M||R<0||y<R)return X(d,w);I===8&&(I=9);var W=new Te;return(d.state=W).strm=d,W.wrap=z,W.gzhead=null,W.w_bits=I,W.w_size=1<<W.w_bits,W.w_mask=W.w_size-1,W.hash_bits=E+7,W.hash_size=1<<W.hash_bits,W.hash_mask=W.hash_size-1,W.hash_shift=~~((W.hash_bits+A-1)/A),W.window=new o.Buf8(2*W.w_size),W.head=new o.Buf16(W.hash_size),W.prev=new o.Buf16(W.w_size),W.lit_bufsize=1<<E+6,W.pending_buf_size=4*W.lit_bufsize,W.pending_buf=new o.Buf8(W.pending_buf_size),W.d_buf=1*W.lit_bufsize,W.l_buf=3*W.lit_bufsize,W.level=M,W.strategy=R,W.method=L,Ze(d)}r=[new pe(0,0,0,0,function(d,M){var L=65535;for(L>d.pending_buf_size-5&&(L=d.pending_buf_size-5);;){if(d.lookahead<=1){if(we(d),d.lookahead===0&&M===u)return m;if(d.lookahead===0)break}d.strstart+=d.lookahead,d.lookahead=0;var I=d.block_start+L;if((d.strstart===0||d.strstart>=I)&&(d.lookahead=d.strstart-I,d.strstart=I,P(d,!1),d.strm.avail_out===0)||d.strstart-d.block_start>=d.w_size-Z&&(P(d,!1),d.strm.avail_out===0))return m}return d.insert=0,M===f?(P(d,!0),d.strm.avail_out===0?oe:j):(d.strstart>d.block_start&&(P(d,!1),d.strm.avail_out),m)}),new pe(4,4,8,4,Re),new pe(4,5,16,8,Re),new pe(4,6,32,32,Re),new pe(4,4,16,16,ue),new pe(8,16,32,32,ue),new pe(8,16,128,128,ue),new pe(8,32,128,256,ue),new pe(32,128,258,1024,ue),new pe(32,258,258,4096,ue)],s.deflateInit=function(d,M){return ze(d,M,_,15,8,0)},s.deflateInit2=ze,s.deflateReset=Ze,s.deflateResetKeep=Ee,s.deflateSetHeader=function(d,M){return d&&d.state?d.state.wrap!==2?w:(d.state.gzhead=M,p):w},s.deflate=function(d,M){var L,I,E,R;if(!d||!d.state||5<M||M<0)return d?X(d,w):w;if(I=d.state,!d.output||!d.input&&d.avail_in!==0||I.status===666&&M!==f)return X(d,d.avail_out===0?-5:w);if(I.strm=d,L=I.last_flush,I.last_flush=M,I.status===S)if(I.wrap===2)d.adler=0,te(I,31),te(I,139),te(I,8),I.gzhead?(te(I,(I.gzhead.text?1:0)+(I.gzhead.hcrc?2:0)+(I.gzhead.extra?4:0)+(I.gzhead.name?8:0)+(I.gzhead.comment?16:0)),te(I,255&I.gzhead.time),te(I,I.gzhead.time>>8&255),te(I,I.gzhead.time>>16&255),te(I,I.gzhead.time>>24&255),te(I,I.level===9?2:2<=I.strategy||I.level<2?4:0),te(I,255&I.gzhead.os),I.gzhead.extra&&I.gzhead.extra.length&&(te(I,255&I.gzhead.extra.length),te(I,I.gzhead.extra.length>>8&255)),I.gzhead.hcrc&&(d.adler=c(d.adler,I.pending_buf,I.pending,0)),I.gzindex=0,I.status=69):(te(I,0),te(I,0),te(I,0),te(I,0),te(I,0),te(I,I.level===9?2:2<=I.strategy||I.level<2?4:0),te(I,3),I.status=F);else{var z=_+(I.w_bits-8<<4)<<8;z|=(2<=I.strategy||I.level<2?0:I.level<6?1:I.level===6?2:3)<<6,I.strstart!==0&&(z|=32),z+=31-z%31,I.status=F,K(I,z),I.strstart!==0&&(K(I,d.adler>>>16),K(I,65535&d.adler)),d.adler=1}if(I.status===69)if(I.gzhead.extra){for(E=I.pending;I.gzindex<(65535&I.gzhead.extra.length)&&(I.pending!==I.pending_buf_size||(I.gzhead.hcrc&&I.pending>E&&(d.adler=c(d.adler,I.pending_buf,I.pending-E,E)),O(d),E=I.pending,I.pending!==I.pending_buf_size));)te(I,255&I.gzhead.extra[I.gzindex]),I.gzindex++;I.gzhead.hcrc&&I.pending>E&&(d.adler=c(d.adler,I.pending_buf,I.pending-E,E)),I.gzindex===I.gzhead.extra.length&&(I.gzindex=0,I.status=73)}else I.status=73;if(I.status===73)if(I.gzhead.name){E=I.pending;do{if(I.pending===I.pending_buf_size&&(I.gzhead.hcrc&&I.pending>E&&(d.adler=c(d.adler,I.pending_buf,I.pending-E,E)),O(d),E=I.pending,I.pending===I.pending_buf_size)){R=1;break}R=I.gzindex<I.gzhead.name.length?255&I.gzhead.name.charCodeAt(I.gzindex++):0,te(I,R)}while(R!==0);I.gzhead.hcrc&&I.pending>E&&(d.adler=c(d.adler,I.pending_buf,I.pending-E,E)),R===0&&(I.gzindex=0,I.status=91)}else I.status=91;if(I.status===91)if(I.gzhead.comment){E=I.pending;do{if(I.pending===I.pending_buf_size&&(I.gzhead.hcrc&&I.pending>E&&(d.adler=c(d.adler,I.pending_buf,I.pending-E,E)),O(d),E=I.pending,I.pending===I.pending_buf_size)){R=1;break}R=I.gzindex<I.gzhead.comment.length?255&I.gzhead.comment.charCodeAt(I.gzindex++):0,te(I,R)}while(R!==0);I.gzhead.hcrc&&I.pending>E&&(d.adler=c(d.adler,I.pending_buf,I.pending-E,E)),R===0&&(I.status=103)}else I.status=103;if(I.status===103&&(I.gzhead.hcrc?(I.pending+2>I.pending_buf_size&&O(d),I.pending+2<=I.pending_buf_size&&(te(I,255&d.adler),te(I,d.adler>>8&255),d.adler=0,I.status=F)):I.status=F),I.pending!==0){if(O(d),d.avail_out===0)return I.last_flush=-1,p}else if(d.avail_in===0&&$(M)<=$(L)&&M!==f)return X(d,-5);if(I.status===666&&d.avail_in!==0)return X(d,-5);if(d.avail_in!==0||I.lookahead!==0||M!==u&&I.status!==666){var W=I.strategy===2?function(N,V){for(var J;;){if(N.lookahead===0&&(we(N),N.lookahead===0)){if(V===u)return m;break}if(N.match_length=0,J=a._tr_tally(N,0,N.window[N.strstart]),N.lookahead--,N.strstart++,J&&(P(N,!1),N.strm.avail_out===0))return m}return N.insert=0,V===f?(P(N,!0),N.strm.avail_out===0?oe:j):N.last_lit&&(P(N,!1),N.strm.avail_out===0)?m:B}(I,M):I.strategy===3?function(N,V){for(var J,q,ne,Ie,fe=N.window;;){if(N.lookahead<=U){if(we(N),N.lookahead<=U&&V===u)return m;if(N.lookahead===0)break}if(N.match_length=0,N.lookahead>=A&&0<N.strstart&&(q=fe[ne=N.strstart-1])===fe[++ne]&&q===fe[++ne]&&q===fe[++ne]){Ie=N.strstart+U;do;while(q===fe[++ne]&&q===fe[++ne]&&q===fe[++ne]&&q===fe[++ne]&&q===fe[++ne]&&q===fe[++ne]&&q===fe[++ne]&&q===fe[++ne]&&ne<Ie);N.match_length=U-(Ie-ne),N.match_length>N.lookahead&&(N.match_length=N.lookahead)}if(N.match_length>=A?(J=a._tr_tally(N,1,N.match_length-A),N.lookahead-=N.match_length,N.strstart+=N.match_length,N.match_length=0):(J=a._tr_tally(N,0,N.window[N.strstart]),N.lookahead--,N.strstart++),J&&(P(N,!1),N.strm.avail_out===0))return m}return N.insert=0,V===f?(P(N,!0),N.strm.avail_out===0?oe:j):N.last_lit&&(P(N,!1),N.strm.avail_out===0)?m:B}(I,M):r[I.level].func(I,M);if(W!==oe&&W!==j||(I.status=666),W===m||W===oe)return d.avail_out===0&&(I.last_flush=-1),p;if(W===B&&(M===1?a._tr_align(I):M!==5&&(a._tr_stored_block(I,0,0,!1),M===3&&(ee(I.head),I.lookahead===0&&(I.strstart=0,I.block_start=0,I.insert=0))),O(d),d.avail_out===0))return I.last_flush=-1,p}return M!==f?p:I.wrap<=0?1:(I.wrap===2?(te(I,255&d.adler),te(I,d.adler>>8&255),te(I,d.adler>>16&255),te(I,d.adler>>24&255),te(I,255&d.total_in),te(I,d.total_in>>8&255),te(I,d.total_in>>16&255),te(I,d.total_in>>24&255)):(K(I,d.adler>>>16),K(I,65535&d.adler)),O(d),0<I.wrap&&(I.wrap=-I.wrap),I.pending!==0?p:1)},s.deflateEnd=function(d){var M;return d&&d.state?(M=d.state.status)!==S&&M!==69&&M!==73&&M!==91&&M!==103&&M!==F&&M!==666?X(d,w):(d.state=null,M===F?X(d,-3):p):w},s.deflateSetDictionary=function(d,M){var L,I,E,R,z,W,N,V,J=M.length;if(!d||!d.state||(R=(L=d.state).wrap)===2||R===1&&L.status!==S||L.lookahead)return w;for(R===1&&(d.adler=l(d.adler,M,J,0)),L.wrap=0,J>=L.w_size&&(R===0&&(ee(L.head),L.strstart=0,L.block_start=0,L.insert=0),V=new o.Buf8(L.w_size),o.arraySet(V,M,J-L.w_size,L.w_size,0),M=V,J=L.w_size),z=d.avail_in,W=d.next_in,N=d.input,d.avail_in=J,d.next_in=0,d.input=M,we(L);L.lookahead>=A;){for(I=L.strstart,E=L.lookahead-(A-1);L.ins_h=(L.ins_h<<L.hash_shift^L.window[I+A-1])&L.hash_mask,L.prev[I&L.w_mask]=L.head[L.ins_h],L.head[L.ins_h]=I,I++,--E;);L.strstart=I,L.lookahead=A-1,we(L)}return L.strstart+=L.lookahead,L.block_start=L.strstart,L.insert=L.lookahead,L.lookahead=0,L.match_length=L.prev_length=A-1,L.match_available=0,d.next_in=W,d.input=N,d.avail_in=z,L.wrap=R,p},s.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(t,i,s){i.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(t,i,s){i.exports=function(r,o){var a,l,c,h,u,f,p,w,g,y,v,_,b,C,k,T,x,D,A,U,Z,S,F,m,B;a=r.state,l=r.next_in,m=r.input,c=l+(r.avail_in-5),h=r.next_out,B=r.output,u=h-(o-r.avail_out),f=h+(r.avail_out-257),p=a.dmax,w=a.wsize,g=a.whave,y=a.wnext,v=a.window,_=a.hold,b=a.bits,C=a.lencode,k=a.distcode,T=(1<<a.lenbits)-1,x=(1<<a.distbits)-1;e:do{b<15&&(_+=m[l++]<<b,b+=8,_+=m[l++]<<b,b+=8),D=C[_&T];t:for(;;){if(_>>>=A=D>>>24,b-=A,(A=D>>>16&255)===0)B[h++]=65535&D;else{if(!(16&A)){if(!(64&A)){D=C[(65535&D)+(_&(1<<A)-1)];continue t}if(32&A){a.mode=12;break e}r.msg="invalid literal/length code",a.mode=30;break e}U=65535&D,(A&=15)&&(b<A&&(_+=m[l++]<<b,b+=8),U+=_&(1<<A)-1,_>>>=A,b-=A),b<15&&(_+=m[l++]<<b,b+=8,_+=m[l++]<<b,b+=8),D=k[_&x];n:for(;;){if(_>>>=A=D>>>24,b-=A,!(16&(A=D>>>16&255))){if(!(64&A)){D=k[(65535&D)+(_&(1<<A)-1)];continue n}r.msg="invalid distance code",a.mode=30;break e}if(Z=65535&D,b<(A&=15)&&(_+=m[l++]<<b,(b+=8)<A&&(_+=m[l++]<<b,b+=8)),p<(Z+=_&(1<<A)-1)){r.msg="invalid distance too far back",a.mode=30;break e}if(_>>>=A,b-=A,(A=h-u)<Z){if(g<(A=Z-A)&&a.sane){r.msg="invalid distance too far back",a.mode=30;break e}if(F=v,(S=0)===y){if(S+=w-A,A<U){for(U-=A;B[h++]=v[S++],--A;);S=h-Z,F=B}}else if(y<A){if(S+=w+y-A,(A-=y)<U){for(U-=A;B[h++]=v[S++],--A;);if(S=0,y<U){for(U-=A=y;B[h++]=v[S++],--A;);S=h-Z,F=B}}}else if(S+=y-A,A<U){for(U-=A;B[h++]=v[S++],--A;);S=h-Z,F=B}for(;2<U;)B[h++]=F[S++],B[h++]=F[S++],B[h++]=F[S++],U-=3;U&&(B[h++]=F[S++],1<U&&(B[h++]=F[S++]))}else{for(S=h-Z;B[h++]=B[S++],B[h++]=B[S++],B[h++]=B[S++],2<(U-=3););U&&(B[h++]=B[S++],1<U&&(B[h++]=B[S++]))}break}}break}}while(l<c&&h<f);l-=U=b>>3,_&=(1<<(b-=U<<3))-1,r.next_in=l,r.next_out=h,r.avail_in=l<c?c-l+5:5-(l-c),r.avail_out=h<f?f-h+257:257-(h-f),a.hold=_,a.bits=b}},{}],49:[function(t,i,s){var r=t("../utils/common"),o=t("./adler32"),a=t("./crc32"),l=t("./inffast"),c=t("./inftrees"),h=1,u=2,f=0,p=-2,w=1,g=852,y=592;function v(S){return(S>>>24&255)+(S>>>8&65280)+((65280&S)<<8)+((255&S)<<24)}function _(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new r.Buf16(320),this.work=new r.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function b(S){var F;return S&&S.state?(F=S.state,S.total_in=S.total_out=F.total=0,S.msg="",F.wrap&&(S.adler=1&F.wrap),F.mode=w,F.last=0,F.havedict=0,F.dmax=32768,F.head=null,F.hold=0,F.bits=0,F.lencode=F.lendyn=new r.Buf32(g),F.distcode=F.distdyn=new r.Buf32(y),F.sane=1,F.back=-1,f):p}function C(S){var F;return S&&S.state?((F=S.state).wsize=0,F.whave=0,F.wnext=0,b(S)):p}function k(S,F){var m,B;return S&&S.state?(B=S.state,F<0?(m=0,F=-F):(m=1+(F>>4),F<48&&(F&=15)),F&&(F<8||15<F)?p:(B.window!==null&&B.wbits!==F&&(B.window=null),B.wrap=m,B.wbits=F,C(S))):p}function T(S,F){var m,B;return S?(B=new _,(S.state=B).window=null,(m=k(S,F))!==f&&(S.state=null),m):p}var x,D,A=!0;function U(S){if(A){var F;for(x=new r.Buf32(512),D=new r.Buf32(32),F=0;F<144;)S.lens[F++]=8;for(;F<256;)S.lens[F++]=9;for(;F<280;)S.lens[F++]=7;for(;F<288;)S.lens[F++]=8;for(c(h,S.lens,0,288,x,0,S.work,{bits:9}),F=0;F<32;)S.lens[F++]=5;c(u,S.lens,0,32,D,0,S.work,{bits:5}),A=!1}S.lencode=x,S.lenbits=9,S.distcode=D,S.distbits=5}function Z(S,F,m,B){var oe,j=S.state;return j.window===null&&(j.wsize=1<<j.wbits,j.wnext=0,j.whave=0,j.window=new r.Buf8(j.wsize)),B>=j.wsize?(r.arraySet(j.window,F,m-j.wsize,j.wsize,0),j.wnext=0,j.whave=j.wsize):(B<(oe=j.wsize-j.wnext)&&(oe=B),r.arraySet(j.window,F,m-B,oe,j.wnext),(B-=oe)?(r.arraySet(j.window,F,m-B,B,0),j.wnext=B,j.whave=j.wsize):(j.wnext+=oe,j.wnext===j.wsize&&(j.wnext=0),j.whave<j.wsize&&(j.whave+=oe))),0}s.inflateReset=C,s.inflateReset2=k,s.inflateResetKeep=b,s.inflateInit=function(S){return T(S,15)},s.inflateInit2=T,s.inflate=function(S,F){var m,B,oe,j,X,$,ee,O,P,te,K,G,we,Re,ue,pe,Te,Ee,Ze,ze,d,M,L,I,E=0,R=new r.Buf8(4),z=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!S||!S.state||!S.output||!S.input&&S.avail_in!==0)return p;(m=S.state).mode===12&&(m.mode=13),X=S.next_out,oe=S.output,ee=S.avail_out,j=S.next_in,B=S.input,$=S.avail_in,O=m.hold,P=m.bits,te=$,K=ee,M=f;e:for(;;)switch(m.mode){case w:if(m.wrap===0){m.mode=13;break}for(;P<16;){if($===0)break e;$--,O+=B[j++]<<P,P+=8}if(2&m.wrap&&O===35615){R[m.check=0]=255&O,R[1]=O>>>8&255,m.check=a(m.check,R,2,0),P=O=0,m.mode=2;break}if(m.flags=0,m.head&&(m.head.done=!1),!(1&m.wrap)||(((255&O)<<8)+(O>>8))%31){S.msg="incorrect header check",m.mode=30;break}if((15&O)!=8){S.msg="unknown compression method",m.mode=30;break}if(P-=4,d=8+(15&(O>>>=4)),m.wbits===0)m.wbits=d;else if(d>m.wbits){S.msg="invalid window size",m.mode=30;break}m.dmax=1<<d,S.adler=m.check=1,m.mode=512&O?10:12,P=O=0;break;case 2:for(;P<16;){if($===0)break e;$--,O+=B[j++]<<P,P+=8}if(m.flags=O,(255&m.flags)!=8){S.msg="unknown compression method",m.mode=30;break}if(57344&m.flags){S.msg="unknown header flags set",m.mode=30;break}m.head&&(m.head.text=O>>8&1),512&m.flags&&(R[0]=255&O,R[1]=O>>>8&255,m.check=a(m.check,R,2,0)),P=O=0,m.mode=3;case 3:for(;P<32;){if($===0)break e;$--,O+=B[j++]<<P,P+=8}m.head&&(m.head.time=O),512&m.flags&&(R[0]=255&O,R[1]=O>>>8&255,R[2]=O>>>16&255,R[3]=O>>>24&255,m.check=a(m.check,R,4,0)),P=O=0,m.mode=4;case 4:for(;P<16;){if($===0)break e;$--,O+=B[j++]<<P,P+=8}m.head&&(m.head.xflags=255&O,m.head.os=O>>8),512&m.flags&&(R[0]=255&O,R[1]=O>>>8&255,m.check=a(m.check,R,2,0)),P=O=0,m.mode=5;case 5:if(1024&m.flags){for(;P<16;){if($===0)break e;$--,O+=B[j++]<<P,P+=8}m.length=O,m.head&&(m.head.extra_len=O),512&m.flags&&(R[0]=255&O,R[1]=O>>>8&255,m.check=a(m.check,R,2,0)),P=O=0}else m.head&&(m.head.extra=null);m.mode=6;case 6:if(1024&m.flags&&($<(G=m.length)&&(G=$),G&&(m.head&&(d=m.head.extra_len-m.length,m.head.extra||(m.head.extra=new Array(m.head.extra_len)),r.arraySet(m.head.extra,B,j,G,d)),512&m.flags&&(m.check=a(m.check,B,G,j)),$-=G,j+=G,m.length-=G),m.length))break e;m.length=0,m.mode=7;case 7:if(2048&m.flags){if($===0)break e;for(G=0;d=B[j+G++],m.head&&d&&m.length<65536&&(m.head.name+=String.fromCharCode(d)),d&&G<$;);if(512&m.flags&&(m.check=a(m.check,B,G,j)),$-=G,j+=G,d)break e}else m.head&&(m.head.name=null);m.length=0,m.mode=8;case 8:if(4096&m.flags){if($===0)break e;for(G=0;d=B[j+G++],m.head&&d&&m.length<65536&&(m.head.comment+=String.fromCharCode(d)),d&&G<$;);if(512&m.flags&&(m.check=a(m.check,B,G,j)),$-=G,j+=G,d)break e}else m.head&&(m.head.comment=null);m.mode=9;case 9:if(512&m.flags){for(;P<16;){if($===0)break e;$--,O+=B[j++]<<P,P+=8}if(O!==(65535&m.check)){S.msg="header crc mismatch",m.mode=30;break}P=O=0}m.head&&(m.head.hcrc=m.flags>>9&1,m.head.done=!0),S.adler=m.check=0,m.mode=12;break;case 10:for(;P<32;){if($===0)break e;$--,O+=B[j++]<<P,P+=8}S.adler=m.check=v(O),P=O=0,m.mode=11;case 11:if(m.havedict===0)return S.next_out=X,S.avail_out=ee,S.next_in=j,S.avail_in=$,m.hold=O,m.bits=P,2;S.adler=m.check=1,m.mode=12;case 12:if(F===5||F===6)break e;case 13:if(m.last){O>>>=7&P,P-=7&P,m.mode=27;break}for(;P<3;){if($===0)break e;$--,O+=B[j++]<<P,P+=8}switch(m.last=1&O,P-=1,3&(O>>>=1)){case 0:m.mode=14;break;case 1:if(U(m),m.mode=20,F!==6)break;O>>>=2,P-=2;break e;case 2:m.mode=17;break;case 3:S.msg="invalid block type",m.mode=30}O>>>=2,P-=2;break;case 14:for(O>>>=7&P,P-=7&P;P<32;){if($===0)break e;$--,O+=B[j++]<<P,P+=8}if((65535&O)!=(O>>>16^65535)){S.msg="invalid stored block lengths",m.mode=30;break}if(m.length=65535&O,P=O=0,m.mode=15,F===6)break e;case 15:m.mode=16;case 16:if(G=m.length){if($<G&&(G=$),ee<G&&(G=ee),G===0)break e;r.arraySet(oe,B,j,G,X),$-=G,j+=G,ee-=G,X+=G,m.length-=G;break}m.mode=12;break;case 17:for(;P<14;){if($===0)break e;$--,O+=B[j++]<<P,P+=8}if(m.nlen=257+(31&O),O>>>=5,P-=5,m.ndist=1+(31&O),O>>>=5,P-=5,m.ncode=4+(15&O),O>>>=4,P-=4,286<m.nlen||30<m.ndist){S.msg="too many length or distance symbols",m.mode=30;break}m.have=0,m.mode=18;case 18:for(;m.have<m.ncode;){for(;P<3;){if($===0)break e;$--,O+=B[j++]<<P,P+=8}m.lens[z[m.have++]]=7&O,O>>>=3,P-=3}for(;m.have<19;)m.lens[z[m.have++]]=0;if(m.lencode=m.lendyn,m.lenbits=7,L={bits:m.lenbits},M=c(0,m.lens,0,19,m.lencode,0,m.work,L),m.lenbits=L.bits,M){S.msg="invalid code lengths set",m.mode=30;break}m.have=0,m.mode=19;case 19:for(;m.have<m.nlen+m.ndist;){for(;pe=(E=m.lencode[O&(1<<m.lenbits)-1])>>>16&255,Te=65535&E,!((ue=E>>>24)<=P);){if($===0)break e;$--,O+=B[j++]<<P,P+=8}if(Te<16)O>>>=ue,P-=ue,m.lens[m.have++]=Te;else{if(Te===16){for(I=ue+2;P<I;){if($===0)break e;$--,O+=B[j++]<<P,P+=8}if(O>>>=ue,P-=ue,m.have===0){S.msg="invalid bit length repeat",m.mode=30;break}d=m.lens[m.have-1],G=3+(3&O),O>>>=2,P-=2}else if(Te===17){for(I=ue+3;P<I;){if($===0)break e;$--,O+=B[j++]<<P,P+=8}P-=ue,d=0,G=3+(7&(O>>>=ue)),O>>>=3,P-=3}else{for(I=ue+7;P<I;){if($===0)break e;$--,O+=B[j++]<<P,P+=8}P-=ue,d=0,G=11+(127&(O>>>=ue)),O>>>=7,P-=7}if(m.have+G>m.nlen+m.ndist){S.msg="invalid bit length repeat",m.mode=30;break}for(;G--;)m.lens[m.have++]=d}}if(m.mode===30)break;if(m.lens[256]===0){S.msg="invalid code -- missing end-of-block",m.mode=30;break}if(m.lenbits=9,L={bits:m.lenbits},M=c(h,m.lens,0,m.nlen,m.lencode,0,m.work,L),m.lenbits=L.bits,M){S.msg="invalid literal/lengths set",m.mode=30;break}if(m.distbits=6,m.distcode=m.distdyn,L={bits:m.distbits},M=c(u,m.lens,m.nlen,m.ndist,m.distcode,0,m.work,L),m.distbits=L.bits,M){S.msg="invalid distances set",m.mode=30;break}if(m.mode=20,F===6)break e;case 20:m.mode=21;case 21:if(6<=$&&258<=ee){S.next_out=X,S.avail_out=ee,S.next_in=j,S.avail_in=$,m.hold=O,m.bits=P,l(S,K),X=S.next_out,oe=S.output,ee=S.avail_out,j=S.next_in,B=S.input,$=S.avail_in,O=m.hold,P=m.bits,m.mode===12&&(m.back=-1);break}for(m.back=0;pe=(E=m.lencode[O&(1<<m.lenbits)-1])>>>16&255,Te=65535&E,!((ue=E>>>24)<=P);){if($===0)break e;$--,O+=B[j++]<<P,P+=8}if(pe&&!(240&pe)){for(Ee=ue,Ze=pe,ze=Te;pe=(E=m.lencode[ze+((O&(1<<Ee+Ze)-1)>>Ee)])>>>16&255,Te=65535&E,!(Ee+(ue=E>>>24)<=P);){if($===0)break e;$--,O+=B[j++]<<P,P+=8}O>>>=Ee,P-=Ee,m.back+=Ee}if(O>>>=ue,P-=ue,m.back+=ue,m.length=Te,pe===0){m.mode=26;break}if(32&pe){m.back=-1,m.mode=12;break}if(64&pe){S.msg="invalid literal/length code",m.mode=30;break}m.extra=15&pe,m.mode=22;case 22:if(m.extra){for(I=m.extra;P<I;){if($===0)break e;$--,O+=B[j++]<<P,P+=8}m.length+=O&(1<<m.extra)-1,O>>>=m.extra,P-=m.extra,m.back+=m.extra}m.was=m.length,m.mode=23;case 23:for(;pe=(E=m.distcode[O&(1<<m.distbits)-1])>>>16&255,Te=65535&E,!((ue=E>>>24)<=P);){if($===0)break e;$--,O+=B[j++]<<P,P+=8}if(!(240&pe)){for(Ee=ue,Ze=pe,ze=Te;pe=(E=m.distcode[ze+((O&(1<<Ee+Ze)-1)>>Ee)])>>>16&255,Te=65535&E,!(Ee+(ue=E>>>24)<=P);){if($===0)break e;$--,O+=B[j++]<<P,P+=8}O>>>=Ee,P-=Ee,m.back+=Ee}if(O>>>=ue,P-=ue,m.back+=ue,64&pe){S.msg="invalid distance code",m.mode=30;break}m.offset=Te,m.extra=15&pe,m.mode=24;case 24:if(m.extra){for(I=m.extra;P<I;){if($===0)break e;$--,O+=B[j++]<<P,P+=8}m.offset+=O&(1<<m.extra)-1,O>>>=m.extra,P-=m.extra,m.back+=m.extra}if(m.offset>m.dmax){S.msg="invalid distance too far back",m.mode=30;break}m.mode=25;case 25:if(ee===0)break e;if(G=K-ee,m.offset>G){if((G=m.offset-G)>m.whave&&m.sane){S.msg="invalid distance too far back",m.mode=30;break}we=G>m.wnext?(G-=m.wnext,m.wsize-G):m.wnext-G,G>m.length&&(G=m.length),Re=m.window}else Re=oe,we=X-m.offset,G=m.length;for(ee<G&&(G=ee),ee-=G,m.length-=G;oe[X++]=Re[we++],--G;);m.length===0&&(m.mode=21);break;case 26:if(ee===0)break e;oe[X++]=m.length,ee--,m.mode=21;break;case 27:if(m.wrap){for(;P<32;){if($===0)break e;$--,O|=B[j++]<<P,P+=8}if(K-=ee,S.total_out+=K,m.total+=K,K&&(S.adler=m.check=m.flags?a(m.check,oe,K,X-K):o(m.check,oe,K,X-K)),K=ee,(m.flags?O:v(O))!==m.check){S.msg="incorrect data check",m.mode=30;break}P=O=0}m.mode=28;case 28:if(m.wrap&&m.flags){for(;P<32;){if($===0)break e;$--,O+=B[j++]<<P,P+=8}if(O!==(4294967295&m.total)){S.msg="incorrect length check",m.mode=30;break}P=O=0}m.mode=29;case 29:M=1;break e;case 30:M=-3;break e;case 31:return-4;case 32:default:return p}return S.next_out=X,S.avail_out=ee,S.next_in=j,S.avail_in=$,m.hold=O,m.bits=P,(m.wsize||K!==S.avail_out&&m.mode<30&&(m.mode<27||F!==4))&&Z(S,S.output,S.next_out,K-S.avail_out)?(m.mode=31,-4):(te-=S.avail_in,K-=S.avail_out,S.total_in+=te,S.total_out+=K,m.total+=K,m.wrap&&K&&(S.adler=m.check=m.flags?a(m.check,oe,K,S.next_out-K):o(m.check,oe,K,S.next_out-K)),S.data_type=m.bits+(m.last?64:0)+(m.mode===12?128:0)+(m.mode===20||m.mode===15?256:0),(te==0&&K===0||F===4)&&M===f&&(M=-5),M)},s.inflateEnd=function(S){if(!S||!S.state)return p;var F=S.state;return F.window&&(F.window=null),S.state=null,f},s.inflateGetHeader=function(S,F){var m;return S&&S.state&&2&(m=S.state).wrap?((m.head=F).done=!1,f):p},s.inflateSetDictionary=function(S,F){var m,B=F.length;return S&&S.state?(m=S.state).wrap!==0&&m.mode!==11?p:m.mode===11&&o(1,F,B,0)!==m.check?-3:Z(S,F,B,B)?(m.mode=31,-4):(m.havedict=1,f):p},s.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(t,i,s){var r=t("../utils/common"),o=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],a=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],l=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],c=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];i.exports=function(h,u,f,p,w,g,y,v){var _,b,C,k,T,x,D,A,U,Z=v.bits,S=0,F=0,m=0,B=0,oe=0,j=0,X=0,$=0,ee=0,O=0,P=null,te=0,K=new r.Buf16(16),G=new r.Buf16(16),we=null,Re=0;for(S=0;S<=15;S++)K[S]=0;for(F=0;F<p;F++)K[u[f+F]]++;for(oe=Z,B=15;1<=B&&K[B]===0;B--);if(B<oe&&(oe=B),B===0)return w[g++]=20971520,w[g++]=20971520,v.bits=1,0;for(m=1;m<B&&K[m]===0;m++);for(oe<m&&(oe=m),S=$=1;S<=15;S++)if($<<=1,($-=K[S])<0)return-1;if(0<$&&(h===0||B!==1))return-1;for(G[1]=0,S=1;S<15;S++)G[S+1]=G[S]+K[S];for(F=0;F<p;F++)u[f+F]!==0&&(y[G[u[f+F]]++]=F);if(x=h===0?(P=we=y,19):h===1?(P=o,te-=257,we=a,Re-=257,256):(P=l,we=c,-1),S=m,T=g,X=F=O=0,C=-1,k=(ee=1<<(j=oe))-1,h===1&&852<ee||h===2&&592<ee)return 1;for(;;){for(D=S-X,U=y[F]<x?(A=0,y[F]):y[F]>x?(A=we[Re+y[F]],P[te+y[F]]):(A=96,0),_=1<<S-X,m=b=1<<j;w[T+(O>>X)+(b-=_)]=D<<24|A<<16|U|0,b!==0;);for(_=1<<S-1;O&_;)_>>=1;if(_!==0?(O&=_-1,O+=_):O=0,F++,--K[S]==0){if(S===B)break;S=u[f+y[F]]}if(oe<S&&(O&k)!==C){for(X===0&&(X=oe),T+=m,$=1<<(j=S-X);j+X<B&&!(($-=K[j+X])<=0);)j++,$<<=1;if(ee+=1<<j,h===1&&852<ee||h===2&&592<ee)return 1;w[C=O&k]=oe<<24|j<<16|T-g|0}}return O!==0&&(w[T+O]=S-X<<24|64<<16|0),v.bits=oe,0}},{"../utils/common":41}],51:[function(t,i,s){i.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(t,i,s){var r=t("../utils/common"),o=0,a=1;function l(E){for(var R=E.length;0<=--R;)E[R]=0}var c=0,h=29,u=256,f=u+1+h,p=30,w=19,g=2*f+1,y=15,v=16,_=7,b=256,C=16,k=17,T=18,x=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],D=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],A=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],U=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],Z=new Array(2*(f+2));l(Z);var S=new Array(2*p);l(S);var F=new Array(512);l(F);var m=new Array(256);l(m);var B=new Array(h);l(B);var oe,j,X,$=new Array(p);function ee(E,R,z,W,N){this.static_tree=E,this.extra_bits=R,this.extra_base=z,this.elems=W,this.max_length=N,this.has_stree=E&&E.length}function O(E,R){this.dyn_tree=E,this.max_code=0,this.stat_desc=R}function P(E){return E<256?F[E]:F[256+(E>>>7)]}function te(E,R){E.pending_buf[E.pending++]=255&R,E.pending_buf[E.pending++]=R>>>8&255}function K(E,R,z){E.bi_valid>v-z?(E.bi_buf|=R<<E.bi_valid&65535,te(E,E.bi_buf),E.bi_buf=R>>v-E.bi_valid,E.bi_valid+=z-v):(E.bi_buf|=R<<E.bi_valid&65535,E.bi_valid+=z)}function G(E,R,z){K(E,z[2*R],z[2*R+1])}function we(E,R){for(var z=0;z|=1&E,E>>>=1,z<<=1,0<--R;);return z>>>1}function Re(E,R,z){var W,N,V=new Array(y+1),J=0;for(W=1;W<=y;W++)V[W]=J=J+z[W-1]<<1;for(N=0;N<=R;N++){var q=E[2*N+1];q!==0&&(E[2*N]=we(V[q]++,q))}}function ue(E){var R;for(R=0;R<f;R++)E.dyn_ltree[2*R]=0;for(R=0;R<p;R++)E.dyn_dtree[2*R]=0;for(R=0;R<w;R++)E.bl_tree[2*R]=0;E.dyn_ltree[2*b]=1,E.opt_len=E.static_len=0,E.last_lit=E.matches=0}function pe(E){8<E.bi_valid?te(E,E.bi_buf):0<E.bi_valid&&(E.pending_buf[E.pending++]=E.bi_buf),E.bi_buf=0,E.bi_valid=0}function Te(E,R,z,W){var N=2*R,V=2*z;return E[N]<E[V]||E[N]===E[V]&&W[R]<=W[z]}function Ee(E,R,z){for(var W=E.heap[z],N=z<<1;N<=E.heap_len&&(N<E.heap_len&&Te(R,E.heap[N+1],E.heap[N],E.depth)&&N++,!Te(R,W,E.heap[N],E.depth));)E.heap[z]=E.heap[N],z=N,N<<=1;E.heap[z]=W}function Ze(E,R,z){var W,N,V,J,q=0;if(E.last_lit!==0)for(;W=E.pending_buf[E.d_buf+2*q]<<8|E.pending_buf[E.d_buf+2*q+1],N=E.pending_buf[E.l_buf+q],q++,W===0?G(E,N,R):(G(E,(V=m[N])+u+1,R),(J=x[V])!==0&&K(E,N-=B[V],J),G(E,V=P(--W),z),(J=D[V])!==0&&K(E,W-=$[V],J)),q<E.last_lit;);G(E,b,R)}function ze(E,R){var z,W,N,V=R.dyn_tree,J=R.stat_desc.static_tree,q=R.stat_desc.has_stree,ne=R.stat_desc.elems,Ie=-1;for(E.heap_len=0,E.heap_max=g,z=0;z<ne;z++)V[2*z]!==0?(E.heap[++E.heap_len]=Ie=z,E.depth[z]=0):V[2*z+1]=0;for(;E.heap_len<2;)V[2*(N=E.heap[++E.heap_len]=Ie<2?++Ie:0)]=1,E.depth[N]=0,E.opt_len--,q&&(E.static_len-=J[2*N+1]);for(R.max_code=Ie,z=E.heap_len>>1;1<=z;z--)Ee(E,V,z);for(N=ne;z=E.heap[1],E.heap[1]=E.heap[E.heap_len--],Ee(E,V,1),W=E.heap[1],E.heap[--E.heap_max]=z,E.heap[--E.heap_max]=W,V[2*N]=V[2*z]+V[2*W],E.depth[N]=(E.depth[z]>=E.depth[W]?E.depth[z]:E.depth[W])+1,V[2*z+1]=V[2*W+1]=N,E.heap[1]=N++,Ee(E,V,1),2<=E.heap_len;);E.heap[--E.heap_max]=E.heap[1],function(fe,Je){var di,dt,hi,xe,is,xr,wt=Je.dyn_tree,Ta=Je.max_code,$d=Je.stat_desc.static_tree,Wd=Je.stat_desc.has_stree,jd=Je.stat_desc.extra_bits,Aa=Je.stat_desc.extra_base,fi=Je.stat_desc.max_length,ss=0;for(xe=0;xe<=y;xe++)fe.bl_count[xe]=0;for(wt[2*fe.heap[fe.heap_max]+1]=0,di=fe.heap_max+1;di<g;di++)fi<(xe=wt[2*wt[2*(dt=fe.heap[di])+1]+1]+1)&&(xe=fi,ss++),wt[2*dt+1]=xe,Ta<dt||(fe.bl_count[xe]++,is=0,Aa<=dt&&(is=jd[dt-Aa]),xr=wt[2*dt],fe.opt_len+=xr*(xe+is),Wd&&(fe.static_len+=xr*($d[2*dt+1]+is)));if(ss!==0){do{for(xe=fi-1;fe.bl_count[xe]===0;)xe--;fe.bl_count[xe]--,fe.bl_count[xe+1]+=2,fe.bl_count[fi]--,ss-=2}while(0<ss);for(xe=fi;xe!==0;xe--)for(dt=fe.bl_count[xe];dt!==0;)Ta<(hi=fe.heap[--di])||(wt[2*hi+1]!==xe&&(fe.opt_len+=(xe-wt[2*hi+1])*wt[2*hi],wt[2*hi+1]=xe),dt--)}}(E,R),Re(V,Ie,E.bl_count)}function d(E,R,z){var W,N,V=-1,J=R[1],q=0,ne=7,Ie=4;for(J===0&&(ne=138,Ie=3),R[2*(z+1)+1]=65535,W=0;W<=z;W++)N=J,J=R[2*(W+1)+1],++q<ne&&N===J||(q<Ie?E.bl_tree[2*N]+=q:N!==0?(N!==V&&E.bl_tree[2*N]++,E.bl_tree[2*C]++):q<=10?E.bl_tree[2*k]++:E.bl_tree[2*T]++,V=N,Ie=(q=0)===J?(ne=138,3):N===J?(ne=6,3):(ne=7,4))}function M(E,R,z){var W,N,V=-1,J=R[1],q=0,ne=7,Ie=4;for(J===0&&(ne=138,Ie=3),W=0;W<=z;W++)if(N=J,J=R[2*(W+1)+1],!(++q<ne&&N===J)){if(q<Ie)for(;G(E,N,E.bl_tree),--q!=0;);else N!==0?(N!==V&&(G(E,N,E.bl_tree),q--),G(E,C,E.bl_tree),K(E,q-3,2)):q<=10?(G(E,k,E.bl_tree),K(E,q-3,3)):(G(E,T,E.bl_tree),K(E,q-11,7));V=N,Ie=(q=0)===J?(ne=138,3):N===J?(ne=6,3):(ne=7,4)}}l($);var L=!1;function I(E,R,z,W){K(E,(c<<1)+(W?1:0),3),function(N,V,J,q){pe(N),te(N,J),te(N,~J),r.arraySet(N.pending_buf,N.window,V,J,N.pending),N.pending+=J}(E,R,z)}s._tr_init=function(E){L||(function(){var R,z,W,N,V,J=new Array(y+1);for(N=W=0;N<h-1;N++)for(B[N]=W,R=0;R<1<<x[N];R++)m[W++]=N;for(m[W-1]=N,N=V=0;N<16;N++)for($[N]=V,R=0;R<1<<D[N];R++)F[V++]=N;for(V>>=7;N<p;N++)for($[N]=V<<7,R=0;R<1<<D[N]-7;R++)F[256+V++]=N;for(z=0;z<=y;z++)J[z]=0;for(R=0;R<=143;)Z[2*R+1]=8,R++,J[8]++;for(;R<=255;)Z[2*R+1]=9,R++,J[9]++;for(;R<=279;)Z[2*R+1]=7,R++,J[7]++;for(;R<=287;)Z[2*R+1]=8,R++,J[8]++;for(Re(Z,f+1,J),R=0;R<p;R++)S[2*R+1]=5,S[2*R]=we(R,5);oe=new ee(Z,x,u+1,f,y),j=new ee(S,D,0,p,y),X=new ee(new Array(0),A,0,w,_)}(),L=!0),E.l_desc=new O(E.dyn_ltree,oe),E.d_desc=new O(E.dyn_dtree,j),E.bl_desc=new O(E.bl_tree,X),E.bi_buf=0,E.bi_valid=0,ue(E)},s._tr_stored_block=I,s._tr_flush_block=function(E,R,z,W){var N,V,J=0;0<E.level?(E.strm.data_type===2&&(E.strm.data_type=function(q){var ne,Ie=4093624447;for(ne=0;ne<=31;ne++,Ie>>>=1)if(1&Ie&&q.dyn_ltree[2*ne]!==0)return o;if(q.dyn_ltree[18]!==0||q.dyn_ltree[20]!==0||q.dyn_ltree[26]!==0)return a;for(ne=32;ne<u;ne++)if(q.dyn_ltree[2*ne]!==0)return a;return o}(E)),ze(E,E.l_desc),ze(E,E.d_desc),J=function(q){var ne;for(d(q,q.dyn_ltree,q.l_desc.max_code),d(q,q.dyn_dtree,q.d_desc.max_code),ze(q,q.bl_desc),ne=w-1;3<=ne&&q.bl_tree[2*U[ne]+1]===0;ne--);return q.opt_len+=3*(ne+1)+5+5+4,ne}(E),N=E.opt_len+3+7>>>3,(V=E.static_len+3+7>>>3)<=N&&(N=V)):N=V=z+5,z+4<=N&&R!==-1?I(E,R,z,W):E.strategy===4||V===N?(K(E,2+(W?1:0),3),Ze(E,Z,S)):(K(E,4+(W?1:0),3),function(q,ne,Ie,fe){var Je;for(K(q,ne-257,5),K(q,Ie-1,5),K(q,fe-4,4),Je=0;Je<fe;Je++)K(q,q.bl_tree[2*U[Je]+1],3);M(q,q.dyn_ltree,ne-1),M(q,q.dyn_dtree,Ie-1)}(E,E.l_desc.max_code+1,E.d_desc.max_code+1,J+1),Ze(E,E.dyn_ltree,E.dyn_dtree)),ue(E),W&&pe(E)},s._tr_tally=function(E,R,z){return E.pending_buf[E.d_buf+2*E.last_lit]=R>>>8&255,E.pending_buf[E.d_buf+2*E.last_lit+1]=255&R,E.pending_buf[E.l_buf+E.last_lit]=255&z,E.last_lit++,R===0?E.dyn_ltree[2*z]++:(E.matches++,R--,E.dyn_ltree[2*(m[z]+u+1)]++,E.dyn_dtree[2*P(R)]++),E.last_lit===E.lit_bufsize-1},s._tr_align=function(E){K(E,2,3),G(E,b,Z),function(R){R.bi_valid===16?(te(R,R.bi_buf),R.bi_buf=0,R.bi_valid=0):8<=R.bi_valid&&(R.pending_buf[R.pending++]=255&R.bi_buf,R.bi_buf>>=8,R.bi_valid-=8)}(E)}},{"../utils/common":41}],53:[function(t,i,s){i.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(t,i,s){(function(r){(function(o,a){if(!o.setImmediate){var l,c,h,u,f=1,p={},w=!1,g=o.document,y=Object.getPrototypeOf&&Object.getPrototypeOf(o);y=y&&y.setTimeout?y:o,l={}.toString.call(o.process)==="[object process]"?function(C){process.nextTick(function(){_(C)})}:function(){if(o.postMessage&&!o.importScripts){var C=!0,k=o.onmessage;return o.onmessage=function(){C=!1},o.postMessage("","*"),o.onmessage=k,C}}()?(u="setImmediate$"+Math.random()+"$",o.addEventListener?o.addEventListener("message",b,!1):o.attachEvent("onmessage",b),function(C){o.postMessage(u+C,"*")}):o.MessageChannel?((h=new MessageChannel).port1.onmessage=function(C){_(C.data)},function(C){h.port2.postMessage(C)}):g&&"onreadystatechange"in g.createElement("script")?(c=g.documentElement,function(C){var k=g.createElement("script");k.onreadystatechange=function(){_(C),k.onreadystatechange=null,c.removeChild(k),k=null},c.appendChild(k)}):function(C){setTimeout(_,0,C)},y.setImmediate=function(C){typeof C!="function"&&(C=new Function(""+C));for(var k=new Array(arguments.length-1),T=0;T<k.length;T++)k[T]=arguments[T+1];var x={callback:C,args:k};return p[f]=x,l(f),f++},y.clearImmediate=v}function v(C){delete p[C]}function _(C){if(w)setTimeout(_,0,C);else{var k=p[C];if(k){w=!0;try{(function(T){var x=T.callback,D=T.args;switch(D.length){case 0:x();break;case 1:x(D[0]);break;case 2:x(D[0],D[1]);break;case 3:x(D[0],D[1],D[2]);break;default:x.apply(a,D)}})(k)}finally{v(C),w=!1}}}}function b(C){C.source===o&&typeof C.data=="string"&&C.data.indexOf(u)===0&&_(+C.data.slice(u.length))}})(typeof self>"u"?r===void 0?this:r:self)}).call(this,typeof Nn<"u"?Nn:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})})(Ec);var Sf=Ec.exports;const Tf=wc(Sf);function Ao(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(n);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(n,i[s])&&(t[i[s]]=n[i[s]]);return t}function Ic(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Af=Ic,Cc=new ji("auth","Firebase",Ic());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fs=new ko("@firebase/auth");function Rf(n,...e){Fs.logLevel<=ve.WARN&&Fs.warn(`Auth (${ti}): ${n}`,...e)}function ws(n,...e){Fs.logLevel<=ve.ERROR&&Fs.error(`Auth (${ti}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vt(n,...e){throw xo(n,...e)}function ct(n,...e){return xo(n,...e)}function Ro(n,e,t){const i=Object.assign(Object.assign({},Af()),{[e]:t});return new ji("auth","Firebase",i).create(e,{appName:n.name})}function Zt(n){return Ro(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function kc(n,e,t){const i=t;if(!(e instanceof i))throw i.name!==e.constructor.name&&vt(n,"argument-error"),Ro(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function xo(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return Cc.create(n,...e)}function re(n,e,...t){if(!n)throw xo(e,...t)}function It(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ws(e),new Error(e)}function Rt(n,e){n||It(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function to(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function xf(){return Ua()==="http:"||Ua()==="https:"}function Ua(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pf(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(xf()||th()||"connection"in navigator)?navigator.onLine:!0}function Nf(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hi{constructor(e,t){this.shortDelay=e,this.longDelay=t,Rt(t>e,"Short delay should be less than long delay!"),this.isMobile=Co()||fc()}get(){return Pf()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Po(n,e){Rt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sc{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;It("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;It("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;It("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Of={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lf=new Hi(3e4,6e4);function No(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function ni(n,e,t,i,s={}){return Tc(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=ei(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const c=Object.assign({method:e,headers:l},r);return eh()||(c.referrerPolicy="no-referrer"),Sc.fetch()(Ac(n,n.config.apiHost,t,a),c)})}async function Tc(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},Of),e);try{const s=new Ff(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw os(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw os(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw os(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw os(n,"user-disabled",o);const h=i[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Ro(n,h,c);vt(n,h)}}catch(s){if(s instanceof on)throw s;vt(n,"network-request-failed",{message:String(s)})}}async function Df(n,e,t,i,s={}){const r=await ni(n,e,t,i,s);return"mfaPendingCredential"in r&&vt(n,"multi-factor-auth-required",{_serverResponse:r}),r}function Ac(n,e,t,i){const s=`${e}${t}?${i}`;return n.config.emulator?Po(n.config,s):`${n.config.apiScheme}://${s}`}class Ff{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(ct(this.auth,"network-request-failed")),Lf.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function os(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=ct(n,e,i);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mf(n,e){return ni(n,"POST","/v1/accounts:delete",e)}async function Rc(n,e){return ni(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yi(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Bf(n,e=!1){const t=Be(n),i=await t.getIdToken(e),s=Oo(i);re(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:s,token:i,authTime:yi(Fr(s.auth_time)),issuedAtTime:yi(Fr(s.iat)),expirationTime:yi(Fr(s.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function Fr(n){return Number(n)*1e3}function Oo(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return ws("JWT malformed, contained fewer than 3 sections"),null;try{const s=Ps(t);return s?JSON.parse(s):(ws("Failed to decode base64 JWT payload"),null)}catch(s){return ws("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function za(n){const e=Oo(n);return re(e,"internal-error"),re(typeof e.exp<"u","internal-error"),re(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Di(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof on&&Uf(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function Uf({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zf{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=yi(this.lastLoginAt),this.creationTime=yi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ms(n){var e;const t=n.auth,i=await n.getIdToken(),s=await Di(n,Rc(t,{idToken:i}));re(s==null?void 0:s.users.length,t,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?xc(r.providerUserInfo):[],a=Wf(n.providerData,o),l=n.isAnonymous,c=!(n.email&&r.passwordHash)&&!(a!=null&&a.length),h=l?c:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new no(r.createdAt,r.lastLoginAt),isAnonymous:h};Object.assign(n,u)}async function $f(n){const e=Be(n);await Ms(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Wf(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function xc(n){return n.map(e=>{var{providerId:t}=e,i=Ao(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jf(n,e){const t=await Tc(n,{},async()=>{const i=ei({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=Ac(n,s,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Sc.fetch()(o,{method:"POST",headers:a,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Hf(n,e){return ni(n,"POST","/v2/accounts:revokeToken",No(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){re(e.idToken,"internal-error"),re(typeof e.idToken<"u","internal-error"),re(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):za(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){re(e.length!==0,"internal-error");const t=za(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(re(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await jf(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new Ln;return i&&(re(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(re(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(re(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ln,this.toJSON())}_performRefresh(){return It("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ft(n,e){re(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ct{constructor(e){var{uid:t,auth:i,stsTokenManager:s}=e,r=Ao(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new zf(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new no(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await Di(this,this.stsTokenManager.getToken(this.auth,e));return re(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Bf(this,e)}reload(){return $f(this)}_assign(e){this!==e&&(re(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ct(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){re(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await Ms(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(mt(this.auth.app))return Promise.reject(Zt(this.auth));const e=await this.getIdToken();return await Di(this,Mf(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,s,r,o,a,l,c,h;const u=(i=t.displayName)!==null&&i!==void 0?i:void 0,f=(s=t.email)!==null&&s!==void 0?s:void 0,p=(r=t.phoneNumber)!==null&&r!==void 0?r:void 0,w=(o=t.photoURL)!==null&&o!==void 0?o:void 0,g=(a=t.tenantId)!==null&&a!==void 0?a:void 0,y=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,v=(c=t.createdAt)!==null&&c!==void 0?c:void 0,_=(h=t.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:b,emailVerified:C,isAnonymous:k,providerData:T,stsTokenManager:x}=t;re(b&&x,e,"internal-error");const D=Ln.fromJSON(this.name,x);re(typeof b=="string",e,"internal-error"),Ft(u,e.name),Ft(f,e.name),re(typeof C=="boolean",e,"internal-error"),re(typeof k=="boolean",e,"internal-error"),Ft(p,e.name),Ft(w,e.name),Ft(g,e.name),Ft(y,e.name),Ft(v,e.name),Ft(_,e.name);const A=new Ct({uid:b,auth:e,email:f,emailVerified:C,displayName:u,isAnonymous:k,photoURL:w,phoneNumber:p,tenantId:g,stsTokenManager:D,createdAt:v,lastLoginAt:_});return T&&Array.isArray(T)&&(A.providerData=T.map(U=>Object.assign({},U))),y&&(A._redirectEventId=y),A}static async _fromIdTokenResponse(e,t,i=!1){const s=new Ln;s.updateFromServerResponse(t);const r=new Ct({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await Ms(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];re(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?xc(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(r!=null&&r.length),a=new Ln;a.updateFromIdToken(i);const l=new Ct({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new no(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(r!=null&&r.length)};return Object.assign(l,c),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $a=new Map;function kt(n){Rt(n instanceof Function,"Expected a class definition");let e=$a.get(n);return e?(Rt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,$a.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pc{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Pc.type="NONE";const Wa=Pc;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Es(n,e,t){return`firebase:${n}:${e}:${t}`}class Dn{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=Es(this.userKey,s.apiKey,r),this.fullPersistenceKey=Es("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ct._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Dn(kt(Wa),e,i);const s=(await Promise.all(t.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=s[0]||kt(Wa);const o=Es(i,e.config.apiKey,e.name);let a=null;for(const c of t)try{const h=await c._get(o);if(h){const u=Ct._fromJSON(e,h);c!==r&&(a=u),r=c;break}}catch{}const l=s.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!l.length?new Dn(r,e,i):(r=l[0],a&&await r._set(o,a.toJSON()),await Promise.all(t.map(async c=>{if(c!==r)try{await c._remove(o)}catch{}})),new Dn(r,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ja(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Dc(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Nc(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Mc(e))return"Blackberry";if(Bc(e))return"Webos";if(Oc(e))return"Safari";if((e.includes("chrome/")||Lc(e))&&!e.includes("edge/"))return"Chrome";if(Fc(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function Nc(n=je()){return/firefox\//i.test(n)}function Oc(n=je()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Lc(n=je()){return/crios\//i.test(n)}function Dc(n=je()){return/iemobile/i.test(n)}function Fc(n=je()){return/android/i.test(n)}function Mc(n=je()){return/blackberry/i.test(n)}function Bc(n=je()){return/webos/i.test(n)}function Lo(n=je()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Vf(n=je()){var e;return Lo(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Gf(){return nh()&&document.documentMode===10}function Uc(n=je()){return Lo(n)||Fc(n)||Bc(n)||Mc(n)||/windows phone/i.test(n)||Dc(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zc(n,e=[]){let t;switch(n){case"Browser":t=ja(je());break;case"Worker":t=`${ja(je())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ti}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,a)=>{try{const l=e(r);o(l)}catch(l){a(l)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kf(n,e={}){return ni(n,"GET","/v2/passwordPolicy",No(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yf=6;class Zf{constructor(e){var t,i,s,r;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:Yf,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(r=e.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,s,r,o,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(i=l.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(r=l.containsUppercaseLetter)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ha(this),this.idTokenSubscription=new Ha(this),this.beforeStateQueue=new qf(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Cc,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=kt(t)),this._initializationPromise=this.queue(async()=>{var i,s;if(!this._deleted&&(this.persistenceManager=await Dn.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Rc(this,{idToken:e}),i=await Ct._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(mt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let s=i,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(s=l.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return re(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ms(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Nf()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(mt(this.app))return Promise.reject(Zt(this));const t=e?Be(e):null;return t&&re(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&re(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return mt(this.app)?Promise.reject(Zt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return mt(this.app)?Promise.reject(Zt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(kt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Kf(this),t=new Zf(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ji("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Hf(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&kt(e)||this._popupRedirectResolver;re(t,this,"argument-error"),this.redirectPersistenceManager=await Dn.create(this,[kt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(re(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,i,s);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return re(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=zc(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Rf(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function En(n){return Be(n)}class Ha{constructor(e){this.auth=e,this.observer=null,this.addObserver=hh(t=>this.observer=t)}get next(){return re(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Do={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Qf(n){Do=n}function Xf(n){return Do.loadJS(n)}function ep(){return Do.gapiScript}function tp(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function np(n,e){const t=To(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(Ls(r,e??{}))return s;vt(s,"already-initialized")}return t.initialize({options:e})}function ip(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(kt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function sp(n,e,t){const i=En(n);re(i._canInitEmulator,i,"emulator-config-failed"),re(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=$c(e),{host:o,port:a}=rp(e),l=a===null?"":`:${a}`;i.config.emulator={url:`${r}//${o}${l}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})}),op()}function $c(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function rp(n){const e=$c(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:Va(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:Va(o)}}}function Va(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function op(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wc{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return It("not implemented")}_getIdTokenResponse(e){return It("not implemented")}_linkToIdToken(e,t){return It("not implemented")}_getReauthenticationResolver(e){return It("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fn(n,e){return Df(n,"POST","/v1/accounts:signInWithIdp",No(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ap="http://localhost";class _n extends Wc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new _n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):vt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s}=t,r=Ao(t,["providerId","signInMethod"]);if(!i||!s)return null;const o=new _n(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Fn(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Fn(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Fn(e,t)}buildRequest(){const e={requestUri:ap,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ei(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi extends cr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt extends Vi{constructor(){super("facebook.com")}static credential(e){return _n._fromParams({providerId:Wt.PROVIDER_ID,signInMethod:Wt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wt.credentialFromTaggedObject(e)}static credentialFromError(e){return Wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wt.credential(e.oauthAccessToken)}catch{return null}}}Wt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Wt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft extends Vi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return _n._fromParams({providerId:ft.PROVIDER_ID,signInMethod:ft.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ft.credentialFromTaggedObject(e)}static credentialFromError(e){return ft.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return ft.credential(t,i)}catch{return null}}}ft.GOOGLE_SIGN_IN_METHOD="google.com";ft.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt extends Vi{constructor(){super("github.com")}static credential(e){return _n._fromParams({providerId:jt.PROVIDER_ID,signInMethod:jt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return jt.credentialFromTaggedObject(e)}static credentialFromError(e){return jt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return jt.credential(e.oauthAccessToken)}catch{return null}}}jt.GITHUB_SIGN_IN_METHOD="github.com";jt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht extends Vi{constructor(){super("twitter.com")}static credential(e,t){return _n._fromParams({providerId:Ht.PROVIDER_ID,signInMethod:Ht.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ht.credentialFromTaggedObject(e)}static credentialFromError(e){return Ht.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return Ht.credential(t,i)}catch{return null}}}Ht.TWITTER_SIGN_IN_METHOD="twitter.com";Ht.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await Ct._fromIdTokenResponse(e,i,s),o=Ga(i);return new Wn({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=Ga(i);return new Wn({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function Ga(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs extends on{constructor(e,t,i,s){var r;super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,Bs.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new Bs(e,t,i,s)}}function jc(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Bs._fromErrorAndOperation(n,r,e,i):r})}async function lp(n,e,t=!1){const i=await Di(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Wn._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cp(n,e,t=!1){const{auth:i}=n;if(mt(i.app))return Promise.reject(Zt(i));const s="reauthenticate";try{const r=await Di(n,jc(i,s,e,n),t);re(r.idToken,i,"internal-error");const o=Oo(r.idToken);re(o,i,"internal-error");const{sub:a}=o;return re(n.uid===a,i,"user-mismatch"),Wn._forOperation(n,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&vt(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hc(n,e,t=!1){if(mt(n.app))return Promise.reject(Zt(n));const i="signIn",s=await jc(n,i,e),r=await Wn._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}async function up(n,e){return Hc(En(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mr(n,e){return Be(n).setPersistence(e)}function dp(n,e,t,i){return Be(n).onIdTokenChanged(e,t,i)}function hp(n,e,t){return Be(n).beforeAuthStateChanged(e,t)}function fp(n,e,t,i){return Be(n).onAuthStateChanged(e,t,i)}function Vc(n){return Be(n).signOut()}const Us="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gc{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Us,"1"),this.storage.removeItem(Us),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pp=1e3,mp=10;class qc extends Gc{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Uc(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);Gf()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,mp):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},pp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}qc.type="LOCAL";const Is=qc;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc extends Gc{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Kc.type="SESSION";const Yc=Kc;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gp(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new ur(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async c=>c(t.origin,r)),l=await gp(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ur.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fo(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _p{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,l)=>{const c=Fo("",20);s.port1.start();const h=setTimeout(()=>{l(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(u){const f=u;if(f.data.eventId===c)switch(f.data.status){case"ack":clearTimeout(h),r=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(f.data.response);break;default:clearTimeout(h),clearTimeout(r),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(){return window}function vp(n){_t().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zc(){return typeof _t().WorkerGlobalScope<"u"&&typeof _t().importScripts=="function"}async function yp(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function bp(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function wp(){return Zc()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jc="firebaseLocalStorageDb",Ep=1,zs="firebaseLocalStorage",Qc="fbase_key";class Gi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function dr(n,e){return n.transaction([zs],e?"readwrite":"readonly").objectStore(zs)}function Ip(){const n=indexedDB.deleteDatabase(Jc);return new Gi(n).toPromise()}function io(){const n=indexedDB.open(Jc,Ep);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(zs,{keyPath:Qc})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(zs)?e(i):(i.close(),await Ip(),e(await io()))})})}async function qa(n,e,t){const i=dr(n,!0).put({[Qc]:e,value:t});return new Gi(i).toPromise()}async function Cp(n,e){const t=dr(n,!1).get(e),i=await new Gi(t).toPromise();return i===void 0?null:i.value}function Ka(n,e){const t=dr(n,!0).delete(e);return new Gi(t).toPromise()}const kp=800,Sp=3;class Xc{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await io(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>Sp)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Zc()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ur._getInstance(wp()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await yp(),!this.activeServiceWorker)return;this.sender=new _p(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||bp()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await io();return await qa(e,Us,"1"),await Ka(e,Us),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>qa(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>Cp(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ka(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=dr(s,!1).getAll();return new Gi(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),kp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Xc.type="LOCAL";const Tp=Xc;new Hi(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mo(n,e){return e?kt(e):(re(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bo extends Wc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Fn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Fn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Fn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Ap(n){return Hc(n.auth,new Bo(n),n.bypassAuthState)}function Rp(n){const{auth:e,user:t}=n;return re(t,e,"internal-error"),cp(t,new Bo(n),n.bypassAuthState)}async function xp(n){const{auth:e,user:t}=n;return re(t,e,"internal-error"),lp(t,new Bo(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Ap;case"linkViaPopup":case"linkViaRedirect":return xp;case"reauthViaPopup":case"reauthViaRedirect":return Rp;default:vt(this.auth,"internal-error")}}resolve(e){Rt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Rt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pp=new Hi(2e3,1e4);async function Np(n,e,t){if(mt(n.app))return Promise.reject(ct(n,"operation-not-supported-in-this-environment"));const i=En(n);kc(n,e,cr);const s=Mo(i,t);return new un(i,"signInViaPopup",e,s).executeNotNull()}class un extends eu{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,un.currentPopupAction&&un.currentPopupAction.cancel(),un.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return re(e,this.auth,"internal-error"),e}async onExecution(){Rt(this.filter.length===1,"Popup operations only handle one event");const e=Fo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ct(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ct(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,un.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ct(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Pp.get())};e()}}un.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Op="pendingRedirect",Cs=new Map;class Lp extends eu{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=Cs.get(this.auth._key());if(!e){try{const i=await Dp(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}Cs.set(this.auth._key(),e)}return this.bypassAuthState||Cs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Dp(n,e){const t=nu(e),i=tu(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}async function Fp(n,e){return tu(n)._set(nu(e),"true")}function Mp(n,e){Cs.set(n._key(),e)}function tu(n){return kt(n._redirectPersistence)}function nu(n){return Es(Op,n.config.apiKey,n.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ya(n,e,t){return Bp(n,e,t)}async function Bp(n,e,t){if(mt(n.app))return Promise.reject(Zt(n));const i=En(n);kc(n,e,cr),await i._initializationPromise;const s=Mo(i,t);return await Fp(s,i),s._openRedirect(i,e,"signInViaRedirect")}async function Up(n,e){return await En(n)._initializationPromise,iu(n,e,!1)}async function iu(n,e,t=!1){if(mt(n.app))return Promise.reject(Zt(n));const i=En(n),s=Mo(i,e),o=await new Lp(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zp=10*60*1e3;class $p{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Wp(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!su(e)){const s=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(ct(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=zp&&this.cachedEventUids.clear(),this.cachedEventUids.has(Za(e))}saveEventToCache(e){this.cachedEventUids.add(Za(e)),this.lastProcessedEventTime=Date.now()}}function Za(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function su({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Wp(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return su(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jp(n,e={}){return ni(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hp=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Vp=/^https?/;async function Gp(n){if(n.config.emulator)return;const{authorizedDomains:e}=await jp(n);for(const t of e)try{if(qp(t))return}catch{}vt(n,"unauthorized-domain")}function qp(n){const e=to(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!Vp.test(t))return!1;if(Hp.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kp=new Hi(3e4,6e4);function Ja(){const n=_t().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Yp(n){return new Promise((e,t)=>{var i,s,r;function o(){Ja(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ja(),t(ct(n,"network-request-failed"))},timeout:Kp.get()})}if(!((s=(i=_t().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((r=_t().gapi)===null||r===void 0)&&r.load)o();else{const a=tp("iframefcb");return _t()[a]=()=>{gapi.load?o():t(ct(n,"network-request-failed"))},Xf(`${ep()}?onload=${a}`).catch(l=>t(l))}}).catch(e=>{throw ks=null,e})}let ks=null;function Zp(n){return ks=ks||Yp(n),ks}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jp=new Hi(5e3,15e3),Qp="__/auth/iframe",Xp="emulator/auth/iframe",em={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},tm=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function nm(n){const e=n.config;re(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Po(e,Xp):`https://${n.config.authDomain}/${Qp}`,i={apiKey:e.apiKey,appName:n.name,v:ti},s=tm.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${ei(i).slice(1)}`}async function im(n){const e=await Zp(n),t=_t().gapi;return re(t,n,"internal-error"),e.open({where:document.body,url:nm(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:em,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=ct(n,"network-request-failed"),a=_t().setTimeout(()=>{r(o)},Jp.get());function l(){_t().clearTimeout(a),s(i)}i.ping(l).then(l,()=>{r(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sm={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},rm=500,om=600,am="_blank",lm="http://localhost";class Qa{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function cm(n,e,t,i=rm,s=om){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const l=Object.assign(Object.assign({},sm),{width:i.toString(),height:s.toString(),top:r,left:o}),c=je().toLowerCase();t&&(a=Lc(c)?am:t),Nc(c)&&(e=e||lm,l.scrollbars="yes");const h=Object.entries(l).reduce((f,[p,w])=>`${f}${p}=${w},`,"");if(Vf(c)&&a!=="_self")return um(e||"",a),new Qa(null);const u=window.open(e||"",a,h);re(u,n,"popup-blocked");try{u.focus()}catch{}return new Qa(u)}function um(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dm="__/auth/handler",hm="emulator/auth/handler",fm=encodeURIComponent("fac");async function Xa(n,e,t,i,s,r){re(n.config.authDomain,n,"auth-domain-config-required"),re(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:ti,eventId:s};if(e instanceof cr){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Ns(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,u]of Object.entries({}))o[h]=u}if(e instanceof Vi){const h=e.getScopes().filter(u=>u!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const l=await n._getAppCheckToken(),c=l?`#${fm}=${encodeURIComponent(l)}`:"";return`${pm(n)}?${ei(a).slice(1)}${c}`}function pm({config:n}){return n.emulator?Po(n,hm):`https://${n.authDomain}/${dm}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Br="webStorageSupport";class mm{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Yc,this._completeRedirectFn=iu,this._overrideRedirectResult=Mp}async _openPopup(e,t,i,s){var r;Rt((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await Xa(e,t,i,to(),s);return cm(e,o,Fo())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await Xa(e,t,i,to(),s);return vp(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(Rt(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await im(e),i=new $p(e);return t.register("authEvent",s=>(re(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Br,{type:Br},s=>{var r;const o=(r=s==null?void 0:s[0])===null||r===void 0?void 0:r[Br];o!==void 0&&t(!!o),vt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Gp(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Uc()||Oc()||Lo()}}const gm=mm;var el="@firebase/auth",tl="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _m{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){re(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vm(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ym(n){$n(new gn("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;re(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const l={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:zc(n)},c=new Jf(i,s,r,l);return ip(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),$n(new gn("auth-internal",e=>{const t=En(e.getProvider("auth").getImmediate());return(i=>new _m(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Yt(el,tl,vm(n)),Yt(el,tl,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bm=5*60,wm=hc("authIdTokenMaxAge")||bm;let nl=null;const Em=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>wm)return;const s=t==null?void 0:t.token;nl!==s&&(nl=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Im(n=vc()){const e=To(n,"auth");if(e.isInitialized())return e.getImmediate();const t=np(n,{popupRedirectResolver:gm,persistence:[Tp,Is,Yc]}),i=hc("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=Em(r.toString());hp(t,o,()=>o(t.currentUser)),dp(t,a=>o(a))}}const s=uc("auth");return s&&sp(t,`http://${s}`),t}function Cm(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Qf({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=ct("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",Cm().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ym("Browser");var il={};const sl="@firebase/database",rl="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ru="";function km(n){ru=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sm{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Ne(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Oi(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tm{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return yt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ou=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Sm(e)}}catch{}return new Tm},dn=ou("localStorage"),Am=ou("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mn=new ko("@firebase/database"),Rm=function(){let n=1;return function(){return n++}}(),au=function(n){const e=mh(n),t=new dh;t.update(e);const i=t.digest();return Eo.encodeByteArray(i)},qi=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=qi.apply(null,i):typeof i=="object"?e+=Ne(i):e+=i,e+=" "}return e};let bi=null,ol=!0;const xm=function(n,e){H(!0,"Can't turn on custom loggers persistently."),Mn.logLevel=ve.VERBOSE,bi=Mn.log.bind(Mn)},Fe=function(...n){if(ol===!0&&(ol=!1,bi===null&&Am.get("logging_enabled")===!0&&xm()),bi){const e=qi.apply(null,n);bi(e)}},Ki=function(n){return function(...e){Fe(n,...e)}},so=function(...n){const e="FIREBASE INTERNAL ERROR: "+qi(...n);Mn.error(e)},xt=function(...n){const e=`FIREBASE FATAL ERROR: ${qi(...n)}`;throw Mn.error(e),new Error(e)},We=function(...n){const e="FIREBASE WARNING: "+qi(...n);Mn.warn(e)},Pm=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&We("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},hr=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Nm=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},jn="[MIN_NAME]",vn="[MAX_NAME]",In=function(n,e){if(n===e)return 0;if(n===jn||e===vn)return-1;if(e===jn||n===vn)return 1;{const t=al(n),i=al(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},Om=function(n,e){return n===e?0:n<e?-1:1},pi=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+Ne(e))},Uo=function(n){if(typeof n!="object"||n===null)return Ne(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=Ne(e[i]),t+=":",t+=Uo(n[e[i]]);return t+="}",t},lu=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function Me(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const cu=function(n){H(!hr(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,l;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const h=c.join("");let u="";for(l=0;l<64;l+=8){let f=parseInt(h.substr(l,8),2).toString(16);f.length===1&&(f="0"+f),u=u+f}return u.toLowerCase()},Lm=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Dm=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Fm(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const Mm=new RegExp("^-?(0*)\\d{1,10}$"),Bm=-2147483648,Um=2147483647,al=function(n){if(Mm.test(n)){const e=Number(n);if(e>=Bm&&e<=Um)return e}return null},ii=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw We("Exception was thrown by user callback.",t),e},Math.floor(0))}},zm=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},wi=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $m{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){We(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wm{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(Fe("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',We(e)}}class Ss{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Ss.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zo="5",uu="v",du="s",hu="r",fu="f",pu=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,mu="ls",gu="p",ro="ac",_u="websocket",vu="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yu{constructor(e,t,i,s,r=!1,o="",a=!1,l=!1){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=dn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&dn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function jm(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function bu(n,e,t){H(typeof e=="string","typeof type must == string"),H(typeof t=="object","typeof params must == object");let i;if(e===_u)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===vu)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);jm(n)&&(t.ns=n.namespace);const s=[];return Me(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hm{constructor(){this.counters_={}}incrementCounter(e,t=1){yt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Gd(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ur={},zr={};function $o(n){const e=n.toString();return Ur[e]||(Ur[e]=new Hm),Ur[e]}function Vm(n,e){const t=n.toString();return zr[t]||(zr[t]=e()),zr[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gm{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&ii(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ll="start",qm="close",Km="pLPCommand",Ym="pRTLPCB",wu="id",Eu="pw",Iu="ser",Zm="cb",Jm="seg",Qm="ts",Xm="d",eg="dframe",Cu=1870,ku=30,tg=Cu-ku,ng=25e3,ig=3e4;class On{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Ki(e),this.stats_=$o(t),this.urlFn=l=>(this.appCheckToken&&(l[ro]=this.appCheckToken),bu(t,vu,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Gm(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(ig)),Nm(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Wo((...r)=>{const[o,a,l,c,h]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===ll)this.id=a,this.password=l;else if(o===qm)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[ll]="t",i[Iu]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Zm]=this.scriptTagHolder.uniqueCallbackIdentifier),i[uu]=zo,this.transportSessionId&&(i[du]=this.transportSessionId),this.lastSessionId&&(i[mu]=this.lastSessionId),this.applicationId&&(i[gu]=this.applicationId),this.appCheckToken&&(i[ro]=this.appCheckToken),typeof location<"u"&&location.hostname&&pu.test(location.hostname)&&(i[hu]=fu);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){On.forceAllow_=!0}static forceDisallow(){On.forceDisallow_=!0}static isAvailable(){return On.forceAllow_?!0:!On.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Lm()&&!Dm()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=Ne(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=lc(t),s=lu(i,tg);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[eg]="t",i[wu]=e,i[Eu]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=Ne(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Wo{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Rm(),window[Km+this.uniqueCallbackIdentifier]=e,window[Ym+this.uniqueCallbackIdentifier]=t,this.myIFrame=Wo.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){Fe("frame writing exception"),a.stack&&Fe(a.stack),Fe(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Fe("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[wu]=this.myID,e[Eu]=this.myPW,e[Iu]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+ku+i.length<=Cu;){const o=this.pendingSegs.shift();i=i+"&"+Jm+s+"="+o.seg+"&"+Qm+s+"="+o.ts+"&"+Xm+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(ng)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{Fe("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sg=16384,rg=45e3;let $s=null;typeof MozWebSocket<"u"?$s=MozWebSocket:typeof WebSocket<"u"&&($s=WebSocket);class ot{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Ki(this.connId),this.stats_=$o(t),this.connURL=ot.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[uu]=zo,typeof location<"u"&&location.hostname&&pu.test(location.hostname)&&(o[hu]=fu),t&&(o[du]=t),i&&(o[mu]=i),s&&(o[ro]=s),r&&(o[gu]=r),bu(e,_u,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,dn.set("previous_websocket_failure",!0);try{let i;ih(),this.mySock=new $s(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){ot.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&$s!==null&&!ot.forceDisallow_}static previouslyFailed(){return dn.isInMemoryStorage||dn.get("previous_websocket_failure")===!0}markConnectionHealthy(){dn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=Oi(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(H(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=Ne(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=lu(t,sg);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(rg))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ot.responsesRequiredToBeHealthy=2;ot.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[On,ot]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=ot&&ot.isAvailable();let i=t&&!ot.previouslyFailed();if(e.webSocketOnly&&(t||We("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[ot];else{const s=this.transports_=[];for(const r of Fi.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Fi.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Fi.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const og=6e4,ag=5e3,lg=10*1024,cg=100*1024,$r="t",cl="d",ug="s",ul="r",dg="e",dl="o",hl="a",fl="n",pl="p",hg="h";class fg{constructor(e,t,i,s,r,o,a,l,c,h){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Ki("c:"+this.id+":"),this.transportManager_=new Fi(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=wi(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>cg?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>lg?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if($r in e){const t=e[$r];t===hl?this.upgradeIfSecondaryHealthy_():t===ul?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===dl&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=pi("t",e),i=pi("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:pl,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:hl,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:fl,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=pi("t",e),i=pi("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=pi($r,e);if(cl in e){const i=e[cl];if(t===hg){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===fl){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===ug?this.onConnectionShutdown_(i):t===ul?this.onReset_(i):t===dg?so("Server Error: "+i):t===dl?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):so("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),zo!==i&&We("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),wi(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(og))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):wi(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(ag))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:pl,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(dn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tu{constructor(e){this.allowedEvents_=e,this.listeners_={},H(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){H(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws extends Tu{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Co()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Ws}getInitialEvent(e){return H(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ml=32,gl=768;class _e{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function ge(){return new _e("")}function ce(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function tn(n){return n.pieces_.length-n.pieceNum_}function be(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new _e(n.pieces_,e)}function jo(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function pg(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Mi(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Au(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new _e(e,0)}function ke(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof _e)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new _e(t,0)}function de(n){return n.pieceNum_>=n.pieces_.length}function $e(n,e){const t=ce(n),i=ce(e);if(t===null)return e;if(t===i)return $e(be(n),be(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function mg(n,e){const t=Mi(n,0),i=Mi(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=In(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function Ho(n,e){if(tn(n)!==tn(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function it(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(tn(n)>tn(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class gg{constructor(e,t){this.errorPrefix_=t,this.parts_=Mi(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=lr(this.parts_[i]);Ru(this)}}function _g(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=lr(e),Ru(n)}function vg(n){const e=n.parts_.pop();n.byteLength_-=lr(e),n.parts_.length>0&&(n.byteLength_-=1)}function Ru(n){if(n.byteLength_>gl)throw new Error(n.errorPrefix_+"has a key path longer than "+gl+" bytes ("+n.byteLength_+").");if(n.parts_.length>ml)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+ml+") or object contains a cycle "+cn(n))}function cn(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo extends Tu{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new Vo}getInitialEvent(e){return H(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mi=1e3,yg=60*5*1e3,_l=30*1e3,bg=1.3,wg=3e4,Eg="server_kill",vl=3;class Tt extends Su{constructor(e,t,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Tt.nextPersistentConnectionId_++,this.log_=Ki("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=mi,this.maxReconnectDelay_=yg,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Vo.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Ws.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(Ne(r)),H(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new ht,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),H(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),H(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;Tt.warnOnListenWarnings_(l,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&yt(e,"w")){const i=Un(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();We(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||uh(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=_l)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=ch(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),H(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Ne(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):so("Unrecognized action received from server: "+Ne(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){H(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=mi,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=mi,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>wg&&(this.reconnectDelay_=mi),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*bg)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Tt.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(u){H(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,f]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?Fe("getToken() completed but was canceled"):(Fe("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=f&&f.token,a=new fg(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,p=>{We(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(Eg)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&We(u),l())}}}interrupt(e){Fe("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Fe("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Ns(this.interruptReasons_)&&(this.reconnectDelay_=mi,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>Uo(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new _e(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){Fe("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=vl&&(this.reconnectDelay_=_l,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Fe("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=vl&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+ru.replace(/\./g,"-")]=1,Co()?e["framework.cordova"]=1:fc()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Ws.getInstance().currentlyOnline();return Ns(this.interruptReasons_)&&e}}Tt.nextPersistentConnectionId_=0;Tt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new he(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new he(jn,e),s=new he(jn,t);return this.compare(i,s)!==0}minPost(){return he.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let as;class xu extends fr{static get __EMPTY_NODE(){return as}static set __EMPTY_NODE(e){as=e}compare(e,t){return In(e.name,t.name)}isDefinedOn(e){throw Xn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return he.MIN}maxPost(){return new he(vn,as)}makePost(e,t){return H(typeof e=="string","KeyIndex indexValue must always be a string."),new he(e,as)}toString(){return".key"}}const Bn=new xu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class De{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??De.RED,this.left=s??He.EMPTY_NODE,this.right=r??He.EMPTY_NODE}copy(e,t,i,s,r){return new De(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return He.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return He.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,De.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,De.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}De.RED=!0;De.BLACK=!1;class Ig{copy(e,t,i,s,r){return this}insert(e,t,i){return new De(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class He{constructor(e,t=He.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new He(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,De.BLACK,null,null))}remove(e){return new He(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,De.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new ls(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new ls(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new ls(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new ls(this.root_,null,this.comparator_,!0,e)}}He.EMPTY_NODE=new Ig;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cg(n,e){return In(n.name,e.name)}function Go(n,e){return In(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let oo;function kg(n){oo=n}const Pu=function(n){return typeof n=="number"?"number:"+cu(n):"string:"+n},Nu=function(n){if(n.isLeafNode()){const e=n.val();H(typeof e=="string"||typeof e=="number"||typeof e=="object"&&yt(e,".sv"),"Priority must be a string or number.")}else H(n===oo||n.isEmpty(),"priority of unexpected type.");H(n===oo||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yl;class Le{constructor(e,t=Le.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,H(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Nu(this.priorityNode_)}static set __childrenNodeConstructor(e){yl=e}static get __childrenNodeConstructor(){return yl}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Le(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Le.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return de(e)?this:ce(e)===".priority"?this.priorityNode_:Le.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:Le.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=ce(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(H(i!==".priority"||tn(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,Le.__childrenNodeConstructor.EMPTY_NODE.updateChild(be(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Pu(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=cu(this.value_):e+=this.value_,this.lazyHash_=au(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Le.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Le.__childrenNodeConstructor?-1:(H(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=Le.VALUE_TYPE_ORDER.indexOf(t),r=Le.VALUE_TYPE_ORDER.indexOf(i);return H(s>=0,"Unknown leaf type: "+t),H(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}Le.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ou,Lu;function Sg(n){Ou=n}function Tg(n){Lu=n}class Ag extends fr{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?In(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return he.MIN}maxPost(){return new he(vn,new Le("[PRIORITY-POST]",Lu))}makePost(e,t){const i=Ou(e);return new he(t,new Le("[PRIORITY-POST]",i))}toString(){return".priority"}}const Se=new Ag;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rg=Math.log(2);class xg{constructor(e){const t=r=>parseInt(Math.log(r)/Rg,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const js=function(n,e,t,i){n.sort(e);const s=function(l,c){const h=c-l;let u,f;if(h===0)return null;if(h===1)return u=n[l],f=t?t(u):u,new De(f,u.node,De.BLACK,null,null);{const p=parseInt(h/2,10)+l,w=s(l,p),g=s(p+1,c);return u=n[p],f=t?t(u):u,new De(f,u.node,De.BLACK,w,g)}},r=function(l){let c=null,h=null,u=n.length;const f=function(w,g){const y=u-w,v=u;u-=w;const _=s(y+1,v),b=n[y],C=t?t(b):b;p(new De(C,b.node,g,null,_))},p=function(w){c?(c.left=w,c=w):(h=w,c=w)};for(let w=0;w<l.count;++w){const g=l.nextBitIsOne(),y=Math.pow(2,l.count-(w+1));g?f(y,De.BLACK):(f(y,De.BLACK),f(y,De.RED))}return h},o=new xg(n.length),a=r(o);return new He(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wr;const Tn={};class St{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return H(Tn&&Se,"ChildrenNode.ts has not been loaded"),Wr=Wr||new St({".priority":Tn},{".priority":Se}),Wr}get(e){const t=Un(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof He?t:null}hasIndex(e){return yt(this.indexSet_,e.toString())}addIndex(e,t){H(e!==Bn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(he.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=js(i,e.getCompare()):a=Tn;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const h=Object.assign({},this.indexes_);return h[l]=a,new St(h,c)}addToIndexes(e,t){const i=Os(this.indexes_,(s,r)=>{const o=Un(this.indexSet_,r);if(H(o,"Missing index implementation for "+r),s===Tn)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(he.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),js(a,o.getCompare())}else return Tn;else{const a=t.get(e.name);let l=s;return a&&(l=l.remove(new he(e.name,a))),l.insert(e,e.node)}});return new St(i,this.indexSet_)}removeFromIndexes(e,t){const i=Os(this.indexes_,s=>{if(s===Tn)return s;{const r=t.get(e.name);return r?s.remove(new he(e.name,r)):s}});return new St(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gi;class se{constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Nu(this.priorityNode_),this.children_.isEmpty()&&H(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return gi||(gi=new se(new He(Go),null,St.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||gi}updatePriority(e){return this.children_.isEmpty()?this:new se(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?gi:t}}getChild(e){const t=ce(e);return t===null?this:this.getImmediateChild(t).getChild(be(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(H(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new he(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?gi:this.priorityNode_;return new se(s,o,r)}}updateChild(e,t){const i=ce(e);if(i===null)return t;{H(ce(e)!==".priority"||tn(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(be(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(Se,(o,a)=>{t[o]=a.val(e),i++,r&&se.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Pu(this.getPriority().val())+":"),this.forEachChild(Se,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":au(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new he(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new he(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new he(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,he.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,he.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Yi?-1:0}withIndex(e){if(e===Bn||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new se(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Bn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(Se),s=t.getIterator(Se);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Bn?null:this.indexMap_.get(e.toString())}}se.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Pg extends se{constructor(){super(new He(Go),se.EMPTY_NODE,St.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return se.EMPTY_NODE}isEmpty(){return!1}}const Yi=new Pg;Object.defineProperties(he,{MIN:{value:new he(jn,se.EMPTY_NODE)},MAX:{value:new he(vn,Yi)}});xu.__EMPTY_NODE=se.EMPTY_NODE;Le.__childrenNodeConstructor=se;kg(Yi);Tg(Yi);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ng=!0;function Ae(n,e=null){if(n===null)return se.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),H(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new Le(t,Ae(e))}if(!(n instanceof Array)&&Ng){const t=[];let i=!1;if(Me(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=Ae(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),t.push(new he(o,l)))}}),t.length===0)return se.EMPTY_NODE;const r=js(t,Cg,o=>o.name,Go);if(i){const o=js(t,Se.getCompare());return new se(r,Ae(e),new St({".priority":o},{".priority":Se}))}else return new se(r,Ae(e),St.Default)}else{let t=se.EMPTY_NODE;return Me(n,(i,s)=>{if(yt(n,i)&&i.substring(0,1)!=="."){const r=Ae(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(Ae(e))}}Sg(Ae);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Og extends fr{constructor(e){super(),this.indexPath_=e,H(!de(e)&&ce(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?In(e.name,t.name):r}makePost(e,t){const i=Ae(e),s=se.EMPTY_NODE.updateChild(this.indexPath_,i);return new he(t,s)}maxPost(){const e=se.EMPTY_NODE.updateChild(this.indexPath_,Yi);return new he(vn,e)}toString(){return Mi(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lg extends fr{compare(e,t){const i=e.node.compareTo(t.node);return i===0?In(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return he.MIN}maxPost(){return he.MAX}makePost(e,t){const i=Ae(e);return new he(t,i)}toString(){return".value"}}const Dg=new Lg;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Du(n){return{type:"value",snapshotNode:n}}function Hn(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Bi(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Ui(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Fg(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qo{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){H(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(Bi(t,a)):H(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Hn(t,i)):o.trackChildChange(Ui(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(Se,(s,r)=>{t.hasChild(s)||i.trackChildChange(Bi(s,r))}),t.isLeafNode()||t.forEachChild(Se,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Ui(s,r,o))}else i.trackChildChange(Hn(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?se.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{constructor(e){this.indexedFilter_=new qo(e.getIndex()),this.index_=e.getIndex(),this.startPost_=zi.getStartPost_(e),this.endPost_=zi.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new he(t,i))||(i=se.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=se.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(se.EMPTY_NODE);const r=this;return t.forEachChild(Se,(o,a)=>{r.matches(new he(o,a))||(s=s.updateImmediateChild(o,se.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mg{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new zi(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new he(t,i))||(i=se.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=se.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=se.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(se.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,se.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(f,p)=>u(p,f)}else o=this.index_.getCompare();const a=e;H(a.numChildren()===this.limit_,"");const l=new he(t,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let f=s.getChildAfterChild(this.index_,c,this.reverse_);for(;f!=null&&(f.name===t||a.hasChild(f.name));)f=s.getChildAfterChild(this.index_,f,this.reverse_);const p=f==null?1:o(f,l);if(h&&!i.isEmpty()&&p>=0)return r!=null&&r.trackChildChange(Ui(t,i,u)),a.updateImmediateChild(t,i);{r!=null&&r.trackChildChange(Bi(t,u));const g=a.updateImmediateChild(t,se.EMPTY_NODE);return f!=null&&this.rangedFilter_.matches(f)?(r!=null&&r.trackChildChange(Hn(f.name,f.node)),g.updateImmediateChild(f.name,f.node)):g}}else return i.isEmpty()?e:h&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Bi(c.name,c.node)),r.trackChildChange(Hn(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(c.name,se.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ko{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=Se}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return H(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return H(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:jn}hasEnd(){return this.endSet_}getIndexEndValue(){return H(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return H(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:vn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return H(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===Se}copy(){const e=new Ko;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Bg(n){return n.loadsAllData()?new qo(n.getIndex()):n.hasLimit()?new Mg(n):new zi(n)}function bl(n){const e={};if(n.isDefault())return e;let t;if(n.index_===Se?t="$priority":n.index_===Dg?t="$value":n.index_===Bn?t="$key":(H(n.index_ instanceof Og,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=Ne(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=Ne(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+Ne(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=Ne(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+Ne(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function wl(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==Se&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs extends Su{constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Ki("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(H(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Hs.getListenId_(e,i),a={};this.listens_[o]=a;const l=bl(e._queryParams);this.restRequest_(r+".json",l,(c,h)=>{let u=h;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,i),Un(this.listens_,o)===a){let f;c?c===401?f="permission_denied":f="rest_error:"+c:f="ok",s(f,null)}})}unlisten(e,t){const i=Hs.getListenId_(e,t);delete this.listens_[i]}get(e){const t=bl(e._queryParams),i=e._path.toString(),s=new ht;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+ei(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Oi(a.responseText)}catch{We("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&We("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(){this.rootNode_=se.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vs(){return{value:null,children:new Map}}function si(n,e,t){if(de(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=ce(e);n.children.has(i)||n.children.set(i,Vs());const s=n.children.get(i);e=be(e),si(s,e,t)}}function ao(n,e){if(de(e))return n.value=null,n.children.clear(),!0;if(n.value!==null){if(n.value.isLeafNode())return!1;{const t=n.value;return n.value=null,t.forEachChild(Se,(i,s)=>{si(n,new _e(i),s)}),ao(n,e)}}else if(n.children.size>0){const t=ce(e);return e=be(e),n.children.has(t)&&ao(n.children.get(t),e)&&n.children.delete(t),n.children.size===0}else return!0}function lo(n,e,t){n.value!==null?t(e,n.value):zg(n,(i,s)=>{const r=new _e(e.toString()+"/"+i);lo(s,r,t)})}function zg(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $g{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&Me(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const El=10*1e3,Wg=30*1e3,jg=5*60*1e3;class Hg{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new $g(e);const i=El+(Wg-El)*Math.random();wi(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;Me(e,(s,r)=>{r>0&&yt(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),wi(this.reportStats_.bind(this),Math.floor(Math.random()*2*jg))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var lt;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(lt||(lt={}));function Yo(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Zo(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Jo(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gs{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=lt.ACK_USER_WRITE,this.source=Yo()}operationForChild(e){if(de(this.path)){if(this.affectedTree.value!=null)return H(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new _e(e));return new Gs(ge(),t,this.revert)}}else return H(ce(this.path)===e,"operationForChild called for unrelated child."),new Gs(be(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(e,t){this.source=e,this.path=t,this.type=lt.LISTEN_COMPLETE}operationForChild(e){return de(this.path)?new $i(this.source,ge()):new $i(this.source,be(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=lt.OVERWRITE}operationForChild(e){return de(this.path)?new yn(this.source,ge(),this.snap.getImmediateChild(e)):new yn(this.source,be(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=lt.MERGE}operationForChild(e){if(de(this.path)){const t=this.children.subtree(new _e(e));return t.isEmpty()?null:t.value?new yn(this.source,ge(),t.value):new Vn(this.source,ge(),t)}else return H(ce(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Vn(this.source,be(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(de(e))return this.isFullyInitialized()&&!this.filtered_;const t=ce(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vg{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Gg(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Fg(o.childName,o.snapshotNode))}),_i(n,s,"child_removed",e,i,t),_i(n,s,"child_added",e,i,t),_i(n,s,"child_moved",r,i,t),_i(n,s,"child_changed",e,i,t),_i(n,s,"value",e,i,t),s}function _i(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,l)=>Kg(n,a,l)),o.forEach(a=>{const l=qg(n,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function qg(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Kg(n,e,t){if(e.childName==null||t.childName==null)throw Xn("Should only compare child_ events.");const i=new he(e.childName,e.snapshotNode),s=new he(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pr(n,e){return{eventCache:n,serverCache:e}}function Ei(n,e,t,i){return pr(new nn(e,t,i),n.serverCache)}function Fu(n,e,t,i){return pr(n.eventCache,new nn(e,t,i))}function qs(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function bn(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let jr;const Yg=()=>(jr||(jr=new He(Om)),jr);class Ce{constructor(e,t=Yg()){this.value=e,this.children=t}static fromObject(e){let t=new Ce(null);return Me(e,(i,s)=>{t=t.set(new _e(i),s)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:ge(),value:this.value};if(de(e))return null;{const i=ce(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(be(e),t);return r!=null?{path:ke(new _e(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(de(e))return this;{const t=ce(e),i=this.children.get(t);return i!==null?i.subtree(be(e)):new Ce(null)}}set(e,t){if(de(e))return new Ce(t,this.children);{const i=ce(e),r=(this.children.get(i)||new Ce(null)).set(be(e),t),o=this.children.insert(i,r);return new Ce(this.value,o)}}remove(e){if(de(e))return this.children.isEmpty()?new Ce(null):new Ce(null,this.children);{const t=ce(e),i=this.children.get(t);if(i){const s=i.remove(be(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new Ce(null):new Ce(this.value,r)}else return this}}get(e){if(de(e))return this.value;{const t=ce(e),i=this.children.get(t);return i?i.get(be(e)):null}}setTree(e,t){if(de(e))return t;{const i=ce(e),r=(this.children.get(i)||new Ce(null)).setTree(be(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new Ce(this.value,o)}}fold(e){return this.fold_(ge(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(ke(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,ge(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(de(e))return null;{const r=ce(e),o=this.children.get(r);return o?o.findOnPath_(be(e),ke(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,ge(),t)}foreachOnPath_(e,t,i){if(de(e))return this;{this.value&&i(t,this.value);const s=ce(e),r=this.children.get(s);return r?r.foreachOnPath_(be(e),ke(t,s),i):new Ce(null)}}foreach(e){this.foreach_(ge(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(ke(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e){this.writeTree_=e}static empty(){return new ut(new Ce(null))}}function Ii(n,e,t){if(de(e))return new ut(new Ce(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=$e(s,e);return r=r.updateChild(o,t),new ut(n.writeTree_.set(s,r))}else{const s=new Ce(t),r=n.writeTree_.setTree(e,s);return new ut(r)}}}function co(n,e,t){let i=n;return Me(t,(s,r)=>{i=Ii(i,ke(e,s),r)}),i}function Il(n,e){if(de(e))return ut.empty();{const t=n.writeTree_.setTree(e,new Ce(null));return new ut(t)}}function uo(n,e){return Cn(n,e)!=null}function Cn(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild($e(t.path,e)):null}function Cl(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(Se,(i,s)=>{e.push(new he(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new he(i,s.value))}),e}function Jt(n,e){if(de(e))return n;{const t=Cn(n,e);return t!=null?new ut(new Ce(t)):new ut(n.writeTree_.subtree(e))}}function ho(n){return n.writeTree_.isEmpty()}function Gn(n,e){return Mu(ge(),n.writeTree_,e)}function Mu(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(H(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=Mu(ke(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(ke(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mr(n,e){return $u(e,n)}function Zg(n,e,t,i,s){H(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=Ii(n.visibleWrites,e,t)),n.lastWriteId=i}function Jg(n,e,t,i){H(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=co(n.visibleWrites,e,t),n.lastWriteId=i}function Qg(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function Xg(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);H(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&e_(a,i.path)?s=!1:it(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return t_(n),!0;if(i.snap)n.visibleWrites=Il(n.visibleWrites,i.path);else{const a=i.children;Me(a,l=>{n.visibleWrites=Il(n.visibleWrites,ke(i.path,l))})}return!0}else return!1}function e_(n,e){if(n.snap)return it(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&it(ke(n.path,t),e))return!0;return!1}function t_(n){n.visibleWrites=Bu(n.allWrites,n_,ge()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function n_(n){return n.visible}function Bu(n,e,t){let i=ut.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)it(t,o)?(a=$e(t,o),i=Ii(i,a,r.snap)):it(o,t)&&(a=$e(o,t),i=Ii(i,ge(),r.snap.getChild(a)));else if(r.children){if(it(t,o))a=$e(t,o),i=co(i,a,r.children);else if(it(o,t))if(a=$e(o,t),de(a))i=co(i,ge(),r.children);else{const l=Un(r.children,ce(a));if(l){const c=l.getChild(be(a));i=Ii(i,ge(),c)}}}else throw Xn("WriteRecord should have .snap or .children")}}return i}function Uu(n,e,t,i,s){if(!i&&!s){const r=Cn(n.visibleWrites,e);if(r!=null)return r;{const o=Jt(n.visibleWrites,e);if(ho(o))return t;if(t==null&&!uo(o,ge()))return null;{const a=t||se.EMPTY_NODE;return Gn(o,a)}}}else{const r=Jt(n.visibleWrites,e);if(!s&&ho(r))return t;if(!s&&t==null&&!uo(r,ge()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(it(c.path,e)||it(e,c.path))},a=Bu(n.allWrites,o,e),l=t||se.EMPTY_NODE;return Gn(a,l)}}}function i_(n,e,t){let i=se.EMPTY_NODE;const s=Cn(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(Se,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=Jt(n.visibleWrites,e);return t.forEachChild(Se,(o,a)=>{const l=Gn(Jt(r,new _e(o)),a);i=i.updateImmediateChild(o,l)}),Cl(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Jt(n.visibleWrites,e);return Cl(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function s_(n,e,t,i,s){H(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=ke(e,t);if(uo(n.visibleWrites,r))return null;{const o=Jt(n.visibleWrites,r);return ho(o)?s.getChild(t):Gn(o,s.getChild(t))}}function r_(n,e,t,i){const s=ke(e,t),r=Cn(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=Jt(n.visibleWrites,s);return Gn(o,i.getNode().getImmediateChild(t))}else return null}function o_(n,e){return Cn(n.visibleWrites,e)}function a_(n,e,t,i,s,r,o){let a;const l=Jt(n.visibleWrites,e),c=Cn(l,ge());if(c!=null)a=c;else if(t!=null)a=Gn(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const h=[],u=o.getCompare(),f=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let p=f.getNext();for(;p&&h.length<s;)u(p,i)!==0&&h.push(p),p=f.getNext();return h}else return[]}function l_(){return{visibleWrites:ut.empty(),allWrites:[],lastWriteId:-1}}function Ks(n,e,t,i){return Uu(n.writeTree,n.treePath,e,t,i)}function Qo(n,e){return i_(n.writeTree,n.treePath,e)}function kl(n,e,t,i){return s_(n.writeTree,n.treePath,e,t,i)}function Ys(n,e){return o_(n.writeTree,ke(n.treePath,e))}function c_(n,e,t,i,s,r){return a_(n.writeTree,n.treePath,e,t,i,s,r)}function Xo(n,e,t){return r_(n.writeTree,n.treePath,e,t)}function zu(n,e){return $u(ke(n.treePath,e),n.writeTree)}function $u(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u_{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;H(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),H(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,Ui(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,Bi(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,Hn(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,Ui(i,e.snapshotNode,s.oldSnap));else throw Xn("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d_{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const Wu=new d_;class ea{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new nn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Xo(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:bn(this.viewCache_),r=c_(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h_(n){return{filter:n}}function f_(n,e){H(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),H(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function p_(n,e,t,i,s){const r=new u_;let o,a;if(t.type===lt.OVERWRITE){const c=t;c.source.fromUser?o=fo(n,e,c.path,c.snap,i,s,r):(H(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!de(c.path),o=Zs(n,e,c.path,c.snap,i,s,a,r))}else if(t.type===lt.MERGE){const c=t;c.source.fromUser?o=g_(n,e,c.path,c.children,i,s,r):(H(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=po(n,e,c.path,c.children,i,s,a,r))}else if(t.type===lt.ACK_USER_WRITE){const c=t;c.revert?o=y_(n,e,c.path,i,s,r):o=__(n,e,c.path,c.affectedTree,i,s,r)}else if(t.type===lt.LISTEN_COMPLETE)o=v_(n,e,t.path,i,r);else throw Xn("Unknown operation type: "+t.type);const l=r.getChanges();return m_(e,o,l),{viewCache:o,changes:l}}function m_(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=qs(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Du(qs(e)))}}function ju(n,e,t,i,s,r){const o=e.eventCache;if(Ys(i,t)!=null)return e;{let a,l;if(de(t))if(H(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=bn(e),h=c instanceof se?c:se.EMPTY_NODE,u=Qo(i,h);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=Ks(i,bn(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=ce(t);if(c===".priority"){H(tn(t)===1,"Can't have a priority with additional path components");const h=o.getNode();l=e.serverCache.getNode();const u=kl(i,t,h,l);u!=null?a=n.filter.updatePriority(h,u):a=o.getNode()}else{const h=be(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const f=kl(i,t,o.getNode(),l);f!=null?u=o.getNode().getImmediateChild(c).updateChild(h,f):u=o.getNode().getImmediateChild(c)}else u=Xo(i,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,h,s,r):a=o.getNode()}}return Ei(e,a,o.isFullyInitialized()||de(t),n.filter.filtersNodes())}}function Zs(n,e,t,i,s,r,o,a){const l=e.serverCache;let c;const h=o?n.filter:n.filter.getIndexedFilter();if(de(t))c=h.updateFullNode(l.getNode(),i,null);else if(h.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(t,i);c=h.updateFullNode(l.getNode(),p,null)}else{const p=ce(t);if(!l.isCompleteForPath(t)&&tn(t)>1)return e;const w=be(t),y=l.getNode().getImmediateChild(p).updateChild(w,i);p===".priority"?c=h.updatePriority(l.getNode(),y):c=h.updateChild(l.getNode(),p,y,w,Wu,null)}const u=Fu(e,c,l.isFullyInitialized()||de(t),h.filtersNodes()),f=new ea(s,u,r);return ju(n,u,t,s,f,a)}function fo(n,e,t,i,s,r,o){const a=e.eventCache;let l,c;const h=new ea(s,e,r);if(de(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,o),l=Ei(e,c,!0,n.filter.filtersNodes());else{const u=ce(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),l=Ei(e,c,a.isFullyInitialized(),a.isFiltered());else{const f=be(t),p=a.getNode().getImmediateChild(u);let w;if(de(f))w=i;else{const g=h.getCompleteChild(u);g!=null?jo(f)===".priority"&&g.getChild(Au(f)).isEmpty()?w=g:w=g.updateChild(f,i):w=se.EMPTY_NODE}if(p.equals(w))l=e;else{const g=n.filter.updateChild(a.getNode(),u,w,f,h,o);l=Ei(e,g,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Sl(n,e){return n.eventCache.isCompleteForChild(e)}function g_(n,e,t,i,s,r,o){let a=e;return i.foreach((l,c)=>{const h=ke(t,l);Sl(e,ce(h))&&(a=fo(n,a,h,c,s,r,o))}),i.foreach((l,c)=>{const h=ke(t,l);Sl(e,ce(h))||(a=fo(n,a,h,c,s,r,o))}),a}function Tl(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function po(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;de(t)?c=i:c=new Ce(null).setTree(t,i);const h=e.serverCache.getNode();return c.children.inorderTraversal((u,f)=>{if(h.hasChild(u)){const p=e.serverCache.getNode().getImmediateChild(u),w=Tl(n,p,f);l=Zs(n,l,new _e(u),w,s,r,o,a)}}),c.children.inorderTraversal((u,f)=>{const p=!e.serverCache.isCompleteForChild(u)&&f.value===null;if(!h.hasChild(u)&&!p){const w=e.serverCache.getNode().getImmediateChild(u),g=Tl(n,w,f);l=Zs(n,l,new _e(u),g,s,r,o,a)}}),l}function __(n,e,t,i,s,r,o){if(Ys(s,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(de(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return Zs(n,e,t,l.getNode().getChild(t),s,r,a,o);if(de(t)){let c=new Ce(null);return l.getNode().forEachChild(Bn,(h,u)=>{c=c.set(new _e(h),u)}),po(n,e,t,c,s,r,a,o)}else return e}else{let c=new Ce(null);return i.foreach((h,u)=>{const f=ke(t,h);l.isCompleteForPath(f)&&(c=c.set(h,l.getNode().getChild(f)))}),po(n,e,t,c,s,r,a,o)}}function v_(n,e,t,i,s){const r=e.serverCache,o=Fu(e,r.getNode(),r.isFullyInitialized()||de(t),r.isFiltered());return ju(n,o,t,i,Wu,s)}function y_(n,e,t,i,s,r){let o;if(Ys(i,t)!=null)return e;{const a=new ea(i,e,s),l=e.eventCache.getNode();let c;if(de(t)||ce(t)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=Ks(i,bn(e));else{const u=e.serverCache.getNode();H(u instanceof se,"serverChildren would be complete if leaf node"),h=Qo(i,u)}h=h,c=n.filter.updateFullNode(l,h,r)}else{const h=ce(t);let u=Xo(i,h,e.serverCache);u==null&&e.serverCache.isCompleteForChild(h)&&(u=l.getImmediateChild(h)),u!=null?c=n.filter.updateChild(l,h,u,be(t),a,r):e.eventCache.getNode().hasChild(h)?c=n.filter.updateChild(l,h,se.EMPTY_NODE,be(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Ks(i,bn(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Ys(i,ge())!=null,Ei(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b_{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new qo(i.getIndex()),r=Bg(i);this.processor_=h_(r);const o=t.serverCache,a=t.eventCache,l=s.updateFullNode(se.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(se.EMPTY_NODE,a.getNode(),null),h=new nn(l,o.isFullyInitialized(),s.filtersNodes()),u=new nn(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=pr(u,h),this.eventGenerator_=new Vg(this.query_)}get query(){return this.query_}}function w_(n){return n.viewCache_.serverCache.getNode()}function E_(n){return qs(n.viewCache_)}function I_(n,e){const t=bn(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!de(e)&&!t.getImmediateChild(ce(e)).isEmpty())?t.getChild(e):null}function Al(n){return n.eventRegistrations_.length===0}function C_(n,e){n.eventRegistrations_.push(e)}function Rl(n,e,t){const i=[];if(t){H(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function xl(n,e,t,i){e.type===lt.MERGE&&e.source.queryId!==null&&(H(bn(n.viewCache_),"We should always have a full cache before handling merges"),H(qs(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=p_(n.processor_,s,e,t,i);return f_(n.processor_,r.viewCache),H(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Hu(n,r.changes,r.viewCache.eventCache.getNode(),null)}function k_(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(Se,(r,o)=>{i.push(Hn(r,o))}),t.isFullyInitialized()&&i.push(Du(t.getNode())),Hu(n,i,t.getNode(),e)}function Hu(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return Gg(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Js;class Vu{constructor(){this.views=new Map}}function S_(n){H(!Js,"__referenceConstructor has already been defined"),Js=n}function T_(){return H(Js,"Reference.ts has not been loaded"),Js}function A_(n){return n.views.size===0}function ta(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return H(r!=null,"SyncTree gave us an op for an invalid query."),xl(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(xl(o,e,t,i));return r}}function Gu(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Ks(t,s?i:null),l=!1;a?l=!0:i instanceof se?(a=Qo(t,i),l=!1):(a=se.EMPTY_NODE,l=!1);const c=pr(new nn(a,l,!1),new nn(i,s,!1));return new b_(e,c)}return o}function R_(n,e,t,i,s,r){const o=Gu(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),C_(o,t),k_(o,t)}function x_(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=sn(n);if(s==="default")for(const[l,c]of n.views.entries())o=o.concat(Rl(c,t,i)),Al(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(s);l&&(o=o.concat(Rl(l,t,i)),Al(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!sn(n)&&r.push(new(T_())(e._repo,e._path)),{removed:r,events:o}}function qu(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Qt(n,e){let t=null;for(const i of n.views.values())t=t||I_(i,e);return t}function Ku(n,e){if(e._queryParams.loadsAllData())return gr(n);{const i=e._queryIdentifier;return n.views.get(i)}}function Yu(n,e){return Ku(n,e)!=null}function sn(n){return gr(n)!=null}function gr(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qs;function P_(n){H(!Qs,"__referenceConstructor has already been defined"),Qs=n}function N_(){return H(Qs,"Reference.ts has not been loaded"),Qs}let O_=1;class Pl{constructor(e){this.listenProvider_=e,this.syncPointTree_=new Ce(null),this.pendingWriteTree_=l_(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Zu(n,e,t,i,s){return Zg(n.pendingWriteTree_,e,t,i,s),s?ri(n,new yn(Yo(),e,t)):[]}function L_(n,e,t,i){Jg(n.pendingWriteTree_,e,t,i);const s=Ce.fromObject(t);return ri(n,new Vn(Yo(),e,s))}function Vt(n,e,t=!1){const i=Qg(n.pendingWriteTree_,e);if(Xg(n.pendingWriteTree_,e)){let r=new Ce(null);return i.snap!=null?r=r.set(ge(),!0):Me(i.children,o=>{r=r.set(new _e(o),!0)}),ri(n,new Gs(i.path,r,t))}else return[]}function Zi(n,e,t){return ri(n,new yn(Zo(),e,t))}function D_(n,e,t){const i=Ce.fromObject(t);return ri(n,new Vn(Zo(),e,i))}function F_(n,e){return ri(n,new $i(Zo(),e))}function M_(n,e,t){const i=ia(n,t);if(i){const s=sa(i),r=s.path,o=s.queryId,a=$e(r,e),l=new $i(Jo(o),a);return ra(n,r,l)}else return[]}function Xs(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Yu(o,e))){const l=x_(o,e,t,i);A_(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const h=c.findIndex(f=>f._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(f,p)=>sn(p));if(h&&!u){const f=n.syncPointTree_.subtree(r);if(!f.isEmpty()){const p=z_(f);for(let w=0;w<p.length;++w){const g=p[w],y=g.query,v=ed(n,g);n.listenProvider_.startListening(Ci(y),Wi(n,y),v.hashFn,v.onComplete)}}}!u&&c.length>0&&!i&&(h?n.listenProvider_.stopListening(Ci(e),null):c.forEach(f=>{const p=n.queryToTagMap.get(_r(f));n.listenProvider_.stopListening(Ci(f),p)}))}$_(n,c)}return a}function Ju(n,e,t,i){const s=ia(n,i);if(s!=null){const r=sa(s),o=r.path,a=r.queryId,l=$e(o,e),c=new yn(Jo(a),l,t);return ra(n,o,c)}else return[]}function B_(n,e,t,i){const s=ia(n,i);if(s){const r=sa(s),o=r.path,a=r.queryId,l=$e(o,e),c=Ce.fromObject(t),h=new Vn(Jo(a),l,c);return ra(n,o,h)}else return[]}function mo(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(f,p)=>{const w=$e(f,s);r=r||Qt(p,w),o=o||sn(p)});let a=n.syncPointTree_.get(s);a?(o=o||sn(a),r=r||Qt(a,ge())):(a=new Vu,n.syncPointTree_=n.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=se.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((p,w)=>{const g=Qt(w,ge());g&&(r=r.updateImmediateChild(p,g))}));const c=Yu(a,e);if(!c&&!e._queryParams.loadsAllData()){const f=_r(e);H(!n.queryToTagMap.has(f),"View does not exist, but we have a tag");const p=W_();n.queryToTagMap.set(f,p),n.tagToQueryMap.set(p,f)}const h=mr(n.pendingWriteTree_,s);let u=R_(a,e,t,h,r,l);if(!c&&!o&&!i){const f=Ku(a,e);u=u.concat(j_(n,e,f))}return u}function na(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=$e(o,e),c=Qt(a,l);if(c)return c});return Uu(s,e,r,t,!0)}function U_(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(c,h)=>{const u=$e(c,t);i=i||Qt(h,u)});let s=n.syncPointTree_.get(t);s?i=i||Qt(s,ge()):(s=new Vu,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new nn(i,!0,!1):null,a=mr(n.pendingWriteTree_,e._path),l=Gu(s,e,a,r?o.getNode():se.EMPTY_NODE,r);return E_(l)}function ri(n,e){return Qu(e,n.syncPointTree_,null,mr(n.pendingWriteTree_,ge()))}function Qu(n,e,t,i){if(de(n.path))return Xu(n,e,t,i);{const s=e.get(ge());t==null&&s!=null&&(t=Qt(s,ge()));let r=[];const o=ce(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,h=zu(i,o);r=r.concat(Qu(a,l,c,h))}return s&&(r=r.concat(ta(s,n,i,t))),r}}function Xu(n,e,t,i){const s=e.get(ge());t==null&&s!=null&&(t=Qt(s,ge()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=zu(i,o),h=n.operationForChild(o);h&&(r=r.concat(Xu(h,a,l,c)))}),s&&(r=r.concat(ta(s,n,i,t))),r}function ed(n,e){const t=e.query,i=Wi(n,t);return{hashFn:()=>(w_(e)||se.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?M_(n,t._path,i):F_(n,t._path);{const r=Fm(s,t);return Xs(n,t,null,r)}}}}function Wi(n,e){const t=_r(e);return n.queryToTagMap.get(t)}function _r(n){return n._path.toString()+"$"+n._queryIdentifier}function ia(n,e){return n.tagToQueryMap.get(e)}function sa(n){const e=n.indexOf("$");return H(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new _e(n.substr(0,e))}}function ra(n,e,t){const i=n.syncPointTree_.get(e);H(i,"Missing sync point for query tag that we're tracking");const s=mr(n.pendingWriteTree_,e);return ta(i,t,s,null)}function z_(n){return n.fold((e,t,i)=>{if(t&&sn(t))return[gr(t)];{let s=[];return t&&(s=qu(t)),Me(i,(r,o)=>{s=s.concat(o)}),s}})}function Ci(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(N_())(n._repo,n._path):n}function $_(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=_r(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function W_(){return O_++}function j_(n,e,t){const i=e._path,s=Wi(n,e),r=ed(n,t),o=n.listenProvider_.startListening(Ci(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)H(!sn(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,h,u)=>{if(!de(c)&&h&&sn(h))return[gr(h).query];{let f=[];return h&&(f=f.concat(qu(h).map(p=>p.query))),Me(u,(p,w)=>{f=f.concat(w)}),f}});for(let c=0;c<l.length;++c){const h=l[c];n.listenProvider_.stopListening(Ci(h),Wi(n,h))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new oa(t)}node(){return this.node_}}class aa{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=ke(this.path_,e);return new aa(this.syncTree_,t)}node(){return na(this.syncTree_,this.path_)}}const H_=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Nl=function(n,e,t){if(!n||typeof n!="object")return n;if(H(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return V_(n[".sv"],e,t);if(typeof n[".sv"]=="object")return G_(n[".sv"],e);H(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},V_=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:H(!1,"Unexpected server value: "+n)}},G_=function(n,e,t){n.hasOwnProperty("increment")||H(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&H(!1,"Unexpected increment value: "+i);const s=e.node();if(H(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},td=function(n,e,t,i){return la(e,new aa(t,n),i)},nd=function(n,e,t){return la(n,new oa(e),t)};function la(n,e,t){const i=n.getPriority().val(),s=Nl(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Nl(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new Le(a,Ae(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new Le(s))),o.forEachChild(Se,(a,l)=>{const c=la(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function ua(n,e){let t=e instanceof _e?e:new _e(e),i=n,s=ce(t);for(;s!==null;){const r=Un(i.node.children,s)||{children:{},childCount:0};i=new ca(s,i,r),t=be(t),s=ce(t)}return i}function oi(n){return n.node.value}function id(n,e){n.node.value=e,go(n)}function sd(n){return n.node.childCount>0}function q_(n){return oi(n)===void 0&&!sd(n)}function vr(n,e){Me(n.node.children,(t,i)=>{e(new ca(t,n,i))})}function rd(n,e,t,i){t&&e(n),vr(n,s=>{rd(s,e,!0)})}function K_(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Ji(n){return new _e(n.parent===null?n.name:Ji(n.parent)+"/"+n.name)}function go(n){n.parent!==null&&Y_(n.parent,n.name,n)}function Y_(n,e,t){const i=q_(t),s=yt(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,go(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,go(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z_=/[\[\].#$\/\u0000-\u001F\u007F]/,J_=/[\[\].#$\u0000-\u001F\u007F]/,Hr=10*1024*1024,da=function(n){return typeof n=="string"&&n.length!==0&&!Z_.test(n)},od=function(n){return typeof n=="string"&&n.length!==0&&!J_.test(n)},Q_=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),od(n)},ad=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!hr(n)||n&&typeof n=="object"&&yt(n,".sv")},er=function(n,e,t,i){i&&e===void 0||yr(zn(n,"value"),e,t)},yr=function(n,e,t){const i=t instanceof _e?new gg(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+cn(i));if(typeof e=="function")throw new Error(n+"contains a function "+cn(i)+" with contents = "+e.toString());if(hr(e))throw new Error(n+"contains "+e.toString()+" "+cn(i));if(typeof e=="string"&&e.length>Hr/3&&lr(e)>Hr)throw new Error(n+"contains a string greater than "+Hr+" utf8 bytes "+cn(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(Me(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!da(o)))throw new Error(n+" contains an invalid key ("+o+") "+cn(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);_g(i,o),yr(n,a,i),vg(i)}),s&&r)throw new Error(n+' contains ".value" child '+cn(i)+" in addition to actual children.")}},X_=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=Mi(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!da(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(mg);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&it(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},ld=function(n,e,t,i){const s=zn(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];Me(e,(o,a)=>{const l=new _e(o);if(yr(s,a,ke(t,l)),jo(l)===".priority"&&!ad(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),X_(s,r)},ev=function(n,e,t){if(hr(e))throw new Error(zn(n,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!ad(e))throw new Error(zn(n,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},cd=function(n,e,t,i){if(!od(t))throw new Error(zn(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},tv=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),cd(n,e,t)},hn=function(n,e){if(ce(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},nv=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!da(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Q_(t))throw new Error(zn(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iv{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function br(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!Ho(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function ud(n,e,t){br(n,t),dd(n,i=>Ho(i,e))}function rt(n,e,t){br(n,t),dd(n,i=>it(i,e)||it(e,i))}function dd(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(sv(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function sv(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();bi&&Fe("event: "+t.toString()),ii(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rv="repo_interrupt",ov=25;class av{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new iv,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Vs(),this.transactionQueueTree_=new ca,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function lv(n,e,t){if(n.stats_=$o(n.repoInfo_),n.forceRestClient_||zm())n.server_=new Hs(n.repoInfo_,(i,s,r,o)=>{Ol(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Ll(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Ne(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new Tt(n.repoInfo_,e,(i,s,r,o)=>{Ol(n,i,s,r,o)},i=>{Ll(n,i)},i=>{cv(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=Vm(n.repoInfo_,()=>new Hg(n.stats_,n.server_)),n.infoData_=new Ug,n.infoSyncTree_=new Pl({startListening:(i,s,r,o)=>{let a=[];const l=n.infoData_.getNode(i._path);return l.isEmpty()||(a=Zi(n.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),ha(n,"connected",!1),n.serverSyncTree_=new Pl({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);rt(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function hd(n){const t=n.infoData_.getNode(new _e(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function wr(n){return H_({timestamp:hd(n)})}function Ol(n,e,t,i,s){n.dataUpdateCount++;const r=new _e(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const l=Os(t,c=>Ae(c));o=B_(n.serverSyncTree_,r,l,s)}else{const l=Ae(t);o=Ju(n.serverSyncTree_,r,l,s)}else if(i){const l=Os(t,c=>Ae(c));o=D_(n.serverSyncTree_,r,l)}else{const l=Ae(t);o=Zi(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=qn(n,r)),rt(n.eventQueue_,a,o)}function Ll(n,e){ha(n,"connected",e),e===!1&&fv(n)}function cv(n,e){Me(e,(t,i)=>{ha(n,t,i)})}function ha(n,e,t){const i=new _e("/.info/"+e),s=Ae(t);n.infoData_.updateSnapshot(i,s);const r=Zi(n.infoSyncTree_,i,s);rt(n.eventQueue_,i,r)}function fa(n){return n.nextWriteId_++}function uv(n,e,t){const i=U_(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=Ae(s).withIndex(e._queryParams.getIndex());mo(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Zi(n.serverSyncTree_,e._path,r);else{const a=Wi(n.serverSyncTree_,e);o=Ju(n.serverSyncTree_,e._path,r,a)}return rt(n.eventQueue_,e._path,o),Xs(n.serverSyncTree_,e,t,null,!0),r},s=>(Qi(n,"get for query "+Ne(e)+" failed: "+s),Promise.reject(new Error(s))))}function dv(n,e,t,i,s){Qi(n,"set",{path:e.toString(),value:t,priority:i});const r=wr(n),o=Ae(t,i),a=na(n.serverSyncTree_,e),l=nd(o,a,r),c=fa(n),h=Zu(n.serverSyncTree_,e,l,c,!0);br(n.eventQueue_,h),n.server_.put(e.toString(),o.val(!0),(f,p)=>{const w=f==="ok";w||We("set at "+e+" failed: "+f);const g=Vt(n.serverSyncTree_,c,!w);rt(n.eventQueue_,e,g),rn(n,s,f,p)});const u=ma(n,e);qn(n,u),rt(n.eventQueue_,u,[])}function hv(n,e,t,i){Qi(n,"update",{path:e.toString(),value:t});let s=!0;const r=wr(n),o={};if(Me(t,(a,l)=>{s=!1,o[a]=td(ke(e,a),Ae(l),n.serverSyncTree_,r)}),s)Fe("update() called with empty data.  Don't do anything."),rn(n,i,"ok",void 0);else{const a=fa(n),l=L_(n.serverSyncTree_,e,o,a);br(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,h)=>{const u=c==="ok";u||We("update at "+e+" failed: "+c);const f=Vt(n.serverSyncTree_,a,!u),p=f.length>0?qn(n,e):e;rt(n.eventQueue_,p,f),rn(n,i,c,h)}),Me(t,c=>{const h=ma(n,ke(e,c));qn(n,h)}),rt(n.eventQueue_,e,[])}}function fv(n){Qi(n,"onDisconnectEvents");const e=wr(n),t=Vs();lo(n.onDisconnect_,ge(),(s,r)=>{const o=td(s,r,n.serverSyncTree_,e);si(t,s,o)});let i=[];lo(t,ge(),(s,r)=>{i=i.concat(Zi(n.serverSyncTree_,s,r));const o=ma(n,s);qn(n,o)}),n.onDisconnect_=Vs(),rt(n.eventQueue_,ge(),i)}function pv(n,e,t){n.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&ao(n.onDisconnect_,e),rn(n,t,i,s)})}function Dl(n,e,t,i){const s=Ae(t);n.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&si(n.onDisconnect_,e,s),rn(n,i,r,o)})}function mv(n,e,t,i,s){const r=Ae(t,i);n.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&si(n.onDisconnect_,e,r),rn(n,s,o,a)})}function gv(n,e,t,i){if(Ns(t)){Fe("onDisconnect().update() called with empty data.  Don't do anything."),rn(n,i,"ok",void 0);return}n.server_.onDisconnectMerge(e.toString(),t,(s,r)=>{s==="ok"&&Me(t,(o,a)=>{const l=Ae(a);si(n.onDisconnect_,ke(e,o),l)}),rn(n,i,s,r)})}function _v(n,e,t){let i;ce(e._path)===".info"?i=mo(n.infoSyncTree_,e,t):i=mo(n.serverSyncTree_,e,t),ud(n.eventQueue_,e._path,i)}function _o(n,e,t){let i;ce(e._path)===".info"?i=Xs(n.infoSyncTree_,e,t):i=Xs(n.serverSyncTree_,e,t),ud(n.eventQueue_,e._path,i)}function vv(n){n.persistentConnection_&&n.persistentConnection_.interrupt(rv)}function Qi(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),Fe(t,...e)}function rn(n,e,t,i){e&&ii(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function fd(n,e,t){return na(n.serverSyncTree_,e,t)||se.EMPTY_NODE}function pa(n,e=n.transactionQueueTree_){if(e||Er(n,e),oi(e)){const t=md(n,e);H(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&yv(n,Ji(e),t)}else sd(e)&&vr(e,t=>{pa(n,t)})}function yv(n,e,t){const i=t.map(c=>c.currentWriteId),s=fd(n,e,i);let r=s;const o=s.hash();for(let c=0;c<t.length;c++){const h=t[c];H(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const u=$e(e,h.path);r=r.updateChild(u,h.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{Qi(n,"transaction put response",{path:l.toString(),status:c});let h=[];if(c==="ok"){const u=[];for(let f=0;f<t.length;f++)t[f].status=2,h=h.concat(Vt(n.serverSyncTree_,t[f].currentWriteId)),t[f].onComplete&&u.push(()=>t[f].onComplete(null,!0,t[f].currentOutputSnapshotResolved)),t[f].unwatcher();Er(n,ua(n.transactionQueueTree_,e)),pa(n,n.transactionQueueTree_),rt(n.eventQueue_,e,h);for(let f=0;f<u.length;f++)ii(u[f])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{We("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}qn(n,e)}},o)}function qn(n,e){const t=pd(n,e),i=Ji(t),s=md(n,t);return bv(n,s,i),i}function bv(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=$e(t,l.path);let h=!1,u;if(H(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)h=!0,u=l.abortReason,s=s.concat(Vt(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=ov)h=!0,u="maxretry",s=s.concat(Vt(n.serverSyncTree_,l.currentWriteId,!0));else{const f=fd(n,l.path,o);l.currentInputSnapshot=f;const p=e[a].update(f.val());if(p!==void 0){yr("transaction failed: Data returned ",p,l.path);let w=Ae(p);typeof p=="object"&&p!=null&&yt(p,".priority")||(w=w.updatePriority(f.getPriority()));const y=l.currentWriteId,v=wr(n),_=nd(w,f,v);l.currentOutputSnapshotRaw=w,l.currentOutputSnapshotResolved=_,l.currentWriteId=fa(n),o.splice(o.indexOf(y),1),s=s.concat(Zu(n.serverSyncTree_,l.path,_,l.currentWriteId,l.applyLocally)),s=s.concat(Vt(n.serverSyncTree_,y,!0))}else h=!0,u="nodata",s=s.concat(Vt(n.serverSyncTree_,l.currentWriteId,!0))}rt(n.eventQueue_,t,s),s=[],h&&(e[a].status=2,function(f){setTimeout(f,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(u),!1,null))))}Er(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)ii(i[a]);pa(n,n.transactionQueueTree_)}function pd(n,e){let t,i=n.transactionQueueTree_;for(t=ce(e);t!==null&&oi(i)===void 0;)i=ua(i,t),e=be(e),t=ce(e);return i}function md(n,e){const t=[];return gd(n,e,t),t.sort((i,s)=>i.order-s.order),t}function gd(n,e,t){const i=oi(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);vr(e,s=>{gd(n,s,t)})}function Er(n,e){const t=oi(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,id(e,t.length>0?t:void 0)}vr(e,i=>{Er(n,i)})}function ma(n,e){const t=Ji(pd(n,e)),i=ua(n.transactionQueueTree_,e);return K_(i,s=>{Vr(n,s)}),Vr(n,i),rd(i,s=>{Vr(n,s)}),t}function Vr(n,e){const t=oi(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(H(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(H(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(Vt(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?id(e,void 0):t.length=r+1,rt(n.eventQueue_,Ji(e),s);for(let o=0;o<i.length;o++)ii(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wv(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Ev(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):We(`Invalid query segment '${t}' in query '${n}'`)}return e}const Fl=function(n,e){const t=Iv(n),i=t.namespace;t.domain==="firebase.com"&&xt(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&xt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Pm();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new yu(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new _e(t.pathString)}},Iv=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let h=n.indexOf("/");h===-1&&(h=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(h,u)),h<u&&(s=wv(n.substring(h,u)));const f=Ev(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const p=e.slice(0,c);if(p.toLowerCase()==="localhost")t="localhost";else if(p.split(".").length<=2)t=p;else{const w=e.indexOf(".");i=e.substring(0,w).toLowerCase(),t=e.substring(w+1),r=i}"ns"in f&&(r=f.ns)}return{host:e,port:l,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ml="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Cv=function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Ml.charAt(t%64),t=Math.floor(t/64);H(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Ml.charAt(e[s]);return H(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _d{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Ne(this.snapshot.exportVal())}}class vd{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ga{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return H(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kv{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new ht;return pv(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){hn("OnDisconnect.remove",this._path);const e=new ht;return Dl(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){hn("OnDisconnect.set",this._path),er("OnDisconnect.set",e,this._path,!1);const t=new ht;return Dl(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){hn("OnDisconnect.setWithPriority",this._path),er("OnDisconnect.setWithPriority",e,this._path,!1),ev("OnDisconnect.setWithPriority",t);const i=new ht;return mv(this._repo,this._path,e,t,i.wrapCallback(()=>{})),i.promise}update(e){hn("OnDisconnect.update",this._path),ld("OnDisconnect.update",e,this._path);const t=new ht;return gv(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return de(this._path)?null:jo(this._path)}get ref(){return new bt(this._repo,this._path)}get _queryIdentifier(){const e=wl(this._queryParams),t=Uo(e);return t==="{}"?"default":t}get _queryObject(){return wl(this._queryParams)}isEqual(e){if(e=Be(e),!(e instanceof _a))return!1;const t=this._repo===e._repo,i=Ho(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+pg(this._path)}}class bt extends _a{constructor(e,t){super(e,t,new Ko,!1)}get parent(){const e=Au(this._path);return e===null?null:new bt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Kn{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new _e(e),i=Yn(this.ref,e);return new Kn(this._node.getChild(t),i,Se)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Kn(s,Yn(this.ref,i),Se)))}hasChild(e){const t=new _e(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function ye(n,e){return n=Be(n),n._checkNotDeleted("ref"),e!==void 0?Yn(n._root,e):n._root}function Yn(n,e){return n=Be(n),ce(n._path)===null?tv("child","path",e):cd("child","path",e),new bt(n._repo,ke(n._path,e))}function An(n){return n=Be(n),new kv(n._repo,n._path)}function Sv(n,e){n=Be(n),hn("push",n._path),er("push",e,n._path,!0);const t=hd(n._repo),i=Cv(t),s=Yn(n,i),r=Yn(n,i);let o;return e!=null?o=fn(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function Xe(n){return hn("remove",n._path),fn(n,null)}function fn(n,e){n=Be(n),hn("set",n._path),er("set",e,n._path,!1);const t=new ht;return dv(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function yd(n,e){ld("update",e,n._path);const t=new ht;return hv(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Tv(n){n=Be(n);const e=new ga(()=>{}),t=new Xi(e);return uv(n._repo,n,t).then(i=>new Kn(i,new bt(n._repo,n._path),n._queryParams.getIndex()))}class Xi{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new _d("value",this,new Kn(e.snapshotNode,new bt(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new vd(this,e,t):null}matches(e){return e instanceof Xi?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class va{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new vd(this,e,t):null}createEvent(e,t){H(e.childName!=null,"Child events should have a childName.");const i=Yn(new bt(t._repo,t._path),e.childName),s=t._queryParams.getIndex();return new _d(e.type,this,new Kn(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof va?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Av(n,e,t,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const l=t,c=(h,u)=>{_o(n._repo,n,a),l(h,u)};c.userCallback=t.userCallback,c.context=t.context,t=c}const o=new ga(t,r||void 0),a=new Xi(o);return _v(n._repo,n,a),()=>_o(n._repo,n,a)}function Bt(n,e,t,i){return Av(n,"value",e,t,i)}function vo(n,e,t){let i=null;const s=t?new ga(t):null;e==="value"?i=new Xi(s):e&&(i=new va(e,s)),_o(n._repo,n,i)}S_(bt);P_(bt);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rv="FIREBASE_DATABASE_EMULATOR_HOST",yo={};let xv=!1;function Pv(n,e,t,i){n.repoInfo_=new yu(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),i&&(n.authTokenProvider_=i)}function Nv(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||xt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Fe("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Fl(r,s),a=o.repoInfo,l;typeof process<"u"&&il&&(l=il[Rv]),l?(r=`http://${l}?ns=${a.namespace}`,o=Fl(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new Wm(n.name,n.options,e);nv("Invalid Firebase Database URL",o),de(o.path)||xt("Database URL must point to the root of a Firebase Database (not including a child path).");const h=Lv(a,n,c,new $m(n.name,t));return new Dv(h,n)}function Ov(n,e){const t=yo[e];(!t||t[n.key]!==n)&&xt(`Database ${e}(${n.repoInfo_}) has already been deleted.`),vv(n),delete t[n.key]}function Lv(n,e,t,i){let s=yo[e.name];s||(s={},yo[e.name]=s);let r=s[n.toURLString()];return r&&xt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new av(n,xv,t,i),s[n.toURLString()]=r,r}class Dv{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(lv(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new bt(this._repo,ge())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Ov(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&xt("Cannot call "+e+" on a deleted database.")}}function Fv(n=vc(),e){const t=To(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=Qd("database");i&&Mv(t,...i)}return t}function Mv(n,e,t,i={}){n=Be(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&xt("Cannot call useEmulator() after instance has already been initialized.");const s=n._repoInternal;let r;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&xt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new Ss(Ss.OWNER);else if(i.mockUserToken){const o=typeof i.mockUserToken=="string"?i.mockUserToken:Xd(i.mockUserToken,n.app.options.projectId);r=new Ss(o)}Pv(s,e,t,r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bv(n){km(ti),$n(new gn("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Nv(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),Yt(sl,rl,n),Yt(sl,rl,"esm2017")}Tt.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Tt.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Bv();var bd={exports:{}};(function(n){var e=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=function(i){var s=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,r=0,o={},a={manual:i.Prism&&i.Prism.manual,disableWorkerMessageHandler:i.Prism&&i.Prism.disableWorkerMessageHandler,util:{encode:function _(b){return b instanceof l?new l(b.type,_(b.content),b.alias):Array.isArray(b)?b.map(_):b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(_){return Object.prototype.toString.call(_).slice(8,-1)},objId:function(_){return _.__id||Object.defineProperty(_,"__id",{value:++r}),_.__id},clone:function _(b,C){C=C||{};var k,T;switch(a.util.type(b)){case"Object":if(T=a.util.objId(b),C[T])return C[T];k={},C[T]=k;for(var x in b)b.hasOwnProperty(x)&&(k[x]=_(b[x],C));return k;case"Array":return T=a.util.objId(b),C[T]?C[T]:(k=[],C[T]=k,b.forEach(function(D,A){k[A]=_(D,C)}),k);default:return b}},getLanguage:function(_){for(;_;){var b=s.exec(_.className);if(b)return b[1].toLowerCase();_=_.parentElement}return"none"},setLanguage:function(_,b){_.className=_.className.replace(RegExp(s,"gi"),""),_.classList.add("language-"+b)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(k){var _=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(k.stack)||[])[1];if(_){var b=document.getElementsByTagName("script");for(var C in b)if(b[C].src==_)return b[C]}return null}},isActive:function(_,b,C){for(var k="no-"+b;_;){var T=_.classList;if(T.contains(b))return!0;if(T.contains(k))return!1;_=_.parentElement}return!!C}},languages:{plain:o,plaintext:o,text:o,txt:o,extend:function(_,b){var C=a.util.clone(a.languages[_]);for(var k in b)C[k]=b[k];return C},insertBefore:function(_,b,C,k){k=k||a.languages;var T=k[_],x={};for(var D in T)if(T.hasOwnProperty(D)){if(D==b)for(var A in C)C.hasOwnProperty(A)&&(x[A]=C[A]);C.hasOwnProperty(D)||(x[D]=T[D])}var U=k[_];return k[_]=x,a.languages.DFS(a.languages,function(Z,S){S===U&&Z!=_&&(this[Z]=x)}),x},DFS:function _(b,C,k,T){T=T||{};var x=a.util.objId;for(var D in b)if(b.hasOwnProperty(D)){C.call(b,D,b[D],k||D);var A=b[D],U=a.util.type(A);U==="Object"&&!T[x(A)]?(T[x(A)]=!0,_(A,C,null,T)):U==="Array"&&!T[x(A)]&&(T[x(A)]=!0,_(A,C,D,T))}}},plugins:{},highlightAll:function(_,b){a.highlightAllUnder(document,_,b)},highlightAllUnder:function(_,b,C){var k={callback:C,container:_,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};a.hooks.run("before-highlightall",k),k.elements=Array.prototype.slice.apply(k.container.querySelectorAll(k.selector)),a.hooks.run("before-all-elements-highlight",k);for(var T=0,x;x=k.elements[T++];)a.highlightElement(x,b===!0,k.callback)},highlightElement:function(_,b,C){var k=a.util.getLanguage(_),T=a.languages[k];a.util.setLanguage(_,k);var x=_.parentElement;x&&x.nodeName.toLowerCase()==="pre"&&a.util.setLanguage(x,k);var D=_.textContent,A={element:_,language:k,grammar:T,code:D};function U(S){A.highlightedCode=S,a.hooks.run("before-insert",A),A.element.innerHTML=A.highlightedCode,a.hooks.run("after-highlight",A),a.hooks.run("complete",A),C&&C.call(A.element)}if(a.hooks.run("before-sanity-check",A),x=A.element.parentElement,x&&x.nodeName.toLowerCase()==="pre"&&!x.hasAttribute("tabindex")&&x.setAttribute("tabindex","0"),!A.code){a.hooks.run("complete",A),C&&C.call(A.element);return}if(a.hooks.run("before-highlight",A),!A.grammar){U(a.util.encode(A.code));return}if(b&&i.Worker){var Z=new Worker(a.filename);Z.onmessage=function(S){U(S.data)},Z.postMessage(JSON.stringify({language:A.language,code:A.code,immediateClose:!0}))}else U(a.highlight(A.code,A.grammar,A.language))},highlight:function(_,b,C){var k={code:_,grammar:b,language:C};if(a.hooks.run("before-tokenize",k),!k.grammar)throw new Error('The language "'+k.language+'" has no grammar.');return k.tokens=a.tokenize(k.code,k.grammar),a.hooks.run("after-tokenize",k),l.stringify(a.util.encode(k.tokens),k.language)},tokenize:function(_,b){var C=b.rest;if(C){for(var k in C)b[k]=C[k];delete b.rest}var T=new u;return f(T,T.head,_),h(_,T,b,T.head,0),w(T)},hooks:{all:{},add:function(_,b){var C=a.hooks.all;C[_]=C[_]||[],C[_].push(b)},run:function(_,b){var C=a.hooks.all[_];if(!(!C||!C.length))for(var k=0,T;T=C[k++];)T(b)}},Token:l};i.Prism=a;function l(_,b,C,k){this.type=_,this.content=b,this.alias=C,this.length=(k||"").length|0}l.stringify=function _(b,C){if(typeof b=="string")return b;if(Array.isArray(b)){var k="";return b.forEach(function(U){k+=_(U,C)}),k}var T={type:b.type,content:_(b.content,C),tag:"span",classes:["token",b.type],attributes:{},language:C},x=b.alias;x&&(Array.isArray(x)?Array.prototype.push.apply(T.classes,x):T.classes.push(x)),a.hooks.run("wrap",T);var D="";for(var A in T.attributes)D+=" "+A+'="'+(T.attributes[A]||"").replace(/"/g,"&quot;")+'"';return"<"+T.tag+' class="'+T.classes.join(" ")+'"'+D+">"+T.content+"</"+T.tag+">"};function c(_,b,C,k){_.lastIndex=b;var T=_.exec(C);if(T&&k&&T[1]){var x=T[1].length;T.index+=x,T[0]=T[0].slice(x)}return T}function h(_,b,C,k,T,x){for(var D in C)if(!(!C.hasOwnProperty(D)||!C[D])){var A=C[D];A=Array.isArray(A)?A:[A];for(var U=0;U<A.length;++U){if(x&&x.cause==D+","+U)return;var Z=A[U],S=Z.inside,F=!!Z.lookbehind,m=!!Z.greedy,B=Z.alias;if(m&&!Z.pattern.global){var oe=Z.pattern.toString().match(/[imsuy]*$/)[0];Z.pattern=RegExp(Z.pattern.source,oe+"g")}for(var j=Z.pattern||Z,X=k.next,$=T;X!==b.tail&&!(x&&$>=x.reach);$+=X.value.length,X=X.next){var ee=X.value;if(b.length>_.length)return;if(!(ee instanceof l)){var O=1,P;if(m){if(P=c(j,$,_,F),!P||P.index>=_.length)break;var we=P.index,te=P.index+P[0].length,K=$;for(K+=X.value.length;we>=K;)X=X.next,K+=X.value.length;if(K-=X.value.length,$=K,X.value instanceof l)continue;for(var G=X;G!==b.tail&&(K<te||typeof G.value=="string");G=G.next)O++,K+=G.value.length;O--,ee=_.slice($,K),P.index-=$}else if(P=c(j,0,ee,F),!P)continue;var we=P.index,Re=P[0],ue=ee.slice(0,we),pe=ee.slice(we+Re.length),Te=$+ee.length;x&&Te>x.reach&&(x.reach=Te);var Ee=X.prev;ue&&(Ee=f(b,Ee,ue),$+=ue.length),p(b,Ee,O);var Ze=new l(D,S?a.tokenize(Re,S):Re,B,Re);if(X=f(b,Ee,Ze),pe&&f(b,X,pe),O>1){var ze={cause:D+","+U,reach:Te};h(_,b,C,X.prev,$,ze),x&&ze.reach>x.reach&&(x.reach=ze.reach)}}}}}}function u(){var _={value:null,prev:null,next:null},b={value:null,prev:_,next:null};_.next=b,this.head=_,this.tail=b,this.length=0}function f(_,b,C){var k=b.next,T={value:C,prev:b,next:k};return b.next=T,k.prev=T,_.length++,T}function p(_,b,C){for(var k=b.next,T=0;T<C&&k!==_.tail;T++)k=k.next;b.next=k,k.prev=b,_.length-=T}function w(_){for(var b=[],C=_.head.next;C!==_.tail;)b.push(C.value),C=C.next;return b}if(!i.document)return i.addEventListener&&(a.disableWorkerMessageHandler||i.addEventListener("message",function(_){var b=JSON.parse(_.data),C=b.language,k=b.code,T=b.immediateClose;i.postMessage(a.highlight(k,a.languages[C],C)),T&&i.close()},!1)),a;var g=a.util.currentScript();g&&(a.filename=g.src,g.hasAttribute("data-manual")&&(a.manual=!0));function y(){a.manual||a.highlightAll()}if(!a.manual){var v=document.readyState;v==="loading"||v==="interactive"&&g&&g.defer?document.addEventListener("DOMContentLoaded",y):window.requestAnimationFrame?window.requestAnimationFrame(y):window.setTimeout(y,16)}return a}(e);n.exports&&(n.exports=t),typeof Nn<"u"&&(Nn.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(i){i.type==="entity"&&(i.attributes.title=i.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(s,r){var o={};o["language-"+r]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[r]},o.cdata=/^<!\[CDATA\[|\]\]>$/i;var a={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:o}};a["language-"+r]={pattern:/[\s\S]+/,inside:t.languages[r]};var l={};l[s]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return s}),"i"),lookbehind:!0,greedy:!0,inside:a},t.languages.insertBefore("markup","cdata",l)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(i,s){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+i+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[s,"language-"+s],inside:t.languages[s]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,function(i){var s=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;i.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+s.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+s.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+s.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+s.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:s,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},i.languages.css.atrule.inside.rest=i.languages.css;var r=i.languages.markup;r&&(r.tag.addInlined("style","css"),r.tag.addAttribute("style","css"))}(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var i="Loading…",s=function(g,y){return"✖ Error "+g+" while fetching file: "+y},r="✖ Error: File does not exist or is empty",o={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},a="data-src-status",l="loading",c="loaded",h="failed",u="pre[data-src]:not(["+a+'="'+c+'"]):not(['+a+'="'+l+'"])';function f(g,y,v){var _=new XMLHttpRequest;_.open("GET",g,!0),_.onreadystatechange=function(){_.readyState==4&&(_.status<400&&_.responseText?y(_.responseText):_.status>=400?v(s(_.status,_.statusText)):v(r))},_.send(null)}function p(g){var y=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(g||"");if(y){var v=Number(y[1]),_=y[2],b=y[3];return _?b?[v,Number(b)]:[v,void 0]:[v,v]}}t.hooks.add("before-highlightall",function(g){g.selector+=", "+u}),t.hooks.add("before-sanity-check",function(g){var y=g.element;if(y.matches(u)){g.code="",y.setAttribute(a,l);var v=y.appendChild(document.createElement("CODE"));v.textContent=i;var _=y.getAttribute("data-src"),b=g.language;if(b==="none"){var C=(/\.(\w+)$/.exec(_)||[,"none"])[1];b=o[C]||C}t.util.setLanguage(v,b),t.util.setLanguage(y,b);var k=t.plugins.autoloader;k&&k.loadLanguages(b),f(_,function(T){y.setAttribute(a,c);var x=p(y.getAttribute("data-range"));if(x){var D=T.split(/\r\n?|\n/g),A=x[0],U=x[1]==null?D.length:x[1];A<0&&(A+=D.length),A=Math.max(0,Math.min(A-1,D.length)),U<0&&(U+=D.length),U=Math.max(0,Math.min(U,D.length)),T=D.slice(A,U).join(`
`),y.hasAttribute("data-start")||y.setAttribute("data-start",String(A+1))}v.textContent=T,t.highlightElement(v)},function(T){y.setAttribute(a,h),v.textContent=T})}}),t.plugins.fileHighlight={highlight:function(y){for(var v=(y||document).querySelectorAll(u),_=0,b;b=v[_++];)t.highlightElement(b)}};var w=!1;t.fileHighlight=function(){w||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),w=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}}()})(bd);var Uv=bd.exports;const Bl=wc(Uv);Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/});Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}});Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}});Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript"));Prism.languages.js=Prism.languages.javascript;(function(n){n.languages.typescript=n.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),n.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete n.languages.typescript.parameter,delete n.languages.typescript["literal-property"];var e=n.languages.extend("typescript",{});delete e["class-name"],n.languages.typescript["class-name"].inside=e,n.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:e}}}}),n.languages.ts=n.languages.typescript})(Prism);Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/};Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python;Prism.languages.py=Prism.languages.python;(function(n){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;n.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+e.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},n.languages.css.atrule.inside.rest=n.languages.css;var t=n.languages.markup;t&&(t.tag.addInlined("style","css"),t.tag.addAttribute("style","css"))})(Prism);Prism.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]};Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity;Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup;Prism.hooks.add("wrap",function(n){n.type==="entity"&&(n.attributes.title=n.content.replace(/&amp;/,"&"))});Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(e,t){var i={};i["language-"+t]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[t]},i.cdata=/^<!\[CDATA\[|\]\]>$/i;var s={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:i}};s["language-"+t]={pattern:/[\s\S]+/,inside:Prism.languages[t]};var r={};r[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:s},Prism.languages.insertBefore("markup","cdata",r)}});Object.defineProperty(Prism.languages.markup.tag,"addAttribute",{value:function(n,e){Prism.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+n+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:Prism.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}});Prism.languages.html=Prism.languages.markup;Prism.languages.mathml=Prism.languages.markup;Prism.languages.svg=Prism.languages.markup;Prism.languages.xml=Prism.languages.extend("markup",{});Prism.languages.ssml=Prism.languages.xml;Prism.languages.atom=Prism.languages.xml;Prism.languages.rss=Prism.languages.xml;Prism.languages.json={property:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,lookbehind:!0,greedy:!0},string:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,lookbehind:!0,greedy:!0},comment:{pattern:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},number:/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}};Prism.languages.webmanifest=Prism.languages.json;class zv{constructor(e,t,i,s,r){this.auth=e,this.db=t,this.onStatusUpdate=i||(()=>{}),this.onFileReceived=s||(()=>{}),this.onProgress=r||(()=>{}),this.deviceId=this.getOrCreateDeviceId(),this.deviceName=this.detectDeviceName(),this.peerConnection=null,this.dataChannel=null,this.activeDevices={},this.currentMode="AUTO",this.localGoServerUrl=null,this.receiveBuffer=[],this.receivedSize=0,this.incomingFileInfo=null,this.heartbeatTimer=null,this.currentRoomId=null,this.isE2EEEnabled=!0,this.isGuestMode=!1,this.cryptoKey=null}getOrCreateDeviceId(){let e=localStorage.getItem("flickmemo_device_id");return e||(e="dev_"+Math.random().toString(36).substring(2,11)+"_"+Date.now().toString(36),localStorage.setItem("flickmemo_device_id",e)),e}detectDeviceName(){const e=navigator.userAgent.toLowerCase();let t="Web Browser";return e.includes("iphone")?t="iPhone":e.includes("ipad")?t="iPad":e.includes("android")?t="Android":e.includes("macintosh")||e.includes("mac os x")?t="Mac":e.includes("windows")?t="Windows PC":e.includes("linux")&&(t="Linux PC"),`${t} (${this.deviceId.substring(4,8)})`}async initLocalGoServerCheck(){this.localGoServerUrl=null}async generateEncryptionKey(){if(!this.cryptoKey){const e=new TextEncoder().encode("FlickMemo_AES256_GCM_SecretKey_2026"),t=await window.crypto.subtle.digest("SHA-256",e);this.cryptoKey=await window.crypto.subtle.importKey("raw",t,{name:"AES-GCM"},!1,["encrypt","decrypt"])}return this.cryptoKey}async encryptChunk(e){if(!this.isE2EEEnabled)return e;const t=await this.generateEncryptionKey(),i=window.crypto.getRandomValues(new Uint8Array(12)),s=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:i},t,e),r=new Uint8Array(i.byteLength+s.byteLength);return r.set(i,0),r.set(new Uint8Array(s),i.byteLength),r.buffer}async decryptChunk(e){if(!this.isE2EEEnabled)return e;try{const t=await this.generateEncryptionKey(),i=e.slice(0,12),s=e.slice(12);return await window.crypto.subtle.decrypt({name:"AES-GCM",iv:new Uint8Array(i)},t,s)}catch{return e}}startDevicePresence(){var a;if(this.isGuestMode)return;const e=(a=this.auth)==null?void 0:a.currentUser;if(!e)return;const t=ye(this.db,`users/${e.uid}/devices/${this.deviceId}`),i=ye(this.db,`users/${e.uid}/signaling/${this.deviceId}`),s=ye(this.db,`users/${e.uid}/answers/${this.deviceId}`);An(t).remove(),An(i).remove(),An(s).remove();const r=()=>{fn(t,{id:this.deviceId,name:this.deviceName,online:!0,updatedAt:Date.now()})};r(),clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(r,2e4),Bt(i,l=>{const c=l.val();c&&c.offer&&(this.handleIncomingOffer(c.fromDeviceId,c.offer,`users/${e.uid}`),Xe(i))});const o=ye(this.db,`users/${e.uid}/devices`);Bt(o,l=>{const c=l.val()||{};this.activeDevices={};const h=Date.now();Object.keys(c).forEach(u=>{const f=c[u];u!==this.deviceId&&f&&h-(f.updatedAt||0)<25e3?this.activeDevices[u]=f:f&&h-(f.updatedAt||0)>=25e3&&Xe(ye(this.db,`users/${e.uid}/devices/${u}`))}),this.onStatusUpdate("devices_updated",this.activeDevices)})}joinRoom(e){if(!e)return;this.leaveRoom(),this.currentRoomId=e,this._myJoinedAt=Date.now(),this._roomUnsubscribers=[];const t=ye(this.db,`public_rooms/${e}/members/${this.deviceId}`),i=ye(this.db,`public_rooms/${e}/signaling/${this.deviceId}`),s=ye(this.db,`public_rooms/${e}/answers/${this.deviceId}`);try{An(t).remove().catch(()=>{}),An(i).remove().catch(()=>{}),An(s).remove().catch(()=>{}),fn(t,{id:this.deviceId,name:this.deviceName,joinedAt:this._myJoinedAt}).catch(l=>console.warn("Room join warning:",l.message))}catch{}const r=Bt(i,l=>{const c=l.val();c&&c.offer&&(this.handleIncomingOffer(c.fromDeviceId,c.offer,`public_rooms/${e}`),Xe(i).catch(()=>{}))},l=>console.warn("Room signaling error:",l.message));this._roomUnsubscribers.push(r);const o=ye(this.db,`public_rooms/${e}/members`),a=Bt(o,l=>{var u;if(this.currentRoomId!==e)return;const c=l.val()||{},h=Object.keys(c).filter(f=>f!==this.deviceId);if(h.length>0){const f=h[0],p=((u=c[f])==null?void 0:u.joinedAt)||0;this._myJoinedAt>p&&(this._connectingTo||(this._connectingTo=f,this.onStatusUpdate("room_member_joined",{roomId:e,otherDeviceId:f})))}},l=>console.warn("Room members error:",l.message));this._roomUnsubscribers.push(a),this.onStatusUpdate("room_joined",{roomId:e})}leaveRoom(){if(this._roomUnsubscribers&&(this._roomUnsubscribers.forEach(e=>{try{e()}catch{}}),this._roomUnsubscribers=[]),this._connectingTo=null,this.currentRoomId){const e=this.currentRoomId;Xe(ye(this.db,`public_rooms/${e}/members/${this.deviceId}`)).catch(()=>{}),Xe(ye(this.db,`public_rooms/${e}/signaling/${this.deviceId}`)).catch(()=>{}),Xe(ye(this.db,`public_rooms/${e}/answers/${this.deviceId}`)).catch(()=>{}),this.currentRoomId=null,this.onStatusUpdate("room_left")}}stopDevicePresence(){var t;clearInterval(this.heartbeatTimer),this.leaveRoom();const e=(t=this.auth)==null?void 0:t.currentUser;e&&(Xe(ye(this.db,`users/${e.uid}/devices/${this.deviceId}`)).catch(()=>{}),Xe(ye(this.db,`users/${e.uid}/signaling/${this.deviceId}`)).catch(()=>{}),Xe(ye(this.db,`users/${e.uid}/answers/${this.deviceId}`)).catch(()=>{}),Xe(ye(this.db,`users/${e.uid}/candidates/${this.deviceId}`)).catch(()=>{})),this.cleanupPeerConnection()}cleanupPeerConnection(){if(this._connectingTo=null,this.dataChannel){this.dataChannel.onclose=null,this.dataChannel.onmessage=null;try{this.dataChannel.close()}catch{}this.dataChannel=null}if(this.peerConnection){this.peerConnection.onicecandidate=null,this.peerConnection.onconnectionstatechange=null,this.peerConnection.ondatachannel=null;try{this.peerConnection.close()}catch{}this.peerConnection=null}this.receiveBuffer=[],this.receivedSize=0,this.incomingFileInfo=null}determineOptimalMode(e,t){return this.currentMode!=="AUTO"?this.currentMode:e&&e.online?"LAN_P2P":"WAN_P2P"}createPeerConnection(e,t){this.cleanupPeerConnection();const i={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"}]},s=new RTCPeerConnection(i);return s.onicecandidate=r=>{if(r.candidate&&e&&t){const o=ye(this.db,`${t}/candidates/${e}`);Sv(o,JSON.stringify(r.candidate))}},s.oniceconnectionstatechange=()=>{s.iceConnectionState==="connected"?this.onStatusUpdate("p2p_connected",{targetDeviceId:e}):(s.iceConnectionState==="failed"||s.iceConnectionState==="disconnected")&&this.onStatusUpdate("p2p_disconnected",{targetDeviceId:e})},s}async connectToDevice(e,t=!1){var c;const i=t&&this.currentRoomId?`public_rooms/${this.currentRoomId}`:(c=this.auth)!=null&&c.currentUser?`users/${this.auth.currentUser.uid}`:null;if(!i)throw new Error("通信パスの初期化に失敗しました。送信権限がありません。");this.peerConnection=this.createPeerConnection(e,i),this.dataChannel=this.peerConnection.createDataChannel("flickmemo_transfer",{ordered:!0}),this.setupDataChannelHandlers(this.dataChannel);const s=await this.peerConnection.createOffer();await this.peerConnection.setLocalDescription(s);const r=ye(this.db,`${i}/signaling/${e}`);await fn(r,{fromDeviceId:this.deviceId,offer:JSON.stringify(s),timestamp:Date.now()});const o=ye(this.db,`${i}/answers/${this.deviceId}`),a=async h=>{const u=h.val();if(u&&u.answer)try{const f=JSON.parse(u.answer);this.peerConnection&&this.peerConnection.signalingState==="have-local-offer"&&(await this.peerConnection.setRemoteDescription(f),vo(o,"value",a),Xe(o))}catch(f){console.warn("setRemoteDescription skipped:",f.message)}};Bt(o,a);const l=ye(this.db,`${i}/candidates/${this.deviceId}`);Bt(l,h=>{const u=h.val()||{};Object.values(u).forEach(async f=>{try{if(this.peerConnection&&this.peerConnection.signalingState!=="closed"){const p=JSON.parse(f);await this.peerConnection.addIceCandidate(p)}}catch{}})})}async handleIncomingOffer(e,t,i){const s=JSON.parse(t);this.peerConnection=this.createPeerConnection(e,i),this.peerConnection.ondatachannel=l=>{this.dataChannel=l.channel,this.setupDataChannelHandlers(this.dataChannel)},await this.peerConnection.setRemoteDescription(s);const r=await this.peerConnection.createAnswer();await this.peerConnection.setLocalDescription(r);const o=ye(this.db,`${i}/answers/${e}`);await fn(o,{fromDeviceId:this.deviceId,answer:JSON.stringify(r),timestamp:Date.now()});const a=ye(this.db,`${i}/candidates/${this.deviceId}`);Bt(a,l=>{const c=l.val()||{};Object.values(c).forEach(async h=>{try{if(this.peerConnection&&this.peerConnection.signalingState!=="closed"){const u=JSON.parse(h);await this.peerConnection.addIceCandidate(u)}}catch{}})})}setupDataChannelHandlers(e){e.binaryType="arraybuffer",e.onopen=()=>{this.onStatusUpdate("channel_open")},e.onmessage=async t=>{if(typeof t.data=="string")try{const i=JSON.parse(t.data);if(i.type==="file_header")this.incomingFileInfo=i,this.receiveBuffer=[],this.receivedSize=0,this.onProgress(0,i.size,i.name,"rec");else if(i.type==="file_end"){const s=new Blob(this.receiveBuffer,{type:this.incomingFileInfo.mime||"application/octet-stream"}),r=this.sanitizeFilename(this.incomingFileInfo.name);this.onFileReceived(s,r),this.receiveBuffer=[],this.receivedSize=0,this.incomingFileInfo=null,this.onStatusUpdate("remote_transfer_lock",!1)}else i.type==="TRANSFER_LOCK"?this.onStatusUpdate("remote_transfer_lock",!0):i.type==="TRANSFER_UNLOCK"?this.onStatusUpdate("remote_transfer_lock",!1):i.type==="EXPLICIT_DISCONNECT"&&(this.cleanupPeerConnection(),this.onStatusUpdate("p2p_disconnected"))}catch{}else if(t.data instanceof ArrayBuffer){const i=await this.decryptChunk(t.data);this.receiveBuffer.push(i),this.receivedSize+=i.byteLength,this.incomingFileInfo&&this.onProgress(this.receivedSize,this.incomingFileInfo.size,this.incomingFileInfo.name,"rec")}},e.onclose=()=>{this.onStatusUpdate("channel_close"),this.cleanupPeerConnection()}}sendControlMessage(e){if(this.dataChannel&&this.dataChannel.readyState==="open")try{this.dataChannel.send(JSON.stringify(e))}catch{}}disconnect(){this.sendControlMessage({type:"EXPLICIT_DISCONNECT"}),this.leaveRoom(),this.cleanupPeerConnection(),this.onStatusUpdate("p2p_disconnected")}async sendFileP2P(e){var t;if(this.isGuestMode||!((t=this.auth)!=null&&t.currentUser))throw new Error("ファイルを送信するにはGoogleアカウントでのログインが必要です（ゲストは受信のみ利用可能）。");if(!this.dataChannel||this.dataChannel.readyState!=="open")throw new Error("P2P接続が確立されていません。送信先デバイスを選択してください。");this.sendControlMessage({type:"TRANSFER_LOCK"});try{const s={type:"file_header",name:e.name,size:e.size,mime:e.type||"application/octet-stream"};this.dataChannel.send(JSON.stringify(s));let r=0;const o=e.size;this.dataChannel.bufferedAmountLowThreshold=256*1024,await(async()=>{for(;r<o;){this.dataChannel.bufferedAmount>1024*1024&&await new Promise(u=>{this.dataChannel.onbufferedamountlow=()=>{this.dataChannel.onbufferedamountlow=null,u()}});const c=await e.slice(r,r+65536).arrayBuffer(),h=await this.encryptChunk(c);this.dataChannel.send(h),r+=c.byteLength,this.onProgress(r,o,e.name,"send")}this.dataChannel.send(JSON.stringify({type:"file_end"}))})()}finally{this.sendControlMessage({type:"TRANSFER_UNLOCK"})}}sanitizeFilename(e){if(!e)return"download_file";let t=e.replace(/[\/\?%*:|"<>]/g,"_");return t=t.replace(/\.\./g,"_"),t.trim()||"download_file"}}const $v="1.3.37",Wv={apiKey:"AIzaSyB1Yt1bCaMmOe84_737RSMcd2NlMkPZLaE",authDomain:"flickmemo-qwe.web.app",databaseURL:"https://flickmemo-qwe-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"flickmemo-qwe",storageBucket:"flickmemo-qwe.firebasestorage.app",messagingSenderId:"998795111125",appId:"1:998795111125:web:8e40535e8f2623283a105c",measurementId:"G-ZDRMZ5VLY9"},wd=_c(Wv),tt=Im(wd),ai=Fv(wd);let an=null;function ya(n){if(!st||!n||!n.id)return;const e=ye(ai,`users/${st}/notes/${n.id}`);fn(e,n)}function es(n,e){if(!st||!n||!e)return;const t=ye(ai,`users/${st}/notes/${n}`);yd(t,e)}function ba(n){if(!st||!n)return;const e=ye(ai,`users/${st}/notes/${n}`);Xe(e)}function jv(){if(!st)return;const n=ye(ai,`users/${st}/notes`);Tv(n).then(e=>{const t=e.val();if(t){const i={};Object.keys(t).forEach(s=>{t[s].deletedAt&&(i[s]=null)}),yd(n,i)}}).catch(e=>console.error("Clear trash error:",e))}const wa=7*24*60*60*1e3,Hv=document.getElementById("splash-screen"),tr=document.getElementById("auth-container"),nr=document.getElementById("app-container"),Pt=document.getElementById("main-layout"),Vv=document.getElementById("list-container"),Ts=document.getElementById("note-list"),Gr=document.getElementById("empty-state"),me=document.getElementById("note-title-input"),ie=document.getElementById("note-body"),Pe=document.getElementById("note-code-view"),Gv=document.getElementById("status-bar"),qv=document.getElementById("status-text"),ir=document.getElementById("btn-back"),Oe=document.getElementById("search-input"),sr=document.getElementById("auth-loading"),rr=document.getElementById("auth-buttons"),li=document.getElementById("editor-toolbar"),Ke=document.getElementById("char-count"),Ye=document.getElementById("date-display"),ki=document.getElementById("btn-pin"),Ul=document.getElementById("btn-trash-indicator"),Kv=document.getElementById("btn-copy"),Ed=document.getElementById("btn-undo"),Id=document.getElementById("btn-redo"),bo=document.getElementById("btn-restore-trash"),As=document.getElementById("btn-new"),Si=document.getElementById("btn-empty-trash"),Rs=document.getElementById("trash-notice"),Xt=document.getElementById("tab-notes"),en=document.getElementById("tab-trash"),zl=document.getElementById("btn-header-transfer"),$l=document.getElementById("btn-back-to-notes"),Zn=document.getElementById("transfer-panel"),cs=document.getElementById("device-chip-list"),et=document.getElementById("dropzone-area"),Et=document.getElementById("file-input"),Wl=document.getElementById("btn-browse-files"),Jn=document.getElementById("transfer-progress-card"),Yv=document.getElementById("transfer-filename"),Zv=document.getElementById("transfer-speed"),Jv=document.getElementById("transfer-progress-fill"),Qv=document.getElementById("transfer-status-label"),Xv=document.getElementById("transfer-percent"),Ti=document.getElementById("transfer-history-list");let le=null,pt=null,qr=0;const Ir=document.getElementById("delete-modal"),ey=document.getElementById("btn-delete-cancel"),ty=document.getElementById("btn-delete-confirm"),Cr=document.getElementById("empty-trash-modal"),ny=document.getElementById("btn-empty-cancel"),iy=document.getElementById("btn-empty-confirm"),Ea=document.getElementById("logout-modal");document.getElementById("btn-logout-trigger");const sy=document.getElementById("btn-modal-cancel"),ry=document.getElementById("btn-modal-confirm"),ts=document.getElementById("settings-modal"),oy=document.getElementById("btn-settings-trigger"),ay=document.getElementById("btn-settings-close"),ly=document.getElementById("btn-update-check"),cy=document.getElementById("app-version-display"),vi=document.getElementById("user-avatar"),Cd=document.getElementById("user-name"),kd=document.getElementById("user-email"),or=document.getElementById("user-provider-tag"),uy=document.getElementById("btn-settings-logout-action"),jl=document.getElementById("btn-settings-switch-action"),Kr=document.getElementById("toast-msg"),dy=document.getElementById("toast-text"),Yr=document.getElementById("btn-toast-action");let Q={},Y=null,Ai=null,Ut=null,Ue="notes",Hl=null,st=null,Nt=null,Vl={};function Ia(n){if(!n)return;let e=null;const t=()=>{n.classList.add("is-scrolling"),clearTimeout(e),e=setTimeout(()=>{n.classList.remove("is-scrolling")},3e3)};n.addEventListener("scroll",t),n.addEventListener("mousemove",t),n.addEventListener("mouseleave",()=>{clearTimeout(e),e=setTimeout(()=>{n.classList.remove("is-scrolling")},1e3)})}Ia(Vv);Ia(ie);Ia(Pe);function qe(n,e){Gv.className=`m3-badge status-${n}`,qv.textContent=e}function ae(n,e=null){dy.textContent=n,Kr.classList.remove("hidden"),e?(Yr.classList.remove("hidden"),Yr.onclick=()=>{e(),Kr.classList.add("hidden")}):Yr.classList.add("hidden"),clearTimeout(Hl),Hl=setTimeout(()=>Kr.classList.add("hidden"),4e3)}window.addEventListener("online",()=>qe("saving","オンライン復帰・同期中..."));window.addEventListener("offline",()=>qe("offline","ローカル保存済み"));function hy(){cy.textContent=`v${$v}`}function wo(n){const t=`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" fill="#042f66" rx="32"/><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="#a8c7fa" font-size="28" font-family="sans-serif" font-weight="bold">${(n||"U").charAt(0).toUpperCase()}</text></svg>`;return"data:image/svg+xml;utf8,"+encodeURIComponent(t)}function fy(n){if(!n||!n.trim())return!1;const e=[/\bimport\s+[\s\S]*?\s+from\s+["']/,/\bexport\s+(default|const|let|var|function|class)\b/,/\binitializeApp\s*\(/,/\bgetAuth\s*\(/,/\bnew\s+Worker\s*\(/,/\bdocument\.getElementById\s*\(/,/\bwindow\.addEventListener\s*\(/,/\bfunction\s+\w+\s*\(/,/\bconst\s+\w+\s*=\s*/,/\blet\s+\w+\s*=\s*/,/\bclass\s+\w+/,/\bdef\s+\w+\s*\(/];let t=0;for(const i of e)i.test(n)&&t++;return t>=2}function Sd(n){const e=n.trim();if(!e)return!1;const t=/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(e),i=/\b(function|const|let|var|if|else|for|while|return|import|export|class|def|async|await)\b/.test(e);return t&&!i}function py(n){const e=n.trim();if(!e)return!0;if(Sd(e))return!1;if(e.startsWith("//")||e.startsWith("/*")||e.startsWith("*")||e.startsWith("#"))return!0;let t=e.replace(/\/\/.*$/,"").replace(/#.*$/,"");t=t.replace(/"[^"]*"/g,'""').replace(/'[^']*'/g,"''");const i=/\b(import|export|const|let|var|function|async|await|return|class|if|else|for|while|def|console|document|window|MutationObserver|initializeApp|getAuth)\b/.test(t),s=/[\{\}\(\)\[\];=><\+\-\*\/]/.test(t);return i||s}function ci(n=!1){const e=ie.value||"";if(!e.trim()){ie.classList.remove("hidden"),Pe.classList.add("hidden");return}const t=Y?Q[Y]:null,i=t&&t.codeCollapsed?t.codeCollapsed:{},s=fy(e),r=/```[\s\S]*?```/.test(e);let o=!1,a="",l=0;if(s){o=!0;const c=!!i.block_0;a=us("javascript",e.trim(),0,c)}else if(r){o=!0;const c=/```(\w+)?\n([\s\S]*?)```/g;let h=0,u;for(;(u=c.exec(e))!==null;){const p=e.substring(h,u.index);p.trim()&&(a+=`<p>${gt(p)}</p>`);const w=(u[1]||"javascript").toLowerCase(),g=u[2].trim(),y=!!i[`block_${l}`];a+=us(w,g,l,y),l++,h=u.index+u[0].length}const f=e.substring(h);f.trim()&&(a+=`<p>${gt(f)}</p>`)}else{const c=e.split(`
`);let h=[],u=null;if(c.forEach(f=>{const p=Sd(f),w=!p&&py(f),g=!f.trim();let y="TEXT";if(p?y="TEXT":w?y="CODE":g&&(y=u??"TEXT"),u===null)u=y,h.push(f);else if(u===y)h.push(f);else{const v=h.join(`
`).trim();if(v)if(u==="CODE"){o=!0;const _=!!i[`block_${l}`];a+=us("javascript",v,l,_),l++}else a+=`<p>${gt(v)}</p>`;h=[f],u=y}}),h.length>0){const f=h.join(`
`).trim();if(f)if(u==="CODE"){o=!0;const p=!!i[`block_${l}`];a+=us("javascript",f,l,p),l++}else a+=`<p>${gt(f)}</p>`}}o&&(n||document.activeElement!==ie)?(Pe.innerHTML=a,Bl&&Bl.highlightAllUnder(Pe),Pe.querySelectorAll(".copy-code-btn").forEach(c=>{c.onclick=h=>{h.stopPropagation();const u=decodeURIComponent(c.getAttribute("data-code"));navigator.clipboard.writeText(u),ae("コードをコピーしました")}}),Pe.querySelectorAll(".collapse-code-btn").forEach(c=>{c.onclick=h=>{h.stopPropagation();const u=c.getAttribute("data-index"),f=Pe.querySelector(`.code-block-wrapper[data-index="${u}"]`);if(t){t.codeCollapsed=t.codeCollapsed||{};const p=!f.classList.contains("is-collapsed");t.codeCollapsed[`block_${u}`]=p,f.classList.toggle("is-collapsed",p),c.querySelector("span").textContent=p?"unfold_more":"unfold_less",t.id&&(Lt(t),qe("saving","クラウドに保存中..."),es(t.id,{codeCollapsed:t.codeCollapsed}))}}}),ie.classList.add("hidden"),Pe.classList.remove("hidden")):(ie.classList.remove("hidden"),Pe.classList.add("hidden"))}Pe.onmouseup=n=>{if(n.target.closest(".copy-code-btn")||n.target.closest(".collapse-code-btn"))return;const e=Pe.getBoundingClientRect();if(n.clientX>=e.right-14)return;const t=window.getSelection();if(t&&t.toString().length>0)return;const i=Pe.scrollTop,s=n.clientY-e.top+i,r=Pe.scrollHeight||1,o=Math.min(1,Math.max(0,s/r)),a=Math.floor(ie.value.length*o);Pe.classList.add("hidden"),ie.classList.remove("hidden"),ie.scrollTop=i,ie.focus({preventScroll:!0}),setTimeout(()=>{ie.setSelectionRange(a,a),ie.scrollTop=i},10)};function us(n,e,t,i){const s=gt(e);return`
    <div class="code-block-wrapper ${i?"is-collapsed":""}" data-index="${t}">
      <div class="code-block-header">
        <span>${n}</span>
        <div class="code-header-actions">
          <button class="code-header-btn collapse-code-btn" data-index="${t}" title="折りたたみ">
            <span class="material-symbols-outlined" style="font-size:16px;">${i?"unfold_more":"unfold_less"}</span>
          </button>
          <button class="code-header-btn copy-code-btn" data-code="${encodeURIComponent(e)}" title="コピー">
            <span class="material-symbols-outlined" style="font-size:14px;">content_copy</span> コピー
          </button>
        </div>
      </div>
      <pre><code class="language-${n}">${s}</code></pre>
    </div>
  `}function gt(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}let nt=[],Ge=-1,Gl=null;function my(n=""){nt=[n],Ge=0,kr()}function gy(n){Ge>=0&&nt[Ge]===n||(clearTimeout(Gl),Gl=setTimeout(()=>{nt=nt.slice(0,Ge+1),nt.push(n),nt.length>25&&nt.shift(),Ge=nt.length-1,kr()},300))}function _y(n){if(!n)return;const e=Ts.querySelector(".note-item.active");if(!e){Ve(Oe.value);return}const t=Q[n];if(!t)return;const i=e.querySelector(".title");if(i){const s=ar(t);t.pinned&&Ue==="notes"?i.innerHTML=`<span class="material-symbols-outlined pin-icon">push_pin</span> ${gt(s)}`:i.textContent=s}}function Td(n,e){!n||!Q[n]||(Object.assign(Q[n],e),Q[n].updatedAt=Date.now(),_y(n),Ca(Q[n]),ka(),qe("saving","保存中..."),clearTimeout(Nt),Nt=setTimeout(()=>{kn(n)},750))}function kn(n){clearTimeout(Nt),Nt=null;const e=n?Q[n]:Y?Q[Y]:null;if(!e||!e.id)return;Lt(e);const t=Vl[e.id];if(t&&t.body===e.body&&t.title===e.title&&t.pinned===e.pinned){qe("synced","クラウド同期完了");return}Vl[e.id]={body:e.body,title:e.title,pinned:e.pinned},es(e.id,{body:e.body,title:e.title,pinned:e.pinned,updatedAt:e.updatedAt}),qe("synced","クラウド同期完了")}function vy(){var n;if(typeof chrome<"u"&&((n=chrome==null?void 0:chrome.action)!=null&&n.setBadgeText)){const e=Object.values(Q).filter(t=>!t.deletedAt).length;chrome.action.setBadgeText({text:e>0?String(e):""}),chrome.action.setBadgeBackgroundColor({color:"#28292a"})}}function Ad(){var n;typeof chrome<"u"&&((n=chrome==null?void 0:chrome.storage)!=null&&n.local)&&chrome.storage.local.get(["pendingQuickNote"],e=>{if(e&&e.pendingQuickNote){const t=e.pendingQuickNote;chrome.storage.local.remove("pendingQuickNote"),Rr(!0),Y&&Q[Y]&&(ie.value=t,Sa(),kn(Y),ae("選択したテキストを新しいメモに追加しました"))}})}function kr(){Ed.disabled=Ge<=0,Id.disabled=Ge>=nt.length-1}function Rd(n){if(ie.value=n,!Y||!Q[Y])return;const e={...Q[Y],id:Y,title:Q[Y].title||"",body:n,pinned:Q[Y].pinned||!1,codeCollapsed:Q[Y].codeCollapsed||{},updatedAt:Date.now()};e.id&&(Q[Y]=e,Lt(e),Ca(e),ka(),Ve(Oe.value),ci(!0),qe("saving","クラウドに保存中..."),es(Y,{body:n,updatedAt:e.updatedAt}))}Ed.onclick=()=>{Ge>0&&(Ge--,Rd(nt[Ge]),kr())};Id.onclick=()=>{Ge<nt.length-1&&(Ge++,Rd(nt[Ge]),kr())};function ar(n){if(!n)return"空のメモ";if(n.title&&n.title.trim())return n.title.trim();const e=n.body||"";if(!e.trim())return"空のメモ";const t=e.split(`
`).map(s=>s.trim()).filter(s=>s.length>0);if(t.length===0)return"空のメモ";const i=t[0];return i.replace(/^([#*\-–—•>\d\.\s]+)/,"").trim()||i}function yy(n){if(!n)return"それ以前";const e=new Date,t=new Date(n);if(e.toDateString()===t.toDateString())return"今日";const i=new Date(e);return i.setDate(e.getDate()-1),i.toDateString()===t.toDateString()?"昨日":`${t.getMonth()+1}月${t.getDate()}日`}function xd(n){if(!n)return"";const e=new Date(n);return`${e.getFullYear()}年${e.getMonth()+1}月${e.getDate()}日`}function by(n){if(!n)return 7;const e=Date.now()-n,t=wa-e,i=Math.ceil(t/(24*60*60*1e3));return Math.max(0,i)}let Ot=null;const Pd=indexedDB.open("FlickMemoDB",1);Pd.onupgradeneeded=n=>n.target.result.createObjectStore("notes",{keyPath:"id"});Pd.onsuccess=n=>{Ot=n.target.result,wy()};function wy(){if(!Ot)return;const e=Ot.transaction("notes","readonly").objectStore("notes").getAll();e.onsuccess=()=>{Q={},e.result.forEach(t=>Q[t.id]=t),Nd(),ui(),Ve(Oe.value),Ey()}}function Lt(n){if(!Ot||!n.id)return;Ot.transaction("notes","readwrite").objectStore("notes").put(n)}function ns(n){if(!Ot||!n)return;Ot.transaction("notes","readwrite").objectStore("notes").delete(n)}async function ql(){if(Q={},Y=null,Ai=null,Ut=null,ie.value="",me.value="",ie.disabled=!0,me.disabled=!0,li.classList.add("hidden"),me.classList.add("hidden"),Ke.classList.add("hidden"),Ye.classList.add("hidden"),Pe.classList.add("hidden"),Ve(""),Ot)return new Promise(n=>{const e=Ot.transaction("notes","readwrite");e.objectStore("notes").clear(),e.oncomplete=()=>n()})}function ui(n=null){let e=!1;Object.values(Q).forEach(t=>{t.id!==n&&!t.deletedAt&&(!t.body||!t.body.trim())&&(!t.title||!t.title.trim())&&(delete Q[t.id],ns(t.id),ba(t.id),e=!0)}),e&&Ve(Oe.value)}window.addEventListener("beforeunload",()=>{ui()});function Ey(){if(Ue!=="notes")return;if(window.innerWidth<=768){Pt.classList.remove("view-editor"),ir.classList.add("hidden");return}const e=Object.values(Q).find(t=>!t.deletedAt&&(!t.body||!t.body.trim())&&(!t.title||!t.title.trim()));e?wn(e.id,!0):Rr(!0)}function Nd(){const n=Date.now();Object.values(Q).forEach(e=>{e.deletedAt&&n-e.deletedAt>wa&&(delete Q[e.id],ns(e.id),ba(e.id))})}function Ve(n=""){Ts.innerHTML="";const e=Date.now(),t=Object.values(Q).filter(s=>Ue==="notes"?!s.deletedAt:!!s.deletedAt&&e-s.deletedAt<=wa).filter(s=>(s.body||"").includes(n)||(s.title||"").includes(n)).sort((s,r)=>{if(Ue==="notes"){const o=!!s.pinned,a=!!r.pinned;if(o!==a)return o?-1:1}return(r.updatedAt||0)-(s.updatedAt||0)});if(t.length===0){Gr.textContent=Ue==="notes"?"メモがありません":"ゴミ箱は空です",Gr.classList.remove("hidden");return}else Gr.classList.add("hidden");let i="";t.forEach(s=>{let r="",o="";if(Ue==="notes"&&s.pinned)r="pinned",o='<span class="material-symbols-outlined" style="font-size:15px; vertical-align:middle; color:var(--m3-primary);">push_pin</span> ピン留め';else{const u=yy(Ue==="notes"?s.updatedAt:s.deletedAt);r=u,o=u}if(r!==i){i=r;const u=document.createElement("div");u.className="date-group-header",u.innerHTML=o,Ts.appendChild(u)}const a=document.createElement("li");a.className=`note-item ${s.id===Y?"active":""}`,a.onclick=()=>wn(s.id);const l=document.createElement("div");l.className="item-content";const c=document.createElement("span");if(c.className="title",s.pinned&&Ue==="notes"?c.innerHTML=`<span class="material-symbols-outlined pin-icon">push_pin</span> ${ar(s)}`:c.textContent=ar(s),l.appendChild(c),Ue==="trash"){const u=document.createElement("span");u.className="sub-meta";const f=by(s.deletedAt);u.textContent=`${xd(s.deletedAt)} 移動 • 残り ${f}日`,l.appendChild(u)}const h=document.createElement("button");h.className="btn-delete",h.title=Ue==="notes"?"ゴミ箱へ":"完全削除",h.innerHTML=`<span class="material-symbols-outlined" style="font-size:16px;">${Ue==="notes"?"delete":"delete_forever"}</span>`,h.onclick=u=>{u.stopPropagation(),Ue==="notes"?Iy(s.id):Cy(s.id)},a.appendChild(l),a.appendChild(h),Ts.appendChild(a)})}function wn(n,e=!0,t=!1){Nt&&Y&&Y!==n&&kn(Y),t||ui(n);const i=Y===n;Y=n;const s=Q[n]||{title:"",body:"",pinned:!1,codeCollapsed:{},updatedAt:Date.now()},r=!!s.deletedAt;if(ie.disabled=r,me.disabled=r,ie.scrollTop=0,Pe.scrollTop=0,document.activeElement===me){if(me.value!==(s.title||"")){const o=me.selectionStart,a=me.selectionEnd;me.value=s.title||"",me.setSelectionRange(o,a)}}else me.value=s.title||"";if(document.activeElement===ie){if(ie.value!==(s.body||"")){const o=ie.selectionStart,a=ie.selectionEnd;ie.value=s.body||"",ie.setSelectionRange(o,a)}}else ie.value=s.body||"",i||my(s.body||"");Ca(s),li.classList.remove("hidden"),me.classList.remove("hidden"),Ke.classList.remove("hidden"),Ye.classList.remove("hidden"),r?(bo.classList.remove("hidden"),ki.classList.add("hidden"),Ul.classList.remove("hidden")):(bo.classList.add("hidden"),Ul.classList.add("hidden"),ki.classList.remove("hidden"),ki.classList.toggle("active",!!s.pinned)),ka(),Ve(Oe.value),ci(),window.innerWidth<=768&&(Pt.classList.add("view-editor"),ir.classList.remove("hidden")),e&&!r&&setTimeout(()=>{ie.focus(),ie.setSelectionRange(ie.value.length,ie.value.length)},50)}function Ca(n){if(!n)return;const e={...n,title:""},t=ar(e);me.placeholder=t==="空のメモ"?"タイトル（未入力時は自動抽出）":`自動: ${t}`}me.oninput=()=>{!Y||!Q[Y]||Td(Y,{title:me.value})};function Iy(n){Nt&&Y===n&&kn(n),Q[n]&&(Ut={...Q[n]},Q[n].deletedAt=Date.now(),Lt(Q[n]),es(n,{deletedAt:Q[n].deletedAt}),Y===n&&(Y=null,me.value="",ie.value="",ie.disabled=!0,me.disabled=!0,li.classList.add("hidden"),me.classList.add("hidden"),Ke.classList.add("hidden"),Ye.classList.add("hidden"),Pe.classList.add("hidden")),Ve(Oe.value),ae("メモをゴミ箱に移動しました",()=>{Ut&&(delete Q[Ut.id].deletedAt,Lt(Q[Ut.id]),ya(Q[Ut.id]),wn(Ut.id),ae("メモを復元しました"),Ut=null)}))}function Cy(n){Ai=n,Ir.classList.remove("hidden")}function Od(){if(!Ai)return;const n=Ai;Ir.classList.add("hidden"),delete Q[n],ns(n),ba(n),ae("メモを完全削除しました"),Y===n&&(Y=null,me.value="",ie.value="",ie.disabled=!0,me.disabled=!0,li.classList.add("hidden"),me.classList.add("hidden"),Ke.classList.add("hidden"),Ye.classList.add("hidden"),Pe.classList.add("hidden")),Ai=null,Ve(Oe.value)}ty.onclick=Od;ey.onclick=()=>Ir.classList.add("hidden");Si.onclick=()=>Cr.classList.remove("hidden");ny.onclick=()=>Cr.classList.add("hidden");function Ld(){Cr.classList.add("hidden"),Object.values(Q).forEach(n=>{n.deletedAt&&(delete Q[n.id],ns(n.id))}),jv(),Y&&(!Q[Y]||Q[Y].deletedAt)&&(Y=null,me.value="",ie.value="",ie.disabled=!0,me.disabled=!0,li.classList.add("hidden"),me.classList.add("hidden"),Ke.classList.add("hidden"),Ye.classList.add("hidden"),Pe.classList.add("hidden")),Ve(Oe.value),ae("ゴミ箱を空にしました")}iy.onclick=Ld;window.addEventListener("keydown",n=>{n.key==="Enter"&&(Ir.classList.contains("hidden")?Cr.classList.contains("hidden")||(n.preventDefault(),Ld()):(n.preventDefault(),Od()))});bo.onclick=()=>{!Y||!Q[Y]||(delete Q[Y].deletedAt,Lt(Q[Y]),ya(Q[Y]),ae("メモを復元しました"),wn(Y))};function Ri(n){if(!cs)return;cs.innerHTML="";const e=Object.keys(n||{});if(e.length===0){cs.innerHTML='<span class="no-device-text">Googleアカウントの他デバイスを検索中...（他端末でFlickMemoを開くと自動表示）</span>';return}e.forEach(t=>{const i=n[t],s=document.createElement("div");s.className=`device-chip ${pt===t?"selected":""}`,s.innerHTML=`<span class="material-symbols-outlined" style="font-size:16px;">smartphone</span> ${gt(i.name||"端末")}`,s.onclick=async()=>{var r;if(pt===t&&((r=le==null?void 0:le.dataChannel)==null?void 0:r.readyState)==="open"){le.cleanupPeerConnection(),pt=null,Ri(n),ae("接続を切断しました");return}if(pt=t,Ri(n),ae(`${i.name} へP2P接続を試みています...`),le)try{await le.connectToDevice(t)}catch(o){pt=null,Ri(n),ae("接続エラー: "+o.message)}},cs.appendChild(s)})}let mn=null;function ky(){Ti&&(Ti.innerHTML='<li class="empty-history">履歴はありません</li>')}function Dd(){mn&&clearTimeout(mn),mn=setTimeout(()=>{Jn&&Jn.classList.add("hidden")},4e3)}const Rn=document.getElementById("transfer-step-connect"),xn=document.getElementById("transfer-step-session"),Kl=document.getElementById("session-device-name"),Yl=document.getElementById("btn-disconnect-session"),xi=document.getElementById("transfer-lock-banner"),ds=document.getElementById("guest-receiver-banner"),hs=document.querySelector(".target-segmented-tabs"),fs=document.querySelector(".room-section-box:first-child"),ps=document.querySelector(".room-divider-badge"),Zl=document.getElementById("btn-settings-login-action"),ms=document.querySelector(".e2ee-toggle-card"),gs=document.getElementById("custom-mode-dropdown");function Fd(){Dt?(hs&&hs.classList.add("hidden"),zt&&zt.classList.add("hidden"),$t&&$t.classList.remove("hidden"),fs&&fs.classList.add("hidden"),ps&&ps.classList.add("hidden"),ms&&ms.classList.add("hidden"),gs&&gs.classList.add("hidden"),et&&et.classList.add("hidden"),Ni&&Ni.classList.add("hidden"),ds&&ds.classList.remove("hidden")):(hs&&hs.classList.remove("hidden"),fs&&fs.classList.remove("hidden"),ps&&ps.classList.remove("hidden"),ms&&ms.classList.remove("hidden"),gs&&gs.classList.remove("hidden"),et&&et.classList.remove("hidden"),ds&&ds.classList.add("hidden"))}function Pi(n,e){Fd(),n?(Rn==null||Rn.classList.add("hidden"),xn==null||xn.classList.remove("hidden"),Kl&&(Kl.textContent=`接続中: ${e||"相手端末"}`)):(Rn==null||Rn.classList.remove("hidden"),xn==null||xn.classList.add("hidden"),xi&&xi.classList.add("hidden"),Qn&&(Qn.disabled=!1))}Yl&&(Yl.onclick=()=>{le&&le.disconnect(),Pi(!1),ae("接続を切断しました")});function Sy(n,e){var t;if(n==="devices_updated")Ri(e);else if(n==="room_member_joined")ae("相手端末を検出しました！接続中..."),le&&e.otherDeviceId&&le.connectToDevice(e.otherDeviceId,!0);else if(n==="channel_open"){ae("P2P転送チャネルが開きました（接続完了）");const i=pt&&((t=le==null?void 0:le.activeDevices[pt])==null?void 0:t.name);Pi(!0,i)}else if(n==="channel_close"||n==="p2p_disconnected")pt=null,le&&Ri(le.activeDevices),ae("接続が切断されました"),Pi(!1),Sn(null),mn&&clearTimeout(mn),Jn&&Jn.classList.add("hidden"),ky();else if(n==="p2p_connected")ae("デバイス間P2P接続が確立しました"),Pi(!0);else if(n==="remote_transfer_lock"){const i=!!e;xi&&(i?xi.classList.remove("hidden"):xi.classList.add("hidden")),Qn&&(Qn.disabled=i)}}function Ty(n,e){const t=URL.createObjectURL(n),i=document.createElement("a");i.href=t,i.download=e,document.body.appendChild(i),i.click(),document.body.removeChild(i),setTimeout(()=>URL.revokeObjectURL(t),5e3),ae(`ファイル「${e}」を受信・保存しました`),Md(e,n.size,"受信"),Dd()}function Ay(n,e,t,i){if(!Jn)return;mn&&clearTimeout(mn),Jn.classList.remove("hidden"),Yv.textContent=`${i==="send"?"送信:":"受信:"} ${t}`;const s=Math.min(100,Math.round(n/e*100));Jv.style.width=`${s}%`,Xv.textContent=`${s}%`;const r=Date.now();(!qr||s===0)&&(qr=r);const o=(r-qr)/1e3;if(o>.2){const a=(n/1048576/o).toFixed(2);Zv.textContent=`${a} MB/s`}Qv.textContent=s>=100?"完了":`${(n/(1024*1024)).toFixed(1)} / ${(e/(1024*1024)).toFixed(1)} MB`,s>=100&&Dd()}function Md(n,e,t){if(!Ti)return;const i=Ti.querySelector(".empty-history");i&&i.remove();const s=document.createElement("li");s.className="transfer-history-item";const r=(e/(1024*1024)).toFixed(2)+" MB",o=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});s.innerHTML=`
        <div>
            <strong>${t==="送信"?"[送信]":"[受信]"} ${gt(n)}</strong>
            <span style="color:var(--m3-text-muted); font-size:0.75rem; margin-left:0.5rem;">(${r})</span>
        </div>
        <span style="color:var(--m3-text-muted); font-size:0.75rem;">${o}</span>
    `,Ti.prepend(s)}let at=[];const Ni=document.getElementById("staged-files-card"),_s=document.getElementById("staged-file-list"),vs=document.getElementById("staged-file-count"),Jl=document.getElementById("btn-clear-staged"),Ql=document.getElementById("btn-add-more-files"),Qn=document.getElementById("btn-start-send");function Sr(){if(!(!Ni||!_s)){if(at.length===0){Ni.classList.add("hidden"),_s.innerHTML="",vs&&(vs.textContent="0");return}Ni.classList.remove("hidden"),vs&&(vs.textContent=at.length.toString()),_s.innerHTML="",at.forEach((n,e)=>{const t=document.createElement("li");t.className="staged-file-item";const i=(n.size/(1024*1024)).toFixed(2)+" MB";t.innerHTML=`
            <div>
                <span class="file-name">${gt(n.name)}</span>
                <span class="file-size">(${i})</span>
            </div>
            <button class="btn-remove-staged" title="削除" type="button">
                <span class="material-symbols-outlined" style="font-size:18px;">close</span>
            </button>
        `,t.querySelector(".btn-remove-staged").onclick=()=>{at.splice(e,1),Sr()},_s.appendChild(t)})}}function Xl(n){if(!(!n||n.length===0)){if(Dt){ae("ゲストモードではファイル送信はできません（受信専用）");return}Array.from(n).forEach(e=>at.push(e)),Sr(),ae(`${n.length} 件のファイルを送信リストに追加しました`)}}et&&Et&&Wl&&(Wl.onclick=n=>{n.stopPropagation(),Et.click()},et.onclick=()=>Et.click(),et.ondragover=n=>{n.preventDefault(),et.classList.add("dragover")},et.ondragleave=()=>et.classList.remove("dragover"),et.ondrop=n=>{n.preventDefault(),et.classList.remove("dragover"),n.dataTransfer.files&&n.dataTransfer.files.length>0&&Xl(n.dataTransfer.files)},Et.onchange=()=>{Et.files&&Et.files.length>0&&(Xl(Et.files),Et.value="")});Ql&&(Ql.onclick=()=>Et.click());Jl&&(Jl.onclick=()=>{at=[],Sr(),ae("送信リストをクリアしました")});Qn&&(Qn.onclick=async()=>{if(Dt){ae("ゲストモードではファイル送信はできません（受信専用）");return}if(at.length===0){ae("送信するファイルを選択してください");return}if(!le){ae("送信機能が準備できていません");return}let n=null;try{if(at.length===1)n=at[0];else{ae("複数ファイルを軽量ZIP圧縮中...");const i=new Tf;at.forEach(o=>{i.file(o.name,o)});const s=await i.generateAsync({type:"blob",compression:"DEFLATE",compressionOptions:{level:5}}),r=new Date().toISOString().slice(0,10);n=new File([s],`FlickMemo_Files_${r}.zip`,{type:"application/zip"})}const e=pt?le.activeDevices[pt]:null,t=le.determineOptimalMode(e,n);ae(`モード [${t}] で「${n.name}」の送信を開始します...`),await le.sendFileP2P(n),Md(n.name,n.size,"送信"),ae(`✅ 「${n.name}」の送信が完了しました！`),at=[],Sr()}catch(e){console.error("Send Error:",e),ae("送信失敗: "+(e.message||"接続を確認してください"))}});function Tr(){Ue="transfer",Fd(),Pt&&Pt.classList.add("view-transfer"),Zn&&Zn.classList.remove("hidden"),Xt==null||Xt.classList.remove("active"),en==null||en.classList.remove("active"),Ye&&Ye.classList.add("hidden"),Ke&&Ke.classList.add("hidden")}function Bd(){Ue="notes",Pt&&Pt.classList.remove("view-transfer"),Xt==null||Xt.classList.add("active"),en==null||en.classList.remove("active"),As==null||As.classList.remove("hidden"),Si==null||Si.classList.add("hidden"),Rs==null||Rs.classList.add("hidden"),Zn&&Zn.classList.add("hidden"),ie==null||ie.classList.remove("hidden"),me&&me.classList.remove("hidden"),Ve(Oe.value),Y&&Q[Y]&&(Ye&&Ye.classList.remove("hidden"),Ke&&Ke.classList.remove("hidden"),ci(!0))}zl&&(zl.onclick=()=>{Tr()});$l&&($l.onclick=()=>{Bd()});const Qe=document.getElementById("custom-mode-dropdown"),ec=document.getElementById("dropdown-trigger"),Mt=document.getElementById("dropdown-menu-list"),Ry=document.getElementById("selected-mode-text");ec&&Mt&&(ec.onclick=n=>{n.stopPropagation(),!Mt.classList.contains("hidden")?(Mt.classList.add("hidden"),Qe==null||Qe.classList.remove("open")):(Mt.classList.remove("hidden"),Qe==null||Qe.classList.add("open"))},document.addEventListener("click",()=>{Mt.classList.add("hidden"),Qe==null||Qe.classList.remove("open")}),Mt.querySelectorAll(".dropdown-menu-item").forEach(n=>{n.onclick=e=>{e.stopPropagation();const t=n.getAttribute("data-value"),i=n.querySelector(".material-symbols-outlined:not(.check-icon)"),s=i?i.textContent.trim():"bolt",r=n.querySelector(".item-title").textContent.trim();Mt.querySelectorAll(".dropdown-menu-item").forEach(a=>{a.classList.remove("selected");const l=a.querySelector(".check-icon");l&&l.classList.add("hidden")}),n.classList.add("selected");const o=n.querySelector(".check-icon");o&&o.classList.remove("hidden"),Ry.innerHTML=`<span class="material-symbols-outlined mode-icon">${s}</span> ${gt(r)}`,Mt.classList.add("hidden"),Qe==null||Qe.classList.remove("open"),le&&(le.currentMode=t,ae(`送信モードを「${r}」に変更しました`))}}));const ys=document.getElementById("btn-target-tab-devices"),Gt=document.getElementById("btn-target-tab-room"),zt=document.getElementById("target-panel-devices"),$t=document.getElementById("target-panel-room");ys&&Gt&&(ys.onclick=()=>{ys.classList.add("active"),Gt.classList.remove("active"),zt==null||zt.classList.remove("hidden"),$t==null||$t.classList.add("hidden")},Gt.onclick=()=>{Gt.classList.add("active"),ys.classList.remove("active"),$t==null||$t.classList.remove("hidden"),zt==null||zt.classList.add("hidden")});const tc=document.getElementById("btn-create-room"),nc=document.getElementById("btn-join-room"),ic=document.getElementById("btn-leave-room"),pn=document.getElementById("room-code-input"),Pn=document.getElementById("room-active-status"),sc=document.getElementById("room-status-text");function Sn(n){n?(Pn==null||Pn.classList.remove("hidden"),sc&&(sc.textContent=`現在の合言葉: ${n} (接続待機中...)`),pn&&(pn.value=n)):(Pn==null||Pn.classList.add("hidden"),pn&&(pn.value=""))}function Ar(){return le||(le=new zv(tt,ai,(n,e)=>Sy(n,e),(n,e)=>Ty(n,e),(n,e,t,i)=>Ay(n,e,t,i))),le&&(le.isGuestMode=Dt),le}tc&&(tc.onclick=()=>{const n=Ar();if(!n)return;const e="rm_"+Math.random().toString(36).substring(2,8);n.joinRoom(e),Sn(e);const t=`${window.location.origin}${window.location.pathname}?room=${e}`;navigator.clipboard.writeText(t).then(()=>{ae(`ルーム ${e} を作成し共有URLをコピーしました！`)}).catch(()=>{ae(`ルーム ${e} を作成しました。URL: ${t}`)})});nc&&(nc.onclick=()=>{const n=pn==null?void 0:pn.value.trim();if(!n){ae("合言葉を入力してください");return}const e=Ar();e&&(e.joinRoom(n),Dt?ae(`合言葉「${n}」で受信待機中...`):(Sn(n),ae(`合言葉「${n}」で接続待機中...`)))});ic&&(ic.onclick=()=>{le&&le.disconnect(),Sn(null),Pi(!1),ae("切断しました")});window.addEventListener("DOMContentLoaded",()=>{const e=new URLSearchParams(window.location.search).get("room");e&&setTimeout(()=>{Tr(),le&&(le.joinRoom(e),Sn(e),ae(`共有URL経由でルーム ${e} に自動接続しました！`))},800)});Xt.onclick=Bd;en.onclick=()=>{Ue="trash",Pt&&Pt.classList.remove("view-transfer"),en.classList.add("active"),Xt.classList.remove("active"),As.classList.add("hidden"),Si.classList.remove("hidden"),Rs.classList.remove("hidden"),Zn&&Zn.classList.add("hidden"),ie.classList.remove("hidden"),me&&me.classList.remove("hidden"),Ve(Oe.value),Y&&Q[Y]&&(Ye&&Ye.classList.remove("hidden"),Ke&&Ke.classList.remove("hidden"),ci(!0))};ki.onclick=()=>{if(!Y||!Q[Y]||!Q[Y].id)return;const n=!Q[Y].pinned;Q[Y].pinned=n,ki.classList.toggle("active",n),Lt(Q[Y]),Ve(Oe.value),qe("saving","保存中..."),es(Y,{pinned:n,updatedAt:Date.now()}),ae(n?"メモをピン留めしました":"ピン留めを解除しました")};Kv.onclick=()=>{ie.value&&(navigator.clipboard.writeText(ie.value),ae("全文をコピーしました"))};function ka(){if(Ke.textContent=`${ie.value.length} 文字`,Y&&Q[Y]){const n=Q[Y].updatedAt||Date.now();Ye.textContent=xd(n)}}ir.onclick=()=>{Nt&&Y&&kn(Y),ui(),Pt.classList.remove("view-editor"),ir.classList.add("hidden")};window.addEventListener("keydown",n=>{((n.ctrlKey||n.metaKey)&&n.key.toLowerCase()==="f"||n.key==="/"&&document.activeElement!==ie&&document.activeElement!==me&&document.activeElement!==Oe)&&(n.preventDefault(),Oe.focus(),Oe.select())});function Sa(){if(!Y||!Q[Y])return;const n=ie.value;gy(n),Td(Y,{body:n})}ie.oninput=Sa;ie.addEventListener("paste",()=>{setTimeout(()=>{Sa(),ci(!0)},50)});ie.onblur=()=>{ci()};Oe.oninput=()=>Ve(Oe.value);function Rr(n=!0){Nt&&Y&&kn(Y),ui();const e="note_"+Date.now();Q[e]={id:e,title:"",body:"",pinned:!1,codeCollapsed:{},updatedAt:Date.now()},Lt(Q[e]),wn(e,n),qe("saving","新規作成中..."),ya(Q[e])}document.getElementById("btn-new").onclick=()=>Rr(!0);window.addEventListener("keydown",n=>{(n.ctrlKey||n.metaKey)&&n.key.toLowerCase()==="n"&&(n.preventDefault(),Ue==="notes"&&Rr(!0))});sy.onclick=()=>Ea.classList.add("hidden");ry.onclick=()=>{Ea.classList.add("hidden"),Vc(tt)};document.querySelectorAll(".settings-tab-btn").forEach(n=>{n.onclick=()=>{document.querySelectorAll(".settings-tab-btn").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".tab-content").forEach(t=>t.classList.add("hidden")),n.classList.add("active");const e=n.getAttribute("data-tab");document.getElementById(`tab-content-${e}`).classList.remove("hidden")}});oy.onclick=()=>{hy();const n=document.querySelector('.settings-nav .settings-tab-btn[data-tab="account"]'),e=document.querySelector('.settings-nav .settings-tab-btn[data-tab="system"]'),t=document.getElementById("settings-account-label"),i=document.getElementById("settings-account-desc"),s=document.getElementById("btn-settings-logout-action"),r=document.getElementById("btn-settings-login-action"),o=document.getElementById("btn-settings-switch-action");Dt?(t&&(t.textContent="Googleアカウントでログイン"),i&&(i.textContent="ログインするとメモの同期やデバイス間転送が利用できます"),s&&s.classList.add("hidden"),o&&o.classList.add("hidden"),r&&r.classList.remove("hidden"),e&&e.classList.add("hidden"),n&&n.click()):(t&&(t.textContent="アカウント管理"),i&&(i.textContent="別のアカウントへの切り替えまたはサインアウト"),s&&s.classList.remove("hidden"),o&&o.classList.remove("hidden"),r&&r.classList.add("hidden"),e&&e.classList.remove("hidden")),ts.classList.remove("hidden")};ay.onclick=()=>ts.classList.add("hidden");Zl&&(Zl.onclick=()=>{ts.classList.add("hidden"),Dt=!1,le&&(le.isGuestMode=!1),tr.classList.remove("hidden"),nr.classList.add("hidden"),sr.classList.add("hidden"),rr.classList.remove("hidden")});uy.onclick=()=>{ts.classList.add("hidden"),Ea.classList.remove("hidden")};jl&&(jl.onclick=async()=>{var n;ts.classList.add("hidden");try{typeof chrome<"u"&&((n=chrome==null?void 0:chrome.identity)!=null&&n.removeCachedAuthToken)&&await new Promise(e=>{chrome.identity.getAuthToken({interactive:!1},t=>{t?chrome.identity.removeCachedAuthToken({token:t},()=>{e()}):e()})}),await Vc(tt),ae("キャッシュをクリアしてログアウトしました。「Googleでログイン」を押すとアカウントが再選択できます。")}catch(e){console.error("Account switch error:",e),ae("切り替え準備に失敗しました: "+(e.message||""))}});ly.onclick=async()=>{qe("saving","最新コード取得＆キャッシュ完全消去中...");let n="最新";try{const e=await fetch(`./version.json?nocache=${Date.now()}`,{cache:"no-store"});if(e.ok){const t=await e.json();t.version&&(n=`v${t.version}`)}}catch{}try{if("caches"in window){const e=await caches.keys();await Promise.all(e.map(t=>caches.delete(t)))}if("serviceWorker"in navigator){const e=await navigator.serviceWorker.getRegistrations();for(let t of e)await t.unregister()}localStorage.removeItem("flickmemo_version_cache")}catch(e){console.error("Cache clear error:",e)}ae(`最新コード (${n}) を取得して再読み込み中...`),setTimeout(()=>{const e=new URL(window.location.href);e.searchParams.set("v",Date.now()),e.searchParams.set("reload","hard"),window.location.replace(e.toString())},400)};Up(tt).then(n=>{n&&n.user&&console.log("Redirect login successful:",n.user.email)}).catch(n=>{console.error("Redirect Result Error:",n)});async function xy(n){var e,t,i,s;try{sr.classList.remove("hidden"),rr.classList.add("hidden");const r=navigator.userAgent,o=/iPad|iPhone|iPod/.test(r)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,a=window.navigator.standalone||window.matchMedia("(display-mode: standalone)").matches;if(typeof chrome<"u"&&((e=chrome==null?void 0:chrome.runtime)!=null&&e.id)&&((t=chrome==null?void 0:chrome.identity)!=null&&t.getAuthToken))await new Promise((l,c)=>{chrome.identity.getAuthToken({interactive:!0},async h=>{var u;if(chrome.runtime.lastError||!h){const f=((u=chrome.runtime.lastError)==null?void 0:u.message)||"Googleトークンの取得に失敗しました";console.error("chrome.identity.getAuthToken error:",f),c(new Error(f));return}try{const f=ft.credential(null,h);await Mr(tt,Is),await up(tt,f),l()}catch(f){console.error("signInWithCredential error:",f),(f.code==="auth/invalid-credential"||f.code==="auth/user-token-expired")&&chrome.identity.removeCachedAuthToken({token:h},()=>{console.log("キャッシュされたトークンを削除しました。再度ログインしてください。")}),c(f)}})});else if(o||a)await Mr(tt,Is),await Ya(tt,n);else{try{await Mr(tt,Is)}catch(l){console.warn("Persistence set warning:",l)}try{await Np(tt,n)}catch(l){if(l.code==="auth/popup-blocked"||l.code==="auth/operation-not-supported-in-this-environment")console.warn("Popup blocked. Falling back to signInWithRedirect..."),await Ya(tt,n);else throw l}}}catch(r){console.error("Login Error:",r);let o=r.message||"認証に失敗しました";r.code==="auth/popup-closed-by-user"?o="ログイン画面が閉じられました。":r.code==="auth/popup-blocked"?o="ポップアップがブラウザにブロックされました。":r.code==="auth/unauthorized-domain"?o="Firebase Console の「Authentication > 設定 > 承認済みドメイン」をご確認ください。":((i=r.message)!=null&&i.includes("OAuth2 not granted or revoked")||(s=r.message)!=null&&s.includes("Not granted"))&&(o="Googleアカウントへのアクセスが拒否されました。Chromeにログイン中のGoogleアカウントを確認してください。"),alert("ログインに失敗しました: "+o),sr.classList.add("hidden"),rr.classList.remove("hidden")}}let Dt=!1;const rc=document.getElementById("btn-guest-login");rc&&(rc.onclick=()=>{Dt=!0;const n=Ar();n&&(n.isGuestMode=!0),tr.classList.add("hidden"),nr.classList.remove("hidden"),Cd.textContent="ゲストユーザー",kd.textContent="ログインしていません (ローカル保存のみ)",vi.src=wo("Guest"),or&&(or.textContent="ゲスト"),ae("ゲストモード (ローカルメモ / 合言葉受送信対応)"),loadLocalNotesOnly();const t=new URLSearchParams(window.location.search).get("room");t&&n&&(Tr(),Gt&&Gt.click(),n.joinRoom(t),Sn(t),ae(`共有URL「${t}」に自動接続しました`))});const bs=document.getElementById("toggle-e2ee");bs&&(bs.onchange=()=>{le&&(le.isE2EEEnabled=bs.checked,ae(bs.checked?"AES-256 E2EE暗号化を有効にしました":"E2EE暗号化をオフにしました"))});document.getElementById("btn-google").onclick=()=>xy(new ft);fp(tt,async n=>{var e;if(Hv.classList.add("hidden"),n){Dt=!1,le&&(le.isGuestMode=!1),st!==null&&st!==n.uid&&await ql(),st=n.uid,tr.classList.add("hidden"),nr.classList.remove("hidden");const t=n.displayName||((e=n.email)==null?void 0:e.split("@")[0])||"ユーザー",i=n.email||"メールアドレス非公開";Cd.textContent=t,kd.textContent=i,vi.onerror=()=>{vi.src=wo(t)},n.photoURL?vi.src=n.photoURL:vi.src=wo(t),or&&(or.textContent="Google"),an&&vo(an),an=ye(ai,`users/${n.uid}/notes`),Bt(an,a=>{try{const l=a.val()||{};let c=!1;if(Object.keys(Q).forEach(h=>{l[h]||(delete Q[h],ns(h),c=!0,Y===h&&(Y=null,me.value="",ie.value="",ie.disabled=!0,me.disabled=!0,li.classList.add("hidden"),me.classList.add("hidden"),Ke.classList.add("hidden"),Ye.classList.add("hidden"),Pe.classList.add("hidden")))}),Object.values(l).forEach(h=>{const u=Q[h.id];(!u||(h.updatedAt||0)>=(u.updatedAt||0))&&(!u||JSON.stringify(u)!==JSON.stringify(h))&&(Q[h.id]=h,Lt(h),c=!0)}),Nd(),c&&Ve(Oe.value),vy(),Y&&Q[Y])wn(Y,!1,!0);else if(!(window.innerWidth<=768)){const u=Object.values(Q).filter(f=>!f.deletedAt).sort((f,p)=>(p.updatedAt||0)-(f.updatedAt||0));u.length>0&&wn(u[0].id,!1,!0)}qe("synced","クラウド同期完了"),Ad()}catch(l){console.error("onValue processing error:",l),qe("synced","同期処理中にエラーが発生しました")}},a=>{console.error("Sync Error:",a),qe("offline","同期オフライン")});const s=Ar();s.startDevicePresence();const o=new URLSearchParams(window.location.search).get("room");o&&s&&(Tr(),Gt&&Gt.click(),s.joinRoom(o),Sn(o),ae(`共有URL「${o}」に自動接続しました`))}else le&&le.stopDevicePresence(),await ql(),an&&(vo(an),an=null),st=null,tr.classList.remove("hidden"),nr.classList.add("hidden"),sr.classList.add("hidden"),rr.classList.remove("hidden")});function Ud(){ui(),Y&&Nt&&kn(Y)}function zd(){le&&le.stopDevicePresence(),Ud()}window.addEventListener("beforeunload",zd);window.addEventListener("pagehide",n=>{n.persisted||zd()});document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?Ud():document.visibilityState==="visible"&&Ad()});
