import"./modulepreload-polyfill-B5Qt9EMX.js";var nl={};/**
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
 */const Oc={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const H=function(n,e){if(!n)throw bi(e)},bi=function(n){return new Error("Firebase Database ("+Oc.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
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
 */const Dc=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Eh=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Go={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,h=r>>2,d=(r&3)<<4|a>>4;let p=(a&15)<<2|c>>6,f=c&63;l||(f=64,o||(p=64)),i.push(t[h],t[d],t[p],t[f])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Dc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Eh(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const d=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||c==null||d==null)throw new Ch;const p=r<<2|a>>4;if(i.push(p),c!==64){const f=a<<4&240|c>>2;if(i.push(f),d!==64){const b=c<<6&192|d;i.push(b)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ch extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Fc=function(n){const e=Dc(n);return Go.encodeByteArray(e,!0)},Ys=function(n){return Fc(n).replace(/\./g,"")},Zs=function(n){try{return Go.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Ih(n){return Mc(void 0,n)}function Mc(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!kh(t)||(n[t]=Mc(n[t],e[t]));return n}function kh(n){return n!=="__proto__"}/**
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
 */function Sh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Th=()=>Sh().__FIREBASE_DEFAULTS__,Ah=()=>{if(typeof process>"u"||typeof nl>"u")return;const n=nl.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},xh=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Zs(n[1]);return e&&JSON.parse(e)},qo=()=>{try{return Th()||Ah()||xh()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Uc=n=>{var e,t;return(t=(e=qo())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Rh=n=>{const e=Uc(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Bc=()=>{var n;return(n=qo())===null||n===void 0?void 0:n.config},zc=n=>{var e;return(e=qo())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class vt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function Ph(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Ys(JSON.stringify(t)),Ys(JSON.stringify(o)),""].join(".")}/**
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
 */function Ve(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ko(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ve())}function Nh(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Lh(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function $c(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Oh(){const n=Ve();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Dh(){return Oc.NODE_ADMIN===!0}function Fh(){try{return typeof indexedDB=="object"}catch{return!1}}function Mh(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}/**
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
 */const Uh="FirebaseError";class hn extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Uh,Object.setPrototypeOf(this,hn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,us.prototype.create)}}class us{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Bh(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new hn(s,a,i)}}function Bh(n,e){return n.replace(zh,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const zh=/\{\$([^}]+)}/g;/**
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
 */function ts(n){return JSON.parse(n)}function Ne(n){return JSON.stringify(n)}/**
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
 */const Wc=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=ts(Zs(r[0])||""),t=ts(Zs(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},$h=function(n){const e=Wc(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},Wh=function(n){const e=Wc(n).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function It(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function si(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Js(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Qs(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Xs(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(il(r)&&il(o)){if(!Xs(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function il(n){return n!==null&&typeof n=="object"}/**
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
 */function wi(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
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
 */class jh{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let d=0;d<16;d++)i[d]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let d=16;d<80;d++){const p=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(p<<1|p>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,h;for(let d=0;d<80;d++){d<40?d<20?(c=a^r&(o^a),h=1518500249):(c=r^o^a,h=1859775393):d<60?(c=r&o|a&(r|o),h=2400959708):(c=r^o^a,h=3395469782);const p=(s<<5|s>>>27)+c+l+h+i[d]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=p}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Hh(n,e){const t=new Vh(n,e);return t.subscribe.bind(t)}class Vh{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Gh(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=Vr),s.error===void 0&&(s.error=Vr),s.complete===void 0&&(s.complete=Vr);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Gh(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Vr(){}function ri(n,e){return`${n} failed: ${e} argument `}/**
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
 */const qh=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,H(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Cr=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function Ue(n){return n&&n._delegate?n._delegate:n}class xn{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const pn="[DEFAULT]";/**
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
 */class Kh{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new vt;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Zh(e))try{this.getOrInitializeService({instanceIdentifier:pn})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=pn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=pn){return this.instances.has(e)}getOptions(e=pn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){var i;const s=this.normalizeInstanceIdentifier(t),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Yh(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=pn){return this.component?this.component.multipleInstances?e:pn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Yh(n){return n===pn?void 0:n}function Zh(n){return n.instantiationMode==="EAGER"}/**
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
 */class Jh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Kh(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ye;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ye||(ye={}));const Qh={debug:ye.DEBUG,verbose:ye.VERBOSE,info:ye.INFO,warn:ye.WARN,error:ye.ERROR,silent:ye.SILENT},Xh=ye.INFO,ef={[ye.DEBUG]:"log",[ye.VERBOSE]:"log",[ye.INFO]:"info",[ye.WARN]:"warn",[ye.ERROR]:"error"},tf=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=ef[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Yo{constructor(e){this.name=e,this._logLevel=Xh,this._logHandler=tf,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ye))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Qh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ye.DEBUG,...e),this._logHandler(this,ye.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ye.VERBOSE,...e),this._logHandler(this,ye.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ye.INFO,...e),this._logHandler(this,ye.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ye.WARN,...e),this._logHandler(this,ye.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ye.ERROR,...e),this._logHandler(this,ye.ERROR,...e)}}const nf=(n,e)=>e.some(t=>n instanceof t);let sl,rl;function sf(){return sl||(sl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function rf(){return rl||(rl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const jc=new WeakMap,uo=new WeakMap,Hc=new WeakMap,Gr=new WeakMap,Zo=new WeakMap;function of(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(Zt(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&jc.set(t,n)}).catch(()=>{}),Zo.set(e,n),e}function af(n){if(uo.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});uo.set(n,e)}let ho={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return uo.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Hc.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Zt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function lf(n){ho=n(ho)}function cf(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(qr(this),e,...t);return Hc.set(i,e.sort?e.sort():[e]),Zt(i)}:rf().includes(n)?function(...e){return n.apply(qr(this),e),Zt(jc.get(this))}:function(...e){return Zt(n.apply(qr(this),e))}}function df(n){return typeof n=="function"?cf(n):(n instanceof IDBTransaction&&af(n),nf(n,sf())?new Proxy(n,ho):n)}function Zt(n){if(n instanceof IDBRequest)return of(n);if(Gr.has(n))return Gr.get(n);const e=df(n);return e!==n&&(Gr.set(n,e),Zo.set(e,n)),e}const qr=n=>Zo.get(n);function uf(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=Zt(o);return i&&o.addEventListener("upgradeneeded",l=>{i(Zt(o.result),l.oldVersion,l.newVersion,Zt(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const hf=["get","getKey","getAll","getAllKeys","count"],ff=["put","add","delete","clear"],Kr=new Map;function ol(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Kr.get(e))return Kr.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=ff.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||hf.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return Kr.set(e,r),r}lf(n=>({...n,get:(e,t,i)=>ol(e,t)||n.get(e,t,i),has:(e,t)=>!!ol(e,t)||n.has(e,t)}));/**
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
 */class pf{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(mf(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function mf(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const fo="@firebase/app",al="0.10.13";/**
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
 */const Ot=new Yo("@firebase/app"),gf="@firebase/app-compat",_f="@firebase/analytics-compat",vf="@firebase/analytics",yf="@firebase/app-check-compat",bf="@firebase/app-check",wf="@firebase/auth",Ef="@firebase/auth-compat",Cf="@firebase/database",If="@firebase/data-connect",kf="@firebase/database-compat",Sf="@firebase/functions",Tf="@firebase/functions-compat",Af="@firebase/installations",xf="@firebase/installations-compat",Rf="@firebase/messaging",Pf="@firebase/messaging-compat",Nf="@firebase/performance",Lf="@firebase/performance-compat",Of="@firebase/remote-config",Df="@firebase/remote-config-compat",Ff="@firebase/storage",Mf="@firebase/storage-compat",Uf="@firebase/firestore",Bf="@firebase/vertexai-preview",zf="@firebase/firestore-compat",$f="firebase",Wf="10.14.1";/**
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
 */const po="[DEFAULT]",jf={[fo]:"fire-core",[gf]:"fire-core-compat",[vf]:"fire-analytics",[_f]:"fire-analytics-compat",[bf]:"fire-app-check",[yf]:"fire-app-check-compat",[wf]:"fire-auth",[Ef]:"fire-auth-compat",[Cf]:"fire-rtdb",[If]:"fire-data-connect",[kf]:"fire-rtdb-compat",[Sf]:"fire-fn",[Tf]:"fire-fn-compat",[Af]:"fire-iid",[xf]:"fire-iid-compat",[Rf]:"fire-fcm",[Pf]:"fire-fcm-compat",[Nf]:"fire-perf",[Lf]:"fire-perf-compat",[Of]:"fire-rc",[Df]:"fire-rc-compat",[Ff]:"fire-gcs",[Mf]:"fire-gcs-compat",[Uf]:"fire-fst",[zf]:"fire-fst-compat",[Bf]:"fire-vertex","fire-js":"fire-js",[$f]:"fire-js-all"};/**
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
 */const er=new Map,Hf=new Map,mo=new Map;function ll(n,e){try{n.container.addComponent(e)}catch(t){Ot.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function oi(n){const e=n.name;if(mo.has(e))return Ot.debug(`There were multiple attempts to register component ${e}.`),!1;mo.set(e,n);for(const t of er.values())ll(t,n);for(const t of Hf.values())ll(t,n);return!0}function Jo(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function yt(n){return n.settings!==void 0}/**
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
 */const Vf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Jt=new us("app","Firebase",Vf);/**
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
 */class Gf{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new xn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Jt.create("app-deleted",{appName:this._name})}}/**
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
 */const Ei=Wf;function Vc(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:po,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw Jt.create("bad-app-name",{appName:String(s)});if(t||(t=Bc()),!t)throw Jt.create("no-options");const r=er.get(s);if(r){if(Xs(t,r.options)&&Xs(i,r.config))return r;throw Jt.create("duplicate-app",{appName:s})}const o=new Jh(s);for(const l of mo.values())o.addComponent(l);const a=new Gf(t,i,o);return er.set(s,a),a}function Gc(n=po){const e=er.get(n);if(!e&&n===po&&Bc())return Vc();if(!e)throw Jt.create("no-app",{appName:n});return e}function Qt(n,e,t){var i;let s=(i=jf[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ot.warn(a.join(" "));return}oi(new xn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const qf="firebase-heartbeat-database",Kf=1,ns="firebase-heartbeat-store";let Yr=null;function qc(){return Yr||(Yr=uf(qf,Kf,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ns)}catch(t){console.warn(t)}}}}).catch(n=>{throw Jt.create("idb-open",{originalErrorMessage:n.message})})),Yr}async function Yf(n){try{const t=(await qc()).transaction(ns),i=await t.objectStore(ns).get(Kc(n));return await t.done,i}catch(e){if(e instanceof hn)Ot.warn(e.message);else{const t=Jt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ot.warn(t.message)}}}async function cl(n,e){try{const i=(await qc()).transaction(ns,"readwrite");await i.objectStore(ns).put(e,Kc(n)),await i.done}catch(t){if(t instanceof hn)Ot.warn(t.message);else{const i=Jt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Ot.warn(i.message)}}}function Kc(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Zf=1024,Jf=30*24*60*60*1e3;class Qf{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ep(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=dl();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=Jf}),this._storage.overwrite(this._heartbeatsCache))}catch(i){Ot.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=dl(),{heartbeatsToSend:i,unsentEntries:s}=Xf(this._heartbeatsCache.heartbeats),r=Ys(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return Ot.warn(t),""}}}function dl(){return new Date().toISOString().substring(0,10)}function Xf(n,e=Zf){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),ul(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),ul(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class ep{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Fh()?Mh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Yf(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return cl(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return cl(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function ul(n){return Ys(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function tp(n){oi(new xn("platform-logger",e=>new pf(e),"PRIVATE")),oi(new xn("heartbeat",e=>new Qf(e),"PRIVATE")),Qt(fo,al,n),Qt(fo,al,"esm2017"),Qt("fire-js","")}tp("");var np="firebase",ip="10.14.1";/**
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
 */Qt(np,ip,"app");var Yn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Yc(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}function Ss(n){throw new Error('Could not dynamically require "'+n+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Zc={exports:{}};/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/(function(n,e){(function(t){n.exports=t()})(function(){return function t(i,s,r){function o(c,h){if(!s[c]){if(!i[c]){var d=typeof Ss=="function"&&Ss;if(!h&&d)return d(c,!0);if(a)return a(c,!0);var p=new Error("Cannot find module '"+c+"'");throw p.code="MODULE_NOT_FOUND",p}var f=s[c]={exports:{}};i[c][0].call(f.exports,function(b){var m=i[c][1][b];return o(m||b)},f,f.exports,t,i,s,r)}return s[c].exports}for(var a=typeof Ss=="function"&&Ss,l=0;l<r.length;l++)o(r[l]);return o}({1:[function(t,i,s){var r=t("./utils"),o=t("./support"),a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";s.encode=function(l){for(var c,h,d,p,f,b,m,v=[],y=0,_=l.length,w=_,k=r.getTypeOf(l)!=="string";y<l.length;)w=_-y,d=k?(c=l[y++],h=y<_?l[y++]:0,y<_?l[y++]:0):(c=l.charCodeAt(y++),h=y<_?l.charCodeAt(y++):0,y<_?l.charCodeAt(y++):0),p=c>>2,f=(3&c)<<4|h>>4,b=1<w?(15&h)<<2|d>>6:64,m=2<w?63&d:64,v.push(a.charAt(p)+a.charAt(f)+a.charAt(b)+a.charAt(m));return v.join("")},s.decode=function(l){var c,h,d,p,f,b,m=0,v=0,y="data:";if(l.substr(0,y.length)===y)throw new Error("Invalid base64 input, it looks like a data url.");var _,w=3*(l=l.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(l.charAt(l.length-1)===a.charAt(64)&&w--,l.charAt(l.length-2)===a.charAt(64)&&w--,w%1!=0)throw new Error("Invalid base64 input, bad content length.");for(_=o.uint8array?new Uint8Array(0|w):new Array(0|w);m<l.length;)c=a.indexOf(l.charAt(m++))<<2|(p=a.indexOf(l.charAt(m++)))>>4,h=(15&p)<<4|(f=a.indexOf(l.charAt(m++)))>>2,d=(3&f)<<6|(b=a.indexOf(l.charAt(m++))),_[v++]=c,f!==64&&(_[v++]=h),b!==64&&(_[v++]=d);return _}},{"./support":30,"./utils":32}],2:[function(t,i,s){var r=t("./external"),o=t("./stream/DataWorker"),a=t("./stream/Crc32Probe"),l=t("./stream/DataLengthProbe");function c(h,d,p,f,b){this.compressedSize=h,this.uncompressedSize=d,this.crc32=p,this.compression=f,this.compressedContent=b}c.prototype={getContentWorker:function(){var h=new o(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new l("data_length")),d=this;return h.on("end",function(){if(this.streamInfo.data_length!==d.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),h},getCompressedWorker:function(){return new o(r.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},c.createWorkerFrom=function(h,d,p){return h.pipe(new a).pipe(new l("uncompressedSize")).pipe(d.compressWorker(p)).pipe(new l("compressedSize")).withStreamInfo("compression",d)},i.exports=c},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(t,i,s){var r=t("./stream/GenericWorker");s.STORE={magic:"\0\0",compressWorker:function(){return new r("STORE compression")},uncompressWorker:function(){return new r("STORE decompression")}},s.DEFLATE=t("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(t,i,s){var r=t("./utils"),o=function(){for(var a,l=[],c=0;c<256;c++){a=c;for(var h=0;h<8;h++)a=1&a?3988292384^a>>>1:a>>>1;l[c]=a}return l}();i.exports=function(a,l){return a!==void 0&&a.length?r.getTypeOf(a)!=="string"?function(c,h,d,p){var f=o,b=p+d;c^=-1;for(var m=p;m<b;m++)c=c>>>8^f[255&(c^h[m])];return-1^c}(0|l,a,a.length,0):function(c,h,d,p){var f=o,b=p+d;c^=-1;for(var m=p;m<b;m++)c=c>>>8^f[255&(c^h.charCodeAt(m))];return-1^c}(0|l,a,a.length,0):0}},{"./utils":32}],5:[function(t,i,s){s.base64=!1,s.binary=!1,s.dir=!1,s.createFolders=!0,s.date=null,s.compression=null,s.compressionOptions=null,s.comment=null,s.unixPermissions=null,s.dosPermissions=null},{}],6:[function(t,i,s){var r=null;r=typeof Promise<"u"?Promise:t("lie"),i.exports={Promise:r}},{lie:37}],7:[function(t,i,s){var r=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",o=t("pako"),a=t("./utils"),l=t("./stream/GenericWorker"),c=r?"uint8array":"array";function h(d,p){l.call(this,"FlateWorker/"+d),this._pako=null,this._pakoAction=d,this._pakoOptions=p,this.meta={}}s.magic="\b\0",a.inherits(h,l),h.prototype.processChunk=function(d){this.meta=d.meta,this._pako===null&&this._createPako(),this._pako.push(a.transformTo(c,d.data),!1)},h.prototype.flush=function(){l.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){l.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new o[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var d=this;this._pako.onData=function(p){d.push({data:p,meta:d.meta})}},s.compressWorker=function(d){return new h("Deflate",d)},s.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(t,i,s){function r(f,b){var m,v="";for(m=0;m<b;m++)v+=String.fromCharCode(255&f),f>>>=8;return v}function o(f,b,m,v,y,_){var w,k,I=f.file,T=f.compression,A=_!==c.utf8encode,D=a.transformTo("string",_(I.name)),x=a.transformTo("string",c.utf8encode(I.name)),B=I.comment,Z=a.transformTo("string",_(B)),S=a.transformTo("string",c.utf8encode(B)),F=x.length!==I.name.length,g=S.length!==B.length,U="",ae="",j="",ee=I.dir,$=I.date,ne={crc32:0,compressedSize:0,uncompressedSize:0};b&&!m||(ne.crc32=f.crc32,ne.compressedSize=f.compressedSize,ne.uncompressedSize=f.uncompressedSize);var L=0;b&&(L|=8),A||!F&&!g||(L|=2048);var P=0,ie=0;ee&&(P|=16),y==="UNIX"?(ie=798,P|=function(G,we){var Re=G;return G||(Re=we?16893:33204),(65535&Re)<<16}(I.unixPermissions,ee)):(ie=20,P|=function(G){return 63&(G||0)}(I.dosPermissions)),w=$.getUTCHours(),w<<=6,w|=$.getUTCMinutes(),w<<=5,w|=$.getUTCSeconds()/2,k=$.getUTCFullYear()-1980,k<<=4,k|=$.getUTCMonth()+1,k<<=5,k|=$.getUTCDate(),F&&(ae=r(1,1)+r(h(D),4)+x,U+="up"+r(ae.length,2)+ae),g&&(j=r(1,1)+r(h(Z),4)+S,U+="uc"+r(j.length,2)+j);var K="";return K+=`
\0`,K+=r(L,2),K+=T.magic,K+=r(w,2),K+=r(k,2),K+=r(ne.crc32,4),K+=r(ne.compressedSize,4),K+=r(ne.uncompressedSize,4),K+=r(D.length,2),K+=r(U.length,2),{fileRecord:d.LOCAL_FILE_HEADER+K+D+U,dirRecord:d.CENTRAL_FILE_HEADER+r(ie,2)+K+r(Z.length,2)+"\0\0\0\0"+r(P,4)+r(v,4)+D+U+Z}}var a=t("../utils"),l=t("../stream/GenericWorker"),c=t("../utf8"),h=t("../crc32"),d=t("../signature");function p(f,b,m,v){l.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=b,this.zipPlatform=m,this.encodeFileName=v,this.streamFiles=f,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}a.inherits(p,l),p.prototype.push=function(f){var b=f.meta.percent||0,m=this.entriesCount,v=this._sources.length;this.accumulate?this.contentBuffer.push(f):(this.bytesWritten+=f.data.length,l.prototype.push.call(this,{data:f.data,meta:{currentFile:this.currentFile,percent:m?(b+100*(m-v-1))/m:100}}))},p.prototype.openedSource=function(f){this.currentSourceOffset=this.bytesWritten,this.currentFile=f.file.name;var b=this.streamFiles&&!f.file.dir;if(b){var m=o(f,b,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:m.fileRecord,meta:{percent:0}})}else this.accumulate=!0},p.prototype.closedSource=function(f){this.accumulate=!1;var b=this.streamFiles&&!f.file.dir,m=o(f,b,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(m.dirRecord),b)this.push({data:function(v){return d.DATA_DESCRIPTOR+r(v.crc32,4)+r(v.compressedSize,4)+r(v.uncompressedSize,4)}(f),meta:{percent:100}});else for(this.push({data:m.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},p.prototype.flush=function(){for(var f=this.bytesWritten,b=0;b<this.dirRecords.length;b++)this.push({data:this.dirRecords[b],meta:{percent:100}});var m=this.bytesWritten-f,v=function(y,_,w,k,I){var T=a.transformTo("string",I(k));return d.CENTRAL_DIRECTORY_END+"\0\0\0\0"+r(y,2)+r(y,2)+r(_,4)+r(w,4)+r(T.length,2)+T}(this.dirRecords.length,m,f,this.zipComment,this.encodeFileName);this.push({data:v,meta:{percent:100}})},p.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},p.prototype.registerPrevious=function(f){this._sources.push(f);var b=this;return f.on("data",function(m){b.processChunk(m)}),f.on("end",function(){b.closedSource(b.previous.streamInfo),b._sources.length?b.prepareNextSource():b.end()}),f.on("error",function(m){b.error(m)}),this},p.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},p.prototype.error=function(f){var b=this._sources;if(!l.prototype.error.call(this,f))return!1;for(var m=0;m<b.length;m++)try{b[m].error(f)}catch{}return!0},p.prototype.lock=function(){l.prototype.lock.call(this);for(var f=this._sources,b=0;b<f.length;b++)f[b].lock()},i.exports=p},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(t,i,s){var r=t("../compressions"),o=t("./ZipFileWorker");s.generateWorker=function(a,l,c){var h=new o(l.streamFiles,c,l.platform,l.encodeFileName),d=0;try{a.forEach(function(p,f){d++;var b=function(_,w){var k=_||w,I=r[k];if(!I)throw new Error(k+" is not a valid compression method !");return I}(f.options.compression,l.compression),m=f.options.compressionOptions||l.compressionOptions||{},v=f.dir,y=f.date;f._compressWorker(b,m).withStreamInfo("file",{name:p,dir:v,date:y,comment:f.comment||"",unixPermissions:f.unixPermissions,dosPermissions:f.dosPermissions}).pipe(h)}),h.entriesCount=d}catch(p){h.error(p)}return h}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(t,i,s){function r(){if(!(this instanceof r))return new r;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var o=new r;for(var a in this)typeof this[a]!="function"&&(o[a]=this[a]);return o}}(r.prototype=t("./object")).loadAsync=t("./load"),r.support=t("./support"),r.defaults=t("./defaults"),r.version="3.10.1",r.loadAsync=function(o,a){return new r().loadAsync(o,a)},r.external=t("./external"),i.exports=r},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(t,i,s){var r=t("./utils"),o=t("./external"),a=t("./utf8"),l=t("./zipEntries"),c=t("./stream/Crc32Probe"),h=t("./nodejsUtils");function d(p){return new o.Promise(function(f,b){var m=p.decompressed.getContentWorker().pipe(new c);m.on("error",function(v){b(v)}).on("end",function(){m.streamInfo.crc32!==p.decompressed.crc32?b(new Error("Corrupted zip : CRC32 mismatch")):f()}).resume()})}i.exports=function(p,f){var b=this;return f=r.extend(f||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:a.utf8decode}),h.isNode&&h.isStream(p)?o.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):r.prepareContent("the loaded zip file",p,!0,f.optimizedBinaryString,f.base64).then(function(m){var v=new l(f);return v.load(m),v}).then(function(m){var v=[o.Promise.resolve(m)],y=m.files;if(f.checkCRC32)for(var _=0;_<y.length;_++)v.push(d(y[_]));return o.Promise.all(v)}).then(function(m){for(var v=m.shift(),y=v.files,_=0;_<y.length;_++){var w=y[_],k=w.fileNameStr,I=r.resolve(w.fileNameStr);b.file(I,w.decompressed,{binary:!0,optimizedBinaryString:!0,date:w.date,dir:w.dir,comment:w.fileCommentStr.length?w.fileCommentStr:null,unixPermissions:w.unixPermissions,dosPermissions:w.dosPermissions,createFolders:f.createFolders}),w.dir||(b.file(I).unsafeOriginalName=k)}return v.zipComment.length&&(b.comment=v.zipComment),b})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(t,i,s){var r=t("../utils"),o=t("../stream/GenericWorker");function a(l,c){o.call(this,"Nodejs stream input adapter for "+l),this._upstreamEnded=!1,this._bindStream(c)}r.inherits(a,o),a.prototype._bindStream=function(l){var c=this;(this._stream=l).pause(),l.on("data",function(h){c.push({data:h,meta:{percent:0}})}).on("error",function(h){c.isPaused?this.generatedError=h:c.error(h)}).on("end",function(){c.isPaused?c._upstreamEnded=!0:c.end()})},a.prototype.pause=function(){return!!o.prototype.pause.call(this)&&(this._stream.pause(),!0)},a.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},i.exports=a},{"../stream/GenericWorker":28,"../utils":32}],13:[function(t,i,s){var r=t("readable-stream").Readable;function o(a,l,c){r.call(this,l),this._helper=a;var h=this;a.on("data",function(d,p){h.push(d)||h._helper.pause(),c&&c(p)}).on("error",function(d){h.emit("error",d)}).on("end",function(){h.push(null)})}t("../utils").inherits(o,r),o.prototype._read=function(){this._helper.resume()},i.exports=o},{"../utils":32,"readable-stream":16}],14:[function(t,i,s){i.exports={isNode:typeof Buffer<"u",newBufferFrom:function(r,o){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(r,o);if(typeof r=="number")throw new Error('The "data" argument must not be a number');return new Buffer(r,o)},allocBuffer:function(r){if(Buffer.alloc)return Buffer.alloc(r);var o=new Buffer(r);return o.fill(0),o},isBuffer:function(r){return Buffer.isBuffer(r)},isStream:function(r){return r&&typeof r.on=="function"&&typeof r.pause=="function"&&typeof r.resume=="function"}}},{}],15:[function(t,i,s){function r(I,T,A){var D,x=a.getTypeOf(T),B=a.extend(A||{},h);B.date=B.date||new Date,B.compression!==null&&(B.compression=B.compression.toUpperCase()),typeof B.unixPermissions=="string"&&(B.unixPermissions=parseInt(B.unixPermissions,8)),B.unixPermissions&&16384&B.unixPermissions&&(B.dir=!0),B.dosPermissions&&16&B.dosPermissions&&(B.dir=!0),B.dir&&(I=y(I)),B.createFolders&&(D=v(I))&&_.call(this,D,!0);var Z=x==="string"&&B.binary===!1&&B.base64===!1;A&&A.binary!==void 0||(B.binary=!Z),(T instanceof d&&T.uncompressedSize===0||B.dir||!T||T.length===0)&&(B.base64=!1,B.binary=!0,T="",B.compression="STORE",x="string");var S=null;S=T instanceof d||T instanceof l?T:b.isNode&&b.isStream(T)?new m(I,T):a.prepareContent(I,T,B.binary,B.optimizedBinaryString,B.base64);var F=new p(I,S,B);this.files[I]=F}var o=t("./utf8"),a=t("./utils"),l=t("./stream/GenericWorker"),c=t("./stream/StreamHelper"),h=t("./defaults"),d=t("./compressedObject"),p=t("./zipObject"),f=t("./generate"),b=t("./nodejsUtils"),m=t("./nodejs/NodejsStreamInputAdapter"),v=function(I){I.slice(-1)==="/"&&(I=I.substring(0,I.length-1));var T=I.lastIndexOf("/");return 0<T?I.substring(0,T):""},y=function(I){return I.slice(-1)!=="/"&&(I+="/"),I},_=function(I,T){return T=T!==void 0?T:h.createFolders,I=y(I),this.files[I]||r.call(this,I,null,{dir:!0,createFolders:T}),this.files[I]};function w(I){return Object.prototype.toString.call(I)==="[object RegExp]"}var k={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(I){var T,A,D;for(T in this.files)D=this.files[T],(A=T.slice(this.root.length,T.length))&&T.slice(0,this.root.length)===this.root&&I(A,D)},filter:function(I){var T=[];return this.forEach(function(A,D){I(A,D)&&T.push(D)}),T},file:function(I,T,A){if(arguments.length!==1)return I=this.root+I,r.call(this,I,T,A),this;if(w(I)){var D=I;return this.filter(function(B,Z){return!Z.dir&&D.test(B)})}var x=this.files[this.root+I];return x&&!x.dir?x:null},folder:function(I){if(!I)return this;if(w(I))return this.filter(function(x,B){return B.dir&&I.test(x)});var T=this.root+I,A=_.call(this,T),D=this.clone();return D.root=A.name,D},remove:function(I){I=this.root+I;var T=this.files[I];if(T||(I.slice(-1)!=="/"&&(I+="/"),T=this.files[I]),T&&!T.dir)delete this.files[I];else for(var A=this.filter(function(x,B){return B.name.slice(0,I.length)===I}),D=0;D<A.length;D++)delete this.files[A[D].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(I){var T,A={};try{if((A=a.extend(I||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:o.utf8encode})).type=A.type.toLowerCase(),A.compression=A.compression.toUpperCase(),A.type==="binarystring"&&(A.type="string"),!A.type)throw new Error("No output type specified.");a.checkSupport(A.type),A.platform!=="darwin"&&A.platform!=="freebsd"&&A.platform!=="linux"&&A.platform!=="sunos"||(A.platform="UNIX"),A.platform==="win32"&&(A.platform="DOS");var D=A.comment||this.comment||"";T=f.generateWorker(this,A,D)}catch(x){(T=new l("error")).error(x)}return new c(T,A.type||"string",A.mimeType)},generateAsync:function(I,T){return this.generateInternalStream(I).accumulate(T)},generateNodeStream:function(I,T){return(I=I||{}).type||(I.type="nodebuffer"),this.generateInternalStream(I).toNodejsStream(T)}};i.exports=k},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(t,i,s){i.exports=t("stream")},{stream:void 0}],17:[function(t,i,s){var r=t("./DataReader");function o(a){r.call(this,a);for(var l=0;l<this.data.length;l++)a[l]=255&a[l]}t("../utils").inherits(o,r),o.prototype.byteAt=function(a){return this.data[this.zero+a]},o.prototype.lastIndexOfSignature=function(a){for(var l=a.charCodeAt(0),c=a.charCodeAt(1),h=a.charCodeAt(2),d=a.charCodeAt(3),p=this.length-4;0<=p;--p)if(this.data[p]===l&&this.data[p+1]===c&&this.data[p+2]===h&&this.data[p+3]===d)return p-this.zero;return-1},o.prototype.readAndCheckSignature=function(a){var l=a.charCodeAt(0),c=a.charCodeAt(1),h=a.charCodeAt(2),d=a.charCodeAt(3),p=this.readData(4);return l===p[0]&&c===p[1]&&h===p[2]&&d===p[3]},o.prototype.readData=function(a){if(this.checkOffset(a),a===0)return[];var l=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,l},i.exports=o},{"../utils":32,"./DataReader":18}],18:[function(t,i,s){var r=t("../utils");function o(a){this.data=a,this.length=a.length,this.index=0,this.zero=0}o.prototype={checkOffset:function(a){this.checkIndex(this.index+a)},checkIndex:function(a){if(this.length<this.zero+a||a<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+a+"). Corrupted zip ?")},setIndex:function(a){this.checkIndex(a),this.index=a},skip:function(a){this.setIndex(this.index+a)},byteAt:function(){},readInt:function(a){var l,c=0;for(this.checkOffset(a),l=this.index+a-1;l>=this.index;l--)c=(c<<8)+this.byteAt(l);return this.index+=a,c},readString:function(a){return r.transformTo("string",this.readData(a))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var a=this.readInt(4);return new Date(Date.UTC(1980+(a>>25&127),(a>>21&15)-1,a>>16&31,a>>11&31,a>>5&63,(31&a)<<1))}},i.exports=o},{"../utils":32}],19:[function(t,i,s){var r=t("./Uint8ArrayReader");function o(a){r.call(this,a)}t("../utils").inherits(o,r),o.prototype.readData=function(a){this.checkOffset(a);var l=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,l},i.exports=o},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(t,i,s){var r=t("./DataReader");function o(a){r.call(this,a)}t("../utils").inherits(o,r),o.prototype.byteAt=function(a){return this.data.charCodeAt(this.zero+a)},o.prototype.lastIndexOfSignature=function(a){return this.data.lastIndexOf(a)-this.zero},o.prototype.readAndCheckSignature=function(a){return a===this.readData(4)},o.prototype.readData=function(a){this.checkOffset(a);var l=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,l},i.exports=o},{"../utils":32,"./DataReader":18}],21:[function(t,i,s){var r=t("./ArrayReader");function o(a){r.call(this,a)}t("../utils").inherits(o,r),o.prototype.readData=function(a){if(this.checkOffset(a),a===0)return new Uint8Array(0);var l=this.data.subarray(this.zero+this.index,this.zero+this.index+a);return this.index+=a,l},i.exports=o},{"../utils":32,"./ArrayReader":17}],22:[function(t,i,s){var r=t("../utils"),o=t("../support"),a=t("./ArrayReader"),l=t("./StringReader"),c=t("./NodeBufferReader"),h=t("./Uint8ArrayReader");i.exports=function(d){var p=r.getTypeOf(d);return r.checkSupport(p),p!=="string"||o.uint8array?p==="nodebuffer"?new c(d):o.uint8array?new h(r.transformTo("uint8array",d)):new a(r.transformTo("array",d)):new l(d)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(t,i,s){s.LOCAL_FILE_HEADER="PK",s.CENTRAL_FILE_HEADER="PK",s.CENTRAL_DIRECTORY_END="PK",s.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",s.ZIP64_CENTRAL_DIRECTORY_END="PK",s.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(t,i,s){var r=t("./GenericWorker"),o=t("../utils");function a(l){r.call(this,"ConvertWorker to "+l),this.destType=l}o.inherits(a,r),a.prototype.processChunk=function(l){this.push({data:o.transformTo(this.destType,l.data),meta:l.meta})},i.exports=a},{"../utils":32,"./GenericWorker":28}],25:[function(t,i,s){var r=t("./GenericWorker"),o=t("../crc32");function a(){r.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}t("../utils").inherits(a,r),a.prototype.processChunk=function(l){this.streamInfo.crc32=o(l.data,this.streamInfo.crc32||0),this.push(l)},i.exports=a},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(t,i,s){var r=t("../utils"),o=t("./GenericWorker");function a(l){o.call(this,"DataLengthProbe for "+l),this.propName=l,this.withStreamInfo(l,0)}r.inherits(a,o),a.prototype.processChunk=function(l){if(l){var c=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=c+l.data.length}o.prototype.processChunk.call(this,l)},i.exports=a},{"../utils":32,"./GenericWorker":28}],27:[function(t,i,s){var r=t("../utils"),o=t("./GenericWorker");function a(l){o.call(this,"DataWorker");var c=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,l.then(function(h){c.dataIsReady=!0,c.data=h,c.max=h&&h.length||0,c.type=r.getTypeOf(h),c.isPaused||c._tickAndRepeat()},function(h){c.error(h)})}r.inherits(a,o),a.prototype.cleanUp=function(){o.prototype.cleanUp.call(this),this.data=null},a.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,r.delay(this._tickAndRepeat,[],this)),!0)},a.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(r.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},a.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var l=null,c=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":l=this.data.substring(this.index,c);break;case"uint8array":l=this.data.subarray(this.index,c);break;case"array":case"nodebuffer":l=this.data.slice(this.index,c)}return this.index=c,this.push({data:l,meta:{percent:this.max?this.index/this.max*100:0}})},i.exports=a},{"../utils":32,"./GenericWorker":28}],28:[function(t,i,s){function r(o){this.name=o||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}r.prototype={push:function(o){this.emit("data",o)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(o){this.emit("error",o)}return!0},error:function(o){return!this.isFinished&&(this.isPaused?this.generatedError=o:(this.isFinished=!0,this.emit("error",o),this.previous&&this.previous.error(o),this.cleanUp()),!0)},on:function(o,a){return this._listeners[o].push(a),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(o,a){if(this._listeners[o])for(var l=0;l<this._listeners[o].length;l++)this._listeners[o][l].call(this,a)},pipe:function(o){return o.registerPrevious(this)},registerPrevious:function(o){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=o.streamInfo,this.mergeStreamInfo(),this.previous=o;var a=this;return o.on("data",function(l){a.processChunk(l)}),o.on("end",function(){a.end()}),o.on("error",function(l){a.error(l)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var o=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),o=!0),this.previous&&this.previous.resume(),!o},flush:function(){},processChunk:function(o){this.push(o)},withStreamInfo:function(o,a){return this.extraStreamInfo[o]=a,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var o in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,o)&&(this.streamInfo[o]=this.extraStreamInfo[o])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var o="Worker "+this.name;return this.previous?this.previous+" -> "+o:o}},i.exports=r},{}],29:[function(t,i,s){var r=t("../utils"),o=t("./ConvertWorker"),a=t("./GenericWorker"),l=t("../base64"),c=t("../support"),h=t("../external"),d=null;if(c.nodestream)try{d=t("../nodejs/NodejsStreamOutputAdapter")}catch{}function p(b,m){return new h.Promise(function(v,y){var _=[],w=b._internalType,k=b._outputType,I=b._mimeType;b.on("data",function(T,A){_.push(T),m&&m(A)}).on("error",function(T){_=[],y(T)}).on("end",function(){try{var T=function(A,D,x){switch(A){case"blob":return r.newBlob(r.transformTo("arraybuffer",D),x);case"base64":return l.encode(D);default:return r.transformTo(A,D)}}(k,function(A,D){var x,B=0,Z=null,S=0;for(x=0;x<D.length;x++)S+=D[x].length;switch(A){case"string":return D.join("");case"array":return Array.prototype.concat.apply([],D);case"uint8array":for(Z=new Uint8Array(S),x=0;x<D.length;x++)Z.set(D[x],B),B+=D[x].length;return Z;case"nodebuffer":return Buffer.concat(D);default:throw new Error("concat : unsupported type '"+A+"'")}}(w,_),I);v(T)}catch(A){y(A)}_=[]}).resume()})}function f(b,m,v){var y=m;switch(m){case"blob":case"arraybuffer":y="uint8array";break;case"base64":y="string"}try{this._internalType=y,this._outputType=m,this._mimeType=v,r.checkSupport(y),this._worker=b.pipe(new o(y)),b.lock()}catch(_){this._worker=new a("error"),this._worker.error(_)}}f.prototype={accumulate:function(b){return p(this,b)},on:function(b,m){var v=this;return b==="data"?this._worker.on(b,function(y){m.call(v,y.data,y.meta)}):this._worker.on(b,function(){r.delay(m,arguments,v)}),this},resume:function(){return r.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(b){if(r.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new d(this,{objectMode:this._outputType!=="nodebuffer"},b)}},i.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(t,i,s){if(s.base64=!0,s.array=!0,s.string=!0,s.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",s.nodebuffer=typeof Buffer<"u",s.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")s.blob=!1;else{var r=new ArrayBuffer(0);try{s.blob=new Blob([r],{type:"application/zip"}).size===0}catch{try{var o=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);o.append(r),s.blob=o.getBlob("application/zip").size===0}catch{s.blob=!1}}}try{s.nodestream=!!t("readable-stream").Readable}catch{s.nodestream=!1}},{"readable-stream":16}],31:[function(t,i,s){for(var r=t("./utils"),o=t("./support"),a=t("./nodejsUtils"),l=t("./stream/GenericWorker"),c=new Array(256),h=0;h<256;h++)c[h]=252<=h?6:248<=h?5:240<=h?4:224<=h?3:192<=h?2:1;c[254]=c[254]=1;function d(){l.call(this,"utf-8 decode"),this.leftOver=null}function p(){l.call(this,"utf-8 encode")}s.utf8encode=function(f){return o.nodebuffer?a.newBufferFrom(f,"utf-8"):function(b){var m,v,y,_,w,k=b.length,I=0;for(_=0;_<k;_++)(64512&(v=b.charCodeAt(_)))==55296&&_+1<k&&(64512&(y=b.charCodeAt(_+1)))==56320&&(v=65536+(v-55296<<10)+(y-56320),_++),I+=v<128?1:v<2048?2:v<65536?3:4;for(m=o.uint8array?new Uint8Array(I):new Array(I),_=w=0;w<I;_++)(64512&(v=b.charCodeAt(_)))==55296&&_+1<k&&(64512&(y=b.charCodeAt(_+1)))==56320&&(v=65536+(v-55296<<10)+(y-56320),_++),v<128?m[w++]=v:(v<2048?m[w++]=192|v>>>6:(v<65536?m[w++]=224|v>>>12:(m[w++]=240|v>>>18,m[w++]=128|v>>>12&63),m[w++]=128|v>>>6&63),m[w++]=128|63&v);return m}(f)},s.utf8decode=function(f){return o.nodebuffer?r.transformTo("nodebuffer",f).toString("utf-8"):function(b){var m,v,y,_,w=b.length,k=new Array(2*w);for(m=v=0;m<w;)if((y=b[m++])<128)k[v++]=y;else if(4<(_=c[y]))k[v++]=65533,m+=_-1;else{for(y&=_===2?31:_===3?15:7;1<_&&m<w;)y=y<<6|63&b[m++],_--;1<_?k[v++]=65533:y<65536?k[v++]=y:(y-=65536,k[v++]=55296|y>>10&1023,k[v++]=56320|1023&y)}return k.length!==v&&(k.subarray?k=k.subarray(0,v):k.length=v),r.applyFromCharCode(k)}(f=r.transformTo(o.uint8array?"uint8array":"array",f))},r.inherits(d,l),d.prototype.processChunk=function(f){var b=r.transformTo(o.uint8array?"uint8array":"array",f.data);if(this.leftOver&&this.leftOver.length){if(o.uint8array){var m=b;(b=new Uint8Array(m.length+this.leftOver.length)).set(this.leftOver,0),b.set(m,this.leftOver.length)}else b=this.leftOver.concat(b);this.leftOver=null}var v=function(_,w){var k;for((w=w||_.length)>_.length&&(w=_.length),k=w-1;0<=k&&(192&_[k])==128;)k--;return k<0||k===0?w:k+c[_[k]]>w?k:w}(b),y=b;v!==b.length&&(o.uint8array?(y=b.subarray(0,v),this.leftOver=b.subarray(v,b.length)):(y=b.slice(0,v),this.leftOver=b.slice(v,b.length))),this.push({data:s.utf8decode(y),meta:f.meta})},d.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=d,r.inherits(p,l),p.prototype.processChunk=function(f){this.push({data:s.utf8encode(f.data),meta:f.meta})},s.Utf8EncodeWorker=p},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(t,i,s){var r=t("./support"),o=t("./base64"),a=t("./nodejsUtils"),l=t("./external");function c(m){return m}function h(m,v){for(var y=0;y<m.length;++y)v[y]=255&m.charCodeAt(y);return v}t("setimmediate"),s.newBlob=function(m,v){s.checkSupport("blob");try{return new Blob([m],{type:v})}catch{try{var y=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return y.append(m),y.getBlob(v)}catch{throw new Error("Bug : can't construct the Blob.")}}};var d={stringifyByChunk:function(m,v,y){var _=[],w=0,k=m.length;if(k<=y)return String.fromCharCode.apply(null,m);for(;w<k;)v==="array"||v==="nodebuffer"?_.push(String.fromCharCode.apply(null,m.slice(w,Math.min(w+y,k)))):_.push(String.fromCharCode.apply(null,m.subarray(w,Math.min(w+y,k)))),w+=y;return _.join("")},stringifyByChar:function(m){for(var v="",y=0;y<m.length;y++)v+=String.fromCharCode(m[y]);return v},applyCanBeUsed:{uint8array:function(){try{return r.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return r.nodebuffer&&String.fromCharCode.apply(null,a.allocBuffer(1)).length===1}catch{return!1}}()}};function p(m){var v=65536,y=s.getTypeOf(m),_=!0;if(y==="uint8array"?_=d.applyCanBeUsed.uint8array:y==="nodebuffer"&&(_=d.applyCanBeUsed.nodebuffer),_)for(;1<v;)try{return d.stringifyByChunk(m,y,v)}catch{v=Math.floor(v/2)}return d.stringifyByChar(m)}function f(m,v){for(var y=0;y<m.length;y++)v[y]=m[y];return v}s.applyFromCharCode=p;var b={};b.string={string:c,array:function(m){return h(m,new Array(m.length))},arraybuffer:function(m){return b.string.uint8array(m).buffer},uint8array:function(m){return h(m,new Uint8Array(m.length))},nodebuffer:function(m){return h(m,a.allocBuffer(m.length))}},b.array={string:p,array:c,arraybuffer:function(m){return new Uint8Array(m).buffer},uint8array:function(m){return new Uint8Array(m)},nodebuffer:function(m){return a.newBufferFrom(m)}},b.arraybuffer={string:function(m){return p(new Uint8Array(m))},array:function(m){return f(new Uint8Array(m),new Array(m.byteLength))},arraybuffer:c,uint8array:function(m){return new Uint8Array(m)},nodebuffer:function(m){return a.newBufferFrom(new Uint8Array(m))}},b.uint8array={string:p,array:function(m){return f(m,new Array(m.length))},arraybuffer:function(m){return m.buffer},uint8array:c,nodebuffer:function(m){return a.newBufferFrom(m)}},b.nodebuffer={string:p,array:function(m){return f(m,new Array(m.length))},arraybuffer:function(m){return b.nodebuffer.uint8array(m).buffer},uint8array:function(m){return f(m,new Uint8Array(m.length))},nodebuffer:c},s.transformTo=function(m,v){if(v=v||"",!m)return v;s.checkSupport(m);var y=s.getTypeOf(v);return b[y][m](v)},s.resolve=function(m){for(var v=m.split("/"),y=[],_=0;_<v.length;_++){var w=v[_];w==="."||w===""&&_!==0&&_!==v.length-1||(w===".."?y.pop():y.push(w))}return y.join("/")},s.getTypeOf=function(m){return typeof m=="string"?"string":Object.prototype.toString.call(m)==="[object Array]"?"array":r.nodebuffer&&a.isBuffer(m)?"nodebuffer":r.uint8array&&m instanceof Uint8Array?"uint8array":r.arraybuffer&&m instanceof ArrayBuffer?"arraybuffer":void 0},s.checkSupport=function(m){if(!r[m.toLowerCase()])throw new Error(m+" is not supported by this platform")},s.MAX_VALUE_16BITS=65535,s.MAX_VALUE_32BITS=-1,s.pretty=function(m){var v,y,_="";for(y=0;y<(m||"").length;y++)_+="\\x"+((v=m.charCodeAt(y))<16?"0":"")+v.toString(16).toUpperCase();return _},s.delay=function(m,v,y){setImmediate(function(){m.apply(y||null,v||[])})},s.inherits=function(m,v){function y(){}y.prototype=v.prototype,m.prototype=new y},s.extend=function(){var m,v,y={};for(m=0;m<arguments.length;m++)for(v in arguments[m])Object.prototype.hasOwnProperty.call(arguments[m],v)&&y[v]===void 0&&(y[v]=arguments[m][v]);return y},s.prepareContent=function(m,v,y,_,w){return l.Promise.resolve(v).then(function(k){return r.blob&&(k instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(k))!==-1)&&typeof FileReader<"u"?new l.Promise(function(I,T){var A=new FileReader;A.onload=function(D){I(D.target.result)},A.onerror=function(D){T(D.target.error)},A.readAsArrayBuffer(k)}):k}).then(function(k){var I=s.getTypeOf(k);return I?(I==="arraybuffer"?k=s.transformTo("uint8array",k):I==="string"&&(w?k=o.decode(k):y&&_!==!0&&(k=function(T){return h(T,r.uint8array?new Uint8Array(T.length):new Array(T.length))}(k))),k):l.Promise.reject(new Error("Can't read the data of '"+m+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(t,i,s){var r=t("./reader/readerFor"),o=t("./utils"),a=t("./signature"),l=t("./zipEntry"),c=t("./support");function h(d){this.files=[],this.loadOptions=d}h.prototype={checkSignature:function(d){if(!this.reader.readAndCheckSignature(d)){this.reader.index-=4;var p=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+o.pretty(p)+", expected "+o.pretty(d)+")")}},isSignature:function(d,p){var f=this.reader.index;this.reader.setIndex(d);var b=this.reader.readString(4)===p;return this.reader.setIndex(f),b},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var d=this.reader.readData(this.zipCommentLength),p=c.uint8array?"uint8array":"array",f=o.transformTo(p,d);this.zipComment=this.loadOptions.decodeFileName(f)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var d,p,f,b=this.zip64EndOfCentralSize-44;0<b;)d=this.reader.readInt(2),p=this.reader.readInt(4),f=this.reader.readData(p),this.zip64ExtensibleData[d]={id:d,length:p,value:f}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var d,p;for(d=0;d<this.files.length;d++)p=this.files[d],this.reader.setIndex(p.localHeaderOffset),this.checkSignature(a.LOCAL_FILE_HEADER),p.readLocalPart(this.reader),p.handleUTF8(),p.processAttributes()},readCentralDir:function(){var d;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER);)(d=new l({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(d);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var d=this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);if(d<0)throw this.isSignature(0,a.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(d);var p=d;if(this.checkSignature(a.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===o.MAX_VALUE_16BITS||this.diskWithCentralDirStart===o.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===o.MAX_VALUE_16BITS||this.centralDirRecords===o.MAX_VALUE_16BITS||this.centralDirSize===o.MAX_VALUE_32BITS||this.centralDirOffset===o.MAX_VALUE_32BITS){if(this.zip64=!0,(d=this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(d),this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,a.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var f=this.centralDirOffset+this.centralDirSize;this.zip64&&(f+=20,f+=12+this.zip64EndOfCentralSize);var b=p-f;if(0<b)this.isSignature(p,a.CENTRAL_FILE_HEADER)||(this.reader.zero=b);else if(b<0)throw new Error("Corrupted zip: missing "+Math.abs(b)+" bytes.")},prepareReader:function(d){this.reader=r(d)},load:function(d){this.prepareReader(d),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},i.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(t,i,s){var r=t("./reader/readerFor"),o=t("./utils"),a=t("./compressedObject"),l=t("./crc32"),c=t("./utf8"),h=t("./compressions"),d=t("./support");function p(f,b){this.options=f,this.loadOptions=b}p.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(f){var b,m;if(f.skip(22),this.fileNameLength=f.readInt(2),m=f.readInt(2),this.fileName=f.readData(this.fileNameLength),f.skip(m),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((b=function(v){for(var y in h)if(Object.prototype.hasOwnProperty.call(h,y)&&h[y].magic===v)return h[y];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+o.pretty(this.compressionMethod)+" unknown (inner file : "+o.transformTo("string",this.fileName)+")");this.decompressed=new a(this.compressedSize,this.uncompressedSize,this.crc32,b,f.readData(this.compressedSize))},readCentralPart:function(f){this.versionMadeBy=f.readInt(2),f.skip(2),this.bitFlag=f.readInt(2),this.compressionMethod=f.readString(2),this.date=f.readDate(),this.crc32=f.readInt(4),this.compressedSize=f.readInt(4),this.uncompressedSize=f.readInt(4);var b=f.readInt(2);if(this.extraFieldsLength=f.readInt(2),this.fileCommentLength=f.readInt(2),this.diskNumberStart=f.readInt(2),this.internalFileAttributes=f.readInt(2),this.externalFileAttributes=f.readInt(4),this.localHeaderOffset=f.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");f.skip(b),this.readExtraFields(f),this.parseZIP64ExtraField(f),this.fileComment=f.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var f=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),f==0&&(this.dosPermissions=63&this.externalFileAttributes),f==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var f=r(this.extraFields[1].value);this.uncompressedSize===o.MAX_VALUE_32BITS&&(this.uncompressedSize=f.readInt(8)),this.compressedSize===o.MAX_VALUE_32BITS&&(this.compressedSize=f.readInt(8)),this.localHeaderOffset===o.MAX_VALUE_32BITS&&(this.localHeaderOffset=f.readInt(8)),this.diskNumberStart===o.MAX_VALUE_32BITS&&(this.diskNumberStart=f.readInt(4))}},readExtraFields:function(f){var b,m,v,y=f.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});f.index+4<y;)b=f.readInt(2),m=f.readInt(2),v=f.readData(m),this.extraFields[b]={id:b,length:m,value:v};f.setIndex(y)},handleUTF8:function(){var f=d.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=c.utf8decode(this.fileName),this.fileCommentStr=c.utf8decode(this.fileComment);else{var b=this.findExtraFieldUnicodePath();if(b!==null)this.fileNameStr=b;else{var m=o.transformTo(f,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(m)}var v=this.findExtraFieldUnicodeComment();if(v!==null)this.fileCommentStr=v;else{var y=o.transformTo(f,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(y)}}},findExtraFieldUnicodePath:function(){var f=this.extraFields[28789];if(f){var b=r(f.value);return b.readInt(1)!==1||l(this.fileName)!==b.readInt(4)?null:c.utf8decode(b.readData(f.length-5))}return null},findExtraFieldUnicodeComment:function(){var f=this.extraFields[25461];if(f){var b=r(f.value);return b.readInt(1)!==1||l(this.fileComment)!==b.readInt(4)?null:c.utf8decode(b.readData(f.length-5))}return null}},i.exports=p},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(t,i,s){function r(b,m,v){this.name=b,this.dir=v.dir,this.date=v.date,this.comment=v.comment,this.unixPermissions=v.unixPermissions,this.dosPermissions=v.dosPermissions,this._data=m,this._dataBinary=v.binary,this.options={compression:v.compression,compressionOptions:v.compressionOptions}}var o=t("./stream/StreamHelper"),a=t("./stream/DataWorker"),l=t("./utf8"),c=t("./compressedObject"),h=t("./stream/GenericWorker");r.prototype={internalStream:function(b){var m=null,v="string";try{if(!b)throw new Error("No output type specified.");var y=(v=b.toLowerCase())==="string"||v==="text";v!=="binarystring"&&v!=="text"||(v="string"),m=this._decompressWorker();var _=!this._dataBinary;_&&!y&&(m=m.pipe(new l.Utf8EncodeWorker)),!_&&y&&(m=m.pipe(new l.Utf8DecodeWorker))}catch(w){(m=new h("error")).error(w)}return new o(m,v,"")},async:function(b,m){return this.internalStream(b).accumulate(m)},nodeStream:function(b,m){return this.internalStream(b||"nodebuffer").toNodejsStream(m)},_compressWorker:function(b,m){if(this._data instanceof c&&this._data.compression.magic===b.magic)return this._data.getCompressedWorker();var v=this._decompressWorker();return this._dataBinary||(v=v.pipe(new l.Utf8EncodeWorker)),c.createWorkerFrom(v,b,m)},_decompressWorker:function(){return this._data instanceof c?this._data.getContentWorker():this._data instanceof h?this._data:new a(this._data)}};for(var d=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],p=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<d.length;f++)r.prototype[d[f]]=p;i.exports=r},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(t,i,s){(function(r){var o,a,l=r.MutationObserver||r.WebKitMutationObserver;if(l){var c=0,h=new l(b),d=r.document.createTextNode("");h.observe(d,{characterData:!0}),o=function(){d.data=c=++c%2}}else if(r.setImmediate||r.MessageChannel===void 0)o="document"in r&&"onreadystatechange"in r.document.createElement("script")?function(){var m=r.document.createElement("script");m.onreadystatechange=function(){b(),m.onreadystatechange=null,m.parentNode.removeChild(m),m=null},r.document.documentElement.appendChild(m)}:function(){setTimeout(b,0)};else{var p=new r.MessageChannel;p.port1.onmessage=b,o=function(){p.port2.postMessage(0)}}var f=[];function b(){var m,v;a=!0;for(var y=f.length;y;){for(v=f,f=[],m=-1;++m<y;)v[m]();y=f.length}a=!1}i.exports=function(m){f.push(m)!==1||a||o()}}).call(this,typeof Yn<"u"?Yn:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(t,i,s){var r=t("immediate");function o(){}var a={},l=["REJECTED"],c=["FULFILLED"],h=["PENDING"];function d(y){if(typeof y!="function")throw new TypeError("resolver must be a function");this.state=h,this.queue=[],this.outcome=void 0,y!==o&&m(this,y)}function p(y,_,w){this.promise=y,typeof _=="function"&&(this.onFulfilled=_,this.callFulfilled=this.otherCallFulfilled),typeof w=="function"&&(this.onRejected=w,this.callRejected=this.otherCallRejected)}function f(y,_,w){r(function(){var k;try{k=_(w)}catch(I){return a.reject(y,I)}k===y?a.reject(y,new TypeError("Cannot resolve promise with itself")):a.resolve(y,k)})}function b(y){var _=y&&y.then;if(y&&(typeof y=="object"||typeof y=="function")&&typeof _=="function")return function(){_.apply(y,arguments)}}function m(y,_){var w=!1;function k(A){w||(w=!0,a.reject(y,A))}function I(A){w||(w=!0,a.resolve(y,A))}var T=v(function(){_(I,k)});T.status==="error"&&k(T.value)}function v(y,_){var w={};try{w.value=y(_),w.status="success"}catch(k){w.status="error",w.value=k}return w}(i.exports=d).prototype.finally=function(y){if(typeof y!="function")return this;var _=this.constructor;return this.then(function(w){return _.resolve(y()).then(function(){return w})},function(w){return _.resolve(y()).then(function(){throw w})})},d.prototype.catch=function(y){return this.then(null,y)},d.prototype.then=function(y,_){if(typeof y!="function"&&this.state===c||typeof _!="function"&&this.state===l)return this;var w=new this.constructor(o);return this.state!==h?f(w,this.state===c?y:_,this.outcome):this.queue.push(new p(w,y,_)),w},p.prototype.callFulfilled=function(y){a.resolve(this.promise,y)},p.prototype.otherCallFulfilled=function(y){f(this.promise,this.onFulfilled,y)},p.prototype.callRejected=function(y){a.reject(this.promise,y)},p.prototype.otherCallRejected=function(y){f(this.promise,this.onRejected,y)},a.resolve=function(y,_){var w=v(b,_);if(w.status==="error")return a.reject(y,w.value);var k=w.value;if(k)m(y,k);else{y.state=c,y.outcome=_;for(var I=-1,T=y.queue.length;++I<T;)y.queue[I].callFulfilled(_)}return y},a.reject=function(y,_){y.state=l,y.outcome=_;for(var w=-1,k=y.queue.length;++w<k;)y.queue[w].callRejected(_);return y},d.resolve=function(y){return y instanceof this?y:a.resolve(new this(o),y)},d.reject=function(y){var _=new this(o);return a.reject(_,y)},d.all=function(y){var _=this;if(Object.prototype.toString.call(y)!=="[object Array]")return this.reject(new TypeError("must be an array"));var w=y.length,k=!1;if(!w)return this.resolve([]);for(var I=new Array(w),T=0,A=-1,D=new this(o);++A<w;)x(y[A],A);return D;function x(B,Z){_.resolve(B).then(function(S){I[Z]=S,++T!==w||k||(k=!0,a.resolve(D,I))},function(S){k||(k=!0,a.reject(D,S))})}},d.race=function(y){var _=this;if(Object.prototype.toString.call(y)!=="[object Array]")return this.reject(new TypeError("must be an array"));var w=y.length,k=!1;if(!w)return this.resolve([]);for(var I=-1,T=new this(o);++I<w;)A=y[I],_.resolve(A).then(function(D){k||(k=!0,a.resolve(T,D))},function(D){k||(k=!0,a.reject(T,D))});var A;return T}},{immediate:36}],38:[function(t,i,s){var r={};(0,t("./lib/utils/common").assign)(r,t("./lib/deflate"),t("./lib/inflate"),t("./lib/zlib/constants")),i.exports=r},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(t,i,s){var r=t("./zlib/deflate"),o=t("./utils/common"),a=t("./utils/strings"),l=t("./zlib/messages"),c=t("./zlib/zstream"),h=Object.prototype.toString,d=0,p=-1,f=0,b=8;function m(y){if(!(this instanceof m))return new m(y);this.options=o.assign({level:p,method:b,chunkSize:16384,windowBits:15,memLevel:8,strategy:f,to:""},y||{});var _=this.options;_.raw&&0<_.windowBits?_.windowBits=-_.windowBits:_.gzip&&0<_.windowBits&&_.windowBits<16&&(_.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new c,this.strm.avail_out=0;var w=r.deflateInit2(this.strm,_.level,_.method,_.windowBits,_.memLevel,_.strategy);if(w!==d)throw new Error(l[w]);if(_.header&&r.deflateSetHeader(this.strm,_.header),_.dictionary){var k;if(k=typeof _.dictionary=="string"?a.string2buf(_.dictionary):h.call(_.dictionary)==="[object ArrayBuffer]"?new Uint8Array(_.dictionary):_.dictionary,(w=r.deflateSetDictionary(this.strm,k))!==d)throw new Error(l[w]);this._dict_set=!0}}function v(y,_){var w=new m(_);if(w.push(y,!0),w.err)throw w.msg||l[w.err];return w.result}m.prototype.push=function(y,_){var w,k,I=this.strm,T=this.options.chunkSize;if(this.ended)return!1;k=_===~~_?_:_===!0?4:0,typeof y=="string"?I.input=a.string2buf(y):h.call(y)==="[object ArrayBuffer]"?I.input=new Uint8Array(y):I.input=y,I.next_in=0,I.avail_in=I.input.length;do{if(I.avail_out===0&&(I.output=new o.Buf8(T),I.next_out=0,I.avail_out=T),(w=r.deflate(I,k))!==1&&w!==d)return this.onEnd(w),!(this.ended=!0);I.avail_out!==0&&(I.avail_in!==0||k!==4&&k!==2)||(this.options.to==="string"?this.onData(a.buf2binstring(o.shrinkBuf(I.output,I.next_out))):this.onData(o.shrinkBuf(I.output,I.next_out)))}while((0<I.avail_in||I.avail_out===0)&&w!==1);return k===4?(w=r.deflateEnd(this.strm),this.onEnd(w),this.ended=!0,w===d):k!==2||(this.onEnd(d),!(I.avail_out=0))},m.prototype.onData=function(y){this.chunks.push(y)},m.prototype.onEnd=function(y){y===d&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=y,this.msg=this.strm.msg},s.Deflate=m,s.deflate=v,s.deflateRaw=function(y,_){return(_=_||{}).raw=!0,v(y,_)},s.gzip=function(y,_){return(_=_||{}).gzip=!0,v(y,_)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(t,i,s){var r=t("./zlib/inflate"),o=t("./utils/common"),a=t("./utils/strings"),l=t("./zlib/constants"),c=t("./zlib/messages"),h=t("./zlib/zstream"),d=t("./zlib/gzheader"),p=Object.prototype.toString;function f(m){if(!(this instanceof f))return new f(m);this.options=o.assign({chunkSize:16384,windowBits:0,to:""},m||{});var v=this.options;v.raw&&0<=v.windowBits&&v.windowBits<16&&(v.windowBits=-v.windowBits,v.windowBits===0&&(v.windowBits=-15)),!(0<=v.windowBits&&v.windowBits<16)||m&&m.windowBits||(v.windowBits+=32),15<v.windowBits&&v.windowBits<48&&!(15&v.windowBits)&&(v.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new h,this.strm.avail_out=0;var y=r.inflateInit2(this.strm,v.windowBits);if(y!==l.Z_OK)throw new Error(c[y]);this.header=new d,r.inflateGetHeader(this.strm,this.header)}function b(m,v){var y=new f(v);if(y.push(m,!0),y.err)throw y.msg||c[y.err];return y.result}f.prototype.push=function(m,v){var y,_,w,k,I,T,A=this.strm,D=this.options.chunkSize,x=this.options.dictionary,B=!1;if(this.ended)return!1;_=v===~~v?v:v===!0?l.Z_FINISH:l.Z_NO_FLUSH,typeof m=="string"?A.input=a.binstring2buf(m):p.call(m)==="[object ArrayBuffer]"?A.input=new Uint8Array(m):A.input=m,A.next_in=0,A.avail_in=A.input.length;do{if(A.avail_out===0&&(A.output=new o.Buf8(D),A.next_out=0,A.avail_out=D),(y=r.inflate(A,l.Z_NO_FLUSH))===l.Z_NEED_DICT&&x&&(T=typeof x=="string"?a.string2buf(x):p.call(x)==="[object ArrayBuffer]"?new Uint8Array(x):x,y=r.inflateSetDictionary(this.strm,T)),y===l.Z_BUF_ERROR&&B===!0&&(y=l.Z_OK,B=!1),y!==l.Z_STREAM_END&&y!==l.Z_OK)return this.onEnd(y),!(this.ended=!0);A.next_out&&(A.avail_out!==0&&y!==l.Z_STREAM_END&&(A.avail_in!==0||_!==l.Z_FINISH&&_!==l.Z_SYNC_FLUSH)||(this.options.to==="string"?(w=a.utf8border(A.output,A.next_out),k=A.next_out-w,I=a.buf2string(A.output,w),A.next_out=k,A.avail_out=D-k,k&&o.arraySet(A.output,A.output,w,k,0),this.onData(I)):this.onData(o.shrinkBuf(A.output,A.next_out)))),A.avail_in===0&&A.avail_out===0&&(B=!0)}while((0<A.avail_in||A.avail_out===0)&&y!==l.Z_STREAM_END);return y===l.Z_STREAM_END&&(_=l.Z_FINISH),_===l.Z_FINISH?(y=r.inflateEnd(this.strm),this.onEnd(y),this.ended=!0,y===l.Z_OK):_!==l.Z_SYNC_FLUSH||(this.onEnd(l.Z_OK),!(A.avail_out=0))},f.prototype.onData=function(m){this.chunks.push(m)},f.prototype.onEnd=function(m){m===l.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=m,this.msg=this.strm.msg},s.Inflate=f,s.inflate=b,s.inflateRaw=function(m,v){return(v=v||{}).raw=!0,b(m,v)},s.ungzip=b},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(t,i,s){var r=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";s.assign=function(l){for(var c=Array.prototype.slice.call(arguments,1);c.length;){var h=c.shift();if(h){if(typeof h!="object")throw new TypeError(h+"must be non-object");for(var d in h)h.hasOwnProperty(d)&&(l[d]=h[d])}}return l},s.shrinkBuf=function(l,c){return l.length===c?l:l.subarray?l.subarray(0,c):(l.length=c,l)};var o={arraySet:function(l,c,h,d,p){if(c.subarray&&l.subarray)l.set(c.subarray(h,h+d),p);else for(var f=0;f<d;f++)l[p+f]=c[h+f]},flattenChunks:function(l){var c,h,d,p,f,b;for(c=d=0,h=l.length;c<h;c++)d+=l[c].length;for(b=new Uint8Array(d),c=p=0,h=l.length;c<h;c++)f=l[c],b.set(f,p),p+=f.length;return b}},a={arraySet:function(l,c,h,d,p){for(var f=0;f<d;f++)l[p+f]=c[h+f]},flattenChunks:function(l){return[].concat.apply([],l)}};s.setTyped=function(l){l?(s.Buf8=Uint8Array,s.Buf16=Uint16Array,s.Buf32=Int32Array,s.assign(s,o)):(s.Buf8=Array,s.Buf16=Array,s.Buf32=Array,s.assign(s,a))},s.setTyped(r)},{}],42:[function(t,i,s){var r=t("./common"),o=!0,a=!0;try{String.fromCharCode.apply(null,[0])}catch{o=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{a=!1}for(var l=new r.Buf8(256),c=0;c<256;c++)l[c]=252<=c?6:248<=c?5:240<=c?4:224<=c?3:192<=c?2:1;function h(d,p){if(p<65537&&(d.subarray&&a||!d.subarray&&o))return String.fromCharCode.apply(null,r.shrinkBuf(d,p));for(var f="",b=0;b<p;b++)f+=String.fromCharCode(d[b]);return f}l[254]=l[254]=1,s.string2buf=function(d){var p,f,b,m,v,y=d.length,_=0;for(m=0;m<y;m++)(64512&(f=d.charCodeAt(m)))==55296&&m+1<y&&(64512&(b=d.charCodeAt(m+1)))==56320&&(f=65536+(f-55296<<10)+(b-56320),m++),_+=f<128?1:f<2048?2:f<65536?3:4;for(p=new r.Buf8(_),m=v=0;v<_;m++)(64512&(f=d.charCodeAt(m)))==55296&&m+1<y&&(64512&(b=d.charCodeAt(m+1)))==56320&&(f=65536+(f-55296<<10)+(b-56320),m++),f<128?p[v++]=f:(f<2048?p[v++]=192|f>>>6:(f<65536?p[v++]=224|f>>>12:(p[v++]=240|f>>>18,p[v++]=128|f>>>12&63),p[v++]=128|f>>>6&63),p[v++]=128|63&f);return p},s.buf2binstring=function(d){return h(d,d.length)},s.binstring2buf=function(d){for(var p=new r.Buf8(d.length),f=0,b=p.length;f<b;f++)p[f]=d.charCodeAt(f);return p},s.buf2string=function(d,p){var f,b,m,v,y=p||d.length,_=new Array(2*y);for(f=b=0;f<y;)if((m=d[f++])<128)_[b++]=m;else if(4<(v=l[m]))_[b++]=65533,f+=v-1;else{for(m&=v===2?31:v===3?15:7;1<v&&f<y;)m=m<<6|63&d[f++],v--;1<v?_[b++]=65533:m<65536?_[b++]=m:(m-=65536,_[b++]=55296|m>>10&1023,_[b++]=56320|1023&m)}return h(_,b)},s.utf8border=function(d,p){var f;for((p=p||d.length)>d.length&&(p=d.length),f=p-1;0<=f&&(192&d[f])==128;)f--;return f<0||f===0?p:f+l[d[f]]>p?f:p}},{"./common":41}],43:[function(t,i,s){i.exports=function(r,o,a,l){for(var c=65535&r|0,h=r>>>16&65535|0,d=0;a!==0;){for(a-=d=2e3<a?2e3:a;h=h+(c=c+o[l++]|0)|0,--d;);c%=65521,h%=65521}return c|h<<16|0}},{}],44:[function(t,i,s){i.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(t,i,s){var r=function(){for(var o,a=[],l=0;l<256;l++){o=l;for(var c=0;c<8;c++)o=1&o?3988292384^o>>>1:o>>>1;a[l]=o}return a}();i.exports=function(o,a,l,c){var h=r,d=c+l;o^=-1;for(var p=c;p<d;p++)o=o>>>8^h[255&(o^a[p])];return-1^o}},{}],46:[function(t,i,s){var r,o=t("../utils/common"),a=t("./trees"),l=t("./adler32"),c=t("./crc32"),h=t("./messages"),d=0,p=4,f=0,b=-2,m=-1,v=4,y=2,_=8,w=9,k=286,I=30,T=19,A=2*k+1,D=15,x=3,B=258,Z=B+x+1,S=42,F=113,g=1,U=2,ae=3,j=4;function ee(u,M){return u.msg=h[M],M}function $(u){return(u<<1)-(4<u?9:0)}function ne(u){for(var M=u.length;0<=--M;)u[M]=0}function L(u){var M=u.state,O=M.pending;O>u.avail_out&&(O=u.avail_out),O!==0&&(o.arraySet(u.output,M.pending_buf,M.pending_out,O,u.next_out),u.next_out+=O,M.pending_out+=O,u.total_out+=O,u.avail_out-=O,M.pending-=O,M.pending===0&&(M.pending_out=0))}function P(u,M){a._tr_flush_block(u,0<=u.block_start?u.block_start:-1,u.strstart-u.block_start,M),u.block_start=u.strstart,L(u.strm)}function ie(u,M){u.pending_buf[u.pending++]=M}function K(u,M){u.pending_buf[u.pending++]=M>>>8&255,u.pending_buf[u.pending++]=255&M}function G(u,M){var O,C,E=u.max_chain_length,R=u.strstart,z=u.prev_length,W=u.nice_match,N=u.strstart>u.w_size-Z?u.strstart-(u.w_size-Z):0,V=u.window,J=u.w_mask,q=u.prev,se=u.strstart+B,Ce=V[R+z-1],fe=V[R+z];u.prev_length>=u.good_match&&(E>>=2),W>u.lookahead&&(W=u.lookahead);do if(V[(O=M)+z]===fe&&V[O+z-1]===Ce&&V[O]===V[R]&&V[++O]===V[R+1]){R+=2,O++;do;while(V[++R]===V[++O]&&V[++R]===V[++O]&&V[++R]===V[++O]&&V[++R]===V[++O]&&V[++R]===V[++O]&&V[++R]===V[++O]&&V[++R]===V[++O]&&V[++R]===V[++O]&&R<se);if(C=B-(se-R),R=se-B,z<C){if(u.match_start=M,W<=(z=C))break;Ce=V[R+z-1],fe=V[R+z]}}while((M=q[M&J])>N&&--E!=0);return z<=u.lookahead?z:u.lookahead}function we(u){var M,O,C,E,R,z,W,N,V,J,q=u.w_size;do{if(E=u.window_size-u.lookahead-u.strstart,u.strstart>=q+(q-Z)){for(o.arraySet(u.window,u.window,q,q,0),u.match_start-=q,u.strstart-=q,u.block_start-=q,M=O=u.hash_size;C=u.head[--M],u.head[M]=q<=C?C-q:0,--O;);for(M=O=q;C=u.prev[--M],u.prev[M]=q<=C?C-q:0,--O;);E+=q}if(u.strm.avail_in===0)break;if(z=u.strm,W=u.window,N=u.strstart+u.lookahead,V=E,J=void 0,J=z.avail_in,V<J&&(J=V),O=J===0?0:(z.avail_in-=J,o.arraySet(W,z.input,z.next_in,J,N),z.state.wrap===1?z.adler=l(z.adler,W,J,N):z.state.wrap===2&&(z.adler=c(z.adler,W,J,N)),z.next_in+=J,z.total_in+=J,J),u.lookahead+=O,u.lookahead+u.insert>=x)for(R=u.strstart-u.insert,u.ins_h=u.window[R],u.ins_h=(u.ins_h<<u.hash_shift^u.window[R+1])&u.hash_mask;u.insert&&(u.ins_h=(u.ins_h<<u.hash_shift^u.window[R+x-1])&u.hash_mask,u.prev[R&u.w_mask]=u.head[u.ins_h],u.head[u.ins_h]=R,R++,u.insert--,!(u.lookahead+u.insert<x)););}while(u.lookahead<Z&&u.strm.avail_in!==0)}function Re(u,M){for(var O,C;;){if(u.lookahead<Z){if(we(u),u.lookahead<Z&&M===d)return g;if(u.lookahead===0)break}if(O=0,u.lookahead>=x&&(u.ins_h=(u.ins_h<<u.hash_shift^u.window[u.strstart+x-1])&u.hash_mask,O=u.prev[u.strstart&u.w_mask]=u.head[u.ins_h],u.head[u.ins_h]=u.strstart),O!==0&&u.strstart-O<=u.w_size-Z&&(u.match_length=G(u,O)),u.match_length>=x)if(C=a._tr_tally(u,u.strstart-u.match_start,u.match_length-x),u.lookahead-=u.match_length,u.match_length<=u.max_lazy_match&&u.lookahead>=x){for(u.match_length--;u.strstart++,u.ins_h=(u.ins_h<<u.hash_shift^u.window[u.strstart+x-1])&u.hash_mask,O=u.prev[u.strstart&u.w_mask]=u.head[u.ins_h],u.head[u.ins_h]=u.strstart,--u.match_length!=0;);u.strstart++}else u.strstart+=u.match_length,u.match_length=0,u.ins_h=u.window[u.strstart],u.ins_h=(u.ins_h<<u.hash_shift^u.window[u.strstart+1])&u.hash_mask;else C=a._tr_tally(u,0,u.window[u.strstart]),u.lookahead--,u.strstart++;if(C&&(P(u,!1),u.strm.avail_out===0))return g}return u.insert=u.strstart<x-1?u.strstart:x-1,M===p?(P(u,!0),u.strm.avail_out===0?ae:j):u.last_lit&&(P(u,!1),u.strm.avail_out===0)?g:U}function de(u,M){for(var O,C,E;;){if(u.lookahead<Z){if(we(u),u.lookahead<Z&&M===d)return g;if(u.lookahead===0)break}if(O=0,u.lookahead>=x&&(u.ins_h=(u.ins_h<<u.hash_shift^u.window[u.strstart+x-1])&u.hash_mask,O=u.prev[u.strstart&u.w_mask]=u.head[u.ins_h],u.head[u.ins_h]=u.strstart),u.prev_length=u.match_length,u.prev_match=u.match_start,u.match_length=x-1,O!==0&&u.prev_length<u.max_lazy_match&&u.strstart-O<=u.w_size-Z&&(u.match_length=G(u,O),u.match_length<=5&&(u.strategy===1||u.match_length===x&&4096<u.strstart-u.match_start)&&(u.match_length=x-1)),u.prev_length>=x&&u.match_length<=u.prev_length){for(E=u.strstart+u.lookahead-x,C=a._tr_tally(u,u.strstart-1-u.prev_match,u.prev_length-x),u.lookahead-=u.prev_length-1,u.prev_length-=2;++u.strstart<=E&&(u.ins_h=(u.ins_h<<u.hash_shift^u.window[u.strstart+x-1])&u.hash_mask,O=u.prev[u.strstart&u.w_mask]=u.head[u.ins_h],u.head[u.ins_h]=u.strstart),--u.prev_length!=0;);if(u.match_available=0,u.match_length=x-1,u.strstart++,C&&(P(u,!1),u.strm.avail_out===0))return g}else if(u.match_available){if((C=a._tr_tally(u,0,u.window[u.strstart-1]))&&P(u,!1),u.strstart++,u.lookahead--,u.strm.avail_out===0)return g}else u.match_available=1,u.strstart++,u.lookahead--}return u.match_available&&(C=a._tr_tally(u,0,u.window[u.strstart-1]),u.match_available=0),u.insert=u.strstart<x-1?u.strstart:x-1,M===p?(P(u,!0),u.strm.avail_out===0?ae:j):u.last_lit&&(P(u,!1),u.strm.avail_out===0)?g:U}function pe(u,M,O,C,E){this.good_length=u,this.max_lazy=M,this.nice_length=O,this.max_chain=C,this.func=E}function Ae(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=_,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new o.Buf16(2*A),this.dyn_dtree=new o.Buf16(2*(2*I+1)),this.bl_tree=new o.Buf16(2*(2*T+1)),ne(this.dyn_ltree),ne(this.dyn_dtree),ne(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new o.Buf16(D+1),this.heap=new o.Buf16(2*k+1),ne(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new o.Buf16(2*k+1),ne(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function Ee(u){var M;return u&&u.state?(u.total_in=u.total_out=0,u.data_type=y,(M=u.state).pending=0,M.pending_out=0,M.wrap<0&&(M.wrap=-M.wrap),M.status=M.wrap?S:F,u.adler=M.wrap===2?0:1,M.last_flush=d,a._tr_init(M),f):ee(u,b)}function nt(u){var M=Ee(u);return M===f&&function(O){O.window_size=2*O.w_size,ne(O.head),O.max_lazy_match=r[O.level].max_lazy,O.good_match=r[O.level].good_length,O.nice_match=r[O.level].nice_length,O.max_chain_length=r[O.level].max_chain,O.strstart=0,O.block_start=0,O.lookahead=0,O.insert=0,O.match_length=O.prev_length=x-1,O.match_available=0,O.ins_h=0}(u.state),M}function ze(u,M,O,C,E,R){if(!u)return b;var z=1;if(M===m&&(M=6),C<0?(z=0,C=-C):15<C&&(z=2,C-=16),E<1||w<E||O!==_||C<8||15<C||M<0||9<M||R<0||v<R)return ee(u,b);C===8&&(C=9);var W=new Ae;return(u.state=W).strm=u,W.wrap=z,W.gzhead=null,W.w_bits=C,W.w_size=1<<W.w_bits,W.w_mask=W.w_size-1,W.hash_bits=E+7,W.hash_size=1<<W.hash_bits,W.hash_mask=W.hash_size-1,W.hash_shift=~~((W.hash_bits+x-1)/x),W.window=new o.Buf8(2*W.w_size),W.head=new o.Buf16(W.hash_size),W.prev=new o.Buf16(W.w_size),W.lit_bufsize=1<<E+6,W.pending_buf_size=4*W.lit_bufsize,W.pending_buf=new o.Buf8(W.pending_buf_size),W.d_buf=1*W.lit_bufsize,W.l_buf=3*W.lit_bufsize,W.level=M,W.strategy=R,W.method=O,nt(u)}r=[new pe(0,0,0,0,function(u,M){var O=65535;for(O>u.pending_buf_size-5&&(O=u.pending_buf_size-5);;){if(u.lookahead<=1){if(we(u),u.lookahead===0&&M===d)return g;if(u.lookahead===0)break}u.strstart+=u.lookahead,u.lookahead=0;var C=u.block_start+O;if((u.strstart===0||u.strstart>=C)&&(u.lookahead=u.strstart-C,u.strstart=C,P(u,!1),u.strm.avail_out===0)||u.strstart-u.block_start>=u.w_size-Z&&(P(u,!1),u.strm.avail_out===0))return g}return u.insert=0,M===p?(P(u,!0),u.strm.avail_out===0?ae:j):(u.strstart>u.block_start&&(P(u,!1),u.strm.avail_out),g)}),new pe(4,4,8,4,Re),new pe(4,5,16,8,Re),new pe(4,6,32,32,Re),new pe(4,4,16,16,de),new pe(8,16,32,32,de),new pe(8,16,128,128,de),new pe(8,32,128,256,de),new pe(32,128,258,1024,de),new pe(32,258,258,4096,de)],s.deflateInit=function(u,M){return ze(u,M,_,15,8,0)},s.deflateInit2=ze,s.deflateReset=nt,s.deflateResetKeep=Ee,s.deflateSetHeader=function(u,M){return u&&u.state?u.state.wrap!==2?b:(u.state.gzhead=M,f):b},s.deflate=function(u,M){var O,C,E,R;if(!u||!u.state||5<M||M<0)return u?ee(u,b):b;if(C=u.state,!u.output||!u.input&&u.avail_in!==0||C.status===666&&M!==p)return ee(u,u.avail_out===0?-5:b);if(C.strm=u,O=C.last_flush,C.last_flush=M,C.status===S)if(C.wrap===2)u.adler=0,ie(C,31),ie(C,139),ie(C,8),C.gzhead?(ie(C,(C.gzhead.text?1:0)+(C.gzhead.hcrc?2:0)+(C.gzhead.extra?4:0)+(C.gzhead.name?8:0)+(C.gzhead.comment?16:0)),ie(C,255&C.gzhead.time),ie(C,C.gzhead.time>>8&255),ie(C,C.gzhead.time>>16&255),ie(C,C.gzhead.time>>24&255),ie(C,C.level===9?2:2<=C.strategy||C.level<2?4:0),ie(C,255&C.gzhead.os),C.gzhead.extra&&C.gzhead.extra.length&&(ie(C,255&C.gzhead.extra.length),ie(C,C.gzhead.extra.length>>8&255)),C.gzhead.hcrc&&(u.adler=c(u.adler,C.pending_buf,C.pending,0)),C.gzindex=0,C.status=69):(ie(C,0),ie(C,0),ie(C,0),ie(C,0),ie(C,0),ie(C,C.level===9?2:2<=C.strategy||C.level<2?4:0),ie(C,3),C.status=F);else{var z=_+(C.w_bits-8<<4)<<8;z|=(2<=C.strategy||C.level<2?0:C.level<6?1:C.level===6?2:3)<<6,C.strstart!==0&&(z|=32),z+=31-z%31,C.status=F,K(C,z),C.strstart!==0&&(K(C,u.adler>>>16),K(C,65535&u.adler)),u.adler=1}if(C.status===69)if(C.gzhead.extra){for(E=C.pending;C.gzindex<(65535&C.gzhead.extra.length)&&(C.pending!==C.pending_buf_size||(C.gzhead.hcrc&&C.pending>E&&(u.adler=c(u.adler,C.pending_buf,C.pending-E,E)),L(u),E=C.pending,C.pending!==C.pending_buf_size));)ie(C,255&C.gzhead.extra[C.gzindex]),C.gzindex++;C.gzhead.hcrc&&C.pending>E&&(u.adler=c(u.adler,C.pending_buf,C.pending-E,E)),C.gzindex===C.gzhead.extra.length&&(C.gzindex=0,C.status=73)}else C.status=73;if(C.status===73)if(C.gzhead.name){E=C.pending;do{if(C.pending===C.pending_buf_size&&(C.gzhead.hcrc&&C.pending>E&&(u.adler=c(u.adler,C.pending_buf,C.pending-E,E)),L(u),E=C.pending,C.pending===C.pending_buf_size)){R=1;break}R=C.gzindex<C.gzhead.name.length?255&C.gzhead.name.charCodeAt(C.gzindex++):0,ie(C,R)}while(R!==0);C.gzhead.hcrc&&C.pending>E&&(u.adler=c(u.adler,C.pending_buf,C.pending-E,E)),R===0&&(C.gzindex=0,C.status=91)}else C.status=91;if(C.status===91)if(C.gzhead.comment){E=C.pending;do{if(C.pending===C.pending_buf_size&&(C.gzhead.hcrc&&C.pending>E&&(u.adler=c(u.adler,C.pending_buf,C.pending-E,E)),L(u),E=C.pending,C.pending===C.pending_buf_size)){R=1;break}R=C.gzindex<C.gzhead.comment.length?255&C.gzhead.comment.charCodeAt(C.gzindex++):0,ie(C,R)}while(R!==0);C.gzhead.hcrc&&C.pending>E&&(u.adler=c(u.adler,C.pending_buf,C.pending-E,E)),R===0&&(C.status=103)}else C.status=103;if(C.status===103&&(C.gzhead.hcrc?(C.pending+2>C.pending_buf_size&&L(u),C.pending+2<=C.pending_buf_size&&(ie(C,255&u.adler),ie(C,u.adler>>8&255),u.adler=0,C.status=F)):C.status=F),C.pending!==0){if(L(u),u.avail_out===0)return C.last_flush=-1,f}else if(u.avail_in===0&&$(M)<=$(O)&&M!==p)return ee(u,-5);if(C.status===666&&u.avail_in!==0)return ee(u,-5);if(u.avail_in!==0||C.lookahead!==0||M!==d&&C.status!==666){var W=C.strategy===2?function(N,V){for(var J;;){if(N.lookahead===0&&(we(N),N.lookahead===0)){if(V===d)return g;break}if(N.match_length=0,J=a._tr_tally(N,0,N.window[N.strstart]),N.lookahead--,N.strstart++,J&&(P(N,!1),N.strm.avail_out===0))return g}return N.insert=0,V===p?(P(N,!0),N.strm.avail_out===0?ae:j):N.last_lit&&(P(N,!1),N.strm.avail_out===0)?g:U}(C,M):C.strategy===3?function(N,V){for(var J,q,se,Ce,fe=N.window;;){if(N.lookahead<=B){if(we(N),N.lookahead<=B&&V===d)return g;if(N.lookahead===0)break}if(N.match_length=0,N.lookahead>=x&&0<N.strstart&&(q=fe[se=N.strstart-1])===fe[++se]&&q===fe[++se]&&q===fe[++se]){Ce=N.strstart+B;do;while(q===fe[++se]&&q===fe[++se]&&q===fe[++se]&&q===fe[++se]&&q===fe[++se]&&q===fe[++se]&&q===fe[++se]&&q===fe[++se]&&se<Ce);N.match_length=B-(Ce-se),N.match_length>N.lookahead&&(N.match_length=N.lookahead)}if(N.match_length>=x?(J=a._tr_tally(N,1,N.match_length-x),N.lookahead-=N.match_length,N.strstart+=N.match_length,N.match_length=0):(J=a._tr_tally(N,0,N.window[N.strstart]),N.lookahead--,N.strstart++),J&&(P(N,!1),N.strm.avail_out===0))return g}return N.insert=0,V===p?(P(N,!0),N.strm.avail_out===0?ae:j):N.last_lit&&(P(N,!1),N.strm.avail_out===0)?g:U}(C,M):r[C.level].func(C,M);if(W!==ae&&W!==j||(C.status=666),W===g||W===ae)return u.avail_out===0&&(C.last_flush=-1),f;if(W===U&&(M===1?a._tr_align(C):M!==5&&(a._tr_stored_block(C,0,0,!1),M===3&&(ne(C.head),C.lookahead===0&&(C.strstart=0,C.block_start=0,C.insert=0))),L(u),u.avail_out===0))return C.last_flush=-1,f}return M!==p?f:C.wrap<=0?1:(C.wrap===2?(ie(C,255&u.adler),ie(C,u.adler>>8&255),ie(C,u.adler>>16&255),ie(C,u.adler>>24&255),ie(C,255&u.total_in),ie(C,u.total_in>>8&255),ie(C,u.total_in>>16&255),ie(C,u.total_in>>24&255)):(K(C,u.adler>>>16),K(C,65535&u.adler)),L(u),0<C.wrap&&(C.wrap=-C.wrap),C.pending!==0?f:1)},s.deflateEnd=function(u){var M;return u&&u.state?(M=u.state.status)!==S&&M!==69&&M!==73&&M!==91&&M!==103&&M!==F&&M!==666?ee(u,b):(u.state=null,M===F?ee(u,-3):f):b},s.deflateSetDictionary=function(u,M){var O,C,E,R,z,W,N,V,J=M.length;if(!u||!u.state||(R=(O=u.state).wrap)===2||R===1&&O.status!==S||O.lookahead)return b;for(R===1&&(u.adler=l(u.adler,M,J,0)),O.wrap=0,J>=O.w_size&&(R===0&&(ne(O.head),O.strstart=0,O.block_start=0,O.insert=0),V=new o.Buf8(O.w_size),o.arraySet(V,M,J-O.w_size,O.w_size,0),M=V,J=O.w_size),z=u.avail_in,W=u.next_in,N=u.input,u.avail_in=J,u.next_in=0,u.input=M,we(O);O.lookahead>=x;){for(C=O.strstart,E=O.lookahead-(x-1);O.ins_h=(O.ins_h<<O.hash_shift^O.window[C+x-1])&O.hash_mask,O.prev[C&O.w_mask]=O.head[O.ins_h],O.head[O.ins_h]=C,C++,--E;);O.strstart=C,O.lookahead=x-1,we(O)}return O.strstart+=O.lookahead,O.block_start=O.strstart,O.insert=O.lookahead,O.lookahead=0,O.match_length=O.prev_length=x-1,O.match_available=0,u.next_in=W,u.input=N,u.avail_in=z,O.wrap=R,f},s.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(t,i,s){i.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(t,i,s){i.exports=function(r,o){var a,l,c,h,d,p,f,b,m,v,y,_,w,k,I,T,A,D,x,B,Z,S,F,g,U;a=r.state,l=r.next_in,g=r.input,c=l+(r.avail_in-5),h=r.next_out,U=r.output,d=h-(o-r.avail_out),p=h+(r.avail_out-257),f=a.dmax,b=a.wsize,m=a.whave,v=a.wnext,y=a.window,_=a.hold,w=a.bits,k=a.lencode,I=a.distcode,T=(1<<a.lenbits)-1,A=(1<<a.distbits)-1;e:do{w<15&&(_+=g[l++]<<w,w+=8,_+=g[l++]<<w,w+=8),D=k[_&T];t:for(;;){if(_>>>=x=D>>>24,w-=x,(x=D>>>16&255)===0)U[h++]=65535&D;else{if(!(16&x)){if(!(64&x)){D=k[(65535&D)+(_&(1<<x)-1)];continue t}if(32&x){a.mode=12;break e}r.msg="invalid literal/length code",a.mode=30;break e}B=65535&D,(x&=15)&&(w<x&&(_+=g[l++]<<w,w+=8),B+=_&(1<<x)-1,_>>>=x,w-=x),w<15&&(_+=g[l++]<<w,w+=8,_+=g[l++]<<w,w+=8),D=I[_&A];n:for(;;){if(_>>>=x=D>>>24,w-=x,!(16&(x=D>>>16&255))){if(!(64&x)){D=I[(65535&D)+(_&(1<<x)-1)];continue n}r.msg="invalid distance code",a.mode=30;break e}if(Z=65535&D,w<(x&=15)&&(_+=g[l++]<<w,(w+=8)<x&&(_+=g[l++]<<w,w+=8)),f<(Z+=_&(1<<x)-1)){r.msg="invalid distance too far back",a.mode=30;break e}if(_>>>=x,w-=x,(x=h-d)<Z){if(m<(x=Z-x)&&a.sane){r.msg="invalid distance too far back",a.mode=30;break e}if(F=y,(S=0)===v){if(S+=b-x,x<B){for(B-=x;U[h++]=y[S++],--x;);S=h-Z,F=U}}else if(v<x){if(S+=b+v-x,(x-=v)<B){for(B-=x;U[h++]=y[S++],--x;);if(S=0,v<B){for(B-=x=v;U[h++]=y[S++],--x;);S=h-Z,F=U}}}else if(S+=v-x,x<B){for(B-=x;U[h++]=y[S++],--x;);S=h-Z,F=U}for(;2<B;)U[h++]=F[S++],U[h++]=F[S++],U[h++]=F[S++],B-=3;B&&(U[h++]=F[S++],1<B&&(U[h++]=F[S++]))}else{for(S=h-Z;U[h++]=U[S++],U[h++]=U[S++],U[h++]=U[S++],2<(B-=3););B&&(U[h++]=U[S++],1<B&&(U[h++]=U[S++]))}break}}break}}while(l<c&&h<p);l-=B=w>>3,_&=(1<<(w-=B<<3))-1,r.next_in=l,r.next_out=h,r.avail_in=l<c?c-l+5:5-(l-c),r.avail_out=h<p?p-h+257:257-(h-p),a.hold=_,a.bits=w}},{}],49:[function(t,i,s){var r=t("../utils/common"),o=t("./adler32"),a=t("./crc32"),l=t("./inffast"),c=t("./inftrees"),h=1,d=2,p=0,f=-2,b=1,m=852,v=592;function y(S){return(S>>>24&255)+(S>>>8&65280)+((65280&S)<<8)+((255&S)<<24)}function _(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new r.Buf16(320),this.work=new r.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function w(S){var F;return S&&S.state?(F=S.state,S.total_in=S.total_out=F.total=0,S.msg="",F.wrap&&(S.adler=1&F.wrap),F.mode=b,F.last=0,F.havedict=0,F.dmax=32768,F.head=null,F.hold=0,F.bits=0,F.lencode=F.lendyn=new r.Buf32(m),F.distcode=F.distdyn=new r.Buf32(v),F.sane=1,F.back=-1,p):f}function k(S){var F;return S&&S.state?((F=S.state).wsize=0,F.whave=0,F.wnext=0,w(S)):f}function I(S,F){var g,U;return S&&S.state?(U=S.state,F<0?(g=0,F=-F):(g=1+(F>>4),F<48&&(F&=15)),F&&(F<8||15<F)?f:(U.window!==null&&U.wbits!==F&&(U.window=null),U.wrap=g,U.wbits=F,k(S))):f}function T(S,F){var g,U;return S?(U=new _,(S.state=U).window=null,(g=I(S,F))!==p&&(S.state=null),g):f}var A,D,x=!0;function B(S){if(x){var F;for(A=new r.Buf32(512),D=new r.Buf32(32),F=0;F<144;)S.lens[F++]=8;for(;F<256;)S.lens[F++]=9;for(;F<280;)S.lens[F++]=7;for(;F<288;)S.lens[F++]=8;for(c(h,S.lens,0,288,A,0,S.work,{bits:9}),F=0;F<32;)S.lens[F++]=5;c(d,S.lens,0,32,D,0,S.work,{bits:5}),x=!1}S.lencode=A,S.lenbits=9,S.distcode=D,S.distbits=5}function Z(S,F,g,U){var ae,j=S.state;return j.window===null&&(j.wsize=1<<j.wbits,j.wnext=0,j.whave=0,j.window=new r.Buf8(j.wsize)),U>=j.wsize?(r.arraySet(j.window,F,g-j.wsize,j.wsize,0),j.wnext=0,j.whave=j.wsize):(U<(ae=j.wsize-j.wnext)&&(ae=U),r.arraySet(j.window,F,g-U,ae,j.wnext),(U-=ae)?(r.arraySet(j.window,F,g-U,U,0),j.wnext=U,j.whave=j.wsize):(j.wnext+=ae,j.wnext===j.wsize&&(j.wnext=0),j.whave<j.wsize&&(j.whave+=ae))),0}s.inflateReset=k,s.inflateReset2=I,s.inflateResetKeep=w,s.inflateInit=function(S){return T(S,15)},s.inflateInit2=T,s.inflate=function(S,F){var g,U,ae,j,ee,$,ne,L,P,ie,K,G,we,Re,de,pe,Ae,Ee,nt,ze,u,M,O,C,E=0,R=new r.Buf8(4),z=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!S||!S.state||!S.output||!S.input&&S.avail_in!==0)return f;(g=S.state).mode===12&&(g.mode=13),ee=S.next_out,ae=S.output,ne=S.avail_out,j=S.next_in,U=S.input,$=S.avail_in,L=g.hold,P=g.bits,ie=$,K=ne,M=p;e:for(;;)switch(g.mode){case b:if(g.wrap===0){g.mode=13;break}for(;P<16;){if($===0)break e;$--,L+=U[j++]<<P,P+=8}if(2&g.wrap&&L===35615){R[g.check=0]=255&L,R[1]=L>>>8&255,g.check=a(g.check,R,2,0),P=L=0,g.mode=2;break}if(g.flags=0,g.head&&(g.head.done=!1),!(1&g.wrap)||(((255&L)<<8)+(L>>8))%31){S.msg="incorrect header check",g.mode=30;break}if((15&L)!=8){S.msg="unknown compression method",g.mode=30;break}if(P-=4,u=8+(15&(L>>>=4)),g.wbits===0)g.wbits=u;else if(u>g.wbits){S.msg="invalid window size",g.mode=30;break}g.dmax=1<<u,S.adler=g.check=1,g.mode=512&L?10:12,P=L=0;break;case 2:for(;P<16;){if($===0)break e;$--,L+=U[j++]<<P,P+=8}if(g.flags=L,(255&g.flags)!=8){S.msg="unknown compression method",g.mode=30;break}if(57344&g.flags){S.msg="unknown header flags set",g.mode=30;break}g.head&&(g.head.text=L>>8&1),512&g.flags&&(R[0]=255&L,R[1]=L>>>8&255,g.check=a(g.check,R,2,0)),P=L=0,g.mode=3;case 3:for(;P<32;){if($===0)break e;$--,L+=U[j++]<<P,P+=8}g.head&&(g.head.time=L),512&g.flags&&(R[0]=255&L,R[1]=L>>>8&255,R[2]=L>>>16&255,R[3]=L>>>24&255,g.check=a(g.check,R,4,0)),P=L=0,g.mode=4;case 4:for(;P<16;){if($===0)break e;$--,L+=U[j++]<<P,P+=8}g.head&&(g.head.xflags=255&L,g.head.os=L>>8),512&g.flags&&(R[0]=255&L,R[1]=L>>>8&255,g.check=a(g.check,R,2,0)),P=L=0,g.mode=5;case 5:if(1024&g.flags){for(;P<16;){if($===0)break e;$--,L+=U[j++]<<P,P+=8}g.length=L,g.head&&(g.head.extra_len=L),512&g.flags&&(R[0]=255&L,R[1]=L>>>8&255,g.check=a(g.check,R,2,0)),P=L=0}else g.head&&(g.head.extra=null);g.mode=6;case 6:if(1024&g.flags&&($<(G=g.length)&&(G=$),G&&(g.head&&(u=g.head.extra_len-g.length,g.head.extra||(g.head.extra=new Array(g.head.extra_len)),r.arraySet(g.head.extra,U,j,G,u)),512&g.flags&&(g.check=a(g.check,U,G,j)),$-=G,j+=G,g.length-=G),g.length))break e;g.length=0,g.mode=7;case 7:if(2048&g.flags){if($===0)break e;for(G=0;u=U[j+G++],g.head&&u&&g.length<65536&&(g.head.name+=String.fromCharCode(u)),u&&G<$;);if(512&g.flags&&(g.check=a(g.check,U,G,j)),$-=G,j+=G,u)break e}else g.head&&(g.head.name=null);g.length=0,g.mode=8;case 8:if(4096&g.flags){if($===0)break e;for(G=0;u=U[j+G++],g.head&&u&&g.length<65536&&(g.head.comment+=String.fromCharCode(u)),u&&G<$;);if(512&g.flags&&(g.check=a(g.check,U,G,j)),$-=G,j+=G,u)break e}else g.head&&(g.head.comment=null);g.mode=9;case 9:if(512&g.flags){for(;P<16;){if($===0)break e;$--,L+=U[j++]<<P,P+=8}if(L!==(65535&g.check)){S.msg="header crc mismatch",g.mode=30;break}P=L=0}g.head&&(g.head.hcrc=g.flags>>9&1,g.head.done=!0),S.adler=g.check=0,g.mode=12;break;case 10:for(;P<32;){if($===0)break e;$--,L+=U[j++]<<P,P+=8}S.adler=g.check=y(L),P=L=0,g.mode=11;case 11:if(g.havedict===0)return S.next_out=ee,S.avail_out=ne,S.next_in=j,S.avail_in=$,g.hold=L,g.bits=P,2;S.adler=g.check=1,g.mode=12;case 12:if(F===5||F===6)break e;case 13:if(g.last){L>>>=7&P,P-=7&P,g.mode=27;break}for(;P<3;){if($===0)break e;$--,L+=U[j++]<<P,P+=8}switch(g.last=1&L,P-=1,3&(L>>>=1)){case 0:g.mode=14;break;case 1:if(B(g),g.mode=20,F!==6)break;L>>>=2,P-=2;break e;case 2:g.mode=17;break;case 3:S.msg="invalid block type",g.mode=30}L>>>=2,P-=2;break;case 14:for(L>>>=7&P,P-=7&P;P<32;){if($===0)break e;$--,L+=U[j++]<<P,P+=8}if((65535&L)!=(L>>>16^65535)){S.msg="invalid stored block lengths",g.mode=30;break}if(g.length=65535&L,P=L=0,g.mode=15,F===6)break e;case 15:g.mode=16;case 16:if(G=g.length){if($<G&&(G=$),ne<G&&(G=ne),G===0)break e;r.arraySet(ae,U,j,G,ee),$-=G,j+=G,ne-=G,ee+=G,g.length-=G;break}g.mode=12;break;case 17:for(;P<14;){if($===0)break e;$--,L+=U[j++]<<P,P+=8}if(g.nlen=257+(31&L),L>>>=5,P-=5,g.ndist=1+(31&L),L>>>=5,P-=5,g.ncode=4+(15&L),L>>>=4,P-=4,286<g.nlen||30<g.ndist){S.msg="too many length or distance symbols",g.mode=30;break}g.have=0,g.mode=18;case 18:for(;g.have<g.ncode;){for(;P<3;){if($===0)break e;$--,L+=U[j++]<<P,P+=8}g.lens[z[g.have++]]=7&L,L>>>=3,P-=3}for(;g.have<19;)g.lens[z[g.have++]]=0;if(g.lencode=g.lendyn,g.lenbits=7,O={bits:g.lenbits},M=c(0,g.lens,0,19,g.lencode,0,g.work,O),g.lenbits=O.bits,M){S.msg="invalid code lengths set",g.mode=30;break}g.have=0,g.mode=19;case 19:for(;g.have<g.nlen+g.ndist;){for(;pe=(E=g.lencode[L&(1<<g.lenbits)-1])>>>16&255,Ae=65535&E,!((de=E>>>24)<=P);){if($===0)break e;$--,L+=U[j++]<<P,P+=8}if(Ae<16)L>>>=de,P-=de,g.lens[g.have++]=Ae;else{if(Ae===16){for(C=de+2;P<C;){if($===0)break e;$--,L+=U[j++]<<P,P+=8}if(L>>>=de,P-=de,g.have===0){S.msg="invalid bit length repeat",g.mode=30;break}u=g.lens[g.have-1],G=3+(3&L),L>>>=2,P-=2}else if(Ae===17){for(C=de+3;P<C;){if($===0)break e;$--,L+=U[j++]<<P,P+=8}P-=de,u=0,G=3+(7&(L>>>=de)),L>>>=3,P-=3}else{for(C=de+7;P<C;){if($===0)break e;$--,L+=U[j++]<<P,P+=8}P-=de,u=0,G=11+(127&(L>>>=de)),L>>>=7,P-=7}if(g.have+G>g.nlen+g.ndist){S.msg="invalid bit length repeat",g.mode=30;break}for(;G--;)g.lens[g.have++]=u}}if(g.mode===30)break;if(g.lens[256]===0){S.msg="invalid code -- missing end-of-block",g.mode=30;break}if(g.lenbits=9,O={bits:g.lenbits},M=c(h,g.lens,0,g.nlen,g.lencode,0,g.work,O),g.lenbits=O.bits,M){S.msg="invalid literal/lengths set",g.mode=30;break}if(g.distbits=6,g.distcode=g.distdyn,O={bits:g.distbits},M=c(d,g.lens,g.nlen,g.ndist,g.distcode,0,g.work,O),g.distbits=O.bits,M){S.msg="invalid distances set",g.mode=30;break}if(g.mode=20,F===6)break e;case 20:g.mode=21;case 21:if(6<=$&&258<=ne){S.next_out=ee,S.avail_out=ne,S.next_in=j,S.avail_in=$,g.hold=L,g.bits=P,l(S,K),ee=S.next_out,ae=S.output,ne=S.avail_out,j=S.next_in,U=S.input,$=S.avail_in,L=g.hold,P=g.bits,g.mode===12&&(g.back=-1);break}for(g.back=0;pe=(E=g.lencode[L&(1<<g.lenbits)-1])>>>16&255,Ae=65535&E,!((de=E>>>24)<=P);){if($===0)break e;$--,L+=U[j++]<<P,P+=8}if(pe&&!(240&pe)){for(Ee=de,nt=pe,ze=Ae;pe=(E=g.lencode[ze+((L&(1<<Ee+nt)-1)>>Ee)])>>>16&255,Ae=65535&E,!(Ee+(de=E>>>24)<=P);){if($===0)break e;$--,L+=U[j++]<<P,P+=8}L>>>=Ee,P-=Ee,g.back+=Ee}if(L>>>=de,P-=de,g.back+=de,g.length=Ae,pe===0){g.mode=26;break}if(32&pe){g.back=-1,g.mode=12;break}if(64&pe){S.msg="invalid literal/length code",g.mode=30;break}g.extra=15&pe,g.mode=22;case 22:if(g.extra){for(C=g.extra;P<C;){if($===0)break e;$--,L+=U[j++]<<P,P+=8}g.length+=L&(1<<g.extra)-1,L>>>=g.extra,P-=g.extra,g.back+=g.extra}g.was=g.length,g.mode=23;case 23:for(;pe=(E=g.distcode[L&(1<<g.distbits)-1])>>>16&255,Ae=65535&E,!((de=E>>>24)<=P);){if($===0)break e;$--,L+=U[j++]<<P,P+=8}if(!(240&pe)){for(Ee=de,nt=pe,ze=Ae;pe=(E=g.distcode[ze+((L&(1<<Ee+nt)-1)>>Ee)])>>>16&255,Ae=65535&E,!(Ee+(de=E>>>24)<=P);){if($===0)break e;$--,L+=U[j++]<<P,P+=8}L>>>=Ee,P-=Ee,g.back+=Ee}if(L>>>=de,P-=de,g.back+=de,64&pe){S.msg="invalid distance code",g.mode=30;break}g.offset=Ae,g.extra=15&pe,g.mode=24;case 24:if(g.extra){for(C=g.extra;P<C;){if($===0)break e;$--,L+=U[j++]<<P,P+=8}g.offset+=L&(1<<g.extra)-1,L>>>=g.extra,P-=g.extra,g.back+=g.extra}if(g.offset>g.dmax){S.msg="invalid distance too far back",g.mode=30;break}g.mode=25;case 25:if(ne===0)break e;if(G=K-ne,g.offset>G){if((G=g.offset-G)>g.whave&&g.sane){S.msg="invalid distance too far back",g.mode=30;break}we=G>g.wnext?(G-=g.wnext,g.wsize-G):g.wnext-G,G>g.length&&(G=g.length),Re=g.window}else Re=ae,we=ee-g.offset,G=g.length;for(ne<G&&(G=ne),ne-=G,g.length-=G;ae[ee++]=Re[we++],--G;);g.length===0&&(g.mode=21);break;case 26:if(ne===0)break e;ae[ee++]=g.length,ne--,g.mode=21;break;case 27:if(g.wrap){for(;P<32;){if($===0)break e;$--,L|=U[j++]<<P,P+=8}if(K-=ne,S.total_out+=K,g.total+=K,K&&(S.adler=g.check=g.flags?a(g.check,ae,K,ee-K):o(g.check,ae,K,ee-K)),K=ne,(g.flags?L:y(L))!==g.check){S.msg="incorrect data check",g.mode=30;break}P=L=0}g.mode=28;case 28:if(g.wrap&&g.flags){for(;P<32;){if($===0)break e;$--,L+=U[j++]<<P,P+=8}if(L!==(4294967295&g.total)){S.msg="incorrect length check",g.mode=30;break}P=L=0}g.mode=29;case 29:M=1;break e;case 30:M=-3;break e;case 31:return-4;case 32:default:return f}return S.next_out=ee,S.avail_out=ne,S.next_in=j,S.avail_in=$,g.hold=L,g.bits=P,(g.wsize||K!==S.avail_out&&g.mode<30&&(g.mode<27||F!==4))&&Z(S,S.output,S.next_out,K-S.avail_out)?(g.mode=31,-4):(ie-=S.avail_in,K-=S.avail_out,S.total_in+=ie,S.total_out+=K,g.total+=K,g.wrap&&K&&(S.adler=g.check=g.flags?a(g.check,ae,K,S.next_out-K):o(g.check,ae,K,S.next_out-K)),S.data_type=g.bits+(g.last?64:0)+(g.mode===12?128:0)+(g.mode===20||g.mode===15?256:0),(ie==0&&K===0||F===4)&&M===p&&(M=-5),M)},s.inflateEnd=function(S){if(!S||!S.state)return f;var F=S.state;return F.window&&(F.window=null),S.state=null,p},s.inflateGetHeader=function(S,F){var g;return S&&S.state&&2&(g=S.state).wrap?((g.head=F).done=!1,p):f},s.inflateSetDictionary=function(S,F){var g,U=F.length;return S&&S.state?(g=S.state).wrap!==0&&g.mode!==11?f:g.mode===11&&o(1,F,U,0)!==g.check?-3:Z(S,F,U,U)?(g.mode=31,-4):(g.havedict=1,p):f},s.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(t,i,s){var r=t("../utils/common"),o=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],a=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],l=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],c=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];i.exports=function(h,d,p,f,b,m,v,y){var _,w,k,I,T,A,D,x,B,Z=y.bits,S=0,F=0,g=0,U=0,ae=0,j=0,ee=0,$=0,ne=0,L=0,P=null,ie=0,K=new r.Buf16(16),G=new r.Buf16(16),we=null,Re=0;for(S=0;S<=15;S++)K[S]=0;for(F=0;F<f;F++)K[d[p+F]]++;for(ae=Z,U=15;1<=U&&K[U]===0;U--);if(U<ae&&(ae=U),U===0)return b[m++]=20971520,b[m++]=20971520,y.bits=1,0;for(g=1;g<U&&K[g]===0;g++);for(ae<g&&(ae=g),S=$=1;S<=15;S++)if($<<=1,($-=K[S])<0)return-1;if(0<$&&(h===0||U!==1))return-1;for(G[1]=0,S=1;S<15;S++)G[S+1]=G[S]+K[S];for(F=0;F<f;F++)d[p+F]!==0&&(v[G[d[p+F]]++]=F);if(A=h===0?(P=we=v,19):h===1?(P=o,ie-=257,we=a,Re-=257,256):(P=l,we=c,-1),S=g,T=m,ee=F=L=0,k=-1,I=(ne=1<<(j=ae))-1,h===1&&852<ne||h===2&&592<ne)return 1;for(;;){for(D=S-ee,B=v[F]<A?(x=0,v[F]):v[F]>A?(x=we[Re+v[F]],P[ie+v[F]]):(x=96,0),_=1<<S-ee,g=w=1<<j;b[T+(L>>ee)+(w-=_)]=D<<24|x<<16|B|0,w!==0;);for(_=1<<S-1;L&_;)_>>=1;if(_!==0?(L&=_-1,L+=_):L=0,F++,--K[S]==0){if(S===U)break;S=d[p+v[F]]}if(ae<S&&(L&I)!==k){for(ee===0&&(ee=ae),T+=g,$=1<<(j=S-ee);j+ee<U&&!(($-=K[j+ee])<=0);)j++,$<<=1;if(ne+=1<<j,h===1&&852<ne||h===2&&592<ne)return 1;b[k=L&I]=ae<<24|j<<16|T-m|0}}return L!==0&&(b[T+L]=S-ee<<24|64<<16|0),y.bits=ae,0}},{"../utils/common":41}],51:[function(t,i,s){i.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(t,i,s){var r=t("../utils/common"),o=0,a=1;function l(E){for(var R=E.length;0<=--R;)E[R]=0}var c=0,h=29,d=256,p=d+1+h,f=30,b=19,m=2*p+1,v=15,y=16,_=7,w=256,k=16,I=17,T=18,A=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],D=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],B=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],Z=new Array(2*(p+2));l(Z);var S=new Array(2*f);l(S);var F=new Array(512);l(F);var g=new Array(256);l(g);var U=new Array(h);l(U);var ae,j,ee,$=new Array(f);function ne(E,R,z,W,N){this.static_tree=E,this.extra_bits=R,this.extra_base=z,this.elems=W,this.max_length=N,this.has_stree=E&&E.length}function L(E,R){this.dyn_tree=E,this.max_code=0,this.stat_desc=R}function P(E){return E<256?F[E]:F[256+(E>>>7)]}function ie(E,R){E.pending_buf[E.pending++]=255&R,E.pending_buf[E.pending++]=R>>>8&255}function K(E,R,z){E.bi_valid>y-z?(E.bi_buf|=R<<E.bi_valid&65535,ie(E,E.bi_buf),E.bi_buf=R>>y-E.bi_valid,E.bi_valid+=z-y):(E.bi_buf|=R<<E.bi_valid&65535,E.bi_valid+=z)}function G(E,R,z){K(E,z[2*R],z[2*R+1])}function we(E,R){for(var z=0;z|=1&E,E>>>=1,z<<=1,0<--R;);return z>>>1}function Re(E,R,z){var W,N,V=new Array(v+1),J=0;for(W=1;W<=v;W++)V[W]=J=J+z[W-1]<<1;for(N=0;N<=R;N++){var q=E[2*N+1];q!==0&&(E[2*N]=we(V[q]++,q))}}function de(E){var R;for(R=0;R<p;R++)E.dyn_ltree[2*R]=0;for(R=0;R<f;R++)E.dyn_dtree[2*R]=0;for(R=0;R<b;R++)E.bl_tree[2*R]=0;E.dyn_ltree[2*w]=1,E.opt_len=E.static_len=0,E.last_lit=E.matches=0}function pe(E){8<E.bi_valid?ie(E,E.bi_buf):0<E.bi_valid&&(E.pending_buf[E.pending++]=E.bi_buf),E.bi_buf=0,E.bi_valid=0}function Ae(E,R,z,W){var N=2*R,V=2*z;return E[N]<E[V]||E[N]===E[V]&&W[R]<=W[z]}function Ee(E,R,z){for(var W=E.heap[z],N=z<<1;N<=E.heap_len&&(N<E.heap_len&&Ae(R,E.heap[N+1],E.heap[N],E.depth)&&N++,!Ae(R,W,E.heap[N],E.depth));)E.heap[z]=E.heap[N],z=N,N<<=1;E.heap[z]=W}function nt(E,R,z){var W,N,V,J,q=0;if(E.last_lit!==0)for(;W=E.pending_buf[E.d_buf+2*q]<<8|E.pending_buf[E.d_buf+2*q+1],N=E.pending_buf[E.l_buf+q],q++,W===0?G(E,N,R):(G(E,(V=g[N])+d+1,R),(J=A[V])!==0&&K(E,N-=U[V],J),G(E,V=P(--W),z),(J=D[V])!==0&&K(E,W-=$[V],J)),q<E.last_lit;);G(E,w,R)}function ze(E,R){var z,W,N,V=R.dyn_tree,J=R.stat_desc.static_tree,q=R.stat_desc.has_stree,se=R.stat_desc.elems,Ce=-1;for(E.heap_len=0,E.heap_max=m,z=0;z<se;z++)V[2*z]!==0?(E.heap[++E.heap_len]=Ce=z,E.depth[z]=0):V[2*z+1]=0;for(;E.heap_len<2;)V[2*(N=E.heap[++E.heap_len]=Ce<2?++Ce:0)]=1,E.depth[N]=0,E.opt_len--,q&&(E.static_len-=J[2*N+1]);for(R.max_code=Ce,z=E.heap_len>>1;1<=z;z--)Ee(E,V,z);for(N=se;z=E.heap[1],E.heap[1]=E.heap[E.heap_len--],Ee(E,V,1),W=E.heap[1],E.heap[--E.heap_max]=z,E.heap[--E.heap_max]=W,V[2*N]=V[2*z]+V[2*W],E.depth[N]=(E.depth[z]>=E.depth[W]?E.depth[z]:E.depth[W])+1,V[2*z+1]=V[2*W+1]=N,E.heap[1]=N++,Ee(E,V,1),2<=E.heap_len;);E.heap[--E.heap_max]=E.heap[1],function(fe,it){var Li,gt,Oi,Pe,Is,Hr,St=it.dyn_tree,el=it.max_code,yh=it.stat_desc.static_tree,bh=it.stat_desc.has_stree,wh=it.stat_desc.extra_bits,tl=it.stat_desc.extra_base,Di=it.stat_desc.max_length,ks=0;for(Pe=0;Pe<=v;Pe++)fe.bl_count[Pe]=0;for(St[2*fe.heap[fe.heap_max]+1]=0,Li=fe.heap_max+1;Li<m;Li++)Di<(Pe=St[2*St[2*(gt=fe.heap[Li])+1]+1]+1)&&(Pe=Di,ks++),St[2*gt+1]=Pe,el<gt||(fe.bl_count[Pe]++,Is=0,tl<=gt&&(Is=wh[gt-tl]),Hr=St[2*gt],fe.opt_len+=Hr*(Pe+Is),bh&&(fe.static_len+=Hr*(yh[2*gt+1]+Is)));if(ks!==0){do{for(Pe=Di-1;fe.bl_count[Pe]===0;)Pe--;fe.bl_count[Pe]--,fe.bl_count[Pe+1]+=2,fe.bl_count[Di]--,ks-=2}while(0<ks);for(Pe=Di;Pe!==0;Pe--)for(gt=fe.bl_count[Pe];gt!==0;)el<(Oi=fe.heap[--Li])||(St[2*Oi+1]!==Pe&&(fe.opt_len+=(Pe-St[2*Oi+1])*St[2*Oi],St[2*Oi+1]=Pe),gt--)}}(E,R),Re(V,Ce,E.bl_count)}function u(E,R,z){var W,N,V=-1,J=R[1],q=0,se=7,Ce=4;for(J===0&&(se=138,Ce=3),R[2*(z+1)+1]=65535,W=0;W<=z;W++)N=J,J=R[2*(W+1)+1],++q<se&&N===J||(q<Ce?E.bl_tree[2*N]+=q:N!==0?(N!==V&&E.bl_tree[2*N]++,E.bl_tree[2*k]++):q<=10?E.bl_tree[2*I]++:E.bl_tree[2*T]++,V=N,Ce=(q=0)===J?(se=138,3):N===J?(se=6,3):(se=7,4))}function M(E,R,z){var W,N,V=-1,J=R[1],q=0,se=7,Ce=4;for(J===0&&(se=138,Ce=3),W=0;W<=z;W++)if(N=J,J=R[2*(W+1)+1],!(++q<se&&N===J)){if(q<Ce)for(;G(E,N,E.bl_tree),--q!=0;);else N!==0?(N!==V&&(G(E,N,E.bl_tree),q--),G(E,k,E.bl_tree),K(E,q-3,2)):q<=10?(G(E,I,E.bl_tree),K(E,q-3,3)):(G(E,T,E.bl_tree),K(E,q-11,7));V=N,Ce=(q=0)===J?(se=138,3):N===J?(se=6,3):(se=7,4)}}l($);var O=!1;function C(E,R,z,W){K(E,(c<<1)+(W?1:0),3),function(N,V,J,q){pe(N),ie(N,J),ie(N,~J),r.arraySet(N.pending_buf,N.window,V,J,N.pending),N.pending+=J}(E,R,z)}s._tr_init=function(E){O||(function(){var R,z,W,N,V,J=new Array(v+1);for(N=W=0;N<h-1;N++)for(U[N]=W,R=0;R<1<<A[N];R++)g[W++]=N;for(g[W-1]=N,N=V=0;N<16;N++)for($[N]=V,R=0;R<1<<D[N];R++)F[V++]=N;for(V>>=7;N<f;N++)for($[N]=V<<7,R=0;R<1<<D[N]-7;R++)F[256+V++]=N;for(z=0;z<=v;z++)J[z]=0;for(R=0;R<=143;)Z[2*R+1]=8,R++,J[8]++;for(;R<=255;)Z[2*R+1]=9,R++,J[9]++;for(;R<=279;)Z[2*R+1]=7,R++,J[7]++;for(;R<=287;)Z[2*R+1]=8,R++,J[8]++;for(Re(Z,p+1,J),R=0;R<f;R++)S[2*R+1]=5,S[2*R]=we(R,5);ae=new ne(Z,A,d+1,p,v),j=new ne(S,D,0,f,v),ee=new ne(new Array(0),x,0,b,_)}(),O=!0),E.l_desc=new L(E.dyn_ltree,ae),E.d_desc=new L(E.dyn_dtree,j),E.bl_desc=new L(E.bl_tree,ee),E.bi_buf=0,E.bi_valid=0,de(E)},s._tr_stored_block=C,s._tr_flush_block=function(E,R,z,W){var N,V,J=0;0<E.level?(E.strm.data_type===2&&(E.strm.data_type=function(q){var se,Ce=4093624447;for(se=0;se<=31;se++,Ce>>>=1)if(1&Ce&&q.dyn_ltree[2*se]!==0)return o;if(q.dyn_ltree[18]!==0||q.dyn_ltree[20]!==0||q.dyn_ltree[26]!==0)return a;for(se=32;se<d;se++)if(q.dyn_ltree[2*se]!==0)return a;return o}(E)),ze(E,E.l_desc),ze(E,E.d_desc),J=function(q){var se;for(u(q,q.dyn_ltree,q.l_desc.max_code),u(q,q.dyn_dtree,q.d_desc.max_code),ze(q,q.bl_desc),se=b-1;3<=se&&q.bl_tree[2*B[se]+1]===0;se--);return q.opt_len+=3*(se+1)+5+5+4,se}(E),N=E.opt_len+3+7>>>3,(V=E.static_len+3+7>>>3)<=N&&(N=V)):N=V=z+5,z+4<=N&&R!==-1?C(E,R,z,W):E.strategy===4||V===N?(K(E,2+(W?1:0),3),nt(E,Z,S)):(K(E,4+(W?1:0),3),function(q,se,Ce,fe){var it;for(K(q,se-257,5),K(q,Ce-1,5),K(q,fe-4,4),it=0;it<fe;it++)K(q,q.bl_tree[2*B[it]+1],3);M(q,q.dyn_ltree,se-1),M(q,q.dyn_dtree,Ce-1)}(E,E.l_desc.max_code+1,E.d_desc.max_code+1,J+1),nt(E,E.dyn_ltree,E.dyn_dtree)),de(E),W&&pe(E)},s._tr_tally=function(E,R,z){return E.pending_buf[E.d_buf+2*E.last_lit]=R>>>8&255,E.pending_buf[E.d_buf+2*E.last_lit+1]=255&R,E.pending_buf[E.l_buf+E.last_lit]=255&z,E.last_lit++,R===0?E.dyn_ltree[2*z]++:(E.matches++,R--,E.dyn_ltree[2*(g[z]+d+1)]++,E.dyn_dtree[2*P(R)]++),E.last_lit===E.lit_bufsize-1},s._tr_align=function(E){K(E,2,3),G(E,w,Z),function(R){R.bi_valid===16?(ie(R,R.bi_buf),R.bi_buf=0,R.bi_valid=0):8<=R.bi_valid&&(R.pending_buf[R.pending++]=255&R.bi_buf,R.bi_buf>>=8,R.bi_valid-=8)}(E)}},{"../utils/common":41}],53:[function(t,i,s){i.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(t,i,s){(function(r){(function(o,a){if(!o.setImmediate){var l,c,h,d,p=1,f={},b=!1,m=o.document,v=Object.getPrototypeOf&&Object.getPrototypeOf(o);v=v&&v.setTimeout?v:o,l={}.toString.call(o.process)==="[object process]"?function(k){process.nextTick(function(){_(k)})}:function(){if(o.postMessage&&!o.importScripts){var k=!0,I=o.onmessage;return o.onmessage=function(){k=!1},o.postMessage("","*"),o.onmessage=I,k}}()?(d="setImmediate$"+Math.random()+"$",o.addEventListener?o.addEventListener("message",w,!1):o.attachEvent("onmessage",w),function(k){o.postMessage(d+k,"*")}):o.MessageChannel?((h=new MessageChannel).port1.onmessage=function(k){_(k.data)},function(k){h.port2.postMessage(k)}):m&&"onreadystatechange"in m.createElement("script")?(c=m.documentElement,function(k){var I=m.createElement("script");I.onreadystatechange=function(){_(k),I.onreadystatechange=null,c.removeChild(I),I=null},c.appendChild(I)}):function(k){setTimeout(_,0,k)},v.setImmediate=function(k){typeof k!="function"&&(k=new Function(""+k));for(var I=new Array(arguments.length-1),T=0;T<I.length;T++)I[T]=arguments[T+1];var A={callback:k,args:I};return f[p]=A,l(p),p++},v.clearImmediate=y}function y(k){delete f[k]}function _(k){if(b)setTimeout(_,0,k);else{var I=f[k];if(I){b=!0;try{(function(T){var A=T.callback,D=T.args;switch(D.length){case 0:A();break;case 1:A(D[0]);break;case 2:A(D[0],D[1]);break;case 3:A(D[0],D[1],D[2]);break;default:A.apply(a,D)}})(I)}finally{y(k),b=!1}}}}function w(k){k.source===o&&typeof k.data=="string"&&k.data.indexOf(d)===0&&_(+k.data.slice(d.length))}})(typeof self>"u"?r===void 0?this:r:self)}).call(this,typeof Yn<"u"?Yn:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})})(Zc);var sp=Zc.exports;const rp=Yc(sp);function Qo(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(n);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(n,i[s])&&(t[i[s]]=n[i[s]]);return t}function Jc(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const op=Jc,Qc=new us("auth","Firebase",Jc());/**
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
 */const tr=new Yo("@firebase/auth");function ap(n,...e){tr.logLevel<=ye.WARN&&tr.warn(`Auth (${Ei}): ${n}`,...e)}function Ms(n,...e){tr.logLevel<=ye.ERROR&&tr.error(`Auth (${Ei}): ${n}`,...e)}/**
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
 */function Ct(n,...e){throw ea(n,...e)}function ft(n,...e){return ea(n,...e)}function Xo(n,e,t){const i=Object.assign(Object.assign({},op()),{[e]:t});return new us("auth","Firebase",i).create(e,{appName:n.name})}function Xt(n){return Xo(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Xc(n,e,t){const i=t;if(!(e instanceof i))throw i.name!==e.constructor.name&&Ct(n,"argument-error"),Xo(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ea(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return Qc.create(n,...e)}function oe(n,e,...t){if(!n)throw ea(e,...t)}function At(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ms(e),new Error(e)}function Dt(n,e){n||At(e)}/**
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
 */function go(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function lp(){return hl()==="http:"||hl()==="https:"}function hl(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function cp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(lp()||Lh()||"connection"in navigator)?navigator.onLine:!0}function dp(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class hs{constructor(e,t){this.shortDelay=e,this.longDelay=t,Dt(t>e,"Short delay should be less than long delay!"),this.isMobile=Ko()||$c()}get(){return cp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function ta(n,e){Dt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class ed{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;At("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;At("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;At("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const up={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const hp=new hs(3e4,6e4);function na(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Ci(n,e,t,i,s={}){return td(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=wi(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const c=Object.assign({method:e,headers:l},r);return Nh()||(c.referrerPolicy="no-referrer"),ed.fetch()(nd(n,n.config.apiHost,t,a),c)})}async function td(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},up),e);try{const s=new pp(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Ts(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ts(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw Ts(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw Ts(n,"user-disabled",o);const h=i[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Xo(n,h,c);Ct(n,h)}}catch(s){if(s instanceof hn)throw s;Ct(n,"network-request-failed",{message:String(s)})}}async function fp(n,e,t,i,s={}){const r=await Ci(n,e,t,i,s);return"mfaPendingCredential"in r&&Ct(n,"multi-factor-auth-required",{_serverResponse:r}),r}function nd(n,e,t,i){const s=`${e}${t}?${i}`;return n.config.emulator?ta(n.config,s):`${n.config.apiScheme}://${s}`}class pp{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(ft(this.auth,"network-request-failed")),hp.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Ts(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=ft(n,e,i);return s.customData._tokenResponse=t,s}/**
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
 */async function mp(n,e){return Ci(n,"POST","/v1/accounts:delete",e)}async function id(n,e){return Ci(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function $i(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function gp(n,e=!1){const t=Ue(n),i=await t.getIdToken(e),s=ia(i);oe(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:s,token:i,authTime:$i(Zr(s.auth_time)),issuedAtTime:$i(Zr(s.iat)),expirationTime:$i(Zr(s.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function Zr(n){return Number(n)*1e3}function ia(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return Ms("JWT malformed, contained fewer than 3 sections"),null;try{const s=Zs(t);return s?JSON.parse(s):(Ms("Failed to decode base64 JWT payload"),null)}catch(s){return Ms("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function fl(n){const e=ia(n);return oe(e,"internal-error"),oe(typeof e.exp<"u","internal-error"),oe(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function is(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof hn&&_p(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function _p({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class vp{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class _o{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=$i(this.lastLoginAt),this.creationTime=$i(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function nr(n){var e;const t=n.auth,i=await n.getIdToken(),s=await is(n,id(t,{idToken:i}));oe(s==null?void 0:s.users.length,t,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?sd(r.providerUserInfo):[],a=bp(n.providerData,o),l=n.isAnonymous,c=!(n.email&&r.passwordHash)&&!(a!=null&&a.length),h=l?c:!1,d={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new _o(r.createdAt,r.lastLoginAt),isAnonymous:h};Object.assign(n,d)}async function yp(n){const e=Ue(n);await nr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function bp(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function sd(n){return n.map(e=>{var{providerId:t}=e,i=Qo(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
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
 */async function wp(n,e){const t=await td(n,{},async()=>{const i=wi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=nd(n,s,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",ed.fetch()(o,{method:"POST",headers:a,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Ep(n,e){return Ci(n,"POST","/v2/accounts:revokeToken",na(n,e))}/**
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
 */class Xn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){oe(e.idToken,"internal-error"),oe(typeof e.idToken<"u","internal-error"),oe(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):fl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){oe(e.length!==0,"internal-error");const t=fl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(oe(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await wp(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new Xn;return i&&(oe(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(oe(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(oe(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Xn,this.toJSON())}_performRefresh(){return At("not implemented")}}/**
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
 */function zt(n,e){oe(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class xt{constructor(e){var{uid:t,auth:i,stsTokenManager:s}=e,r=Qo(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new vp(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new _o(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await is(this,this.stsTokenManager.getToken(this.auth,e));return oe(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return gp(this,e)}reload(){return yp(this)}_assign(e){this!==e&&(oe(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new xt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){oe(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await nr(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(yt(this.auth.app))return Promise.reject(Xt(this.auth));const e=await this.getIdToken();return await is(this,mp(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,s,r,o,a,l,c,h;const d=(i=t.displayName)!==null&&i!==void 0?i:void 0,p=(s=t.email)!==null&&s!==void 0?s:void 0,f=(r=t.phoneNumber)!==null&&r!==void 0?r:void 0,b=(o=t.photoURL)!==null&&o!==void 0?o:void 0,m=(a=t.tenantId)!==null&&a!==void 0?a:void 0,v=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,y=(c=t.createdAt)!==null&&c!==void 0?c:void 0,_=(h=t.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:w,emailVerified:k,isAnonymous:I,providerData:T,stsTokenManager:A}=t;oe(w&&A,e,"internal-error");const D=Xn.fromJSON(this.name,A);oe(typeof w=="string",e,"internal-error"),zt(d,e.name),zt(p,e.name),oe(typeof k=="boolean",e,"internal-error"),oe(typeof I=="boolean",e,"internal-error"),zt(f,e.name),zt(b,e.name),zt(m,e.name),zt(v,e.name),zt(y,e.name),zt(_,e.name);const x=new xt({uid:w,auth:e,email:p,emailVerified:k,displayName:d,isAnonymous:I,photoURL:b,phoneNumber:f,tenantId:m,stsTokenManager:D,createdAt:y,lastLoginAt:_});return T&&Array.isArray(T)&&(x.providerData=T.map(B=>Object.assign({},B))),v&&(x._redirectEventId=v),x}static async _fromIdTokenResponse(e,t,i=!1){const s=new Xn;s.updateFromServerResponse(t);const r=new xt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await nr(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];oe(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?sd(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(r!=null&&r.length),a=new Xn;a.updateFromIdToken(i);const l=new xt({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new _o(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(r!=null&&r.length)};return Object.assign(l,c),l}}/**
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
 */const pl=new Map;function Rt(n){Dt(n instanceof Function,"Expected a class definition");let e=pl.get(n);return e?(Dt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,pl.set(n,e),e)}/**
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
 */class rd{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}rd.type="NONE";const ml=rd;/**
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
 */function Us(n,e,t){return`firebase:${n}:${e}:${t}`}class ei{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=Us(this.userKey,s.apiKey,r),this.fullPersistenceKey=Us("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?xt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new ei(Rt(ml),e,i);const s=(await Promise.all(t.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=s[0]||Rt(ml);const o=Us(i,e.config.apiKey,e.name);let a=null;for(const c of t)try{const h=await c._get(o);if(h){const d=xt._fromJSON(e,h);c!==r&&(a=d),r=c;break}}catch{}const l=s.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!l.length?new ei(r,e,i):(r=l[0],a&&await r._set(o,a.toJSON()),await Promise.all(t.map(async c=>{if(c!==r)try{await c._remove(o)}catch{}})),new ei(r,e,i))}}/**
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
 */function gl(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(cd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(od(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ud(e))return"Blackberry";if(hd(e))return"Webos";if(ad(e))return"Safari";if((e.includes("chrome/")||ld(e))&&!e.includes("edge/"))return"Chrome";if(dd(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function od(n=Ve()){return/firefox\//i.test(n)}function ad(n=Ve()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ld(n=Ve()){return/crios\//i.test(n)}function cd(n=Ve()){return/iemobile/i.test(n)}function dd(n=Ve()){return/android/i.test(n)}function ud(n=Ve()){return/blackberry/i.test(n)}function hd(n=Ve()){return/webos/i.test(n)}function sa(n=Ve()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Cp(n=Ve()){var e;return sa(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Ip(){return Oh()&&document.documentMode===10}function fd(n=Ve()){return sa(n)||dd(n)||hd(n)||ud(n)||/windows phone/i.test(n)||cd(n)}/**
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
 */function pd(n,e=[]){let t;switch(n){case"Browser":t=gl(Ve());break;case"Worker":t=`${gl(Ve())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Ei}/${i}`}/**
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
 */class kp{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,a)=>{try{const l=e(r);o(l)}catch(l){a(l)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
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
 */async function Sp(n,e={}){return Ci(n,"GET","/v2/passwordPolicy",na(n,e))}/**
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
 */const Tp=6;class Ap{constructor(e){var t,i,s,r;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:Tp,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(r=e.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,s,r,o,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(i=l.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(r=l.containsUppercaseLetter)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
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
 */class xp{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new _l(this),this.idTokenSubscription=new _l(this),this.beforeStateQueue=new kp(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Qc,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Rt(t)),this._initializationPromise=this.queue(async()=>{var i,s;if(!this._deleted&&(this.persistenceManager=await ei.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await id(this,{idToken:e}),i=await xt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(yt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let s=i,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(s=l.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return oe(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await nr(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=dp()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(yt(this.app))return Promise.reject(Xt(this));const t=e?Ue(e):null;return t&&oe(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&oe(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return yt(this.app)?Promise.reject(Xt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return yt(this.app)?Promise.reject(Xt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Rt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Sp(this),t=new Ap(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new us("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Ep(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Rt(e)||this._popupRedirectResolver;oe(t,this,"argument-error"),this.redirectPersistenceManager=await ei.create(this,[Rt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(oe(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,i,s);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return oe(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=pd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&ap(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Un(n){return Ue(n)}class _l{constructor(e){this.auth=e,this.observer=null,this.addObserver=Hh(t=>this.observer=t)}get next(){return oe(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let ra={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Rp(n){ra=n}function Pp(n){return ra.loadJS(n)}function Np(){return ra.gapiScript}function Lp(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function Op(n,e){const t=Jo(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(Xs(r,e??{}))return s;Ct(s,"already-initialized")}return t.initialize({options:e})}function Dp(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(Rt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function Fp(n,e,t){const i=Un(n);oe(i._canInitEmulator,i,"emulator-config-failed"),oe(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=md(e),{host:o,port:a}=Mp(e),l=a===null?"":`:${a}`;i.config.emulator={url:`${r}//${o}${l}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})}),Up()}function md(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Mp(n){const e=md(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:vl(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:vl(o)}}}function vl(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Up(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class gd{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return At("not implemented")}_getIdTokenResponse(e){return At("not implemented")}_linkToIdToken(e,t){return At("not implemented")}_getReauthenticationResolver(e){return At("not implemented")}}/**
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
 */async function ti(n,e){return fp(n,"POST","/v1/accounts:signInWithIdp",na(n,e))}/**
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
 */const Bp="http://localhost";class Rn extends gd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Rn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ct("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s}=t,r=Qo(t,["providerId","signInMethod"]);if(!i||!s)return null;const o=new Rn(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return ti(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,ti(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,ti(e,t)}buildRequest(){const e={requestUri:Bp,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=wi(t)}return e}}/**
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
 */class Ir{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class fs extends Ir{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Vt extends fs{constructor(){super("facebook.com")}static credential(e){return Rn._fromParams({providerId:Vt.PROVIDER_ID,signInMethod:Vt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Vt.credentialFromTaggedObject(e)}static credentialFromError(e){return Vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Vt.credential(e.oauthAccessToken)}catch{return null}}}Vt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Vt.PROVIDER_ID="facebook.com";/**
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
 */class We extends fs{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Rn._fromParams({providerId:We.PROVIDER_ID,signInMethod:We.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return We.credentialFromTaggedObject(e)}static credentialFromError(e){return We.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return We.credential(t,i)}catch{return null}}}We.GOOGLE_SIGN_IN_METHOD="google.com";We.PROVIDER_ID="google.com";/**
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
 */class Gt extends fs{constructor(){super("github.com")}static credential(e){return Rn._fromParams({providerId:Gt.PROVIDER_ID,signInMethod:Gt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Gt.credentialFromTaggedObject(e)}static credentialFromError(e){return Gt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Gt.credential(e.oauthAccessToken)}catch{return null}}}Gt.GITHUB_SIGN_IN_METHOD="github.com";Gt.PROVIDER_ID="github.com";/**
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
 */class qt extends fs{constructor(){super("twitter.com")}static credential(e,t){return Rn._fromParams({providerId:qt.PROVIDER_ID,signInMethod:qt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return qt.credentialFromTaggedObject(e)}static credentialFromError(e){return qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return qt.credential(t,i)}catch{return null}}}qt.TWITTER_SIGN_IN_METHOD="twitter.com";qt.PROVIDER_ID="twitter.com";/**
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
 */class ai{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await xt._fromIdTokenResponse(e,i,s),o=yl(i);return new ai({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=yl(i);return new ai({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function yl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class ir extends hn{constructor(e,t,i,s){var r;super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,ir.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new ir(e,t,i,s)}}function _d(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?ir._fromErrorAndOperation(n,r,e,i):r})}async function zp(n,e,t=!1){const i=await is(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return ai._forOperation(n,"link",i)}/**
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
 */async function $p(n,e,t=!1){const{auth:i}=n;if(yt(i.app))return Promise.reject(Xt(i));const s="reauthenticate";try{const r=await is(n,_d(i,s,e,n),t);oe(r.idToken,i,"internal-error");const o=ia(r.idToken);oe(o,i,"internal-error");const{sub:a}=o;return oe(n.uid===a,i,"user-mismatch"),ai._forOperation(n,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&Ct(i,"user-mismatch"),r}}/**
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
 */async function vd(n,e,t=!1){if(yt(n.app))return Promise.reject(Xt(n));const i="signIn",s=await _d(n,i,e),r=await ai._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}async function yd(n,e){return vd(Un(n),e)}/**
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
 */function Bs(n,e){return Ue(n).setPersistence(e)}function Wp(n,e,t,i){return Ue(n).onIdTokenChanged(e,t,i)}function jp(n,e,t){return Ue(n).beforeAuthStateChanged(e,t)}function Hp(n,e,t,i){return Ue(n).onAuthStateChanged(e,t,i)}function bd(n){return Ue(n).signOut()}const sr="__sak";/**
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
 */class wd{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(sr,"1"),this.storage.removeItem(sr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Vp=1e3,Gp=10;class Ed extends wd{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=fd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);Ip()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Gp):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Vp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ed.type="LOCAL";const Wi=Ed;/**
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
 */class Cd extends wd{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Cd.type="SESSION";const Id=Cd;/**
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
 */function qp(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class kr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new kr(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async c=>c(t.origin,r)),l=await qp(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}kr.receivers=[];/**
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
 */function oa(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Kp{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,l)=>{const c=oa("",20);s.port1.start();const h=setTimeout(()=>{l(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(d){const p=d;if(p.data.eventId===c)switch(p.data.status){case"ack":clearTimeout(h),r=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(p.data.response);break;default:clearTimeout(h),clearTimeout(r),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function wt(){return window}function Yp(n){wt().location.href=n}/**
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
 */function kd(){return typeof wt().WorkerGlobalScope<"u"&&typeof wt().importScripts=="function"}async function Zp(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Jp(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Qp(){return kd()?self:null}/**
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
 */const Sd="firebaseLocalStorageDb",Xp=1,rr="firebaseLocalStorage",Td="fbase_key";class ps{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Sr(n,e){return n.transaction([rr],e?"readwrite":"readonly").objectStore(rr)}function em(){const n=indexedDB.deleteDatabase(Sd);return new ps(n).toPromise()}function vo(){const n=indexedDB.open(Sd,Xp);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(rr,{keyPath:Td})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(rr)?e(i):(i.close(),await em(),e(await vo()))})})}async function bl(n,e,t){const i=Sr(n,!0).put({[Td]:e,value:t});return new ps(i).toPromise()}async function tm(n,e){const t=Sr(n,!1).get(e),i=await new ps(t).toPromise();return i===void 0?null:i.value}function wl(n,e){const t=Sr(n,!0).delete(e);return new ps(t).toPromise()}const nm=800,im=3;class Ad{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await vo(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>im)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return kd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=kr._getInstance(Qp()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Zp(),!this.activeServiceWorker)return;this.sender=new Kp(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Jp()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await vo();return await bl(e,sr,"1"),await wl(e,sr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>bl(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>tm(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>wl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=Sr(s,!1).getAll();return new ps(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),nm)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ad.type="LOCAL";const sm=Ad;new hs(3e4,6e4);/**
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
 */function aa(n,e){return e?Rt(e):(oe(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class la extends gd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ti(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ti(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ti(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function rm(n){return vd(n.auth,new la(n),n.bypassAuthState)}function om(n){const{auth:e,user:t}=n;return oe(t,e,"internal-error"),$p(t,new la(n),n.bypassAuthState)}async function am(n){const{auth:e,user:t}=n;return oe(t,e,"internal-error"),zp(t,new la(n),n.bypassAuthState)}/**
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
 */class xd{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return rm;case"linkViaPopup":case"linkViaRedirect":return am;case"reauthViaPopup":case"reauthViaRedirect":return om;default:Ct(this.auth,"internal-error")}}resolve(e){Dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const lm=new hs(2e3,1e4);async function cm(n,e,t){if(yt(n.app))return Promise.reject(ft(n,"operation-not-supported-in-this-environment"));const i=Un(n);Xc(n,e,Ir);const s=aa(i,t);return new _n(i,"signInViaPopup",e,s).executeNotNull()}class _n extends xd{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,_n.currentPopupAction&&_n.currentPopupAction.cancel(),_n.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return oe(e,this.auth,"internal-error"),e}async onExecution(){Dt(this.filter.length===1,"Popup operations only handle one event");const e=oa();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ft(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ft(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,_n.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ft(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,lm.get())};e()}}_n.currentPopupAction=null;/**
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
 */const dm="pendingRedirect",zs=new Map;class um extends xd{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=zs.get(this.auth._key());if(!e){try{const i=await hm(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}zs.set(this.auth._key(),e)}return this.bypassAuthState||zs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function hm(n,e){const t=Pd(e),i=Rd(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}async function fm(n,e){return Rd(n)._set(Pd(e),"true")}function pm(n,e){zs.set(n._key(),e)}function Rd(n){return Rt(n._redirectPersistence)}function Pd(n){return Us(dm,n.config.apiKey,n.name)}/**
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
 */function El(n,e,t){return mm(n,e,t)}async function mm(n,e,t){if(yt(n.app))return Promise.reject(Xt(n));const i=Un(n);Xc(n,e,Ir),await i._initializationPromise;const s=aa(i,t);return await fm(s,i),s._openRedirect(i,e,"signInViaRedirect")}async function gm(n,e){return await Un(n)._initializationPromise,Nd(n,e,!1)}async function Nd(n,e,t=!1){if(yt(n.app))return Promise.reject(Xt(n));const i=Un(n),s=aa(i,e),o=await new um(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
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
 */const _m=10*60*1e3;class vm{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!ym(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!Ld(e)){const s=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(ft(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=_m&&this.cachedEventUids.clear(),this.cachedEventUids.has(Cl(e))}saveEventToCache(e){this.cachedEventUids.add(Cl(e)),this.lastProcessedEventTime=Date.now()}}function Cl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Ld({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function ym(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ld(n);default:return!1}}/**
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
 */async function bm(n,e={}){return Ci(n,"GET","/v1/projects",e)}/**
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
 */const wm=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Em=/^https?/;async function Cm(n){if(n.config.emulator)return;const{authorizedDomains:e}=await bm(n);for(const t of e)try{if(Im(t))return}catch{}Ct(n,"unauthorized-domain")}function Im(n){const e=go(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!Em.test(t))return!1;if(wm.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
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
 */const km=new hs(3e4,6e4);function Il(){const n=wt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Sm(n){return new Promise((e,t)=>{var i,s,r;function o(){Il(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Il(),t(ft(n,"network-request-failed"))},timeout:km.get()})}if(!((s=(i=wt().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((r=wt().gapi)===null||r===void 0)&&r.load)o();else{const a=Lp("iframefcb");return wt()[a]=()=>{gapi.load?o():t(ft(n,"network-request-failed"))},Pp(`${Np()}?onload=${a}`).catch(l=>t(l))}}).catch(e=>{throw $s=null,e})}let $s=null;function Tm(n){return $s=$s||Sm(n),$s}/**
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
 */const Am=new hs(5e3,15e3),xm="__/auth/iframe",Rm="emulator/auth/iframe",Pm={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Nm=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Lm(n){const e=n.config;oe(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ta(e,Rm):`https://${n.config.authDomain}/${xm}`,i={apiKey:e.apiKey,appName:n.name,v:Ei},s=Nm.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${wi(i).slice(1)}`}async function Om(n){const e=await Tm(n),t=wt().gapi;return oe(t,n,"internal-error"),e.open({where:document.body,url:Lm(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Pm,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=ft(n,"network-request-failed"),a=wt().setTimeout(()=>{r(o)},Am.get());function l(){wt().clearTimeout(a),s(i)}i.ping(l).then(l,()=>{r(o)})}))}/**
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
 */const Dm={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Fm=500,Mm=600,Um="_blank",Bm="http://localhost";class kl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function zm(n,e,t,i=Fm,s=Mm){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const l=Object.assign(Object.assign({},Dm),{width:i.toString(),height:s.toString(),top:r,left:o}),c=Ve().toLowerCase();t&&(a=ld(c)?Um:t),od(c)&&(e=e||Bm,l.scrollbars="yes");const h=Object.entries(l).reduce((p,[f,b])=>`${p}${f}=${b},`,"");if(Cp(c)&&a!=="_self")return $m(e||"",a),new kl(null);const d=window.open(e||"",a,h);oe(d,n,"popup-blocked");try{d.focus()}catch{}return new kl(d)}function $m(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
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
 */const Wm="__/auth/handler",jm="emulator/auth/handler",Hm=encodeURIComponent("fac");async function Sl(n,e,t,i,s,r){oe(n.config.authDomain,n,"auth-domain-config-required"),oe(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:Ei,eventId:s};if(e instanceof Ir){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Js(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,d]of Object.entries({}))o[h]=d}if(e instanceof fs){const h=e.getScopes().filter(d=>d!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const l=await n._getAppCheckToken(),c=l?`#${Hm}=${encodeURIComponent(l)}`:"";return`${Vm(n)}?${wi(a).slice(1)}${c}`}function Vm({config:n}){return n.emulator?ta(n,jm):`https://${n.authDomain}/${Wm}`}/**
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
 */const Jr="webStorageSupport";class Gm{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Id,this._completeRedirectFn=Nd,this._overrideRedirectResult=pm}async _openPopup(e,t,i,s){var r;Dt((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await Sl(e,t,i,go(),s);return zm(e,o,oa())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await Sl(e,t,i,go(),s);return Yp(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(Dt(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await Om(e),i=new vm(e);return t.register("authEvent",s=>(oe(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Jr,{type:Jr},s=>{var r;const o=(r=s==null?void 0:s[0])===null||r===void 0?void 0:r[Jr];o!==void 0&&t(!!o),Ct(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Cm(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return fd()||ad()||sa()}}const qm=Gm;var Tl="@firebase/auth",Al="1.7.9";/**
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
 */class Km{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){oe(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Ym(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Zm(n){oi(new xn("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;oe(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const l={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:pd(n)},c=new xp(i,s,r,l);return Dp(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),oi(new xn("auth-internal",e=>{const t=Un(e.getProvider("auth").getImmediate());return(i=>new Km(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Qt(Tl,Al,Ym(n)),Qt(Tl,Al,"esm2017")}/**
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
 */const Jm=5*60,Qm=zc("authIdTokenMaxAge")||Jm;let xl=null;const Xm=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>Qm)return;const s=t==null?void 0:t.token;xl!==s&&(xl=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function eg(n=Gc()){const e=Jo(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Op(n,{popupRedirectResolver:qm,persistence:[sm,Wi,Id]}),i=zc("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=Xm(r.toString());jp(t,o,()=>o(t.currentUser)),Wp(t,a=>o(a))}}const s=Uc("auth");return s&&Fp(t,`http://${s}`),t}function tg(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Rp({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=ft("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",tg().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Zm("Browser");var Rl={};const Pl="@firebase/database",Nl="1.0.8";/**
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
 */let Od="";function ng(n){Od=n}/**
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
 */class ig{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Ne(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:ts(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class sg{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return It(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const Dd=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new ig(e)}}catch{}return new sg},vn=Dd("localStorage"),rg=Dd("sessionStorage");/**
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
 */const ni=new Yo("@firebase/database"),og=function(){let n=1;return function(){return n++}}(),Fd=function(n){const e=qh(n),t=new jh;t.update(e);const i=t.digest();return Go.encodeByteArray(i)},ms=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=ms.apply(null,i):typeof i=="object"?e+=Ne(i):e+=i,e+=" "}return e};let ji=null,Ll=!0;const ag=function(n,e){H(!0,"Can't turn on custom loggers persistently."),ni.logLevel=ye.VERBOSE,ji=ni.log.bind(ni)},Fe=function(...n){if(Ll===!0&&(Ll=!1,ji===null&&rg.get("logging_enabled")===!0&&ag()),ji){const e=ms.apply(null,n);ji(e)}},gs=function(n){return function(...e){Fe(n,...e)}},yo=function(...n){const e="FIREBASE INTERNAL ERROR: "+ms(...n);ni.error(e)},Ft=function(...n){const e=`FIREBASE FATAL ERROR: ${ms(...n)}`;throw ni.error(e),new Error(e)},He=function(...n){const e="FIREBASE WARNING: "+ms(...n);ni.warn(e)},lg=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&He("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Tr=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},cg=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},li="[MIN_NAME]",Pn="[MAX_NAME]",Bn=function(n,e){if(n===e)return 0;if(n===li||e===Pn)return-1;if(e===li||n===Pn)return 1;{const t=Ol(n),i=Ol(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},dg=function(n,e){return n===e?0:n<e?-1:1},Fi=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+Ne(e))},ca=function(n){if(typeof n!="object"||n===null)return Ne(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=Ne(e[i]),t+=":",t+=ca(n[e[i]]);return t+="}",t},Md=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function Me(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const Ud=function(n){H(!Tr(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,l;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const h=c.join("");let d="";for(l=0;l<64;l+=8){let p=parseInt(h.substr(l,8),2).toString(16);p.length===1&&(p="0"+p),d=d+p}return d.toLowerCase()},ug=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},hg=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function fg(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const pg=new RegExp("^-?(0*)\\d{1,10}$"),mg=-2147483648,gg=2147483647,Ol=function(n){if(pg.test(n)){const e=Number(n);if(e>=mg&&e<=gg)return e}return null},Ii=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw He("Exception was thrown by user callback.",t),e},Math.floor(0))}},_g=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Hi=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class vg{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){He(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class yg{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(Fe("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',He(e)}}class Ws{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Ws.OWNER="owner";/**
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
 */const da="5",Bd="v",zd="s",$d="r",Wd="f",jd=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Hd="ls",Vd="p",bo="ac",Gd="websocket",qd="long_polling";/**
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
 */class Kd{constructor(e,t,i,s,r=!1,o="",a=!1,l=!1){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=vn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&vn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function bg(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Yd(n,e,t){H(typeof e=="string","typeof type must == string"),H(typeof t=="object","typeof params must == object");let i;if(e===Gd)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===qd)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);bg(n)&&(t.ns=n.namespace);const s=[];return Me(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
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
 */class wg{constructor(){this.counters_={}}incrementCounter(e,t=1){It(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Ih(this.counters_)}}/**
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
 */const Qr={},Xr={};function ua(n){const e=n.toString();return Qr[e]||(Qr[e]=new wg),Qr[e]}function Eg(n,e){const t=n.toString();return Xr[t]||(Xr[t]=e()),Xr[t]}/**
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
 */class Cg{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Ii(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const Dl="start",Ig="close",kg="pLPCommand",Sg="pRTLPCB",Zd="id",Jd="pw",Qd="ser",Tg="cb",Ag="seg",xg="ts",Rg="d",Pg="dframe",Xd=1870,eu=30,Ng=Xd-eu,Lg=25e3,Og=3e4;class Zn{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=gs(e),this.stats_=ua(t),this.urlFn=l=>(this.appCheckToken&&(l[bo]=this.appCheckToken),Yd(t,qd,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Cg(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Og)),cg(()=>{if(this.isClosed_)return;this.scriptTagHolder=new ha((...r)=>{const[o,a,l,c,h]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Dl)this.id=a,this.password=l;else if(o===Ig)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Dl]="t",i[Qd]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Tg]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Bd]=da,this.transportSessionId&&(i[zd]=this.transportSessionId),this.lastSessionId&&(i[Hd]=this.lastSessionId),this.applicationId&&(i[Vd]=this.applicationId),this.appCheckToken&&(i[bo]=this.appCheckToken),typeof location<"u"&&location.hostname&&jd.test(location.hostname)&&(i[$d]=Wd);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Zn.forceAllow_=!0}static forceDisallow(){Zn.forceDisallow_=!0}static isAvailable(){return Zn.forceAllow_?!0:!Zn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!ug()&&!hg()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=Ne(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Fc(t),s=Md(i,Ng);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[Pg]="t",i[Zd]=e,i[Jd]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=Ne(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class ha{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=og(),window[kg+this.uniqueCallbackIdentifier]=e,window[Sg+this.uniqueCallbackIdentifier]=t,this.myIFrame=ha.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){Fe("frame writing exception"),a.stack&&Fe(a.stack),Fe(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Fe("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Zd]=this.myID,e[Jd]=this.myPW,e[Qd]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+eu+i.length<=Xd;){const o=this.pendingSegs.shift();i=i+"&"+Ag+s+"="+o.seg+"&"+xg+s+"="+o.ts+"&"+Rg+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(Lg)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{Fe("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
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
 */const Dg=16384,Fg=45e3;let or=null;typeof MozWebSocket<"u"?or=MozWebSocket:typeof WebSocket<"u"&&(or=WebSocket);class ut{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=gs(this.connId),this.stats_=ua(t),this.connURL=ut.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[Bd]=da,typeof location<"u"&&location.hostname&&jd.test(location.hostname)&&(o[$d]=Wd),t&&(o[zd]=t),i&&(o[Hd]=i),s&&(o[bo]=s),r&&(o[Vd]=r),Yd(e,Gd,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,vn.set("previous_websocket_failure",!0);try{let i;Dh(),this.mySock=new or(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){ut.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&or!==null&&!ut.forceDisallow_}static previouslyFailed(){return vn.isInMemoryStorage||vn.get("previous_websocket_failure")===!0}markConnectionHealthy(){vn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=ts(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(H(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=Ne(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Md(t,Dg);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Fg))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ut.responsesRequiredToBeHealthy=2;ut.healthyTimeout=3e4;/**
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
 */class ss{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Zn,ut]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=ut&&ut.isAvailable();let i=t&&!ut.previouslyFailed();if(e.webSocketOnly&&(t||He("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[ut];else{const s=this.transports_=[];for(const r of ss.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);ss.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}ss.globalTransportInitialized_=!1;/**
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
 */const Mg=6e4,Ug=5e3,Bg=10*1024,zg=100*1024,eo="t",Fl="d",$g="s",Ml="r",Wg="e",Ul="o",Bl="a",zl="n",$l="p",jg="h";class Hg{constructor(e,t,i,s,r,o,a,l,c,h){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=gs("c:"+this.id+":"),this.transportManager_=new ss(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Hi(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>zg?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Bg?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(eo in e){const t=e[eo];t===Bl?this.upgradeIfSecondaryHealthy_():t===Ml?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Ul&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Fi("t",e),i=Fi("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:$l,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Bl,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:zl,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Fi("t",e),i=Fi("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Fi(eo,e);if(Fl in e){const i=e[Fl];if(t===jg){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===zl){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===$g?this.onConnectionShutdown_(i):t===Ml?this.onReset_(i):t===Wg?yo("Server Error: "+i):t===Ul?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):yo("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),da!==i&&He("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),Hi(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Mg))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Hi(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Ug))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:$l,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(vn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class tu{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
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
 */class nu{constructor(e){this.allowedEvents_=e,this.listeners_={},H(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){H(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
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
 */class ar extends nu{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Ko()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new ar}getInitialEvent(e){return H(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const Wl=32,jl=768;class _e{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function ge(){return new _e("")}function le(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function an(n){return n.pieces_.length-n.pieceNum_}function be(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new _e(n.pieces_,e)}function fa(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Vg(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function rs(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function iu(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new _e(e,0)}function Se(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof _e)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new _e(t,0)}function ue(n){return n.pieceNum_>=n.pieces_.length}function je(n,e){const t=le(n),i=le(e);if(t===null)return e;if(t===i)return je(be(n),be(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Gg(n,e){const t=rs(n,0),i=rs(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=Bn(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function pa(n,e){if(an(n)!==an(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function ot(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(an(n)>an(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class qg{constructor(e,t){this.errorPrefix_=t,this.parts_=rs(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Cr(this.parts_[i]);su(this)}}function Kg(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Cr(e),su(n)}function Yg(n){const e=n.parts_.pop();n.byteLength_-=Cr(e),n.parts_.length>0&&(n.byteLength_-=1)}function su(n){if(n.byteLength_>jl)throw new Error(n.errorPrefix_+"has a key path longer than "+jl+" bytes ("+n.byteLength_+").");if(n.parts_.length>Wl)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Wl+") or object contains a cycle "+mn(n))}function mn(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
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
 */class ma extends nu{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new ma}getInitialEvent(e){return H(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const Mi=1e3,Zg=60*5*1e3,Hl=30*1e3,Jg=1.3,Qg=3e4,Xg="server_kill",Vl=3;class Nt extends tu{constructor(e,t,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Nt.nextPersistentConnectionId_++,this.log_=gs("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Mi,this.maxReconnectDelay_=Zg,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");ma.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&ar.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(Ne(r)),H(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new vt,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),H(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),H(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;Nt.warnOnListenWarnings_(l,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&It(e,"w")){const i=si(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();He(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Wh(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Hl)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=$h(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),H(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Ne(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):yo("Unrecognized action received from server: "+Ne(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){H(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Mi,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Mi,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Qg&&(this.reconnectDelay_=Mi),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Jg)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Nt.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(d){H(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:l,sendRequest:c};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,p]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?Fe("getToken() completed but was canceled"):(Fe("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=p&&p.token,a=new Hg(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,f=>{He(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(Xg)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&He(d),l())}}}interrupt(e){Fe("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Fe("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Js(this.interruptReasons_)&&(this.reconnectDelay_=Mi,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>ca(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new _e(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){Fe("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Vl&&(this.reconnectDelay_=Hl,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Fe("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Vl&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+Od.replace(/\./g,"-")]=1,Ko()?e["framework.cordova"]=1:$c()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=ar.getInstance().currentlyOnline();return Js(this.interruptReasons_)&&e}}Nt.nextPersistentConnectionId_=0;Nt.nextConnectionId_=0;/**
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
 */class Ar{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new he(li,e),s=new he(li,t);return this.compare(i,s)!==0}minPost(){return he.MIN}}/**
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
 */let As;class ru extends Ar{static get __EMPTY_NODE(){return As}static set __EMPTY_NODE(e){As=e}compare(e,t){return Bn(e.name,t.name)}isDefinedOn(e){throw bi("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return he.MIN}maxPost(){return new he(Pn,As)}makePost(e,t){return H(typeof e=="string","KeyIndex indexValue must always be a string."),new he(e,As)}toString(){return".key"}}const ii=new ru;/**
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
 */class xs{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class De{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??De.RED,this.left=s??qe.EMPTY_NODE,this.right=r??qe.EMPTY_NODE}copy(e,t,i,s,r){return new De(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return qe.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return qe.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,De.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,De.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}De.RED=!0;De.BLACK=!1;class e_{copy(e,t,i,s,r){return this}insert(e,t,i){return new De(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class qe{constructor(e,t=qe.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new qe(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,De.BLACK,null,null))}remove(e){return new qe(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,De.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new xs(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new xs(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new xs(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new xs(this.root_,null,this.comparator_,!0,e)}}qe.EMPTY_NODE=new e_;/**
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
 */function t_(n,e){return Bn(n.name,e.name)}function ga(n,e){return Bn(n,e)}/**
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
 */let wo;function n_(n){wo=n}const ou=function(n){return typeof n=="number"?"number:"+Ud(n):"string:"+n},au=function(n){if(n.isLeafNode()){const e=n.val();H(typeof e=="string"||typeof e=="number"||typeof e=="object"&&It(e,".sv"),"Priority must be a string or number.")}else H(n===wo||n.isEmpty(),"priority of unexpected type.");H(n===wo||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let Gl;class Oe{constructor(e,t=Oe.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,H(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),au(this.priorityNode_)}static set __childrenNodeConstructor(e){Gl=e}static get __childrenNodeConstructor(){return Gl}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Oe(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Oe.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return ue(e)?this:le(e)===".priority"?this.priorityNode_:Oe.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:Oe.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=le(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(H(i!==".priority"||an(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,Oe.__childrenNodeConstructor.EMPTY_NODE.updateChild(be(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+ou(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Ud(this.value_):e+=this.value_,this.lazyHash_=Fd(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Oe.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Oe.__childrenNodeConstructor?-1:(H(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=Oe.VALUE_TYPE_ORDER.indexOf(t),r=Oe.VALUE_TYPE_ORDER.indexOf(i);return H(s>=0,"Unknown leaf type: "+t),H(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}Oe.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let lu,cu;function i_(n){lu=n}function s_(n){cu=n}class r_ extends Ar{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?Bn(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return he.MIN}maxPost(){return new he(Pn,new Oe("[PRIORITY-POST]",cu))}makePost(e,t){const i=lu(e);return new he(t,new Oe("[PRIORITY-POST]",i))}toString(){return".priority"}}const Te=new r_;/**
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
 */const o_=Math.log(2);class a_{constructor(e){const t=r=>parseInt(Math.log(r)/o_,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const lr=function(n,e,t,i){n.sort(e);const s=function(l,c){const h=c-l;let d,p;if(h===0)return null;if(h===1)return d=n[l],p=t?t(d):d,new De(p,d.node,De.BLACK,null,null);{const f=parseInt(h/2,10)+l,b=s(l,f),m=s(f+1,c);return d=n[f],p=t?t(d):d,new De(p,d.node,De.BLACK,b,m)}},r=function(l){let c=null,h=null,d=n.length;const p=function(b,m){const v=d-b,y=d;d-=b;const _=s(v+1,y),w=n[v],k=t?t(w):w;f(new De(k,w.node,m,null,_))},f=function(b){c?(c.left=b,c=b):(h=b,c=b)};for(let b=0;b<l.count;++b){const m=l.nextBitIsOne(),v=Math.pow(2,l.count-(b+1));m?p(v,De.BLACK):(p(v,De.BLACK),p(v,De.RED))}return h},o=new a_(n.length),a=r(o);return new qe(i||e,a)};/**
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
 */let to;const Wn={};class Pt{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return H(Wn&&Te,"ChildrenNode.ts has not been loaded"),to=to||new Pt({".priority":Wn},{".priority":Te}),to}get(e){const t=si(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof qe?t:null}hasIndex(e){return It(this.indexSet_,e.toString())}addIndex(e,t){H(e!==ii,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(he.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=lr(i,e.getCompare()):a=Wn;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const h=Object.assign({},this.indexes_);return h[l]=a,new Pt(h,c)}addToIndexes(e,t){const i=Qs(this.indexes_,(s,r)=>{const o=si(this.indexSet_,r);if(H(o,"Missing index implementation for "+r),s===Wn)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(he.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),lr(a,o.getCompare())}else return Wn;else{const a=t.get(e.name);let l=s;return a&&(l=l.remove(new he(e.name,a))),l.insert(e,e.node)}});return new Pt(i,this.indexSet_)}removeFromIndexes(e,t){const i=Qs(this.indexes_,s=>{if(s===Wn)return s;{const r=t.get(e.name);return r?s.remove(new he(e.name,r)):s}});return new Pt(i,this.indexSet_)}}/**
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
 */let Ui;class re{constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&au(this.priorityNode_),this.children_.isEmpty()&&H(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return Ui||(Ui=new re(new qe(ga),null,Pt.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Ui}updatePriority(e){return this.children_.isEmpty()?this:new re(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Ui:t}}getChild(e){const t=le(e);return t===null?this:this.getImmediateChild(t).getChild(be(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(H(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new he(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Ui:this.priorityNode_;return new re(s,o,r)}}updateChild(e,t){const i=le(e);if(i===null)return t;{H(le(e)!==".priority"||an(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(be(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(Te,(o,a)=>{t[o]=a.val(e),i++,r&&re.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+ou(this.getPriority().val())+":"),this.forEachChild(Te,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":Fd(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new he(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new he(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new he(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,he.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,he.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===_s?-1:0}withIndex(e){if(e===ii||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new re(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===ii||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(Te),s=t.getIterator(Te);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===ii?null:this.indexMap_.get(e.toString())}}re.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class l_ extends re{constructor(){super(new qe(ga),re.EMPTY_NODE,Pt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return re.EMPTY_NODE}isEmpty(){return!1}}const _s=new l_;Object.defineProperties(he,{MIN:{value:new he(li,re.EMPTY_NODE)},MAX:{value:new he(Pn,_s)}});ru.__EMPTY_NODE=re.EMPTY_NODE;Oe.__childrenNodeConstructor=re;n_(_s);s_(_s);/**
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
 */const c_=!0;function xe(n,e=null){if(n===null)return re.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),H(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new Oe(t,xe(e))}if(!(n instanceof Array)&&c_){const t=[];let i=!1;if(Me(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=xe(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),t.push(new he(o,l)))}}),t.length===0)return re.EMPTY_NODE;const r=lr(t,t_,o=>o.name,ga);if(i){const o=lr(t,Te.getCompare());return new re(r,xe(e),new Pt({".priority":o},{".priority":Te}))}else return new re(r,xe(e),Pt.Default)}else{let t=re.EMPTY_NODE;return Me(n,(i,s)=>{if(It(n,i)&&i.substring(0,1)!=="."){const r=xe(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(xe(e))}}i_(xe);/**
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
 */class d_ extends Ar{constructor(e){super(),this.indexPath_=e,H(!ue(e)&&le(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?Bn(e.name,t.name):r}makePost(e,t){const i=xe(e),s=re.EMPTY_NODE.updateChild(this.indexPath_,i);return new he(t,s)}maxPost(){const e=re.EMPTY_NODE.updateChild(this.indexPath_,_s);return new he(Pn,e)}toString(){return rs(this.indexPath_,0).join("/")}}/**
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
 */class u_ extends Ar{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Bn(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return he.MIN}maxPost(){return he.MAX}makePost(e,t){const i=xe(e);return new he(t,i)}toString(){return".value"}}const h_=new u_;/**
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
 */function du(n){return{type:"value",snapshotNode:n}}function ci(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function os(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function as(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function f_(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
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
 */class _a{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){H(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(os(t,a)):H(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(ci(t,i)):o.trackChildChange(as(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(Te,(s,r)=>{t.hasChild(s)||i.trackChildChange(os(s,r))}),t.isLeafNode()||t.forEachChild(Te,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(as(s,r,o))}else i.trackChildChange(ci(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?re.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class ls{constructor(e){this.indexedFilter_=new _a(e.getIndex()),this.index_=e.getIndex(),this.startPost_=ls.getStartPost_(e),this.endPost_=ls.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new he(t,i))||(i=re.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=re.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(re.EMPTY_NODE);const r=this;return t.forEachChild(Te,(o,a)=>{r.matches(new he(o,a))||(s=s.updateImmediateChild(o,re.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
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
 */class p_{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new ls(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new he(t,i))||(i=re.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=re.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=re.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(re.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,re.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(p,f)=>d(f,p)}else o=this.index_.getCompare();const a=e;H(a.numChildren()===this.limit_,"");const l=new he(t,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(l);if(a.hasChild(t)){const d=a.getImmediateChild(t);let p=s.getChildAfterChild(this.index_,c,this.reverse_);for(;p!=null&&(p.name===t||a.hasChild(p.name));)p=s.getChildAfterChild(this.index_,p,this.reverse_);const f=p==null?1:o(p,l);if(h&&!i.isEmpty()&&f>=0)return r!=null&&r.trackChildChange(as(t,i,d)),a.updateImmediateChild(t,i);{r!=null&&r.trackChildChange(os(t,d));const m=a.updateImmediateChild(t,re.EMPTY_NODE);return p!=null&&this.rangedFilter_.matches(p)?(r!=null&&r.trackChildChange(ci(p.name,p.node)),m.updateImmediateChild(p.name,p.node)):m}}else return i.isEmpty()?e:h&&o(c,l)>=0?(r!=null&&(r.trackChildChange(os(c.name,c.node)),r.trackChildChange(ci(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(c.name,re.EMPTY_NODE)):e}}/**
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
 */class va{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=Te}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return H(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return H(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:li}hasEnd(){return this.endSet_}getIndexEndValue(){return H(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return H(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Pn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return H(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===Te}copy(){const e=new va;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function m_(n){return n.loadsAllData()?new _a(n.getIndex()):n.hasLimit()?new p_(n):new ls(n)}function ql(n){const e={};if(n.isDefault())return e;let t;if(n.index_===Te?t="$priority":n.index_===h_?t="$value":n.index_===ii?t="$key":(H(n.index_ instanceof d_,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=Ne(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=Ne(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+Ne(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=Ne(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+Ne(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Kl(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==Te&&(e.i=n.index_.toString()),e}/**
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
 */class cr extends tu{constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=gs("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(H(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=cr.getListenId_(e,i),a={};this.listens_[o]=a;const l=ql(e._queryParams);this.restRequest_(r+".json",l,(c,h)=>{let d=h;if(c===404&&(d=null,c=null),c===null&&this.onDataUpdate_(r,d,!1,i),si(this.listens_,o)===a){let p;c?c===401?p="permission_denied":p="rest_error:"+c:p="ok",s(p,null)}})}unlisten(e,t){const i=cr.getListenId_(e,t);delete this.listens_[i]}get(e){const t=ql(e._queryParams),i=e._path.toString(),s=new vt;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+wi(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=ts(a.responseText)}catch{He("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&He("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class g_{constructor(){this.rootNode_=re.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
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
 */function dr(){return{value:null,children:new Map}}function ki(n,e,t){if(ue(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=le(e);n.children.has(i)||n.children.set(i,dr());const s=n.children.get(i);e=be(e),ki(s,e,t)}}function Eo(n,e){if(ue(e))return n.value=null,n.children.clear(),!0;if(n.value!==null){if(n.value.isLeafNode())return!1;{const t=n.value;return n.value=null,t.forEachChild(Te,(i,s)=>{ki(n,new _e(i),s)}),Eo(n,e)}}else if(n.children.size>0){const t=le(e);return e=be(e),n.children.has(t)&&Eo(n.children.get(t),e)&&n.children.delete(t),n.children.size===0}else return!0}function Co(n,e,t){n.value!==null?t(e,n.value):__(n,(i,s)=>{const r=new _e(e.toString()+"/"+i);Co(s,r,t)})}function __(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
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
 */class v_{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&Me(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
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
 */const Yl=10*1e3,y_=30*1e3,b_=5*60*1e3;class w_{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new v_(e);const i=Yl+(y_-Yl)*Math.random();Hi(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;Me(e,(s,r)=>{r>0&&It(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),Hi(this.reportStats_.bind(this),Math.floor(Math.random()*2*b_))}}/**
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
 */var ht;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ht||(ht={}));function ya(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ba(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function wa(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
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
 */class ur{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=ht.ACK_USER_WRITE,this.source=ya()}operationForChild(e){if(ue(this.path)){if(this.affectedTree.value!=null)return H(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new _e(e));return new ur(ge(),t,this.revert)}}else return H(le(this.path)===e,"operationForChild called for unrelated child."),new ur(be(this.path),this.affectedTree,this.revert)}}/**
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
 */class cs{constructor(e,t){this.source=e,this.path=t,this.type=ht.LISTEN_COMPLETE}operationForChild(e){return ue(this.path)?new cs(this.source,ge()):new cs(this.source,be(this.path))}}/**
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
 */class Nn{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=ht.OVERWRITE}operationForChild(e){return ue(this.path)?new Nn(this.source,ge(),this.snap.getImmediateChild(e)):new Nn(this.source,be(this.path),this.snap)}}/**
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
 */class di{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=ht.MERGE}operationForChild(e){if(ue(this.path)){const t=this.children.subtree(new _e(e));return t.isEmpty()?null:t.value?new Nn(this.source,ge(),t.value):new di(this.source,ge(),t)}else return H(le(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new di(this.source,be(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class ln{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(ue(e))return this.isFullyInitialized()&&!this.filtered_;const t=le(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class E_{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function C_(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(f_(o.childName,o.snapshotNode))}),Bi(n,s,"child_removed",e,i,t),Bi(n,s,"child_added",e,i,t),Bi(n,s,"child_moved",r,i,t),Bi(n,s,"child_changed",e,i,t),Bi(n,s,"value",e,i,t),s}function Bi(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,l)=>k_(n,a,l)),o.forEach(a=>{const l=I_(n,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function I_(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function k_(n,e,t){if(e.childName==null||t.childName==null)throw bi("Should only compare child_ events.");const i=new he(e.childName,e.snapshotNode),s=new he(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
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
 */function xr(n,e){return{eventCache:n,serverCache:e}}function Vi(n,e,t,i){return xr(new ln(e,t,i),n.serverCache)}function uu(n,e,t,i){return xr(n.eventCache,new ln(e,t,i))}function hr(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Ln(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
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
 */let no;const S_=()=>(no||(no=new qe(dg)),no);class Ie{constructor(e,t=S_()){this.value=e,this.children=t}static fromObject(e){let t=new Ie(null);return Me(e,(i,s)=>{t=t.set(new _e(i),s)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:ge(),value:this.value};if(ue(e))return null;{const i=le(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(be(e),t);return r!=null?{path:Se(new _e(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(ue(e))return this;{const t=le(e),i=this.children.get(t);return i!==null?i.subtree(be(e)):new Ie(null)}}set(e,t){if(ue(e))return new Ie(t,this.children);{const i=le(e),r=(this.children.get(i)||new Ie(null)).set(be(e),t),o=this.children.insert(i,r);return new Ie(this.value,o)}}remove(e){if(ue(e))return this.children.isEmpty()?new Ie(null):new Ie(null,this.children);{const t=le(e),i=this.children.get(t);if(i){const s=i.remove(be(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new Ie(null):new Ie(this.value,r)}else return this}}get(e){if(ue(e))return this.value;{const t=le(e),i=this.children.get(t);return i?i.get(be(e)):null}}setTree(e,t){if(ue(e))return t;{const i=le(e),r=(this.children.get(i)||new Ie(null)).setTree(be(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new Ie(this.value,o)}}fold(e){return this.fold_(ge(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(Se(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,ge(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(ue(e))return null;{const r=le(e),o=this.children.get(r);return o?o.findOnPath_(be(e),Se(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,ge(),t)}foreachOnPath_(e,t,i){if(ue(e))return this;{this.value&&i(t,this.value);const s=le(e),r=this.children.get(s);return r?r.foreachOnPath_(be(e),Se(t,s),i):new Ie(null)}}foreach(e){this.foreach_(ge(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(Se(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
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
 */class pt{constructor(e){this.writeTree_=e}static empty(){return new pt(new Ie(null))}}function Gi(n,e,t){if(ue(e))return new pt(new Ie(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=je(s,e);return r=r.updateChild(o,t),new pt(n.writeTree_.set(s,r))}else{const s=new Ie(t),r=n.writeTree_.setTree(e,s);return new pt(r)}}}function Io(n,e,t){let i=n;return Me(t,(s,r)=>{i=Gi(i,Se(e,s),r)}),i}function Zl(n,e){if(ue(e))return pt.empty();{const t=n.writeTree_.setTree(e,new Ie(null));return new pt(t)}}function ko(n,e){return zn(n,e)!=null}function zn(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(je(t.path,e)):null}function Jl(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(Te,(i,s)=>{e.push(new he(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new he(i,s.value))}),e}function en(n,e){if(ue(e))return n;{const t=zn(n,e);return t!=null?new pt(new Ie(t)):new pt(n.writeTree_.subtree(e))}}function So(n){return n.writeTree_.isEmpty()}function ui(n,e){return hu(ge(),n.writeTree_,e)}function hu(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(H(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=hu(Se(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(Se(n,".priority"),i)),t}}/**
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
 */function Rr(n,e){return gu(e,n)}function T_(n,e,t,i,s){H(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=Gi(n.visibleWrites,e,t)),n.lastWriteId=i}function A_(n,e,t,i){H(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=Io(n.visibleWrites,e,t),n.lastWriteId=i}function x_(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function R_(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);H(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&P_(a,i.path)?s=!1:ot(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return N_(n),!0;if(i.snap)n.visibleWrites=Zl(n.visibleWrites,i.path);else{const a=i.children;Me(a,l=>{n.visibleWrites=Zl(n.visibleWrites,Se(i.path,l))})}return!0}else return!1}function P_(n,e){if(n.snap)return ot(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&ot(Se(n.path,t),e))return!0;return!1}function N_(n){n.visibleWrites=fu(n.allWrites,L_,ge()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function L_(n){return n.visible}function fu(n,e,t){let i=pt.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)ot(t,o)?(a=je(t,o),i=Gi(i,a,r.snap)):ot(o,t)&&(a=je(o,t),i=Gi(i,ge(),r.snap.getChild(a)));else if(r.children){if(ot(t,o))a=je(t,o),i=Io(i,a,r.children);else if(ot(o,t))if(a=je(o,t),ue(a))i=Io(i,ge(),r.children);else{const l=si(r.children,le(a));if(l){const c=l.getChild(be(a));i=Gi(i,ge(),c)}}}else throw bi("WriteRecord should have .snap or .children")}}return i}function pu(n,e,t,i,s){if(!i&&!s){const r=zn(n.visibleWrites,e);if(r!=null)return r;{const o=en(n.visibleWrites,e);if(So(o))return t;if(t==null&&!ko(o,ge()))return null;{const a=t||re.EMPTY_NODE;return ui(o,a)}}}else{const r=en(n.visibleWrites,e);if(!s&&So(r))return t;if(!s&&t==null&&!ko(r,ge()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(ot(c.path,e)||ot(e,c.path))},a=fu(n.allWrites,o,e),l=t||re.EMPTY_NODE;return ui(a,l)}}}function O_(n,e,t){let i=re.EMPTY_NODE;const s=zn(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(Te,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=en(n.visibleWrites,e);return t.forEachChild(Te,(o,a)=>{const l=ui(en(r,new _e(o)),a);i=i.updateImmediateChild(o,l)}),Jl(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=en(n.visibleWrites,e);return Jl(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function D_(n,e,t,i,s){H(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=Se(e,t);if(ko(n.visibleWrites,r))return null;{const o=en(n.visibleWrites,r);return So(o)?s.getChild(t):ui(o,s.getChild(t))}}function F_(n,e,t,i){const s=Se(e,t),r=zn(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=en(n.visibleWrites,s);return ui(o,i.getNode().getImmediateChild(t))}else return null}function M_(n,e){return zn(n.visibleWrites,e)}function U_(n,e,t,i,s,r,o){let a;const l=en(n.visibleWrites,e),c=zn(l,ge());if(c!=null)a=c;else if(t!=null)a=ui(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const h=[],d=o.getCompare(),p=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=p.getNext();for(;f&&h.length<s;)d(f,i)!==0&&h.push(f),f=p.getNext();return h}else return[]}function B_(){return{visibleWrites:pt.empty(),allWrites:[],lastWriteId:-1}}function fr(n,e,t,i){return pu(n.writeTree,n.treePath,e,t,i)}function Ea(n,e){return O_(n.writeTree,n.treePath,e)}function Ql(n,e,t,i){return D_(n.writeTree,n.treePath,e,t,i)}function pr(n,e){return M_(n.writeTree,Se(n.treePath,e))}function z_(n,e,t,i,s,r){return U_(n.writeTree,n.treePath,e,t,i,s,r)}function Ca(n,e,t){return F_(n.writeTree,n.treePath,e,t)}function mu(n,e){return gu(Se(n.treePath,e),n.writeTree)}function gu(n,e){return{treePath:n,writeTree:e}}/**
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
 */class $_{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;H(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),H(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,as(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,os(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,ci(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,as(i,e.snapshotNode,s.oldSnap));else throw bi("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class W_{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const _u=new W_;class Ia{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new ln(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Ca(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Ln(this.viewCache_),r=z_(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
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
 */function j_(n){return{filter:n}}function H_(n,e){H(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),H(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function V_(n,e,t,i,s){const r=new $_;let o,a;if(t.type===ht.OVERWRITE){const c=t;c.source.fromUser?o=To(n,e,c.path,c.snap,i,s,r):(H(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!ue(c.path),o=mr(n,e,c.path,c.snap,i,s,a,r))}else if(t.type===ht.MERGE){const c=t;c.source.fromUser?o=q_(n,e,c.path,c.children,i,s,r):(H(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Ao(n,e,c.path,c.children,i,s,a,r))}else if(t.type===ht.ACK_USER_WRITE){const c=t;c.revert?o=Z_(n,e,c.path,i,s,r):o=K_(n,e,c.path,c.affectedTree,i,s,r)}else if(t.type===ht.LISTEN_COMPLETE)o=Y_(n,e,t.path,i,r);else throw bi("Unknown operation type: "+t.type);const l=r.getChanges();return G_(e,o,l),{viewCache:o,changes:l}}function G_(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=hr(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(du(hr(e)))}}function vu(n,e,t,i,s,r){const o=e.eventCache;if(pr(i,t)!=null)return e;{let a,l;if(ue(t))if(H(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Ln(e),h=c instanceof re?c:re.EMPTY_NODE,d=Ea(i,h);a=n.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const c=fr(i,Ln(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=le(t);if(c===".priority"){H(an(t)===1,"Can't have a priority with additional path components");const h=o.getNode();l=e.serverCache.getNode();const d=Ql(i,t,h,l);d!=null?a=n.filter.updatePriority(h,d):a=o.getNode()}else{const h=be(t);let d;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const p=Ql(i,t,o.getNode(),l);p!=null?d=o.getNode().getImmediateChild(c).updateChild(h,p):d=o.getNode().getImmediateChild(c)}else d=Ca(i,c,e.serverCache);d!=null?a=n.filter.updateChild(o.getNode(),c,d,h,s,r):a=o.getNode()}}return Vi(e,a,o.isFullyInitialized()||ue(t),n.filter.filtersNodes())}}function mr(n,e,t,i,s,r,o,a){const l=e.serverCache;let c;const h=o?n.filter:n.filter.getIndexedFilter();if(ue(t))c=h.updateFullNode(l.getNode(),i,null);else if(h.filtersNodes()&&!l.isFiltered()){const f=l.getNode().updateChild(t,i);c=h.updateFullNode(l.getNode(),f,null)}else{const f=le(t);if(!l.isCompleteForPath(t)&&an(t)>1)return e;const b=be(t),v=l.getNode().getImmediateChild(f).updateChild(b,i);f===".priority"?c=h.updatePriority(l.getNode(),v):c=h.updateChild(l.getNode(),f,v,b,_u,null)}const d=uu(e,c,l.isFullyInitialized()||ue(t),h.filtersNodes()),p=new Ia(s,d,r);return vu(n,d,t,s,p,a)}function To(n,e,t,i,s,r,o){const a=e.eventCache;let l,c;const h=new Ia(s,e,r);if(ue(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,o),l=Vi(e,c,!0,n.filter.filtersNodes());else{const d=le(t);if(d===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),l=Vi(e,c,a.isFullyInitialized(),a.isFiltered());else{const p=be(t),f=a.getNode().getImmediateChild(d);let b;if(ue(p))b=i;else{const m=h.getCompleteChild(d);m!=null?fa(p)===".priority"&&m.getChild(iu(p)).isEmpty()?b=m:b=m.updateChild(p,i):b=re.EMPTY_NODE}if(f.equals(b))l=e;else{const m=n.filter.updateChild(a.getNode(),d,b,p,h,o);l=Vi(e,m,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Xl(n,e){return n.eventCache.isCompleteForChild(e)}function q_(n,e,t,i,s,r,o){let a=e;return i.foreach((l,c)=>{const h=Se(t,l);Xl(e,le(h))&&(a=To(n,a,h,c,s,r,o))}),i.foreach((l,c)=>{const h=Se(t,l);Xl(e,le(h))||(a=To(n,a,h,c,s,r,o))}),a}function ec(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Ao(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;ue(t)?c=i:c=new Ie(null).setTree(t,i);const h=e.serverCache.getNode();return c.children.inorderTraversal((d,p)=>{if(h.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),b=ec(n,f,p);l=mr(n,l,new _e(d),b,s,r,o,a)}}),c.children.inorderTraversal((d,p)=>{const f=!e.serverCache.isCompleteForChild(d)&&p.value===null;if(!h.hasChild(d)&&!f){const b=e.serverCache.getNode().getImmediateChild(d),m=ec(n,b,p);l=mr(n,l,new _e(d),m,s,r,o,a)}}),l}function K_(n,e,t,i,s,r,o){if(pr(s,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(ue(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return mr(n,e,t,l.getNode().getChild(t),s,r,a,o);if(ue(t)){let c=new Ie(null);return l.getNode().forEachChild(ii,(h,d)=>{c=c.set(new _e(h),d)}),Ao(n,e,t,c,s,r,a,o)}else return e}else{let c=new Ie(null);return i.foreach((h,d)=>{const p=Se(t,h);l.isCompleteForPath(p)&&(c=c.set(h,l.getNode().getChild(p)))}),Ao(n,e,t,c,s,r,a,o)}}function Y_(n,e,t,i,s){const r=e.serverCache,o=uu(e,r.getNode(),r.isFullyInitialized()||ue(t),r.isFiltered());return vu(n,o,t,i,_u,s)}function Z_(n,e,t,i,s,r){let o;if(pr(i,t)!=null)return e;{const a=new Ia(i,e,s),l=e.eventCache.getNode();let c;if(ue(t)||le(t)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=fr(i,Ln(e));else{const d=e.serverCache.getNode();H(d instanceof re,"serverChildren would be complete if leaf node"),h=Ea(i,d)}h=h,c=n.filter.updateFullNode(l,h,r)}else{const h=le(t);let d=Ca(i,h,e.serverCache);d==null&&e.serverCache.isCompleteForChild(h)&&(d=l.getImmediateChild(h)),d!=null?c=n.filter.updateChild(l,h,d,be(t),a,r):e.eventCache.getNode().hasChild(h)?c=n.filter.updateChild(l,h,re.EMPTY_NODE,be(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=fr(i,Ln(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||pr(i,ge())!=null,Vi(e,c,o,n.filter.filtersNodes())}}/**
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
 */class J_{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new _a(i.getIndex()),r=m_(i);this.processor_=j_(r);const o=t.serverCache,a=t.eventCache,l=s.updateFullNode(re.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(re.EMPTY_NODE,a.getNode(),null),h=new ln(l,o.isFullyInitialized(),s.filtersNodes()),d=new ln(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=xr(d,h),this.eventGenerator_=new E_(this.query_)}get query(){return this.query_}}function Q_(n){return n.viewCache_.serverCache.getNode()}function X_(n){return hr(n.viewCache_)}function ev(n,e){const t=Ln(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!ue(e)&&!t.getImmediateChild(le(e)).isEmpty())?t.getChild(e):null}function tc(n){return n.eventRegistrations_.length===0}function tv(n,e){n.eventRegistrations_.push(e)}function nc(n,e,t){const i=[];if(t){H(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function ic(n,e,t,i){e.type===ht.MERGE&&e.source.queryId!==null&&(H(Ln(n.viewCache_),"We should always have a full cache before handling merges"),H(hr(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=V_(n.processor_,s,e,t,i);return H_(n.processor_,r.viewCache),H(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,yu(n,r.changes,r.viewCache.eventCache.getNode(),null)}function nv(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(Te,(r,o)=>{i.push(ci(r,o))}),t.isFullyInitialized()&&i.push(du(t.getNode())),yu(n,i,t.getNode(),e)}function yu(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return C_(n.eventGenerator_,e,t,s)}/**
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
 */let gr;class bu{constructor(){this.views=new Map}}function iv(n){H(!gr,"__referenceConstructor has already been defined"),gr=n}function sv(){return H(gr,"Reference.ts has not been loaded"),gr}function rv(n){return n.views.size===0}function ka(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return H(r!=null,"SyncTree gave us an op for an invalid query."),ic(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(ic(o,e,t,i));return r}}function wu(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=fr(t,s?i:null),l=!1;a?l=!0:i instanceof re?(a=Ea(t,i),l=!1):(a=re.EMPTY_NODE,l=!1);const c=xr(new ln(a,l,!1),new ln(i,s,!1));return new J_(e,c)}return o}function ov(n,e,t,i,s,r){const o=wu(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),tv(o,t),nv(o,t)}function av(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=cn(n);if(s==="default")for(const[l,c]of n.views.entries())o=o.concat(nc(c,t,i)),tc(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(s);l&&(o=o.concat(nc(l,t,i)),tc(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!cn(n)&&r.push(new(sv())(e._repo,e._path)),{removed:r,events:o}}function Eu(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function tn(n,e){let t=null;for(const i of n.views.values())t=t||ev(i,e);return t}function Cu(n,e){if(e._queryParams.loadsAllData())return Pr(n);{const i=e._queryIdentifier;return n.views.get(i)}}function Iu(n,e){return Cu(n,e)!=null}function cn(n){return Pr(n)!=null}function Pr(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let _r;function lv(n){H(!_r,"__referenceConstructor has already been defined"),_r=n}function cv(){return H(_r,"Reference.ts has not been loaded"),_r}let dv=1;class sc{constructor(e){this.listenProvider_=e,this.syncPointTree_=new Ie(null),this.pendingWriteTree_=B_(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function ku(n,e,t,i,s){return T_(n.pendingWriteTree_,e,t,i,s),s?Si(n,new Nn(ya(),e,t)):[]}function uv(n,e,t,i){A_(n.pendingWriteTree_,e,t,i);const s=Ie.fromObject(t);return Si(n,new di(ya(),e,s))}function Yt(n,e,t=!1){const i=x_(n.pendingWriteTree_,e);if(R_(n.pendingWriteTree_,e)){let r=new Ie(null);return i.snap!=null?r=r.set(ge(),!0):Me(i.children,o=>{r=r.set(new _e(o),!0)}),Si(n,new ur(i.path,r,t))}else return[]}function vs(n,e,t){return Si(n,new Nn(ba(),e,t))}function hv(n,e,t){const i=Ie.fromObject(t);return Si(n,new di(ba(),e,i))}function fv(n,e){return Si(n,new cs(ba(),e))}function pv(n,e,t){const i=Ta(n,t);if(i){const s=Aa(i),r=s.path,o=s.queryId,a=je(r,e),l=new cs(wa(o),a);return xa(n,r,l)}else return[]}function vr(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Iu(o,e))){const l=av(o,e,t,i);rv(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const h=c.findIndex(p=>p._queryParams.loadsAllData())!==-1,d=n.syncPointTree_.findOnPath(r,(p,f)=>cn(f));if(h&&!d){const p=n.syncPointTree_.subtree(r);if(!p.isEmpty()){const f=_v(p);for(let b=0;b<f.length;++b){const m=f[b],v=m.query,y=xu(n,m);n.listenProvider_.startListening(qi(v),ds(n,v),y.hashFn,y.onComplete)}}}!d&&c.length>0&&!i&&(h?n.listenProvider_.stopListening(qi(e),null):c.forEach(p=>{const f=n.queryToTagMap.get(Nr(p));n.listenProvider_.stopListening(qi(p),f)}))}vv(n,c)}return a}function Su(n,e,t,i){const s=Ta(n,i);if(s!=null){const r=Aa(s),o=r.path,a=r.queryId,l=je(o,e),c=new Nn(wa(a),l,t);return xa(n,o,c)}else return[]}function mv(n,e,t,i){const s=Ta(n,i);if(s){const r=Aa(s),o=r.path,a=r.queryId,l=je(o,e),c=Ie.fromObject(t),h=new di(wa(a),l,c);return xa(n,o,h)}else return[]}function xo(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(p,f)=>{const b=je(p,s);r=r||tn(f,b),o=o||cn(f)});let a=n.syncPointTree_.get(s);a?(o=o||cn(a),r=r||tn(a,ge())):(a=new bu,n.syncPointTree_=n.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=re.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((f,b)=>{const m=tn(b,ge());m&&(r=r.updateImmediateChild(f,m))}));const c=Iu(a,e);if(!c&&!e._queryParams.loadsAllData()){const p=Nr(e);H(!n.queryToTagMap.has(p),"View does not exist, but we have a tag");const f=yv();n.queryToTagMap.set(p,f),n.tagToQueryMap.set(f,p)}const h=Rr(n.pendingWriteTree_,s);let d=ov(a,e,t,h,r,l);if(!c&&!o&&!i){const p=Cu(a,e);d=d.concat(bv(n,e,p))}return d}function Sa(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=je(o,e),c=tn(a,l);if(c)return c});return pu(s,e,r,t,!0)}function gv(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(c,h)=>{const d=je(c,t);i=i||tn(h,d)});let s=n.syncPointTree_.get(t);s?i=i||tn(s,ge()):(s=new bu,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new ln(i,!0,!1):null,a=Rr(n.pendingWriteTree_,e._path),l=wu(s,e,a,r?o.getNode():re.EMPTY_NODE,r);return X_(l)}function Si(n,e){return Tu(e,n.syncPointTree_,null,Rr(n.pendingWriteTree_,ge()))}function Tu(n,e,t,i){if(ue(n.path))return Au(n,e,t,i);{const s=e.get(ge());t==null&&s!=null&&(t=tn(s,ge()));let r=[];const o=le(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,h=mu(i,o);r=r.concat(Tu(a,l,c,h))}return s&&(r=r.concat(ka(s,n,i,t))),r}}function Au(n,e,t,i){const s=e.get(ge());t==null&&s!=null&&(t=tn(s,ge()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=mu(i,o),h=n.operationForChild(o);h&&(r=r.concat(Au(h,a,l,c)))}),s&&(r=r.concat(ka(s,n,i,t))),r}function xu(n,e){const t=e.query,i=ds(n,t);return{hashFn:()=>(Q_(e)||re.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?pv(n,t._path,i):fv(n,t._path);{const r=fg(s,t);return vr(n,t,null,r)}}}}function ds(n,e){const t=Nr(e);return n.queryToTagMap.get(t)}function Nr(n){return n._path.toString()+"$"+n._queryIdentifier}function Ta(n,e){return n.tagToQueryMap.get(e)}function Aa(n){const e=n.indexOf("$");return H(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new _e(n.substr(0,e))}}function xa(n,e,t){const i=n.syncPointTree_.get(e);H(i,"Missing sync point for query tag that we're tracking");const s=Rr(n.pendingWriteTree_,e);return ka(i,t,s,null)}function _v(n){return n.fold((e,t,i)=>{if(t&&cn(t))return[Pr(t)];{let s=[];return t&&(s=Eu(t)),Me(i,(r,o)=>{s=s.concat(o)}),s}})}function qi(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(cv())(n._repo,n._path):n}function vv(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=Nr(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function yv(){return dv++}function bv(n,e,t){const i=e._path,s=ds(n,e),r=xu(n,t),o=n.listenProvider_.startListening(qi(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)H(!cn(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,h,d)=>{if(!ue(c)&&h&&cn(h))return[Pr(h).query];{let p=[];return h&&(p=p.concat(Eu(h).map(f=>f.query))),Me(d,(f,b)=>{p=p.concat(b)}),p}});for(let c=0;c<l.length;++c){const h=l[c];n.listenProvider_.stopListening(qi(h),ds(n,h))}}return o}/**
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
 */class Ra{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Ra(t)}node(){return this.node_}}class Pa{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=Se(this.path_,e);return new Pa(this.syncTree_,t)}node(){return Sa(this.syncTree_,this.path_)}}const wv=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},rc=function(n,e,t){if(!n||typeof n!="object")return n;if(H(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return Ev(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Cv(n[".sv"],e);H(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},Ev=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:H(!1,"Unexpected server value: "+n)}},Cv=function(n,e,t){n.hasOwnProperty("increment")||H(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&H(!1,"Unexpected increment value: "+i);const s=e.node();if(H(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},Ru=function(n,e,t,i){return Na(e,new Pa(t,n),i)},Pu=function(n,e,t){return Na(n,new Ra(e),t)};function Na(n,e,t){const i=n.getPriority().val(),s=rc(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=rc(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new Oe(a,xe(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new Oe(s))),o.forEachChild(Te,(a,l)=>{const c=Na(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
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
 */class La{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function Oa(n,e){let t=e instanceof _e?e:new _e(e),i=n,s=le(t);for(;s!==null;){const r=si(i.node.children,s)||{children:{},childCount:0};i=new La(s,i,r),t=be(t),s=le(t)}return i}function Ti(n){return n.node.value}function Nu(n,e){n.node.value=e,Ro(n)}function Lu(n){return n.node.childCount>0}function Iv(n){return Ti(n)===void 0&&!Lu(n)}function Lr(n,e){Me(n.node.children,(t,i)=>{e(new La(t,n,i))})}function Ou(n,e,t,i){t&&e(n),Lr(n,s=>{Ou(s,e,!0)})}function kv(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function ys(n){return new _e(n.parent===null?n.name:ys(n.parent)+"/"+n.name)}function Ro(n){n.parent!==null&&Sv(n.parent,n.name,n)}function Sv(n,e,t){const i=Iv(t),s=It(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,Ro(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Ro(n))}/**
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
 */const Tv=/[\[\].#$\/\u0000-\u001F\u007F]/,Av=/[\[\].#$\u0000-\u001F\u007F]/,io=10*1024*1024,Da=function(n){return typeof n=="string"&&n.length!==0&&!Tv.test(n)},Du=function(n){return typeof n=="string"&&n.length!==0&&!Av.test(n)},xv=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Du(n)},Fu=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!Tr(n)||n&&typeof n=="object"&&It(n,".sv")},yr=function(n,e,t,i){i&&e===void 0||Or(ri(n,"value"),e,t)},Or=function(n,e,t){const i=t instanceof _e?new qg(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+mn(i));if(typeof e=="function")throw new Error(n+"contains a function "+mn(i)+" with contents = "+e.toString());if(Tr(e))throw new Error(n+"contains "+e.toString()+" "+mn(i));if(typeof e=="string"&&e.length>io/3&&Cr(e)>io)throw new Error(n+"contains a string greater than "+io+" utf8 bytes "+mn(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(Me(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Da(o)))throw new Error(n+" contains an invalid key ("+o+") "+mn(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Kg(i,o),Or(n,a,i),Yg(i)}),s&&r)throw new Error(n+' contains ".value" child '+mn(i)+" in addition to actual children.")}},Rv=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=rs(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Da(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Gg);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&ot(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},Mu=function(n,e,t,i){const s=ri(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];Me(e,(o,a)=>{const l=new _e(o);if(Or(s,a,Se(t,l)),fa(l)===".priority"&&!Fu(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),Rv(s,r)},Pv=function(n,e,t){if(Tr(e))throw new Error(ri(n,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Fu(e))throw new Error(ri(n,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},Uu=function(n,e,t,i){if(!Du(t))throw new Error(ri(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Nv=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Uu(n,e,t)},yn=function(n,e){if(le(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Lv=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Da(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!xv(t))throw new Error(ri(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class Ov{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Dr(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!pa(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function Bu(n,e,t){Dr(n,t),zu(n,i=>pa(i,e))}function lt(n,e,t){Dr(n,t),zu(n,i=>ot(i,e)||ot(e,i))}function zu(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(Dv(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Dv(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();ji&&Fe("event: "+t.toString()),Ii(i)}}}/**
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
 */const Fv="repo_interrupt",Mv=25;class Uv{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Ov,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=dr(),this.transactionQueueTree_=new La,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Bv(n,e,t){if(n.stats_=ua(n.repoInfo_),n.forceRestClient_||_g())n.server_=new cr(n.repoInfo_,(i,s,r,o)=>{oc(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>ac(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Ne(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new Nt(n.repoInfo_,e,(i,s,r,o)=>{oc(n,i,s,r,o)},i=>{ac(n,i)},i=>{zv(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=Eg(n.repoInfo_,()=>new w_(n.stats_,n.server_)),n.infoData_=new g_,n.infoSyncTree_=new sc({startListening:(i,s,r,o)=>{let a=[];const l=n.infoData_.getNode(i._path);return l.isEmpty()||(a=vs(n.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Fa(n,"connected",!1),n.serverSyncTree_=new sc({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);lt(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function $u(n){const t=n.infoData_.getNode(new _e(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Fr(n){return wv({timestamp:$u(n)})}function oc(n,e,t,i,s){n.dataUpdateCount++;const r=new _e(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const l=Qs(t,c=>xe(c));o=mv(n.serverSyncTree_,r,l,s)}else{const l=xe(t);o=Su(n.serverSyncTree_,r,l,s)}else if(i){const l=Qs(t,c=>xe(c));o=hv(n.serverSyncTree_,r,l)}else{const l=xe(t);o=vs(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=hi(n,r)),lt(n.eventQueue_,a,o)}function ac(n,e){Fa(n,"connected",e),e===!1&&Hv(n)}function zv(n,e){Me(e,(t,i)=>{Fa(n,t,i)})}function Fa(n,e,t){const i=new _e("/.info/"+e),s=xe(t);n.infoData_.updateSnapshot(i,s);const r=vs(n.infoSyncTree_,i,s);lt(n.eventQueue_,i,r)}function Ma(n){return n.nextWriteId_++}function $v(n,e,t){const i=gv(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=xe(s).withIndex(e._queryParams.getIndex());xo(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=vs(n.serverSyncTree_,e._path,r);else{const a=ds(n.serverSyncTree_,e);o=Su(n.serverSyncTree_,e._path,r,a)}return lt(n.eventQueue_,e._path,o),vr(n.serverSyncTree_,e,t,null,!0),r},s=>(bs(n,"get for query "+Ne(e)+" failed: "+s),Promise.reject(new Error(s))))}function Wv(n,e,t,i,s){bs(n,"set",{path:e.toString(),value:t,priority:i});const r=Fr(n),o=xe(t,i),a=Sa(n.serverSyncTree_,e),l=Pu(o,a,r),c=Ma(n),h=ku(n.serverSyncTree_,e,l,c,!0);Dr(n.eventQueue_,h),n.server_.put(e.toString(),o.val(!0),(p,f)=>{const b=p==="ok";b||He("set at "+e+" failed: "+p);const m=Yt(n.serverSyncTree_,c,!b);lt(n.eventQueue_,e,m),dn(n,s,p,f)});const d=Ba(n,e);hi(n,d),lt(n.eventQueue_,d,[])}function jv(n,e,t,i){bs(n,"update",{path:e.toString(),value:t});let s=!0;const r=Fr(n),o={};if(Me(t,(a,l)=>{s=!1,o[a]=Ru(Se(e,a),xe(l),n.serverSyncTree_,r)}),s)Fe("update() called with empty data.  Don't do anything."),dn(n,i,"ok",void 0);else{const a=Ma(n),l=uv(n.serverSyncTree_,e,o,a);Dr(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,h)=>{const d=c==="ok";d||He("update at "+e+" failed: "+c);const p=Yt(n.serverSyncTree_,a,!d),f=p.length>0?hi(n,e):e;lt(n.eventQueue_,f,p),dn(n,i,c,h)}),Me(t,c=>{const h=Ba(n,Se(e,c));hi(n,h)}),lt(n.eventQueue_,e,[])}}function Hv(n){bs(n,"onDisconnectEvents");const e=Fr(n),t=dr();Co(n.onDisconnect_,ge(),(s,r)=>{const o=Ru(s,r,n.serverSyncTree_,e);ki(t,s,o)});let i=[];Co(t,ge(),(s,r)=>{i=i.concat(vs(n.serverSyncTree_,s,r));const o=Ba(n,s);hi(n,o)}),n.onDisconnect_=dr(),lt(n.eventQueue_,ge(),i)}function Vv(n,e,t){n.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&Eo(n.onDisconnect_,e),dn(n,t,i,s)})}function lc(n,e,t,i){const s=xe(t);n.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&ki(n.onDisconnect_,e,s),dn(n,i,r,o)})}function Gv(n,e,t,i,s){const r=xe(t,i);n.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&ki(n.onDisconnect_,e,r),dn(n,s,o,a)})}function qv(n,e,t,i){if(Js(t)){Fe("onDisconnect().update() called with empty data.  Don't do anything."),dn(n,i,"ok",void 0);return}n.server_.onDisconnectMerge(e.toString(),t,(s,r)=>{s==="ok"&&Me(t,(o,a)=>{const l=xe(a);ki(n.onDisconnect_,Se(e,o),l)}),dn(n,i,s,r)})}function Kv(n,e,t){let i;le(e._path)===".info"?i=xo(n.infoSyncTree_,e,t):i=xo(n.serverSyncTree_,e,t),Bu(n.eventQueue_,e._path,i)}function Po(n,e,t){let i;le(e._path)===".info"?i=vr(n.infoSyncTree_,e,t):i=vr(n.serverSyncTree_,e,t),Bu(n.eventQueue_,e._path,i)}function Yv(n){n.persistentConnection_&&n.persistentConnection_.interrupt(Fv)}function bs(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),Fe(t,...e)}function dn(n,e,t,i){e&&Ii(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Wu(n,e,t){return Sa(n.serverSyncTree_,e,t)||re.EMPTY_NODE}function Ua(n,e=n.transactionQueueTree_){if(e||Mr(n,e),Ti(e)){const t=Hu(n,e);H(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&Zv(n,ys(e),t)}else Lu(e)&&Lr(e,t=>{Ua(n,t)})}function Zv(n,e,t){const i=t.map(c=>c.currentWriteId),s=Wu(n,e,i);let r=s;const o=s.hash();for(let c=0;c<t.length;c++){const h=t[c];H(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const d=je(e,h.path);r=r.updateChild(d,h.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{bs(n,"transaction put response",{path:l.toString(),status:c});let h=[];if(c==="ok"){const d=[];for(let p=0;p<t.length;p++)t[p].status=2,h=h.concat(Yt(n.serverSyncTree_,t[p].currentWriteId)),t[p].onComplete&&d.push(()=>t[p].onComplete(null,!0,t[p].currentOutputSnapshotResolved)),t[p].unwatcher();Mr(n,Oa(n.transactionQueueTree_,e)),Ua(n,n.transactionQueueTree_),lt(n.eventQueue_,e,h);for(let p=0;p<d.length;p++)Ii(d[p])}else{if(c==="datastale")for(let d=0;d<t.length;d++)t[d].status===3?t[d].status=4:t[d].status=0;else{He("transaction at "+l.toString()+" failed: "+c);for(let d=0;d<t.length;d++)t[d].status=4,t[d].abortReason=c}hi(n,e)}},o)}function hi(n,e){const t=ju(n,e),i=ys(t),s=Hu(n,t);return Jv(n,s,i),i}function Jv(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=je(t,l.path);let h=!1,d;if(H(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)h=!0,d=l.abortReason,s=s.concat(Yt(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Mv)h=!0,d="maxretry",s=s.concat(Yt(n.serverSyncTree_,l.currentWriteId,!0));else{const p=Wu(n,l.path,o);l.currentInputSnapshot=p;const f=e[a].update(p.val());if(f!==void 0){Or("transaction failed: Data returned ",f,l.path);let b=xe(f);typeof f=="object"&&f!=null&&It(f,".priority")||(b=b.updatePriority(p.getPriority()));const v=l.currentWriteId,y=Fr(n),_=Pu(b,p,y);l.currentOutputSnapshotRaw=b,l.currentOutputSnapshotResolved=_,l.currentWriteId=Ma(n),o.splice(o.indexOf(v),1),s=s.concat(ku(n.serverSyncTree_,l.path,_,l.currentWriteId,l.applyLocally)),s=s.concat(Yt(n.serverSyncTree_,v,!0))}else h=!0,d="nodata",s=s.concat(Yt(n.serverSyncTree_,l.currentWriteId,!0))}lt(n.eventQueue_,t,s),s=[],h&&(e[a].status=2,function(p){setTimeout(p,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}Mr(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)Ii(i[a]);Ua(n,n.transactionQueueTree_)}function ju(n,e){let t,i=n.transactionQueueTree_;for(t=le(e);t!==null&&Ti(i)===void 0;)i=Oa(i,t),e=be(e),t=le(e);return i}function Hu(n,e){const t=[];return Vu(n,e,t),t.sort((i,s)=>i.order-s.order),t}function Vu(n,e,t){const i=Ti(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);Lr(e,s=>{Vu(n,s,t)})}function Mr(n,e){const t=Ti(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,Nu(e,t.length>0?t:void 0)}Lr(e,i=>{Mr(n,i)})}function Ba(n,e){const t=ys(ju(n,e)),i=Oa(n.transactionQueueTree_,e);return kv(i,s=>{so(n,s)}),so(n,i),Ou(i,s=>{so(n,s)}),t}function so(n,e){const t=Ti(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(H(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(H(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(Yt(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Nu(e,void 0):t.length=r+1,lt(n.eventQueue_,ys(e),s);for(let o=0;o<i.length;o++)Ii(i[o])}}/**
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
 */function Qv(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Xv(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):He(`Invalid query segment '${t}' in query '${n}'`)}return e}const cc=function(n,e){const t=ey(n),i=t.namespace;t.domain==="firebase.com"&&Ft(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&Ft("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||lg();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Kd(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new _e(t.pathString)}},ey=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let h=n.indexOf("/");h===-1&&(h=n.length);let d=n.indexOf("?");d===-1&&(d=n.length),e=n.substring(0,Math.min(h,d)),h<d&&(s=Qv(n.substring(h,d)));const p=Xv(n.substring(Math.min(n.length,d)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const f=e.slice(0,c);if(f.toLowerCase()==="localhost")t="localhost";else if(f.split(".").length<=2)t=f;else{const b=e.indexOf(".");i=e.substring(0,b).toLowerCase(),t=e.substring(b+1),r=i}"ns"in p&&(r=p.ns)}return{host:e,port:l,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
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
 */const dc="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",ty=function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=dc.charAt(t%64),t=Math.floor(t/64);H(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=dc.charAt(e[s]);return H(o.length===20,"nextPushId: Length should be 20."),o}}();/**
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
 */class Gu{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Ne(this.snapshot.exportVal())}}class qu{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class za{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return H(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class ny{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new vt;return Vv(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){yn("OnDisconnect.remove",this._path);const e=new vt;return lc(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){yn("OnDisconnect.set",this._path),yr("OnDisconnect.set",e,this._path,!1);const t=new vt;return lc(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){yn("OnDisconnect.setWithPriority",this._path),yr("OnDisconnect.setWithPriority",e,this._path,!1),Pv("OnDisconnect.setWithPriority",t);const i=new vt;return Gv(this._repo,this._path,e,t,i.wrapCallback(()=>{})),i.promise}update(e){yn("OnDisconnect.update",this._path),Mu("OnDisconnect.update",e,this._path);const t=new vt;return qv(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}}/**
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
 */class $a{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return ue(this._path)?null:fa(this._path)}get ref(){return new kt(this._repo,this._path)}get _queryIdentifier(){const e=Kl(this._queryParams),t=ca(e);return t==="{}"?"default":t}get _queryObject(){return Kl(this._queryParams)}isEqual(e){if(e=Ue(e),!(e instanceof $a))return!1;const t=this._repo===e._repo,i=pa(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Vg(this._path)}}class kt extends $a{constructor(e,t){super(e,t,new va,!1)}get parent(){const e=iu(this._path);return e===null?null:new kt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class fi{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new _e(e),i=pi(this.ref,e);return new fi(this._node.getChild(t),i,Te)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new fi(s,pi(this.ref,i),Te)))}hasChild(e){const t=new _e(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function ve(n,e){return n=Ue(n),n._checkNotDeleted("ref"),e!==void 0?pi(n._root,e):n._root}function pi(n,e){return n=Ue(n),le(n._path)===null?Nv("child","path",e):Uu("child","path",e),new kt(n._repo,Se(n._path,e))}function jn(n){return n=Ue(n),new ny(n._repo,n._path)}function iy(n,e){n=Ue(n),yn("push",n._path),yr("push",e,n._path,!0);const t=$u(n._repo),i=ty(t),s=pi(n,i),r=pi(n,i);let o;return e!=null?o=bn(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function Ye(n){return yn("remove",n._path),bn(n,null)}function bn(n,e){n=Ue(n),yn("set",n._path),yr("set",e,n._path,!1);const t=new vt;return Wv(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function Ku(n,e){Mu("update",e,n._path);const t=new vt;return jv(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function sy(n){n=Ue(n);const e=new za(()=>{}),t=new ws(e);return $v(n._repo,n,t).then(i=>new fi(i,new kt(n._repo,n._path),n._queryParams.getIndex()))}class ws{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new Gu("value",this,new fi(e.snapshotNode,new kt(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new qu(this,e,t):null}matches(e){return e instanceof ws?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Wa{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new qu(this,e,t):null}createEvent(e,t){H(e.childName!=null,"Child events should have a childName.");const i=pi(new kt(t._repo,t._path),e.childName),s=t._queryParams.getIndex();return new Gu(e.type,this,new fi(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Wa?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function ry(n,e,t,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const l=t,c=(h,d)=>{Po(n._repo,n,a),l(h,d)};c.userCallback=t.userCallback,c.context=t.context,t=c}const o=new za(t,r||void 0),a=new ws(o);return Kv(n._repo,n,a),()=>Po(n._repo,n,a)}function $t(n,e,t,i){return ry(n,"value",e,t,i)}function No(n,e,t){let i=null;const s=t?new za(t):null;e==="value"?i=new ws(s):e&&(i=new Wa(e,s)),Po(n._repo,n,i)}iv(kt);lv(kt);/**
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
 */const oy="FIREBASE_DATABASE_EMULATOR_HOST",Lo={};let ay=!1;function ly(n,e,t,i){n.repoInfo_=new Kd(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),i&&(n.authTokenProvider_=i)}function cy(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||Ft("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Fe("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=cc(r,s),a=o.repoInfo,l;typeof process<"u"&&Rl&&(l=Rl[oy]),l?(r=`http://${l}?ns=${a.namespace}`,o=cc(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new yg(n.name,n.options,e);Lv("Invalid Firebase Database URL",o),ue(o.path)||Ft("Database URL must point to the root of a Firebase Database (not including a child path).");const h=uy(a,n,c,new vg(n.name,t));return new hy(h,n)}function dy(n,e){const t=Lo[e];(!t||t[n.key]!==n)&&Ft(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Yv(n),delete t[n.key]}function uy(n,e,t,i){let s=Lo[e.name];s||(s={},Lo[e.name]=s);let r=s[n.toURLString()];return r&&Ft("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Uv(n,ay,t,i),s[n.toURLString()]=r,r}class hy{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Bv(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new kt(this._repo,ge())),this._rootInternal}_delete(){return this._rootInternal!==null&&(dy(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Ft("Cannot call "+e+" on a deleted database.")}}function fy(n=Gc(),e){const t=Jo(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=Rh("database");i&&py(t,...i)}return t}function py(n,e,t,i={}){n=Ue(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&Ft("Cannot call useEmulator() after instance has already been initialized.");const s=n._repoInternal;let r;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&Ft('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new Ws(Ws.OWNER);else if(i.mockUserToken){const o=typeof i.mockUserToken=="string"?i.mockUserToken:Ph(i.mockUserToken,n.app.options.projectId);r=new Ws(o)}ly(s,e,t,r)}/**
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
 */function my(n){ng(Ei),oi(new xn("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return cy(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),Qt(Pl,Nl,n),Qt(Pl,Nl,"esm2017")}Nt.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Nt.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};my();var Yu={exports:{}};(function(n){var e=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=function(i){var s=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,r=0,o={},a={manual:i.Prism&&i.Prism.manual,disableWorkerMessageHandler:i.Prism&&i.Prism.disableWorkerMessageHandler,util:{encode:function _(w){return w instanceof l?new l(w.type,_(w.content),w.alias):Array.isArray(w)?w.map(_):w.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(_){return Object.prototype.toString.call(_).slice(8,-1)},objId:function(_){return _.__id||Object.defineProperty(_,"__id",{value:++r}),_.__id},clone:function _(w,k){k=k||{};var I,T;switch(a.util.type(w)){case"Object":if(T=a.util.objId(w),k[T])return k[T];I={},k[T]=I;for(var A in w)w.hasOwnProperty(A)&&(I[A]=_(w[A],k));return I;case"Array":return T=a.util.objId(w),k[T]?k[T]:(I=[],k[T]=I,w.forEach(function(D,x){I[x]=_(D,k)}),I);default:return w}},getLanguage:function(_){for(;_;){var w=s.exec(_.className);if(w)return w[1].toLowerCase();_=_.parentElement}return"none"},setLanguage:function(_,w){_.className=_.className.replace(RegExp(s,"gi"),""),_.classList.add("language-"+w)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(I){var _=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(I.stack)||[])[1];if(_){var w=document.getElementsByTagName("script");for(var k in w)if(w[k].src==_)return w[k]}return null}},isActive:function(_,w,k){for(var I="no-"+w;_;){var T=_.classList;if(T.contains(w))return!0;if(T.contains(I))return!1;_=_.parentElement}return!!k}},languages:{plain:o,plaintext:o,text:o,txt:o,extend:function(_,w){var k=a.util.clone(a.languages[_]);for(var I in w)k[I]=w[I];return k},insertBefore:function(_,w,k,I){I=I||a.languages;var T=I[_],A={};for(var D in T)if(T.hasOwnProperty(D)){if(D==w)for(var x in k)k.hasOwnProperty(x)&&(A[x]=k[x]);k.hasOwnProperty(D)||(A[D]=T[D])}var B=I[_];return I[_]=A,a.languages.DFS(a.languages,function(Z,S){S===B&&Z!=_&&(this[Z]=A)}),A},DFS:function _(w,k,I,T){T=T||{};var A=a.util.objId;for(var D in w)if(w.hasOwnProperty(D)){k.call(w,D,w[D],I||D);var x=w[D],B=a.util.type(x);B==="Object"&&!T[A(x)]?(T[A(x)]=!0,_(x,k,null,T)):B==="Array"&&!T[A(x)]&&(T[A(x)]=!0,_(x,k,D,T))}}},plugins:{},highlightAll:function(_,w){a.highlightAllUnder(document,_,w)},highlightAllUnder:function(_,w,k){var I={callback:k,container:_,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};a.hooks.run("before-highlightall",I),I.elements=Array.prototype.slice.apply(I.container.querySelectorAll(I.selector)),a.hooks.run("before-all-elements-highlight",I);for(var T=0,A;A=I.elements[T++];)a.highlightElement(A,w===!0,I.callback)},highlightElement:function(_,w,k){var I=a.util.getLanguage(_),T=a.languages[I];a.util.setLanguage(_,I);var A=_.parentElement;A&&A.nodeName.toLowerCase()==="pre"&&a.util.setLanguage(A,I);var D=_.textContent,x={element:_,language:I,grammar:T,code:D};function B(S){x.highlightedCode=S,a.hooks.run("before-insert",x),x.element.innerHTML=x.highlightedCode,a.hooks.run("after-highlight",x),a.hooks.run("complete",x),k&&k.call(x.element)}if(a.hooks.run("before-sanity-check",x),A=x.element.parentElement,A&&A.nodeName.toLowerCase()==="pre"&&!A.hasAttribute("tabindex")&&A.setAttribute("tabindex","0"),!x.code){a.hooks.run("complete",x),k&&k.call(x.element);return}if(a.hooks.run("before-highlight",x),!x.grammar){B(a.util.encode(x.code));return}if(w&&i.Worker){var Z=new Worker(a.filename);Z.onmessage=function(S){B(S.data)},Z.postMessage(JSON.stringify({language:x.language,code:x.code,immediateClose:!0}))}else B(a.highlight(x.code,x.grammar,x.language))},highlight:function(_,w,k){var I={code:_,grammar:w,language:k};if(a.hooks.run("before-tokenize",I),!I.grammar)throw new Error('The language "'+I.language+'" has no grammar.');return I.tokens=a.tokenize(I.code,I.grammar),a.hooks.run("after-tokenize",I),l.stringify(a.util.encode(I.tokens),I.language)},tokenize:function(_,w){var k=w.rest;if(k){for(var I in k)w[I]=k[I];delete w.rest}var T=new d;return p(T,T.head,_),h(_,T,w,T.head,0),b(T)},hooks:{all:{},add:function(_,w){var k=a.hooks.all;k[_]=k[_]||[],k[_].push(w)},run:function(_,w){var k=a.hooks.all[_];if(!(!k||!k.length))for(var I=0,T;T=k[I++];)T(w)}},Token:l};i.Prism=a;function l(_,w,k,I){this.type=_,this.content=w,this.alias=k,this.length=(I||"").length|0}l.stringify=function _(w,k){if(typeof w=="string")return w;if(Array.isArray(w)){var I="";return w.forEach(function(B){I+=_(B,k)}),I}var T={type:w.type,content:_(w.content,k),tag:"span",classes:["token",w.type],attributes:{},language:k},A=w.alias;A&&(Array.isArray(A)?Array.prototype.push.apply(T.classes,A):T.classes.push(A)),a.hooks.run("wrap",T);var D="";for(var x in T.attributes)D+=" "+x+'="'+(T.attributes[x]||"").replace(/"/g,"&quot;")+'"';return"<"+T.tag+' class="'+T.classes.join(" ")+'"'+D+">"+T.content+"</"+T.tag+">"};function c(_,w,k,I){_.lastIndex=w;var T=_.exec(k);if(T&&I&&T[1]){var A=T[1].length;T.index+=A,T[0]=T[0].slice(A)}return T}function h(_,w,k,I,T,A){for(var D in k)if(!(!k.hasOwnProperty(D)||!k[D])){var x=k[D];x=Array.isArray(x)?x:[x];for(var B=0;B<x.length;++B){if(A&&A.cause==D+","+B)return;var Z=x[B],S=Z.inside,F=!!Z.lookbehind,g=!!Z.greedy,U=Z.alias;if(g&&!Z.pattern.global){var ae=Z.pattern.toString().match(/[imsuy]*$/)[0];Z.pattern=RegExp(Z.pattern.source,ae+"g")}for(var j=Z.pattern||Z,ee=I.next,$=T;ee!==w.tail&&!(A&&$>=A.reach);$+=ee.value.length,ee=ee.next){var ne=ee.value;if(w.length>_.length)return;if(!(ne instanceof l)){var L=1,P;if(g){if(P=c(j,$,_,F),!P||P.index>=_.length)break;var we=P.index,ie=P.index+P[0].length,K=$;for(K+=ee.value.length;we>=K;)ee=ee.next,K+=ee.value.length;if(K-=ee.value.length,$=K,ee.value instanceof l)continue;for(var G=ee;G!==w.tail&&(K<ie||typeof G.value=="string");G=G.next)L++,K+=G.value.length;L--,ne=_.slice($,K),P.index-=$}else if(P=c(j,0,ne,F),!P)continue;var we=P.index,Re=P[0],de=ne.slice(0,we),pe=ne.slice(we+Re.length),Ae=$+ne.length;A&&Ae>A.reach&&(A.reach=Ae);var Ee=ee.prev;de&&(Ee=p(w,Ee,de),$+=de.length),f(w,Ee,L);var nt=new l(D,S?a.tokenize(Re,S):Re,U,Re);if(ee=p(w,Ee,nt),pe&&p(w,ee,pe),L>1){var ze={cause:D+","+B,reach:Ae};h(_,w,k,ee.prev,$,ze),A&&ze.reach>A.reach&&(A.reach=ze.reach)}}}}}}function d(){var _={value:null,prev:null,next:null},w={value:null,prev:_,next:null};_.next=w,this.head=_,this.tail=w,this.length=0}function p(_,w,k){var I=w.next,T={value:k,prev:w,next:I};return w.next=T,I.prev=T,_.length++,T}function f(_,w,k){for(var I=w.next,T=0;T<k&&I!==_.tail;T++)I=I.next;w.next=I,I.prev=w,_.length-=T}function b(_){for(var w=[],k=_.head.next;k!==_.tail;)w.push(k.value),k=k.next;return w}if(!i.document)return i.addEventListener&&(a.disableWorkerMessageHandler||i.addEventListener("message",function(_){var w=JSON.parse(_.data),k=w.language,I=w.code,T=w.immediateClose;i.postMessage(a.highlight(I,a.languages[k],k)),T&&i.close()},!1)),a;var m=a.util.currentScript();m&&(a.filename=m.src,m.hasAttribute("data-manual")&&(a.manual=!0));function v(){a.manual||a.highlightAll()}if(!a.manual){var y=document.readyState;y==="loading"||y==="interactive"&&m&&m.defer?document.addEventListener("DOMContentLoaded",v):window.requestAnimationFrame?window.requestAnimationFrame(v):window.setTimeout(v,16)}return a}(e);n.exports&&(n.exports=t),typeof Yn<"u"&&(Yn.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(i){i.type==="entity"&&(i.attributes.title=i.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(s,r){var o={};o["language-"+r]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[r]},o.cdata=/^<!\[CDATA\[|\]\]>$/i;var a={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:o}};a["language-"+r]={pattern:/[\s\S]+/,inside:t.languages[r]};var l={};l[s]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return s}),"i"),lookbehind:!0,greedy:!0,inside:a},t.languages.insertBefore("markup","cdata",l)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(i,s){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+i+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[s,"language-"+s],inside:t.languages[s]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,function(i){var s=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;i.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+s.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+s.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+s.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+s.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:s,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},i.languages.css.atrule.inside.rest=i.languages.css;var r=i.languages.markup;r&&(r.tag.addInlined("style","css"),r.tag.addAttribute("style","css"))}(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var i="Loading…",s=function(m,v){return"✖ Error "+m+" while fetching file: "+v},r="✖ Error: File does not exist or is empty",o={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},a="data-src-status",l="loading",c="loaded",h="failed",d="pre[data-src]:not(["+a+'="'+c+'"]):not(['+a+'="'+l+'"])';function p(m,v,y){var _=new XMLHttpRequest;_.open("GET",m,!0),_.onreadystatechange=function(){_.readyState==4&&(_.status<400&&_.responseText?v(_.responseText):_.status>=400?y(s(_.status,_.statusText)):y(r))},_.send(null)}function f(m){var v=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(m||"");if(v){var y=Number(v[1]),_=v[2],w=v[3];return _?w?[y,Number(w)]:[y,void 0]:[y,y]}}t.hooks.add("before-highlightall",function(m){m.selector+=", "+d}),t.hooks.add("before-sanity-check",function(m){var v=m.element;if(v.matches(d)){m.code="",v.setAttribute(a,l);var y=v.appendChild(document.createElement("CODE"));y.textContent=i;var _=v.getAttribute("data-src"),w=m.language;if(w==="none"){var k=(/\.(\w+)$/.exec(_)||[,"none"])[1];w=o[k]||k}t.util.setLanguage(y,w),t.util.setLanguage(v,w);var I=t.plugins.autoloader;I&&I.loadLanguages(w),p(_,function(T){v.setAttribute(a,c);var A=f(v.getAttribute("data-range"));if(A){var D=T.split(/\r\n?|\n/g),x=A[0],B=A[1]==null?D.length:A[1];x<0&&(x+=D.length),x=Math.max(0,Math.min(x-1,D.length)),B<0&&(B+=D.length),B=Math.max(0,Math.min(B,D.length)),T=D.slice(x,B).join(`
`),v.hasAttribute("data-start")||v.setAttribute("data-start",String(x+1))}y.textContent=T,t.highlightElement(y)},function(T){v.setAttribute(a,h),y.textContent=T})}}),t.plugins.fileHighlight={highlight:function(v){for(var y=(v||document).querySelectorAll(d),_=0,w;w=y[_++];)t.highlightElement(w)}};var b=!1;t.fileHighlight=function(){b||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),b=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}}()})(Yu);var gy=Yu.exports;const uc=Yc(gy);Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/});Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}});Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}});Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript"));Prism.languages.js=Prism.languages.javascript;(function(n){n.languages.typescript=n.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),n.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete n.languages.typescript.parameter,delete n.languages.typescript["literal-property"];var e=n.languages.extend("typescript",{});delete e["class-name"],n.languages.typescript["class-name"].inside=e,n.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:e}}}}),n.languages.ts=n.languages.typescript})(Prism);Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/};Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python;Prism.languages.py=Prism.languages.python;(function(n){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;n.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+e.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},n.languages.css.atrule.inside.rest=n.languages.css;var t=n.languages.markup;t&&(t.tag.addInlined("style","css"),t.tag.addAttribute("style","css"))})(Prism);Prism.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]};Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity;Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup;Prism.hooks.add("wrap",function(n){n.type==="entity"&&(n.attributes.title=n.content.replace(/&amp;/,"&"))});Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(e,t){var i={};i["language-"+t]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[t]},i.cdata=/^<!\[CDATA\[|\]\]>$/i;var s={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:i}};s["language-"+t]={pattern:/[\s\S]+/,inside:Prism.languages[t]};var r={};r[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:s},Prism.languages.insertBefore("markup","cdata",r)}});Object.defineProperty(Prism.languages.markup.tag,"addAttribute",{value:function(n,e){Prism.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+n+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:Prism.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}});Prism.languages.html=Prism.languages.markup;Prism.languages.mathml=Prism.languages.markup;Prism.languages.svg=Prism.languages.markup;Prism.languages.xml=Prism.languages.extend("markup",{});Prism.languages.ssml=Prism.languages.xml;Prism.languages.atom=Prism.languages.xml;Prism.languages.rss=Prism.languages.xml;Prism.languages.json={property:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,lookbehind:!0,greedy:!0},string:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,lookbehind:!0,greedy:!0},comment:{pattern:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},number:/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}};Prism.languages.webmanifest=Prism.languages.json;class _y{constructor(e,t,i,s,r){this.auth=e,this.db=t,this.onStatusUpdate=i||(()=>{}),this.onFileReceived=s||(()=>{}),this.onProgress=r||(()=>{}),this.deviceId=this.getOrCreateDeviceId(),this.deviceName=this.detectDeviceName(),this.peerConnection=null,this.dataChannel=null,this.activeDevices={},this.currentMode="AUTO",this.localGoServerUrl=null,this.receiveBuffer=[],this.receivedSize=0,this.incomingFileInfo=null,this.heartbeatTimer=null,this.currentRoomId=null,this._pendingChunkPromises=[],this._receiveChain=Promise.resolve(),this._pendingCandidates=[],this._processedCandidateKeys=new Set,this.isE2EEEnabled=!0,this.isGuestMode=!1,this.cryptoKey=null,this.customKeyString=null,this._candidateUnsubscribers=[]}setCustomEncryptionKey(e){this.customKeyString=e||null,this.cryptoKey=null}getOrCreateDeviceId(){let e=localStorage.getItem("flickmemo_device_id");return e||(e="dev_"+Math.random().toString(36).substring(2,11)+"_"+Date.now().toString(36),localStorage.setItem("flickmemo_device_id",e)),e}detectDeviceName(){const e=navigator.userAgent.toLowerCase();let t="Web Browser";return e.includes("iphone")?t="iPhone":e.includes("ipad")?t="iPad":e.includes("android")?t="Android":e.includes("macintosh")||e.includes("mac os x")?t="Mac":e.includes("windows")?t="Windows PC":e.includes("linux")&&(t="Linux PC"),`${t} (${this.deviceId.substring(4,8)})`}async initLocalGoServerCheck(){this.localGoServerUrl=null}async generateEncryptionKey(){if(!this.cryptoKey){const e=this.customKeyString||"FlickMemo_AES256_GCM_SecretKey_2026",t=new TextEncoder().encode(e),i=await window.crypto.subtle.digest("SHA-256",t);this.cryptoKey=await window.crypto.subtle.importKey("raw",i,{name:"AES-GCM"},!1,["encrypt","decrypt"])}return this.cryptoKey}async encryptChunk(e){if(!this.isE2EEEnabled)return e;const t=await this.generateEncryptionKey(),i=window.crypto.getRandomValues(new Uint8Array(12)),s=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:i},t,e),r=new Uint8Array(i.byteLength+s.byteLength);return r.set(i,0),r.set(new Uint8Array(s),i.byteLength),r.buffer}async decryptChunk(e){try{if(e.byteLength<12)return e;const t=await this.generateEncryptionKey(),i=e.slice(0,12),s=e.slice(12);return await window.crypto.subtle.decrypt({name:"AES-GCM",iv:new Uint8Array(i)},t,s)}catch(t){return console.warn("Decryption fallback (raw chunk used):",t.message),e}}startDevicePresence(){var a;if(this.isGuestMode)return;const e=(a=this.auth)==null?void 0:a.currentUser;if(!e)return;const t=ve(this.db,`users/${e.uid}/devices/${this.deviceId}`),i=ve(this.db,`users/${e.uid}/signaling/${this.deviceId}`),s=ve(this.db,`users/${e.uid}/answers/${this.deviceId}`);jn(t).remove(),jn(i).remove(),jn(s).remove();const r=()=>{bn(t,{id:this.deviceId,name:this.deviceName,online:!0,updatedAt:Date.now()})};r(),clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(r,2e4),$t(i,l=>{const c=l.val();c&&c.offer&&(this.handleIncomingOffer(c.fromDeviceId,c.offer,`users/${e.uid}`,c.mode),Ye(i))});const o=ve(this.db,`users/${e.uid}/devices`);$t(o,l=>{const c=l.val()||{};this.activeDevices={};const h=Date.now();Object.keys(c).forEach(d=>{const p=c[d];d!==this.deviceId&&p&&h-(p.updatedAt||0)<25e3?this.activeDevices[d]=p:p&&h-(p.updatedAt||0)>=25e3&&Ye(ve(this.db,`users/${e.uid}/devices/${d}`))}),this.onStatusUpdate("devices_updated",this.activeDevices)})}joinRoom(e){if(!e)return;this.leaveRoom(),this.currentRoomId=e,this._myJoinedAt=Date.now(),this._roomUnsubscribers=[];const t=ve(this.db,`public_rooms/${e}/members/${this.deviceId}`),i=ve(this.db,`public_rooms/${e}/signaling/${this.deviceId}`),s=ve(this.db,`public_rooms/${e}/answers/${this.deviceId}`);try{jn(t).remove().catch(()=>{}),jn(i).remove().catch(()=>{}),jn(s).remove().catch(()=>{}),bn(t,{id:this.deviceId,name:this.deviceName,joinedAt:this._myJoinedAt}).catch(l=>console.warn("Room join warning:",l.message))}catch{}const r=$t(i,l=>{const c=l.val();c&&c.offer&&(this.handleIncomingOffer(c.fromDeviceId,c.offer,`public_rooms/${e}`,c.mode),Ye(i).catch(()=>{}))},l=>console.warn("Room signaling error:",l.message));this._roomUnsubscribers.push(r);const o=ve(this.db,`public_rooms/${e}/members`),a=$t(o,l=>{if(this.currentRoomId!==e)return;const c=l.val()||{},h=Object.keys(c).filter(d=>d!==this.deviceId);if(h.length>0){const d=h[0];this.deviceId.localeCompare(d)>0&&(this._connectingTo||(this._connectingTo=d,this.onStatusUpdate("room_member_joined",{roomId:e,otherDeviceId:d})))}else this._connectingTo=null},l=>console.warn("Room members error:",l.message));this._roomUnsubscribers.push(a),this.onStatusUpdate("room_joined",{roomId:e})}async cleanupSignalingData(e,t=null){if(!(!e||!this.db))try{Ye(ve(this.db,`${e}/signaling/${this.deviceId}`)).catch(()=>{}),Ye(ve(this.db,`${e}/answers/${this.deviceId}`)).catch(()=>{}),Ye(ve(this.db,`${e}/candidates/${this.deviceId}`)).catch(()=>{}),t&&(Ye(ve(this.db,`${e}/signaling/${t}`)).catch(()=>{}),Ye(ve(this.db,`${e}/answers/${t}`)).catch(()=>{}),Ye(ve(this.db,`${e}/candidates/${t}`)).catch(()=>{}))}catch{}}leaveRoom(){if(this._roomUnsubscribers&&(this._roomUnsubscribers.forEach(e=>{try{e()}catch{}}),this._roomUnsubscribers=[]),this._connectingTo=null,this.currentRoomId){const e=this.currentRoomId;this.cleanupSignalingData(`public_rooms/${e}`),Ye(ve(this.db,`public_rooms/${e}/members/${this.deviceId}`)).catch(()=>{}),this.currentRoomId=null,this.onStatusUpdate("room_left")}}stopDevicePresence(){var t;clearInterval(this.heartbeatTimer),this.leaveRoom();const e=(t=this.auth)==null?void 0:t.currentUser;e&&(this.cleanupSignalingData(`users/${e.uid}`),Ye(ve(this.db,`users/${e.uid}/devices/${this.deviceId}`)).catch(()=>{})),this.cleanupPeerConnection()}resetReceiveBuffer(e=!1){this.receiveBuffer&&(this.receiveBuffer.length=0),this.receiveBuffer=[],this.receivedSize=0,this._pendingChunkPromises=[],e||(this.incomingFileInfo=null)}cleanupPeerConnection(){if(this._connectingTo=null,this.resetReceiveBuffer(),this._receiveChain=Promise.resolve(),this._pendingCandidates=[],this._processedCandidateKeys&&this._processedCandidateKeys.clear(),this._candidateUnsubscribers&&(this._candidateUnsubscribers.forEach(e=>{try{e()}catch{}}),this._candidateUnsubscribers=[]),this.dataChannel){this.dataChannel.onclose=null,this.dataChannel.onerror=null,this.dataChannel.onmessage=null;try{this.dataChannel.close()}catch{}this.dataChannel=null}if(this.peerConnection){this.peerConnection.onicecandidate=null,this.peerConnection.onconnectionstatechange=null,this.peerConnection.ondatachannel=null;try{this.peerConnection.close()}catch{}this.peerConnection=null}}determineOptimalMode(e,t){return this.currentMode!=="AUTO"?this.currentMode:(e?e.online:!0)?"LAN_P2P":"WAN_P2P"}createPeerConnection(e,t,i="AUTO"){this.cleanupPeerConnection();let s=[],r="all";i==="LAN_P2P"?(s=[],r="all"):i==="WEB_RELAY"?(s=[{urls:"turn:openrelay.metered.ca:443",username:"openrelayproject",credential:"openrelayproject"},{urls:"turn:openrelay.metered.ca:443?transport=tcp",username:"openrelayproject",credential:"openrelayproject"},{urls:"turn:openrelay.metered.ca:80",username:"openrelayproject",credential:"openrelayproject"}],r="relay"):i==="WAN_P2P"?(s=[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:openrelay.metered.ca:80"}],r="all"):(s=[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:openrelay.metered.ca:80"},{urls:"turn:openrelay.metered.ca:443",username:"openrelayproject",credential:"openrelayproject"},{urls:"turn:openrelay.metered.ca:443?transport=tcp",username:"openrelayproject",credential:"openrelayproject"}],r="all");const o={iceServers:s,iceTransportPolicy:r},a=new RTCPeerConnection(o);a.onicecandidate=c=>{if(c.candidate&&e&&t){const h=ve(this.db,`${t}/candidates/${e}`);iy(h,JSON.stringify(c.candidate))}};let l=null;return a.oniceconnectionstatechange=()=>{a.iceConnectionState==="connected"||a.iceConnectionState==="completed"?(l&&(clearTimeout(l),l=null),this.cleanupSignalingData(t,e),this.onStatusUpdate("p2p_connected",{targetDeviceId:e})):a.iceConnectionState==="disconnected"?l||(l=setTimeout(()=>{l=null,this.peerConnection&&(this.peerConnection.iceConnectionState==="disconnected"||this.peerConnection.iceConnectionState==="failed")&&(this.cleanupSignalingData(t,e),this.onStatusUpdate("p2p_disconnected",{targetDeviceId:e}))},7e3)):a.iceConnectionState==="failed"&&(l&&(clearTimeout(l),l=null),this.cleanupSignalingData(t,e),this.onStatusUpdate("p2p_disconnected",{targetDeviceId:e}))},a}async addIceCandidateSafe(e){if(!(!this.peerConnection||this.peerConnection.signalingState==="closed")){if(!this.peerConnection.remoteDescription||!this.peerConnection.remoteDescription.type){this._pendingCandidates.push(e);return}try{await this.peerConnection.addIceCandidate(e)}catch(t){console.warn("addIceCandidate skipped:",t.message)}}}async flushPendingCandidates(){if(!(!this.peerConnection||!this.peerConnection.remoteDescription))for(;this._pendingCandidates&&this._pendingCandidates.length>0;){const e=this._pendingCandidates.shift();try{await this.peerConnection.addIceCandidate(e)}catch(t){console.warn("flush candidate skipped:",t.message)}}}async connectToDevice(e,t=!1){var d;const i=t&&this.currentRoomId?`public_rooms/${this.currentRoomId}`:(d=this.auth)!=null&&d.currentUser?`users/${this.auth.currentUser.uid}`:null;if(!i)throw new Error("通信パスの初期化に失敗しました。送信権限がありません。");this.peerConnection=this.createPeerConnection(e,i,this.currentMode),this.dataChannel=this.peerConnection.createDataChannel("flickmemo_transfer",{ordered:!0}),this.setupDataChannelHandlers(this.dataChannel);const s=await this.peerConnection.createOffer();await this.peerConnection.setLocalDescription(s);const r=ve(this.db,`${i}/signaling/${e}`);await bn(r,{fromDeviceId:this.deviceId,offer:JSON.stringify(s),mode:this.currentMode,timestamp:Date.now()});const o=ve(this.db,`${i}/answers/${this.deviceId}`),a=async p=>{const f=p.val();if(f&&f.answer)try{const b=JSON.parse(f.answer);this.peerConnection&&this.peerConnection.signalingState==="have-local-offer"&&(await this.peerConnection.setRemoteDescription(b),await this.flushPendingCandidates(),No(o,"value",a),Ye(o))}catch(b){console.warn("setRemoteDescription skipped:",b.message)}},l=$t(o,a);this._candidateUnsubscribers.push(l);const c=ve(this.db,`${i}/candidates/${this.deviceId}`),h=$t(c,p=>{const f=p.val()||{};Object.entries(f).forEach(async([b,m])=>{if(!this._processedCandidateKeys.has(b)){this._processedCandidateKeys.add(b);try{const v=JSON.parse(m);await this.addIceCandidateSafe(v)}catch{}}})});this._candidateUnsubscribers.push(h)}async handleIncomingOffer(e,t,i,s=null){const r=JSON.parse(t),o=s||this.currentMode;this.peerConnection=this.createPeerConnection(e,i,o),this.peerConnection.ondatachannel=d=>{this.dataChannel=d.channel,this.setupDataChannelHandlers(this.dataChannel)},await this.peerConnection.setRemoteDescription(r),await this.flushPendingCandidates();const a=await this.peerConnection.createAnswer();await this.peerConnection.setLocalDescription(a);const l=ve(this.db,`${i}/answers/${e}`);await bn(l,{fromDeviceId:this.deviceId,answer:JSON.stringify(a),timestamp:Date.now()});const c=ve(this.db,`${i}/candidates/${this.deviceId}`),h=$t(c,d=>{const p=d.val()||{};Object.entries(p).forEach(async([f,b])=>{if(!this._processedCandidateKeys.has(f)){this._processedCandidateKeys.add(f);try{const m=JSON.parse(b);await this.addIceCandidateSafe(m)}catch{}}})});this._candidateUnsubscribers.push(h)}setupDataChannelHandlers(e){e.binaryType="arraybuffer",e.onopen=()=>{this.onStatusUpdate("channel_open")},e.onerror=t=>{console.warn("DataChannel error:",t),this.onStatusUpdate("channel_error",t)},e.onmessage=async t=>{if(typeof t.data=="string")try{const i=JSON.parse(t.data);if(i.type==="file_header")this.resetReceiveBuffer(!1),this._receiveChain=Promise.resolve(),this.incomingFileInfo=i,this.onProgress(0,i.size,i.name,"rec");else if(i.type==="file_end"){await this._receiveChain;const s=this.incomingFileInfo,r=(s==null?void 0:s.mime)||"application/octet-stream",o=new Blob(this.receiveBuffer,{type:r}),a=this.sanitizeFilename(s==null?void 0:s.name),l=(s==null?void 0:s.mode)||"LAN_P2P";this.onFileReceived(o,a,l),this.resetReceiveBuffer(!1),this.onStatusUpdate("remote_transfer_lock",!1)}else i.type==="TRANSFER_LOCK"?this.onStatusUpdate("remote_transfer_lock",!0):i.type==="TRANSFER_UNLOCK"?this.onStatusUpdate("remote_transfer_lock",!1):i.type==="EXPLICIT_DISCONNECT"&&(this.cleanupPeerConnection(),this.onStatusUpdate("p2p_disconnected"))}catch(i){console.warn("Control message error:",i)}else{const i=t.data;this._receiveChain=this._receiveChain.then(async()=>{try{let s;if(i instanceof ArrayBuffer)s=i;else if(i instanceof Blob)s=await i.arrayBuffer();else if(ArrayBuffer.isView(i))s=i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength);else return;let r=s;this.incomingFileInfo&&this.incomingFileInfo.encrypted&&(r=await this.decryptChunk(s)),this.receiveBuffer.push(r),this.receivedSize+=r.byteLength,this.incomingFileInfo&&this.onProgress(this.receivedSize,this.incomingFileInfo.size,this.incomingFileInfo.name,"rec")}catch(s){console.error("Chunk processing error:",s)}})}},e.onclose=()=>{this.onStatusUpdate("channel_close"),this.cleanupPeerConnection()}}sendControlMessage(e){if(this.dataChannel&&this.dataChannel.readyState==="open")try{this.dataChannel.send(JSON.stringify(e))}catch{}}disconnect(){this.sendControlMessage({type:"EXPLICIT_DISCONNECT"}),this.leaveRoom(),this.cleanupPeerConnection(),this.onStatusUpdate("p2p_disconnected")}async getConnectedTransportMode(){if(this.currentMode&&this.currentMode!=="AUTO")return this.currentMode;if(!this.peerConnection)return"WAN_P2P";try{const e=await this.peerConnection.getStats();let t=null,i=new Map;if(e.forEach(s=>{s.type==="transport"?t=s.selectedCandidatePairId:s.type==="local-candidate"&&i.set(s.id,s)}),t||e.forEach(s=>{s.type==="candidate-pair"&&(s.selected||s.state==="succeeded")&&(t=s.id)}),t){const s=e.get(t);if(s){const r=i.get(s.localCandidateId);if(r){const o=r.candidateType;if(o==="relay")return"WEB_RELAY";if(o==="srflx"||o==="prflx")return"WAN_P2P";if(o==="host")return"LAN_P2P"}}}}catch(e){console.warn("Stats candidate detection fallback:",e)}return"WAN_P2P"}async sendFileP2P(e,t){if(!this.dataChannel||this.dataChannel.readyState!=="open")throw new Error("接続が確立されていません。送信先デバイスを選択または共有リンクで接続してください。");this.sendControlMessage({type:"TRANSFER_LOCK"});try{const i=await this.getConnectedTransportMode(),s=!!this.isE2EEEnabled,r=32*1024,o=512*1024,a=128*1024;this.dataChannel.bufferedAmountLowThreshold=a;const l={type:"file_header",name:e.name,size:e.size,mime:e.type||"application/octet-stream",mode:i,encrypted:s};if(this.dataChannel&&this.dataChannel.readyState==="open")this.dataChannel.send(JSON.stringify(l));else throw new Error("転送開始前に接続が切断されました。");if(e.size===0)return this.onProgress(0,0,e.name,"send"),this.dataChannel&&this.dataChannel.readyState==="open"&&this.dataChannel.send(JSON.stringify({type:"file_end"})),i;let c=0;const h=e.size;for(;c<h;){if(!this.dataChannel||this.dataChannel.readyState!=="open")throw new Error("転送中にP2P接続が切断されました。");if(this.dataChannel.bufferedAmount>o&&await new Promise((b,m)=>{let v=null;const y=()=>{v&&clearTimeout(v),this.dataChannel&&this.dataChannel.removeEventListener("bufferedamountlow",y),b()};this.dataChannel.addEventListener("bufferedamountlow",y,{once:!0}),v=setTimeout(()=>{this.dataChannel&&this.dataChannel.removeEventListener("bufferedamountlow",y),this.dataChannel&&this.dataChannel.readyState==="open"?b():m(new Error("転送タイムアウト: 相手端末へのデータ送信が停滞しました"))},15e3)}),!this.dataChannel||this.dataChannel.readyState!=="open")throw new Error("転送中にP2P接続が切断されました。");const p=await e.slice(c,c+r).arrayBuffer();let f=p;if(s&&(f=await this.encryptChunk(p)),!this.dataChannel||this.dataChannel.readyState!=="open")throw new Error("転送中にP2P接続が切断されました。");try{this.dataChannel.send(f)}catch(b){if(console.warn("Send chunk warning, retrying after drain:",b),await new Promise(m=>setTimeout(m,50)),!this.dataChannel||this.dataChannel.readyState!=="open")throw new Error("転送中にP2P接続が切断されました。");this.dataChannel.send(f)}c+=p.byteLength,this.onProgress(c,h,e.name,"send")}return this.dataChannel&&this.dataChannel.readyState==="open"&&this.dataChannel.send(JSON.stringify({type:"file_end"})),i}finally{this.sendControlMessage({type:"TRANSFER_UNLOCK"})}}sanitizeFilename(e){if(!e)return"download_file";let t=e.replace(/[\/\?%*:|"<>]/g,"_");return t=t.replace(/\.\./g,"_"),t.trim()||"download_file"}}const Oo="1.3.75",vy={apiKey:"AIzaSyB1Yt1bCaMmOe84_737RSMcd2NlMkPZLaE",authDomain:"flickmemo-qwe.web.app",databaseURL:"https://flickmemo-qwe-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"flickmemo-qwe",storageBucket:"flickmemo-qwe.firebasestorage.app",messagingSenderId:"998795111125",appId:"1:998795111125:web:8e40535e8f2623283a105c",measurementId:"G-ZDRMZ5VLY9"},Zu=Vc(vy),Ge=eg(Zu),Ai=fy(Zu);let fn=null;const Et=[],yy=500;let zi="all";function by(n){if(n===null)return"null";if(n===void 0)return"undefined";if(typeof n=="object")try{return n instanceof Error?`${n.name}: ${n.message}
${n.stack||""}`:JSON.stringify(n,null,2)}catch{return String(n)}return String(n)}function xi(n,e){const t=new Date().toISOString().slice(11,23),i=Array.from(e).map(by).join(" ");Et.push({time:t,level:n,message:i}),Et.length>yy&&Et.shift(),ja()}const wy=console.log,Ey=console.warn,Cy=console.error,Iy=console.info;console.log=function(...n){wy.apply(console,n),xi("log",n)};console.warn=function(...n){Ey.apply(console,n),xi("warn",n)};console.error=function(...n){Cy.apply(console,n),xi("error",n)};console.info=function(...n){Iy.apply(console,n),xi("info",n)};window.addEventListener("error",n=>{xi("uncaught",[n.error||n.message])});window.addEventListener("unhandledrejection",n=>{xi("uncaught",["Unhandled Rejection:",n.reason])});function ja(){const n=document.getElementById("dev-console-viewer"),e=document.getElementById("dev-log-count");if(!n)return;const t=Et.filter(r=>zi==="all"?!0:zi==="error"?r.level==="error"||r.level==="uncaught":zi==="warn"?r.level==="warn":zi==="info"?r.level==="info"||r.level==="log":!0);if(e&&(e.textContent=Et.length),t.length===0){n.innerHTML='<div class="dev-log-empty">該当するコンソールログはありません</div>';return}const i=t.map(r=>`
        <div class="dev-log-entry ${r.level}">
            <div class="dev-log-header">
                <span class="dev-log-badge ${r.level}">${r.level.toUpperCase()}</span>
                <span class="dev-log-time">[${r.time}]</span>
            </div>
            <div class="dev-log-body">${Je(r.message)}</div>
        </div>
    `).join(""),s=n.scrollHeight-n.clientHeight<=n.scrollTop+40;n.innerHTML=i,s&&(n.scrollTop=n.scrollHeight)}function Ha(n){if(!at||!n||!n.id)return;const e=ve(Ai,`users/${at}/notes/${n.id}`);bn(e,n)}function Es(n,e){if(!at||!n||!e)return;const t=ve(Ai,`users/${at}/notes/${n}`);Ku(t,e)}function Va(n){if(!at||!n)return;const e=ve(Ai,`users/${at}/notes/${n}`);Ye(e)}function ky(){if(!at)return;const n=ve(Ai,`users/${at}/notes`);sy(n).then(e=>{const t=e.val();if(t){const i={};Object.keys(t).forEach(s=>{t[s].deletedAt&&(i[s]=null)}),Ku(n,i)}}).catch(e=>console.error("Clear trash error:",e))}const Ga=7*24*60*60*1e3,js=document.getElementById("splash-screen"),nn=document.getElementById("auth-container"),sn=document.getElementById("app-container"),rt=document.getElementById("main-layout"),Sy=document.getElementById("list-container"),Hs=document.getElementById("note-list"),ro=document.getElementById("empty-state"),On=document.getElementById("editor-area"),me=document.getElementById("note-title-input"),te=document.getElementById("note-body"),ke=document.getElementById("note-code-view"),Do=document.getElementById("status-bar"),Vs=document.getElementById("status-text"),bt=document.getElementById("btn-back"),Le=document.getElementById("search-input"),kn=document.getElementById("auth-loading"),Sn=document.getElementById("auth-buttons"),Ri=document.getElementById("editor-toolbar"),et=document.getElementById("char-count"),tt=document.getElementById("date-display"),Ki=document.getElementById("btn-pin"),hc=document.getElementById("btn-trash-indicator"),Ty=document.getElementById("btn-copy"),Ju=document.getElementById("btn-undo"),Qu=document.getElementById("btn-redo"),Fo=document.getElementById("btn-restore-trash"),Gs=document.getElementById("btn-new"),Yi=document.getElementById("btn-empty-trash"),qs=document.getElementById("trash-notice"),rn=document.getElementById("tab-notes"),on=document.getElementById("tab-trash"),fc=document.getElementById("btn-header-transfer");document.getElementById("btn-back-to-notes");const mi=document.getElementById("transfer-panel"),Rs=document.getElementById("device-chip-list"),Tt=document.getElementById("dropzone-area"),_t=document.getElementById("file-input"),Mo=document.getElementById("btn-browse-files"),gi=document.getElementById("transfer-progress-card"),Ay=document.getElementById("transfer-filename"),xy=document.getElementById("transfer-speed"),Ry=document.getElementById("transfer-progress-fill"),Py=document.getElementById("transfer-status-label"),Ny=document.getElementById("transfer-percent"),oo=document.getElementById("transfer-history-list");let ce=null,Kt=null,ao=0;const wn=document.getElementById("delete-modal"),Ly=document.getElementById("btn-delete-cancel"),Oy=document.getElementById("btn-delete-confirm"),En=document.getElementById("empty-trash-modal"),Dy=document.getElementById("btn-empty-cancel"),Fy=document.getElementById("btn-empty-confirm"),Tn=document.getElementById("logout-modal");document.getElementById("btn-logout-trigger");const My=document.getElementById("btn-modal-cancel"),Uy=document.getElementById("btn-modal-confirm"),mt=document.getElementById("settings-modal"),By=document.getElementById("btn-settings-trigger"),zy=document.getElementById("btn-settings-close"),$y=document.getElementById("btn-update-check"),Wy=document.getElementById("app-version-display"),Kn=document.getElementById("user-avatar"),Uo=document.getElementById("user-name"),Bo=document.getElementById("user-email"),Jn=document.getElementById("user-provider-tag"),jy=document.getElementById("btn-settings-logout-action"),pc=document.getElementById("btn-settings-switch-action");document.getElementById("toast-msg");document.getElementById("toast-text");document.getElementById("btn-toast-action");let Q={},Y=null,Zi=null,Wt=null,Be="notes",at=null,un=!1,Mt=null,mc={};function Ur(n){if(!n)return;let e=null;const t=()=>{n.classList.add("is-scrolling"),clearTimeout(e),e=setTimeout(()=>{n.classList.remove("is-scrolling")},3e3)};n.addEventListener("scroll",t),n.addEventListener("mousemove",t),n.addEventListener("mouseleave",()=>{clearTimeout(e),e=setTimeout(()=>{n.classList.remove("is-scrolling")},1e3)})}Ur(Sy);Ur(On);Ur(te);Ur(ke);function Hy(){return{bodyTop:te?te.scrollTop:0,areaTop:On?On.scrollTop:0,codeTop:ke?ke.scrollTop:0}}function lo(n){n&&(te&&typeof n.bodyTop=="number"&&(te.scrollTop=n.bodyTop),On&&typeof n.areaTop=="number"&&(On.scrollTop=n.areaTop),ke&&typeof n.codeTop=="number"&&(ke.scrollTop=n.codeTop))}function Xe(n,e){Do.className=`m3-badge status-${n}`,Vs.textContent=e}function X(n,e=4e3,t=null){let i=document.getElementById("toast-container");i||(i=document.createElement("div"),i.id="toast-container",i.className="m3-toast-container",document.body.appendChild(i));const s=document.createElement("div");s.className="m3-toast-item";let r="";t&&Array.isArray(t)&&t.length>0&&(r='<div class="m3-toast-actions">'+t.map((h,d)=>`
            <button type="button" class="m3-toast-action-btn" data-action-idx="${d}">
                ${h.icon?`<span class="material-symbols-outlined" style="font-size:14px;">${h.icon}</span>`:""}
                ${Je(h.label||"")}
            </button>
        `).join("")+"</div>"),s.innerHTML=`
        <div class="m3-toast-content">
            <span class="material-symbols-outlined m3-toast-icon">info</span>
            <span class="m3-toast-text">${Je(n)}</span>
        </div>
        ${r}
        <button type="button" class="m3-toast-close" title="閉じる">
            <span class="material-symbols-outlined" style="font-size:16px;">close</span>
        </button>
    `,t&&Array.isArray(t)&&s.querySelectorAll(".m3-toast-action-btn").forEach(h=>{const d=parseInt(h.getAttribute("data-action-idx"),10);t[d]&&typeof t[d].onClick=="function"&&(h.onclick=p=>{p.stopPropagation(),t[d].onClick()})});const o=s.querySelector(".m3-toast-close"),a=()=>{s.classList.contains("dismissing")||(s.classList.add("dismissing"),setTimeout(()=>{s.parentNode&&s.parentNode.removeChild(s)},260))};o.onclick=a,i.appendChild(s);const l=i.querySelectorAll(".m3-toast-item:not(.dismissing)");if(l.length>3)for(let h=0;h<l.length-3;h++)l[h].classList.add("stacked-faded");setTimeout(a,typeof e=="number"?e:4e3)}window.addEventListener("online",()=>Xe("saving","オンライン復帰・同期中..."));window.addEventListener("offline",()=>Xe("offline","ローカル保存済み"));function Vy(){Wy.textContent=`v${Oo}`}function Ks(n){const t=`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" fill="#042f66" rx="32"/><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="#a8c7fa" font-size="28" font-family="sans-serif" font-weight="bold">${(n||"U").charAt(0).toUpperCase()}</text></svg>`;return"data:image/svg+xml;utf8,"+encodeURIComponent(t)}function Gy(n){if(!n||!n.trim())return!1;const e=[/\bimport\s+[\s\S]*?\s+from\s+["']/,/\bexport\s+(default|const|let|var|function|class)\b/,/\binitializeApp\s*\(/,/\bgetAuth\s*\(/,/\bnew\s+Worker\s*\(/,/\bdocument\.getElementById\s*\(/,/\bwindow\.addEventListener\s*\(/,/\bfunction\s+\w+\s*\(/,/\bconst\s+\w+\s*=\s*/,/\blet\s+\w+\s*=\s*/,/\bclass\s+\w+/,/\bdef\s+\w+\s*\(/];let t=0;for(const i of e)i.test(n)&&t++;return t>=2}function Xu(n){const e=n.trim();if(!e)return!1;const t=/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(e),i=/\b(function|const|let|var|if|else|for|while|return|import|export|class|def|async|await)\b/.test(e);return t&&!i}function qy(n){const e=n.trim();if(!e||Xu(e))return!1;if(e.startsWith("//")||e.startsWith("/*")||e.startsWith("*"))return!0;let t=e.replace(/\/\/.*$/,"").replace(/#.*$/,"");t=t.replace(/"[^"]*"/g,'""').replace(/'[^']*'/g,"''");const i=/\b(import|export|const|let|var|function|async|await|return|class|def|console\.log|document\.|window\.)\b/.test(t),s=/(=>|===|!==|[{}\];]|<[a-zA-Z\/]|<\/)/.test(t);return i||s}function Pi(n=!1){const e=te.value||"";if(!e.trim()){te.classList.remove("hidden"),ke.classList.add("hidden");return}const t=Y?Q[Y]:null,i=t&&t.codeCollapsed?t.codeCollapsed:{},s=Gy(e),r=/```[\s\S]*?```/.test(e);let o=!1,a="",l=0;if(s){o=!0;const c=!!i.block_0;a=Ps("javascript",e.trim(),0,c)}else if(r){o=!0;const c=/```(\w+)?\n([\s\S]*?)```/g;let h=0,d;for(;(d=c.exec(e))!==null;){const f=e.substring(h,d.index);f.trim()&&(a+=`<p>${Je(f)}</p>`);const b=(d[1]||"javascript").toLowerCase(),m=d[2].trim(),v=!!i[`block_${l}`];a+=Ps(b,m,l,v),l++,h=d.index+d[0].length}const p=e.substring(h);p.trim()&&(a+=`<p>${Je(p)}</p>`)}else{const c=e.split(`
`);let h=[],d=null;if(c.forEach(p=>{const f=Xu(p),b=!f&&qy(p),m=!p.trim();let v="TEXT";if(f?v="TEXT":b?v="CODE":m&&(v=d??"TEXT"),d===null)d=v,h.push(p);else if(d===v)h.push(p);else{const y=h.join(`
`).trim();if(y)if(d==="CODE"){o=!0;const _=!!i[`block_${l}`];a+=Ps("javascript",y,l,_),l++}else a+=`<p>${Je(y)}</p>`;h=[p],d=v}}),h.length>0){const p=h.join(`
`).trim();if(p)if(d==="CODE"){o=!0;const f=!!i[`block_${l}`];a+=Ps("javascript",p,l,f),l++}else a+=`<p>${Je(p)}</p>`}}o&&(n||document.activeElement!==te)?(ke.innerHTML=a,uc&&uc.highlightAllUnder(ke),ke.querySelectorAll(".copy-code-btn").forEach(c=>{c.onclick=h=>{h.stopPropagation();const d=decodeURIComponent(c.getAttribute("data-code"));navigator.clipboard.writeText(d),X("コードをコピーしました")}}),ke.querySelectorAll(".collapse-code-btn").forEach(c=>{c.onclick=h=>{h.stopPropagation();const d=c.getAttribute("data-index"),p=ke.querySelector(`.code-block-wrapper[data-index="${d}"]`);if(t){t.codeCollapsed=t.codeCollapsed||{};const f=!p.classList.contains("is-collapsed");t.codeCollapsed[`block_${d}`]=f,p.classList.toggle("is-collapsed",f),c.querySelector("span").textContent=f?"unfold_more":"unfold_less",t.id&&(Bt(t),Xe("saving","クラウドに保存中..."),Es(t.id,{codeCollapsed:t.codeCollapsed}))}}}),te.classList.add("hidden"),ke.classList.remove("hidden")):(te.classList.remove("hidden"),ke.classList.add("hidden"))}ke.onmouseup=n=>{if(n.target.closest(".copy-code-btn")||n.target.closest(".collapse-code-btn"))return;const e=ke.getBoundingClientRect();if(n.clientX>=e.right-14)return;const t=window.getSelection();if(t&&t.toString().length>0)return;const i=ke.scrollTop,s=n.clientY-e.top+i,r=ke.scrollHeight||1,o=Math.min(1,Math.max(0,s/r)),a=Math.floor(te.value.length*o);ke.classList.add("hidden"),te.classList.remove("hidden"),te.scrollTop=i,te.focus({preventScroll:!0}),setTimeout(()=>{te.setSelectionRange(a,a),te.scrollTop=i},10)};function Ps(n,e,t,i){const s=Je(e);return`
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
  `}function Je(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}let st=[],Qe=-1,gc=null;function Ky(n=""){st=[n],Qe=0,Br()}function Yy(n){Qe>=0&&st[Qe]===n||(clearTimeout(gc),gc=setTimeout(()=>{st=st.slice(0,Qe+1),st.push(n),st.length>25&&st.shift(),Qe=st.length-1,Br()},300))}function Zy(n){if(!n)return;const e=Hs.querySelector(".note-item.active");if(!e){Ke(Le.value);return}const t=Q[n];if(!t)return;const i=e.querySelector(".title");if(i){const s=br(t);t.pinned&&Be==="notes"?i.innerHTML=`<span class="material-symbols-outlined pin-icon">push_pin</span> ${Je(s)}`:i.textContent=s}}function eh(n,e){!n||!Q[n]||(Object.assign(Q[n],e),Q[n].updatedAt=Date.now(),Zy(n),qa(Q[n]),Qa(),Xe("saving","保存中..."),clearTimeout(Mt),Mt=setTimeout(()=>{$n(n)},750))}function $n(n){clearTimeout(Mt),Mt=null;const e=n?Q[n]:Y?Q[Y]:null;if(!e||!e.id)return;Bt(e);const t=mc[e.id];if(t&&t.body===e.body&&t.title===e.title&&t.pinned===e.pinned){Xe("synced","クラウド同期完了");return}mc[e.id]={body:e.body,title:e.title,pinned:e.pinned},Es(e.id,{body:e.body,title:e.title,pinned:e.pinned,updatedAt:e.updatedAt}),Xe("synced","クラウド同期完了")}function Jy(){var n;typeof chrome<"u"&&((n=chrome==null?void 0:chrome.action)!=null&&n.setBadgeText)&&chrome.action.setBadgeText({text:""})}function th(){var n;typeof chrome<"u"&&((n=chrome==null?void 0:chrome.storage)!=null&&n.local)&&chrome.storage.local.get(["pendingQuickNote"],e=>{if(e&&e.pendingQuickNote){const t=e.pendingQuickNote;chrome.storage.local.remove("pendingQuickNote"),jr(!0),Y&&Q[Y]&&(te.value=t,Xa(),$n(Y),X("選択したテキストを新しいメモに追加しました"))}})}function Br(){Ju.disabled=Qe<=0,Qu.disabled=Qe>=st.length-1}function nh(n){if(te.value=n,!Y||!Q[Y])return;const e={...Q[Y],id:Y,title:Q[Y].title||"",body:n,pinned:Q[Y].pinned||!1,codeCollapsed:Q[Y].codeCollapsed||{},updatedAt:Date.now()};e.id&&(Q[Y]=e,Bt(e),qa(e),Qa(),Ke(Le.value),Pi(!0),Xe("saving","クラウドに保存中..."),Es(Y,{body:n,updatedAt:e.updatedAt}))}Ju.onclick=()=>{Qe>0&&(Qe--,nh(st[Qe]),Br())};Qu.onclick=()=>{Qe<st.length-1&&(Qe++,nh(st[Qe]),Br())};function br(n){if(!n)return"空のメモ";if(n.title&&n.title.trim())return n.title.trim();const e=n.body||"";if(!e.trim())return"空のメモ";const t=e.split(`
`).map(s=>s.trim()).filter(s=>s.length>0);if(t.length===0)return"空のメモ";const i=t[0];return i.replace(/^([#*\-–—•>\d\.\s]+)/,"").trim()||i}function Qy(n){if(!n)return"それ以前";const e=new Date,t=new Date(n);if(e.toDateString()===t.toDateString())return"今日";const i=new Date(e);return i.setDate(e.getDate()-1),i.toDateString()===t.toDateString()?"昨日":`${t.getMonth()+1}月${t.getDate()}日`}function ih(n){if(!n)return"";const e=new Date(n);return`${e.getFullYear()}年${e.getMonth()+1}月${e.getDate()}日`}function Xy(n){if(!n)return 7;const e=Date.now()-n,t=Ga-e,i=Math.ceil(t/(24*60*60*1e3));return Math.max(0,i)}let Ut=null;const sh=indexedDB.open("FlickMemoDB",1);sh.onupgradeneeded=n=>n.target.result.createObjectStore("notes",{keyPath:"id"});sh.onsuccess=n=>{Ut=n.target.result,rh()};function rh(){if(!Ut)return;const e=Ut.transaction("notes","readonly").objectStore("notes").getAll();e.onsuccess=()=>{Q={},e.result.forEach(t=>Q[t.id]=t),oh(),Ni(),Ke(Le.value),eb()}}function Bt(n){if(!Ut||!n.id)return;Ut.transaction("notes","readwrite").objectStore("notes").put(n)}function Cs(n){if(!Ut||!n)return;Ut.transaction("notes","readwrite").objectStore("notes").delete(n)}async function _c(){if(Q={},Y=null,Zi=null,Wt=null,te.value="",me.value="",te.disabled=!0,me.disabled=!0,Ri.classList.add("hidden"),me.classList.add("hidden"),et.classList.add("hidden"),tt.classList.add("hidden"),ke.classList.add("hidden"),Ke(""),Ut)return new Promise(n=>{const e=Ut.transaction("notes","readwrite");e.objectStore("notes").clear(),e.oncomplete=()=>n()})}function Ni(n=null){let e=!1;Object.values(Q).forEach(t=>{t.id!==n&&!t.deletedAt&&(!t.body||!t.body.trim())&&(!t.title||!t.title.trim())&&(delete Q[t.id],Cs(t.id),Va(t.id),e=!0)}),e&&Ke(Le.value)}window.addEventListener("beforeunload",()=>{Ni()});function eb(){if(Be!=="notes")return;if(window.innerWidth<=768){rt.classList.remove("view-editor"),bt.classList.add("hidden");return}const e=Object.values(Q).find(t=>!t.deletedAt&&(!t.body||!t.body.trim())&&(!t.title||!t.title.trim()));e?Dn(e.id,!0):jr(!0)}function oh(){const n=Date.now();Object.values(Q).forEach(e=>{e.deletedAt&&n-e.deletedAt>Ga&&(delete Q[e.id],Cs(e.id),Va(e.id))})}function Ke(n=""){Hs.innerHTML="";const e=Date.now(),t=Object.values(Q).filter(s=>Be==="notes"?!s.deletedAt:!!s.deletedAt&&e-s.deletedAt<=Ga).filter(s=>(s.body||"").includes(n)||(s.title||"").includes(n)).sort((s,r)=>{if(Be==="notes"){const o=!!s.pinned,a=!!r.pinned;if(o!==a)return o?-1:1}return(r.updatedAt||0)-(s.updatedAt||0)});if(t.length===0){ro.textContent=Be==="notes"?"メモがありません":"ゴミ箱は空です",ro.classList.remove("hidden");return}else ro.classList.add("hidden");let i="";t.forEach(s=>{let r="",o="";if(Be==="notes"&&s.pinned)r="pinned",o='<span class="material-symbols-outlined" style="font-size:15px; vertical-align:middle; color:var(--m3-primary);">push_pin</span> ピン留め';else{const d=Qy(Be==="notes"?s.updatedAt:s.deletedAt);r=d,o=d}if(r!==i){i=r;const d=document.createElement("div");d.className="date-group-header",d.innerHTML=o,Hs.appendChild(d)}const a=document.createElement("li");a.className=`note-item ${s.id===Y?"active":""}`,a.onclick=()=>Dn(s.id);const l=document.createElement("div");l.className="item-content";const c=document.createElement("span");if(c.className="title",s.pinned&&Be==="notes"?c.innerHTML=`<span class="material-symbols-outlined pin-icon">push_pin</span> ${br(s)}`:c.textContent=br(s),l.appendChild(c),Be==="trash"){const d=document.createElement("span");d.className="sub-meta";const p=Xy(s.deletedAt);d.textContent=`${ih(s.deletedAt)} 移動 • 残り ${p}日`,l.appendChild(d)}const h=document.createElement("button");h.className="btn-delete",h.title=Be==="notes"?"ゴミ箱へ":"完全削除",h.innerHTML=`<span class="material-symbols-outlined" style="font-size:16px;">${Be==="notes"?"delete":"delete_forever"}</span>`,h.onclick=d=>{d.stopPropagation(),Be==="notes"?tb(s.id):nb(s.id)},a.appendChild(l),a.appendChild(h),Hs.appendChild(a)})}function Dn(n,e=!0,t=!1){Mt&&Y&&Y!==n&&$n(Y),t||Ni(n);const i=Y===n,s=i?Hy():null;Y=n;const r=Q[n]||{title:"",body:"",pinned:!1,codeCollapsed:{},updatedAt:Date.now()},o=!!r.deletedAt;if(te.disabled=o,me.disabled=o,i||(te.scrollTop=0,ke.scrollTop=0,On&&(On.scrollTop=0)),document.activeElement===me){if(me.value!==(r.title||"")){const a=me.selectionStart,l=me.selectionEnd;me.value=r.title||"",me.setSelectionRange(a,l)}}else me.value!==(r.title||"")&&(me.value=r.title||"");if(document.activeElement===te){if(te.value!==(r.body||"")){const a=te.selectionStart,l=te.selectionEnd;te.value=r.body||"",te.setSelectionRange(a,l),i&&lo(s)}}else te.value!==(r.body||"")&&(te.value=r.body||"",i&&lo(s)),i||Ky(r.body||"");qa(r),Ri.classList.remove("hidden"),me.classList.remove("hidden"),et.classList.remove("hidden"),tt.classList.remove("hidden"),o?(Fo.classList.remove("hidden"),Ki.classList.add("hidden"),hc.classList.remove("hidden")):(Fo.classList.add("hidden"),hc.classList.add("hidden"),Ki.classList.remove("hidden"),Ki.classList.toggle("active",!!r.pinned)),Qa(),Ke(Le.value),i?lo(s):Pi(),window.innerWidth<=768&&(rt.classList.add("view-editor"),bt.classList.remove("hidden")),e&&!o&&!i&&setTimeout(()=>{te.focus(),te.setSelectionRange(te.value.length,te.value.length)},50)}function qa(n){if(!n)return;const e={...n,title:""},t=br(e);me.placeholder=t==="空のメモ"?"タイトル（未入力時は自動抽出）":`自動: ${t}`}me.oninput=()=>{!Y||!Q[Y]||eh(Y,{title:me.value})};function tb(n){Mt&&Y===n&&$n(n),Q[n]&&(Wt={...Q[n]},Q[n].deletedAt=Date.now(),Bt(Q[n]),Es(n,{deletedAt:Q[n].deletedAt}),Y===n&&(Y=null,me.value="",te.value="",te.disabled=!0,me.disabled=!0,Ri.classList.add("hidden"),me.classList.add("hidden"),et.classList.add("hidden"),tt.classList.add("hidden"),ke.classList.add("hidden")),Ke(Le.value),X("メモをゴミ箱に移動しました",()=>{Wt&&(delete Q[Wt.id].deletedAt,Bt(Q[Wt.id]),Ha(Q[Wt.id]),Dn(Wt.id),X("メモを復元しました"),Wt=null)}))}function nb(n){Zi=n,wn.classList.remove("hidden")}function ah(){if(!Zi)return;const n=Zi;wn.classList.add("hidden"),delete Q[n],Cs(n),Va(n),X("メモを完全削除しました"),Y===n&&(Y=null,me.value="",te.value="",te.disabled=!0,me.disabled=!0,Ri.classList.add("hidden"),me.classList.add("hidden"),et.classList.add("hidden"),tt.classList.add("hidden"),ke.classList.add("hidden")),Zi=null,Ke(Le.value)}Oy.onclick=ah;Ly.onclick=()=>wn.classList.add("hidden");Yi.onclick=()=>En.classList.remove("hidden");Dy.onclick=()=>En.classList.add("hidden");function lh(){En.classList.add("hidden"),Object.values(Q).forEach(n=>{n.deletedAt&&(delete Q[n.id],Cs(n.id))}),ky(),Y&&(!Q[Y]||Q[Y].deletedAt)&&(Y=null,me.value="",te.value="",te.disabled=!0,me.disabled=!0,Ri.classList.add("hidden"),me.classList.add("hidden"),et.classList.add("hidden"),tt.classList.add("hidden"),ke.classList.add("hidden")),Ke(Le.value),X("ゴミ箱を空にしました")}Fy.onclick=lh;window.addEventListener("keydown",n=>{n.key==="Enter"?wn.classList.contains("hidden")?En.classList.contains("hidden")||(n.preventDefault(),lh()):(n.preventDefault(),ah()):n.key==="Escape"&&(Lt&&!Lt.classList.contains("hidden")?(n.preventDefault(),Za()):wn&&!wn.classList.contains("hidden")?(n.preventDefault(),wn.classList.add("hidden")):En&&!En.classList.contains("hidden")?(n.preventDefault(),En.classList.add("hidden")):Tn&&!Tn.classList.contains("hidden")?(n.preventDefault(),Tn.classList.add("hidden")):mt&&!mt.classList.contains("hidden")?(n.preventDefault(),mt.classList.add("hidden")):$e&&$e.classList.contains("open")&&(n.preventDefault(),ct==null||ct.classList.add("hidden"),$e.classList.remove("open")))});Fo.onclick=()=>{!Y||!Q[Y]||(delete Q[Y].deletedAt,Bt(Q[Y]),Ha(Q[Y]),X("メモを復元しました"),Dn(Y))};function Ji(n){if(!Rs)return;Rs.innerHTML="";const e=Object.keys(n||{});if(e.length===0){Rs.innerHTML='<span class="no-device-text">Googleアカウントの他デバイスを検索中...（他端末でFlickMemoを開くと自動表示）</span>';return}e.forEach(t=>{const i=n[t],s=document.createElement("div");s.className=`device-chip ${Kt===t?"selected":""}`,s.innerHTML=`<span class="material-symbols-outlined" style="font-size:16px;">smartphone</span> ${Je(i.name||"端末")}`,s.onclick=async()=>{var r;if(Kt===t&&((r=ce==null?void 0:ce.dataChannel)==null?void 0:r.readyState)==="open"){ce.cleanupPeerConnection(),Kt=null,Ji(n),X("接続を切断しました");return}if(Kt=t,Ji(n),X(`${i.name} へP2P接続を試みています...`),ce)try{await ce.connectToDevice(t)}catch(o){Kt=null,Ji(n),X("接続エラー: "+o.message)}},Rs.appendChild(s)})}let An=null;function ch(){An&&clearTimeout(An),An=setTimeout(()=>{gi&&gi.classList.add("hidden")},4e3)}const Hn=document.getElementById("transfer-step-connect"),Vn=document.getElementById("transfer-step-session"),vc=document.getElementById("session-device-name"),zo=document.getElementById("btn-disconnect-session"),Qi=document.getElementById("transfer-lock-banner"),Ns=document.getElementById("guest-receiver-banner"),Ls=document.querySelector(".target-segmented-tabs");document.querySelector(".room-section-box:first-child");document.querySelector(".room-divider-badge");const yc=document.getElementById("btn-settings-login-action");document.querySelector(".e2ee-toggle-card");document.getElementById("custom-mode-dropdown");function dh(){un?(Ls&&Ls.classList.add("hidden"),jt&&jt.classList.add("hidden"),Ht&&Ht.classList.remove("hidden"),Ns&&Ns.classList.add("hidden")):(Ls&&Ls.classList.remove("hidden"),Ns&&Ns.classList.add("hidden"))}function Xi(n,e){dh(),n?(Hn==null||Hn.classList.add("hidden"),Vn==null||Vn.classList.remove("hidden"),vc&&(vc.textContent=`接続中: ${e||"相手端末"}`)):(Hn==null||Hn.classList.remove("hidden"),Vn==null||Vn.classList.add("hidden"),Qi&&Qi.classList.add("hidden"),Mn&&(Mn.disabled=!1))}zo&&(zo.onclick=()=>{ce&&ce.disconnect(),Xi(!1),X("接続を切断しました")});function ib(n,e){var t;if(n==="devices_updated")Ji(e);else if(n==="room_member_joined")X("相手端末を検出しました！接続中..."),ce&&e.otherDeviceId&&ce.connectToDevice(e.otherDeviceId,!0);else if(n==="channel_open"){X("P2P転送チャネルが開きました（接続完了）");const i=Kt&&((t=ce==null?void 0:ce.activeDevices[Kt])==null?void 0:t.name);mt==null||mt.classList.add("hidden"),Ja(),Xi(!0,i)}else if(n==="channel_close"||n==="p2p_disconnected")Kt=null,ce&&Ji(ce.activeDevices),X("接続が切断されました"),Xi(!1),$r(null),An&&clearTimeout(An),gi&&gi.classList.add("hidden"),wr(!1);else if(n==="p2p_connected")X("デバイス間P2P接続が確立しました"),Xi(!0);else if(n==="remote_transfer_lock"){const i=!!e;Qi&&(i?Qi.classList.remove("hidden"):Qi.classList.add("hidden")),Mn&&(Mn.disabled=i)}}const Fn=new Set;function uh(n,e){return e!=null&&e.startsWith("image/")||/\.(png|jpg|jpeg|gif|webp|svg|bmp|ico)$/i.test(n)?"🖼️":/\.(zip|tar|gz|rar|7z|bz2)$/i.test(n)||e!=null&&e.includes("zip")?"📦":/\.(pdf)$/i.test(n)||e!=null&&e.includes("pdf")?"📕":/\.(mp4|mov|avi|mkv|webm)$/i.test(n)||e!=null&&e.startsWith("video/")?"🎬":/\.(mp3|wav|ogg|m4a|flac)$/i.test(n)||e!=null&&e.startsWith("audio/")?"🎵":/\.(txt|md|json|js|ts|py|html|css|csv|xml|yaml|yml|log|sh)$/i.test(n)||e!=null&&e.startsWith("text/")?"📄":"📎"}async function Ka(n,e=""){if(!n)return;const t=e||n.name||"file",i=n.type||"",s=uh(t,i);if(i.startsWith("image/"))try{let o=n;if(i!=="image/png"&&(o=await new Promise(a=>{const l=new Image,c=URL.createObjectURL(n);l.onload=()=>{const h=document.createElement("canvas");h.width=l.naturalWidth||l.width,h.height=l.naturalHeight||l.height,h.getContext("2d").drawImage(l,0,0),h.toBlob(p=>{URL.revokeObjectURL(c),a(p||n)},"image/png")},l.onerror=()=>{URL.revokeObjectURL(c),a(n)},l.src=c})),navigator.clipboard&&navigator.clipboard.write)return await navigator.clipboard.write([new ClipboardItem({"image/png":o})]),X(`${s} 画像「${t}」をクリップボードにコピーしました`),!0}catch(o){console.warn("Direct image write failed, trying binary write:",o)}if(navigator.clipboard&&navigator.clipboard.write)try{const o=i||"application/octet-stream",a={};return a[o]=n,await navigator.clipboard.write([new ClipboardItem(a)]),X(`${s} ファイル「${t}」をクリップボードにコピーしました`),!0}catch(o){console.warn("ClipboardItem write failed, trying text/data fallback:",o)}if(i.startsWith("text/")||/\.(txt|md|json|js|ts|py|html|css|csv|xml|yaml|yml|log|sh|bat|c|cpp|h|java|kt|go|rs|sql)$/i.test(t))try{const o=await n.text();if(navigator.clipboard&&navigator.clipboard.writeText)return await navigator.clipboard.writeText(o),X(`📄 テキスト「${t}」をクリップボードにコピーしました`),!0}catch{}try{if(navigator.clipboard&&navigator.clipboard.writeText)if(n.size<=3*1024*1024){const o=new FileReader;return o.onload=async()=>{try{await navigator.clipboard.writeText(o.result),X(`${s} 「${t}」のデータ(Base64)をクリップボードにコピーしました`)}catch{await navigator.clipboard.writeText(t),X(`ファイル名「${t}」をコピーしました`)}},o.readAsDataURL(n),!0}else return await navigator.clipboard.writeText(t),X(`ファイル名「${t}」をコピーしました`),!0}catch(o){console.warn("Clipboard fallback error:",o)}}function Ya(n,e){if(!n)return;const t=URL.createObjectURL(n);Fn.add(t);const i=document.createElement("a");i.href=t,i.download=e||"download_file",document.body.appendChild(i),i.click(),document.body.removeChild(i),setTimeout(()=>{URL.revokeObjectURL(t),Fn.delete(t)},5e3)}const Lt=document.getElementById("image-preview-modal"),gn=document.getElementById("preview-image-el"),bc=document.getElementById("preview-image-title"),wc=document.getElementById("preview-image-info"),Ec=document.getElementById("btn-preview-close"),Cc=document.getElementById("btn-preview-copy"),Ic=document.getElementById("btn-preview-download");let _i=null,vi="",dt=null;function hh(n,e){return e&&e.startsWith("image/")?!0:/\.(png|jpg|jpeg|gif|webp|svg|bmp|ico)$/i.test(n||"")}function $o(n,e){!n||!Lt||(dt&&(URL.revokeObjectURL(dt),Fn.delete(dt),dt=null),_i=n,vi=e||"image.png",dt=URL.createObjectURL(n),Fn.add(dt),bc&&(bc.textContent=vi),gn&&(gn.src=dt,gn.onload=()=>{const t=gn.naturalWidth||0,i=gn.naturalHeight||0,s=(n.size/(1024*1024)).toFixed(2);wc&&(wc.textContent=`${t} × ${i} px • ${s} MB`)}),Lt.classList.remove("hidden"))}function Za(){Lt&&Lt.classList.add("hidden"),gn&&(gn.src=""),dt&&(URL.revokeObjectURL(dt),Fn.delete(dt),dt=null),_i=null,vi=""}Ec&&(Ec.onclick=Za);Lt&&(Lt.onclick=n=>{n.target===Lt&&Za()});Cc&&(Cc.onclick=()=>{_i&&Ka(_i,vi)});Ic&&(Ic.onclick=()=>{_i&&(Ya(_i,vi),X(`💾 「${vi}」をダウンロードしました`))});function sb(n,e,t){const i=uh(e,n.type),s=hh(e,n.type);fh(e,n.size,"受信",t||"LAN_P2P",n),wr(!1),ch();const r=[];s&&r.push({label:"プレビュー",icon:"visibility",onClick:()=>$o(n,e)}),r.push({label:"コピー",icon:"content_copy",onClick:()=>Ka(n,e)}),r.push({label:"保存",icon:"download",onClick:()=>{Ya(n,e),X(`💾 「${e}」をダウンロードしました`)}}),X(`${i} 「${e}」を受信しました`,7e3,r)}function rb(n,e,t,i){if(!gi)return;An&&clearTimeout(An),gi.classList.remove("hidden"),Ay.textContent=`${i==="send"?"送信:":"受信:"} ${t}`;const s=Math.min(100,Math.round(n/e*100));Ry.style.width=`${s}%`,Ny.textContent=`${s}%`;const r=Date.now();(!ao||s===0)&&(ao=r);const o=(r-ao)/1e3;if(o>.2){const a=(n/1048576/o).toFixed(2);xy.textContent=`${a} MB/s`}Py.textContent=s>=100?"完了":`${(n/(1024*1024)).toFixed(1)} / ${(e/(1024*1024)).toFixed(1)} MB`,s>=100&&ch()}function fh(n,e,t,i="LAN_P2P",s=null){if(!oo)return;const r=oo.querySelector(".empty-history");r&&r.remove();const o=s&&hh(n,s.type);let a="同一Wi-Fi (LAN)",l="bolt";i==="WAN_P2P"?(a="ネット (P2P)",l="public"):i==="WEB_RELAY"?(a="Webリレイ (E2EE)",l="hub"):(a="同一Wi-Fi (LAN)",l="bolt");const c=document.createElement("li");c.className=`transfer-history-item ${o?"is-image-file":""}`,o&&(c.title="クリックして画像をプレビュー表示");const h=(e/(1024*1024)).toFixed(2)+" MB",d=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});c.innerHTML=`
        <div class="transfer-history-info">
            <div class="transfer-history-name-row">
                <strong>${t==="送信"?"[送信]":"[受信]"} ${Je(n)}</strong>
                ${o?'<span class="img-preview-badge"><span class="material-symbols-outlined" style="font-size:12px;">visibility</span> プレビュー</span>':""}
                <span style="color:var(--m3-text-muted); font-size:0.75rem;">(${h})</span>
            </div>
            <span class="m3-mode-badge">
                <span class="material-symbols-outlined">${l}</span> ${a}
            </span>
        </div>
        <div class="transfer-history-actions">
            ${o?`
            <button class="m3-icon-button-sm btn-hist-preview" title="プレビューを表示" type="button">
                <span class="material-symbols-outlined" style="font-size:16px;">visibility</span>
            </button>`:""}
            <button class="m3-icon-button-sm btn-hist-copy" title="クリップボードにコピー" type="button">
                <span class="material-symbols-outlined" style="font-size:16px;">content_copy</span>
            </button>
            <button class="m3-icon-button-sm btn-hist-dl" title="ダウンロード" type="button">
                <span class="material-symbols-outlined" style="font-size:16px;">download</span>
            </button>
            <span style="color:var(--m3-text-muted); font-size:0.72rem; margin-left:0.2rem;">${d}</span>
        </div>
    `;const p=c.querySelector(".transfer-history-info");p&&o&&(p.onclick=v=>{v.stopPropagation(),$o(s,n)});const f=c.querySelector(".btn-hist-preview");f&&o&&(f.onclick=v=>{v.stopPropagation(),$o(s,n)});const b=c.querySelector(".btn-hist-copy");b&&(b.onclick=v=>{v.stopPropagation(),s?Ka(s,n):(navigator.clipboard.writeText(n),X(`ファイル名「${n}」をコピーしました`))});const m=c.querySelector(".btn-hist-dl");m&&(m.onclick=v=>{v.stopPropagation(),s?(Ya(s,n),X(`💾 「${n}」をダウンロードしました`)):X("ダウンロード可能なデータがありません")}),oo.prepend(c)}let Ze=[];const co=document.getElementById("staged-files-card"),Os=document.getElementById("staged-file-list"),Ds=document.getElementById("staged-file-count"),Wo=document.getElementById("btn-clear-staged"),jo=document.getElementById("btn-add-more-files"),Mn=document.getElementById("btn-start-send");function zr(){if(!(!co||!Os)){if(Ze.length===0){co.classList.add("hidden"),Os.innerHTML="",Ds&&(Ds.textContent="0");return}co.classList.remove("hidden"),Ds&&(Ds.textContent=Ze.length.toString()),Os.innerHTML="",Ze.forEach((n,e)=>{const t=document.createElement("li");t.className="staged-file-item";const i=(n.size/(1024*1024)).toFixed(2)+" MB";t.innerHTML=`
            <div>
                <span class="file-name">${Je(n.name)}</span>
                <span class="file-size">(${i})</span>
            </div>
            <button class="btn-remove-staged" title="削除" type="button">
                <span class="material-symbols-outlined" style="font-size:18px;">close</span>
            </button>
        `,t.querySelector(".btn-remove-staged").onclick=()=>{Ze.splice(e,1),zr()},Os.appendChild(t)})}}function kc(n){!n||n.length===0||(Array.from(n).forEach(e=>Ze.push(e)),zr(),X(`${n.length} 件のファイルを送信リストに追加しました`))}Tt&&_t&&Mo&&(Mo.onclick=n=>{n.stopPropagation(),_t.click()},Tt.onclick=()=>_t.click(),Tt.ondragover=n=>{n.preventDefault(),Tt.classList.add("dragover")},Tt.ondragleave=()=>Tt.classList.remove("dragover"),Tt.ondrop=n=>{n.preventDefault(),Tt.classList.remove("dragover"),n.dataTransfer.files&&n.dataTransfer.files.length>0&&kc(n.dataTransfer.files)},_t.onchange=()=>{_t.files&&_t.files.length>0&&(kc(_t.files),_t.value="")});jo&&(jo.onclick=()=>_t.click());Wo&&(Wo.onclick=()=>{Ze=[],zr(),X("送信リストをクリアしました")});function wr(n){[Tt,_t,Mo,Wo,jo,Mn,zo,Vo,Ho].forEach(t=>{t&&(t.tagName==="BUTTON"||t.tagName==="INPUT"?t.disabled=n:(t.style.pointerEvents=n?"none":"auto",t.style.opacity=n?"0.6":"1"))})}Mn&&(Mn.onclick=async()=>{if(Ze.length===0){X("送信するファイルを選択してください");return}if(!ce){X("送信機能が準備できていません");return}let n=null;wr(!0);try{if(Ze.length===1)n=Ze[0];else{X("複数ファイルを軽量ZIP圧縮中...");const t=new rp,i=new Map;for(let a=0;a<Ze.length;a++){const l=Ze[a];let c=l.name||`file_${a+1}`;if(i.has(c)){const d=i.get(c)+1;i.set(c,d);const p=c.lastIndexOf(".");p>0?c=`${c.substring(0,p)}_${d}${c.substring(p)}`:c=`${c}_${d}`}else i.set(c,1);const h=await l.arrayBuffer();t.file(c,h)}const s=await t.generateAsync({type:"blob",mimeType:"application/zip",compression:"DEFLATE",compressionOptions:{level:5}}),o=`FlickMemo_Files_${new Date().toISOString().slice(0,10)}.zip`;n=new File([s],o,{type:"application/zip"})}X(`「${n.name}」の送信を開始します...`);const e=await ce.sendFileP2P(n);fh(n.name,n.size,"送信",e),X(`✅ 「${n.name}」の送信が完了しました！`),Ze=[],zr()}catch(e){console.error("Send Error:",e),X("送信失敗: "+(e.message||"接続を確認してください"))}finally{wr(!1)}});const yi=document.getElementById("btn-back-transfer");function Ja(){Be="transfer",dh(),rt&&rt.classList.add("view-transfer"),mi&&mi.classList.remove("hidden"),bt&&bt.classList.add("hidden"),yi&&yi.classList.remove("hidden"),rn==null||rn.classList.remove("active"),on==null||on.classList.remove("active"),tt&&tt.classList.add("hidden"),et&&et.classList.add("hidden")}function ph(){Be="notes",rt&&rt.classList.remove("view-transfer"),yi&&yi.classList.add("hidden"),window.innerWidth<=768&&(rt!=null&&rt.classList.contains("view-editor"))?bt&&bt.classList.remove("hidden"):bt&&bt.classList.add("hidden"),rn==null||rn.classList.add("active"),on==null||on.classList.remove("active"),Gs==null||Gs.classList.remove("hidden"),Yi==null||Yi.classList.add("hidden"),qs==null||qs.classList.add("hidden"),mi&&mi.classList.add("hidden"),te==null||te.classList.remove("hidden"),me&&me.classList.remove("hidden"),Ke(Le.value),Y&&Q[Y]&&(tt&&tt.classList.remove("hidden"),et&&et.classList.remove("hidden"),Pi(!0))}fc&&(fc.onclick=()=>{Ja()});yi&&(yi.onclick=()=>{ph()});const $e=document.getElementById("custom-mode-dropdown"),Sc=document.getElementById("dropdown-trigger"),ct=document.getElementById("dropdown-menu-list"),ob=document.getElementById("selected-mode-text");Sc&&ct&&(Sc.onclick=n=>{n.stopPropagation(),!ct.classList.contains("hidden")?(ct.classList.add("hidden"),$e==null||$e.classList.remove("open")):(ct.classList.remove("hidden"),$e==null||$e.classList.add("open"))},document.addEventListener("click",()=>{ct.classList.add("hidden"),$e==null||$e.classList.remove("open")}),ct.querySelectorAll(".dropdown-menu-item").forEach(n=>{n.onclick=e=>{e.stopPropagation();const t=n.getAttribute("data-value"),i=n.querySelector(".material-symbols-outlined:not(.check-icon)"),s=i?i.textContent.trim():"bolt",r=n.querySelector(".item-title").textContent.trim();ct.querySelectorAll(".dropdown-menu-item").forEach(a=>{a.classList.remove("selected");const l=a.querySelector(".check-icon");l&&l.classList.add("hidden")}),n.classList.add("selected");const o=n.querySelector(".check-icon");o&&o.classList.remove("hidden"),ob.innerHTML=`<span class="material-symbols-outlined mode-icon">${s}</span> ${Je(r)}`,ct.classList.add("hidden"),$e==null||$e.classList.remove("open"),ce&&(ce.currentMode=t,X(`送信モードを「${r}」に変更しました`))}}));const Fs=document.getElementById("btn-target-tab-devices"),Qn=document.getElementById("btn-target-tab-room"),jt=document.getElementById("target-panel-devices"),Ht=document.getElementById("target-panel-room");Fs&&Qn&&(Fs.onclick=()=>{Fs.classList.add("active"),Qn.classList.remove("active"),jt==null||jt.classList.remove("hidden"),Ht==null||Ht.classList.add("hidden")},Qn.onclick=()=>{Qn.classList.add("active"),Fs.classList.remove("active"),Ht==null||Ht.classList.remove("hidden"),jt==null||jt.classList.add("hidden")});const Ho=document.getElementById("btn-create-room"),Tc=document.getElementById("btn-recopy-room"),Vo=document.getElementById("btn-leave-room"),Gn=document.getElementById("room-active-status"),Ac=document.getElementById("room-status-url"),qn=document.getElementById("room-create-section");let es=null;function ab(){const n=new Uint8Array(24);window.crypto.getRandomValues(n);const e=Array.from(n,i=>String.fromCharCode(i)).join("");return"rm_"+btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function lb(){const n=new Uint8Array(32);return window.crypto.getRandomValues(n),Array.from(n,e=>e.toString(16).padStart(2,"0")).join("")}function $r(n,e=null){n?(Gn==null||Gn.classList.remove("hidden"),qn==null||qn.classList.add("hidden"),es=e||`${window.location.origin}${window.location.pathname}?room=${n}`,Ac&&(Ac.textContent=es)):(Gn==null||Gn.classList.add("hidden"),qn==null||qn.classList.remove("hidden"),es=null)}function Wr(){return ce||(ce=new _y(Ge,Ai,(n,e)=>ib(n,e),(n,e,t)=>sb(n,e,t),(n,e,t,i)=>rb(n,e,t,i))),ce&&(ce.isGuestMode=un),ce}Ho&&(Ho.onclick=()=>{const n=Wr();if(!n)return;const e=ab(),t=lb();n.setCustomEncryptionKey(t),n.joinRoom(e);const i=`${window.location.origin}${window.location.pathname}?room=${e}#key=${t}`;$r(e,i),navigator.clipboard.writeText(i).then(()=>{X("🔒【E2EE暗号化】共有リンクをコピーしました！相手に送信してください")}).catch(()=>{X("共有リンクを作成しました")})});Tc&&(Tc.onclick=()=>{es&&navigator.clipboard.writeText(es).then(()=>{X("共有リンクを再コピーしました！")})});Vo&&(Vo.onclick=()=>{ce&&ce.disconnect(),$r(null),Xi(!1),X("共有リンクを停止しました")});function cb(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;un=!0;let t=null;if(window.location.hash){const s=window.location.hash.substring(1);t=new URLSearchParams(s).get("key")||s.replace(/^key=/,"")}const i=Wr();return t&&i.setCustomEncryptionKey(t),i.isGuestMode=!0,js==null||js.classList.add("hidden"),nn==null||nn.classList.add("hidden"),sn==null||sn.classList.remove("hidden"),Ja(),Qn&&Qn.click(),i.joinRoom(e),$r(e,window.location.href),X("共有リンクに自動接続しました！相手の接続を待機中..."),!0}cb();rn.onclick=ph;on.onclick=()=>{Be="trash",rt&&rt.classList.remove("view-transfer"),on.classList.add("active"),rn.classList.remove("active"),Gs.classList.add("hidden"),Yi.classList.remove("hidden"),qs.classList.remove("hidden"),mi&&mi.classList.add("hidden"),te.classList.remove("hidden"),me&&me.classList.remove("hidden"),Ke(Le.value),Y&&Q[Y]&&(tt&&tt.classList.remove("hidden"),et&&et.classList.remove("hidden"),Pi(!0))};Ki.onclick=()=>{if(!Y||!Q[Y]||!Q[Y].id)return;const n=!Q[Y].pinned;Q[Y].pinned=n,Ki.classList.toggle("active",n),Bt(Q[Y]),Ke(Le.value),Xe("saving","保存中..."),Es(Y,{pinned:n,updatedAt:Date.now()}),X(n?"メモをピン留めしました":"ピン留めを解除しました")};Ty.onclick=()=>{te.value&&(navigator.clipboard.writeText(te.value),X("全文をコピーしました"))};function Qa(){if(et.textContent=`${te.value.length} 文字`,Y&&Q[Y]){const n=Q[Y].updatedAt||Date.now();tt.textContent=ih(n)}}bt.onclick=()=>{Mt&&Y&&$n(Y),Ni(),rt.classList.remove("view-editor"),bt.classList.add("hidden")};window.addEventListener("keydown",n=>{((n.ctrlKey||n.metaKey)&&n.key.toLowerCase()==="f"||n.key==="/"&&document.activeElement!==te&&document.activeElement!==me&&document.activeElement!==Le)&&(n.preventDefault(),Le.focus(),Le.select())});function Xa(){if(!Y||!Q[Y])return;const n=te.value;Yy(n),eh(Y,{body:n})}te.oninput=Xa;te.addEventListener("paste",()=>{setTimeout(()=>{Xa(),Pi(!0)},50)});te.onblur=()=>{Pi()};Le.oninput=()=>Ke(Le.value);function jr(n=!0){Mt&&Y&&$n(Y),Ni();const e="note_"+Date.now();Q[e]={id:e,title:"",body:"",pinned:!1,codeCollapsed:{},updatedAt:Date.now()},Bt(Q[e]),Dn(e,n),Xe("saving","新規作成中..."),Ha(Q[e])}document.getElementById("btn-new").onclick=()=>jr(!0);window.addEventListener("keydown",n=>{(n.ctrlKey||n.metaKey)&&n.key.toLowerCase()==="n"&&(n.preventDefault(),Be==="notes"&&jr(!0))});My.onclick=()=>Tn.classList.add("hidden");Uy.onclick=()=>{Tn.classList.add("hidden"),bd(Ge)};document.querySelectorAll(".settings-tab-btn").forEach(n=>{n.onclick=()=>{document.querySelectorAll(".settings-tab-btn").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".tab-content").forEach(t=>t.classList.add("hidden")),n.classList.add("active");const e=n.getAttribute("data-tab");document.getElementById(`tab-content-${e}`).classList.remove("hidden")}});function db(){var t;const n=window.location.protocol==="chrome-extension:"||typeof chrome<"u"&&((t=chrome==null?void 0:chrome.runtime)==null?void 0:t.id)&&!window.location.protocol.startsWith("http"),e=document.getElementById("setting-extension-guide-box");e&&(n?e.classList.add("hidden"):e.classList.remove("hidden"))}By.onclick=()=>{Vy(),db();const n=document.querySelector('.settings-nav .settings-tab-btn[data-tab="account"]'),e=document.querySelector('.settings-nav .settings-tab-btn[data-tab="system"]'),t=document.getElementById("settings-account-label"),i=document.getElementById("settings-account-desc"),s=document.getElementById("btn-settings-logout-action"),r=document.getElementById("btn-settings-switch-action");un?(t&&(t.textContent="Googleアカウントログイン"),i&&(i.textContent="ログインするとメモの同期やファイル送信機能が有効になります"),s&&s.classList.add("hidden"),r&&(r.classList.remove("hidden"),r.innerHTML='<span class="material-symbols-outlined" style="font-size:16px;">login</span> ログイン',r.onclick=()=>Er(new We)),e&&e.classList.add("hidden"),n&&n.click()):(t&&(t.textContent="アカウント管理"),i&&(i.textContent="別のアカウントへの切り替えまたはサインアウト"),s&&(s.classList.remove("hidden"),s.onclick=()=>{Tn.classList.remove("hidden")}),r&&(r.classList.remove("hidden"),r.innerHTML='<span class="material-symbols-outlined" style="font-size:16px;">sync_alt</span> 切り替え',r.onclick=()=>Er(new We)),e&&e.classList.remove("hidden")),mt.classList.remove("hidden")};zy.onclick=()=>mt.classList.add("hidden");yc&&(yc.onclick=()=>{mt.classList.add("hidden"),un=!1,ce&&(ce.isGuestMode=!1),nn.classList.remove("hidden"),sn.classList.add("hidden"),kn.classList.add("hidden"),Sn.classList.remove("hidden")});jy.onclick=()=>{mt.classList.add("hidden"),Tn.classList.remove("hidden")};pc&&(pc.onclick=async()=>{var n,e;mt.classList.add("hidden");try{if(typeof chrome<"u"&&((n=chrome==null?void 0:chrome.identity)!=null&&n.removeCachedAuthToken)&&((e=chrome==null?void 0:chrome.identity)!=null&&e.getAuthToken)&&!/edg/i.test(navigator.userAgent))try{await new Promise(t=>{chrome.identity.getAuthToken({interactive:!1},i=>{if(chrome.runtime.lastError||!i){t();return}chrome.identity.removeCachedAuthToken({token:i},()=>{t()})})})}catch{}await bd(Ge),X("アカウントを切替中... Googleログイン画面を開きます"),setTimeout(()=>{const t=new We;t.setCustomParameters({prompt:"select_account"}),Er(t)},300)}catch(t){console.error("Account switch error:",t),X("切り替え準備に失敗しました: "+(t.message||""))}});async function ub(){try{const n=await fetch(`./version.json?nocache=${Date.now()}`,{cache:"no-store",headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache"}});if(n.ok){const e=await n.json();e.version&&e.version!==Oo&&(console.log(`[Version Check] New version detected: v${e.version} (current: v${Oo})`),X(`新しいバージョン (v${e.version}) が利用可能です！【設定】から【更新を確認】を押してください`))}}catch{}}window.addEventListener("DOMContentLoaded",()=>{setTimeout(ub,2500)});$y.onclick=async()=>{Xe("saving","最新コード取得＆キャッシュ完全消去中..."),X("最新コードを取得するため全キャッシュを完全破棄中...");let n="最新";try{const e=await fetch(`./version.json?force_reload=${Date.now()}`,{cache:"no-store",headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache"}});if(e.ok){const t=await e.json();t.version&&(n=`v${t.version}`)}}catch{}try{if("serviceWorker"in navigator){const e=await navigator.serviceWorker.getRegistrations();for(let t of e)await t.unregister()}if("caches"in window){const e=await caches.keys();await Promise.all(e.map(t=>caches.delete(t)))}localStorage.removeItem("flickmemo_version_cache"),sessionStorage.clear()}catch(e){console.error("Cache purge error:",e)}X(`最新コード (${n}) を適用して再読み込み中...`),setTimeout(()=>{const e=new URL(window.location.origin+window.location.pathname);e.searchParams.set("v",Date.now()),e.searchParams.set("hard_reload","true"),window.location.href=e.toString()},400)};const xc=document.getElementById("btn-dev-copy-all"),Rc=document.getElementById("btn-dev-clear-logs");xc&&(xc.onclick=()=>{if(Et.length===0){X("コピーするコンソールログがありません");return}const n=Et.map(e=>`[${e.time}] [${e.level.toUpperCase()}] ${e.message}`).join(`

`);navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(n).then(()=>{X(`コンソール全体をコピーしました (${Et.length}件)`)}).catch(()=>{Pc(n)}):Pc(n)});function Pc(n){const e=document.createElement("textarea");e.value=n,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();try{document.execCommand("copy"),X(`コンソール全体をコピーしました (${Et.length}件)`)}catch{X("コピーに失敗しました")}document.body.removeChild(e)}Rc&&(Rc.onclick=()=>{Et.length=0,ja(),X("コンソールログをクリアしました")});document.querySelectorAll(".dev-filter-btn").forEach(n=>{n.onclick=()=>{document.querySelectorAll(".dev-filter-btn").forEach(e=>e.classList.remove("active")),n.classList.add("active"),zi=n.getAttribute("data-filter")||"all",ja()}});Do&&(Do.onclick=()=>{const n=(Vs==null?void 0:Vs.textContent)||"同期完了";X(`ステータス: ${n}`)});gm(Ge).then(n=>{n&&n.user&&console.log("Redirect login successful:",n.user.email)}).catch(n=>{console.error("Redirect Result Error:",n)});async function mh(n){if(!(!n||n.type!=="FLICKMEMO_AUTH_SUCCESS"))try{const{googleIdToken:e,googleAccessToken:t}=n;if(e||t){const i=We.credential(e,t);await Bs(Ge,Wi),await yd(Ge,i),X("Googleアカウントでログインしました")}}catch(e){console.error("signInWithCredential from auth error:",e),X("ログイン処理に失敗しました: "+(e.message||"")),kn==null||kn.classList.add("hidden"),Sn==null||Sn.classList.remove("hidden")}}window.addEventListener("message",n=>{n.data&&n.data.type==="FLICKMEMO_AUTH_SUCCESS"&&mh(n.data)});var Lc;typeof chrome<"u"&&((Lc=chrome==null?void 0:chrome.runtime)!=null&&Lc.onMessage)&&chrome.runtime.onMessage.addListener(n=>{n&&n.type==="FLICKMEMO_AUTH_SUCCESS"&&mh(n)});async function Er(n){var e,t,i,s,r;try{kn.classList.remove("hidden"),Sn.classList.add("hidden"),n||(n=new We),n.setCustomParameters({prompt:"select_account"});const o=navigator.userAgent,a=/iPad|iPhone|iPod/.test(o)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,l=window.navigator.standalone||window.matchMedia("(display-mode: standalone)").matches,c=/edg/i.test(o);if(typeof chrome<"u"&&!!((e=chrome==null?void 0:chrome.runtime)!=null&&e.id)&&!window.location.protocol.startsWith("http")){if(!c&&((t=chrome==null?void 0:chrome.identity)!=null&&t.getAuthToken))try{await new Promise((y,_)=>{chrome.identity.getAuthToken({interactive:!1},w=>{const k=()=>{chrome.identity.getAuthToken({interactive:!0},async I=>{var T;if(chrome.runtime.lastError||!I){const A=((T=chrome.runtime.lastError)==null?void 0:T.message)||"Googleトークンの取得に失敗しました";_(new Error(A));return}try{const A=We.credential(null,I);await Bs(Ge,Wi),await yd(Ge,A),y()}catch(A){(A.code==="auth/invalid-credential"||A.code==="auth/user-token-expired")&&chrome.identity.removeCachedAuthToken({token:I},()=>{}),_(A)}})};w?chrome.identity.removeCachedAuthToken({token:w},k):k()})});return}catch(y){console.warn("chrome.identity.getAuthToken fallback to web popup:",y)}const d="https://flickmemo-qwe.web.app/auth.html",p=500,f=620,b=Math.max(0,Math.round((window.screen.width-p)/2)),m=Math.max(0,Math.round((window.screen.height-f)/2));if(!window.open(d,"flickmemo_auth",`width=${p},height=${f},top=${m},left=${b},menubar=no,toolbar=no,location=yes,status=no`))if((i=chrome==null?void 0:chrome.tabs)!=null&&i.create)chrome.tabs.create({url:d}),X("認証タブを開きました。ログインを完了してください");else throw new Error("認証ウィンドウがブロックされました。ポップアップを許可してください。");return}else if(a||l)await Bs(Ge,Wi),await El(Ge,n);else{try{await Bs(Ge,Wi)}catch(d){console.warn("Persistence set warning:",d)}try{await cm(Ge,n)}catch(d){if(d.code==="auth/popup-blocked"||d.code==="auth/operation-not-supported-in-this-environment")console.warn("Popup blocked. Falling back to signInWithRedirect..."),await El(Ge,n);else throw d}}}catch(o){console.error("Login Error:",o);let a=o.message||"認証に失敗しました";o.code==="auth/popup-closed-by-user"?a="ログイン画面が閉じられました。":o.code==="auth/popup-blocked"?a="ポップアップがブラウザにブロックされました。":o.code==="auth/unauthorized-domain"?a="Firebase Console の「Authentication > 設定 > 承認済みドメイン」をご確認ください。":((s=o.message)!=null&&s.includes("OAuth2 not granted or revoked")||(r=o.message)!=null&&r.includes("Not granted"))&&(a="Googleアカウントへのアクセスが拒否されました。Chromeにログイン中のGoogleアカウントを確認してください。"),alert("ログインに失敗しました: "+a),kn.classList.add("hidden"),Sn.classList.remove("hidden")}}const Nc=document.getElementById("btn-guest-login");Nc&&(Nc.onclick=()=>{un=!0;const n=Wr();n&&(n.isGuestMode=!0),nn.classList.add("hidden"),sn.classList.remove("hidden"),Uo.textContent="ゲストユーザー",Bo.textContent="ログインしていません (ローカル保存のみ)",Kn.src=Ks("Guest"),Jn&&(Jn.textContent="ゲスト"),X("ゲストモード (ローカルメモ / 共有リンク送受信)"),rh()});const Cn=document.getElementById("toggle-e2ee"),In=document.getElementById("toggle-session-e2ee");function gh(n,e){ce&&(ce.isE2EEEnabled=n),Cn&&e!==Cn&&(Cn.checked=n),In&&e!==In&&(In.checked=n),X(n?"AES-256 E2EE暗号化を有効にしました":"E2EE暗号化をオフにしました")}Cn&&(Cn.onchange=()=>gh(Cn.checked,Cn));In&&(In.onchange=()=>gh(In.checked,In));document.getElementById("btn-google").onclick=()=>Er(new We);Hp(Ge,async n=>{var t;js.classList.add("hidden");const e=new URLSearchParams(window.location.search).has("room");if(n){un=!1,ce&&(ce.isGuestMode=!1),at!==null&&at!==n.uid&&await _c(),at=n.uid,nn.classList.add("hidden"),sn.classList.remove("hidden");const i=n.displayName||((t=n.email)==null?void 0:t.split("@")[0])||"ユーザー",s=n.email||"メールアドレス非公開";Uo.textContent=i,Bo.textContent=s,Kn.onerror=()=>{Kn.src=Ks(i)},n.photoURL?Kn.src=n.photoURL:Kn.src=Ks(i),Jn&&(Jn.textContent="Google"),fn&&No(fn),fn=ve(Ai,`users/${n.uid}/notes`),$t(fn,o=>{try{const a=o.val()||{};let l=!1;Object.keys(Q).forEach(h=>{a[h]||(delete Q[h],Cs(h),l=!0,Y===h&&(Y=null,me.value="",te.value="",te.disabled=!0,me.disabled=!0,Ri.classList.add("hidden"),me.classList.add("hidden"),et.classList.add("hidden"),tt.classList.add("hidden"),ke.classList.add("hidden")))});let c=!1;if(Object.values(a).forEach(h=>{const d=Q[h.id];(!d||(h.updatedAt||0)>=(d.updatedAt||0))&&(!d||JSON.stringify(d)!==JSON.stringify(h))&&(Q[h.id]=h,Bt(h),l=!0,Y===h.id&&(c=!0))}),oh(),l&&Ke(Le.value),Jy(),Y&&Q[Y])c&&Dn(Y,!1,!0);else if(!(window.innerWidth<=768)){const d=Object.values(Q).filter(p=>!p.deletedAt).sort((p,f)=>(f.updatedAt||0)-(p.updatedAt||0));d.length>0&&Dn(d[0].id,!1,!0)}Xe("synced","クラウド同期完了"),th()}catch(a){console.error("onValue processing error:",a),Xe("synced","同期処理中にエラーが発生しました")}},o=>{console.error("Sync Error:",o),Xe("offline","同期オフライン")}),Wr().startDevicePresence()}else ce&&ce.stopDevicePresence(),await _c(),fn&&(No(fn),fn=null),at=null,e?(un=!0,ce&&(ce.isGuestMode=!0),nn.classList.add("hidden"),sn.classList.remove("hidden"),Uo.textContent="ゲストユーザー",Bo.textContent="ログインしていません (共有リンク送受信)",Kn.src=Ks("Guest"),Jn&&(Jn.textContent="ゲスト")):(nn.classList.remove("hidden"),sn.classList.add("hidden"),kn.classList.add("hidden"),Sn.classList.remove("hidden"))});function _h(){Ni(),Y&&Mt&&$n(Y)}function vh(){Fn.forEach(n=>{try{URL.revokeObjectURL(n)}catch{}}),Fn.clear(),ce&&(ce.stopDevicePresence(),ce.resetReceiveBuffer()),Ze=[],_h()}window.addEventListener("beforeunload",vh);window.addEventListener("pagehide",n=>{n.persisted||vh()});document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?_h():document.visibilityState==="visible"&&th()});
