import"@firebase/installations";import{Component as e}from"@firebase/component";import{openDB as t,deleteDB as n}from"idb";import{ErrorFactory as o,validateIndexedDBOpenable as i,isIndexedDBAvailable as a,areCookiesEnabled as r,getModularInstance as s}from"@firebase/util";import{_registerComponent as c,registerVersion as d,_getProvider as p,getApp as g}from"@firebase/app";
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
 */const u="/firebase-messaging-sw.js";const l="/firebase-cloud-messaging-push-scope";const f="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4";const w="https://fcmregistrations.googleapis.com/v1";const b="google.c.a.c_id";const h="google.c.a.c_l";const y="google.c.a.ts";const m="google.c.a.e";var v;(function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE";e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(v||(v={}));
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var k;(function(e){e.PUSH_RECEIVED="push-received";e.NOTIFICATION_CLICKED="notification-clicked"})(k||(k={}));
/**
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
 */function arrayToBase64(e){const t=new Uint8Array(e);const n=btoa(String.fromCharCode(...t));return n.replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function base64ToArray(e){const t="=".repeat((4-e.length%4)%4);const n=(e+t).replace(/\-/g,"+").replace(/_/g,"/");const o=atob(n);const i=new Uint8Array(o.length);for(let e=0;e<o.length;++e)i[e]=o.charCodeAt(e);return i}
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
 */const T="fcm_token_details_db";const S=5;const I="fcm_token_object_Store";async function migrateOldDatabase(e){if("databases"in indexedDB){const e=await indexedDB.databases();const t=e.map((e=>e.name));if(!t.includes(T))return null}let o=null;const i=await t(T,S,{upgrade:async(t,n,i,a)=>{var r;if(n<2)return;if(!t.objectStoreNames.contains(I))return;const s=a.objectStore(I);const c=await s.index("fcmSenderId").get(e);await s.clear();if(c)if(n===2){const e=c;if(!e.auth||!e.p256dh||!e.endpoint)return;o={token:e.fcmToken,createTime:(r=e.createTime)!==null&&r!==void 0?r:Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:typeof e.vapidKey==="string"?e.vapidKey:arrayToBase64(e.vapidKey)}}}else if(n===3){const e=c;o={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:arrayToBase64(e.auth),p256dh:arrayToBase64(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:arrayToBase64(e.vapidKey)}}}else if(n===4){const e=c;o={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:arrayToBase64(e.auth),p256dh:arrayToBase64(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:arrayToBase64(e.vapidKey)}}}}});i.close();await n(T);await n("fcm_vapid_details_db");await n("undefined");return checkTokenDetails(o)?o:null}function checkTokenDetails(e){if(!e||!e.subscriptionOptions)return false;const{subscriptionOptions:t}=e;return typeof e.createTime==="number"&&e.createTime>0&&typeof e.token==="string"&&e.token.length>0&&typeof t.auth==="string"&&t.auth.length>0&&typeof t.p256dh==="string"&&t.p256dh.length>0&&typeof t.endpoint==="string"&&t.endpoint.length>0&&typeof t.swScope==="string"&&t.swScope.length>0&&typeof t.vapidKey==="string"&&t.vapidKey.length>0}
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
 */const D="firebase-messaging-database";const M=1;const K="firebase-messaging-store";let P=null;function getDbPromise(){P||(P=t(D,M,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(K)}}}));return P}async function dbGet(e){const t=getKey(e);const n=await getDbPromise();const o=await n.transaction(K).objectStore(K).get(t);if(o)return o;{const t=await migrateOldDatabase(e.appConfig.senderId);if(t){await dbSet(e,t);return t}}}async function dbSet(e,t){const n=getKey(e);const o=await getDbPromise();const i=o.transaction(K,"readwrite");await i.objectStore(K).put(t,n);await i.done;return t}async function dbRemove(e){const t=getKey(e);const n=await getDbPromise();const o=n.transaction(K,"readwrite");await o.objectStore(K).delete(t);await o.done}function getKey({appConfig:e}){return e.appId}
/**
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
 */const E={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."};const O=new o("messaging","Messaging",E);
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
 */async function requestGetToken(e,t){const n=await getHeaders(e);const o=getBody(t);const i={method:"POST",headers:n,body:JSON.stringify(o)};let a;try{const t=await fetch(getEndpoint(e.appConfig),i);a=await t.json()}catch(e){throw O.create("token-subscribe-failed",{errorInfo:e===null||e===void 0?void 0:e.toString()})}if(a.error){const e=a.error.message;throw O.create("token-subscribe-failed",{errorInfo:e})}if(!a.token)throw O.create("token-subscribe-no-token");return a.token}async function requestUpdateToken(e,t){const n=await getHeaders(e);const o=getBody(t.subscriptionOptions);const i={method:"PATCH",headers:n,body:JSON.stringify(o)};let a;try{const n=await fetch(`${getEndpoint(e.appConfig)}/${t.token}`,i);a=await n.json()}catch(e){throw O.create("token-update-failed",{errorInfo:e===null||e===void 0?void 0:e.toString()})}if(a.error){const e=a.error.message;throw O.create("token-update-failed",{errorInfo:e})}if(!a.token)throw O.create("token-update-no-token");return a.token}async function requestDeleteToken(e,t){const n=await getHeaders(e);const o={method:"DELETE",headers:n};try{const n=await fetch(`${getEndpoint(e.appConfig)}/${t}`,o);const i=await n.json();if(i.error){const e=i.error.message;throw O.create("token-unsubscribe-failed",{errorInfo:e})}}catch(e){throw O.create("token-unsubscribe-failed",{errorInfo:e===null||e===void 0?void 0:e.toString()})}}function getEndpoint({projectId:e}){return`${w}/projects/${e}/registrations`}async function getHeaders({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function getBody({p256dh:e,auth:t,endpoint:n,vapidKey:o}){const i={web:{endpoint:n,auth:t,p256dh:e}};o!==f&&(i.web.applicationPubKey=o);return i}
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
 */const _=6048e5;async function getTokenInternal(e){const t=await getPushSubscription(e.swRegistration,e.vapidKey);const n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:arrayToBase64(t.getKey("auth")),p256dh:arrayToBase64(t.getKey("p256dh"))};const o=await dbGet(e.firebaseDependencies);if(o){if(isTokenValid(o.subscriptionOptions,n))return Date.now()>=o.createTime+_?updateToken(e,{token:o.token,createTime:Date.now(),subscriptionOptions:n}):o.token;try{await requestDeleteToken(e.firebaseDependencies,o.token)}catch(e){console.warn(e)}return getNewToken(e.firebaseDependencies,n)}return getNewToken(e.firebaseDependencies,n)}async function deleteTokenInternal(e){const t=await dbGet(e.firebaseDependencies);if(t){await requestDeleteToken(e.firebaseDependencies,t.token);await dbRemove(e.firebaseDependencies)}const n=await e.swRegistration.pushManager.getSubscription();return!n||n.unsubscribe()}async function updateToken(e,t){try{const n=await requestUpdateToken(e.firebaseDependencies,t);const o=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});await dbSet(e.firebaseDependencies,o);return n}catch(e){throw e}}async function getNewToken(e,t){const n=await requestGetToken(e,t);const o={token:n,createTime:Date.now(),subscriptionOptions:t};await dbSet(e,o);return o.token}async function getPushSubscription(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:base64ToArray(t)})}function isTokenValid(e,t){const n=t.vapidKey===e.vapidKey;const o=t.endpoint===e.endpoint;const i=t.auth===e.auth;const a=t.p256dh===e.p256dh;return n&&o&&i&&a}
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
 */function externalizePayload(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};propagateNotificationPayload(t,e);propagateDataPayload(t,e);propagateFcmOptions(t,e);return t}function propagateNotificationPayload(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;!n||(e.notification.title=n);const o=t.notification.body;!o||(e.notification.body=o);const i=t.notification.image;!i||(e.notification.image=i);const a=t.notification.icon;!a||(e.notification.icon=a)}function propagateDataPayload(e,t){t.data&&(e.data=t.data)}function propagateFcmOptions(e,t){var n,o,i,a,r;if(!t.fcmOptions&&!((n=t.notification)===null||n===void 0?void 0:n.click_action))return;e.fcmOptions={};const s=(i=(o=t.fcmOptions)===null||o===void 0?void 0:o.link)!==null&&i!==void 0?i:(a=t.notification)===null||a===void 0?void 0:a.click_action;!s||(e.fcmOptions.link=s);const c=(r=t.fcmOptions)===null||r===void 0?void 0:r.analytics_label;!c||(e.fcmOptions.analyticsLabel=c)}
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
 */function isConsoleMessage(e){return typeof e==="object"&&!!e&&b in e}
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
 */_mergeStrings("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o");_mergeStrings("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");function _mergeStrings(e,t){const n=[];for(let o=0;o<e.length;o++){n.push(e.charAt(o));o<t.length&&n.push(t.charAt(o))}return n.join("")}
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
 */function extractAppConfig(e){if(!e||!e.options)throw getMissingValueError("App Configuration Object");if(!e.name)throw getMissingValueError("App Name");const t=["projectId","apiKey","appId","messagingSenderId"];const{options:n}=e;for(const e of t)if(!n[e])throw getMissingValueError(e);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function getMissingValueError(e){return O.create("missing-app-config-values",{valueName:e})}
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
 */class MessagingService{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=false;this.onBackgroundMessageHandler=null;this.onMessageHandler=null;this.logEvents=[];this.isLogServiceStarted=false;const o=extractAppConfig(e);this.firebaseDependencies={app:e,appConfig:o,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}
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
 */async function registerDefaultSw(e){try{e.swRegistration=await navigator.serviceWorker.register(u,{scope:l});e.swRegistration.update().catch((()=>{}))}catch(e){throw O.create("failed-service-worker-registration",{browserErrorMessage:e===null||e===void 0?void 0:e.message})}}
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
 */async function updateSwReg(e,t){t||e.swRegistration||await registerDefaultSw(e);if(t||!e.swRegistration){if(!(t instanceof ServiceWorkerRegistration))throw O.create("invalid-sw-registration");e.swRegistration=t}}
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
 */async function updateVapidKey(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=f)}
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
 */async function getToken$1(e,t){if(!navigator)throw O.create("only-available-in-window");Notification.permission==="default"&&await Notification.requestPermission();if(Notification.permission!=="granted")throw O.create("permission-blocked");await updateVapidKey(e,t===null||t===void 0?void 0:t.vapidKey);await updateSwReg(e,t===null||t===void 0?void 0:t.serviceWorkerRegistration);return getTokenInternal(e)}
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
 */async function logToScion(e,t,n){const o=getEventType(t);const i=await e.firebaseDependencies.analyticsProvider.get();i.logEvent(o,{message_id:n[b],message_name:n[h],message_time:n[y],message_device_time:Math.floor(Date.now()/1e3)})}function getEventType(e){switch(e){case k.NOTIFICATION_CLICKED:return"notification_open";case k.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}
/**
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
 */async function messageEventListener(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===k.PUSH_RECEIVED&&(typeof e.onMessageHandler==="function"?e.onMessageHandler(externalizePayload(n)):e.onMessageHandler.next(externalizePayload(n)));const o=n.data;isConsoleMessage(o)&&o[m]==="1"&&await logToScion(e,n.messageType,o)}const A="@firebase/messaging";const C="0.12.9";
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
 */const WindowMessagingFactory=e=>{const t=new MessagingService(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));navigator.serviceWorker.addEventListener("message",(e=>messageEventListener(t,e)));return t};const WindowMessagingInternalFactory=e=>{const t=e.getProvider("messaging").getImmediate();const n={getToken:e=>getToken$1(t,e)};return n};function registerMessagingInWindow(){c(new e("messaging",WindowMessagingFactory,"PUBLIC"));c(new e("messaging-internal",WindowMessagingInternalFactory,"PRIVATE"));d(A,C);d(A,C,"esm2017")}
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
 * Checks if all required APIs exist in the browser.
 * @returns a Promise that resolves to a boolean.
 *
 * @public
 */async function isWindowSupported(){try{await i()}catch(e){return false}return typeof window!=="undefined"&&a()&&r()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}
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
 */async function deleteToken$1(e){if(!navigator)throw O.create("only-available-in-window");e.swRegistration||await registerDefaultSw(e);return deleteTokenInternal(e)}
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
 */function onMessage$1(e,t){if(!navigator)throw O.create("only-available-in-window");e.onMessageHandler=t;return()=>{e.onMessageHandler=null}}
/**
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
 */
/**
 * Retrieves a Firebase Cloud Messaging instance.
 *
 * @returns The Firebase Cloud Messaging instance associated with the provided firebase app.
 *
 * @public
 */function getMessagingInWindow(e=g()){isWindowSupported().then((e=>{if(!e)throw O.create("unsupported-browser")}),(e=>{throw O.create("indexed-db-unsupported")}));return p(s(e),"messaging").getImmediate()}
/**
 * Subscribes the {@link Messaging} instance to push notifications. Returns a Firebase Cloud
 * Messaging registration token that can be used to send push messages to that {@link Messaging}
 * instance.
 *
 * If notification permission isn't already granted, this method asks the user for permission. The
 * returned promise rejects if the user does not allow the app to show notifications.
 *
 * @param messaging - The {@link Messaging} instance.
 * @param options - Provides an optional vapid key and an optional service worker registration.
 *
 * @returns The promise resolves with an FCM registration token.
 *
 * @public
 */async function getToken(e,t){e=s(e);return getToken$1(e,t)}
/**
 * Deletes the registration token associated with this {@link Messaging} instance and unsubscribes
 * the {@link Messaging} instance from the push subscription.
 *
 * @param messaging - The {@link Messaging} instance.
 *
 * @returns The promise resolves when the token has been successfully deleted.
 *
 * @public
 */function deleteToken(e){e=s(e);return deleteToken$1(e)}
/**
 * When a push message is received and the user is currently on a page for your origin, the
 * message is passed to the page and an `onMessage()` event is dispatched with the payload of
 * the push message.
 *
 *
 * @param messaging - The {@link Messaging} instance.
 * @param nextOrObserver - This function, or observer object with `next` defined,
 *     is called when a message is received and the user is currently viewing your page.
 * @returns To stop listening for messages execute this returned function.
 *
 * @public
 */function onMessage(e,t){e=s(e);return onMessage$1(e,t)}registerMessagingInWindow();export{deleteToken,getMessagingInWindow as getMessaging,getToken,isWindowSupported as isSupported,onMessage};

