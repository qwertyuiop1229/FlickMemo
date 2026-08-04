import"./modulepreload-polyfill.js";var ka={};/**
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
 */const tc={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const H=function(n,e){if(!n)throw Yn(e)},Yn=function(n){return new Error("Firebase Database ("+tc.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
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
 */const nc=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Dd=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},po={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,h=r>>2,u=(r&3)<<4|a>>4;let p=(a&15)<<2|c>>6,f=c&63;l||(f=64,o||(p=64)),i.push(t[h],t[u],t[p],t[f])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(nc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Dd(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const u=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||c==null||u==null)throw new Ld;const p=r<<2|a>>4;if(i.push(p),c!==64){const f=a<<4&240|c>>2;if(i.push(f),u!==64){const w=c<<6&192|u;i.push(w)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ld extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ic=function(n){const e=nc(n);return po.encodeByteArray(e,!0)},ws=function(n){return ic(n).replace(/\./g,"")},Es=function(n){try{return po.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Fd(n){return sc(void 0,n)}function sc(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Md(t)||(n[t]=sc(n[t],e[t]));return n}function Md(n){return n!=="__proto__"}/**
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
 */function Ud(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Bd=()=>Ud().__FIREBASE_DEFAULTS__,zd=()=>{if(typeof process>"u"||typeof ka>"u")return;const n=ka.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},$d=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Es(n[1]);return e&&JSON.parse(e)},mo=()=>{try{return Bd()||zd()||$d()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},rc=n=>{var e,t;return(t=(e=mo())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Wd=n=>{const e=rc(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},oc=()=>{var n;return(n=mo())===null||n===void 0?void 0:n.config},ac=n=>{var e;return(e=mo())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class dt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function jd(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[ws(JSON.stringify(t)),ws(JSON.stringify(o)),""].join(".")}/**
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
 */function je(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function go(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(je())}function Hd(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Vd(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function lc(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Gd(){const n=je();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function qd(){return tc.NODE_ADMIN===!0}function Kd(){try{return typeof indexedDB=="object"}catch{return!1}}function Yd(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}/**
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
 */const Zd="FirebaseError";class nn extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Zd,Object.setPrototypeOf(this,nn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,$i.prototype.create)}}class $i{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Jd(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new nn(s,a,i)}}function Jd(n,e){return n.replace(Qd,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Qd=/\{\$([^}]+)}/g;/**
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
 */function Pi(n){return JSON.parse(n)}function Ne(n){return JSON.stringify(n)}/**
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
 */const cc=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=Pi(Es(r[0])||""),t=Pi(Es(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},Xd=function(n){const e=cc(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},eh=function(n){const e=cc(n).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function vt(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Fn(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Is(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Cs(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function ks(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(Sa(r)&&Sa(o)){if(!ks(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Sa(n){return n!==null&&typeof n=="object"}/**
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
 */function Zn(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
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
 */class th{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)i[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)i[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const p=i[u-3]^i[u-8]^i[u-14]^i[u-16];i[u]=(p<<1|p>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,h;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),h=1518500249):(c=r^o^a,h=1859775393):u<60?(c=r&o|a&(r|o),h=2400959708):(c=r^o^a,h=3395469782);const p=(s<<5|s>>>27)+c+l+h+i[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=p}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function nh(n,e){const t=new ih(n,e);return t.subscribe.bind(t)}class ih{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");sh(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=yr),s.error===void 0&&(s.error=yr),s.complete===void 0&&(s.complete=yr);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function sh(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function yr(){}function Mn(n,e){return`${n} failed: ${e} argument `}/**
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
 */const rh=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,H(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Zs=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function Ue(n){return n&&n._delegate?n._delegate:n}class hn{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const rn="[DEFAULT]";/**
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
 */class oh{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new dt;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(lh(e))try{this.getOrInitializeService({instanceIdentifier:rn})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=rn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=rn){return this.instances.has(e)}getOptions(e=rn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){var i;const s=this.normalizeInstanceIdentifier(t),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:ah(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=rn){return this.component?this.component.multipleInstances?e:rn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ah(n){return n===rn?void 0:n}function lh(n){return n.instantiationMode==="EAGER"}/**
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
 */class ch{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new oh(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ve;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ve||(ve={}));const uh={debug:ve.DEBUG,verbose:ve.VERBOSE,info:ve.INFO,warn:ve.WARN,error:ve.ERROR,silent:ve.SILENT},dh=ve.INFO,hh={[ve.DEBUG]:"log",[ve.VERBOSE]:"log",[ve.INFO]:"info",[ve.WARN]:"warn",[ve.ERROR]:"error"},fh=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=hh[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class _o{constructor(e){this.name=e,this._logLevel=dh,this._logHandler=fh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ve))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?uh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ve.DEBUG,...e),this._logHandler(this,ve.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ve.VERBOSE,...e),this._logHandler(this,ve.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ve.INFO,...e),this._logHandler(this,ve.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ve.WARN,...e),this._logHandler(this,ve.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ve.ERROR,...e),this._logHandler(this,ve.ERROR,...e)}}const ph=(n,e)=>e.some(t=>n instanceof t);let Ta,Aa;function mh(){return Ta||(Ta=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function gh(){return Aa||(Aa=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const uc=new WeakMap,Ur=new WeakMap,dc=new WeakMap,br=new WeakMap,vo=new WeakMap;function _h(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(Ht(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&uc.set(t,n)}).catch(()=>{}),vo.set(e,n),e}function vh(n){if(Ur.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});Ur.set(n,e)}let Br={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ur.get(n);if(e==="objectStoreNames")return n.objectStoreNames||dc.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ht(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function yh(n){Br=n(Br)}function bh(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(wr(this),e,...t);return dc.set(i,e.sort?e.sort():[e]),Ht(i)}:gh().includes(n)?function(...e){return n.apply(wr(this),e),Ht(uc.get(this))}:function(...e){return Ht(n.apply(wr(this),e))}}function wh(n){return typeof n=="function"?bh(n):(n instanceof IDBTransaction&&vh(n),ph(n,mh())?new Proxy(n,Br):n)}function Ht(n){if(n instanceof IDBRequest)return _h(n);if(br.has(n))return br.get(n);const e=wh(n);return e!==n&&(br.set(n,e),vo.set(e,n)),e}const wr=n=>vo.get(n);function Eh(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=Ht(o);return i&&o.addEventListener("upgradeneeded",l=>{i(Ht(o.result),l.oldVersion,l.newVersion,Ht(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Ih=["get","getKey","getAll","getAllKeys","count"],Ch=["put","add","delete","clear"],Er=new Map;function Ra(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Er.get(e))return Er.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Ch.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Ih.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return Er.set(e,r),r}yh(n=>({...n,get:(e,t,i)=>Ra(e,t)||n.get(e,t,i),has:(e,t)=>!!Ra(e,t)||n.has(e,t)}));/**
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
 */class kh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Sh(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Sh(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const zr="@firebase/app",xa="0.10.13";/**
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
 */const Tt=new _o("@firebase/app"),Th="@firebase/app-compat",Ah="@firebase/analytics-compat",Rh="@firebase/analytics",xh="@firebase/app-check-compat",Ph="@firebase/app-check",Nh="@firebase/auth",Oh="@firebase/auth-compat",Dh="@firebase/database",Lh="@firebase/data-connect",Fh="@firebase/database-compat",Mh="@firebase/functions",Uh="@firebase/functions-compat",Bh="@firebase/installations",zh="@firebase/installations-compat",$h="@firebase/messaging",Wh="@firebase/messaging-compat",jh="@firebase/performance",Hh="@firebase/performance-compat",Vh="@firebase/remote-config",Gh="@firebase/remote-config-compat",qh="@firebase/storage",Kh="@firebase/storage-compat",Yh="@firebase/firestore",Zh="@firebase/vertexai-preview",Jh="@firebase/firestore-compat",Qh="firebase",Xh="10.14.1";/**
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
 */const $r="[DEFAULT]",ef={[zr]:"fire-core",[Th]:"fire-core-compat",[Rh]:"fire-analytics",[Ah]:"fire-analytics-compat",[Ph]:"fire-app-check",[xh]:"fire-app-check-compat",[Nh]:"fire-auth",[Oh]:"fire-auth-compat",[Dh]:"fire-rtdb",[Lh]:"fire-data-connect",[Fh]:"fire-rtdb-compat",[Mh]:"fire-fn",[Uh]:"fire-fn-compat",[Bh]:"fire-iid",[zh]:"fire-iid-compat",[$h]:"fire-fcm",[Wh]:"fire-fcm-compat",[jh]:"fire-perf",[Hh]:"fire-perf-compat",[Vh]:"fire-rc",[Gh]:"fire-rc-compat",[qh]:"fire-gcs",[Kh]:"fire-gcs-compat",[Yh]:"fire-fst",[Jh]:"fire-fst-compat",[Zh]:"fire-vertex","fire-js":"fire-js",[Qh]:"fire-js-all"};/**
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
 */const Ss=new Map,tf=new Map,Wr=new Map;function Pa(n,e){try{n.container.addComponent(e)}catch(t){Tt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Un(n){const e=n.name;if(Wr.has(e))return Tt.debug(`There were multiple attempts to register component ${e}.`),!1;Wr.set(e,n);for(const t of Ss.values())Pa(t,n);for(const t of tf.values())Pa(t,n);return!0}function yo(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function pt(n){return n.settings!==void 0}/**
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
 */const nf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Vt=new $i("app","Firebase",nf);/**
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
 */class sf{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new hn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Vt.create("app-deleted",{appName:this._name})}}/**
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
 */const Jn=Xh;function hc(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:$r,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw Vt.create("bad-app-name",{appName:String(s)});if(t||(t=oc()),!t)throw Vt.create("no-options");const r=Ss.get(s);if(r){if(ks(t,r.options)&&ks(i,r.config))return r;throw Vt.create("duplicate-app",{appName:s})}const o=new ch(s);for(const l of Wr.values())o.addComponent(l);const a=new sf(t,i,o);return Ss.set(s,a),a}function fc(n=$r){const e=Ss.get(n);if(!e&&n===$r&&oc())return hc();if(!e)throw Vt.create("no-app",{appName:n});return e}function Gt(n,e,t){var i;let s=(i=ef[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Tt.warn(a.join(" "));return}Un(new hn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const rf="firebase-heartbeat-database",of=1,Ni="firebase-heartbeat-store";let Ir=null;function pc(){return Ir||(Ir=Eh(rf,of,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ni)}catch(t){console.warn(t)}}}}).catch(n=>{throw Vt.create("idb-open",{originalErrorMessage:n.message})})),Ir}async function af(n){try{const t=(await pc()).transaction(Ni),i=await t.objectStore(Ni).get(mc(n));return await t.done,i}catch(e){if(e instanceof nn)Tt.warn(e.message);else{const t=Vt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Tt.warn(t.message)}}}async function Na(n,e){try{const i=(await pc()).transaction(Ni,"readwrite");await i.objectStore(Ni).put(e,mc(n)),await i.done}catch(t){if(t instanceof nn)Tt.warn(t.message);else{const i=Vt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Tt.warn(i.message)}}}function mc(n){return`${n.name}!${n.options.appId}`}/**
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
 */const lf=1024,cf=30*24*60*60*1e3;class uf{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new hf(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Oa();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=cf}),this._storage.overwrite(this._heartbeatsCache))}catch(i){Tt.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Oa(),{heartbeatsToSend:i,unsentEntries:s}=df(this._heartbeatsCache.heartbeats),r=ws(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return Tt.warn(t),""}}}function Oa(){return new Date().toISOString().substring(0,10)}function df(n,e=lf){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Da(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Da(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class hf{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Kd()?Yd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await af(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Na(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Na(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Da(n){return ws(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function ff(n){Un(new hn("platform-logger",e=>new kh(e),"PRIVATE")),Un(new hn("heartbeat",e=>new uf(e),"PRIVATE")),Gt(zr,xa,n),Gt(zr,xa,"esm2017"),Gt("fire-js","")}ff("");var pf="firebase",mf="10.14.1";/**
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
 */Gt(pf,mf,"app");var Rn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function gc(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}function ns(n){throw new Error('Could not dynamically require "'+n+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var _c={exports:{}};/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/(function(n,e){(function(t){n.exports=t()})(function(){return function t(i,s,r){function o(c,h){if(!s[c]){if(!i[c]){var u=typeof ns=="function"&&ns;if(!h&&u)return u(c,!0);if(a)return a(c,!0);var p=new Error("Cannot find module '"+c+"'");throw p.code="MODULE_NOT_FOUND",p}var f=s[c]={exports:{}};i[c][0].call(f.exports,function(w){var g=i[c][1][w];return o(g||w)},f,f.exports,t,i,s,r)}return s[c].exports}for(var a=typeof ns=="function"&&ns,l=0;l<r.length;l++)o(r[l]);return o}({1:[function(t,i,s){var r=t("./utils"),o=t("./support"),a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";s.encode=function(l){for(var c,h,u,p,f,w,g,y=[],v=0,_=l.length,b=_,C=r.getTypeOf(l)!=="string";v<l.length;)b=_-v,u=C?(c=l[v++],h=v<_?l[v++]:0,v<_?l[v++]:0):(c=l.charCodeAt(v++),h=v<_?l.charCodeAt(v++):0,v<_?l.charCodeAt(v++):0),p=c>>2,f=(3&c)<<4|h>>4,w=1<b?(15&h)<<2|u>>6:64,g=2<b?63&u:64,y.push(a.charAt(p)+a.charAt(f)+a.charAt(w)+a.charAt(g));return y.join("")},s.decode=function(l){var c,h,u,p,f,w,g=0,y=0,v="data:";if(l.substr(0,v.length)===v)throw new Error("Invalid base64 input, it looks like a data url.");var _,b=3*(l=l.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(l.charAt(l.length-1)===a.charAt(64)&&b--,l.charAt(l.length-2)===a.charAt(64)&&b--,b%1!=0)throw new Error("Invalid base64 input, bad content length.");for(_=o.uint8array?new Uint8Array(0|b):new Array(0|b);g<l.length;)c=a.indexOf(l.charAt(g++))<<2|(p=a.indexOf(l.charAt(g++)))>>4,h=(15&p)<<4|(f=a.indexOf(l.charAt(g++)))>>2,u=(3&f)<<6|(w=a.indexOf(l.charAt(g++))),_[y++]=c,f!==64&&(_[y++]=h),w!==64&&(_[y++]=u);return _}},{"./support":30,"./utils":32}],2:[function(t,i,s){var r=t("./external"),o=t("./stream/DataWorker"),a=t("./stream/Crc32Probe"),l=t("./stream/DataLengthProbe");function c(h,u,p,f,w){this.compressedSize=h,this.uncompressedSize=u,this.crc32=p,this.compression=f,this.compressedContent=w}c.prototype={getContentWorker:function(){var h=new o(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new l("data_length")),u=this;return h.on("end",function(){if(this.streamInfo.data_length!==u.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),h},getCompressedWorker:function(){return new o(r.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},c.createWorkerFrom=function(h,u,p){return h.pipe(new a).pipe(new l("uncompressedSize")).pipe(u.compressWorker(p)).pipe(new l("compressedSize")).withStreamInfo("compression",u)},i.exports=c},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(t,i,s){var r=t("./stream/GenericWorker");s.STORE={magic:"\0\0",compressWorker:function(){return new r("STORE compression")},uncompressWorker:function(){return new r("STORE decompression")}},s.DEFLATE=t("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(t,i,s){var r=t("./utils"),o=function(){for(var a,l=[],c=0;c<256;c++){a=c;for(var h=0;h<8;h++)a=1&a?3988292384^a>>>1:a>>>1;l[c]=a}return l}();i.exports=function(a,l){return a!==void 0&&a.length?r.getTypeOf(a)!=="string"?function(c,h,u,p){var f=o,w=p+u;c^=-1;for(var g=p;g<w;g++)c=c>>>8^f[255&(c^h[g])];return-1^c}(0|l,a,a.length,0):function(c,h,u,p){var f=o,w=p+u;c^=-1;for(var g=p;g<w;g++)c=c>>>8^f[255&(c^h.charCodeAt(g))];return-1^c}(0|l,a,a.length,0):0}},{"./utils":32}],5:[function(t,i,s){s.base64=!1,s.binary=!1,s.dir=!1,s.createFolders=!0,s.date=null,s.compression=null,s.compressionOptions=null,s.comment=null,s.unixPermissions=null,s.dosPermissions=null},{}],6:[function(t,i,s){var r=null;r=typeof Promise<"u"?Promise:t("lie"),i.exports={Promise:r}},{lie:37}],7:[function(t,i,s){var r=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",o=t("pako"),a=t("./utils"),l=t("./stream/GenericWorker"),c=r?"uint8array":"array";function h(u,p){l.call(this,"FlateWorker/"+u),this._pako=null,this._pakoAction=u,this._pakoOptions=p,this.meta={}}s.magic="\b\0",a.inherits(h,l),h.prototype.processChunk=function(u){this.meta=u.meta,this._pako===null&&this._createPako(),this._pako.push(a.transformTo(c,u.data),!1)},h.prototype.flush=function(){l.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){l.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new o[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var u=this;this._pako.onData=function(p){u.push({data:p,meta:u.meta})}},s.compressWorker=function(u){return new h("Deflate",u)},s.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(t,i,s){function r(f,w){var g,y="";for(g=0;g<w;g++)y+=String.fromCharCode(255&f),f>>>=8;return y}function o(f,w,g,y,v,_){var b,C,k=f.file,T=f.compression,x=_!==c.utf8encode,L=a.transformTo("string",_(k.name)),A=a.transformTo("string",c.utf8encode(k.name)),B=k.comment,Z=a.transformTo("string",_(B)),S=a.transformTo("string",c.utf8encode(B)),F=A.length!==k.name.length,m=S.length!==B.length,U="",oe="",j="",X=k.dir,$=k.date,ee={crc32:0,compressedSize:0,uncompressedSize:0};w&&!g||(ee.crc32=f.crc32,ee.compressedSize=f.compressedSize,ee.uncompressedSize=f.uncompressedSize);var O=0;w&&(O|=8),x||!F&&!m||(O|=2048);var P=0,te=0;X&&(P|=16),v==="UNIX"?(te=798,P|=function(G,we){var Re=G;return G||(Re=we?16893:33204),(65535&Re)<<16}(k.unixPermissions,X)):(te=20,P|=function(G){return 63&(G||0)}(k.dosPermissions)),b=$.getUTCHours(),b<<=6,b|=$.getUTCMinutes(),b<<=5,b|=$.getUTCSeconds()/2,C=$.getUTCFullYear()-1980,C<<=4,C|=$.getUTCMonth()+1,C<<=5,C|=$.getUTCDate(),F&&(oe=r(1,1)+r(h(L),4)+A,U+="up"+r(oe.length,2)+oe),m&&(j=r(1,1)+r(h(Z),4)+S,U+="uc"+r(j.length,2)+j);var K="";return K+=`
\0`,K+=r(O,2),K+=T.magic,K+=r(b,2),K+=r(C,2),K+=r(ee.crc32,4),K+=r(ee.compressedSize,4),K+=r(ee.uncompressedSize,4),K+=r(L.length,2),K+=r(U.length,2),{fileRecord:u.LOCAL_FILE_HEADER+K+L+U,dirRecord:u.CENTRAL_FILE_HEADER+r(te,2)+K+r(Z.length,2)+"\0\0\0\0"+r(P,4)+r(y,4)+L+U+Z}}var a=t("../utils"),l=t("../stream/GenericWorker"),c=t("../utf8"),h=t("../crc32"),u=t("../signature");function p(f,w,g,y){l.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=w,this.zipPlatform=g,this.encodeFileName=y,this.streamFiles=f,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}a.inherits(p,l),p.prototype.push=function(f){var w=f.meta.percent||0,g=this.entriesCount,y=this._sources.length;this.accumulate?this.contentBuffer.push(f):(this.bytesWritten+=f.data.length,l.prototype.push.call(this,{data:f.data,meta:{currentFile:this.currentFile,percent:g?(w+100*(g-y-1))/g:100}}))},p.prototype.openedSource=function(f){this.currentSourceOffset=this.bytesWritten,this.currentFile=f.file.name;var w=this.streamFiles&&!f.file.dir;if(w){var g=o(f,w,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:g.fileRecord,meta:{percent:0}})}else this.accumulate=!0},p.prototype.closedSource=function(f){this.accumulate=!1;var w=this.streamFiles&&!f.file.dir,g=o(f,w,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(g.dirRecord),w)this.push({data:function(y){return u.DATA_DESCRIPTOR+r(y.crc32,4)+r(y.compressedSize,4)+r(y.uncompressedSize,4)}(f),meta:{percent:100}});else for(this.push({data:g.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},p.prototype.flush=function(){for(var f=this.bytesWritten,w=0;w<this.dirRecords.length;w++)this.push({data:this.dirRecords[w],meta:{percent:100}});var g=this.bytesWritten-f,y=function(v,_,b,C,k){var T=a.transformTo("string",k(C));return u.CENTRAL_DIRECTORY_END+"\0\0\0\0"+r(v,2)+r(v,2)+r(_,4)+r(b,4)+r(T.length,2)+T}(this.dirRecords.length,g,f,this.zipComment,this.encodeFileName);this.push({data:y,meta:{percent:100}})},p.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},p.prototype.registerPrevious=function(f){this._sources.push(f);var w=this;return f.on("data",function(g){w.processChunk(g)}),f.on("end",function(){w.closedSource(w.previous.streamInfo),w._sources.length?w.prepareNextSource():w.end()}),f.on("error",function(g){w.error(g)}),this},p.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},p.prototype.error=function(f){var w=this._sources;if(!l.prototype.error.call(this,f))return!1;for(var g=0;g<w.length;g++)try{w[g].error(f)}catch{}return!0},p.prototype.lock=function(){l.prototype.lock.call(this);for(var f=this._sources,w=0;w<f.length;w++)f[w].lock()},i.exports=p},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(t,i,s){var r=t("../compressions"),o=t("./ZipFileWorker");s.generateWorker=function(a,l,c){var h=new o(l.streamFiles,c,l.platform,l.encodeFileName),u=0;try{a.forEach(function(p,f){u++;var w=function(_,b){var C=_||b,k=r[C];if(!k)throw new Error(C+" is not a valid compression method !");return k}(f.options.compression,l.compression),g=f.options.compressionOptions||l.compressionOptions||{},y=f.dir,v=f.date;f._compressWorker(w,g).withStreamInfo("file",{name:p,dir:y,date:v,comment:f.comment||"",unixPermissions:f.unixPermissions,dosPermissions:f.dosPermissions}).pipe(h)}),h.entriesCount=u}catch(p){h.error(p)}return h}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(t,i,s){function r(){if(!(this instanceof r))return new r;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var o=new r;for(var a in this)typeof this[a]!="function"&&(o[a]=this[a]);return o}}(r.prototype=t("./object")).loadAsync=t("./load"),r.support=t("./support"),r.defaults=t("./defaults"),r.version="3.10.1",r.loadAsync=function(o,a){return new r().loadAsync(o,a)},r.external=t("./external"),i.exports=r},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(t,i,s){var r=t("./utils"),o=t("./external"),a=t("./utf8"),l=t("./zipEntries"),c=t("./stream/Crc32Probe"),h=t("./nodejsUtils");function u(p){return new o.Promise(function(f,w){var g=p.decompressed.getContentWorker().pipe(new c);g.on("error",function(y){w(y)}).on("end",function(){g.streamInfo.crc32!==p.decompressed.crc32?w(new Error("Corrupted zip : CRC32 mismatch")):f()}).resume()})}i.exports=function(p,f){var w=this;return f=r.extend(f||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:a.utf8decode}),h.isNode&&h.isStream(p)?o.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):r.prepareContent("the loaded zip file",p,!0,f.optimizedBinaryString,f.base64).then(function(g){var y=new l(f);return y.load(g),y}).then(function(g){var y=[o.Promise.resolve(g)],v=g.files;if(f.checkCRC32)for(var _=0;_<v.length;_++)y.push(u(v[_]));return o.Promise.all(y)}).then(function(g){for(var y=g.shift(),v=y.files,_=0;_<v.length;_++){var b=v[_],C=b.fileNameStr,k=r.resolve(b.fileNameStr);w.file(k,b.decompressed,{binary:!0,optimizedBinaryString:!0,date:b.date,dir:b.dir,comment:b.fileCommentStr.length?b.fileCommentStr:null,unixPermissions:b.unixPermissions,dosPermissions:b.dosPermissions,createFolders:f.createFolders}),b.dir||(w.file(k).unsafeOriginalName=C)}return y.zipComment.length&&(w.comment=y.zipComment),w})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(t,i,s){var r=t("../utils"),o=t("../stream/GenericWorker");function a(l,c){o.call(this,"Nodejs stream input adapter for "+l),this._upstreamEnded=!1,this._bindStream(c)}r.inherits(a,o),a.prototype._bindStream=function(l){var c=this;(this._stream=l).pause(),l.on("data",function(h){c.push({data:h,meta:{percent:0}})}).on("error",function(h){c.isPaused?this.generatedError=h:c.error(h)}).on("end",function(){c.isPaused?c._upstreamEnded=!0:c.end()})},a.prototype.pause=function(){return!!o.prototype.pause.call(this)&&(this._stream.pause(),!0)},a.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},i.exports=a},{"../stream/GenericWorker":28,"../utils":32}],13:[function(t,i,s){var r=t("readable-stream").Readable;function o(a,l,c){r.call(this,l),this._helper=a;var h=this;a.on("data",function(u,p){h.push(u)||h._helper.pause(),c&&c(p)}).on("error",function(u){h.emit("error",u)}).on("end",function(){h.push(null)})}t("../utils").inherits(o,r),o.prototype._read=function(){this._helper.resume()},i.exports=o},{"../utils":32,"readable-stream":16}],14:[function(t,i,s){i.exports={isNode:typeof Buffer<"u",newBufferFrom:function(r,o){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(r,o);if(typeof r=="number")throw new Error('The "data" argument must not be a number');return new Buffer(r,o)},allocBuffer:function(r){if(Buffer.alloc)return Buffer.alloc(r);var o=new Buffer(r);return o.fill(0),o},isBuffer:function(r){return Buffer.isBuffer(r)},isStream:function(r){return r&&typeof r.on=="function"&&typeof r.pause=="function"&&typeof r.resume=="function"}}},{}],15:[function(t,i,s){function r(k,T,x){var L,A=a.getTypeOf(T),B=a.extend(x||{},h);B.date=B.date||new Date,B.compression!==null&&(B.compression=B.compression.toUpperCase()),typeof B.unixPermissions=="string"&&(B.unixPermissions=parseInt(B.unixPermissions,8)),B.unixPermissions&&16384&B.unixPermissions&&(B.dir=!0),B.dosPermissions&&16&B.dosPermissions&&(B.dir=!0),B.dir&&(k=v(k)),B.createFolders&&(L=y(k))&&_.call(this,L,!0);var Z=A==="string"&&B.binary===!1&&B.base64===!1;x&&x.binary!==void 0||(B.binary=!Z),(T instanceof u&&T.uncompressedSize===0||B.dir||!T||T.length===0)&&(B.base64=!1,B.binary=!0,T="",B.compression="STORE",A="string");var S=null;S=T instanceof u||T instanceof l?T:w.isNode&&w.isStream(T)?new g(k,T):a.prepareContent(k,T,B.binary,B.optimizedBinaryString,B.base64);var F=new p(k,S,B);this.files[k]=F}var o=t("./utf8"),a=t("./utils"),l=t("./stream/GenericWorker"),c=t("./stream/StreamHelper"),h=t("./defaults"),u=t("./compressedObject"),p=t("./zipObject"),f=t("./generate"),w=t("./nodejsUtils"),g=t("./nodejs/NodejsStreamInputAdapter"),y=function(k){k.slice(-1)==="/"&&(k=k.substring(0,k.length-1));var T=k.lastIndexOf("/");return 0<T?k.substring(0,T):""},v=function(k){return k.slice(-1)!=="/"&&(k+="/"),k},_=function(k,T){return T=T!==void 0?T:h.createFolders,k=v(k),this.files[k]||r.call(this,k,null,{dir:!0,createFolders:T}),this.files[k]};function b(k){return Object.prototype.toString.call(k)==="[object RegExp]"}var C={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(k){var T,x,L;for(T in this.files)L=this.files[T],(x=T.slice(this.root.length,T.length))&&T.slice(0,this.root.length)===this.root&&k(x,L)},filter:function(k){var T=[];return this.forEach(function(x,L){k(x,L)&&T.push(L)}),T},file:function(k,T,x){if(arguments.length!==1)return k=this.root+k,r.call(this,k,T,x),this;if(b(k)){var L=k;return this.filter(function(B,Z){return!Z.dir&&L.test(B)})}var A=this.files[this.root+k];return A&&!A.dir?A:null},folder:function(k){if(!k)return this;if(b(k))return this.filter(function(A,B){return B.dir&&k.test(A)});var T=this.root+k,x=_.call(this,T),L=this.clone();return L.root=x.name,L},remove:function(k){k=this.root+k;var T=this.files[k];if(T||(k.slice(-1)!=="/"&&(k+="/"),T=this.files[k]),T&&!T.dir)delete this.files[k];else for(var x=this.filter(function(A,B){return B.name.slice(0,k.length)===k}),L=0;L<x.length;L++)delete this.files[x[L].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(k){var T,x={};try{if((x=a.extend(k||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:o.utf8encode})).type=x.type.toLowerCase(),x.compression=x.compression.toUpperCase(),x.type==="binarystring"&&(x.type="string"),!x.type)throw new Error("No output type specified.");a.checkSupport(x.type),x.platform!=="darwin"&&x.platform!=="freebsd"&&x.platform!=="linux"&&x.platform!=="sunos"||(x.platform="UNIX"),x.platform==="win32"&&(x.platform="DOS");var L=x.comment||this.comment||"";T=f.generateWorker(this,x,L)}catch(A){(T=new l("error")).error(A)}return new c(T,x.type||"string",x.mimeType)},generateAsync:function(k,T){return this.generateInternalStream(k).accumulate(T)},generateNodeStream:function(k,T){return(k=k||{}).type||(k.type="nodebuffer"),this.generateInternalStream(k).toNodejsStream(T)}};i.exports=C},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(t,i,s){i.exports=t("stream")},{stream:void 0}],17:[function(t,i,s){var r=t("./DataReader");function o(a){r.call(this,a);for(var l=0;l<this.data.length;l++)a[l]=255&a[l]}t("../utils").inherits(o,r),o.prototype.byteAt=function(a){return this.data[this.zero+a]},o.prototype.lastIndexOfSignature=function(a){for(var l=a.charCodeAt(0),c=a.charCodeAt(1),h=a.charCodeAt(2),u=a.charCodeAt(3),p=this.length-4;0<=p;--p)if(this.data[p]===l&&this.data[p+1]===c&&this.data[p+2]===h&&this.data[p+3]===u)return p-this.zero;return-1},o.prototype.readAndCheckSignature=function(a){var l=a.charCodeAt(0),c=a.charCodeAt(1),h=a.charCodeAt(2),u=a.charCodeAt(3),p=this.readData(4);return l===p[0]&&c===p[1]&&h===p[2]&&u===p[3]},o.prototype.readData=function(a){if(this.checkOffset(a),a===0)return[];var l=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,l},i.exports=o},{"../utils":32,"./DataReader":18}],18:[function(t,i,s){var r=t("../utils");function o(a){this.data=a,this.length=a.length,this.index=0,this.zero=0}o.prototype={checkOffset:function(a){this.checkIndex(this.index+a)},checkIndex:function(a){if(this.length<this.zero+a||a<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+a+"). Corrupted zip ?")},setIndex:function(a){this.checkIndex(a),this.index=a},skip:function(a){this.setIndex(this.index+a)},byteAt:function(){},readInt:function(a){var l,c=0;for(this.checkOffset(a),l=this.index+a-1;l>=this.index;l--)c=(c<<8)+this.byteAt(l);return this.index+=a,c},readString:function(a){return r.transformTo("string",this.readData(a))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var a=this.readInt(4);return new Date(Date.UTC(1980+(a>>25&127),(a>>21&15)-1,a>>16&31,a>>11&31,a>>5&63,(31&a)<<1))}},i.exports=o},{"../utils":32}],19:[function(t,i,s){var r=t("./Uint8ArrayReader");function o(a){r.call(this,a)}t("../utils").inherits(o,r),o.prototype.readData=function(a){this.checkOffset(a);var l=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,l},i.exports=o},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(t,i,s){var r=t("./DataReader");function o(a){r.call(this,a)}t("../utils").inherits(o,r),o.prototype.byteAt=function(a){return this.data.charCodeAt(this.zero+a)},o.prototype.lastIndexOfSignature=function(a){return this.data.lastIndexOf(a)-this.zero},o.prototype.readAndCheckSignature=function(a){return a===this.readData(4)},o.prototype.readData=function(a){this.checkOffset(a);var l=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,l},i.exports=o},{"../utils":32,"./DataReader":18}],21:[function(t,i,s){var r=t("./ArrayReader");function o(a){r.call(this,a)}t("../utils").inherits(o,r),o.prototype.readData=function(a){if(this.checkOffset(a),a===0)return new Uint8Array(0);var l=this.data.subarray(this.zero+this.index,this.zero+this.index+a);return this.index+=a,l},i.exports=o},{"../utils":32,"./ArrayReader":17}],22:[function(t,i,s){var r=t("../utils"),o=t("../support"),a=t("./ArrayReader"),l=t("./StringReader"),c=t("./NodeBufferReader"),h=t("./Uint8ArrayReader");i.exports=function(u){var p=r.getTypeOf(u);return r.checkSupport(p),p!=="string"||o.uint8array?p==="nodebuffer"?new c(u):o.uint8array?new h(r.transformTo("uint8array",u)):new a(r.transformTo("array",u)):new l(u)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(t,i,s){s.LOCAL_FILE_HEADER="PK",s.CENTRAL_FILE_HEADER="PK",s.CENTRAL_DIRECTORY_END="PK",s.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",s.ZIP64_CENTRAL_DIRECTORY_END="PK",s.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(t,i,s){var r=t("./GenericWorker"),o=t("../utils");function a(l){r.call(this,"ConvertWorker to "+l),this.destType=l}o.inherits(a,r),a.prototype.processChunk=function(l){this.push({data:o.transformTo(this.destType,l.data),meta:l.meta})},i.exports=a},{"../utils":32,"./GenericWorker":28}],25:[function(t,i,s){var r=t("./GenericWorker"),o=t("../crc32");function a(){r.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}t("../utils").inherits(a,r),a.prototype.processChunk=function(l){this.streamInfo.crc32=o(l.data,this.streamInfo.crc32||0),this.push(l)},i.exports=a},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(t,i,s){var r=t("../utils"),o=t("./GenericWorker");function a(l){o.call(this,"DataLengthProbe for "+l),this.propName=l,this.withStreamInfo(l,0)}r.inherits(a,o),a.prototype.processChunk=function(l){if(l){var c=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=c+l.data.length}o.prototype.processChunk.call(this,l)},i.exports=a},{"../utils":32,"./GenericWorker":28}],27:[function(t,i,s){var r=t("../utils"),o=t("./GenericWorker");function a(l){o.call(this,"DataWorker");var c=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,l.then(function(h){c.dataIsReady=!0,c.data=h,c.max=h&&h.length||0,c.type=r.getTypeOf(h),c.isPaused||c._tickAndRepeat()},function(h){c.error(h)})}r.inherits(a,o),a.prototype.cleanUp=function(){o.prototype.cleanUp.call(this),this.data=null},a.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,r.delay(this._tickAndRepeat,[],this)),!0)},a.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(r.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},a.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var l=null,c=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":l=this.data.substring(this.index,c);break;case"uint8array":l=this.data.subarray(this.index,c);break;case"array":case"nodebuffer":l=this.data.slice(this.index,c)}return this.index=c,this.push({data:l,meta:{percent:this.max?this.index/this.max*100:0}})},i.exports=a},{"../utils":32,"./GenericWorker":28}],28:[function(t,i,s){function r(o){this.name=o||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}r.prototype={push:function(o){this.emit("data",o)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(o){this.emit("error",o)}return!0},error:function(o){return!this.isFinished&&(this.isPaused?this.generatedError=o:(this.isFinished=!0,this.emit("error",o),this.previous&&this.previous.error(o),this.cleanUp()),!0)},on:function(o,a){return this._listeners[o].push(a),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(o,a){if(this._listeners[o])for(var l=0;l<this._listeners[o].length;l++)this._listeners[o][l].call(this,a)},pipe:function(o){return o.registerPrevious(this)},registerPrevious:function(o){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=o.streamInfo,this.mergeStreamInfo(),this.previous=o;var a=this;return o.on("data",function(l){a.processChunk(l)}),o.on("end",function(){a.end()}),o.on("error",function(l){a.error(l)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var o=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),o=!0),this.previous&&this.previous.resume(),!o},flush:function(){},processChunk:function(o){this.push(o)},withStreamInfo:function(o,a){return this.extraStreamInfo[o]=a,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var o in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,o)&&(this.streamInfo[o]=this.extraStreamInfo[o])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var o="Worker "+this.name;return this.previous?this.previous+" -> "+o:o}},i.exports=r},{}],29:[function(t,i,s){var r=t("../utils"),o=t("./ConvertWorker"),a=t("./GenericWorker"),l=t("../base64"),c=t("../support"),h=t("../external"),u=null;if(c.nodestream)try{u=t("../nodejs/NodejsStreamOutputAdapter")}catch{}function p(w,g){return new h.Promise(function(y,v){var _=[],b=w._internalType,C=w._outputType,k=w._mimeType;w.on("data",function(T,x){_.push(T),g&&g(x)}).on("error",function(T){_=[],v(T)}).on("end",function(){try{var T=function(x,L,A){switch(x){case"blob":return r.newBlob(r.transformTo("arraybuffer",L),A);case"base64":return l.encode(L);default:return r.transformTo(x,L)}}(C,function(x,L){var A,B=0,Z=null,S=0;for(A=0;A<L.length;A++)S+=L[A].length;switch(x){case"string":return L.join("");case"array":return Array.prototype.concat.apply([],L);case"uint8array":for(Z=new Uint8Array(S),A=0;A<L.length;A++)Z.set(L[A],B),B+=L[A].length;return Z;case"nodebuffer":return Buffer.concat(L);default:throw new Error("concat : unsupported type '"+x+"'")}}(b,_),k);y(T)}catch(x){v(x)}_=[]}).resume()})}function f(w,g,y){var v=g;switch(g){case"blob":case"arraybuffer":v="uint8array";break;case"base64":v="string"}try{this._internalType=v,this._outputType=g,this._mimeType=y,r.checkSupport(v),this._worker=w.pipe(new o(v)),w.lock()}catch(_){this._worker=new a("error"),this._worker.error(_)}}f.prototype={accumulate:function(w){return p(this,w)},on:function(w,g){var y=this;return w==="data"?this._worker.on(w,function(v){g.call(y,v.data,v.meta)}):this._worker.on(w,function(){r.delay(g,arguments,y)}),this},resume:function(){return r.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(w){if(r.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new u(this,{objectMode:this._outputType!=="nodebuffer"},w)}},i.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(t,i,s){if(s.base64=!0,s.array=!0,s.string=!0,s.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",s.nodebuffer=typeof Buffer<"u",s.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")s.blob=!1;else{var r=new ArrayBuffer(0);try{s.blob=new Blob([r],{type:"application/zip"}).size===0}catch{try{var o=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);o.append(r),s.blob=o.getBlob("application/zip").size===0}catch{s.blob=!1}}}try{s.nodestream=!!t("readable-stream").Readable}catch{s.nodestream=!1}},{"readable-stream":16}],31:[function(t,i,s){for(var r=t("./utils"),o=t("./support"),a=t("./nodejsUtils"),l=t("./stream/GenericWorker"),c=new Array(256),h=0;h<256;h++)c[h]=252<=h?6:248<=h?5:240<=h?4:224<=h?3:192<=h?2:1;c[254]=c[254]=1;function u(){l.call(this,"utf-8 decode"),this.leftOver=null}function p(){l.call(this,"utf-8 encode")}s.utf8encode=function(f){return o.nodebuffer?a.newBufferFrom(f,"utf-8"):function(w){var g,y,v,_,b,C=w.length,k=0;for(_=0;_<C;_++)(64512&(y=w.charCodeAt(_)))==55296&&_+1<C&&(64512&(v=w.charCodeAt(_+1)))==56320&&(y=65536+(y-55296<<10)+(v-56320),_++),k+=y<128?1:y<2048?2:y<65536?3:4;for(g=o.uint8array?new Uint8Array(k):new Array(k),_=b=0;b<k;_++)(64512&(y=w.charCodeAt(_)))==55296&&_+1<C&&(64512&(v=w.charCodeAt(_+1)))==56320&&(y=65536+(y-55296<<10)+(v-56320),_++),y<128?g[b++]=y:(y<2048?g[b++]=192|y>>>6:(y<65536?g[b++]=224|y>>>12:(g[b++]=240|y>>>18,g[b++]=128|y>>>12&63),g[b++]=128|y>>>6&63),g[b++]=128|63&y);return g}(f)},s.utf8decode=function(f){return o.nodebuffer?r.transformTo("nodebuffer",f).toString("utf-8"):function(w){var g,y,v,_,b=w.length,C=new Array(2*b);for(g=y=0;g<b;)if((v=w[g++])<128)C[y++]=v;else if(4<(_=c[v]))C[y++]=65533,g+=_-1;else{for(v&=_===2?31:_===3?15:7;1<_&&g<b;)v=v<<6|63&w[g++],_--;1<_?C[y++]=65533:v<65536?C[y++]=v:(v-=65536,C[y++]=55296|v>>10&1023,C[y++]=56320|1023&v)}return C.length!==y&&(C.subarray?C=C.subarray(0,y):C.length=y),r.applyFromCharCode(C)}(f=r.transformTo(o.uint8array?"uint8array":"array",f))},r.inherits(u,l),u.prototype.processChunk=function(f){var w=r.transformTo(o.uint8array?"uint8array":"array",f.data);if(this.leftOver&&this.leftOver.length){if(o.uint8array){var g=w;(w=new Uint8Array(g.length+this.leftOver.length)).set(this.leftOver,0),w.set(g,this.leftOver.length)}else w=this.leftOver.concat(w);this.leftOver=null}var y=function(_,b){var C;for((b=b||_.length)>_.length&&(b=_.length),C=b-1;0<=C&&(192&_[C])==128;)C--;return C<0||C===0?b:C+c[_[C]]>b?C:b}(w),v=w;y!==w.length&&(o.uint8array?(v=w.subarray(0,y),this.leftOver=w.subarray(y,w.length)):(v=w.slice(0,y),this.leftOver=w.slice(y,w.length))),this.push({data:s.utf8decode(v),meta:f.meta})},u.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=u,r.inherits(p,l),p.prototype.processChunk=function(f){this.push({data:s.utf8encode(f.data),meta:f.meta})},s.Utf8EncodeWorker=p},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(t,i,s){var r=t("./support"),o=t("./base64"),a=t("./nodejsUtils"),l=t("./external");function c(g){return g}function h(g,y){for(var v=0;v<g.length;++v)y[v]=255&g.charCodeAt(v);return y}t("setimmediate"),s.newBlob=function(g,y){s.checkSupport("blob");try{return new Blob([g],{type:y})}catch{try{var v=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return v.append(g),v.getBlob(y)}catch{throw new Error("Bug : can't construct the Blob.")}}};var u={stringifyByChunk:function(g,y,v){var _=[],b=0,C=g.length;if(C<=v)return String.fromCharCode.apply(null,g);for(;b<C;)y==="array"||y==="nodebuffer"?_.push(String.fromCharCode.apply(null,g.slice(b,Math.min(b+v,C)))):_.push(String.fromCharCode.apply(null,g.subarray(b,Math.min(b+v,C)))),b+=v;return _.join("")},stringifyByChar:function(g){for(var y="",v=0;v<g.length;v++)y+=String.fromCharCode(g[v]);return y},applyCanBeUsed:{uint8array:function(){try{return r.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return r.nodebuffer&&String.fromCharCode.apply(null,a.allocBuffer(1)).length===1}catch{return!1}}()}};function p(g){var y=65536,v=s.getTypeOf(g),_=!0;if(v==="uint8array"?_=u.applyCanBeUsed.uint8array:v==="nodebuffer"&&(_=u.applyCanBeUsed.nodebuffer),_)for(;1<y;)try{return u.stringifyByChunk(g,v,y)}catch{y=Math.floor(y/2)}return u.stringifyByChar(g)}function f(g,y){for(var v=0;v<g.length;v++)y[v]=g[v];return y}s.applyFromCharCode=p;var w={};w.string={string:c,array:function(g){return h(g,new Array(g.length))},arraybuffer:function(g){return w.string.uint8array(g).buffer},uint8array:function(g){return h(g,new Uint8Array(g.length))},nodebuffer:function(g){return h(g,a.allocBuffer(g.length))}},w.array={string:p,array:c,arraybuffer:function(g){return new Uint8Array(g).buffer},uint8array:function(g){return new Uint8Array(g)},nodebuffer:function(g){return a.newBufferFrom(g)}},w.arraybuffer={string:function(g){return p(new Uint8Array(g))},array:function(g){return f(new Uint8Array(g),new Array(g.byteLength))},arraybuffer:c,uint8array:function(g){return new Uint8Array(g)},nodebuffer:function(g){return a.newBufferFrom(new Uint8Array(g))}},w.uint8array={string:p,array:function(g){return f(g,new Array(g.length))},arraybuffer:function(g){return g.buffer},uint8array:c,nodebuffer:function(g){return a.newBufferFrom(g)}},w.nodebuffer={string:p,array:function(g){return f(g,new Array(g.length))},arraybuffer:function(g){return w.nodebuffer.uint8array(g).buffer},uint8array:function(g){return f(g,new Uint8Array(g.length))},nodebuffer:c},s.transformTo=function(g,y){if(y=y||"",!g)return y;s.checkSupport(g);var v=s.getTypeOf(y);return w[v][g](y)},s.resolve=function(g){for(var y=g.split("/"),v=[],_=0;_<y.length;_++){var b=y[_];b==="."||b===""&&_!==0&&_!==y.length-1||(b===".."?v.pop():v.push(b))}return v.join("/")},s.getTypeOf=function(g){return typeof g=="string"?"string":Object.prototype.toString.call(g)==="[object Array]"?"array":r.nodebuffer&&a.isBuffer(g)?"nodebuffer":r.uint8array&&g instanceof Uint8Array?"uint8array":r.arraybuffer&&g instanceof ArrayBuffer?"arraybuffer":void 0},s.checkSupport=function(g){if(!r[g.toLowerCase()])throw new Error(g+" is not supported by this platform")},s.MAX_VALUE_16BITS=65535,s.MAX_VALUE_32BITS=-1,s.pretty=function(g){var y,v,_="";for(v=0;v<(g||"").length;v++)_+="\\x"+((y=g.charCodeAt(v))<16?"0":"")+y.toString(16).toUpperCase();return _},s.delay=function(g,y,v){setImmediate(function(){g.apply(v||null,y||[])})},s.inherits=function(g,y){function v(){}v.prototype=y.prototype,g.prototype=new v},s.extend=function(){var g,y,v={};for(g=0;g<arguments.length;g++)for(y in arguments[g])Object.prototype.hasOwnProperty.call(arguments[g],y)&&v[y]===void 0&&(v[y]=arguments[g][y]);return v},s.prepareContent=function(g,y,v,_,b){return l.Promise.resolve(y).then(function(C){return r.blob&&(C instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(C))!==-1)&&typeof FileReader<"u"?new l.Promise(function(k,T){var x=new FileReader;x.onload=function(L){k(L.target.result)},x.onerror=function(L){T(L.target.error)},x.readAsArrayBuffer(C)}):C}).then(function(C){var k=s.getTypeOf(C);return k?(k==="arraybuffer"?C=s.transformTo("uint8array",C):k==="string"&&(b?C=o.decode(C):v&&_!==!0&&(C=function(T){return h(T,r.uint8array?new Uint8Array(T.length):new Array(T.length))}(C))),C):l.Promise.reject(new Error("Can't read the data of '"+g+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(t,i,s){var r=t("./reader/readerFor"),o=t("./utils"),a=t("./signature"),l=t("./zipEntry"),c=t("./support");function h(u){this.files=[],this.loadOptions=u}h.prototype={checkSignature:function(u){if(!this.reader.readAndCheckSignature(u)){this.reader.index-=4;var p=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+o.pretty(p)+", expected "+o.pretty(u)+")")}},isSignature:function(u,p){var f=this.reader.index;this.reader.setIndex(u);var w=this.reader.readString(4)===p;return this.reader.setIndex(f),w},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var u=this.reader.readData(this.zipCommentLength),p=c.uint8array?"uint8array":"array",f=o.transformTo(p,u);this.zipComment=this.loadOptions.decodeFileName(f)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var u,p,f,w=this.zip64EndOfCentralSize-44;0<w;)u=this.reader.readInt(2),p=this.reader.readInt(4),f=this.reader.readData(p),this.zip64ExtensibleData[u]={id:u,length:p,value:f}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var u,p;for(u=0;u<this.files.length;u++)p=this.files[u],this.reader.setIndex(p.localHeaderOffset),this.checkSignature(a.LOCAL_FILE_HEADER),p.readLocalPart(this.reader),p.handleUTF8(),p.processAttributes()},readCentralDir:function(){var u;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER);)(u=new l({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(u);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var u=this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);if(u<0)throw this.isSignature(0,a.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(u);var p=u;if(this.checkSignature(a.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===o.MAX_VALUE_16BITS||this.diskWithCentralDirStart===o.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===o.MAX_VALUE_16BITS||this.centralDirRecords===o.MAX_VALUE_16BITS||this.centralDirSize===o.MAX_VALUE_32BITS||this.centralDirOffset===o.MAX_VALUE_32BITS){if(this.zip64=!0,(u=this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(u),this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,a.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var f=this.centralDirOffset+this.centralDirSize;this.zip64&&(f+=20,f+=12+this.zip64EndOfCentralSize);var w=p-f;if(0<w)this.isSignature(p,a.CENTRAL_FILE_HEADER)||(this.reader.zero=w);else if(w<0)throw new Error("Corrupted zip: missing "+Math.abs(w)+" bytes.")},prepareReader:function(u){this.reader=r(u)},load:function(u){this.prepareReader(u),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},i.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(t,i,s){var r=t("./reader/readerFor"),o=t("./utils"),a=t("./compressedObject"),l=t("./crc32"),c=t("./utf8"),h=t("./compressions"),u=t("./support");function p(f,w){this.options=f,this.loadOptions=w}p.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(f){var w,g;if(f.skip(22),this.fileNameLength=f.readInt(2),g=f.readInt(2),this.fileName=f.readData(this.fileNameLength),f.skip(g),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((w=function(y){for(var v in h)if(Object.prototype.hasOwnProperty.call(h,v)&&h[v].magic===y)return h[v];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+o.pretty(this.compressionMethod)+" unknown (inner file : "+o.transformTo("string",this.fileName)+")");this.decompressed=new a(this.compressedSize,this.uncompressedSize,this.crc32,w,f.readData(this.compressedSize))},readCentralPart:function(f){this.versionMadeBy=f.readInt(2),f.skip(2),this.bitFlag=f.readInt(2),this.compressionMethod=f.readString(2),this.date=f.readDate(),this.crc32=f.readInt(4),this.compressedSize=f.readInt(4),this.uncompressedSize=f.readInt(4);var w=f.readInt(2);if(this.extraFieldsLength=f.readInt(2),this.fileCommentLength=f.readInt(2),this.diskNumberStart=f.readInt(2),this.internalFileAttributes=f.readInt(2),this.externalFileAttributes=f.readInt(4),this.localHeaderOffset=f.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");f.skip(w),this.readExtraFields(f),this.parseZIP64ExtraField(f),this.fileComment=f.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var f=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),f==0&&(this.dosPermissions=63&this.externalFileAttributes),f==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var f=r(this.extraFields[1].value);this.uncompressedSize===o.MAX_VALUE_32BITS&&(this.uncompressedSize=f.readInt(8)),this.compressedSize===o.MAX_VALUE_32BITS&&(this.compressedSize=f.readInt(8)),this.localHeaderOffset===o.MAX_VALUE_32BITS&&(this.localHeaderOffset=f.readInt(8)),this.diskNumberStart===o.MAX_VALUE_32BITS&&(this.diskNumberStart=f.readInt(4))}},readExtraFields:function(f){var w,g,y,v=f.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});f.index+4<v;)w=f.readInt(2),g=f.readInt(2),y=f.readData(g),this.extraFields[w]={id:w,length:g,value:y};f.setIndex(v)},handleUTF8:function(){var f=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=c.utf8decode(this.fileName),this.fileCommentStr=c.utf8decode(this.fileComment);else{var w=this.findExtraFieldUnicodePath();if(w!==null)this.fileNameStr=w;else{var g=o.transformTo(f,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(g)}var y=this.findExtraFieldUnicodeComment();if(y!==null)this.fileCommentStr=y;else{var v=o.transformTo(f,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(v)}}},findExtraFieldUnicodePath:function(){var f=this.extraFields[28789];if(f){var w=r(f.value);return w.readInt(1)!==1||l(this.fileName)!==w.readInt(4)?null:c.utf8decode(w.readData(f.length-5))}return null},findExtraFieldUnicodeComment:function(){var f=this.extraFields[25461];if(f){var w=r(f.value);return w.readInt(1)!==1||l(this.fileComment)!==w.readInt(4)?null:c.utf8decode(w.readData(f.length-5))}return null}},i.exports=p},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(t,i,s){function r(w,g,y){this.name=w,this.dir=y.dir,this.date=y.date,this.comment=y.comment,this.unixPermissions=y.unixPermissions,this.dosPermissions=y.dosPermissions,this._data=g,this._dataBinary=y.binary,this.options={compression:y.compression,compressionOptions:y.compressionOptions}}var o=t("./stream/StreamHelper"),a=t("./stream/DataWorker"),l=t("./utf8"),c=t("./compressedObject"),h=t("./stream/GenericWorker");r.prototype={internalStream:function(w){var g=null,y="string";try{if(!w)throw new Error("No output type specified.");var v=(y=w.toLowerCase())==="string"||y==="text";y!=="binarystring"&&y!=="text"||(y="string"),g=this._decompressWorker();var _=!this._dataBinary;_&&!v&&(g=g.pipe(new l.Utf8EncodeWorker)),!_&&v&&(g=g.pipe(new l.Utf8DecodeWorker))}catch(b){(g=new h("error")).error(b)}return new o(g,y,"")},async:function(w,g){return this.internalStream(w).accumulate(g)},nodeStream:function(w,g){return this.internalStream(w||"nodebuffer").toNodejsStream(g)},_compressWorker:function(w,g){if(this._data instanceof c&&this._data.compression.magic===w.magic)return this._data.getCompressedWorker();var y=this._decompressWorker();return this._dataBinary||(y=y.pipe(new l.Utf8EncodeWorker)),c.createWorkerFrom(y,w,g)},_decompressWorker:function(){return this._data instanceof c?this._data.getContentWorker():this._data instanceof h?this._data:new a(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],p=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)r.prototype[u[f]]=p;i.exports=r},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(t,i,s){(function(r){var o,a,l=r.MutationObserver||r.WebKitMutationObserver;if(l){var c=0,h=new l(w),u=r.document.createTextNode("");h.observe(u,{characterData:!0}),o=function(){u.data=c=++c%2}}else if(r.setImmediate||r.MessageChannel===void 0)o="document"in r&&"onreadystatechange"in r.document.createElement("script")?function(){var g=r.document.createElement("script");g.onreadystatechange=function(){w(),g.onreadystatechange=null,g.parentNode.removeChild(g),g=null},r.document.documentElement.appendChild(g)}:function(){setTimeout(w,0)};else{var p=new r.MessageChannel;p.port1.onmessage=w,o=function(){p.port2.postMessage(0)}}var f=[];function w(){var g,y;a=!0;for(var v=f.length;v;){for(y=f,f=[],g=-1;++g<v;)y[g]();v=f.length}a=!1}i.exports=function(g){f.push(g)!==1||a||o()}}).call(this,typeof Rn<"u"?Rn:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(t,i,s){var r=t("immediate");function o(){}var a={},l=["REJECTED"],c=["FULFILLED"],h=["PENDING"];function u(v){if(typeof v!="function")throw new TypeError("resolver must be a function");this.state=h,this.queue=[],this.outcome=void 0,v!==o&&g(this,v)}function p(v,_,b){this.promise=v,typeof _=="function"&&(this.onFulfilled=_,this.callFulfilled=this.otherCallFulfilled),typeof b=="function"&&(this.onRejected=b,this.callRejected=this.otherCallRejected)}function f(v,_,b){r(function(){var C;try{C=_(b)}catch(k){return a.reject(v,k)}C===v?a.reject(v,new TypeError("Cannot resolve promise with itself")):a.resolve(v,C)})}function w(v){var _=v&&v.then;if(v&&(typeof v=="object"||typeof v=="function")&&typeof _=="function")return function(){_.apply(v,arguments)}}function g(v,_){var b=!1;function C(x){b||(b=!0,a.reject(v,x))}function k(x){b||(b=!0,a.resolve(v,x))}var T=y(function(){_(k,C)});T.status==="error"&&C(T.value)}function y(v,_){var b={};try{b.value=v(_),b.status="success"}catch(C){b.status="error",b.value=C}return b}(i.exports=u).prototype.finally=function(v){if(typeof v!="function")return this;var _=this.constructor;return this.then(function(b){return _.resolve(v()).then(function(){return b})},function(b){return _.resolve(v()).then(function(){throw b})})},u.prototype.catch=function(v){return this.then(null,v)},u.prototype.then=function(v,_){if(typeof v!="function"&&this.state===c||typeof _!="function"&&this.state===l)return this;var b=new this.constructor(o);return this.state!==h?f(b,this.state===c?v:_,this.outcome):this.queue.push(new p(b,v,_)),b},p.prototype.callFulfilled=function(v){a.resolve(this.promise,v)},p.prototype.otherCallFulfilled=function(v){f(this.promise,this.onFulfilled,v)},p.prototype.callRejected=function(v){a.reject(this.promise,v)},p.prototype.otherCallRejected=function(v){f(this.promise,this.onRejected,v)},a.resolve=function(v,_){var b=y(w,_);if(b.status==="error")return a.reject(v,b.value);var C=b.value;if(C)g(v,C);else{v.state=c,v.outcome=_;for(var k=-1,T=v.queue.length;++k<T;)v.queue[k].callFulfilled(_)}return v},a.reject=function(v,_){v.state=l,v.outcome=_;for(var b=-1,C=v.queue.length;++b<C;)v.queue[b].callRejected(_);return v},u.resolve=function(v){return v instanceof this?v:a.resolve(new this(o),v)},u.reject=function(v){var _=new this(o);return a.reject(_,v)},u.all=function(v){var _=this;if(Object.prototype.toString.call(v)!=="[object Array]")return this.reject(new TypeError("must be an array"));var b=v.length,C=!1;if(!b)return this.resolve([]);for(var k=new Array(b),T=0,x=-1,L=new this(o);++x<b;)A(v[x],x);return L;function A(B,Z){_.resolve(B).then(function(S){k[Z]=S,++T!==b||C||(C=!0,a.resolve(L,k))},function(S){C||(C=!0,a.reject(L,S))})}},u.race=function(v){var _=this;if(Object.prototype.toString.call(v)!=="[object Array]")return this.reject(new TypeError("must be an array"));var b=v.length,C=!1;if(!b)return this.resolve([]);for(var k=-1,T=new this(o);++k<b;)x=v[k],_.resolve(x).then(function(L){C||(C=!0,a.resolve(T,L))},function(L){C||(C=!0,a.reject(T,L))});var x;return T}},{immediate:36}],38:[function(t,i,s){var r={};(0,t("./lib/utils/common").assign)(r,t("./lib/deflate"),t("./lib/inflate"),t("./lib/zlib/constants")),i.exports=r},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(t,i,s){var r=t("./zlib/deflate"),o=t("./utils/common"),a=t("./utils/strings"),l=t("./zlib/messages"),c=t("./zlib/zstream"),h=Object.prototype.toString,u=0,p=-1,f=0,w=8;function g(v){if(!(this instanceof g))return new g(v);this.options=o.assign({level:p,method:w,chunkSize:16384,windowBits:15,memLevel:8,strategy:f,to:""},v||{});var _=this.options;_.raw&&0<_.windowBits?_.windowBits=-_.windowBits:_.gzip&&0<_.windowBits&&_.windowBits<16&&(_.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new c,this.strm.avail_out=0;var b=r.deflateInit2(this.strm,_.level,_.method,_.windowBits,_.memLevel,_.strategy);if(b!==u)throw new Error(l[b]);if(_.header&&r.deflateSetHeader(this.strm,_.header),_.dictionary){var C;if(C=typeof _.dictionary=="string"?a.string2buf(_.dictionary):h.call(_.dictionary)==="[object ArrayBuffer]"?new Uint8Array(_.dictionary):_.dictionary,(b=r.deflateSetDictionary(this.strm,C))!==u)throw new Error(l[b]);this._dict_set=!0}}function y(v,_){var b=new g(_);if(b.push(v,!0),b.err)throw b.msg||l[b.err];return b.result}g.prototype.push=function(v,_){var b,C,k=this.strm,T=this.options.chunkSize;if(this.ended)return!1;C=_===~~_?_:_===!0?4:0,typeof v=="string"?k.input=a.string2buf(v):h.call(v)==="[object ArrayBuffer]"?k.input=new Uint8Array(v):k.input=v,k.next_in=0,k.avail_in=k.input.length;do{if(k.avail_out===0&&(k.output=new o.Buf8(T),k.next_out=0,k.avail_out=T),(b=r.deflate(k,C))!==1&&b!==u)return this.onEnd(b),!(this.ended=!0);k.avail_out!==0&&(k.avail_in!==0||C!==4&&C!==2)||(this.options.to==="string"?this.onData(a.buf2binstring(o.shrinkBuf(k.output,k.next_out))):this.onData(o.shrinkBuf(k.output,k.next_out)))}while((0<k.avail_in||k.avail_out===0)&&b!==1);return C===4?(b=r.deflateEnd(this.strm),this.onEnd(b),this.ended=!0,b===u):C!==2||(this.onEnd(u),!(k.avail_out=0))},g.prototype.onData=function(v){this.chunks.push(v)},g.prototype.onEnd=function(v){v===u&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=v,this.msg=this.strm.msg},s.Deflate=g,s.deflate=y,s.deflateRaw=function(v,_){return(_=_||{}).raw=!0,y(v,_)},s.gzip=function(v,_){return(_=_||{}).gzip=!0,y(v,_)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(t,i,s){var r=t("./zlib/inflate"),o=t("./utils/common"),a=t("./utils/strings"),l=t("./zlib/constants"),c=t("./zlib/messages"),h=t("./zlib/zstream"),u=t("./zlib/gzheader"),p=Object.prototype.toString;function f(g){if(!(this instanceof f))return new f(g);this.options=o.assign({chunkSize:16384,windowBits:0,to:""},g||{});var y=this.options;y.raw&&0<=y.windowBits&&y.windowBits<16&&(y.windowBits=-y.windowBits,y.windowBits===0&&(y.windowBits=-15)),!(0<=y.windowBits&&y.windowBits<16)||g&&g.windowBits||(y.windowBits+=32),15<y.windowBits&&y.windowBits<48&&!(15&y.windowBits)&&(y.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new h,this.strm.avail_out=0;var v=r.inflateInit2(this.strm,y.windowBits);if(v!==l.Z_OK)throw new Error(c[v]);this.header=new u,r.inflateGetHeader(this.strm,this.header)}function w(g,y){var v=new f(y);if(v.push(g,!0),v.err)throw v.msg||c[v.err];return v.result}f.prototype.push=function(g,y){var v,_,b,C,k,T,x=this.strm,L=this.options.chunkSize,A=this.options.dictionary,B=!1;if(this.ended)return!1;_=y===~~y?y:y===!0?l.Z_FINISH:l.Z_NO_FLUSH,typeof g=="string"?x.input=a.binstring2buf(g):p.call(g)==="[object ArrayBuffer]"?x.input=new Uint8Array(g):x.input=g,x.next_in=0,x.avail_in=x.input.length;do{if(x.avail_out===0&&(x.output=new o.Buf8(L),x.next_out=0,x.avail_out=L),(v=r.inflate(x,l.Z_NO_FLUSH))===l.Z_NEED_DICT&&A&&(T=typeof A=="string"?a.string2buf(A):p.call(A)==="[object ArrayBuffer]"?new Uint8Array(A):A,v=r.inflateSetDictionary(this.strm,T)),v===l.Z_BUF_ERROR&&B===!0&&(v=l.Z_OK,B=!1),v!==l.Z_STREAM_END&&v!==l.Z_OK)return this.onEnd(v),!(this.ended=!0);x.next_out&&(x.avail_out!==0&&v!==l.Z_STREAM_END&&(x.avail_in!==0||_!==l.Z_FINISH&&_!==l.Z_SYNC_FLUSH)||(this.options.to==="string"?(b=a.utf8border(x.output,x.next_out),C=x.next_out-b,k=a.buf2string(x.output,b),x.next_out=C,x.avail_out=L-C,C&&o.arraySet(x.output,x.output,b,C,0),this.onData(k)):this.onData(o.shrinkBuf(x.output,x.next_out)))),x.avail_in===0&&x.avail_out===0&&(B=!0)}while((0<x.avail_in||x.avail_out===0)&&v!==l.Z_STREAM_END);return v===l.Z_STREAM_END&&(_=l.Z_FINISH),_===l.Z_FINISH?(v=r.inflateEnd(this.strm),this.onEnd(v),this.ended=!0,v===l.Z_OK):_!==l.Z_SYNC_FLUSH||(this.onEnd(l.Z_OK),!(x.avail_out=0))},f.prototype.onData=function(g){this.chunks.push(g)},f.prototype.onEnd=function(g){g===l.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=g,this.msg=this.strm.msg},s.Inflate=f,s.inflate=w,s.inflateRaw=function(g,y){return(y=y||{}).raw=!0,w(g,y)},s.ungzip=w},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(t,i,s){var r=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";s.assign=function(l){for(var c=Array.prototype.slice.call(arguments,1);c.length;){var h=c.shift();if(h){if(typeof h!="object")throw new TypeError(h+"must be non-object");for(var u in h)h.hasOwnProperty(u)&&(l[u]=h[u])}}return l},s.shrinkBuf=function(l,c){return l.length===c?l:l.subarray?l.subarray(0,c):(l.length=c,l)};var o={arraySet:function(l,c,h,u,p){if(c.subarray&&l.subarray)l.set(c.subarray(h,h+u),p);else for(var f=0;f<u;f++)l[p+f]=c[h+f]},flattenChunks:function(l){var c,h,u,p,f,w;for(c=u=0,h=l.length;c<h;c++)u+=l[c].length;for(w=new Uint8Array(u),c=p=0,h=l.length;c<h;c++)f=l[c],w.set(f,p),p+=f.length;return w}},a={arraySet:function(l,c,h,u,p){for(var f=0;f<u;f++)l[p+f]=c[h+f]},flattenChunks:function(l){return[].concat.apply([],l)}};s.setTyped=function(l){l?(s.Buf8=Uint8Array,s.Buf16=Uint16Array,s.Buf32=Int32Array,s.assign(s,o)):(s.Buf8=Array,s.Buf16=Array,s.Buf32=Array,s.assign(s,a))},s.setTyped(r)},{}],42:[function(t,i,s){var r=t("./common"),o=!0,a=!0;try{String.fromCharCode.apply(null,[0])}catch{o=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{a=!1}for(var l=new r.Buf8(256),c=0;c<256;c++)l[c]=252<=c?6:248<=c?5:240<=c?4:224<=c?3:192<=c?2:1;function h(u,p){if(p<65537&&(u.subarray&&a||!u.subarray&&o))return String.fromCharCode.apply(null,r.shrinkBuf(u,p));for(var f="",w=0;w<p;w++)f+=String.fromCharCode(u[w]);return f}l[254]=l[254]=1,s.string2buf=function(u){var p,f,w,g,y,v=u.length,_=0;for(g=0;g<v;g++)(64512&(f=u.charCodeAt(g)))==55296&&g+1<v&&(64512&(w=u.charCodeAt(g+1)))==56320&&(f=65536+(f-55296<<10)+(w-56320),g++),_+=f<128?1:f<2048?2:f<65536?3:4;for(p=new r.Buf8(_),g=y=0;y<_;g++)(64512&(f=u.charCodeAt(g)))==55296&&g+1<v&&(64512&(w=u.charCodeAt(g+1)))==56320&&(f=65536+(f-55296<<10)+(w-56320),g++),f<128?p[y++]=f:(f<2048?p[y++]=192|f>>>6:(f<65536?p[y++]=224|f>>>12:(p[y++]=240|f>>>18,p[y++]=128|f>>>12&63),p[y++]=128|f>>>6&63),p[y++]=128|63&f);return p},s.buf2binstring=function(u){return h(u,u.length)},s.binstring2buf=function(u){for(var p=new r.Buf8(u.length),f=0,w=p.length;f<w;f++)p[f]=u.charCodeAt(f);return p},s.buf2string=function(u,p){var f,w,g,y,v=p||u.length,_=new Array(2*v);for(f=w=0;f<v;)if((g=u[f++])<128)_[w++]=g;else if(4<(y=l[g]))_[w++]=65533,f+=y-1;else{for(g&=y===2?31:y===3?15:7;1<y&&f<v;)g=g<<6|63&u[f++],y--;1<y?_[w++]=65533:g<65536?_[w++]=g:(g-=65536,_[w++]=55296|g>>10&1023,_[w++]=56320|1023&g)}return h(_,w)},s.utf8border=function(u,p){var f;for((p=p||u.length)>u.length&&(p=u.length),f=p-1;0<=f&&(192&u[f])==128;)f--;return f<0||f===0?p:f+l[u[f]]>p?f:p}},{"./common":41}],43:[function(t,i,s){i.exports=function(r,o,a,l){for(var c=65535&r|0,h=r>>>16&65535|0,u=0;a!==0;){for(a-=u=2e3<a?2e3:a;h=h+(c=c+o[l++]|0)|0,--u;);c%=65521,h%=65521}return c|h<<16|0}},{}],44:[function(t,i,s){i.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(t,i,s){var r=function(){for(var o,a=[],l=0;l<256;l++){o=l;for(var c=0;c<8;c++)o=1&o?3988292384^o>>>1:o>>>1;a[l]=o}return a}();i.exports=function(o,a,l,c){var h=r,u=c+l;o^=-1;for(var p=c;p<u;p++)o=o>>>8^h[255&(o^a[p])];return-1^o}},{}],46:[function(t,i,s){var r,o=t("../utils/common"),a=t("./trees"),l=t("./adler32"),c=t("./crc32"),h=t("./messages"),u=0,p=4,f=0,w=-2,g=-1,y=4,v=2,_=8,b=9,C=286,k=30,T=19,x=2*C+1,L=15,A=3,B=258,Z=B+A+1,S=42,F=113,m=1,U=2,oe=3,j=4;function X(d,M){return d.msg=h[M],M}function $(d){return(d<<1)-(4<d?9:0)}function ee(d){for(var M=d.length;0<=--M;)d[M]=0}function O(d){var M=d.state,D=M.pending;D>d.avail_out&&(D=d.avail_out),D!==0&&(o.arraySet(d.output,M.pending_buf,M.pending_out,D,d.next_out),d.next_out+=D,M.pending_out+=D,d.total_out+=D,d.avail_out-=D,M.pending-=D,M.pending===0&&(M.pending_out=0))}function P(d,M){a._tr_flush_block(d,0<=d.block_start?d.block_start:-1,d.strstart-d.block_start,M),d.block_start=d.strstart,O(d.strm)}function te(d,M){d.pending_buf[d.pending++]=M}function K(d,M){d.pending_buf[d.pending++]=M>>>8&255,d.pending_buf[d.pending++]=255&M}function G(d,M){var D,I,E=d.max_chain_length,R=d.strstart,z=d.prev_length,W=d.nice_match,N=d.strstart>d.w_size-Z?d.strstart-(d.w_size-Z):0,V=d.window,J=d.w_mask,q=d.prev,ne=d.strstart+B,Ie=V[R+z-1],fe=V[R+z];d.prev_length>=d.good_match&&(E>>=2),W>d.lookahead&&(W=d.lookahead);do if(V[(D=M)+z]===fe&&V[D+z-1]===Ie&&V[D]===V[R]&&V[++D]===V[R+1]){R+=2,D++;do;while(V[++R]===V[++D]&&V[++R]===V[++D]&&V[++R]===V[++D]&&V[++R]===V[++D]&&V[++R]===V[++D]&&V[++R]===V[++D]&&V[++R]===V[++D]&&V[++R]===V[++D]&&R<ne);if(I=B-(ne-R),R=ne-B,z<I){if(d.match_start=M,W<=(z=I))break;Ie=V[R+z-1],fe=V[R+z]}}while((M=q[M&J])>N&&--E!=0);return z<=d.lookahead?z:d.lookahead}function we(d){var M,D,I,E,R,z,W,N,V,J,q=d.w_size;do{if(E=d.window_size-d.lookahead-d.strstart,d.strstart>=q+(q-Z)){for(o.arraySet(d.window,d.window,q,q,0),d.match_start-=q,d.strstart-=q,d.block_start-=q,M=D=d.hash_size;I=d.head[--M],d.head[M]=q<=I?I-q:0,--D;);for(M=D=q;I=d.prev[--M],d.prev[M]=q<=I?I-q:0,--D;);E+=q}if(d.strm.avail_in===0)break;if(z=d.strm,W=d.window,N=d.strstart+d.lookahead,V=E,J=void 0,J=z.avail_in,V<J&&(J=V),D=J===0?0:(z.avail_in-=J,o.arraySet(W,z.input,z.next_in,J,N),z.state.wrap===1?z.adler=l(z.adler,W,J,N):z.state.wrap===2&&(z.adler=c(z.adler,W,J,N)),z.next_in+=J,z.total_in+=J,J),d.lookahead+=D,d.lookahead+d.insert>=A)for(R=d.strstart-d.insert,d.ins_h=d.window[R],d.ins_h=(d.ins_h<<d.hash_shift^d.window[R+1])&d.hash_mask;d.insert&&(d.ins_h=(d.ins_h<<d.hash_shift^d.window[R+A-1])&d.hash_mask,d.prev[R&d.w_mask]=d.head[d.ins_h],d.head[d.ins_h]=R,R++,d.insert--,!(d.lookahead+d.insert<A)););}while(d.lookahead<Z&&d.strm.avail_in!==0)}function Re(d,M){for(var D,I;;){if(d.lookahead<Z){if(we(d),d.lookahead<Z&&M===u)return m;if(d.lookahead===0)break}if(D=0,d.lookahead>=A&&(d.ins_h=(d.ins_h<<d.hash_shift^d.window[d.strstart+A-1])&d.hash_mask,D=d.prev[d.strstart&d.w_mask]=d.head[d.ins_h],d.head[d.ins_h]=d.strstart),D!==0&&d.strstart-D<=d.w_size-Z&&(d.match_length=G(d,D)),d.match_length>=A)if(I=a._tr_tally(d,d.strstart-d.match_start,d.match_length-A),d.lookahead-=d.match_length,d.match_length<=d.max_lazy_match&&d.lookahead>=A){for(d.match_length--;d.strstart++,d.ins_h=(d.ins_h<<d.hash_shift^d.window[d.strstart+A-1])&d.hash_mask,D=d.prev[d.strstart&d.w_mask]=d.head[d.ins_h],d.head[d.ins_h]=d.strstart,--d.match_length!=0;);d.strstart++}else d.strstart+=d.match_length,d.match_length=0,d.ins_h=d.window[d.strstart],d.ins_h=(d.ins_h<<d.hash_shift^d.window[d.strstart+1])&d.hash_mask;else I=a._tr_tally(d,0,d.window[d.strstart]),d.lookahead--,d.strstart++;if(I&&(P(d,!1),d.strm.avail_out===0))return m}return d.insert=d.strstart<A-1?d.strstart:A-1,M===p?(P(d,!0),d.strm.avail_out===0?oe:j):d.last_lit&&(P(d,!1),d.strm.avail_out===0)?m:U}function le(d,M){for(var D,I,E;;){if(d.lookahead<Z){if(we(d),d.lookahead<Z&&M===u)return m;if(d.lookahead===0)break}if(D=0,d.lookahead>=A&&(d.ins_h=(d.ins_h<<d.hash_shift^d.window[d.strstart+A-1])&d.hash_mask,D=d.prev[d.strstart&d.w_mask]=d.head[d.ins_h],d.head[d.ins_h]=d.strstart),d.prev_length=d.match_length,d.prev_match=d.match_start,d.match_length=A-1,D!==0&&d.prev_length<d.max_lazy_match&&d.strstart-D<=d.w_size-Z&&(d.match_length=G(d,D),d.match_length<=5&&(d.strategy===1||d.match_length===A&&4096<d.strstart-d.match_start)&&(d.match_length=A-1)),d.prev_length>=A&&d.match_length<=d.prev_length){for(E=d.strstart+d.lookahead-A,I=a._tr_tally(d,d.strstart-1-d.prev_match,d.prev_length-A),d.lookahead-=d.prev_length-1,d.prev_length-=2;++d.strstart<=E&&(d.ins_h=(d.ins_h<<d.hash_shift^d.window[d.strstart+A-1])&d.hash_mask,D=d.prev[d.strstart&d.w_mask]=d.head[d.ins_h],d.head[d.ins_h]=d.strstart),--d.prev_length!=0;);if(d.match_available=0,d.match_length=A-1,d.strstart++,I&&(P(d,!1),d.strm.avail_out===0))return m}else if(d.match_available){if((I=a._tr_tally(d,0,d.window[d.strstart-1]))&&P(d,!1),d.strstart++,d.lookahead--,d.strm.avail_out===0)return m}else d.match_available=1,d.strstart++,d.lookahead--}return d.match_available&&(I=a._tr_tally(d,0,d.window[d.strstart-1]),d.match_available=0),d.insert=d.strstart<A-1?d.strstart:A-1,M===p?(P(d,!0),d.strm.avail_out===0?oe:j):d.last_lit&&(P(d,!1),d.strm.avail_out===0)?m:U}function pe(d,M,D,I,E){this.good_length=d,this.max_lazy=M,this.nice_length=D,this.max_chain=I,this.func=E}function Te(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=_,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new o.Buf16(2*x),this.dyn_dtree=new o.Buf16(2*(2*k+1)),this.bl_tree=new o.Buf16(2*(2*T+1)),ee(this.dyn_ltree),ee(this.dyn_dtree),ee(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new o.Buf16(L+1),this.heap=new o.Buf16(2*C+1),ee(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new o.Buf16(2*C+1),ee(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function Ee(d){var M;return d&&d.state?(d.total_in=d.total_out=0,d.data_type=v,(M=d.state).pending=0,M.pending_out=0,M.wrap<0&&(M.wrap=-M.wrap),M.status=M.wrap?S:F,d.adler=M.wrap===2?0:1,M.last_flush=u,a._tr_init(M),f):X(d,w)}function Je(d){var M=Ee(d);return M===f&&function(D){D.window_size=2*D.w_size,ee(D.head),D.max_lazy_match=r[D.level].max_lazy,D.good_match=r[D.level].good_length,D.nice_match=r[D.level].nice_length,D.max_chain_length=r[D.level].max_chain,D.strstart=0,D.block_start=0,D.lookahead=0,D.insert=0,D.match_length=D.prev_length=A-1,D.match_available=0,D.ins_h=0}(d.state),M}function ze(d,M,D,I,E,R){if(!d)return w;var z=1;if(M===g&&(M=6),I<0?(z=0,I=-I):15<I&&(z=2,I-=16),E<1||b<E||D!==_||I<8||15<I||M<0||9<M||R<0||y<R)return X(d,w);I===8&&(I=9);var W=new Te;return(d.state=W).strm=d,W.wrap=z,W.gzhead=null,W.w_bits=I,W.w_size=1<<W.w_bits,W.w_mask=W.w_size-1,W.hash_bits=E+7,W.hash_size=1<<W.hash_bits,W.hash_mask=W.hash_size-1,W.hash_shift=~~((W.hash_bits+A-1)/A),W.window=new o.Buf8(2*W.w_size),W.head=new o.Buf16(W.hash_size),W.prev=new o.Buf16(W.w_size),W.lit_bufsize=1<<E+6,W.pending_buf_size=4*W.lit_bufsize,W.pending_buf=new o.Buf8(W.pending_buf_size),W.d_buf=1*W.lit_bufsize,W.l_buf=3*W.lit_bufsize,W.level=M,W.strategy=R,W.method=D,Je(d)}r=[new pe(0,0,0,0,function(d,M){var D=65535;for(D>d.pending_buf_size-5&&(D=d.pending_buf_size-5);;){if(d.lookahead<=1){if(we(d),d.lookahead===0&&M===u)return m;if(d.lookahead===0)break}d.strstart+=d.lookahead,d.lookahead=0;var I=d.block_start+D;if((d.strstart===0||d.strstart>=I)&&(d.lookahead=d.strstart-I,d.strstart=I,P(d,!1),d.strm.avail_out===0)||d.strstart-d.block_start>=d.w_size-Z&&(P(d,!1),d.strm.avail_out===0))return m}return d.insert=0,M===p?(P(d,!0),d.strm.avail_out===0?oe:j):(d.strstart>d.block_start&&(P(d,!1),d.strm.avail_out),m)}),new pe(4,4,8,4,Re),new pe(4,5,16,8,Re),new pe(4,6,32,32,Re),new pe(4,4,16,16,le),new pe(8,16,32,32,le),new pe(8,16,128,128,le),new pe(8,32,128,256,le),new pe(32,128,258,1024,le),new pe(32,258,258,4096,le)],s.deflateInit=function(d,M){return ze(d,M,_,15,8,0)},s.deflateInit2=ze,s.deflateReset=Je,s.deflateResetKeep=Ee,s.deflateSetHeader=function(d,M){return d&&d.state?d.state.wrap!==2?w:(d.state.gzhead=M,f):w},s.deflate=function(d,M){var D,I,E,R;if(!d||!d.state||5<M||M<0)return d?X(d,w):w;if(I=d.state,!d.output||!d.input&&d.avail_in!==0||I.status===666&&M!==p)return X(d,d.avail_out===0?-5:w);if(I.strm=d,D=I.last_flush,I.last_flush=M,I.status===S)if(I.wrap===2)d.adler=0,te(I,31),te(I,139),te(I,8),I.gzhead?(te(I,(I.gzhead.text?1:0)+(I.gzhead.hcrc?2:0)+(I.gzhead.extra?4:0)+(I.gzhead.name?8:0)+(I.gzhead.comment?16:0)),te(I,255&I.gzhead.time),te(I,I.gzhead.time>>8&255),te(I,I.gzhead.time>>16&255),te(I,I.gzhead.time>>24&255),te(I,I.level===9?2:2<=I.strategy||I.level<2?4:0),te(I,255&I.gzhead.os),I.gzhead.extra&&I.gzhead.extra.length&&(te(I,255&I.gzhead.extra.length),te(I,I.gzhead.extra.length>>8&255)),I.gzhead.hcrc&&(d.adler=c(d.adler,I.pending_buf,I.pending,0)),I.gzindex=0,I.status=69):(te(I,0),te(I,0),te(I,0),te(I,0),te(I,0),te(I,I.level===9?2:2<=I.strategy||I.level<2?4:0),te(I,3),I.status=F);else{var z=_+(I.w_bits-8<<4)<<8;z|=(2<=I.strategy||I.level<2?0:I.level<6?1:I.level===6?2:3)<<6,I.strstart!==0&&(z|=32),z+=31-z%31,I.status=F,K(I,z),I.strstart!==0&&(K(I,d.adler>>>16),K(I,65535&d.adler)),d.adler=1}if(I.status===69)if(I.gzhead.extra){for(E=I.pending;I.gzindex<(65535&I.gzhead.extra.length)&&(I.pending!==I.pending_buf_size||(I.gzhead.hcrc&&I.pending>E&&(d.adler=c(d.adler,I.pending_buf,I.pending-E,E)),O(d),E=I.pending,I.pending!==I.pending_buf_size));)te(I,255&I.gzhead.extra[I.gzindex]),I.gzindex++;I.gzhead.hcrc&&I.pending>E&&(d.adler=c(d.adler,I.pending_buf,I.pending-E,E)),I.gzindex===I.gzhead.extra.length&&(I.gzindex=0,I.status=73)}else I.status=73;if(I.status===73)if(I.gzhead.name){E=I.pending;do{if(I.pending===I.pending_buf_size&&(I.gzhead.hcrc&&I.pending>E&&(d.adler=c(d.adler,I.pending_buf,I.pending-E,E)),O(d),E=I.pending,I.pending===I.pending_buf_size)){R=1;break}R=I.gzindex<I.gzhead.name.length?255&I.gzhead.name.charCodeAt(I.gzindex++):0,te(I,R)}while(R!==0);I.gzhead.hcrc&&I.pending>E&&(d.adler=c(d.adler,I.pending_buf,I.pending-E,E)),R===0&&(I.gzindex=0,I.status=91)}else I.status=91;if(I.status===91)if(I.gzhead.comment){E=I.pending;do{if(I.pending===I.pending_buf_size&&(I.gzhead.hcrc&&I.pending>E&&(d.adler=c(d.adler,I.pending_buf,I.pending-E,E)),O(d),E=I.pending,I.pending===I.pending_buf_size)){R=1;break}R=I.gzindex<I.gzhead.comment.length?255&I.gzhead.comment.charCodeAt(I.gzindex++):0,te(I,R)}while(R!==0);I.gzhead.hcrc&&I.pending>E&&(d.adler=c(d.adler,I.pending_buf,I.pending-E,E)),R===0&&(I.status=103)}else I.status=103;if(I.status===103&&(I.gzhead.hcrc?(I.pending+2>I.pending_buf_size&&O(d),I.pending+2<=I.pending_buf_size&&(te(I,255&d.adler),te(I,d.adler>>8&255),d.adler=0,I.status=F)):I.status=F),I.pending!==0){if(O(d),d.avail_out===0)return I.last_flush=-1,f}else if(d.avail_in===0&&$(M)<=$(D)&&M!==p)return X(d,-5);if(I.status===666&&d.avail_in!==0)return X(d,-5);if(d.avail_in!==0||I.lookahead!==0||M!==u&&I.status!==666){var W=I.strategy===2?function(N,V){for(var J;;){if(N.lookahead===0&&(we(N),N.lookahead===0)){if(V===u)return m;break}if(N.match_length=0,J=a._tr_tally(N,0,N.window[N.strstart]),N.lookahead--,N.strstart++,J&&(P(N,!1),N.strm.avail_out===0))return m}return N.insert=0,V===p?(P(N,!0),N.strm.avail_out===0?oe:j):N.last_lit&&(P(N,!1),N.strm.avail_out===0)?m:U}(I,M):I.strategy===3?function(N,V){for(var J,q,ne,Ie,fe=N.window;;){if(N.lookahead<=B){if(we(N),N.lookahead<=B&&V===u)return m;if(N.lookahead===0)break}if(N.match_length=0,N.lookahead>=A&&0<N.strstart&&(q=fe[ne=N.strstart-1])===fe[++ne]&&q===fe[++ne]&&q===fe[++ne]){Ie=N.strstart+B;do;while(q===fe[++ne]&&q===fe[++ne]&&q===fe[++ne]&&q===fe[++ne]&&q===fe[++ne]&&q===fe[++ne]&&q===fe[++ne]&&q===fe[++ne]&&ne<Ie);N.match_length=B-(Ie-ne),N.match_length>N.lookahead&&(N.match_length=N.lookahead)}if(N.match_length>=A?(J=a._tr_tally(N,1,N.match_length-A),N.lookahead-=N.match_length,N.strstart+=N.match_length,N.match_length=0):(J=a._tr_tally(N,0,N.window[N.strstart]),N.lookahead--,N.strstart++),J&&(P(N,!1),N.strm.avail_out===0))return m}return N.insert=0,V===p?(P(N,!0),N.strm.avail_out===0?oe:j):N.last_lit&&(P(N,!1),N.strm.avail_out===0)?m:U}(I,M):r[I.level].func(I,M);if(W!==oe&&W!==j||(I.status=666),W===m||W===oe)return d.avail_out===0&&(I.last_flush=-1),f;if(W===U&&(M===1?a._tr_align(I):M!==5&&(a._tr_stored_block(I,0,0,!1),M===3&&(ee(I.head),I.lookahead===0&&(I.strstart=0,I.block_start=0,I.insert=0))),O(d),d.avail_out===0))return I.last_flush=-1,f}return M!==p?f:I.wrap<=0?1:(I.wrap===2?(te(I,255&d.adler),te(I,d.adler>>8&255),te(I,d.adler>>16&255),te(I,d.adler>>24&255),te(I,255&d.total_in),te(I,d.total_in>>8&255),te(I,d.total_in>>16&255),te(I,d.total_in>>24&255)):(K(I,d.adler>>>16),K(I,65535&d.adler)),O(d),0<I.wrap&&(I.wrap=-I.wrap),I.pending!==0?f:1)},s.deflateEnd=function(d){var M;return d&&d.state?(M=d.state.status)!==S&&M!==69&&M!==73&&M!==91&&M!==103&&M!==F&&M!==666?X(d,w):(d.state=null,M===F?X(d,-3):f):w},s.deflateSetDictionary=function(d,M){var D,I,E,R,z,W,N,V,J=M.length;if(!d||!d.state||(R=(D=d.state).wrap)===2||R===1&&D.status!==S||D.lookahead)return w;for(R===1&&(d.adler=l(d.adler,M,J,0)),D.wrap=0,J>=D.w_size&&(R===0&&(ee(D.head),D.strstart=0,D.block_start=0,D.insert=0),V=new o.Buf8(D.w_size),o.arraySet(V,M,J-D.w_size,D.w_size,0),M=V,J=D.w_size),z=d.avail_in,W=d.next_in,N=d.input,d.avail_in=J,d.next_in=0,d.input=M,we(D);D.lookahead>=A;){for(I=D.strstart,E=D.lookahead-(A-1);D.ins_h=(D.ins_h<<D.hash_shift^D.window[I+A-1])&D.hash_mask,D.prev[I&D.w_mask]=D.head[D.ins_h],D.head[D.ins_h]=I,I++,--E;);D.strstart=I,D.lookahead=A-1,we(D)}return D.strstart+=D.lookahead,D.block_start=D.strstart,D.insert=D.lookahead,D.lookahead=0,D.match_length=D.prev_length=A-1,D.match_available=0,d.next_in=W,d.input=N,d.avail_in=z,D.wrap=R,f},s.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(t,i,s){i.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(t,i,s){i.exports=function(r,o){var a,l,c,h,u,p,f,w,g,y,v,_,b,C,k,T,x,L,A,B,Z,S,F,m,U;a=r.state,l=r.next_in,m=r.input,c=l+(r.avail_in-5),h=r.next_out,U=r.output,u=h-(o-r.avail_out),p=h+(r.avail_out-257),f=a.dmax,w=a.wsize,g=a.whave,y=a.wnext,v=a.window,_=a.hold,b=a.bits,C=a.lencode,k=a.distcode,T=(1<<a.lenbits)-1,x=(1<<a.distbits)-1;e:do{b<15&&(_+=m[l++]<<b,b+=8,_+=m[l++]<<b,b+=8),L=C[_&T];t:for(;;){if(_>>>=A=L>>>24,b-=A,(A=L>>>16&255)===0)U[h++]=65535&L;else{if(!(16&A)){if(!(64&A)){L=C[(65535&L)+(_&(1<<A)-1)];continue t}if(32&A){a.mode=12;break e}r.msg="invalid literal/length code",a.mode=30;break e}B=65535&L,(A&=15)&&(b<A&&(_+=m[l++]<<b,b+=8),B+=_&(1<<A)-1,_>>>=A,b-=A),b<15&&(_+=m[l++]<<b,b+=8,_+=m[l++]<<b,b+=8),L=k[_&x];n:for(;;){if(_>>>=A=L>>>24,b-=A,!(16&(A=L>>>16&255))){if(!(64&A)){L=k[(65535&L)+(_&(1<<A)-1)];continue n}r.msg="invalid distance code",a.mode=30;break e}if(Z=65535&L,b<(A&=15)&&(_+=m[l++]<<b,(b+=8)<A&&(_+=m[l++]<<b,b+=8)),f<(Z+=_&(1<<A)-1)){r.msg="invalid distance too far back",a.mode=30;break e}if(_>>>=A,b-=A,(A=h-u)<Z){if(g<(A=Z-A)&&a.sane){r.msg="invalid distance too far back",a.mode=30;break e}if(F=v,(S=0)===y){if(S+=w-A,A<B){for(B-=A;U[h++]=v[S++],--A;);S=h-Z,F=U}}else if(y<A){if(S+=w+y-A,(A-=y)<B){for(B-=A;U[h++]=v[S++],--A;);if(S=0,y<B){for(B-=A=y;U[h++]=v[S++],--A;);S=h-Z,F=U}}}else if(S+=y-A,A<B){for(B-=A;U[h++]=v[S++],--A;);S=h-Z,F=U}for(;2<B;)U[h++]=F[S++],U[h++]=F[S++],U[h++]=F[S++],B-=3;B&&(U[h++]=F[S++],1<B&&(U[h++]=F[S++]))}else{for(S=h-Z;U[h++]=U[S++],U[h++]=U[S++],U[h++]=U[S++],2<(B-=3););B&&(U[h++]=U[S++],1<B&&(U[h++]=U[S++]))}break}}break}}while(l<c&&h<p);l-=B=b>>3,_&=(1<<(b-=B<<3))-1,r.next_in=l,r.next_out=h,r.avail_in=l<c?c-l+5:5-(l-c),r.avail_out=h<p?p-h+257:257-(h-p),a.hold=_,a.bits=b}},{}],49:[function(t,i,s){var r=t("../utils/common"),o=t("./adler32"),a=t("./crc32"),l=t("./inffast"),c=t("./inftrees"),h=1,u=2,p=0,f=-2,w=1,g=852,y=592;function v(S){return(S>>>24&255)+(S>>>8&65280)+((65280&S)<<8)+((255&S)<<24)}function _(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new r.Buf16(320),this.work=new r.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function b(S){var F;return S&&S.state?(F=S.state,S.total_in=S.total_out=F.total=0,S.msg="",F.wrap&&(S.adler=1&F.wrap),F.mode=w,F.last=0,F.havedict=0,F.dmax=32768,F.head=null,F.hold=0,F.bits=0,F.lencode=F.lendyn=new r.Buf32(g),F.distcode=F.distdyn=new r.Buf32(y),F.sane=1,F.back=-1,p):f}function C(S){var F;return S&&S.state?((F=S.state).wsize=0,F.whave=0,F.wnext=0,b(S)):f}function k(S,F){var m,U;return S&&S.state?(U=S.state,F<0?(m=0,F=-F):(m=1+(F>>4),F<48&&(F&=15)),F&&(F<8||15<F)?f:(U.window!==null&&U.wbits!==F&&(U.window=null),U.wrap=m,U.wbits=F,C(S))):f}function T(S,F){var m,U;return S?(U=new _,(S.state=U).window=null,(m=k(S,F))!==p&&(S.state=null),m):f}var x,L,A=!0;function B(S){if(A){var F;for(x=new r.Buf32(512),L=new r.Buf32(32),F=0;F<144;)S.lens[F++]=8;for(;F<256;)S.lens[F++]=9;for(;F<280;)S.lens[F++]=7;for(;F<288;)S.lens[F++]=8;for(c(h,S.lens,0,288,x,0,S.work,{bits:9}),F=0;F<32;)S.lens[F++]=5;c(u,S.lens,0,32,L,0,S.work,{bits:5}),A=!1}S.lencode=x,S.lenbits=9,S.distcode=L,S.distbits=5}function Z(S,F,m,U){var oe,j=S.state;return j.window===null&&(j.wsize=1<<j.wbits,j.wnext=0,j.whave=0,j.window=new r.Buf8(j.wsize)),U>=j.wsize?(r.arraySet(j.window,F,m-j.wsize,j.wsize,0),j.wnext=0,j.whave=j.wsize):(U<(oe=j.wsize-j.wnext)&&(oe=U),r.arraySet(j.window,F,m-U,oe,j.wnext),(U-=oe)?(r.arraySet(j.window,F,m-U,U,0),j.wnext=U,j.whave=j.wsize):(j.wnext+=oe,j.wnext===j.wsize&&(j.wnext=0),j.whave<j.wsize&&(j.whave+=oe))),0}s.inflateReset=C,s.inflateReset2=k,s.inflateResetKeep=b,s.inflateInit=function(S){return T(S,15)},s.inflateInit2=T,s.inflate=function(S,F){var m,U,oe,j,X,$,ee,O,P,te,K,G,we,Re,le,pe,Te,Ee,Je,ze,d,M,D,I,E=0,R=new r.Buf8(4),z=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!S||!S.state||!S.output||!S.input&&S.avail_in!==0)return f;(m=S.state).mode===12&&(m.mode=13),X=S.next_out,oe=S.output,ee=S.avail_out,j=S.next_in,U=S.input,$=S.avail_in,O=m.hold,P=m.bits,te=$,K=ee,M=p;e:for(;;)switch(m.mode){case w:if(m.wrap===0){m.mode=13;break}for(;P<16;){if($===0)break e;$--,O+=U[j++]<<P,P+=8}if(2&m.wrap&&O===35615){R[m.check=0]=255&O,R[1]=O>>>8&255,m.check=a(m.check,R,2,0),P=O=0,m.mode=2;break}if(m.flags=0,m.head&&(m.head.done=!1),!(1&m.wrap)||(((255&O)<<8)+(O>>8))%31){S.msg="incorrect header check",m.mode=30;break}if((15&O)!=8){S.msg="unknown compression method",m.mode=30;break}if(P-=4,d=8+(15&(O>>>=4)),m.wbits===0)m.wbits=d;else if(d>m.wbits){S.msg="invalid window size",m.mode=30;break}m.dmax=1<<d,S.adler=m.check=1,m.mode=512&O?10:12,P=O=0;break;case 2:for(;P<16;){if($===0)break e;$--,O+=U[j++]<<P,P+=8}if(m.flags=O,(255&m.flags)!=8){S.msg="unknown compression method",m.mode=30;break}if(57344&m.flags){S.msg="unknown header flags set",m.mode=30;break}m.head&&(m.head.text=O>>8&1),512&m.flags&&(R[0]=255&O,R[1]=O>>>8&255,m.check=a(m.check,R,2,0)),P=O=0,m.mode=3;case 3:for(;P<32;){if($===0)break e;$--,O+=U[j++]<<P,P+=8}m.head&&(m.head.time=O),512&m.flags&&(R[0]=255&O,R[1]=O>>>8&255,R[2]=O>>>16&255,R[3]=O>>>24&255,m.check=a(m.check,R,4,0)),P=O=0,m.mode=4;case 4:for(;P<16;){if($===0)break e;$--,O+=U[j++]<<P,P+=8}m.head&&(m.head.xflags=255&O,m.head.os=O>>8),512&m.flags&&(R[0]=255&O,R[1]=O>>>8&255,m.check=a(m.check,R,2,0)),P=O=0,m.mode=5;case 5:if(1024&m.flags){for(;P<16;){if($===0)break e;$--,O+=U[j++]<<P,P+=8}m.length=O,m.head&&(m.head.extra_len=O),512&m.flags&&(R[0]=255&O,R[1]=O>>>8&255,m.check=a(m.check,R,2,0)),P=O=0}else m.head&&(m.head.extra=null);m.mode=6;case 6:if(1024&m.flags&&($<(G=m.length)&&(G=$),G&&(m.head&&(d=m.head.extra_len-m.length,m.head.extra||(m.head.extra=new Array(m.head.extra_len)),r.arraySet(m.head.extra,U,j,G,d)),512&m.flags&&(m.check=a(m.check,U,G,j)),$-=G,j+=G,m.length-=G),m.length))break e;m.length=0,m.mode=7;case 7:if(2048&m.flags){if($===0)break e;for(G=0;d=U[j+G++],m.head&&d&&m.length<65536&&(m.head.name+=String.fromCharCode(d)),d&&G<$;);if(512&m.flags&&(m.check=a(m.check,U,G,j)),$-=G,j+=G,d)break e}else m.head&&(m.head.name=null);m.length=0,m.mode=8;case 8:if(4096&m.flags){if($===0)break e;for(G=0;d=U[j+G++],m.head&&d&&m.length<65536&&(m.head.comment+=String.fromCharCode(d)),d&&G<$;);if(512&m.flags&&(m.check=a(m.check,U,G,j)),$-=G,j+=G,d)break e}else m.head&&(m.head.comment=null);m.mode=9;case 9:if(512&m.flags){for(;P<16;){if($===0)break e;$--,O+=U[j++]<<P,P+=8}if(O!==(65535&m.check)){S.msg="header crc mismatch",m.mode=30;break}P=O=0}m.head&&(m.head.hcrc=m.flags>>9&1,m.head.done=!0),S.adler=m.check=0,m.mode=12;break;case 10:for(;P<32;){if($===0)break e;$--,O+=U[j++]<<P,P+=8}S.adler=m.check=v(O),P=O=0,m.mode=11;case 11:if(m.havedict===0)return S.next_out=X,S.avail_out=ee,S.next_in=j,S.avail_in=$,m.hold=O,m.bits=P,2;S.adler=m.check=1,m.mode=12;case 12:if(F===5||F===6)break e;case 13:if(m.last){O>>>=7&P,P-=7&P,m.mode=27;break}for(;P<3;){if($===0)break e;$--,O+=U[j++]<<P,P+=8}switch(m.last=1&O,P-=1,3&(O>>>=1)){case 0:m.mode=14;break;case 1:if(B(m),m.mode=20,F!==6)break;O>>>=2,P-=2;break e;case 2:m.mode=17;break;case 3:S.msg="invalid block type",m.mode=30}O>>>=2,P-=2;break;case 14:for(O>>>=7&P,P-=7&P;P<32;){if($===0)break e;$--,O+=U[j++]<<P,P+=8}if((65535&O)!=(O>>>16^65535)){S.msg="invalid stored block lengths",m.mode=30;break}if(m.length=65535&O,P=O=0,m.mode=15,F===6)break e;case 15:m.mode=16;case 16:if(G=m.length){if($<G&&(G=$),ee<G&&(G=ee),G===0)break e;r.arraySet(oe,U,j,G,X),$-=G,j+=G,ee-=G,X+=G,m.length-=G;break}m.mode=12;break;case 17:for(;P<14;){if($===0)break e;$--,O+=U[j++]<<P,P+=8}if(m.nlen=257+(31&O),O>>>=5,P-=5,m.ndist=1+(31&O),O>>>=5,P-=5,m.ncode=4+(15&O),O>>>=4,P-=4,286<m.nlen||30<m.ndist){S.msg="too many length or distance symbols",m.mode=30;break}m.have=0,m.mode=18;case 18:for(;m.have<m.ncode;){for(;P<3;){if($===0)break e;$--,O+=U[j++]<<P,P+=8}m.lens[z[m.have++]]=7&O,O>>>=3,P-=3}for(;m.have<19;)m.lens[z[m.have++]]=0;if(m.lencode=m.lendyn,m.lenbits=7,D={bits:m.lenbits},M=c(0,m.lens,0,19,m.lencode,0,m.work,D),m.lenbits=D.bits,M){S.msg="invalid code lengths set",m.mode=30;break}m.have=0,m.mode=19;case 19:for(;m.have<m.nlen+m.ndist;){for(;pe=(E=m.lencode[O&(1<<m.lenbits)-1])>>>16&255,Te=65535&E,!((le=E>>>24)<=P);){if($===0)break e;$--,O+=U[j++]<<P,P+=8}if(Te<16)O>>>=le,P-=le,m.lens[m.have++]=Te;else{if(Te===16){for(I=le+2;P<I;){if($===0)break e;$--,O+=U[j++]<<P,P+=8}if(O>>>=le,P-=le,m.have===0){S.msg="invalid bit length repeat",m.mode=30;break}d=m.lens[m.have-1],G=3+(3&O),O>>>=2,P-=2}else if(Te===17){for(I=le+3;P<I;){if($===0)break e;$--,O+=U[j++]<<P,P+=8}P-=le,d=0,G=3+(7&(O>>>=le)),O>>>=3,P-=3}else{for(I=le+7;P<I;){if($===0)break e;$--,O+=U[j++]<<P,P+=8}P-=le,d=0,G=11+(127&(O>>>=le)),O>>>=7,P-=7}if(m.have+G>m.nlen+m.ndist){S.msg="invalid bit length repeat",m.mode=30;break}for(;G--;)m.lens[m.have++]=d}}if(m.mode===30)break;if(m.lens[256]===0){S.msg="invalid code -- missing end-of-block",m.mode=30;break}if(m.lenbits=9,D={bits:m.lenbits},M=c(h,m.lens,0,m.nlen,m.lencode,0,m.work,D),m.lenbits=D.bits,M){S.msg="invalid literal/lengths set",m.mode=30;break}if(m.distbits=6,m.distcode=m.distdyn,D={bits:m.distbits},M=c(u,m.lens,m.nlen,m.ndist,m.distcode,0,m.work,D),m.distbits=D.bits,M){S.msg="invalid distances set",m.mode=30;break}if(m.mode=20,F===6)break e;case 20:m.mode=21;case 21:if(6<=$&&258<=ee){S.next_out=X,S.avail_out=ee,S.next_in=j,S.avail_in=$,m.hold=O,m.bits=P,l(S,K),X=S.next_out,oe=S.output,ee=S.avail_out,j=S.next_in,U=S.input,$=S.avail_in,O=m.hold,P=m.bits,m.mode===12&&(m.back=-1);break}for(m.back=0;pe=(E=m.lencode[O&(1<<m.lenbits)-1])>>>16&255,Te=65535&E,!((le=E>>>24)<=P);){if($===0)break e;$--,O+=U[j++]<<P,P+=8}if(pe&&!(240&pe)){for(Ee=le,Je=pe,ze=Te;pe=(E=m.lencode[ze+((O&(1<<Ee+Je)-1)>>Ee)])>>>16&255,Te=65535&E,!(Ee+(le=E>>>24)<=P);){if($===0)break e;$--,O+=U[j++]<<P,P+=8}O>>>=Ee,P-=Ee,m.back+=Ee}if(O>>>=le,P-=le,m.back+=le,m.length=Te,pe===0){m.mode=26;break}if(32&pe){m.back=-1,m.mode=12;break}if(64&pe){S.msg="invalid literal/length code",m.mode=30;break}m.extra=15&pe,m.mode=22;case 22:if(m.extra){for(I=m.extra;P<I;){if($===0)break e;$--,O+=U[j++]<<P,P+=8}m.length+=O&(1<<m.extra)-1,O>>>=m.extra,P-=m.extra,m.back+=m.extra}m.was=m.length,m.mode=23;case 23:for(;pe=(E=m.distcode[O&(1<<m.distbits)-1])>>>16&255,Te=65535&E,!((le=E>>>24)<=P);){if($===0)break e;$--,O+=U[j++]<<P,P+=8}if(!(240&pe)){for(Ee=le,Je=pe,ze=Te;pe=(E=m.distcode[ze+((O&(1<<Ee+Je)-1)>>Ee)])>>>16&255,Te=65535&E,!(Ee+(le=E>>>24)<=P);){if($===0)break e;$--,O+=U[j++]<<P,P+=8}O>>>=Ee,P-=Ee,m.back+=Ee}if(O>>>=le,P-=le,m.back+=le,64&pe){S.msg="invalid distance code",m.mode=30;break}m.offset=Te,m.extra=15&pe,m.mode=24;case 24:if(m.extra){for(I=m.extra;P<I;){if($===0)break e;$--,O+=U[j++]<<P,P+=8}m.offset+=O&(1<<m.extra)-1,O>>>=m.extra,P-=m.extra,m.back+=m.extra}if(m.offset>m.dmax){S.msg="invalid distance too far back",m.mode=30;break}m.mode=25;case 25:if(ee===0)break e;if(G=K-ee,m.offset>G){if((G=m.offset-G)>m.whave&&m.sane){S.msg="invalid distance too far back",m.mode=30;break}we=G>m.wnext?(G-=m.wnext,m.wsize-G):m.wnext-G,G>m.length&&(G=m.length),Re=m.window}else Re=oe,we=X-m.offset,G=m.length;for(ee<G&&(G=ee),ee-=G,m.length-=G;oe[X++]=Re[we++],--G;);m.length===0&&(m.mode=21);break;case 26:if(ee===0)break e;oe[X++]=m.length,ee--,m.mode=21;break;case 27:if(m.wrap){for(;P<32;){if($===0)break e;$--,O|=U[j++]<<P,P+=8}if(K-=ee,S.total_out+=K,m.total+=K,K&&(S.adler=m.check=m.flags?a(m.check,oe,K,X-K):o(m.check,oe,K,X-K)),K=ee,(m.flags?O:v(O))!==m.check){S.msg="incorrect data check",m.mode=30;break}P=O=0}m.mode=28;case 28:if(m.wrap&&m.flags){for(;P<32;){if($===0)break e;$--,O+=U[j++]<<P,P+=8}if(O!==(4294967295&m.total)){S.msg="incorrect length check",m.mode=30;break}P=O=0}m.mode=29;case 29:M=1;break e;case 30:M=-3;break e;case 31:return-4;case 32:default:return f}return S.next_out=X,S.avail_out=ee,S.next_in=j,S.avail_in=$,m.hold=O,m.bits=P,(m.wsize||K!==S.avail_out&&m.mode<30&&(m.mode<27||F!==4))&&Z(S,S.output,S.next_out,K-S.avail_out)?(m.mode=31,-4):(te-=S.avail_in,K-=S.avail_out,S.total_in+=te,S.total_out+=K,m.total+=K,m.wrap&&K&&(S.adler=m.check=m.flags?a(m.check,oe,K,S.next_out-K):o(m.check,oe,K,S.next_out-K)),S.data_type=m.bits+(m.last?64:0)+(m.mode===12?128:0)+(m.mode===20||m.mode===15?256:0),(te==0&&K===0||F===4)&&M===p&&(M=-5),M)},s.inflateEnd=function(S){if(!S||!S.state)return f;var F=S.state;return F.window&&(F.window=null),S.state=null,p},s.inflateGetHeader=function(S,F){var m;return S&&S.state&&2&(m=S.state).wrap?((m.head=F).done=!1,p):f},s.inflateSetDictionary=function(S,F){var m,U=F.length;return S&&S.state?(m=S.state).wrap!==0&&m.mode!==11?f:m.mode===11&&o(1,F,U,0)!==m.check?-3:Z(S,F,U,U)?(m.mode=31,-4):(m.havedict=1,p):f},s.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(t,i,s){var r=t("../utils/common"),o=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],a=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],l=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],c=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];i.exports=function(h,u,p,f,w,g,y,v){var _,b,C,k,T,x,L,A,B,Z=v.bits,S=0,F=0,m=0,U=0,oe=0,j=0,X=0,$=0,ee=0,O=0,P=null,te=0,K=new r.Buf16(16),G=new r.Buf16(16),we=null,Re=0;for(S=0;S<=15;S++)K[S]=0;for(F=0;F<f;F++)K[u[p+F]]++;for(oe=Z,U=15;1<=U&&K[U]===0;U--);if(U<oe&&(oe=U),U===0)return w[g++]=20971520,w[g++]=20971520,v.bits=1,0;for(m=1;m<U&&K[m]===0;m++);for(oe<m&&(oe=m),S=$=1;S<=15;S++)if($<<=1,($-=K[S])<0)return-1;if(0<$&&(h===0||U!==1))return-1;for(G[1]=0,S=1;S<15;S++)G[S+1]=G[S]+K[S];for(F=0;F<f;F++)u[p+F]!==0&&(y[G[u[p+F]]++]=F);if(x=h===0?(P=we=y,19):h===1?(P=o,te-=257,we=a,Re-=257,256):(P=l,we=c,-1),S=m,T=g,X=F=O=0,C=-1,k=(ee=1<<(j=oe))-1,h===1&&852<ee||h===2&&592<ee)return 1;for(;;){for(L=S-X,B=y[F]<x?(A=0,y[F]):y[F]>x?(A=we[Re+y[F]],P[te+y[F]]):(A=96,0),_=1<<S-X,m=b=1<<j;w[T+(O>>X)+(b-=_)]=L<<24|A<<16|B|0,b!==0;);for(_=1<<S-1;O&_;)_>>=1;if(_!==0?(O&=_-1,O+=_):O=0,F++,--K[S]==0){if(S===U)break;S=u[p+y[F]]}if(oe<S&&(O&k)!==C){for(X===0&&(X=oe),T+=m,$=1<<(j=S-X);j+X<U&&!(($-=K[j+X])<=0);)j++,$<<=1;if(ee+=1<<j,h===1&&852<ee||h===2&&592<ee)return 1;w[C=O&k]=oe<<24|j<<16|T-g|0}}return O!==0&&(w[T+O]=S-X<<24|64<<16|0),v.bits=oe,0}},{"../utils/common":41}],51:[function(t,i,s){i.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(t,i,s){var r=t("../utils/common"),o=0,a=1;function l(E){for(var R=E.length;0<=--R;)E[R]=0}var c=0,h=29,u=256,p=u+1+h,f=30,w=19,g=2*p+1,y=15,v=16,_=7,b=256,C=16,k=17,T=18,x=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],L=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],A=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],B=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],Z=new Array(2*(p+2));l(Z);var S=new Array(2*f);l(S);var F=new Array(512);l(F);var m=new Array(256);l(m);var U=new Array(h);l(U);var oe,j,X,$=new Array(f);function ee(E,R,z,W,N){this.static_tree=E,this.extra_bits=R,this.extra_base=z,this.elems=W,this.max_length=N,this.has_stree=E&&E.length}function O(E,R){this.dyn_tree=E,this.max_code=0,this.stat_desc=R}function P(E){return E<256?F[E]:F[256+(E>>>7)]}function te(E,R){E.pending_buf[E.pending++]=255&R,E.pending_buf[E.pending++]=R>>>8&255}function K(E,R,z){E.bi_valid>v-z?(E.bi_buf|=R<<E.bi_valid&65535,te(E,E.bi_buf),E.bi_buf=R>>v-E.bi_valid,E.bi_valid+=z-v):(E.bi_buf|=R<<E.bi_valid&65535,E.bi_valid+=z)}function G(E,R,z){K(E,z[2*R],z[2*R+1])}function we(E,R){for(var z=0;z|=1&E,E>>>=1,z<<=1,0<--R;);return z>>>1}function Re(E,R,z){var W,N,V=new Array(y+1),J=0;for(W=1;W<=y;W++)V[W]=J=J+z[W-1]<<1;for(N=0;N<=R;N++){var q=E[2*N+1];q!==0&&(E[2*N]=we(V[q]++,q))}}function le(E){var R;for(R=0;R<p;R++)E.dyn_ltree[2*R]=0;for(R=0;R<f;R++)E.dyn_dtree[2*R]=0;for(R=0;R<w;R++)E.bl_tree[2*R]=0;E.dyn_ltree[2*b]=1,E.opt_len=E.static_len=0,E.last_lit=E.matches=0}function pe(E){8<E.bi_valid?te(E,E.bi_buf):0<E.bi_valid&&(E.pending_buf[E.pending++]=E.bi_buf),E.bi_buf=0,E.bi_valid=0}function Te(E,R,z,W){var N=2*R,V=2*z;return E[N]<E[V]||E[N]===E[V]&&W[R]<=W[z]}function Ee(E,R,z){for(var W=E.heap[z],N=z<<1;N<=E.heap_len&&(N<E.heap_len&&Te(R,E.heap[N+1],E.heap[N],E.depth)&&N++,!Te(R,W,E.heap[N],E.depth));)E.heap[z]=E.heap[N],z=N,N<<=1;E.heap[z]=W}function Je(E,R,z){var W,N,V,J,q=0;if(E.last_lit!==0)for(;W=E.pending_buf[E.d_buf+2*q]<<8|E.pending_buf[E.d_buf+2*q+1],N=E.pending_buf[E.l_buf+q],q++,W===0?G(E,N,R):(G(E,(V=m[N])+u+1,R),(J=x[V])!==0&&K(E,N-=U[V],J),G(E,V=P(--W),z),(J=L[V])!==0&&K(E,W-=$[V],J)),q<E.last_lit;);G(E,b,R)}function ze(E,R){var z,W,N,V=R.dyn_tree,J=R.stat_desc.static_tree,q=R.stat_desc.has_stree,ne=R.stat_desc.elems,Ie=-1;for(E.heap_len=0,E.heap_max=g,z=0;z<ne;z++)V[2*z]!==0?(E.heap[++E.heap_len]=Ie=z,E.depth[z]=0):V[2*z+1]=0;for(;E.heap_len<2;)V[2*(N=E.heap[++E.heap_len]=Ie<2?++Ie:0)]=1,E.depth[N]=0,E.opt_len--,q&&(E.static_len-=J[2*N+1]);for(R.max_code=Ie,z=E.heap_len>>1;1<=z;z--)Ee(E,V,z);for(N=ne;z=E.heap[1],E.heap[1]=E.heap[E.heap_len--],Ee(E,V,1),W=E.heap[1],E.heap[--E.heap_max]=z,E.heap[--E.heap_max]=W,V[2*N]=V[2*z]+V[2*W],E.depth[N]=(E.depth[z]>=E.depth[W]?E.depth[z]:E.depth[W])+1,V[2*z+1]=V[2*W+1]=N,E.heap[1]=N++,Ee(E,V,1),2<=E.heap_len;);E.heap[--E.heap_max]=E.heap[1],function(fe,Qe){var li,ut,ci,xe,es,vr,bt=Qe.dyn_tree,Ia=Qe.max_code,Pd=Qe.stat_desc.static_tree,Nd=Qe.stat_desc.has_stree,Od=Qe.stat_desc.extra_bits,Ca=Qe.stat_desc.extra_base,ui=Qe.stat_desc.max_length,ts=0;for(xe=0;xe<=y;xe++)fe.bl_count[xe]=0;for(bt[2*fe.heap[fe.heap_max]+1]=0,li=fe.heap_max+1;li<g;li++)ui<(xe=bt[2*bt[2*(ut=fe.heap[li])+1]+1]+1)&&(xe=ui,ts++),bt[2*ut+1]=xe,Ia<ut||(fe.bl_count[xe]++,es=0,Ca<=ut&&(es=Od[ut-Ca]),vr=bt[2*ut],fe.opt_len+=vr*(xe+es),Nd&&(fe.static_len+=vr*(Pd[2*ut+1]+es)));if(ts!==0){do{for(xe=ui-1;fe.bl_count[xe]===0;)xe--;fe.bl_count[xe]--,fe.bl_count[xe+1]+=2,fe.bl_count[ui]--,ts-=2}while(0<ts);for(xe=ui;xe!==0;xe--)for(ut=fe.bl_count[xe];ut!==0;)Ia<(ci=fe.heap[--li])||(bt[2*ci+1]!==xe&&(fe.opt_len+=(xe-bt[2*ci+1])*bt[2*ci],bt[2*ci+1]=xe),ut--)}}(E,R),Re(V,Ie,E.bl_count)}function d(E,R,z){var W,N,V=-1,J=R[1],q=0,ne=7,Ie=4;for(J===0&&(ne=138,Ie=3),R[2*(z+1)+1]=65535,W=0;W<=z;W++)N=J,J=R[2*(W+1)+1],++q<ne&&N===J||(q<Ie?E.bl_tree[2*N]+=q:N!==0?(N!==V&&E.bl_tree[2*N]++,E.bl_tree[2*C]++):q<=10?E.bl_tree[2*k]++:E.bl_tree[2*T]++,V=N,Ie=(q=0)===J?(ne=138,3):N===J?(ne=6,3):(ne=7,4))}function M(E,R,z){var W,N,V=-1,J=R[1],q=0,ne=7,Ie=4;for(J===0&&(ne=138,Ie=3),W=0;W<=z;W++)if(N=J,J=R[2*(W+1)+1],!(++q<ne&&N===J)){if(q<Ie)for(;G(E,N,E.bl_tree),--q!=0;);else N!==0?(N!==V&&(G(E,N,E.bl_tree),q--),G(E,C,E.bl_tree),K(E,q-3,2)):q<=10?(G(E,k,E.bl_tree),K(E,q-3,3)):(G(E,T,E.bl_tree),K(E,q-11,7));V=N,Ie=(q=0)===J?(ne=138,3):N===J?(ne=6,3):(ne=7,4)}}l($);var D=!1;function I(E,R,z,W){K(E,(c<<1)+(W?1:0),3),function(N,V,J,q){pe(N),te(N,J),te(N,~J),r.arraySet(N.pending_buf,N.window,V,J,N.pending),N.pending+=J}(E,R,z)}s._tr_init=function(E){D||(function(){var R,z,W,N,V,J=new Array(y+1);for(N=W=0;N<h-1;N++)for(U[N]=W,R=0;R<1<<x[N];R++)m[W++]=N;for(m[W-1]=N,N=V=0;N<16;N++)for($[N]=V,R=0;R<1<<L[N];R++)F[V++]=N;for(V>>=7;N<f;N++)for($[N]=V<<7,R=0;R<1<<L[N]-7;R++)F[256+V++]=N;for(z=0;z<=y;z++)J[z]=0;for(R=0;R<=143;)Z[2*R+1]=8,R++,J[8]++;for(;R<=255;)Z[2*R+1]=9,R++,J[9]++;for(;R<=279;)Z[2*R+1]=7,R++,J[7]++;for(;R<=287;)Z[2*R+1]=8,R++,J[8]++;for(Re(Z,p+1,J),R=0;R<f;R++)S[2*R+1]=5,S[2*R]=we(R,5);oe=new ee(Z,x,u+1,p,y),j=new ee(S,L,0,f,y),X=new ee(new Array(0),A,0,w,_)}(),D=!0),E.l_desc=new O(E.dyn_ltree,oe),E.d_desc=new O(E.dyn_dtree,j),E.bl_desc=new O(E.bl_tree,X),E.bi_buf=0,E.bi_valid=0,le(E)},s._tr_stored_block=I,s._tr_flush_block=function(E,R,z,W){var N,V,J=0;0<E.level?(E.strm.data_type===2&&(E.strm.data_type=function(q){var ne,Ie=4093624447;for(ne=0;ne<=31;ne++,Ie>>>=1)if(1&Ie&&q.dyn_ltree[2*ne]!==0)return o;if(q.dyn_ltree[18]!==0||q.dyn_ltree[20]!==0||q.dyn_ltree[26]!==0)return a;for(ne=32;ne<u;ne++)if(q.dyn_ltree[2*ne]!==0)return a;return o}(E)),ze(E,E.l_desc),ze(E,E.d_desc),J=function(q){var ne;for(d(q,q.dyn_ltree,q.l_desc.max_code),d(q,q.dyn_dtree,q.d_desc.max_code),ze(q,q.bl_desc),ne=w-1;3<=ne&&q.bl_tree[2*B[ne]+1]===0;ne--);return q.opt_len+=3*(ne+1)+5+5+4,ne}(E),N=E.opt_len+3+7>>>3,(V=E.static_len+3+7>>>3)<=N&&(N=V)):N=V=z+5,z+4<=N&&R!==-1?I(E,R,z,W):E.strategy===4||V===N?(K(E,2+(W?1:0),3),Je(E,Z,S)):(K(E,4+(W?1:0),3),function(q,ne,Ie,fe){var Qe;for(K(q,ne-257,5),K(q,Ie-1,5),K(q,fe-4,4),Qe=0;Qe<fe;Qe++)K(q,q.bl_tree[2*B[Qe]+1],3);M(q,q.dyn_ltree,ne-1),M(q,q.dyn_dtree,Ie-1)}(E,E.l_desc.max_code+1,E.d_desc.max_code+1,J+1),Je(E,E.dyn_ltree,E.dyn_dtree)),le(E),W&&pe(E)},s._tr_tally=function(E,R,z){return E.pending_buf[E.d_buf+2*E.last_lit]=R>>>8&255,E.pending_buf[E.d_buf+2*E.last_lit+1]=255&R,E.pending_buf[E.l_buf+E.last_lit]=255&z,E.last_lit++,R===0?E.dyn_ltree[2*z]++:(E.matches++,R--,E.dyn_ltree[2*(m[z]+u+1)]++,E.dyn_dtree[2*P(R)]++),E.last_lit===E.lit_bufsize-1},s._tr_align=function(E){K(E,2,3),G(E,b,Z),function(R){R.bi_valid===16?(te(R,R.bi_buf),R.bi_buf=0,R.bi_valid=0):8<=R.bi_valid&&(R.pending_buf[R.pending++]=255&R.bi_buf,R.bi_buf>>=8,R.bi_valid-=8)}(E)}},{"../utils/common":41}],53:[function(t,i,s){i.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(t,i,s){(function(r){(function(o,a){if(!o.setImmediate){var l,c,h,u,p=1,f={},w=!1,g=o.document,y=Object.getPrototypeOf&&Object.getPrototypeOf(o);y=y&&y.setTimeout?y:o,l={}.toString.call(o.process)==="[object process]"?function(C){process.nextTick(function(){_(C)})}:function(){if(o.postMessage&&!o.importScripts){var C=!0,k=o.onmessage;return o.onmessage=function(){C=!1},o.postMessage("","*"),o.onmessage=k,C}}()?(u="setImmediate$"+Math.random()+"$",o.addEventListener?o.addEventListener("message",b,!1):o.attachEvent("onmessage",b),function(C){o.postMessage(u+C,"*")}):o.MessageChannel?((h=new MessageChannel).port1.onmessage=function(C){_(C.data)},function(C){h.port2.postMessage(C)}):g&&"onreadystatechange"in g.createElement("script")?(c=g.documentElement,function(C){var k=g.createElement("script");k.onreadystatechange=function(){_(C),k.onreadystatechange=null,c.removeChild(k),k=null},c.appendChild(k)}):function(C){setTimeout(_,0,C)},y.setImmediate=function(C){typeof C!="function"&&(C=new Function(""+C));for(var k=new Array(arguments.length-1),T=0;T<k.length;T++)k[T]=arguments[T+1];var x={callback:C,args:k};return f[p]=x,l(p),p++},y.clearImmediate=v}function v(C){delete f[C]}function _(C){if(w)setTimeout(_,0,C);else{var k=f[C];if(k){w=!0;try{(function(T){var x=T.callback,L=T.args;switch(L.length){case 0:x();break;case 1:x(L[0]);break;case 2:x(L[0],L[1]);break;case 3:x(L[0],L[1],L[2]);break;default:x.apply(a,L)}})(k)}finally{v(C),w=!1}}}}function b(C){C.source===o&&typeof C.data=="string"&&C.data.indexOf(u)===0&&_(+C.data.slice(u.length))}})(typeof self>"u"?r===void 0?this:r:self)}).call(this,typeof Rn<"u"?Rn:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})})(_c);var gf=_c.exports;const _f=gc(gf);function bo(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(n);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(n,i[s])&&(t[i[s]]=n[i[s]]);return t}function vc(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const vf=vc,yc=new $i("auth","Firebase",vc());/**
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
 */const Ts=new _o("@firebase/auth");function yf(n,...e){Ts.logLevel<=ve.WARN&&Ts.warn(`Auth (${Jn}): ${n}`,...e)}function fs(n,...e){Ts.logLevel<=ve.ERROR&&Ts.error(`Auth (${Jn}): ${n}`,...e)}/**
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
 */function _t(n,...e){throw Eo(n,...e)}function lt(n,...e){return Eo(n,...e)}function wo(n,e,t){const i=Object.assign(Object.assign({},vf()),{[e]:t});return new $i("auth","Firebase",i).create(e,{appName:n.name})}function qt(n){return wo(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function bc(n,e,t){const i=t;if(!(e instanceof i))throw i.name!==e.constructor.name&&_t(n,"argument-error"),wo(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Eo(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return yc.create(n,...e)}function re(n,e,...t){if(!n)throw Eo(e,...t)}function Et(n){const e="INTERNAL ASSERTION FAILED: "+n;throw fs(e),new Error(e)}function At(n,e){n||Et(e)}/**
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
 */function jr(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function bf(){return La()==="http:"||La()==="https:"}function La(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function wf(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(bf()||Vd()||"connection"in navigator)?navigator.onLine:!0}function Ef(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Wi{constructor(e,t){this.shortDelay=e,this.longDelay=t,At(t>e,"Short delay should be less than long delay!"),this.isMobile=go()||lc()}get(){return wf()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Io(n,e){At(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class wc{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Et("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Et("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Et("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const If={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Cf=new Wi(3e4,6e4);function Co(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Qn(n,e,t,i,s={}){return Ec(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=Zn(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const c=Object.assign({method:e,headers:l},r);return Hd()||(c.referrerPolicy="no-referrer"),wc.fetch()(Ic(n,n.config.apiHost,t,a),c)})}async function Ec(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},If),e);try{const s=new Sf(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw is(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw is(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw is(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw is(n,"user-disabled",o);const h=i[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw wo(n,h,c);_t(n,h)}}catch(s){if(s instanceof nn)throw s;_t(n,"network-request-failed",{message:String(s)})}}async function kf(n,e,t,i,s={}){const r=await Qn(n,e,t,i,s);return"mfaPendingCredential"in r&&_t(n,"multi-factor-auth-required",{_serverResponse:r}),r}function Ic(n,e,t,i){const s=`${e}${t}?${i}`;return n.config.emulator?Io(n.config,s):`${n.config.apiScheme}://${s}`}class Sf{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(lt(this.auth,"network-request-failed")),Cf.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function is(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=lt(n,e,i);return s.customData._tokenResponse=t,s}/**
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
 */async function Tf(n,e){return Qn(n,"POST","/v1/accounts:delete",e)}async function Cc(n,e){return Qn(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function _i(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Af(n,e=!1){const t=Ue(n),i=await t.getIdToken(e),s=ko(i);re(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:s,token:i,authTime:_i(Cr(s.auth_time)),issuedAtTime:_i(Cr(s.iat)),expirationTime:_i(Cr(s.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function Cr(n){return Number(n)*1e3}function ko(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return fs("JWT malformed, contained fewer than 3 sections"),null;try{const s=Es(t);return s?JSON.parse(s):(fs("Failed to decode base64 JWT payload"),null)}catch(s){return fs("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Fa(n){const e=ko(n);return re(e,"internal-error"),re(typeof e.exp<"u","internal-error"),re(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Oi(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof nn&&Rf(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function Rf({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class xf{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Hr{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=_i(this.lastLoginAt),this.creationTime=_i(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function As(n){var e;const t=n.auth,i=await n.getIdToken(),s=await Oi(n,Cc(t,{idToken:i}));re(s==null?void 0:s.users.length,t,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?kc(r.providerUserInfo):[],a=Nf(n.providerData,o),l=n.isAnonymous,c=!(n.email&&r.passwordHash)&&!(a!=null&&a.length),h=l?c:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new Hr(r.createdAt,r.lastLoginAt),isAnonymous:h};Object.assign(n,u)}async function Pf(n){const e=Ue(n);await As(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Nf(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function kc(n){return n.map(e=>{var{providerId:t}=e,i=bo(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
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
 */async function Of(n,e){const t=await Ec(n,{},async()=>{const i=Zn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=Ic(n,s,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",wc.fetch()(o,{method:"POST",headers:a,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Df(n,e){return Qn(n,"POST","/v2/accounts:revokeToken",Co(n,e))}/**
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
 */class Pn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){re(e.idToken,"internal-error"),re(typeof e.idToken<"u","internal-error"),re(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Fa(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){re(e.length!==0,"internal-error");const t=Fa(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(re(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await Of(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new Pn;return i&&(re(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(re(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(re(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Pn,this.toJSON())}_performRefresh(){return Et("not implemented")}}/**
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
 */function Dt(n,e){re(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class It{constructor(e){var{uid:t,auth:i,stsTokenManager:s}=e,r=bo(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new xf(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Hr(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await Oi(this,this.stsTokenManager.getToken(this.auth,e));return re(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Af(this,e)}reload(){return Pf(this)}_assign(e){this!==e&&(re(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new It(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){re(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await As(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(pt(this.auth.app))return Promise.reject(qt(this.auth));const e=await this.getIdToken();return await Oi(this,Tf(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,s,r,o,a,l,c,h;const u=(i=t.displayName)!==null&&i!==void 0?i:void 0,p=(s=t.email)!==null&&s!==void 0?s:void 0,f=(r=t.phoneNumber)!==null&&r!==void 0?r:void 0,w=(o=t.photoURL)!==null&&o!==void 0?o:void 0,g=(a=t.tenantId)!==null&&a!==void 0?a:void 0,y=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,v=(c=t.createdAt)!==null&&c!==void 0?c:void 0,_=(h=t.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:b,emailVerified:C,isAnonymous:k,providerData:T,stsTokenManager:x}=t;re(b&&x,e,"internal-error");const L=Pn.fromJSON(this.name,x);re(typeof b=="string",e,"internal-error"),Dt(u,e.name),Dt(p,e.name),re(typeof C=="boolean",e,"internal-error"),re(typeof k=="boolean",e,"internal-error"),Dt(f,e.name),Dt(w,e.name),Dt(g,e.name),Dt(y,e.name),Dt(v,e.name),Dt(_,e.name);const A=new It({uid:b,auth:e,email:p,emailVerified:C,displayName:u,isAnonymous:k,photoURL:w,phoneNumber:f,tenantId:g,stsTokenManager:L,createdAt:v,lastLoginAt:_});return T&&Array.isArray(T)&&(A.providerData=T.map(B=>Object.assign({},B))),y&&(A._redirectEventId=y),A}static async _fromIdTokenResponse(e,t,i=!1){const s=new Pn;s.updateFromServerResponse(t);const r=new It({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await As(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];re(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?kc(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(r!=null&&r.length),a=new Pn;a.updateFromIdToken(i);const l=new It({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Hr(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(r!=null&&r.length)};return Object.assign(l,c),l}}/**
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
 */const Ma=new Map;function Ct(n){At(n instanceof Function,"Expected a class definition");let e=Ma.get(n);return e?(At(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ma.set(n,e),e)}/**
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
 */class Sc{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Sc.type="NONE";const Ua=Sc;/**
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
 */function ps(n,e,t){return`firebase:${n}:${e}:${t}`}class Nn{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=ps(this.userKey,s.apiKey,r),this.fullPersistenceKey=ps("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?It._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Nn(Ct(Ua),e,i);const s=(await Promise.all(t.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=s[0]||Ct(Ua);const o=ps(i,e.config.apiKey,e.name);let a=null;for(const c of t)try{const h=await c._get(o);if(h){const u=It._fromJSON(e,h);c!==r&&(a=u),r=c;break}}catch{}const l=s.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!l.length?new Nn(r,e,i):(r=l[0],a&&await r._set(o,a.toJSON()),await Promise.all(t.map(async c=>{if(c!==r)try{await c._remove(o)}catch{}})),new Nn(r,e,i))}}/**
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
 */function Ba(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(xc(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Tc(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Nc(e))return"Blackberry";if(Oc(e))return"Webos";if(Ac(e))return"Safari";if((e.includes("chrome/")||Rc(e))&&!e.includes("edge/"))return"Chrome";if(Pc(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function Tc(n=je()){return/firefox\//i.test(n)}function Ac(n=je()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Rc(n=je()){return/crios\//i.test(n)}function xc(n=je()){return/iemobile/i.test(n)}function Pc(n=je()){return/android/i.test(n)}function Nc(n=je()){return/blackberry/i.test(n)}function Oc(n=je()){return/webos/i.test(n)}function So(n=je()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Lf(n=je()){var e;return So(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Ff(){return Gd()&&document.documentMode===10}function Dc(n=je()){return So(n)||Pc(n)||Oc(n)||Nc(n)||/windows phone/i.test(n)||xc(n)}/**
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
 */function Lc(n,e=[]){let t;switch(n){case"Browser":t=Ba(je());break;case"Worker":t=`${Ba(je())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Jn}/${i}`}/**
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
 */class Mf{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,a)=>{try{const l=e(r);o(l)}catch(l){a(l)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
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
 */async function Uf(n,e={}){return Qn(n,"GET","/v2/passwordPolicy",Co(n,e))}/**
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
 */const Bf=6;class zf{constructor(e){var t,i,s,r;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:Bf,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(r=e.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,s,r,o,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(i=l.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(r=l.containsUppercaseLetter)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
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
 */class $f{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new za(this),this.idTokenSubscription=new za(this),this.beforeStateQueue=new Mf(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=yc,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ct(t)),this._initializationPromise=this.queue(async()=>{var i,s;if(!this._deleted&&(this.persistenceManager=await Nn.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Cc(this,{idToken:e}),i=await It._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(pt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let s=i,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(s=l.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return re(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await As(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Ef()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(pt(this.app))return Promise.reject(qt(this));const t=e?Ue(e):null;return t&&re(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&re(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return pt(this.app)?Promise.reject(qt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return pt(this.app)?Promise.reject(qt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ct(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Uf(this),t=new zf(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new $i("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Df(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ct(e)||this._popupRedirectResolver;re(t,this,"argument-error"),this.redirectPersistenceManager=await Nn.create(this,[Ct(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(re(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,i,s);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return re(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Lc(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&yf(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function vn(n){return Ue(n)}class za{constructor(e){this.auth=e,this.observer=null,this.addObserver=nh(t=>this.observer=t)}get next(){return re(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let To={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Wf(n){To=n}function jf(n){return To.loadJS(n)}function Hf(){return To.gapiScript}function Vf(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function Gf(n,e){const t=yo(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(ks(r,e??{}))return s;_t(s,"already-initialized")}return t.initialize({options:e})}function qf(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(Ct);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function Kf(n,e,t){const i=vn(n);re(i._canInitEmulator,i,"emulator-config-failed"),re(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=Fc(e),{host:o,port:a}=Yf(e),l=a===null?"":`:${a}`;i.config.emulator={url:`${r}//${o}${l}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})}),Zf()}function Fc(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Yf(n){const e=Fc(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:$a(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:$a(o)}}}function $a(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Zf(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Mc{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Et("not implemented")}_getIdTokenResponse(e){return Et("not implemented")}_linkToIdToken(e,t){return Et("not implemented")}_getReauthenticationResolver(e){return Et("not implemented")}}/**
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
 */async function On(n,e){return kf(n,"POST","/v1/accounts:signInWithIdp",Co(n,e))}/**
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
 */const Jf="http://localhost";class fn extends Mc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new fn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):_t("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s}=t,r=bo(t,["providerId","signInMethod"]);if(!i||!s)return null;const o=new fn(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return On(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,On(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,On(e,t)}buildRequest(){const e={requestUri:Jf,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Zn(t)}return e}}/**
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
 */class Js{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ji extends Js{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Bt extends ji{constructor(){super("facebook.com")}static credential(e){return fn._fromParams({providerId:Bt.PROVIDER_ID,signInMethod:Bt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Bt.credentialFromTaggedObject(e)}static credentialFromError(e){return Bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Bt.credential(e.oauthAccessToken)}catch{return null}}}Bt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Bt.PROVIDER_ID="facebook.com";/**
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
 */class ht extends ji{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return fn._fromParams({providerId:ht.PROVIDER_ID,signInMethod:ht.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ht.credentialFromTaggedObject(e)}static credentialFromError(e){return ht.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return ht.credential(t,i)}catch{return null}}}ht.GOOGLE_SIGN_IN_METHOD="google.com";ht.PROVIDER_ID="google.com";/**
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
 */class zt extends ji{constructor(){super("github.com")}static credential(e){return fn._fromParams({providerId:zt.PROVIDER_ID,signInMethod:zt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return zt.credentialFromTaggedObject(e)}static credentialFromError(e){return zt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return zt.credential(e.oauthAccessToken)}catch{return null}}}zt.GITHUB_SIGN_IN_METHOD="github.com";zt.PROVIDER_ID="github.com";/**
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
 */class $t extends ji{constructor(){super("twitter.com")}static credential(e,t){return fn._fromParams({providerId:$t.PROVIDER_ID,signInMethod:$t.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return $t.credentialFromTaggedObject(e)}static credentialFromError(e){return $t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return $t.credential(t,i)}catch{return null}}}$t.TWITTER_SIGN_IN_METHOD="twitter.com";$t.PROVIDER_ID="twitter.com";/**
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
 */class Bn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await It._fromIdTokenResponse(e,i,s),o=Wa(i);return new Bn({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=Wa(i);return new Bn({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function Wa(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Rs extends nn{constructor(e,t,i,s){var r;super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,Rs.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new Rs(e,t,i,s)}}function Uc(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Rs._fromErrorAndOperation(n,r,e,i):r})}async function Qf(n,e,t=!1){const i=await Oi(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Bn._forOperation(n,"link",i)}/**
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
 */async function Xf(n,e,t=!1){const{auth:i}=n;if(pt(i.app))return Promise.reject(qt(i));const s="reauthenticate";try{const r=await Oi(n,Uc(i,s,e,n),t);re(r.idToken,i,"internal-error");const o=ko(r.idToken);re(o,i,"internal-error");const{sub:a}=o;return re(n.uid===a,i,"user-mismatch"),Bn._forOperation(n,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&_t(i,"user-mismatch"),r}}/**
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
 */async function Bc(n,e,t=!1){if(pt(n.app))return Promise.reject(qt(n));const i="signIn",s=await Uc(n,i,e),r=await Bn._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}async function ep(n,e){return Bc(vn(n),e)}/**
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
 */function ss(n,e){return Ue(n).setPersistence(e)}function tp(n,e,t,i){return Ue(n).onIdTokenChanged(e,t,i)}function np(n,e,t){return Ue(n).beforeAuthStateChanged(e,t)}function ip(n,e,t,i){return Ue(n).onAuthStateChanged(e,t,i)}function sp(n){return Ue(n).signOut()}const xs="__sak";/**
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
 */class zc{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(xs,"1"),this.storage.removeItem(xs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const rp=1e3,op=10;class $c extends zc{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Dc(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);Ff()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,op):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},rp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}$c.type="LOCAL";const mi=$c;/**
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
 */class Wc extends zc{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Wc.type="SESSION";const jc=Wc;/**
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
 */function ap(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Qs{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new Qs(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async c=>c(t.origin,r)),l=await ap(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Qs.receivers=[];/**
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
 */function Ao(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class lp{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,l)=>{const c=Ao("",20);s.port1.start();const h=setTimeout(()=>{l(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(u){const p=u;if(p.data.eventId===c)switch(p.data.status){case"ack":clearTimeout(h),r=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(p.data.response);break;default:clearTimeout(h),clearTimeout(r),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function gt(){return window}function cp(n){gt().location.href=n}/**
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
 */function Hc(){return typeof gt().WorkerGlobalScope<"u"&&typeof gt().importScripts=="function"}async function up(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function dp(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function hp(){return Hc()?self:null}/**
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
 */const Vc="firebaseLocalStorageDb",fp=1,Ps="firebaseLocalStorage",Gc="fbase_key";class Hi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Xs(n,e){return n.transaction([Ps],e?"readwrite":"readonly").objectStore(Ps)}function pp(){const n=indexedDB.deleteDatabase(Vc);return new Hi(n).toPromise()}function Vr(){const n=indexedDB.open(Vc,fp);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(Ps,{keyPath:Gc})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(Ps)?e(i):(i.close(),await pp(),e(await Vr()))})})}async function ja(n,e,t){const i=Xs(n,!0).put({[Gc]:e,value:t});return new Hi(i).toPromise()}async function mp(n,e){const t=Xs(n,!1).get(e),i=await new Hi(t).toPromise();return i===void 0?null:i.value}function Ha(n,e){const t=Xs(n,!0).delete(e);return new Hi(t).toPromise()}const gp=800,_p=3;class qc{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Vr(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>_p)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Hc()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Qs._getInstance(hp()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await up(),!this.activeServiceWorker)return;this.sender=new lp(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||dp()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Vr();return await ja(e,xs,"1"),await Ha(e,xs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>ja(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>mp(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ha(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=Xs(s,!1).getAll();return new Hi(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),gp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}qc.type="LOCAL";const vp=qc;new Wi(3e4,6e4);/**
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
 */function Ro(n,e){return e?Ct(e):(re(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class xo extends Mc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return On(e,this._buildIdpRequest())}_linkToIdToken(e,t){return On(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return On(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function yp(n){return Bc(n.auth,new xo(n),n.bypassAuthState)}function bp(n){const{auth:e,user:t}=n;return re(t,e,"internal-error"),Xf(t,new xo(n),n.bypassAuthState)}async function wp(n){const{auth:e,user:t}=n;return re(t,e,"internal-error"),Qf(t,new xo(n),n.bypassAuthState)}/**
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
 */class Kc{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return yp;case"linkViaPopup":case"linkViaRedirect":return wp;case"reauthViaPopup":case"reauthViaRedirect":return bp;default:_t(this.auth,"internal-error")}}resolve(e){At(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){At(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Ep=new Wi(2e3,1e4);async function Va(n,e,t){if(pt(n.app))return Promise.reject(lt(n,"operation-not-supported-in-this-environment"));const i=vn(n);bc(n,e,Js);const s=Ro(i,t);return new an(i,"signInViaPopup",e,s).executeNotNull()}class an extends Kc{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,an.currentPopupAction&&an.currentPopupAction.cancel(),an.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return re(e,this.auth,"internal-error"),e}async onExecution(){At(this.filter.length===1,"Popup operations only handle one event");const e=Ao();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(lt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(lt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,an.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(lt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Ep.get())};e()}}an.currentPopupAction=null;/**
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
 */const Ip="pendingRedirect",ms=new Map;class Cp extends Kc{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=ms.get(this.auth._key());if(!e){try{const i=await kp(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}ms.set(this.auth._key(),e)}return this.bypassAuthState||ms.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function kp(n,e){const t=Zc(e),i=Yc(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}async function Sp(n,e){return Yc(n)._set(Zc(e),"true")}function Tp(n,e){ms.set(n._key(),e)}function Yc(n){return Ct(n._redirectPersistence)}function Zc(n){return ps(Ip,n.config.apiKey,n.name)}/**
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
 */function Ga(n,e,t){return Ap(n,e,t)}async function Ap(n,e,t){if(pt(n.app))return Promise.reject(qt(n));const i=vn(n);bc(n,e,Js),await i._initializationPromise;const s=Ro(i,t);return await Sp(s,i),s._openRedirect(i,e,"signInViaRedirect")}async function Rp(n,e){return await vn(n)._initializationPromise,Jc(n,e,!1)}async function Jc(n,e,t=!1){if(pt(n.app))return Promise.reject(qt(n));const i=vn(n),s=Ro(i,e),o=await new Cp(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
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
 */const xp=10*60*1e3;class Pp{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Np(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!Qc(e)){const s=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(lt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=xp&&this.cachedEventUids.clear(),this.cachedEventUids.has(qa(e))}saveEventToCache(e){this.cachedEventUids.add(qa(e)),this.lastProcessedEventTime=Date.now()}}function qa(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Qc({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Np(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Qc(n);default:return!1}}/**
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
 */async function Op(n,e={}){return Qn(n,"GET","/v1/projects",e)}/**
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
 */const Dp=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Lp=/^https?/;async function Fp(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Op(n);for(const t of e)try{if(Mp(t))return}catch{}_t(n,"unauthorized-domain")}function Mp(n){const e=jr(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!Lp.test(t))return!1;if(Dp.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
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
 */const Up=new Wi(3e4,6e4);function Ka(){const n=gt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Bp(n){return new Promise((e,t)=>{var i,s,r;function o(){Ka(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ka(),t(lt(n,"network-request-failed"))},timeout:Up.get()})}if(!((s=(i=gt().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((r=gt().gapi)===null||r===void 0)&&r.load)o();else{const a=Vf("iframefcb");return gt()[a]=()=>{gapi.load?o():t(lt(n,"network-request-failed"))},jf(`${Hf()}?onload=${a}`).catch(l=>t(l))}}).catch(e=>{throw gs=null,e})}let gs=null;function zp(n){return gs=gs||Bp(n),gs}/**
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
 */const $p=new Wi(5e3,15e3),Wp="__/auth/iframe",jp="emulator/auth/iframe",Hp={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Vp=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Gp(n){const e=n.config;re(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Io(e,jp):`https://${n.config.authDomain}/${Wp}`,i={apiKey:e.apiKey,appName:n.name,v:Jn},s=Vp.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${Zn(i).slice(1)}`}async function qp(n){const e=await zp(n),t=gt().gapi;return re(t,n,"internal-error"),e.open({where:document.body,url:Gp(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Hp,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=lt(n,"network-request-failed"),a=gt().setTimeout(()=>{r(o)},$p.get());function l(){gt().clearTimeout(a),s(i)}i.ping(l).then(l,()=>{r(o)})}))}/**
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
 */const Kp={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Yp=500,Zp=600,Jp="_blank",Qp="http://localhost";class Ya{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Xp(n,e,t,i=Yp,s=Zp){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const l=Object.assign(Object.assign({},Kp),{width:i.toString(),height:s.toString(),top:r,left:o}),c=je().toLowerCase();t&&(a=Rc(c)?Jp:t),Tc(c)&&(e=e||Qp,l.scrollbars="yes");const h=Object.entries(l).reduce((p,[f,w])=>`${p}${f}=${w},`,"");if(Lf(c)&&a!=="_self")return em(e||"",a),new Ya(null);const u=window.open(e||"",a,h);re(u,n,"popup-blocked");try{u.focus()}catch{}return new Ya(u)}function em(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
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
 */const tm="__/auth/handler",nm="emulator/auth/handler",im=encodeURIComponent("fac");async function Za(n,e,t,i,s,r){re(n.config.authDomain,n,"auth-domain-config-required"),re(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:Jn,eventId:s};if(e instanceof Js){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Is(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,u]of Object.entries({}))o[h]=u}if(e instanceof ji){const h=e.getScopes().filter(u=>u!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const l=await n._getAppCheckToken(),c=l?`#${im}=${encodeURIComponent(l)}`:"";return`${sm(n)}?${Zn(a).slice(1)}${c}`}function sm({config:n}){return n.emulator?Io(n,nm):`https://${n.authDomain}/${tm}`}/**
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
 */const kr="webStorageSupport";class rm{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=jc,this._completeRedirectFn=Jc,this._overrideRedirectResult=Tp}async _openPopup(e,t,i,s){var r;At((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await Za(e,t,i,jr(),s);return Xp(e,o,Ao())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await Za(e,t,i,jr(),s);return cp(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(At(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await qp(e),i=new Pp(e);return t.register("authEvent",s=>(re(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(kr,{type:kr},s=>{var r;const o=(r=s==null?void 0:s[0])===null||r===void 0?void 0:r[kr];o!==void 0&&t(!!o),_t(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Fp(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Dc()||Ac()||So()}}const om=rm;var Ja="@firebase/auth",Qa="1.7.9";/**
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
 */class am{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){re(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function lm(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function cm(n){Un(new hn("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;re(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const l={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Lc(n)},c=new $f(i,s,r,l);return qf(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),Un(new hn("auth-internal",e=>{const t=vn(e.getProvider("auth").getImmediate());return(i=>new am(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Gt(Ja,Qa,lm(n)),Gt(Ja,Qa,"esm2017")}/**
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
 */const um=5*60,dm=ac("authIdTokenMaxAge")||um;let Xa=null;const hm=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>dm)return;const s=t==null?void 0:t.token;Xa!==s&&(Xa=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function fm(n=fc()){const e=yo(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Gf(n,{popupRedirectResolver:om,persistence:[vp,mi,jc]}),i=ac("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=hm(r.toString());np(t,o,()=>o(t.currentUser)),tp(t,a=>o(a))}}const s=rc("auth");return s&&Kf(t,`http://${s}`),t}function pm(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Wf({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=lt("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",pm().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});cm("Browser");var el={};const tl="@firebase/database",nl="1.0.8";/**
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
 */let Xc="";function mm(n){Xc=n}/**
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
 */class gm{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Ne(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Pi(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class _m{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return vt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const eu=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new gm(e)}}catch{}return new _m},ln=eu("localStorage"),vm=eu("sessionStorage");/**
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
 */const Dn=new _o("@firebase/database"),ym=function(){let n=1;return function(){return n++}}(),tu=function(n){const e=rh(n),t=new th;t.update(e);const i=t.digest();return po.encodeByteArray(i)},Vi=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Vi.apply(null,i):typeof i=="object"?e+=Ne(i):e+=i,e+=" "}return e};let vi=null,il=!0;const bm=function(n,e){H(!0,"Can't turn on custom loggers persistently."),Dn.logLevel=ve.VERBOSE,vi=Dn.log.bind(Dn)},Fe=function(...n){if(il===!0&&(il=!1,vi===null&&vm.get("logging_enabled")===!0&&bm()),vi){const e=Vi.apply(null,n);vi(e)}},Gi=function(n){return function(...e){Fe(n,...e)}},Gr=function(...n){const e="FIREBASE INTERNAL ERROR: "+Vi(...n);Dn.error(e)},Rt=function(...n){const e=`FIREBASE FATAL ERROR: ${Vi(...n)}`;throw Dn.error(e),new Error(e)},We=function(...n){const e="FIREBASE WARNING: "+Vi(...n);Dn.warn(e)},wm=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&We("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},er=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Em=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},zn="[MIN_NAME]",pn="[MAX_NAME]",yn=function(n,e){if(n===e)return 0;if(n===zn||e===pn)return-1;if(e===zn||n===pn)return 1;{const t=sl(n),i=sl(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},Im=function(n,e){return n===e?0:n<e?-1:1},di=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+Ne(e))},Po=function(n){if(typeof n!="object"||n===null)return Ne(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=Ne(e[i]),t+=":",t+=Po(n[e[i]]);return t+="}",t},nu=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function Me(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const iu=function(n){H(!er(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,l;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const h=c.join("");let u="";for(l=0;l<64;l+=8){let p=parseInt(h.substr(l,8),2).toString(16);p.length===1&&(p="0"+p),u=u+p}return u.toLowerCase()},Cm=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},km=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Sm(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const Tm=new RegExp("^-?(0*)\\d{1,10}$"),Am=-2147483648,Rm=2147483647,sl=function(n){if(Tm.test(n)){const e=Number(n);if(e>=Am&&e<=Rm)return e}return null},Xn=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw We("Exception was thrown by user callback.",t),e},Math.floor(0))}},xm=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},yi=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class Pm{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){We(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class Nm{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(Fe("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',We(e)}}class _s{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}_s.OWNER="owner";/**
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
 */const No="5",su="v",ru="s",ou="r",au="f",lu=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,cu="ls",uu="p",qr="ac",du="websocket",hu="long_polling";/**
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
 */class fu{constructor(e,t,i,s,r=!1,o="",a=!1,l=!1){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=ln.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&ln.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Om(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function pu(n,e,t){H(typeof e=="string","typeof type must == string"),H(typeof t=="object","typeof params must == object");let i;if(e===du)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===hu)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Om(n)&&(t.ns=n.namespace);const s=[];return Me(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
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
 */class Dm{constructor(){this.counters_={}}incrementCounter(e,t=1){vt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Fd(this.counters_)}}/**
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
 */const Sr={},Tr={};function Oo(n){const e=n.toString();return Sr[e]||(Sr[e]=new Dm),Sr[e]}function Lm(n,e){const t=n.toString();return Tr[t]||(Tr[t]=e()),Tr[t]}/**
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
 */class Fm{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Xn(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const rl="start",Mm="close",Um="pLPCommand",Bm="pRTLPCB",mu="id",gu="pw",_u="ser",zm="cb",$m="seg",Wm="ts",jm="d",Hm="dframe",vu=1870,yu=30,Vm=vu-yu,Gm=25e3,qm=3e4;class xn{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Gi(e),this.stats_=Oo(t),this.urlFn=l=>(this.appCheckToken&&(l[qr]=this.appCheckToken),pu(t,hu,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Fm(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(qm)),Em(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Do((...r)=>{const[o,a,l,c,h]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===rl)this.id=a,this.password=l;else if(o===Mm)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[rl]="t",i[_u]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[zm]=this.scriptTagHolder.uniqueCallbackIdentifier),i[su]=No,this.transportSessionId&&(i[ru]=this.transportSessionId),this.lastSessionId&&(i[cu]=this.lastSessionId),this.applicationId&&(i[uu]=this.applicationId),this.appCheckToken&&(i[qr]=this.appCheckToken),typeof location<"u"&&location.hostname&&lu.test(location.hostname)&&(i[ou]=au);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){xn.forceAllow_=!0}static forceDisallow(){xn.forceDisallow_=!0}static isAvailable(){return xn.forceAllow_?!0:!xn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Cm()&&!km()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=Ne(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=ic(t),s=nu(i,Vm);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[Hm]="t",i[mu]=e,i[gu]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=Ne(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Do{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=ym(),window[Um+this.uniqueCallbackIdentifier]=e,window[Bm+this.uniqueCallbackIdentifier]=t,this.myIFrame=Do.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){Fe("frame writing exception"),a.stack&&Fe(a.stack),Fe(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Fe("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[mu]=this.myID,e[gu]=this.myPW,e[_u]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+yu+i.length<=vu;){const o=this.pendingSegs.shift();i=i+"&"+$m+s+"="+o.seg+"&"+Wm+s+"="+o.ts+"&"+jm+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(Gm)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{Fe("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
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
 */const Km=16384,Ym=45e3;let Ns=null;typeof MozWebSocket<"u"?Ns=MozWebSocket:typeof WebSocket<"u"&&(Ns=WebSocket);class rt{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Gi(this.connId),this.stats_=Oo(t),this.connURL=rt.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[su]=No,typeof location<"u"&&location.hostname&&lu.test(location.hostname)&&(o[ou]=au),t&&(o[ru]=t),i&&(o[cu]=i),s&&(o[qr]=s),r&&(o[uu]=r),pu(e,du,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,ln.set("previous_websocket_failure",!0);try{let i;qd(),this.mySock=new Ns(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){rt.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&Ns!==null&&!rt.forceDisallow_}static previouslyFailed(){return ln.isInMemoryStorage||ln.get("previous_websocket_failure")===!0}markConnectionHealthy(){ln.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=Pi(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(H(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=Ne(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=nu(t,Km);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Ym))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}rt.responsesRequiredToBeHealthy=2;rt.healthyTimeout=3e4;/**
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
 */class Di{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[xn,rt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=rt&&rt.isAvailable();let i=t&&!rt.previouslyFailed();if(e.webSocketOnly&&(t||We("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[rt];else{const s=this.transports_=[];for(const r of Di.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Di.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Di.globalTransportInitialized_=!1;/**
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
 */const Zm=6e4,Jm=5e3,Qm=10*1024,Xm=100*1024,Ar="t",ol="d",eg="s",al="r",tg="e",ll="o",cl="a",ul="n",dl="p",ng="h";class ig{constructor(e,t,i,s,r,o,a,l,c,h){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Gi("c:"+this.id+":"),this.transportManager_=new Di(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=yi(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Xm?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Qm?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Ar in e){const t=e[Ar];t===cl?this.upgradeIfSecondaryHealthy_():t===al?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===ll&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=di("t",e),i=di("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:dl,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:cl,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:ul,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=di("t",e),i=di("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=di(Ar,e);if(ol in e){const i=e[ol];if(t===ng){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===ul){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===eg?this.onConnectionShutdown_(i):t===al?this.onReset_(i):t===tg?Gr("Server Error: "+i):t===ll?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Gr("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),No!==i&&We("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),yi(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Zm))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):yi(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Jm))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:dl,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(ln.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class bu{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
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
 */class wu{constructor(e){this.allowedEvents_=e,this.listeners_={},H(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){H(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
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
 */class Os extends wu{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!go()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Os}getInitialEvent(e){return H(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const hl=32,fl=768;class _e{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function ge(){return new _e("")}function ae(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Qt(n){return n.pieces_.length-n.pieceNum_}function be(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new _e(n.pieces_,e)}function Lo(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function sg(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Li(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Eu(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new _e(e,0)}function ke(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof _e)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new _e(t,0)}function ce(n){return n.pieceNum_>=n.pieces_.length}function $e(n,e){const t=ae(n),i=ae(e);if(t===null)return e;if(t===i)return $e(be(n),be(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function rg(n,e){const t=Li(n,0),i=Li(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=yn(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function Fo(n,e){if(Qt(n)!==Qt(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function nt(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(Qt(n)>Qt(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class og{constructor(e,t){this.errorPrefix_=t,this.parts_=Li(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Zs(this.parts_[i]);Iu(this)}}function ag(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Zs(e),Iu(n)}function lg(n){const e=n.parts_.pop();n.byteLength_-=Zs(e),n.parts_.length>0&&(n.byteLength_-=1)}function Iu(n){if(n.byteLength_>fl)throw new Error(n.errorPrefix_+"has a key path longer than "+fl+" bytes ("+n.byteLength_+").");if(n.parts_.length>hl)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+hl+") or object contains a cycle "+on(n))}function on(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
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
 */class Mo extends wu{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new Mo}getInitialEvent(e){return H(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const hi=1e3,cg=60*5*1e3,pl=30*1e3,ug=1.3,dg=3e4,hg="server_kill",ml=3;class St extends bu{constructor(e,t,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=St.nextPersistentConnectionId_++,this.log_=Gi("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=hi,this.maxReconnectDelay_=cg,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Mo.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Os.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(Ne(r)),H(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new dt,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),H(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),H(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;St.warnOnListenWarnings_(l,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&vt(e,"w")){const i=Fn(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();We(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||eh(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=pl)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Xd(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),H(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Ne(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Gr("Unrecognized action received from server: "+Ne(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){H(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=hi,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=hi,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>dg&&(this.reconnectDelay_=hi),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*ug)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+St.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(u){H(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,p]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?Fe("getToken() completed but was canceled"):(Fe("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=p&&p.token,a=new ig(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,f=>{We(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(hg)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&We(u),l())}}}interrupt(e){Fe("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Fe("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Is(this.interruptReasons_)&&(this.reconnectDelay_=hi,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>Po(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new _e(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){Fe("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=ml&&(this.reconnectDelay_=pl,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Fe("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=ml&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+Xc.replace(/\./g,"-")]=1,go()?e["framework.cordova"]=1:lc()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Os.getInstance().currentlyOnline();return Is(this.interruptReasons_)&&e}}St.nextPersistentConnectionId_=0;St.nextConnectionId_=0;/**
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
 */class de{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new de(e,t)}}/**
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
 */class tr{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new de(zn,e),s=new de(zn,t);return this.compare(i,s)!==0}minPost(){return de.MIN}}/**
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
 */let rs;class Cu extends tr{static get __EMPTY_NODE(){return rs}static set __EMPTY_NODE(e){rs=e}compare(e,t){return yn(e.name,t.name)}isDefinedOn(e){throw Yn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return de.MIN}maxPost(){return new de(pn,rs)}makePost(e,t){return H(typeof e=="string","KeyIndex indexValue must always be a string."),new de(e,rs)}toString(){return".key"}}const Ln=new Cu;/**
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
 */class os{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Le{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??Le.RED,this.left=s??He.EMPTY_NODE,this.right=r??He.EMPTY_NODE}copy(e,t,i,s,r){return new Le(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return He.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return He.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Le.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Le.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Le.RED=!0;Le.BLACK=!1;class fg{copy(e,t,i,s,r){return this}insert(e,t,i){return new Le(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class He{constructor(e,t=He.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new He(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,Le.BLACK,null,null))}remove(e){return new He(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Le.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new os(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new os(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new os(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new os(this.root_,null,this.comparator_,!0,e)}}He.EMPTY_NODE=new fg;/**
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
 */function pg(n,e){return yn(n.name,e.name)}function Uo(n,e){return yn(n,e)}/**
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
 */let Kr;function mg(n){Kr=n}const ku=function(n){return typeof n=="number"?"number:"+iu(n):"string:"+n},Su=function(n){if(n.isLeafNode()){const e=n.val();H(typeof e=="string"||typeof e=="number"||typeof e=="object"&&vt(e,".sv"),"Priority must be a string or number.")}else H(n===Kr||n.isEmpty(),"priority of unexpected type.");H(n===Kr||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let gl;class De{constructor(e,t=De.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,H(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Su(this.priorityNode_)}static set __childrenNodeConstructor(e){gl=e}static get __childrenNodeConstructor(){return gl}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new De(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:De.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return ce(e)?this:ae(e)===".priority"?this.priorityNode_:De.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:De.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=ae(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(H(i!==".priority"||Qt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,De.__childrenNodeConstructor.EMPTY_NODE.updateChild(be(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+ku(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=iu(this.value_):e+=this.value_,this.lazyHash_=tu(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===De.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof De.__childrenNodeConstructor?-1:(H(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=De.VALUE_TYPE_ORDER.indexOf(t),r=De.VALUE_TYPE_ORDER.indexOf(i);return H(s>=0,"Unknown leaf type: "+t),H(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}De.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let Tu,Au;function gg(n){Tu=n}function _g(n){Au=n}class vg extends tr{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?yn(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return de.MIN}maxPost(){return new de(pn,new De("[PRIORITY-POST]",Au))}makePost(e,t){const i=Tu(e);return new de(t,new De("[PRIORITY-POST]",i))}toString(){return".priority"}}const Se=new vg;/**
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
 */const yg=Math.log(2);class bg{constructor(e){const t=r=>parseInt(Math.log(r)/yg,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Ds=function(n,e,t,i){n.sort(e);const s=function(l,c){const h=c-l;let u,p;if(h===0)return null;if(h===1)return u=n[l],p=t?t(u):u,new Le(p,u.node,Le.BLACK,null,null);{const f=parseInt(h/2,10)+l,w=s(l,f),g=s(f+1,c);return u=n[f],p=t?t(u):u,new Le(p,u.node,Le.BLACK,w,g)}},r=function(l){let c=null,h=null,u=n.length;const p=function(w,g){const y=u-w,v=u;u-=w;const _=s(y+1,v),b=n[y],C=t?t(b):b;f(new Le(C,b.node,g,null,_))},f=function(w){c?(c.left=w,c=w):(h=w,c=w)};for(let w=0;w<l.count;++w){const g=l.nextBitIsOne(),y=Math.pow(2,l.count-(w+1));g?p(y,Le.BLACK):(p(y,Le.BLACK),p(y,Le.RED))}return h},o=new bg(n.length),a=r(o);return new He(i||e,a)};/**
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
 */let Rr;const En={};class kt{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return H(En&&Se,"ChildrenNode.ts has not been loaded"),Rr=Rr||new kt({".priority":En},{".priority":Se}),Rr}get(e){const t=Fn(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof He?t:null}hasIndex(e){return vt(this.indexSet_,e.toString())}addIndex(e,t){H(e!==Ln,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(de.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=Ds(i,e.getCompare()):a=En;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const h=Object.assign({},this.indexes_);return h[l]=a,new kt(h,c)}addToIndexes(e,t){const i=Cs(this.indexes_,(s,r)=>{const o=Fn(this.indexSet_,r);if(H(o,"Missing index implementation for "+r),s===En)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(de.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),Ds(a,o.getCompare())}else return En;else{const a=t.get(e.name);let l=s;return a&&(l=l.remove(new de(e.name,a))),l.insert(e,e.node)}});return new kt(i,this.indexSet_)}removeFromIndexes(e,t){const i=Cs(this.indexes_,s=>{if(s===En)return s;{const r=t.get(e.name);return r?s.remove(new de(e.name,r)):s}});return new kt(i,this.indexSet_)}}/**
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
 */let fi;class se{constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Su(this.priorityNode_),this.children_.isEmpty()&&H(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return fi||(fi=new se(new He(Uo),null,kt.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||fi}updatePriority(e){return this.children_.isEmpty()?this:new se(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?fi:t}}getChild(e){const t=ae(e);return t===null?this:this.getImmediateChild(t).getChild(be(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(H(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new de(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?fi:this.priorityNode_;return new se(s,o,r)}}updateChild(e,t){const i=ae(e);if(i===null)return t;{H(ae(e)!==".priority"||Qt(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(be(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(Se,(o,a)=>{t[o]=a.val(e),i++,r&&se.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+ku(this.getPriority().val())+":"),this.forEachChild(Se,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":tu(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new de(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new de(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new de(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,de.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,de.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===qi?-1:0}withIndex(e){if(e===Ln||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new se(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Ln||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(Se),s=t.getIterator(Se);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Ln?null:this.indexMap_.get(e.toString())}}se.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class wg extends se{constructor(){super(new He(Uo),se.EMPTY_NODE,kt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return se.EMPTY_NODE}isEmpty(){return!1}}const qi=new wg;Object.defineProperties(de,{MIN:{value:new de(zn,se.EMPTY_NODE)},MAX:{value:new de(pn,qi)}});Cu.__EMPTY_NODE=se.EMPTY_NODE;De.__childrenNodeConstructor=se;mg(qi);_g(qi);/**
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
 */const Eg=!0;function Ae(n,e=null){if(n===null)return se.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),H(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new De(t,Ae(e))}if(!(n instanceof Array)&&Eg){const t=[];let i=!1;if(Me(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=Ae(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),t.push(new de(o,l)))}}),t.length===0)return se.EMPTY_NODE;const r=Ds(t,pg,o=>o.name,Uo);if(i){const o=Ds(t,Se.getCompare());return new se(r,Ae(e),new kt({".priority":o},{".priority":Se}))}else return new se(r,Ae(e),kt.Default)}else{let t=se.EMPTY_NODE;return Me(n,(i,s)=>{if(vt(n,i)&&i.substring(0,1)!=="."){const r=Ae(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(Ae(e))}}gg(Ae);/**
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
 */class Ig extends tr{constructor(e){super(),this.indexPath_=e,H(!ce(e)&&ae(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?yn(e.name,t.name):r}makePost(e,t){const i=Ae(e),s=se.EMPTY_NODE.updateChild(this.indexPath_,i);return new de(t,s)}maxPost(){const e=se.EMPTY_NODE.updateChild(this.indexPath_,qi);return new de(pn,e)}toString(){return Li(this.indexPath_,0).join("/")}}/**
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
 */class Cg extends tr{compare(e,t){const i=e.node.compareTo(t.node);return i===0?yn(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return de.MIN}maxPost(){return de.MAX}makePost(e,t){const i=Ae(e);return new de(t,i)}toString(){return".value"}}const kg=new Cg;/**
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
 */function Ru(n){return{type:"value",snapshotNode:n}}function $n(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Fi(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Mi(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Sg(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
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
 */class Bo{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){H(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(Fi(t,a)):H(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange($n(t,i)):o.trackChildChange(Mi(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(Se,(s,r)=>{t.hasChild(s)||i.trackChildChange(Fi(s,r))}),t.isLeafNode()||t.forEachChild(Se,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Mi(s,r,o))}else i.trackChildChange($n(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?se.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class Ui{constructor(e){this.indexedFilter_=new Bo(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Ui.getStartPost_(e),this.endPost_=Ui.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new de(t,i))||(i=se.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=se.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(se.EMPTY_NODE);const r=this;return t.forEachChild(Se,(o,a)=>{r.matches(new de(o,a))||(s=s.updateImmediateChild(o,se.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
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
 */class Tg{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Ui(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new de(t,i))||(i=se.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=se.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=se.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(se.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,se.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(p,f)=>u(f,p)}else o=this.index_.getCompare();const a=e;H(a.numChildren()===this.limit_,"");const l=new de(t,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let p=s.getChildAfterChild(this.index_,c,this.reverse_);for(;p!=null&&(p.name===t||a.hasChild(p.name));)p=s.getChildAfterChild(this.index_,p,this.reverse_);const f=p==null?1:o(p,l);if(h&&!i.isEmpty()&&f>=0)return r!=null&&r.trackChildChange(Mi(t,i,u)),a.updateImmediateChild(t,i);{r!=null&&r.trackChildChange(Fi(t,u));const g=a.updateImmediateChild(t,se.EMPTY_NODE);return p!=null&&this.rangedFilter_.matches(p)?(r!=null&&r.trackChildChange($n(p.name,p.node)),g.updateImmediateChild(p.name,p.node)):g}}else return i.isEmpty()?e:h&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Fi(c.name,c.node)),r.trackChildChange($n(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(c.name,se.EMPTY_NODE)):e}}/**
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
 */class zo{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=Se}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return H(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return H(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:zn}hasEnd(){return this.endSet_}getIndexEndValue(){return H(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return H(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:pn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return H(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===Se}copy(){const e=new zo;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Ag(n){return n.loadsAllData()?new Bo(n.getIndex()):n.hasLimit()?new Tg(n):new Ui(n)}function _l(n){const e={};if(n.isDefault())return e;let t;if(n.index_===Se?t="$priority":n.index_===kg?t="$value":n.index_===Ln?t="$key":(H(n.index_ instanceof Ig,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=Ne(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=Ne(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+Ne(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=Ne(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+Ne(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function vl(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==Se&&(e.i=n.index_.toString()),e}/**
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
 */class Ls extends bu{constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Gi("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(H(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Ls.getListenId_(e,i),a={};this.listens_[o]=a;const l=_l(e._queryParams);this.restRequest_(r+".json",l,(c,h)=>{let u=h;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,i),Fn(this.listens_,o)===a){let p;c?c===401?p="permission_denied":p="rest_error:"+c:p="ok",s(p,null)}})}unlisten(e,t){const i=Ls.getListenId_(e,t);delete this.listens_[i]}get(e){const t=_l(e._queryParams),i=e._path.toString(),s=new dt;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Zn(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Pi(a.responseText)}catch{We("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&We("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class Rg{constructor(){this.rootNode_=se.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
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
 */function Fs(){return{value:null,children:new Map}}function ei(n,e,t){if(ce(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=ae(e);n.children.has(i)||n.children.set(i,Fs());const s=n.children.get(i);e=be(e),ei(s,e,t)}}function Yr(n,e){if(ce(e))return n.value=null,n.children.clear(),!0;if(n.value!==null){if(n.value.isLeafNode())return!1;{const t=n.value;return n.value=null,t.forEachChild(Se,(i,s)=>{ei(n,new _e(i),s)}),Yr(n,e)}}else if(n.children.size>0){const t=ae(e);return e=be(e),n.children.has(t)&&Yr(n.children.get(t),e)&&n.children.delete(t),n.children.size===0}else return!0}function Zr(n,e,t){n.value!==null?t(e,n.value):xg(n,(i,s)=>{const r=new _e(e.toString()+"/"+i);Zr(s,r,t)})}function xg(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
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
 */class Pg{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&Me(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
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
 */const yl=10*1e3,Ng=30*1e3,Og=5*60*1e3;class Dg{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Pg(e);const i=yl+(Ng-yl)*Math.random();yi(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;Me(e,(s,r)=>{r>0&&vt(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),yi(this.reportStats_.bind(this),Math.floor(Math.random()*2*Og))}}/**
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
 */var at;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(at||(at={}));function $o(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Wo(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function jo(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
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
 */class Ms{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=at.ACK_USER_WRITE,this.source=$o()}operationForChild(e){if(ce(this.path)){if(this.affectedTree.value!=null)return H(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new _e(e));return new Ms(ge(),t,this.revert)}}else return H(ae(this.path)===e,"operationForChild called for unrelated child."),new Ms(be(this.path),this.affectedTree,this.revert)}}/**
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
 */class Bi{constructor(e,t){this.source=e,this.path=t,this.type=at.LISTEN_COMPLETE}operationForChild(e){return ce(this.path)?new Bi(this.source,ge()):new Bi(this.source,be(this.path))}}/**
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
 */class mn{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=at.OVERWRITE}operationForChild(e){return ce(this.path)?new mn(this.source,ge(),this.snap.getImmediateChild(e)):new mn(this.source,be(this.path),this.snap)}}/**
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
 */class Wn{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=at.MERGE}operationForChild(e){if(ce(this.path)){const t=this.children.subtree(new _e(e));return t.isEmpty()?null:t.value?new mn(this.source,ge(),t.value):new Wn(this.source,ge(),t)}else return H(ae(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Wn(this.source,be(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class Xt{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(ce(e))return this.isFullyInitialized()&&!this.filtered_;const t=ae(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class Lg{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Fg(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Sg(o.childName,o.snapshotNode))}),pi(n,s,"child_removed",e,i,t),pi(n,s,"child_added",e,i,t),pi(n,s,"child_moved",r,i,t),pi(n,s,"child_changed",e,i,t),pi(n,s,"value",e,i,t),s}function pi(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,l)=>Ug(n,a,l)),o.forEach(a=>{const l=Mg(n,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function Mg(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Ug(n,e,t){if(e.childName==null||t.childName==null)throw Yn("Should only compare child_ events.");const i=new de(e.childName,e.snapshotNode),s=new de(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
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
 */function nr(n,e){return{eventCache:n,serverCache:e}}function bi(n,e,t,i){return nr(new Xt(e,t,i),n.serverCache)}function xu(n,e,t,i){return nr(n.eventCache,new Xt(e,t,i))}function Us(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function gn(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
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
 */let xr;const Bg=()=>(xr||(xr=new He(Im)),xr);class Ce{constructor(e,t=Bg()){this.value=e,this.children=t}static fromObject(e){let t=new Ce(null);return Me(e,(i,s)=>{t=t.set(new _e(i),s)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:ge(),value:this.value};if(ce(e))return null;{const i=ae(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(be(e),t);return r!=null?{path:ke(new _e(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(ce(e))return this;{const t=ae(e),i=this.children.get(t);return i!==null?i.subtree(be(e)):new Ce(null)}}set(e,t){if(ce(e))return new Ce(t,this.children);{const i=ae(e),r=(this.children.get(i)||new Ce(null)).set(be(e),t),o=this.children.insert(i,r);return new Ce(this.value,o)}}remove(e){if(ce(e))return this.children.isEmpty()?new Ce(null):new Ce(null,this.children);{const t=ae(e),i=this.children.get(t);if(i){const s=i.remove(be(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new Ce(null):new Ce(this.value,r)}else return this}}get(e){if(ce(e))return this.value;{const t=ae(e),i=this.children.get(t);return i?i.get(be(e)):null}}setTree(e,t){if(ce(e))return t;{const i=ae(e),r=(this.children.get(i)||new Ce(null)).setTree(be(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new Ce(this.value,o)}}fold(e){return this.fold_(ge(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(ke(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,ge(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(ce(e))return null;{const r=ae(e),o=this.children.get(r);return o?o.findOnPath_(be(e),ke(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,ge(),t)}foreachOnPath_(e,t,i){if(ce(e))return this;{this.value&&i(t,this.value);const s=ae(e),r=this.children.get(s);return r?r.foreachOnPath_(be(e),ke(t,s),i):new Ce(null)}}foreach(e){this.foreach_(ge(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(ke(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
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
 */class ct{constructor(e){this.writeTree_=e}static empty(){return new ct(new Ce(null))}}function wi(n,e,t){if(ce(e))return new ct(new Ce(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=$e(s,e);return r=r.updateChild(o,t),new ct(n.writeTree_.set(s,r))}else{const s=new Ce(t),r=n.writeTree_.setTree(e,s);return new ct(r)}}}function Jr(n,e,t){let i=n;return Me(t,(s,r)=>{i=wi(i,ke(e,s),r)}),i}function bl(n,e){if(ce(e))return ct.empty();{const t=n.writeTree_.setTree(e,new Ce(null));return new ct(t)}}function Qr(n,e){return bn(n,e)!=null}function bn(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild($e(t.path,e)):null}function wl(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(Se,(i,s)=>{e.push(new de(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new de(i,s.value))}),e}function Kt(n,e){if(ce(e))return n;{const t=bn(n,e);return t!=null?new ct(new Ce(t)):new ct(n.writeTree_.subtree(e))}}function Xr(n){return n.writeTree_.isEmpty()}function jn(n,e){return Pu(ge(),n.writeTree_,e)}function Pu(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(H(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=Pu(ke(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(ke(n,".priority"),i)),t}}/**
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
 */function ir(n,e){return Lu(e,n)}function zg(n,e,t,i,s){H(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=wi(n.visibleWrites,e,t)),n.lastWriteId=i}function $g(n,e,t,i){H(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=Jr(n.visibleWrites,e,t),n.lastWriteId=i}function Wg(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function jg(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);H(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&Hg(a,i.path)?s=!1:nt(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Vg(n),!0;if(i.snap)n.visibleWrites=bl(n.visibleWrites,i.path);else{const a=i.children;Me(a,l=>{n.visibleWrites=bl(n.visibleWrites,ke(i.path,l))})}return!0}else return!1}function Hg(n,e){if(n.snap)return nt(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&nt(ke(n.path,t),e))return!0;return!1}function Vg(n){n.visibleWrites=Nu(n.allWrites,Gg,ge()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Gg(n){return n.visible}function Nu(n,e,t){let i=ct.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)nt(t,o)?(a=$e(t,o),i=wi(i,a,r.snap)):nt(o,t)&&(a=$e(o,t),i=wi(i,ge(),r.snap.getChild(a)));else if(r.children){if(nt(t,o))a=$e(t,o),i=Jr(i,a,r.children);else if(nt(o,t))if(a=$e(o,t),ce(a))i=Jr(i,ge(),r.children);else{const l=Fn(r.children,ae(a));if(l){const c=l.getChild(be(a));i=wi(i,ge(),c)}}}else throw Yn("WriteRecord should have .snap or .children")}}return i}function Ou(n,e,t,i,s){if(!i&&!s){const r=bn(n.visibleWrites,e);if(r!=null)return r;{const o=Kt(n.visibleWrites,e);if(Xr(o))return t;if(t==null&&!Qr(o,ge()))return null;{const a=t||se.EMPTY_NODE;return jn(o,a)}}}else{const r=Kt(n.visibleWrites,e);if(!s&&Xr(r))return t;if(!s&&t==null&&!Qr(r,ge()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(nt(c.path,e)||nt(e,c.path))},a=Nu(n.allWrites,o,e),l=t||se.EMPTY_NODE;return jn(a,l)}}}function qg(n,e,t){let i=se.EMPTY_NODE;const s=bn(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(Se,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=Kt(n.visibleWrites,e);return t.forEachChild(Se,(o,a)=>{const l=jn(Kt(r,new _e(o)),a);i=i.updateImmediateChild(o,l)}),wl(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Kt(n.visibleWrites,e);return wl(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Kg(n,e,t,i,s){H(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=ke(e,t);if(Qr(n.visibleWrites,r))return null;{const o=Kt(n.visibleWrites,r);return Xr(o)?s.getChild(t):jn(o,s.getChild(t))}}function Yg(n,e,t,i){const s=ke(e,t),r=bn(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=Kt(n.visibleWrites,s);return jn(o,i.getNode().getImmediateChild(t))}else return null}function Zg(n,e){return bn(n.visibleWrites,e)}function Jg(n,e,t,i,s,r,o){let a;const l=Kt(n.visibleWrites,e),c=bn(l,ge());if(c!=null)a=c;else if(t!=null)a=jn(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const h=[],u=o.getCompare(),p=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=p.getNext();for(;f&&h.length<s;)u(f,i)!==0&&h.push(f),f=p.getNext();return h}else return[]}function Qg(){return{visibleWrites:ct.empty(),allWrites:[],lastWriteId:-1}}function Bs(n,e,t,i){return Ou(n.writeTree,n.treePath,e,t,i)}function Ho(n,e){return qg(n.writeTree,n.treePath,e)}function El(n,e,t,i){return Kg(n.writeTree,n.treePath,e,t,i)}function zs(n,e){return Zg(n.writeTree,ke(n.treePath,e))}function Xg(n,e,t,i,s,r){return Jg(n.writeTree,n.treePath,e,t,i,s,r)}function Vo(n,e,t){return Yg(n.writeTree,n.treePath,e,t)}function Du(n,e){return Lu(ke(n.treePath,e),n.writeTree)}function Lu(n,e){return{treePath:n,writeTree:e}}/**
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
 */class e_{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;H(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),H(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,Mi(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,Fi(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,$n(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,Mi(i,e.snapshotNode,s.oldSnap));else throw Yn("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class t_{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const Fu=new t_;class Go{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Xt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Vo(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:gn(this.viewCache_),r=Xg(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
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
 */function n_(n){return{filter:n}}function i_(n,e){H(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),H(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function s_(n,e,t,i,s){const r=new e_;let o,a;if(t.type===at.OVERWRITE){const c=t;c.source.fromUser?o=eo(n,e,c.path,c.snap,i,s,r):(H(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!ce(c.path),o=$s(n,e,c.path,c.snap,i,s,a,r))}else if(t.type===at.MERGE){const c=t;c.source.fromUser?o=o_(n,e,c.path,c.children,i,s,r):(H(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=to(n,e,c.path,c.children,i,s,a,r))}else if(t.type===at.ACK_USER_WRITE){const c=t;c.revert?o=c_(n,e,c.path,i,s,r):o=a_(n,e,c.path,c.affectedTree,i,s,r)}else if(t.type===at.LISTEN_COMPLETE)o=l_(n,e,t.path,i,r);else throw Yn("Unknown operation type: "+t.type);const l=r.getChanges();return r_(e,o,l),{viewCache:o,changes:l}}function r_(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Us(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Ru(Us(e)))}}function Mu(n,e,t,i,s,r){const o=e.eventCache;if(zs(i,t)!=null)return e;{let a,l;if(ce(t))if(H(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=gn(e),h=c instanceof se?c:se.EMPTY_NODE,u=Ho(i,h);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=Bs(i,gn(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=ae(t);if(c===".priority"){H(Qt(t)===1,"Can't have a priority with additional path components");const h=o.getNode();l=e.serverCache.getNode();const u=El(i,t,h,l);u!=null?a=n.filter.updatePriority(h,u):a=o.getNode()}else{const h=be(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const p=El(i,t,o.getNode(),l);p!=null?u=o.getNode().getImmediateChild(c).updateChild(h,p):u=o.getNode().getImmediateChild(c)}else u=Vo(i,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,h,s,r):a=o.getNode()}}return bi(e,a,o.isFullyInitialized()||ce(t),n.filter.filtersNodes())}}function $s(n,e,t,i,s,r,o,a){const l=e.serverCache;let c;const h=o?n.filter:n.filter.getIndexedFilter();if(ce(t))c=h.updateFullNode(l.getNode(),i,null);else if(h.filtersNodes()&&!l.isFiltered()){const f=l.getNode().updateChild(t,i);c=h.updateFullNode(l.getNode(),f,null)}else{const f=ae(t);if(!l.isCompleteForPath(t)&&Qt(t)>1)return e;const w=be(t),y=l.getNode().getImmediateChild(f).updateChild(w,i);f===".priority"?c=h.updatePriority(l.getNode(),y):c=h.updateChild(l.getNode(),f,y,w,Fu,null)}const u=xu(e,c,l.isFullyInitialized()||ce(t),h.filtersNodes()),p=new Go(s,u,r);return Mu(n,u,t,s,p,a)}function eo(n,e,t,i,s,r,o){const a=e.eventCache;let l,c;const h=new Go(s,e,r);if(ce(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,o),l=bi(e,c,!0,n.filter.filtersNodes());else{const u=ae(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),l=bi(e,c,a.isFullyInitialized(),a.isFiltered());else{const p=be(t),f=a.getNode().getImmediateChild(u);let w;if(ce(p))w=i;else{const g=h.getCompleteChild(u);g!=null?Lo(p)===".priority"&&g.getChild(Eu(p)).isEmpty()?w=g:w=g.updateChild(p,i):w=se.EMPTY_NODE}if(f.equals(w))l=e;else{const g=n.filter.updateChild(a.getNode(),u,w,p,h,o);l=bi(e,g,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Il(n,e){return n.eventCache.isCompleteForChild(e)}function o_(n,e,t,i,s,r,o){let a=e;return i.foreach((l,c)=>{const h=ke(t,l);Il(e,ae(h))&&(a=eo(n,a,h,c,s,r,o))}),i.foreach((l,c)=>{const h=ke(t,l);Il(e,ae(h))||(a=eo(n,a,h,c,s,r,o))}),a}function Cl(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function to(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;ce(t)?c=i:c=new Ce(null).setTree(t,i);const h=e.serverCache.getNode();return c.children.inorderTraversal((u,p)=>{if(h.hasChild(u)){const f=e.serverCache.getNode().getImmediateChild(u),w=Cl(n,f,p);l=$s(n,l,new _e(u),w,s,r,o,a)}}),c.children.inorderTraversal((u,p)=>{const f=!e.serverCache.isCompleteForChild(u)&&p.value===null;if(!h.hasChild(u)&&!f){const w=e.serverCache.getNode().getImmediateChild(u),g=Cl(n,w,p);l=$s(n,l,new _e(u),g,s,r,o,a)}}),l}function a_(n,e,t,i,s,r,o){if(zs(s,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(ce(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return $s(n,e,t,l.getNode().getChild(t),s,r,a,o);if(ce(t)){let c=new Ce(null);return l.getNode().forEachChild(Ln,(h,u)=>{c=c.set(new _e(h),u)}),to(n,e,t,c,s,r,a,o)}else return e}else{let c=new Ce(null);return i.foreach((h,u)=>{const p=ke(t,h);l.isCompleteForPath(p)&&(c=c.set(h,l.getNode().getChild(p)))}),to(n,e,t,c,s,r,a,o)}}function l_(n,e,t,i,s){const r=e.serverCache,o=xu(e,r.getNode(),r.isFullyInitialized()||ce(t),r.isFiltered());return Mu(n,o,t,i,Fu,s)}function c_(n,e,t,i,s,r){let o;if(zs(i,t)!=null)return e;{const a=new Go(i,e,s),l=e.eventCache.getNode();let c;if(ce(t)||ae(t)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=Bs(i,gn(e));else{const u=e.serverCache.getNode();H(u instanceof se,"serverChildren would be complete if leaf node"),h=Ho(i,u)}h=h,c=n.filter.updateFullNode(l,h,r)}else{const h=ae(t);let u=Vo(i,h,e.serverCache);u==null&&e.serverCache.isCompleteForChild(h)&&(u=l.getImmediateChild(h)),u!=null?c=n.filter.updateChild(l,h,u,be(t),a,r):e.eventCache.getNode().hasChild(h)?c=n.filter.updateChild(l,h,se.EMPTY_NODE,be(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Bs(i,gn(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||zs(i,ge())!=null,bi(e,c,o,n.filter.filtersNodes())}}/**
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
 */class u_{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Bo(i.getIndex()),r=Ag(i);this.processor_=n_(r);const o=t.serverCache,a=t.eventCache,l=s.updateFullNode(se.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(se.EMPTY_NODE,a.getNode(),null),h=new Xt(l,o.isFullyInitialized(),s.filtersNodes()),u=new Xt(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=nr(u,h),this.eventGenerator_=new Lg(this.query_)}get query(){return this.query_}}function d_(n){return n.viewCache_.serverCache.getNode()}function h_(n){return Us(n.viewCache_)}function f_(n,e){const t=gn(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!ce(e)&&!t.getImmediateChild(ae(e)).isEmpty())?t.getChild(e):null}function kl(n){return n.eventRegistrations_.length===0}function p_(n,e){n.eventRegistrations_.push(e)}function Sl(n,e,t){const i=[];if(t){H(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function Tl(n,e,t,i){e.type===at.MERGE&&e.source.queryId!==null&&(H(gn(n.viewCache_),"We should always have a full cache before handling merges"),H(Us(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=s_(n.processor_,s,e,t,i);return i_(n.processor_,r.viewCache),H(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Uu(n,r.changes,r.viewCache.eventCache.getNode(),null)}function m_(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(Se,(r,o)=>{i.push($n(r,o))}),t.isFullyInitialized()&&i.push(Ru(t.getNode())),Uu(n,i,t.getNode(),e)}function Uu(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return Fg(n.eventGenerator_,e,t,s)}/**
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
 */let Ws;class Bu{constructor(){this.views=new Map}}function g_(n){H(!Ws,"__referenceConstructor has already been defined"),Ws=n}function __(){return H(Ws,"Reference.ts has not been loaded"),Ws}function v_(n){return n.views.size===0}function qo(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return H(r!=null,"SyncTree gave us an op for an invalid query."),Tl(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(Tl(o,e,t,i));return r}}function zu(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Bs(t,s?i:null),l=!1;a?l=!0:i instanceof se?(a=Ho(t,i),l=!1):(a=se.EMPTY_NODE,l=!1);const c=nr(new Xt(a,l,!1),new Xt(i,s,!1));return new u_(e,c)}return o}function y_(n,e,t,i,s,r){const o=zu(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),p_(o,t),m_(o,t)}function b_(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=en(n);if(s==="default")for(const[l,c]of n.views.entries())o=o.concat(Sl(c,t,i)),kl(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(s);l&&(o=o.concat(Sl(l,t,i)),kl(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!en(n)&&r.push(new(__())(e._repo,e._path)),{removed:r,events:o}}function $u(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Yt(n,e){let t=null;for(const i of n.views.values())t=t||f_(i,e);return t}function Wu(n,e){if(e._queryParams.loadsAllData())return sr(n);{const i=e._queryIdentifier;return n.views.get(i)}}function ju(n,e){return Wu(n,e)!=null}function en(n){return sr(n)!=null}function sr(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let js;function w_(n){H(!js,"__referenceConstructor has already been defined"),js=n}function E_(){return H(js,"Reference.ts has not been loaded"),js}let I_=1;class Al{constructor(e){this.listenProvider_=e,this.syncPointTree_=new Ce(null),this.pendingWriteTree_=Qg(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Hu(n,e,t,i,s){return zg(n.pendingWriteTree_,e,t,i,s),s?ti(n,new mn($o(),e,t)):[]}function C_(n,e,t,i){$g(n.pendingWriteTree_,e,t,i);const s=Ce.fromObject(t);return ti(n,new Wn($o(),e,s))}function Wt(n,e,t=!1){const i=Wg(n.pendingWriteTree_,e);if(jg(n.pendingWriteTree_,e)){let r=new Ce(null);return i.snap!=null?r=r.set(ge(),!0):Me(i.children,o=>{r=r.set(new _e(o),!0)}),ti(n,new Ms(i.path,r,t))}else return[]}function Ki(n,e,t){return ti(n,new mn(Wo(),e,t))}function k_(n,e,t){const i=Ce.fromObject(t);return ti(n,new Wn(Wo(),e,i))}function S_(n,e){return ti(n,new Bi(Wo(),e))}function T_(n,e,t){const i=Yo(n,t);if(i){const s=Zo(i),r=s.path,o=s.queryId,a=$e(r,e),l=new Bi(jo(o),a);return Jo(n,r,l)}else return[]}function Hs(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||ju(o,e))){const l=b_(o,e,t,i);v_(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const h=c.findIndex(p=>p._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(p,f)=>en(f));if(h&&!u){const p=n.syncPointTree_.subtree(r);if(!p.isEmpty()){const f=x_(p);for(let w=0;w<f.length;++w){const g=f[w],y=g.query,v=Ku(n,g);n.listenProvider_.startListening(Ei(y),zi(n,y),v.hashFn,v.onComplete)}}}!u&&c.length>0&&!i&&(h?n.listenProvider_.stopListening(Ei(e),null):c.forEach(p=>{const f=n.queryToTagMap.get(rr(p));n.listenProvider_.stopListening(Ei(p),f)}))}P_(n,c)}return a}function Vu(n,e,t,i){const s=Yo(n,i);if(s!=null){const r=Zo(s),o=r.path,a=r.queryId,l=$e(o,e),c=new mn(jo(a),l,t);return Jo(n,o,c)}else return[]}function A_(n,e,t,i){const s=Yo(n,i);if(s){const r=Zo(s),o=r.path,a=r.queryId,l=$e(o,e),c=Ce.fromObject(t),h=new Wn(jo(a),l,c);return Jo(n,o,h)}else return[]}function no(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(p,f)=>{const w=$e(p,s);r=r||Yt(f,w),o=o||en(f)});let a=n.syncPointTree_.get(s);a?(o=o||en(a),r=r||Yt(a,ge())):(a=new Bu,n.syncPointTree_=n.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=se.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((f,w)=>{const g=Yt(w,ge());g&&(r=r.updateImmediateChild(f,g))}));const c=ju(a,e);if(!c&&!e._queryParams.loadsAllData()){const p=rr(e);H(!n.queryToTagMap.has(p),"View does not exist, but we have a tag");const f=N_();n.queryToTagMap.set(p,f),n.tagToQueryMap.set(f,p)}const h=ir(n.pendingWriteTree_,s);let u=y_(a,e,t,h,r,l);if(!c&&!o&&!i){const p=Wu(a,e);u=u.concat(O_(n,e,p))}return u}function Ko(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=$e(o,e),c=Yt(a,l);if(c)return c});return Ou(s,e,r,t,!0)}function R_(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(c,h)=>{const u=$e(c,t);i=i||Yt(h,u)});let s=n.syncPointTree_.get(t);s?i=i||Yt(s,ge()):(s=new Bu,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new Xt(i,!0,!1):null,a=ir(n.pendingWriteTree_,e._path),l=zu(s,e,a,r?o.getNode():se.EMPTY_NODE,r);return h_(l)}function ti(n,e){return Gu(e,n.syncPointTree_,null,ir(n.pendingWriteTree_,ge()))}function Gu(n,e,t,i){if(ce(n.path))return qu(n,e,t,i);{const s=e.get(ge());t==null&&s!=null&&(t=Yt(s,ge()));let r=[];const o=ae(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,h=Du(i,o);r=r.concat(Gu(a,l,c,h))}return s&&(r=r.concat(qo(s,n,i,t))),r}}function qu(n,e,t,i){const s=e.get(ge());t==null&&s!=null&&(t=Yt(s,ge()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=Du(i,o),h=n.operationForChild(o);h&&(r=r.concat(qu(h,a,l,c)))}),s&&(r=r.concat(qo(s,n,i,t))),r}function Ku(n,e){const t=e.query,i=zi(n,t);return{hashFn:()=>(d_(e)||se.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?T_(n,t._path,i):S_(n,t._path);{const r=Sm(s,t);return Hs(n,t,null,r)}}}}function zi(n,e){const t=rr(e);return n.queryToTagMap.get(t)}function rr(n){return n._path.toString()+"$"+n._queryIdentifier}function Yo(n,e){return n.tagToQueryMap.get(e)}function Zo(n){const e=n.indexOf("$");return H(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new _e(n.substr(0,e))}}function Jo(n,e,t){const i=n.syncPointTree_.get(e);H(i,"Missing sync point for query tag that we're tracking");const s=ir(n.pendingWriteTree_,e);return qo(i,t,s,null)}function x_(n){return n.fold((e,t,i)=>{if(t&&en(t))return[sr(t)];{let s=[];return t&&(s=$u(t)),Me(i,(r,o)=>{s=s.concat(o)}),s}})}function Ei(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(E_())(n._repo,n._path):n}function P_(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=rr(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function N_(){return I_++}function O_(n,e,t){const i=e._path,s=zi(n,e),r=Ku(n,t),o=n.listenProvider_.startListening(Ei(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)H(!en(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,h,u)=>{if(!ce(c)&&h&&en(h))return[sr(h).query];{let p=[];return h&&(p=p.concat($u(h).map(f=>f.query))),Me(u,(f,w)=>{p=p.concat(w)}),p}});for(let c=0;c<l.length;++c){const h=l[c];n.listenProvider_.stopListening(Ei(h),zi(n,h))}}return o}/**
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
 */class Qo{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Qo(t)}node(){return this.node_}}class Xo{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=ke(this.path_,e);return new Xo(this.syncTree_,t)}node(){return Ko(this.syncTree_,this.path_)}}const D_=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Rl=function(n,e,t){if(!n||typeof n!="object")return n;if(H(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return L_(n[".sv"],e,t);if(typeof n[".sv"]=="object")return F_(n[".sv"],e);H(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},L_=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:H(!1,"Unexpected server value: "+n)}},F_=function(n,e,t){n.hasOwnProperty("increment")||H(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&H(!1,"Unexpected increment value: "+i);const s=e.node();if(H(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},Yu=function(n,e,t,i){return ea(e,new Xo(t,n),i)},Zu=function(n,e,t){return ea(n,new Qo(e),t)};function ea(n,e,t){const i=n.getPriority().val(),s=Rl(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Rl(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new De(a,Ae(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new De(s))),o.forEachChild(Se,(a,l)=>{const c=ea(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
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
 */class ta{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function na(n,e){let t=e instanceof _e?e:new _e(e),i=n,s=ae(t);for(;s!==null;){const r=Fn(i.node.children,s)||{children:{},childCount:0};i=new ta(s,i,r),t=be(t),s=ae(t)}return i}function ni(n){return n.node.value}function Ju(n,e){n.node.value=e,io(n)}function Qu(n){return n.node.childCount>0}function M_(n){return ni(n)===void 0&&!Qu(n)}function or(n,e){Me(n.node.children,(t,i)=>{e(new ta(t,n,i))})}function Xu(n,e,t,i){t&&e(n),or(n,s=>{Xu(s,e,!0)})}function U_(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Yi(n){return new _e(n.parent===null?n.name:Yi(n.parent)+"/"+n.name)}function io(n){n.parent!==null&&B_(n.parent,n.name,n)}function B_(n,e,t){const i=M_(t),s=vt(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,io(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,io(n))}/**
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
 */const z_=/[\[\].#$\/\u0000-\u001F\u007F]/,$_=/[\[\].#$\u0000-\u001F\u007F]/,Pr=10*1024*1024,ia=function(n){return typeof n=="string"&&n.length!==0&&!z_.test(n)},ed=function(n){return typeof n=="string"&&n.length!==0&&!$_.test(n)},W_=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ed(n)},td=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!er(n)||n&&typeof n=="object"&&vt(n,".sv")},Vs=function(n,e,t,i){i&&e===void 0||ar(Mn(n,"value"),e,t)},ar=function(n,e,t){const i=t instanceof _e?new og(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+on(i));if(typeof e=="function")throw new Error(n+"contains a function "+on(i)+" with contents = "+e.toString());if(er(e))throw new Error(n+"contains "+e.toString()+" "+on(i));if(typeof e=="string"&&e.length>Pr/3&&Zs(e)>Pr)throw new Error(n+"contains a string greater than "+Pr+" utf8 bytes "+on(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(Me(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!ia(o)))throw new Error(n+" contains an invalid key ("+o+") "+on(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);ag(i,o),ar(n,a,i),lg(i)}),s&&r)throw new Error(n+' contains ".value" child '+on(i)+" in addition to actual children.")}},j_=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=Li(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!ia(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(rg);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&nt(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},nd=function(n,e,t,i){const s=Mn(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];Me(e,(o,a)=>{const l=new _e(o);if(ar(s,a,ke(t,l)),Lo(l)===".priority"&&!td(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),j_(s,r)},H_=function(n,e,t){if(er(e))throw new Error(Mn(n,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!td(e))throw new Error(Mn(n,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},id=function(n,e,t,i){if(!ed(t))throw new Error(Mn(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},V_=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),id(n,e,t)},cn=function(n,e){if(ae(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},G_=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!ia(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!W_(t))throw new Error(Mn(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class q_{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function lr(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!Fo(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function sd(n,e,t){lr(n,t),rd(n,i=>Fo(i,e))}function st(n,e,t){lr(n,t),rd(n,i=>nt(i,e)||nt(e,i))}function rd(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(K_(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function K_(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();vi&&Fe("event: "+t.toString()),Xn(i)}}}/**
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
 */const Y_="repo_interrupt",Z_=25;class J_{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new q_,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Fs(),this.transactionQueueTree_=new ta,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Q_(n,e,t){if(n.stats_=Oo(n.repoInfo_),n.forceRestClient_||xm())n.server_=new Ls(n.repoInfo_,(i,s,r,o)=>{xl(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Pl(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Ne(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new St(n.repoInfo_,e,(i,s,r,o)=>{xl(n,i,s,r,o)},i=>{Pl(n,i)},i=>{X_(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=Lm(n.repoInfo_,()=>new Dg(n.stats_,n.server_)),n.infoData_=new Rg,n.infoSyncTree_=new Al({startListening:(i,s,r,o)=>{let a=[];const l=n.infoData_.getNode(i._path);return l.isEmpty()||(a=Ki(n.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),sa(n,"connected",!1),n.serverSyncTree_=new Al({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);st(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function od(n){const t=n.infoData_.getNode(new _e(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function cr(n){return D_({timestamp:od(n)})}function xl(n,e,t,i,s){n.dataUpdateCount++;const r=new _e(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const l=Cs(t,c=>Ae(c));o=A_(n.serverSyncTree_,r,l,s)}else{const l=Ae(t);o=Vu(n.serverSyncTree_,r,l,s)}else if(i){const l=Cs(t,c=>Ae(c));o=k_(n.serverSyncTree_,r,l)}else{const l=Ae(t);o=Ki(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=Hn(n,r)),st(n.eventQueue_,a,o)}function Pl(n,e){sa(n,"connected",e),e===!1&&iv(n)}function X_(n,e){Me(e,(t,i)=>{sa(n,t,i)})}function sa(n,e,t){const i=new _e("/.info/"+e),s=Ae(t);n.infoData_.updateSnapshot(i,s);const r=Ki(n.infoSyncTree_,i,s);st(n.eventQueue_,i,r)}function ra(n){return n.nextWriteId_++}function ev(n,e,t){const i=R_(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=Ae(s).withIndex(e._queryParams.getIndex());no(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Ki(n.serverSyncTree_,e._path,r);else{const a=zi(n.serverSyncTree_,e);o=Vu(n.serverSyncTree_,e._path,r,a)}return st(n.eventQueue_,e._path,o),Hs(n.serverSyncTree_,e,t,null,!0),r},s=>(Zi(n,"get for query "+Ne(e)+" failed: "+s),Promise.reject(new Error(s))))}function tv(n,e,t,i,s){Zi(n,"set",{path:e.toString(),value:t,priority:i});const r=cr(n),o=Ae(t,i),a=Ko(n.serverSyncTree_,e),l=Zu(o,a,r),c=ra(n),h=Hu(n.serverSyncTree_,e,l,c,!0);lr(n.eventQueue_,h),n.server_.put(e.toString(),o.val(!0),(p,f)=>{const w=p==="ok";w||We("set at "+e+" failed: "+p);const g=Wt(n.serverSyncTree_,c,!w);st(n.eventQueue_,e,g),tn(n,s,p,f)});const u=aa(n,e);Hn(n,u),st(n.eventQueue_,u,[])}function nv(n,e,t,i){Zi(n,"update",{path:e.toString(),value:t});let s=!0;const r=cr(n),o={};if(Me(t,(a,l)=>{s=!1,o[a]=Yu(ke(e,a),Ae(l),n.serverSyncTree_,r)}),s)Fe("update() called with empty data.  Don't do anything."),tn(n,i,"ok",void 0);else{const a=ra(n),l=C_(n.serverSyncTree_,e,o,a);lr(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,h)=>{const u=c==="ok";u||We("update at "+e+" failed: "+c);const p=Wt(n.serverSyncTree_,a,!u),f=p.length>0?Hn(n,e):e;st(n.eventQueue_,f,p),tn(n,i,c,h)}),Me(t,c=>{const h=aa(n,ke(e,c));Hn(n,h)}),st(n.eventQueue_,e,[])}}function iv(n){Zi(n,"onDisconnectEvents");const e=cr(n),t=Fs();Zr(n.onDisconnect_,ge(),(s,r)=>{const o=Yu(s,r,n.serverSyncTree_,e);ei(t,s,o)});let i=[];Zr(t,ge(),(s,r)=>{i=i.concat(Ki(n.serverSyncTree_,s,r));const o=aa(n,s);Hn(n,o)}),n.onDisconnect_=Fs(),st(n.eventQueue_,ge(),i)}function sv(n,e,t){n.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&Yr(n.onDisconnect_,e),tn(n,t,i,s)})}function Nl(n,e,t,i){const s=Ae(t);n.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&ei(n.onDisconnect_,e,s),tn(n,i,r,o)})}function rv(n,e,t,i,s){const r=Ae(t,i);n.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&ei(n.onDisconnect_,e,r),tn(n,s,o,a)})}function ov(n,e,t,i){if(Is(t)){Fe("onDisconnect().update() called with empty data.  Don't do anything."),tn(n,i,"ok",void 0);return}n.server_.onDisconnectMerge(e.toString(),t,(s,r)=>{s==="ok"&&Me(t,(o,a)=>{const l=Ae(a);ei(n.onDisconnect_,ke(e,o),l)}),tn(n,i,s,r)})}function av(n,e,t){let i;ae(e._path)===".info"?i=no(n.infoSyncTree_,e,t):i=no(n.serverSyncTree_,e,t),sd(n.eventQueue_,e._path,i)}function so(n,e,t){let i;ae(e._path)===".info"?i=Hs(n.infoSyncTree_,e,t):i=Hs(n.serverSyncTree_,e,t),sd(n.eventQueue_,e._path,i)}function lv(n){n.persistentConnection_&&n.persistentConnection_.interrupt(Y_)}function Zi(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),Fe(t,...e)}function tn(n,e,t,i){e&&Xn(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function ad(n,e,t){return Ko(n.serverSyncTree_,e,t)||se.EMPTY_NODE}function oa(n,e=n.transactionQueueTree_){if(e||ur(n,e),ni(e)){const t=cd(n,e);H(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&cv(n,Yi(e),t)}else Qu(e)&&or(e,t=>{oa(n,t)})}function cv(n,e,t){const i=t.map(c=>c.currentWriteId),s=ad(n,e,i);let r=s;const o=s.hash();for(let c=0;c<t.length;c++){const h=t[c];H(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const u=$e(e,h.path);r=r.updateChild(u,h.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{Zi(n,"transaction put response",{path:l.toString(),status:c});let h=[];if(c==="ok"){const u=[];for(let p=0;p<t.length;p++)t[p].status=2,h=h.concat(Wt(n.serverSyncTree_,t[p].currentWriteId)),t[p].onComplete&&u.push(()=>t[p].onComplete(null,!0,t[p].currentOutputSnapshotResolved)),t[p].unwatcher();ur(n,na(n.transactionQueueTree_,e)),oa(n,n.transactionQueueTree_),st(n.eventQueue_,e,h);for(let p=0;p<u.length;p++)Xn(u[p])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{We("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}Hn(n,e)}},o)}function Hn(n,e){const t=ld(n,e),i=Yi(t),s=cd(n,t);return uv(n,s,i),i}function uv(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=$e(t,l.path);let h=!1,u;if(H(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)h=!0,u=l.abortReason,s=s.concat(Wt(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Z_)h=!0,u="maxretry",s=s.concat(Wt(n.serverSyncTree_,l.currentWriteId,!0));else{const p=ad(n,l.path,o);l.currentInputSnapshot=p;const f=e[a].update(p.val());if(f!==void 0){ar("transaction failed: Data returned ",f,l.path);let w=Ae(f);typeof f=="object"&&f!=null&&vt(f,".priority")||(w=w.updatePriority(p.getPriority()));const y=l.currentWriteId,v=cr(n),_=Zu(w,p,v);l.currentOutputSnapshotRaw=w,l.currentOutputSnapshotResolved=_,l.currentWriteId=ra(n),o.splice(o.indexOf(y),1),s=s.concat(Hu(n.serverSyncTree_,l.path,_,l.currentWriteId,l.applyLocally)),s=s.concat(Wt(n.serverSyncTree_,y,!0))}else h=!0,u="nodata",s=s.concat(Wt(n.serverSyncTree_,l.currentWriteId,!0))}st(n.eventQueue_,t,s),s=[],h&&(e[a].status=2,function(p){setTimeout(p,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(u),!1,null))))}ur(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)Xn(i[a]);oa(n,n.transactionQueueTree_)}function ld(n,e){let t,i=n.transactionQueueTree_;for(t=ae(e);t!==null&&ni(i)===void 0;)i=na(i,t),e=be(e),t=ae(e);return i}function cd(n,e){const t=[];return ud(n,e,t),t.sort((i,s)=>i.order-s.order),t}function ud(n,e,t){const i=ni(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);or(e,s=>{ud(n,s,t)})}function ur(n,e){const t=ni(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,Ju(e,t.length>0?t:void 0)}or(e,i=>{ur(n,i)})}function aa(n,e){const t=Yi(ld(n,e)),i=na(n.transactionQueueTree_,e);return U_(i,s=>{Nr(n,s)}),Nr(n,i),Xu(i,s=>{Nr(n,s)}),t}function Nr(n,e){const t=ni(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(H(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(H(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(Wt(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Ju(e,void 0):t.length=r+1,st(n.eventQueue_,Yi(e),s);for(let o=0;o<i.length;o++)Xn(i[o])}}/**
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
 */function dv(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function hv(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):We(`Invalid query segment '${t}' in query '${n}'`)}return e}const Ol=function(n,e){const t=fv(n),i=t.namespace;t.domain==="firebase.com"&&Rt(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&Rt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||wm();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new fu(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new _e(t.pathString)}},fv=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let h=n.indexOf("/");h===-1&&(h=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(h,u)),h<u&&(s=dv(n.substring(h,u)));const p=hv(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const f=e.slice(0,c);if(f.toLowerCase()==="localhost")t="localhost";else if(f.split(".").length<=2)t=f;else{const w=e.indexOf(".");i=e.substring(0,w).toLowerCase(),t=e.substring(w+1),r=i}"ns"in p&&(r=p.ns)}return{host:e,port:l,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
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
 */const Dl="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",pv=function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Dl.charAt(t%64),t=Math.floor(t/64);H(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Dl.charAt(e[s]);return H(o.length===20,"nextPushId: Length should be 20."),o}}();/**
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
 */class dd{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Ne(this.snapshot.exportVal())}}class hd{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class la{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return H(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class mv{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new dt;return sv(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){cn("OnDisconnect.remove",this._path);const e=new dt;return Nl(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){cn("OnDisconnect.set",this._path),Vs("OnDisconnect.set",e,this._path,!1);const t=new dt;return Nl(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){cn("OnDisconnect.setWithPriority",this._path),Vs("OnDisconnect.setWithPriority",e,this._path,!1),H_("OnDisconnect.setWithPriority",t);const i=new dt;return rv(this._repo,this._path,e,t,i.wrapCallback(()=>{})),i.promise}update(e){cn("OnDisconnect.update",this._path),nd("OnDisconnect.update",e,this._path);const t=new dt;return ov(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}}/**
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
 */class ca{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return ce(this._path)?null:Lo(this._path)}get ref(){return new yt(this._repo,this._path)}get _queryIdentifier(){const e=vl(this._queryParams),t=Po(e);return t==="{}"?"default":t}get _queryObject(){return vl(this._queryParams)}isEqual(e){if(e=Ue(e),!(e instanceof ca))return!1;const t=this._repo===e._repo,i=Fo(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+sg(this._path)}}class yt extends ca{constructor(e,t){super(e,t,new zo,!1)}get parent(){const e=Eu(this._path);return e===null?null:new yt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Vn{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new _e(e),i=Gn(this.ref,e);return new Vn(this._node.getChild(t),i,Se)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Vn(s,Gn(this.ref,i),Se)))}hasChild(e){const t=new _e(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function ye(n,e){return n=Ue(n),n._checkNotDeleted("ref"),e!==void 0?Gn(n._root,e):n._root}function Gn(n,e){return n=Ue(n),ae(n._path)===null?V_("child","path",e):id("child","path",e),new yt(n._repo,ke(n._path,e))}function In(n){return n=Ue(n),new mv(n._repo,n._path)}function gv(n,e){n=Ue(n),cn("push",n._path),Vs("push",e,n._path,!0);const t=od(n._repo),i=pv(t),s=Gn(n,i),r=Gn(n,i);let o;return e!=null?o=un(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function et(n){return cn("remove",n._path),un(n,null)}function un(n,e){n=Ue(n),cn("set",n._path),Vs("set",e,n._path,!1);const t=new dt;return tv(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function fd(n,e){nd("update",e,n._path);const t=new dt;return nv(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function _v(n){n=Ue(n);const e=new la(()=>{}),t=new Ji(e);return ev(n._repo,n,t).then(i=>new Vn(i,new yt(n._repo,n._path),n._queryParams.getIndex()))}class Ji{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new dd("value",this,new Vn(e.snapshotNode,new yt(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new hd(this,e,t):null}matches(e){return e instanceof Ji?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class ua{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new hd(this,e,t):null}createEvent(e,t){H(e.childName!=null,"Child events should have a childName.");const i=Gn(new yt(t._repo,t._path),e.childName),s=t._queryParams.getIndex();return new dd(e.type,this,new Vn(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof ua?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function vv(n,e,t,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const l=t,c=(h,u)=>{so(n._repo,n,a),l(h,u)};c.userCallback=t.userCallback,c.context=t.context,t=c}const o=new la(t,r||void 0),a=new Ji(o);return av(n._repo,n,a),()=>so(n._repo,n,a)}function Mt(n,e,t,i){return vv(n,"value",e,t,i)}function ro(n,e,t){let i=null;const s=t?new la(t):null;e==="value"?i=new Ji(s):e&&(i=new ua(e,s)),so(n._repo,n,i)}g_(yt);w_(yt);/**
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
 */const yv="FIREBASE_DATABASE_EMULATOR_HOST",oo={};let bv=!1;function wv(n,e,t,i){n.repoInfo_=new fu(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),i&&(n.authTokenProvider_=i)}function Ev(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||Rt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Fe("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Ol(r,s),a=o.repoInfo,l;typeof process<"u"&&el&&(l=el[yv]),l?(r=`http://${l}?ns=${a.namespace}`,o=Ol(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new Nm(n.name,n.options,e);G_("Invalid Firebase Database URL",o),ce(o.path)||Rt("Database URL must point to the root of a Firebase Database (not including a child path).");const h=Cv(a,n,c,new Pm(n.name,t));return new kv(h,n)}function Iv(n,e){const t=oo[e];(!t||t[n.key]!==n)&&Rt(`Database ${e}(${n.repoInfo_}) has already been deleted.`),lv(n),delete t[n.key]}function Cv(n,e,t,i){let s=oo[e.name];s||(s={},oo[e.name]=s);let r=s[n.toURLString()];return r&&Rt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new J_(n,bv,t,i),s[n.toURLString()]=r,r}class kv{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Q_(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new yt(this._repo,ge())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Iv(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Rt("Cannot call "+e+" on a deleted database.")}}function Sv(n=fc(),e){const t=yo(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=Wd("database");i&&Tv(t,...i)}return t}function Tv(n,e,t,i={}){n=Ue(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&Rt("Cannot call useEmulator() after instance has already been initialized.");const s=n._repoInternal;let r;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&Rt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new _s(_s.OWNER);else if(i.mockUserToken){const o=typeof i.mockUserToken=="string"?i.mockUserToken:jd(i.mockUserToken,n.app.options.projectId);r=new _s(o)}wv(s,e,t,r)}/**
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
 */function Av(n){mm(Jn),Un(new hn("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Ev(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),Gt(tl,nl,n),Gt(tl,nl,"esm2017")}St.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};St.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Av();var pd={exports:{}};(function(n){var e=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=function(i){var s=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,r=0,o={},a={manual:i.Prism&&i.Prism.manual,disableWorkerMessageHandler:i.Prism&&i.Prism.disableWorkerMessageHandler,util:{encode:function _(b){return b instanceof l?new l(b.type,_(b.content),b.alias):Array.isArray(b)?b.map(_):b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(_){return Object.prototype.toString.call(_).slice(8,-1)},objId:function(_){return _.__id||Object.defineProperty(_,"__id",{value:++r}),_.__id},clone:function _(b,C){C=C||{};var k,T;switch(a.util.type(b)){case"Object":if(T=a.util.objId(b),C[T])return C[T];k={},C[T]=k;for(var x in b)b.hasOwnProperty(x)&&(k[x]=_(b[x],C));return k;case"Array":return T=a.util.objId(b),C[T]?C[T]:(k=[],C[T]=k,b.forEach(function(L,A){k[A]=_(L,C)}),k);default:return b}},getLanguage:function(_){for(;_;){var b=s.exec(_.className);if(b)return b[1].toLowerCase();_=_.parentElement}return"none"},setLanguage:function(_,b){_.className=_.className.replace(RegExp(s,"gi"),""),_.classList.add("language-"+b)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(k){var _=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(k.stack)||[])[1];if(_){var b=document.getElementsByTagName("script");for(var C in b)if(b[C].src==_)return b[C]}return null}},isActive:function(_,b,C){for(var k="no-"+b;_;){var T=_.classList;if(T.contains(b))return!0;if(T.contains(k))return!1;_=_.parentElement}return!!C}},languages:{plain:o,plaintext:o,text:o,txt:o,extend:function(_,b){var C=a.util.clone(a.languages[_]);for(var k in b)C[k]=b[k];return C},insertBefore:function(_,b,C,k){k=k||a.languages;var T=k[_],x={};for(var L in T)if(T.hasOwnProperty(L)){if(L==b)for(var A in C)C.hasOwnProperty(A)&&(x[A]=C[A]);C.hasOwnProperty(L)||(x[L]=T[L])}var B=k[_];return k[_]=x,a.languages.DFS(a.languages,function(Z,S){S===B&&Z!=_&&(this[Z]=x)}),x},DFS:function _(b,C,k,T){T=T||{};var x=a.util.objId;for(var L in b)if(b.hasOwnProperty(L)){C.call(b,L,b[L],k||L);var A=b[L],B=a.util.type(A);B==="Object"&&!T[x(A)]?(T[x(A)]=!0,_(A,C,null,T)):B==="Array"&&!T[x(A)]&&(T[x(A)]=!0,_(A,C,L,T))}}},plugins:{},highlightAll:function(_,b){a.highlightAllUnder(document,_,b)},highlightAllUnder:function(_,b,C){var k={callback:C,container:_,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};a.hooks.run("before-highlightall",k),k.elements=Array.prototype.slice.apply(k.container.querySelectorAll(k.selector)),a.hooks.run("before-all-elements-highlight",k);for(var T=0,x;x=k.elements[T++];)a.highlightElement(x,b===!0,k.callback)},highlightElement:function(_,b,C){var k=a.util.getLanguage(_),T=a.languages[k];a.util.setLanguage(_,k);var x=_.parentElement;x&&x.nodeName.toLowerCase()==="pre"&&a.util.setLanguage(x,k);var L=_.textContent,A={element:_,language:k,grammar:T,code:L};function B(S){A.highlightedCode=S,a.hooks.run("before-insert",A),A.element.innerHTML=A.highlightedCode,a.hooks.run("after-highlight",A),a.hooks.run("complete",A),C&&C.call(A.element)}if(a.hooks.run("before-sanity-check",A),x=A.element.parentElement,x&&x.nodeName.toLowerCase()==="pre"&&!x.hasAttribute("tabindex")&&x.setAttribute("tabindex","0"),!A.code){a.hooks.run("complete",A),C&&C.call(A.element);return}if(a.hooks.run("before-highlight",A),!A.grammar){B(a.util.encode(A.code));return}if(b&&i.Worker){var Z=new Worker(a.filename);Z.onmessage=function(S){B(S.data)},Z.postMessage(JSON.stringify({language:A.language,code:A.code,immediateClose:!0}))}else B(a.highlight(A.code,A.grammar,A.language))},highlight:function(_,b,C){var k={code:_,grammar:b,language:C};if(a.hooks.run("before-tokenize",k),!k.grammar)throw new Error('The language "'+k.language+'" has no grammar.');return k.tokens=a.tokenize(k.code,k.grammar),a.hooks.run("after-tokenize",k),l.stringify(a.util.encode(k.tokens),k.language)},tokenize:function(_,b){var C=b.rest;if(C){for(var k in C)b[k]=C[k];delete b.rest}var T=new u;return p(T,T.head,_),h(_,T,b,T.head,0),w(T)},hooks:{all:{},add:function(_,b){var C=a.hooks.all;C[_]=C[_]||[],C[_].push(b)},run:function(_,b){var C=a.hooks.all[_];if(!(!C||!C.length))for(var k=0,T;T=C[k++];)T(b)}},Token:l};i.Prism=a;function l(_,b,C,k){this.type=_,this.content=b,this.alias=C,this.length=(k||"").length|0}l.stringify=function _(b,C){if(typeof b=="string")return b;if(Array.isArray(b)){var k="";return b.forEach(function(B){k+=_(B,C)}),k}var T={type:b.type,content:_(b.content,C),tag:"span",classes:["token",b.type],attributes:{},language:C},x=b.alias;x&&(Array.isArray(x)?Array.prototype.push.apply(T.classes,x):T.classes.push(x)),a.hooks.run("wrap",T);var L="";for(var A in T.attributes)L+=" "+A+'="'+(T.attributes[A]||"").replace(/"/g,"&quot;")+'"';return"<"+T.tag+' class="'+T.classes.join(" ")+'"'+L+">"+T.content+"</"+T.tag+">"};function c(_,b,C,k){_.lastIndex=b;var T=_.exec(C);if(T&&k&&T[1]){var x=T[1].length;T.index+=x,T[0]=T[0].slice(x)}return T}function h(_,b,C,k,T,x){for(var L in C)if(!(!C.hasOwnProperty(L)||!C[L])){var A=C[L];A=Array.isArray(A)?A:[A];for(var B=0;B<A.length;++B){if(x&&x.cause==L+","+B)return;var Z=A[B],S=Z.inside,F=!!Z.lookbehind,m=!!Z.greedy,U=Z.alias;if(m&&!Z.pattern.global){var oe=Z.pattern.toString().match(/[imsuy]*$/)[0];Z.pattern=RegExp(Z.pattern.source,oe+"g")}for(var j=Z.pattern||Z,X=k.next,$=T;X!==b.tail&&!(x&&$>=x.reach);$+=X.value.length,X=X.next){var ee=X.value;if(b.length>_.length)return;if(!(ee instanceof l)){var O=1,P;if(m){if(P=c(j,$,_,F),!P||P.index>=_.length)break;var we=P.index,te=P.index+P[0].length,K=$;for(K+=X.value.length;we>=K;)X=X.next,K+=X.value.length;if(K-=X.value.length,$=K,X.value instanceof l)continue;for(var G=X;G!==b.tail&&(K<te||typeof G.value=="string");G=G.next)O++,K+=G.value.length;O--,ee=_.slice($,K),P.index-=$}else if(P=c(j,0,ee,F),!P)continue;var we=P.index,Re=P[0],le=ee.slice(0,we),pe=ee.slice(we+Re.length),Te=$+ee.length;x&&Te>x.reach&&(x.reach=Te);var Ee=X.prev;le&&(Ee=p(b,Ee,le),$+=le.length),f(b,Ee,O);var Je=new l(L,S?a.tokenize(Re,S):Re,U,Re);if(X=p(b,Ee,Je),pe&&p(b,X,pe),O>1){var ze={cause:L+","+B,reach:Te};h(_,b,C,X.prev,$,ze),x&&ze.reach>x.reach&&(x.reach=ze.reach)}}}}}}function u(){var _={value:null,prev:null,next:null},b={value:null,prev:_,next:null};_.next=b,this.head=_,this.tail=b,this.length=0}function p(_,b,C){var k=b.next,T={value:C,prev:b,next:k};return b.next=T,k.prev=T,_.length++,T}function f(_,b,C){for(var k=b.next,T=0;T<C&&k!==_.tail;T++)k=k.next;b.next=k,k.prev=b,_.length-=T}function w(_){for(var b=[],C=_.head.next;C!==_.tail;)b.push(C.value),C=C.next;return b}if(!i.document)return i.addEventListener&&(a.disableWorkerMessageHandler||i.addEventListener("message",function(_){var b=JSON.parse(_.data),C=b.language,k=b.code,T=b.immediateClose;i.postMessage(a.highlight(k,a.languages[C],C)),T&&i.close()},!1)),a;var g=a.util.currentScript();g&&(a.filename=g.src,g.hasAttribute("data-manual")&&(a.manual=!0));function y(){a.manual||a.highlightAll()}if(!a.manual){var v=document.readyState;v==="loading"||v==="interactive"&&g&&g.defer?document.addEventListener("DOMContentLoaded",y):window.requestAnimationFrame?window.requestAnimationFrame(y):window.setTimeout(y,16)}return a}(e);n.exports&&(n.exports=t),typeof Rn<"u"&&(Rn.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(i){i.type==="entity"&&(i.attributes.title=i.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(s,r){var o={};o["language-"+r]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[r]},o.cdata=/^<!\[CDATA\[|\]\]>$/i;var a={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:o}};a["language-"+r]={pattern:/[\s\S]+/,inside:t.languages[r]};var l={};l[s]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return s}),"i"),lookbehind:!0,greedy:!0,inside:a},t.languages.insertBefore("markup","cdata",l)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(i,s){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+i+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[s,"language-"+s],inside:t.languages[s]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,function(i){var s=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;i.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+s.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+s.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+s.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+s.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:s,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},i.languages.css.atrule.inside.rest=i.languages.css;var r=i.languages.markup;r&&(r.tag.addInlined("style","css"),r.tag.addAttribute("style","css"))}(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var i="Loading…",s=function(g,y){return"✖ Error "+g+" while fetching file: "+y},r="✖ Error: File does not exist or is empty",o={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},a="data-src-status",l="loading",c="loaded",h="failed",u="pre[data-src]:not(["+a+'="'+c+'"]):not(['+a+'="'+l+'"])';function p(g,y,v){var _=new XMLHttpRequest;_.open("GET",g,!0),_.onreadystatechange=function(){_.readyState==4&&(_.status<400&&_.responseText?y(_.responseText):_.status>=400?v(s(_.status,_.statusText)):v(r))},_.send(null)}function f(g){var y=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(g||"");if(y){var v=Number(y[1]),_=y[2],b=y[3];return _?b?[v,Number(b)]:[v,void 0]:[v,v]}}t.hooks.add("before-highlightall",function(g){g.selector+=", "+u}),t.hooks.add("before-sanity-check",function(g){var y=g.element;if(y.matches(u)){g.code="",y.setAttribute(a,l);var v=y.appendChild(document.createElement("CODE"));v.textContent=i;var _=y.getAttribute("data-src"),b=g.language;if(b==="none"){var C=(/\.(\w+)$/.exec(_)||[,"none"])[1];b=o[C]||C}t.util.setLanguage(v,b),t.util.setLanguage(y,b);var k=t.plugins.autoloader;k&&k.loadLanguages(b),p(_,function(T){y.setAttribute(a,c);var x=f(y.getAttribute("data-range"));if(x){var L=T.split(/\r\n?|\n/g),A=x[0],B=x[1]==null?L.length:x[1];A<0&&(A+=L.length),A=Math.max(0,Math.min(A-1,L.length)),B<0&&(B+=L.length),B=Math.max(0,Math.min(B,L.length)),T=L.slice(A,B).join(`
`),y.hasAttribute("data-start")||y.setAttribute("data-start",String(A+1))}v.textContent=T,t.highlightElement(v)},function(T){y.setAttribute(a,h),v.textContent=T})}}),t.plugins.fileHighlight={highlight:function(y){for(var v=(y||document).querySelectorAll(u),_=0,b;b=v[_++];)t.highlightElement(b)}};var w=!1;t.fileHighlight=function(){w||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),w=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}}()})(pd);var Rv=pd.exports;const Ll=gc(Rv);Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/});Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}});Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}});Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript"));Prism.languages.js=Prism.languages.javascript;(function(n){n.languages.typescript=n.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),n.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete n.languages.typescript.parameter,delete n.languages.typescript["literal-property"];var e=n.languages.extend("typescript",{});delete e["class-name"],n.languages.typescript["class-name"].inside=e,n.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:e}}}}),n.languages.ts=n.languages.typescript})(Prism);Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/};Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python;Prism.languages.py=Prism.languages.python;(function(n){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;n.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+e.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},n.languages.css.atrule.inside.rest=n.languages.css;var t=n.languages.markup;t&&(t.tag.addInlined("style","css"),t.tag.addAttribute("style","css"))})(Prism);Prism.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]};Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity;Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup;Prism.hooks.add("wrap",function(n){n.type==="entity"&&(n.attributes.title=n.content.replace(/&amp;/,"&"))});Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(e,t){var i={};i["language-"+t]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[t]},i.cdata=/^<!\[CDATA\[|\]\]>$/i;var s={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:i}};s["language-"+t]={pattern:/[\s\S]+/,inside:Prism.languages[t]};var r={};r[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:s},Prism.languages.insertBefore("markup","cdata",r)}});Object.defineProperty(Prism.languages.markup.tag,"addAttribute",{value:function(n,e){Prism.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+n+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:Prism.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}});Prism.languages.html=Prism.languages.markup;Prism.languages.mathml=Prism.languages.markup;Prism.languages.svg=Prism.languages.markup;Prism.languages.xml=Prism.languages.extend("markup",{});Prism.languages.ssml=Prism.languages.xml;Prism.languages.atom=Prism.languages.xml;Prism.languages.rss=Prism.languages.xml;Prism.languages.json={property:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,lookbehind:!0,greedy:!0},string:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,lookbehind:!0,greedy:!0},comment:{pattern:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},number:/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}};Prism.languages.webmanifest=Prism.languages.json;class xv{constructor(e,t,i,s,r){this.auth=e,this.db=t,this.onStatusUpdate=i||(()=>{}),this.onFileReceived=s||(()=>{}),this.onProgress=r||(()=>{}),this.deviceId=this.getOrCreateDeviceId(),this.deviceName=this.detectDeviceName(),this.peerConnection=null,this.dataChannel=null,this.activeDevices={},this.currentMode="AUTO",this.localGoServerUrl=null,this.receiveBuffer=[],this.receivedSize=0,this.incomingFileInfo=null,this.heartbeatTimer=null,this.currentRoomId=null,this.isE2EEEnabled=!0,this.isGuestMode=!1,this.cryptoKey=null}getOrCreateDeviceId(){let e=localStorage.getItem("flickmemo_device_id");return e||(e="dev_"+Math.random().toString(36).substring(2,11)+"_"+Date.now().toString(36),localStorage.setItem("flickmemo_device_id",e)),e}detectDeviceName(){const e=navigator.userAgent.toLowerCase();let t="Web Browser";return e.includes("iphone")?t="iPhone":e.includes("ipad")?t="iPad":e.includes("android")?t="Android":e.includes("macintosh")||e.includes("mac os x")?t="Mac":e.includes("windows")?t="Windows PC":e.includes("linux")&&(t="Linux PC"),`${t} (${this.deviceId.substring(4,8)})`}async initLocalGoServerCheck(){this.localGoServerUrl=null}async generateEncryptionKey(){if(!this.cryptoKey){const e=new TextEncoder().encode("FlickMemo_AES256_GCM_SecretKey_2026"),t=await window.crypto.subtle.digest("SHA-256",e);this.cryptoKey=await window.crypto.subtle.importKey("raw",t,{name:"AES-GCM"},!1,["encrypt","decrypt"])}return this.cryptoKey}async encryptChunk(e){if(!this.isE2EEEnabled)return e;const t=await this.generateEncryptionKey(),i=window.crypto.getRandomValues(new Uint8Array(12)),s=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:i},t,e),r=new Uint8Array(i.byteLength+s.byteLength);return r.set(i,0),r.set(new Uint8Array(s),i.byteLength),r.buffer}async decryptChunk(e){if(!this.isE2EEEnabled)return e;try{const t=await this.generateEncryptionKey(),i=e.slice(0,12),s=e.slice(12);return await window.crypto.subtle.decrypt({name:"AES-GCM",iv:new Uint8Array(i)},t,s)}catch{return e}}startDevicePresence(){var a;if(this.isGuestMode)return;const e=(a=this.auth)==null?void 0:a.currentUser;if(!e)return;const t=ye(this.db,`users/${e.uid}/devices/${this.deviceId}`),i=ye(this.db,`users/${e.uid}/signaling/${this.deviceId}`),s=ye(this.db,`users/${e.uid}/answers/${this.deviceId}`);In(t).remove(),In(i).remove(),In(s).remove();const r=()=>{un(t,{id:this.deviceId,name:this.deviceName,online:!0,updatedAt:Date.now()})};r(),clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(r,2e4),Mt(i,l=>{const c=l.val();c&&c.offer&&(this.handleIncomingOffer(c.fromDeviceId,c.offer,`users/${e.uid}`),et(i))});const o=ye(this.db,`users/${e.uid}/devices`);Mt(o,l=>{const c=l.val()||{};this.activeDevices={};const h=Date.now();Object.keys(c).forEach(u=>{const p=c[u];u!==this.deviceId&&p&&h-(p.updatedAt||0)<25e3?this.activeDevices[u]=p:p&&h-(p.updatedAt||0)>=25e3&&et(ye(this.db,`users/${e.uid}/devices/${u}`))}),this.onStatusUpdate("devices_updated",this.activeDevices)})}joinRoom(e){if(!e)return;this.leaveRoom(),this.currentRoomId=e;const t=ye(this.db,`public_rooms/${e}/members/${this.deviceId}`),i=ye(this.db,`public_rooms/${e}/signaling/${this.deviceId}`),s=ye(this.db,`public_rooms/${e}/answers/${this.deviceId}`);try{In(t).remove().catch(()=>{}),In(i).remove().catch(()=>{}),In(s).remove().catch(()=>{}),un(t,{id:this.deviceId,name:this.deviceName,joinedAt:Date.now()}).catch(o=>{console.warn("Room join warning (public_rooms permission):",o.message)})}catch{}Mt(i,o=>{const a=o.val();a&&a.offer&&(this.handleIncomingOffer(a.fromDeviceId,a.offer,`public_rooms/${e}`),et(i).catch(()=>{}))},o=>{console.warn("Room signaling error:",o.message)});const r=ye(this.db,`public_rooms/${e}/members`);Mt(r,o=>{const a=o.val()||{},l=Object.keys(a).filter(c=>c!==this.deviceId);l.length>0&&this.onStatusUpdate("room_member_joined",{roomId:e,otherDeviceId:l[0]})},o=>{console.warn("Room members error:",o.message)}),this.onStatusUpdate("room_joined",{roomId:e})}leaveRoom(){if(this.currentRoomId){const e=this.currentRoomId;et(ye(this.db,`public_rooms/${e}/members/${this.deviceId}`)),et(ye(this.db,`public_rooms/${e}/signaling/${this.deviceId}`)),et(ye(this.db,`public_rooms/${e}/answers/${this.deviceId}`)),this.currentRoomId=null,this.onStatusUpdate("room_left")}}stopDevicePresence(){var t;clearInterval(this.heartbeatTimer),this.leaveRoom();const e=(t=this.auth)==null?void 0:t.currentUser;e&&(et(ye(this.db,`users/${e.uid}/devices/${this.deviceId}`)),et(ye(this.db,`users/${e.uid}/signaling/${this.deviceId}`)),et(ye(this.db,`users/${e.uid}/answers/${this.deviceId}`)),et(ye(this.db,`users/${e.uid}/candidates/${this.deviceId}`))),this.cleanupPeerConnection()}cleanupPeerConnection(){if(this.dataChannel){try{this.dataChannel.close()}catch{}this.dataChannel=null}if(this.peerConnection){try{this.peerConnection.close()}catch{}this.peerConnection=null}this.receiveBuffer=[],this.receivedSize=0,this.incomingFileInfo=null}determineOptimalMode(e,t){return this.currentMode!=="AUTO"?this.currentMode:e&&e.online?"LAN_P2P":"WAN_P2P"}createPeerConnection(e,t){this.cleanupPeerConnection();const i={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"}]},s=new RTCPeerConnection(i);return s.onicecandidate=r=>{if(r.candidate&&e&&t){const o=ye(this.db,`${t}/candidates/${e}`);gv(o,JSON.stringify(r.candidate))}},s.oniceconnectionstatechange=()=>{s.iceConnectionState==="connected"?this.onStatusUpdate("p2p_connected",{targetDeviceId:e}):(s.iceConnectionState==="failed"||s.iceConnectionState==="disconnected")&&this.onStatusUpdate("p2p_disconnected",{targetDeviceId:e})},s}async connectToDevice(e,t=!1){var c;const i=t&&this.currentRoomId?`public_rooms/${this.currentRoomId}`:(c=this.auth)!=null&&c.currentUser?`users/${this.auth.currentUser.uid}`:null;if(!i)throw new Error("通信パスの初期化に失敗しました。送信権限がありません。");this.peerConnection=this.createPeerConnection(e,i),this.dataChannel=this.peerConnection.createDataChannel("flickmemo_transfer",{ordered:!0}),this.setupDataChannelHandlers(this.dataChannel);const s=await this.peerConnection.createOffer();await this.peerConnection.setLocalDescription(s);const r=ye(this.db,`${i}/signaling/${e}`);await un(r,{fromDeviceId:this.deviceId,offer:JSON.stringify(s),timestamp:Date.now()});const o=ye(this.db,`${i}/answers/${this.deviceId}`),a=async h=>{const u=h.val();if(u&&u.answer)try{const p=JSON.parse(u.answer);this.peerConnection&&this.peerConnection.signalingState==="have-local-offer"&&(await this.peerConnection.setRemoteDescription(p),ro(o,"value",a),et(o))}catch(p){console.warn("setRemoteDescription skipped:",p.message)}};Mt(o,a);const l=ye(this.db,`${i}/candidates/${this.deviceId}`);Mt(l,h=>{const u=h.val()||{};Object.values(u).forEach(async p=>{try{if(this.peerConnection&&this.peerConnection.signalingState!=="closed"){const f=JSON.parse(p);await this.peerConnection.addIceCandidate(f)}}catch{}})})}async handleIncomingOffer(e,t,i){const s=JSON.parse(t);this.peerConnection=this.createPeerConnection(e,i),this.peerConnection.ondatachannel=l=>{this.dataChannel=l.channel,this.setupDataChannelHandlers(this.dataChannel)},await this.peerConnection.setRemoteDescription(s);const r=await this.peerConnection.createAnswer();await this.peerConnection.setLocalDescription(r);const o=ye(this.db,`${i}/answers/${e}`);await un(o,{fromDeviceId:this.deviceId,answer:JSON.stringify(r),timestamp:Date.now()});const a=ye(this.db,`${i}/candidates/${this.deviceId}`);Mt(a,l=>{const c=l.val()||{};Object.values(c).forEach(async h=>{try{if(this.peerConnection&&this.peerConnection.signalingState!=="closed"){const u=JSON.parse(h);await this.peerConnection.addIceCandidate(u)}}catch{}})})}setupDataChannelHandlers(e){e.binaryType="arraybuffer",e.onopen=()=>{this.onStatusUpdate("channel_open")},e.onmessage=async t=>{if(typeof t.data=="string")try{const i=JSON.parse(t.data);if(i.type==="file_header")this.incomingFileInfo=i,this.receiveBuffer=[],this.receivedSize=0,this.onProgress(0,i.size,i.name,"rec");else if(i.type==="file_end"){const s=new Blob(this.receiveBuffer,{type:this.incomingFileInfo.mime||"application/octet-stream"}),r=this.sanitizeFilename(this.incomingFileInfo.name);this.onFileReceived(s,r),this.receiveBuffer=[],this.receivedSize=0,this.incomingFileInfo=null,this.onStatusUpdate("remote_transfer_lock",!1)}else i.type==="TRANSFER_LOCK"?this.onStatusUpdate("remote_transfer_lock",!0):i.type==="TRANSFER_UNLOCK"?this.onStatusUpdate("remote_transfer_lock",!1):i.type==="EXPLICIT_DISCONNECT"&&(this.cleanupPeerConnection(),this.onStatusUpdate("p2p_disconnected"))}catch{}else if(t.data instanceof ArrayBuffer){const i=await this.decryptChunk(t.data);this.receiveBuffer.push(i),this.receivedSize+=i.byteLength,this.incomingFileInfo&&this.onProgress(this.receivedSize,this.incomingFileInfo.size,this.incomingFileInfo.name,"rec")}},e.onclose=()=>{this.onStatusUpdate("channel_close"),this.cleanupPeerConnection()}}sendControlMessage(e){if(this.dataChannel&&this.dataChannel.readyState==="open")try{this.dataChannel.send(JSON.stringify(e))}catch{}}disconnect(){this.sendControlMessage({type:"EXPLICIT_DISCONNECT"}),this.leaveRoom(),this.cleanupPeerConnection(),this.onStatusUpdate("p2p_disconnected")}async sendFileP2P(e){var t;if(this.isGuestMode||!((t=this.auth)!=null&&t.currentUser))throw new Error("ファイルを送信するにはGoogleアカウントでのログインが必要です（ゲストは受信のみ利用可能）。");if(!this.dataChannel||this.dataChannel.readyState!=="open")throw new Error("P2P接続が確立されていません。送信先デバイスを選択してください。");this.sendControlMessage({type:"TRANSFER_LOCK"});try{const s={type:"file_header",name:e.name,size:e.size,mime:e.type||"application/octet-stream"};this.dataChannel.send(JSON.stringify(s));let r=0;const o=e.size;this.dataChannel.bufferedAmountLowThreshold=256*1024,await(async()=>{for(;r<o;){this.dataChannel.bufferedAmount>1024*1024&&await new Promise(u=>{this.dataChannel.onbufferedamountlow=()=>{this.dataChannel.onbufferedamountlow=null,u()}});const c=await e.slice(r,r+65536).arrayBuffer(),h=await this.encryptChunk(c);this.dataChannel.send(h),r+=c.byteLength,this.onProgress(r,o,e.name,"send")}this.dataChannel.send(JSON.stringify({type:"file_end"}))})()}finally{this.sendControlMessage({type:"TRANSFER_UNLOCK"})}}sanitizeFilename(e){if(!e)return"download_file";let t=e.replace(/[\/\?%*:|"<>]/g,"_");return t=t.replace(/\.\./g,"_"),t.trim()||"download_file"}}const Pv="1.3.20",Nv={apiKey:"AIzaSyB1Yt1bCaMmOe84_737RSMcd2NlMkPZLaE",authDomain:"flickmemo-qwe.web.app",databaseURL:"https://flickmemo-qwe-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"flickmemo-qwe",storageBucket:"flickmemo-qwe.firebasestorage.app",messagingSenderId:"998795111125",appId:"1:998795111125:web:8e40535e8f2623283a105c",measurementId:"G-ZDRMZ5VLY9"},md=hc(Nv),Ge=fm(md),ii=Sv(md);let sn=null;function da(n){if(!it||!n||!n.id)return;const e=ye(ii,`users/${it}/notes/${n.id}`);un(e,n)}function Qi(n,e){if(!it||!n||!e)return;const t=ye(ii,`users/${it}/notes/${n}`);fd(t,e)}function ha(n){if(!it||!n)return;const e=ye(ii,`users/${it}/notes/${n}`);et(e)}function Ov(){if(!it)return;const n=ye(ii,`users/${it}/notes`);_v(n).then(e=>{const t=e.val();if(t){const i={};Object.keys(t).forEach(s=>{t[s].deletedAt&&(i[s]=null)}),fd(n,i)}}).catch(e=>console.error("Clear trash error:",e))}const fa=7*24*60*60*1e3,Dv=document.getElementById("splash-screen"),ao=document.getElementById("auth-container"),lo=document.getElementById("app-container"),xt=document.getElementById("main-layout"),Lv=document.getElementById("list-container"),vs=document.getElementById("note-list"),Or=document.getElementById("empty-state"),me=document.getElementById("note-title-input"),ie=document.getElementById("note-body"),Pe=document.getElementById("note-code-view"),Fv=document.getElementById("status-bar"),Mv=document.getElementById("status-text"),Gs=document.getElementById("btn-back"),Oe=document.getElementById("search-input"),co=document.getElementById("auth-loading"),uo=document.getElementById("auth-buttons"),si=document.getElementById("editor-toolbar"),Ye=document.getElementById("char-count"),Ze=document.getElementById("date-display"),Ii=document.getElementById("btn-pin"),Fl=document.getElementById("btn-trash-indicator"),Uv=document.getElementById("btn-copy"),gd=document.getElementById("btn-undo"),_d=document.getElementById("btn-redo"),ho=document.getElementById("btn-restore-trash"),ys=document.getElementById("btn-new"),Ci=document.getElementById("btn-empty-trash"),bs=document.getElementById("trash-notice"),Zt=document.getElementById("tab-notes"),Jt=document.getElementById("tab-trash"),Ml=document.getElementById("btn-header-transfer"),Ul=document.getElementById("btn-back-to-notes"),qn=document.getElementById("transfer-panel"),as=document.getElementById("device-chip-list"),Lt=document.getElementById("dropzone-area"),wt=document.getElementById("file-input"),Bl=document.getElementById("btn-browse-files"),qs=document.getElementById("transfer-progress-card"),Bv=document.getElementById("transfer-filename"),zv=document.getElementById("transfer-speed"),$v=document.getElementById("transfer-progress-fill"),Wv=document.getElementById("transfer-status-label"),jv=document.getElementById("transfer-percent"),ki=document.getElementById("transfer-history-list");let ue=null,ft=null,Dr=0;const dr=document.getElementById("delete-modal"),Hv=document.getElementById("btn-delete-cancel"),Vv=document.getElementById("btn-delete-confirm"),hr=document.getElementById("empty-trash-modal"),Gv=document.getElementById("btn-empty-cancel"),qv=document.getElementById("btn-empty-confirm"),pa=document.getElementById("logout-modal");document.getElementById("btn-logout-trigger");const Kv=document.getElementById("btn-modal-cancel"),Yv=document.getElementById("btn-modal-confirm"),ma=document.getElementById("settings-modal"),Zv=document.getElementById("btn-settings-trigger"),Jv=document.getElementById("btn-settings-close"),Qv=document.getElementById("btn-update-check"),Xv=document.getElementById("app-version-display"),gi=document.getElementById("user-avatar"),vd=document.getElementById("user-name"),yd=document.getElementById("user-email"),Ks=document.getElementById("user-provider-tag"),ey=document.getElementById("btn-settings-logout-action"),Lr=document.getElementById("toast-msg"),ty=document.getElementById("toast-text"),Fr=document.getElementById("btn-toast-action");let Q={},Y=null,Si=null,Ut=null,Be="notes",zl=null,it=null,Pt=null,$l={};function ga(n){if(!n)return;let e=null;const t=()=>{n.classList.add("is-scrolling"),clearTimeout(e),e=setTimeout(()=>{n.classList.remove("is-scrolling")},3e3)};n.addEventListener("scroll",t),n.addEventListener("mousemove",t),n.addEventListener("mouseleave",()=>{clearTimeout(e),e=setTimeout(()=>{n.classList.remove("is-scrolling")},1e3)})}ga(Lv);ga(ie);ga(Pe);function Ke(n,e){Fv.className=`m3-badge status-${n}`,Mv.textContent=e}function he(n,e=null){ty.textContent=n,Lr.classList.remove("hidden"),e?(Fr.classList.remove("hidden"),Fr.onclick=()=>{e(),Lr.classList.add("hidden")}):Fr.classList.add("hidden"),clearTimeout(zl),zl=setTimeout(()=>Lr.classList.add("hidden"),4e3)}window.addEventListener("online",()=>Ke("saving","オンライン復帰・同期中..."));window.addEventListener("offline",()=>Ke("offline","ローカル保存済み"));function ny(){Xv.textContent=`v${Pv}`}function fo(n){const t=`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" fill="#042f66" rx="32"/><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="#a8c7fa" font-size="28" font-family="sans-serif" font-weight="bold">${(n||"U").charAt(0).toUpperCase()}</text></svg>`;return"data:image/svg+xml;utf8,"+encodeURIComponent(t)}function iy(n){if(!n||!n.trim())return!1;const e=[/\bimport\s+[\s\S]*?\s+from\s+["']/,/\bexport\s+(default|const|let|var|function|class)\b/,/\binitializeApp\s*\(/,/\bgetAuth\s*\(/,/\bnew\s+Worker\s*\(/,/\bdocument\.getElementById\s*\(/,/\bwindow\.addEventListener\s*\(/,/\bfunction\s+\w+\s*\(/,/\bconst\s+\w+\s*=\s*/,/\blet\s+\w+\s*=\s*/,/\bclass\s+\w+/,/\bdef\s+\w+\s*\(/];let t=0;for(const i of e)i.test(n)&&t++;return t>=2}function bd(n){const e=n.trim();if(!e)return!1;const t=/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(e),i=/\b(function|const|let|var|if|else|for|while|return|import|export|class|def|async|await)\b/.test(e);return t&&!i}function sy(n){const e=n.trim();if(!e)return!0;if(bd(e))return!1;if(e.startsWith("//")||e.startsWith("/*")||e.startsWith("*")||e.startsWith("#"))return!0;let t=e.replace(/\/\/.*$/,"").replace(/#.*$/,"");t=t.replace(/"[^"]*"/g,'""').replace(/'[^']*'/g,"''");const i=/\b(import|export|const|let|var|function|async|await|return|class|if|else|for|while|def|console|document|window|MutationObserver|initializeApp|getAuth)\b/.test(t),s=/[\{\}\(\)\[\];=><\+\-\*\/]/.test(t);return i||s}function ri(n=!1){const e=ie.value||"";if(!e.trim()){ie.classList.remove("hidden"),Pe.classList.add("hidden");return}const t=Y?Q[Y]:null,i=t&&t.codeCollapsed?t.codeCollapsed:{},s=iy(e),r=/```[\s\S]*?```/.test(e);let o=!1,a="",l=0;if(s){o=!0;const c=!!i.block_0;a=ls("javascript",e.trim(),0,c)}else if(r){o=!0;const c=/```(\w+)?\n([\s\S]*?)```/g;let h=0,u;for(;(u=c.exec(e))!==null;){const f=e.substring(h,u.index);f.trim()&&(a+=`<p>${mt(f)}</p>`);const w=(u[1]||"javascript").toLowerCase(),g=u[2].trim(),y=!!i[`block_${l}`];a+=ls(w,g,l,y),l++,h=u.index+u[0].length}const p=e.substring(h);p.trim()&&(a+=`<p>${mt(p)}</p>`)}else{const c=e.split(`
`);let h=[],u=null;if(c.forEach(p=>{const f=bd(p),w=!f&&sy(p),g=!p.trim();let y="TEXT";if(f?y="TEXT":w?y="CODE":g&&(y=u??"TEXT"),u===null)u=y,h.push(p);else if(u===y)h.push(p);else{const v=h.join(`
`).trim();if(v)if(u==="CODE"){o=!0;const _=!!i[`block_${l}`];a+=ls("javascript",v,l,_),l++}else a+=`<p>${mt(v)}</p>`;h=[p],u=y}}),h.length>0){const p=h.join(`
`).trim();if(p)if(u==="CODE"){o=!0;const f=!!i[`block_${l}`];a+=ls("javascript",p,l,f),l++}else a+=`<p>${mt(p)}</p>`}}o&&(n||document.activeElement!==ie)?(Pe.innerHTML=a,Ll&&Ll.highlightAllUnder(Pe),Pe.querySelectorAll(".copy-code-btn").forEach(c=>{c.onclick=h=>{h.stopPropagation();const u=decodeURIComponent(c.getAttribute("data-code"));navigator.clipboard.writeText(u),he("コードをコピーしました")}}),Pe.querySelectorAll(".collapse-code-btn").forEach(c=>{c.onclick=h=>{h.stopPropagation();const u=c.getAttribute("data-index"),p=Pe.querySelector(`.code-block-wrapper[data-index="${u}"]`);if(t){t.codeCollapsed=t.codeCollapsed||{};const f=!p.classList.contains("is-collapsed");t.codeCollapsed[`block_${u}`]=f,p.classList.toggle("is-collapsed",f),c.querySelector("span").textContent=f?"unfold_more":"unfold_less",t.id&&(Ot(t),Ke("saving","クラウドに保存中..."),Qi(t.id,{codeCollapsed:t.codeCollapsed}))}}}),ie.classList.add("hidden"),Pe.classList.remove("hidden")):(ie.classList.remove("hidden"),Pe.classList.add("hidden"))}Pe.onmouseup=n=>{if(n.target.closest(".copy-code-btn")||n.target.closest(".collapse-code-btn"))return;const e=Pe.getBoundingClientRect();if(n.clientX>=e.right-14)return;const t=window.getSelection();if(t&&t.toString().length>0)return;const i=Pe.scrollTop,s=n.clientY-e.top+i,r=Pe.scrollHeight||1,o=Math.min(1,Math.max(0,s/r)),a=Math.floor(ie.value.length*o);Pe.classList.add("hidden"),ie.classList.remove("hidden"),ie.scrollTop=i,ie.focus({preventScroll:!0}),setTimeout(()=>{ie.setSelectionRange(a,a),ie.scrollTop=i},10)};function ls(n,e,t,i){const s=mt(e);return`
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
  `}function mt(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}let tt=[],qe=-1,Wl=null;function ry(n=""){tt=[n],qe=0,fr()}function oy(n){qe>=0&&tt[qe]===n||(clearTimeout(Wl),Wl=setTimeout(()=>{tt=tt.slice(0,qe+1),tt.push(n),tt.length>25&&tt.shift(),qe=tt.length-1,fr()},300))}function ay(n){if(!n)return;const e=vs.querySelector(".note-item.active");if(!e){Ve(Oe.value);return}const t=Q[n];if(!t)return;const i=e.querySelector(".title");if(i){const s=Ys(t);t.pinned&&Be==="notes"?i.innerHTML=`<span class="material-symbols-outlined pin-icon">push_pin</span> ${mt(s)}`:i.textContent=s}}function wd(n,e){!n||!Q[n]||(Object.assign(Q[n],e),Q[n].updatedAt=Date.now(),ay(n),_a(Q[n]),ya(),Ke("saving","保存中..."),clearTimeout(Pt),Pt=setTimeout(()=>{wn(n)},750))}function wn(n){clearTimeout(Pt),Pt=null;const e=n?Q[n]:Y?Q[Y]:null;if(!e||!e.id)return;Ot(e);const t=$l[e.id];if(t&&t.body===e.body&&t.title===e.title&&t.pinned===e.pinned){Ke("synced","クラウド同期完了");return}$l[e.id]={body:e.body,title:e.title,pinned:e.pinned},Qi(e.id,{body:e.body,title:e.title,pinned:e.pinned,updatedAt:e.updatedAt}),Ke("synced","クラウド同期完了")}function ly(){var n;if(typeof chrome<"u"&&((n=chrome==null?void 0:chrome.action)!=null&&n.setBadgeText)){const e=Object.values(Q).filter(t=>!t.deletedAt).length;chrome.action.setBadgeText({text:e>0?String(e):""}),chrome.action.setBadgeBackgroundColor({color:"#28292a"})}}function Ed(){var n;typeof chrome<"u"&&((n=chrome==null?void 0:chrome.storage)!=null&&n.local)&&chrome.storage.local.get(["pendingQuickNote"],e=>{if(e&&e.pendingQuickNote){const t=e.pendingQuickNote;chrome.storage.local.remove("pendingQuickNote"),_r(!0),Y&&Q[Y]&&(ie.value=t,ba(),wn(Y),he("選択したテキストを新しいメモに追加しました"))}})}function fr(){gd.disabled=qe<=0,_d.disabled=qe>=tt.length-1}function Id(n){if(ie.value=n,!Y||!Q[Y])return;const e={...Q[Y],id:Y,title:Q[Y].title||"",body:n,pinned:Q[Y].pinned||!1,codeCollapsed:Q[Y].codeCollapsed||{},updatedAt:Date.now()};e.id&&(Q[Y]=e,Ot(e),_a(e),ya(),Ve(Oe.value),ri(!0),Ke("saving","クラウドに保存中..."),Qi(Y,{body:n,updatedAt:e.updatedAt}))}gd.onclick=()=>{qe>0&&(qe--,Id(tt[qe]),fr())};_d.onclick=()=>{qe<tt.length-1&&(qe++,Id(tt[qe]),fr())};function Ys(n){if(!n)return"空のメモ";if(n.title&&n.title.trim())return n.title.trim();const e=n.body||"";if(!e.trim())return"空のメモ";const t=e.split(`
`).map(s=>s.trim()).filter(s=>s.length>0);if(t.length===0)return"空のメモ";const i=t[0];return i.replace(/^([#*\-–—•>\d\.\s]+)/,"").trim()||i}function cy(n){if(!n)return"それ以前";const e=new Date,t=new Date(n);if(e.toDateString()===t.toDateString())return"今日";const i=new Date(e);return i.setDate(e.getDate()-1),i.toDateString()===t.toDateString()?"昨日":`${t.getMonth()+1}月${t.getDate()}日`}function Cd(n){if(!n)return"";const e=new Date(n);return`${e.getFullYear()}年${e.getMonth()+1}月${e.getDate()}日`}function uy(n){if(!n)return 7;const e=Date.now()-n,t=fa-e,i=Math.ceil(t/(24*60*60*1e3));return Math.max(0,i)}let Nt=null;const kd=indexedDB.open("FlickMemoDB",1);kd.onupgradeneeded=n=>n.target.result.createObjectStore("notes",{keyPath:"id"});kd.onsuccess=n=>{Nt=n.target.result,dy()};function dy(){if(!Nt)return;const e=Nt.transaction("notes","readonly").objectStore("notes").getAll();e.onsuccess=()=>{Q={},e.result.forEach(t=>Q[t.id]=t),Sd(),oi(),Ve(Oe.value),hy()}}function Ot(n){if(!Nt||!n.id)return;Nt.transaction("notes","readwrite").objectStore("notes").put(n)}function Xi(n){if(!Nt||!n)return;Nt.transaction("notes","readwrite").objectStore("notes").delete(n)}async function jl(){if(Q={},Y=null,Si=null,Ut=null,ie.value="",me.value="",ie.disabled=!0,me.disabled=!0,si.classList.add("hidden"),me.classList.add("hidden"),Ye.classList.add("hidden"),Ze.classList.add("hidden"),Pe.classList.add("hidden"),Ve(""),Nt)return new Promise(n=>{const e=Nt.transaction("notes","readwrite");e.objectStore("notes").clear(),e.oncomplete=()=>n()})}function oi(n=null){let e=!1;Object.values(Q).forEach(t=>{t.id!==n&&!t.deletedAt&&(!t.body||!t.body.trim())&&(!t.title||!t.title.trim())&&(delete Q[t.id],Xi(t.id),ha(t.id),e=!0)}),e&&Ve(Oe.value)}window.addEventListener("beforeunload",()=>{oi()});function hy(){if(Be!=="notes")return;if(window.innerWidth<=768){xt.classList.remove("view-editor"),Gs.classList.add("hidden");return}const e=Object.values(Q).find(t=>!t.deletedAt&&(!t.body||!t.body.trim())&&(!t.title||!t.title.trim()));e?_n(e.id,!0):_r(!0)}function Sd(){const n=Date.now();Object.values(Q).forEach(e=>{e.deletedAt&&n-e.deletedAt>fa&&(delete Q[e.id],Xi(e.id),ha(e.id))})}function Ve(n=""){vs.innerHTML="";const e=Date.now(),t=Object.values(Q).filter(s=>Be==="notes"?!s.deletedAt:!!s.deletedAt&&e-s.deletedAt<=fa).filter(s=>(s.body||"").includes(n)||(s.title||"").includes(n)).sort((s,r)=>{if(Be==="notes"){const o=!!s.pinned,a=!!r.pinned;if(o!==a)return o?-1:1}return(r.updatedAt||0)-(s.updatedAt||0)});if(t.length===0){Or.textContent=Be==="notes"?"メモがありません":"ゴミ箱は空です",Or.classList.remove("hidden");return}else Or.classList.add("hidden");let i="";t.forEach(s=>{let r="",o="";if(Be==="notes"&&s.pinned)r="pinned",o='<span class="material-symbols-outlined" style="font-size:15px; vertical-align:middle; color:var(--m3-primary);">push_pin</span> ピン留め';else{const u=cy(Be==="notes"?s.updatedAt:s.deletedAt);r=u,o=u}if(r!==i){i=r;const u=document.createElement("div");u.className="date-group-header",u.innerHTML=o,vs.appendChild(u)}const a=document.createElement("li");a.className=`note-item ${s.id===Y?"active":""}`,a.onclick=()=>_n(s.id);const l=document.createElement("div");l.className="item-content";const c=document.createElement("span");if(c.className="title",s.pinned&&Be==="notes"?c.innerHTML=`<span class="material-symbols-outlined pin-icon">push_pin</span> ${Ys(s)}`:c.textContent=Ys(s),l.appendChild(c),Be==="trash"){const u=document.createElement("span");u.className="sub-meta";const p=uy(s.deletedAt);u.textContent=`${Cd(s.deletedAt)} 移動 • 残り ${p}日`,l.appendChild(u)}const h=document.createElement("button");h.className="btn-delete",h.title=Be==="notes"?"ゴミ箱へ":"完全削除",h.innerHTML=`<span class="material-symbols-outlined" style="font-size:16px;">${Be==="notes"?"delete":"delete_forever"}</span>`,h.onclick=u=>{u.stopPropagation(),Be==="notes"?fy(s.id):py(s.id)},a.appendChild(l),a.appendChild(h),vs.appendChild(a)})}function _n(n,e=!0,t=!1){Pt&&Y&&Y!==n&&wn(Y),t||oi(n);const i=Y===n;Y=n;const s=Q[n]||{title:"",body:"",pinned:!1,codeCollapsed:{},updatedAt:Date.now()},r=!!s.deletedAt;if(ie.disabled=r,me.disabled=r,ie.scrollTop=0,Pe.scrollTop=0,document.activeElement===me){if(me.value!==(s.title||"")){const o=me.selectionStart,a=me.selectionEnd;me.value=s.title||"",me.setSelectionRange(o,a)}}else me.value=s.title||"";if(document.activeElement===ie){if(ie.value!==(s.body||"")){const o=ie.selectionStart,a=ie.selectionEnd;ie.value=s.body||"",ie.setSelectionRange(o,a)}}else ie.value=s.body||"",i||ry(s.body||"");_a(s),si.classList.remove("hidden"),me.classList.remove("hidden"),Ye.classList.remove("hidden"),Ze.classList.remove("hidden"),r?(ho.classList.remove("hidden"),Ii.classList.add("hidden"),Fl.classList.remove("hidden")):(ho.classList.add("hidden"),Fl.classList.add("hidden"),Ii.classList.remove("hidden"),Ii.classList.toggle("active",!!s.pinned)),ya(),Ve(Oe.value),ri(),window.innerWidth<=768&&(xt.classList.add("view-editor"),Gs.classList.remove("hidden")),e&&!r&&setTimeout(()=>{ie.focus(),ie.setSelectionRange(ie.value.length,ie.value.length)},50)}function _a(n){if(!n)return;const e={...n,title:""},t=Ys(e);me.placeholder=t==="空のメモ"?"タイトル（未入力時は自動抽出）":`自動: ${t}`}me.oninput=()=>{!Y||!Q[Y]||wd(Y,{title:me.value})};function fy(n){Pt&&Y===n&&wn(n),Q[n]&&(Ut={...Q[n]},Q[n].deletedAt=Date.now(),Ot(Q[n]),Qi(n,{deletedAt:Q[n].deletedAt}),Y===n&&(Y=null,me.value="",ie.value="",ie.disabled=!0,me.disabled=!0,si.classList.add("hidden"),me.classList.add("hidden"),Ye.classList.add("hidden"),Ze.classList.add("hidden"),Pe.classList.add("hidden")),Ve(Oe.value),he("メモをゴミ箱に移動しました",()=>{Ut&&(delete Q[Ut.id].deletedAt,Ot(Q[Ut.id]),da(Q[Ut.id]),_n(Ut.id),he("メモを復元しました"),Ut=null)}))}function py(n){Si=n,dr.classList.remove("hidden")}function Td(){if(!Si)return;const n=Si;dr.classList.add("hidden"),delete Q[n],Xi(n),ha(n),he("メモを完全削除しました"),Y===n&&(Y=null,me.value="",ie.value="",ie.disabled=!0,me.disabled=!0,si.classList.add("hidden"),me.classList.add("hidden"),Ye.classList.add("hidden"),Ze.classList.add("hidden"),Pe.classList.add("hidden")),Si=null,Ve(Oe.value)}Vv.onclick=Td;Hv.onclick=()=>dr.classList.add("hidden");Ci.onclick=()=>hr.classList.remove("hidden");Gv.onclick=()=>hr.classList.add("hidden");function Ad(){hr.classList.add("hidden"),Object.values(Q).forEach(n=>{n.deletedAt&&(delete Q[n.id],Xi(n.id))}),Ov(),Y&&(!Q[Y]||Q[Y].deletedAt)&&(Y=null,me.value="",ie.value="",ie.disabled=!0,me.disabled=!0,si.classList.add("hidden"),me.classList.add("hidden"),Ye.classList.add("hidden"),Ze.classList.add("hidden"),Pe.classList.add("hidden")),Ve(Oe.value),he("ゴミ箱を空にしました")}qv.onclick=Ad;window.addEventListener("keydown",n=>{n.key==="Enter"&&(dr.classList.contains("hidden")?hr.classList.contains("hidden")||(n.preventDefault(),Ad()):(n.preventDefault(),Td()))});ho.onclick=()=>{!Y||!Q[Y]||(delete Q[Y].deletedAt,Ot(Q[Y]),da(Q[Y]),he("メモを復元しました"),_n(Y))};function Ti(n){if(!as)return;as.innerHTML="";const e=Object.keys(n||{});if(e.length===0){as.innerHTML='<span class="no-device-text">Googleアカウントの他デバイスを検索中...（他端末でFlickMemoを開くと自動表示）</span>';return}e.forEach(t=>{const i=n[t],s=document.createElement("div");s.className=`device-chip ${ft===t?"selected":""}`,s.innerHTML=`<span class="material-symbols-outlined" style="font-size:16px;">smartphone</span> ${mt(i.name||"端末")}`,s.onclick=async()=>{var r;if(ft===t&&((r=ue==null?void 0:ue.dataChannel)==null?void 0:r.readyState)==="open"){ue.cleanupPeerConnection(),ft=null,Ti(n),he("接続を切断しました");return}if(ft=t,Ti(n),he(`${i.name} へP2P接続を試みています...`),ue)try{await ue.connectToDevice(t)}catch(o){ft=null,Ti(n),he("接続エラー: "+o.message)}},as.appendChild(s)})}let Ai=null;function my(){ki&&(ki.innerHTML='<li class="empty-history">履歴はありません</li>')}function va(){Ai&&clearTimeout(Ai),Ai=setTimeout(()=>{qs&&qs.classList.add("hidden"),my()},3e3)}const Cn=document.getElementById("transfer-step-connect"),kn=document.getElementById("transfer-step-session"),Hl=document.getElementById("session-device-name"),Vl=document.getElementById("btn-disconnect-session"),Ri=document.getElementById("transfer-lock-banner");function xi(n,e){n?(Cn==null||Cn.classList.add("hidden"),kn==null||kn.classList.remove("hidden"),Hl&&(Hl.textContent=`接続中: ${e||"相手端末"}`)):(Cn==null||Cn.classList.remove("hidden"),kn==null||kn.classList.add("hidden"),Ri&&Ri.classList.add("hidden"),Kn&&(Kn.disabled=!1))}Vl&&(Vl.onclick=()=>{ue&&ue.disconnect(),xi(!1),he("接続を切断しました")});function gy(n,e){var t;if(n==="devices_updated")Ti(e);else if(n==="room_member_joined")he("相手端末を検出しました！接続中..."),ue&&e.otherDeviceId&&ue.connectToDevice(e.otherDeviceId,!0);else if(n==="channel_open"){he("P2P転送チャネルが開きました（接続完了）");const i=ft&&((t=ue==null?void 0:ue.activeDevices[ft])==null?void 0:t.name);xi(!0,i)}else if(n==="channel_close"||n==="p2p_disconnected")ft=null,ue&&Ti(ue.activeDevices),he("接続が切断されました"),xi(!1),va();else if(n==="p2p_connected")he("デバイス間P2P接続が確立しました"),xi(!0);else if(n==="remote_transfer_lock"){const i=!!e;Ri&&(i?Ri.classList.remove("hidden"):Ri.classList.add("hidden")),Kn&&(Kn.disabled=i)}}function _y(n,e){const t=URL.createObjectURL(n),i=document.createElement("a");i.href=t,i.download=e,document.body.appendChild(i),i.click(),document.body.removeChild(i),setTimeout(()=>URL.revokeObjectURL(t),5e3),he(`ファイル「${e}」を受信・保存しました`),Rd(e,n.size,"受信"),va()}function vy(n,e,t,i){if(!qs)return;Ai&&clearTimeout(Ai),qs.classList.remove("hidden"),Bv.textContent=`${i==="send"?"送信:":"受信:"} ${t}`;const s=Math.min(100,Math.round(n/e*100));$v.style.width=`${s}%`,jv.textContent=`${s}%`;const r=Date.now();(!Dr||s===0)&&(Dr=r);const o=(r-Dr)/1e3;if(o>.2){const a=(n/1048576/o).toFixed(2);zv.textContent=`${a} MB/s`}Wv.textContent=s>=100?"完了":`${(n/(1024*1024)).toFixed(1)} / ${(e/(1024*1024)).toFixed(1)} MB`,s>=100&&va()}function Rd(n,e,t){if(!ki)return;const i=ki.querySelector(".empty-history");i&&i.remove();const s=document.createElement("li");s.className="transfer-history-item";const r=(e/(1024*1024)).toFixed(2)+" MB",o=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});s.innerHTML=`
        <div>
            <strong>${t==="送信"?"[送信]":"[受信]"} ${mt(n)}</strong>
            <span style="color:var(--m3-text-muted); font-size:0.75rem; margin-left:0.5rem;">(${r})</span>
        </div>
        <span style="color:var(--m3-text-muted); font-size:0.75rem;">${o}</span>
    `,ki.prepend(s)}let ot=[];const Mr=document.getElementById("staged-files-card"),cs=document.getElementById("staged-file-list"),us=document.getElementById("staged-file-count"),Gl=document.getElementById("btn-clear-staged"),ql=document.getElementById("btn-add-more-files"),Kn=document.getElementById("btn-start-send");function pr(){if(!(!Mr||!cs)){if(ot.length===0){Mr.classList.add("hidden"),cs.innerHTML="",us&&(us.textContent="0");return}Mr.classList.remove("hidden"),us&&(us.textContent=ot.length.toString()),cs.innerHTML="",ot.forEach((n,e)=>{const t=document.createElement("li");t.className="staged-file-item";const i=(n.size/(1024*1024)).toFixed(2)+" MB";t.innerHTML=`
            <div>
                <span class="file-name">${mt(n.name)}</span>
                <span class="file-size">(${i})</span>
            </div>
            <button class="btn-remove-staged" title="削除" type="button">
                <span class="material-symbols-outlined" style="font-size:18px;">close</span>
            </button>
        `,t.querySelector(".btn-remove-staged").onclick=()=>{ot.splice(e,1),pr()},cs.appendChild(t)})}}function Kl(n){!n||n.length===0||(Array.from(n).forEach(e=>ot.push(e)),pr(),he(`${n.length} 件のファイルを送信リストに追加しました`))}Lt&&wt&&Bl&&(Bl.onclick=n=>{n.stopPropagation(),wt.click()},Lt.onclick=()=>wt.click(),Lt.ondragover=n=>{n.preventDefault(),Lt.classList.add("dragover")},Lt.ondragleave=()=>Lt.classList.remove("dragover"),Lt.ondrop=n=>{n.preventDefault(),Lt.classList.remove("dragover"),n.dataTransfer.files&&n.dataTransfer.files.length>0&&Kl(n.dataTransfer.files)},wt.onchange=()=>{wt.files&&wt.files.length>0&&(Kl(wt.files),wt.value="")});ql&&(ql.onclick=()=>wt.click());Gl&&(Gl.onclick=()=>{ot=[],pr(),he("送信リストをクリアしました")});Kn&&(Kn.onclick=async()=>{if(ot.length===0){he("送信するファイルを選択してください");return}if(!ue){he("送信機能が準備できていません");return}let n=null;try{if(ot.length===1)n=ot[0];else{he("複数ファイルを軽量ZIP圧縮中...");const i=new _f;ot.forEach(o=>{i.file(o.name,o)});const s=await i.generateAsync({type:"blob",compression:"DEFLATE",compressionOptions:{level:5}}),r=new Date().toISOString().slice(0,10);n=new File([s],`FlickMemo_Files_${r}.zip`,{type:"application/zip"})}const e=ft?ue.activeDevices[ft]:null,t=ue.determineOptimalMode(e,n);he(`モード [${t}] で「${n.name}」の送信を開始します...`),await ue.sendFileP2P(n),Rd(n.name,n.size,"送信"),he(`✅ 「${n.name}」の送信が完了しました！`),ot=[],pr()}catch(e){console.error("Send Error:",e),he("送信失敗: "+(e.message||"接続を確認してください"))}});function mr(){Be="transfer",xt&&xt.classList.add("view-transfer"),qn&&qn.classList.remove("hidden"),Zt==null||Zt.classList.remove("active"),Jt==null||Jt.classList.remove("active"),Ze&&Ze.classList.add("hidden"),Ye&&Ye.classList.add("hidden")}function xd(){Be="notes",xt&&xt.classList.remove("view-transfer"),Zt==null||Zt.classList.add("active"),Jt==null||Jt.classList.remove("active"),ys==null||ys.classList.remove("hidden"),Ci==null||Ci.classList.add("hidden"),bs==null||bs.classList.add("hidden"),qn&&qn.classList.add("hidden"),ie==null||ie.classList.remove("hidden"),me&&me.classList.remove("hidden"),Ve(Oe.value),Y&&Q[Y]&&(Ze&&Ze.classList.remove("hidden"),Ye&&Ye.classList.remove("hidden"),ri(!0))}Ml&&(Ml.onclick=()=>{mr()});Ul&&(Ul.onclick=()=>{xd()});const Xe=document.getElementById("custom-mode-dropdown"),Yl=document.getElementById("dropdown-trigger"),Ft=document.getElementById("dropdown-menu-list"),yy=document.getElementById("selected-mode-text");Yl&&Ft&&(Yl.onclick=n=>{n.stopPropagation(),!Ft.classList.contains("hidden")?(Ft.classList.add("hidden"),Xe==null||Xe.classList.remove("open")):(Ft.classList.remove("hidden"),Xe==null||Xe.classList.add("open"))},document.addEventListener("click",()=>{Ft.classList.add("hidden"),Xe==null||Xe.classList.remove("open")}),Ft.querySelectorAll(".dropdown-menu-item").forEach(n=>{n.onclick=e=>{e.stopPropagation();const t=n.getAttribute("data-value"),i=n.querySelector(".material-symbols-outlined:not(.check-icon)"),s=i?i.textContent.trim():"bolt",r=n.querySelector(".item-title").textContent.trim();Ft.querySelectorAll(".dropdown-menu-item").forEach(a=>{a.classList.remove("selected");const l=a.querySelector(".check-icon");l&&l.classList.add("hidden")}),n.classList.add("selected");const o=n.querySelector(".check-icon");o&&o.classList.remove("hidden"),yy.innerHTML=`<span class="material-symbols-outlined mode-icon">${s}</span> ${mt(r)}`,Ft.classList.add("hidden"),Xe==null||Xe.classList.remove("open"),ue&&(ue.currentMode=t,he(`送信モードを「${r}」に変更しました`))}}));const ds=document.getElementById("btn-target-tab-devices"),jt=document.getElementById("btn-target-tab-room"),Sn=document.getElementById("target-panel-devices"),Tn=document.getElementById("target-panel-room");ds&&jt&&(ds.onclick=()=>{ds.classList.add("active"),jt.classList.remove("active"),Sn==null||Sn.classList.remove("hidden"),Tn==null||Tn.classList.add("hidden")},jt.onclick=()=>{jt.classList.add("active"),ds.classList.remove("active"),Tn==null||Tn.classList.remove("hidden"),Sn==null||Sn.classList.add("hidden")});const Zl=document.getElementById("btn-create-room"),Jl=document.getElementById("btn-join-room"),Ql=document.getElementById("btn-leave-room"),dn=document.getElementById("room-code-input"),An=document.getElementById("room-active-status"),Xl=document.getElementById("room-status-text");function ai(n){n?(An==null||An.classList.remove("hidden"),Xl&&(Xl.textContent=`現在の合言葉: ${n} (接続待機中...)`),dn&&(dn.value=n)):(An==null||An.classList.add("hidden"),dn&&(dn.value=""))}function gr(){return ue||(ue=new xv(Ge,ii,(n,e)=>gy(n,e),(n,e)=>_y(n,e),(n,e,t,i)=>vy(n,e,t,i))),ue&&(ue.isGuestMode=wa),ue}Zl&&(Zl.onclick=()=>{const n=gr();if(!n)return;const e="rm_"+Math.random().toString(36).substring(2,8);n.joinRoom(e),ai(e);const t=`${window.location.origin}${window.location.pathname}?room=${e}`;navigator.clipboard.writeText(t).then(()=>{he(`ルーム ${e} を作成し共有URLをコピーしました！`)}).catch(()=>{he(`ルーム ${e} を作成しました。URL: ${t}`)})});Jl&&(Jl.onclick=()=>{const n=dn==null?void 0:dn.value.trim();if(!n){he("合言葉またはルームIDを入力してください");return}const e=gr();e&&(e.joinRoom(n),ai(n),he(`合言葉「${n}」で接続待機中...`))});Ql&&(Ql.onclick=()=>{ue&&ue.disconnect(),ai(null),xi(!1),he("切断しました")});window.addEventListener("DOMContentLoaded",()=>{const e=new URLSearchParams(window.location.search).get("room");e&&setTimeout(()=>{mr(),ue&&(ue.joinRoom(e),ai(e),he(`共有URL経由でルーム ${e} に自動接続しました！`))},800)});Zt.onclick=xd;Jt.onclick=()=>{Be="trash",xt&&xt.classList.remove("view-transfer"),Jt.classList.add("active"),Zt.classList.remove("active"),ys.classList.add("hidden"),Ci.classList.remove("hidden"),bs.classList.remove("hidden"),qn&&qn.classList.add("hidden"),ie.classList.remove("hidden"),me&&me.classList.remove("hidden"),Ve(Oe.value),Y&&Q[Y]&&(Ze&&Ze.classList.remove("hidden"),Ye&&Ye.classList.remove("hidden"),ri(!0))};Ii.onclick=()=>{if(!Y||!Q[Y]||!Q[Y].id)return;const n=!Q[Y].pinned;Q[Y].pinned=n,Ii.classList.toggle("active",n),Ot(Q[Y]),Ve(Oe.value),Ke("saving","保存中..."),Qi(Y,{pinned:n,updatedAt:Date.now()}),he(n?"メモをピン留めしました":"ピン留めを解除しました")};Uv.onclick=()=>{ie.value&&(navigator.clipboard.writeText(ie.value),he("全文をコピーしました"))};function ya(){if(Ye.textContent=`${ie.value.length} 文字`,Y&&Q[Y]){const n=Q[Y].updatedAt||Date.now();Ze.textContent=Cd(n)}}Gs.onclick=()=>{Pt&&Y&&wn(Y),oi(),xt.classList.remove("view-editor"),Gs.classList.add("hidden")};window.addEventListener("keydown",n=>{((n.ctrlKey||n.metaKey)&&n.key.toLowerCase()==="f"||n.key==="/"&&document.activeElement!==ie&&document.activeElement!==me&&document.activeElement!==Oe)&&(n.preventDefault(),Oe.focus(),Oe.select())});function ba(){if(!Y||!Q[Y])return;const n=ie.value;oy(n),wd(Y,{body:n})}ie.oninput=ba;ie.addEventListener("paste",()=>{setTimeout(()=>{ba(),ri(!0)},50)});ie.onblur=()=>{ri()};Oe.oninput=()=>Ve(Oe.value);function _r(n=!0){Pt&&Y&&wn(Y),oi();const e="note_"+Date.now();Q[e]={id:e,title:"",body:"",pinned:!1,codeCollapsed:{},updatedAt:Date.now()},Ot(Q[e]),_n(e,n),Ke("saving","新規作成中..."),da(Q[e])}document.getElementById("btn-new").onclick=()=>_r(!0);window.addEventListener("keydown",n=>{(n.ctrlKey||n.metaKey)&&n.key.toLowerCase()==="n"&&(n.preventDefault(),Be==="notes"&&_r(!0))});Kv.onclick=()=>pa.classList.add("hidden");Yv.onclick=()=>{pa.classList.add("hidden"),sp(Ge)};document.querySelectorAll(".settings-tab-btn").forEach(n=>{n.onclick=()=>{document.querySelectorAll(".settings-tab-btn").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".tab-content").forEach(t=>t.classList.add("hidden")),n.classList.add("active");const e=n.getAttribute("data-tab");document.getElementById(`tab-content-${e}`).classList.remove("hidden")}});Zv.onclick=()=>{ny(),ma.classList.remove("hidden")};Jv.onclick=()=>ma.classList.add("hidden");ey.onclick=()=>{ma.classList.add("hidden"),pa.classList.remove("hidden")};Qv.onclick=async()=>{Ke("saving","最新コード取得＆キャッシュ完全消去中...");let n="最新";try{const e=await fetch(`./version.json?nocache=${Date.now()}`,{cache:"no-store"});if(e.ok){const t=await e.json();t.version&&(n=`v${t.version}`)}}catch{}try{if("caches"in window){const e=await caches.keys();await Promise.all(e.map(t=>caches.delete(t)))}if("serviceWorker"in navigator){const e=await navigator.serviceWorker.getRegistrations();for(let t of e)await t.unregister()}localStorage.removeItem("flickmemo_version_cache")}catch(e){console.error("Cache clear error:",e)}he(`最新コード (${n}) を取得して再読み込み中...`),setTimeout(()=>{const e=new URL(window.location.href);e.searchParams.set("v",Date.now()),e.searchParams.set("reload","hard"),window.location.replace(e.toString())},400)};Rp(Ge).then(n=>{n&&n.user&&console.log("Redirect login successful:",n.user.email)}).catch(n=>{console.error("Redirect Result Error:",n)});async function by(n){var e;try{co.classList.remove("hidden"),uo.classList.add("hidden");const t=navigator.userAgent,i=/iPad|iPhone|iPod/.test(t)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,s=window.navigator.standalone||window.matchMedia("(display-mode: standalone)").matches;if(typeof chrome<"u"&&((e=chrome==null?void 0:chrome.identity)!=null&&e.launchWebAuthFlow))try{const r=chrome.identity.getRedirectURL(),o=`https://flickmemo-qwe.web.app/auth.html?extension_redirect=${encodeURIComponent(r)}`,a=await new Promise((u,p)=>{chrome.identity.launchWebAuthFlow({url:o,interactive:!0},f=>{var w;chrome.runtime.lastError||!f?p(new Error(((w=chrome.runtime.lastError)==null?void 0:w.message)||"ログイン処理がキャンセルされました")):u(f)})}),l=new URL(a).hash.substring(1),h=new URLSearchParams(l).get("id_token");if(h){const u=ht.credential(h);try{await ss(Ge,mi)}catch(p){console.warn("Persistence warning:",p)}await ep(Ge,u)}else throw new Error("認証トークンを受信できませんでした")}catch(r){console.error("Extension Auth Error:",r),await ss(Ge,mi),await Va(Ge,n)}else if(i||s)await ss(Ge,mi),await Ga(Ge,n);else{try{await ss(Ge,mi)}catch(r){console.warn("Persistence set warning:",r)}try{await Va(Ge,n)}catch(r){if(r.code==="auth/popup-blocked"||r.code==="auth/operation-not-supported-in-this-environment")console.warn("Popup blocked. Falling back to signInWithRedirect..."),await Ga(Ge,n);else throw r}}}catch(t){console.error("Login Error:",t);let i=t.message||"認証に失敗しました";t.code==="auth/popup-closed-by-user"?i="ログイン画面が閉じられました。":t.code==="auth/popup-blocked"?i="ポップアップがブラウザにブロックされました。":t.code==="auth/unauthorized-domain"&&(i="Firebase Console の「Authentication > 設定 > 承認済みドメイン」をご確認ください。"),alert("ログインに失敗しました: "+i),co.classList.add("hidden"),uo.classList.remove("hidden")}}let wa=!1;const ec=document.getElementById("btn-guest-login");ec&&(ec.onclick=()=>{wa=!0;const n=gr();n&&(n.isGuestMode=!0),ao.classList.add("hidden"),lo.classList.remove("hidden"),vd.textContent="ゲストユーザー",yd.textContent="ログインしていません (ローカル保存のみ)",gi.src=fo("Guest"),Ks&&(Ks.textContent="ゲスト"),he("ゲストモード (ローカルメモ / 合言葉受送信対応)"),loadLocalNotesOnly();const t=new URLSearchParams(window.location.search).get("room");t&&n&&(mr(),jt&&jt.click(),n.joinRoom(t),ai(t),he(`共有URL「${t}」に自動接続しました`))});const hs=document.getElementById("toggle-e2ee");hs&&(hs.onchange=()=>{ue&&(ue.isE2EEEnabled=hs.checked,he(hs.checked?"AES-256 E2EE暗号化を有効にしました":"E2EE暗号化をオフにしました"))});document.getElementById("btn-google").onclick=()=>by(new ht);ip(Ge,async n=>{var e;if(Dv.classList.add("hidden"),n){wa=!1,ue&&(ue.isGuestMode=!1),it!==null&&it!==n.uid&&await jl(),it=n.uid,ao.classList.add("hidden"),lo.classList.remove("hidden");const t=n.displayName||((e=n.email)==null?void 0:e.split("@")[0])||"ユーザー",i=n.email||"メールアドレス非公開";vd.textContent=t,yd.textContent=i,gi.onerror=()=>{gi.src=fo(t)},n.photoURL?gi.src=n.photoURL:gi.src=fo(t),Ks&&(Ks.textContent="Google"),sn&&ro(sn),sn=ye(ii,`users/${n.uid}/notes`),Mt(sn,a=>{try{const l=a.val()||{};let c=!1;if(Object.keys(Q).forEach(h=>{l[h]||(delete Q[h],Xi(h),c=!0,Y===h&&(Y=null,me.value="",ie.value="",ie.disabled=!0,me.disabled=!0,si.classList.add("hidden"),me.classList.add("hidden"),Ye.classList.add("hidden"),Ze.classList.add("hidden"),Pe.classList.add("hidden")))}),Object.values(l).forEach(h=>{const u=Q[h.id];(!u||(h.updatedAt||0)>=(u.updatedAt||0))&&(!u||JSON.stringify(u)!==JSON.stringify(h))&&(Q[h.id]=h,Ot(h),c=!0)}),Sd(),c&&Ve(Oe.value),ly(),Y&&Q[Y])_n(Y,!1,!0);else if(!(window.innerWidth<=768)){const u=Object.values(Q).filter(p=>!p.deletedAt).sort((p,f)=>(f.updatedAt||0)-(p.updatedAt||0));u.length>0&&_n(u[0].id,!1,!0)}Ke("synced","クラウド同期完了"),Ed()}catch(l){console.error("onValue processing error:",l),Ke("synced","同期処理中にエラーが発生しました")}},a=>{console.error("Sync Error:",a),Ke("offline","同期オフライン")});const s=gr();s.startDevicePresence();const o=new URLSearchParams(window.location.search).get("room");o&&s&&(mr(),jt&&jt.click(),s.joinRoom(o),ai(o),he(`共有URL「${o}」に自動接続しました`))}else ue&&ue.stopDevicePresence(),await jl(),sn&&(ro(sn),sn=null),it=null,ao.classList.remove("hidden"),lo.classList.add("hidden"),co.classList.add("hidden"),uo.classList.remove("hidden")});function Ea(){ue&&ue.stopDevicePresence(),oi(),Y&&Pt&&wn(Y)}window.addEventListener("beforeunload",Ea);window.addEventListener("pagehide",Ea);document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?Ea():document.visibilityState==="visible"&&Ed()});
