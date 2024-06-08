import{_getProvider as t,getApp as e,_registerComponent as n,registerVersion as a}from"@firebase/app";import{Component as o}from"@firebase/component";import{ErrorFactory as r,FirebaseError as i}from"@firebase/util";import{openDB as s}from"idb";const c="@firebase/installations";const u="0.6.7";
/**
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
 */const l=1e4;const f=`w:${u}`;const d="FIS_v2";const g="https://firebaseinstallations.googleapis.com/v1";const p=36e5;const h="installations";const m="Installations";
/**
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
 */const w={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."};const I=new r(h,m,w);function isServerError(t){return t instanceof i&&t.code.includes("request-failed")}
/**
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
 */function getInstallationsEndpoint({projectId:t}){return`${g}/projects/${t}/installations`}function extractAuthTokenInfoFromResponse(t){return{token:t.token,requestStatus:2,expiresIn:getExpiresInFromResponseExpiresIn(t.expiresIn),creationTime:Date.now()}}async function getErrorFromResponse(t,e){const n=await e.json();const a=n.error;return I.create("request-failed",{requestName:t,serverCode:a.code,serverMessage:a.message,serverStatus:a.status})}function getHeaders({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function getHeadersWithAuth(t,{refreshToken:e}){const n=getHeaders(t);n.append("Authorization",getAuthorizationHeader(e));return n}async function retryIfServerError(t){const e=await t();return e.status>=500&&e.status<600?t():e}function getExpiresInFromResponseExpiresIn(t){return Number(t.replace("s","000"))}function getAuthorizationHeader(t){return`${d} ${t}`}
/**
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
 */async function createInstallationRequest({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const a=getInstallationsEndpoint(t);const o=getHeaders(t);const r=e.getImmediate({optional:true});if(r){const t=await r.getHeartbeatsHeader();t&&o.append("x-firebase-client",t)}const i={fid:n,authVersion:d,appId:t.appId,sdkVersion:f};const s={method:"POST",headers:o,body:JSON.stringify(i)};const c=await retryIfServerError((()=>fetch(a,s)));if(c.ok){const t=await c.json();const e={fid:t.fid||n,registrationStatus:2,refreshToken:t.refreshToken,authToken:extractAuthTokenInfoFromResponse(t.authToken)};return e}throw await getErrorFromResponse("Create Installation",c)}
/**
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
 */function sleep(t){return new Promise((e=>{setTimeout(e,t)}))}
/**
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
 */function bufferToBase64UrlSafe(t){const e=btoa(String.fromCharCode(...t));return e.replace(/\+/g,"-").replace(/\//g,"_")}
/**
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
 */const y=/^[cdef][\w-]{21}$/;const T="";function generateFid(){try{const t=new Uint8Array(17);const e=self.crypto||self.msCrypto;e.getRandomValues(t);t[0]=112+t[0]%16;const n=encode(t);return y.test(n)?n:T}catch(t){return T}}function encode(t){const e=bufferToBase64UrlSafe(t);return e.substr(0,22)}
/**
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
 */function getKey(t){return`${t.appName}!${t.appId}`}
/**
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
 */const k=new Map;function fidChanged(t,e){const n=getKey(t);callFidChangeCallbacks(n,e);broadcastFidChange(n,e)}function addCallback(t,e){getBroadcastChannel();const n=getKey(t);let a=k.get(n);if(!a){a=new Set;k.set(n,a)}a.add(e)}function removeCallback(t,e){const n=getKey(t);const a=k.get(n);if(a){a.delete(e);a.size===0&&k.delete(n);closeBroadcastChannel()}}function callFidChangeCallbacks(t,e){const n=k.get(t);if(n)for(const t of n)t(e)}function broadcastFidChange(t,e){const n=getBroadcastChannel();n&&n.postMessage({key:t,fid:e});closeBroadcastChannel()}let C=null;function getBroadcastChannel(){if(!C&&"BroadcastChannel"in self){C=new BroadcastChannel("[Firebase] FID Change");C.onmessage=t=>{callFidChangeCallbacks(t.data.key,t.data.fid)}}return C}function closeBroadcastChannel(){if(k.size===0&&C){C.close();C=null}}
/**
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
 */const E="firebase-installations-database";const b=1;const S="firebase-installations-store";let v=null;function getDbPromise(){v||(v=s(E,b,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(S)}}}));return v}async function set(t,e){const n=getKey(t);const a=await getDbPromise();const o=a.transaction(S,"readwrite");const r=o.objectStore(S);const i=await r.get(n);await r.put(e,n);await o.done;i&&i.fid===e.fid||fidChanged(t,e.fid);return e}async function remove(t){const e=getKey(t);const n=await getDbPromise();const a=n.transaction(S,"readwrite");await a.objectStore(S).delete(e);await a.done}async function update(t,e){const n=getKey(t);const a=await getDbPromise();const o=a.transaction(S,"readwrite");const r=o.objectStore(S);const i=await r.get(n);const s=e(i);s===void 0?await r.delete(n):await r.put(s,n);await o.done;!s||i&&i.fid===s.fid||fidChanged(t,s.fid);return s}
/**
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
 */async function getInstallationEntry(t){let e;const n=await update(t.appConfig,(n=>{const a=updateOrCreateInstallationEntry(n);const o=triggerRegistrationIfNecessary(t,a);e=o.registrationPromise;return o.installationEntry}));return n.fid===T?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function updateOrCreateInstallationEntry(t){const e=t||{fid:generateFid(),registrationStatus:0};return clearTimedOutRequest(e)}function triggerRegistrationIfNecessary(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const t=Promise.reject(I.create("app-offline"));return{installationEntry:e,registrationPromise:t}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()};const a=registerInstallation(t,n);return{installationEntry:n,registrationPromise:a}}return e.registrationStatus===1?{installationEntry:e,registrationPromise:waitUntilFidRegistration(t)}:{installationEntry:e}}async function registerInstallation(t,e){try{const n=await createInstallationRequest(t,e);return set(t.appConfig,n)}catch(n){isServerError(n)&&n.customData.serverCode===409?await remove(t.appConfig):await set(t.appConfig,{fid:e.fid,registrationStatus:0});throw n}}async function waitUntilFidRegistration(t){let e=await updateInstallationRequest(t.appConfig);while(e.registrationStatus===1){await sleep(100);e=await updateInstallationRequest(t.appConfig)}if(e.registrationStatus===0){const{installationEntry:e,registrationPromise:n}=await getInstallationEntry(t);return n||e}return e}function updateInstallationRequest(t){return update(t,(t=>{if(!t)throw I.create("installation-not-found");return clearTimedOutRequest(t)}))}function clearTimedOutRequest(t){return hasInstallationRequestTimedOut(t)?{fid:t.fid,registrationStatus:0}:t}function hasInstallationRequestTimedOut(t){return t.registrationStatus===1&&t.registrationTime+l<Date.now()}
/**
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
 */async function generateAuthTokenRequest({appConfig:t,heartbeatServiceProvider:e},n){const a=getGenerateAuthTokenEndpoint(t,n);const o=getHeadersWithAuth(t,n);const r=e.getImmediate({optional:true});if(r){const t=await r.getHeartbeatsHeader();t&&o.append("x-firebase-client",t)}const i={installation:{sdkVersion:f,appId:t.appId}};const s={method:"POST",headers:o,body:JSON.stringify(i)};const c=await retryIfServerError((()=>fetch(a,s)));if(c.ok){const t=await c.json();const e=extractAuthTokenInfoFromResponse(t);return e}throw await getErrorFromResponse("Generate Auth Token",c)}function getGenerateAuthTokenEndpoint(t,{fid:e}){return`${getInstallationsEndpoint(t)}/${e}/authTokens:generate`}
/**
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
 */async function refreshAuthToken(t,e=false){let n;const a=await update(t.appConfig,(a=>{if(!isEntryRegistered(a))throw I.create("not-registered");const o=a.authToken;if(!e&&isAuthTokenValid(o))return a;if(o.requestStatus===1){n=waitUntilAuthTokenRequest(t,e);return a}{if(!navigator.onLine)throw I.create("app-offline");const e=makeAuthTokenRequestInProgressEntry(a);n=fetchAuthTokenFromServer(t,e);return e}}));const o=n?await n:a.authToken;return o}async function waitUntilAuthTokenRequest(t,e){let n=await updateAuthTokenRequest(t.appConfig);while(n.authToken.requestStatus===1){await sleep(100);n=await updateAuthTokenRequest(t.appConfig)}const a=n.authToken;return a.requestStatus===0?refreshAuthToken(t,e):a}function updateAuthTokenRequest(t){return update(t,(t=>{if(!isEntryRegistered(t))throw I.create("not-registered");const e=t.authToken;return hasAuthTokenRequestTimedOut(e)?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t}))}async function fetchAuthTokenFromServer(t,e){try{const n=await generateAuthTokenRequest(t,e);const a=Object.assign(Object.assign({},e),{authToken:n});await set(t.appConfig,a);return n}catch(n){if(!isServerError(n)||n.customData.serverCode!==401&&n.customData.serverCode!==404){const n=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await set(t.appConfig,n)}else await remove(t.appConfig);throw n}}function isEntryRegistered(t){return t!==void 0&&t.registrationStatus===2}function isAuthTokenValid(t){return t.requestStatus===2&&!isAuthTokenExpired(t)}function isAuthTokenExpired(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+p}function makeAuthTokenRequestInProgressEntry(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function hasAuthTokenRequestTimedOut(t){return t.requestStatus===1&&t.requestTime+l<Date.now()}
/**
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
 */
/**
 * Creates a Firebase Installation if there isn't one for the app and
 * returns the Installation ID.
 * @param installations - The `Installations` instance.
 *
 * @public
 */async function getId(t){const e=t;const{installationEntry:n,registrationPromise:a}=await getInstallationEntry(e);a?a.catch(console.error):refreshAuthToken(e).catch(console.error);return n.fid}
/**
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
 */
/**
 * Returns a Firebase Installations auth token, identifying the current
 * Firebase Installation.
 * @param installations - The `Installations` instance.
 * @param forceRefresh - Force refresh regardless of token expiration.
 *
 * @public
 */async function getToken(t,e=false){const n=t;await completeInstallationRegistration(n);const a=await refreshAuthToken(n,e);return a.token}async function completeInstallationRegistration(t){const{registrationPromise:e}=await getInstallationEntry(t);e&&await e}
/**
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
 */async function deleteInstallationRequest(t,e){const n=getDeleteEndpoint(t,e);const a=getHeadersWithAuth(t,e);const o={method:"DELETE",headers:a};const r=await retryIfServerError((()=>fetch(n,o)));if(!r.ok)throw await getErrorFromResponse("Delete Installation",r)}function getDeleteEndpoint(t,{fid:e}){return`${getInstallationsEndpoint(t)}/${e}`}
/**
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
 */
/**
 * Deletes the Firebase Installation and all associated data.
 * @param installations - The `Installations` instance.
 *
 * @public
 */async function deleteInstallations(t){const{appConfig:e}=t;const n=await update(e,(t=>{if(!t||t.registrationStatus!==0)return t}));if(n){if(n.registrationStatus===1)throw I.create("delete-pending-registration");if(n.registrationStatus===2){if(!navigator.onLine)throw I.create("app-offline");await deleteInstallationRequest(e,n);await remove(e)}}}
/**
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
 */
/**
 * Sets a new callback that will get called when Installation ID changes.
 * Returns an unsubscribe function that will remove the callback when called.
 * @param installations - The `Installations` instance.
 * @param callback - The callback function that is invoked when FID changes.
 * @returns A function that can be called to unsubscribe.
 *
 * @public
 */function onIdChange(t,e){const{appConfig:n}=t;addCallback(n,e);return()=>{removeCallback(n,e)}}
/**
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
 */
/**
 * Returns an instance of {@link Installations} associated with the given
 * {@link @firebase/app#FirebaseApp} instance.
 * @param app - The {@link @firebase/app#FirebaseApp} instance.
 *
 * @public
 */function getInstallations(n=e()){const a=t(n,"installations").getImmediate();return a}
/**
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
 */function extractAppConfig(t){if(!t||!t.options)throw getMissingValueError("App Configuration");if(!t.name)throw getMissingValueError("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw getMissingValueError(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function getMissingValueError(t){return I.create("missing-app-config-values",{valueName:t})}
/**
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
 */const R="installations";const q="installations-internal";const publicFactory=e=>{const n=e.getProvider("app").getImmediate();const a=extractAppConfig(n);const o=t(n,"heartbeat");const r={app:n,appConfig:a,heartbeatServiceProvider:o,_delete:()=>Promise.resolve()};return r};const internalFactory=e=>{const n=e.getProvider("app").getImmediate();const a=t(n,R).getImmediate();const o={getId:()=>getId(a),getToken:t=>getToken(a,t)};return o};function registerInstallations(){n(new o(R,publicFactory,"PUBLIC"));n(new o(q,internalFactory,"PRIVATE"))}registerInstallations();a(c,u);a(c,u,"esm2017");export{deleteInstallations,getId,getInstallations,getToken,onIdChange};

