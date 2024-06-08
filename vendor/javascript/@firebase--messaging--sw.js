import"@firebase/installations";import{Component as e}from"@firebase/component";import{openDB as t,deleteDB as n}from"idb";import{ErrorFactory as o,isIndexedDBAvailable as i,validateIndexedDBOpenable as a,getModularInstance as s}from"@firebase/util";import{_registerComponent as r,_getProvider as c,getApp as d}from"@firebase/app";
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
 */const l="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4";const u="https://fcmregistrations.googleapis.com/v1";const p="FCM_MSG";const g="google.c.a.c_id";const f=3;const b=1;var w;(function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE";e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(w||(w={}));
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
 */var y;(function(e){e.PUSH_RECEIVED="push-received";e.NOTIFICATION_CLICKED="notification-clicked"})(y||(y={}));
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
 */const h="fcm_token_details_db";const m=5;const v="fcm_token_object_Store";async function migrateOldDatabase(e){if("databases"in indexedDB){const e=await indexedDB.databases();const t=e.map((e=>e.name));if(!t.includes(h))return null}let o=null;const i=await t(h,m,{upgrade:async(t,n,i,a)=>{var s;if(n<2)return;if(!t.objectStoreNames.contains(v))return;const r=a.objectStore(v);const c=await r.index("fcmSenderId").get(e);await r.clear();if(c)if(n===2){const e=c;if(!e.auth||!e.p256dh||!e.endpoint)return;o={token:e.fcmToken,createTime:(s=e.createTime)!==null&&s!==void 0?s:Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:typeof e.vapidKey==="string"?e.vapidKey:arrayToBase64(e.vapidKey)}}}else if(n===3){const e=c;o={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:arrayToBase64(e.auth),p256dh:arrayToBase64(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:arrayToBase64(e.vapidKey)}}}else if(n===4){const e=c;o={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:arrayToBase64(e.auth),p256dh:arrayToBase64(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:arrayToBase64(e.vapidKey)}}}}});i.close();await n(h);await n("fcm_vapid_details_db");await n("undefined");return checkTokenDetails(o)?o:null}function checkTokenDetails(e){if(!e||!e.subscriptionOptions)return false;const{subscriptionOptions:t}=e;return typeof e.createTime==="number"&&e.createTime>0&&typeof e.token==="string"&&e.token.length>0&&typeof t.auth==="string"&&t.auth.length>0&&typeof t.p256dh==="string"&&t.p256dh.length>0&&typeof t.endpoint==="string"&&t.endpoint.length>0&&typeof t.swScope==="string"&&t.swScope.length>0&&typeof t.vapidKey==="string"&&t.vapidKey.length>0}
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
 */const k="firebase-messaging-database";const T=1;const S="firebase-messaging-store";let I=null;function getDbPromise(){I||(I=t(k,T,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(S)}}}));return I}async function dbGet(e){const t=getKey(e);const n=await getDbPromise();const o=await n.transaction(S).objectStore(S).get(t);if(o)return o;{const t=await migrateOldDatabase(e.appConfig.senderId);if(t){await dbSet(e,t);return t}}}async function dbSet(e,t){const n=getKey(e);const o=await getDbPromise();const i=o.transaction(S,"readwrite");await i.objectStore(S).put(t,n);await i.done;return t}async function dbRemove(e){const t=getKey(e);const n=await getDbPromise();const o=n.transaction(S,"readwrite");await o.objectStore(S).delete(t);await o.done}function getKey({appConfig:e}){return e.appId}
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
 */const M={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."};const _=new o("messaging","Messaging",M);
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
 */async function requestGetToken(e,t){const n=await getHeaders(e);const o=getBody(t);const i={method:"POST",headers:n,body:JSON.stringify(o)};let a;try{const t=await fetch(getEndpoint(e.appConfig),i);a=await t.json()}catch(e){throw _.create("token-subscribe-failed",{errorInfo:e===null||e===void 0?void 0:e.toString()})}if(a.error){const e=a.error.message;throw _.create("token-subscribe-failed",{errorInfo:e})}if(!a.token)throw _.create("token-subscribe-no-token");return a.token}async function requestUpdateToken(e,t){const n=await getHeaders(e);const o=getBody(t.subscriptionOptions);const i={method:"PATCH",headers:n,body:JSON.stringify(o)};let a;try{const n=await fetch(`${getEndpoint(e.appConfig)}/${t.token}`,i);a=await n.json()}catch(e){throw _.create("token-update-failed",{errorInfo:e===null||e===void 0?void 0:e.toString()})}if(a.error){const e=a.error.message;throw _.create("token-update-failed",{errorInfo:e})}if(!a.token)throw _.create("token-update-no-token");return a.token}async function requestDeleteToken(e,t){const n=await getHeaders(e);const o={method:"DELETE",headers:n};try{const n=await fetch(`${getEndpoint(e.appConfig)}/${t}`,o);const i=await n.json();if(i.error){const e=i.error.message;throw _.create("token-unsubscribe-failed",{errorInfo:e})}}catch(e){throw _.create("token-unsubscribe-failed",{errorInfo:e===null||e===void 0?void 0:e.toString()})}}function getEndpoint({projectId:e}){return`${u}/projects/${e}/registrations`}async function getHeaders({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function getBody({p256dh:e,auth:t,endpoint:n,vapidKey:o}){const i={web:{endpoint:n,auth:t,p256dh:e}};o!==l&&(i.web.applicationPubKey=o);return i}
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
 */const D=6048e5;async function getTokenInternal(e){const t=await getPushSubscription(e.swRegistration,e.vapidKey);const n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:arrayToBase64(t.getKey("auth")),p256dh:arrayToBase64(t.getKey("p256dh"))};const o=await dbGet(e.firebaseDependencies);if(o){if(isTokenValid(o.subscriptionOptions,n))return Date.now()>=o.createTime+D?updateToken(e,{token:o.token,createTime:Date.now(),subscriptionOptions:n}):o.token;try{await requestDeleteToken(e.firebaseDependencies,o.token)}catch(e){console.warn(e)}return getNewToken(e.firebaseDependencies,n)}return getNewToken(e.firebaseDependencies,n)}async function deleteTokenInternal(e){const t=await dbGet(e.firebaseDependencies);if(t){await requestDeleteToken(e.firebaseDependencies,t.token);await dbRemove(e.firebaseDependencies)}const n=await e.swRegistration.pushManager.getSubscription();return!n||n.unsubscribe()}async function updateToken(e,t){try{const n=await requestUpdateToken(e.firebaseDependencies,t);const o=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});await dbSet(e.firebaseDependencies,o);return n}catch(e){throw e}}async function getNewToken(e,t){const n=await requestGetToken(e,t);const o={token:n,createTime:Date.now(),subscriptionOptions:t};await dbSet(e,o);return o.token}async function getPushSubscription(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:base64ToArray(t)})}function isTokenValid(e,t){const n=t.vapidKey===e.vapidKey;const o=t.endpoint===e.endpoint;const i=t.auth===e.auth;const a=t.p256dh===e.p256dh;return n&&o&&i&&a}
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
 */function externalizePayload(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};propagateNotificationPayload(t,e);propagateDataPayload(t,e);propagateFcmOptions(t,e);return t}function propagateNotificationPayload(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;!n||(e.notification.title=n);const o=t.notification.body;!o||(e.notification.body=o);const i=t.notification.image;!i||(e.notification.image=i);const a=t.notification.icon;!a||(e.notification.icon=a)}function propagateDataPayload(e,t){t.data&&(e.data=t.data)}function propagateFcmOptions(e,t){var n,o,i,a,s;if(!t.fcmOptions&&!((n=t.notification)===null||n===void 0?void 0:n.click_action))return;e.fcmOptions={};const r=(i=(o=t.fcmOptions)===null||o===void 0?void 0:o.link)!==null&&i!==void 0?i:(a=t.notification)===null||a===void 0?void 0:a.click_action;!r||(e.fcmOptions.link=r);const c=(s=t.fcmOptions)===null||s===void 0?void 0:s.analytics_label;!c||(e.fcmOptions.analyticsLabel=c)}
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
 */function isConsoleMessage(e){return typeof e==="object"&&!!e&&g in e}
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
 */function sleep(e){return new Promise((t=>{setTimeout(t,e)}))}
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
 */_mergeStrings("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o");_mergeStrings("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");async function stageLog(e,t){const n=createFcmEvent(t,await e.firebaseDependencies.installations.getId());createAndEnqueueLogEvent(e,n,t.productId)}function createFcmEvent(e,t){var n,o;const i={};!e.from||(i.project_number=e.from);!e.fcmMessageId||(i.message_id=e.fcmMessageId);i.instance_id=t;e.notification?i.message_type=w.DISPLAY_NOTIFICATION.toString():i.message_type=w.DATA_MESSAGE.toString();i.sdk_platform=f.toString();i.package_name=self.origin.replace(/(^\w+:|^)\/\//,"");!e.collapse_key||(i.collapse_key=e.collapse_key);i.event=b.toString();!((n=e.fcmOptions)===null||n===void 0?void 0:n.analytics_label)||(i.analytics_label=(o=e.fcmOptions)===null||o===void 0?void 0:o.analytics_label);return i}function createAndEnqueueLogEvent(e,t,n){const o={};o.event_time_ms=Math.floor(Date.now()).toString();o.source_extension_json_proto3=JSON.stringify(t);!n||(o.compliance_data=buildComplianceData(n));e.logEvents.push(o)}function buildComplianceData(e){const t={privacy_context:{prequest:{origin_associated_product_id:e}}};return t}function _mergeStrings(e,t){const n=[];for(let o=0;o<e.length;o++){n.push(e.charAt(o));o<t.length&&n.push(t.charAt(o))}return n.join("")}
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
 */async function onSubChange(e,t){var n,o;const{newSubscription:i}=e;if(!i){await deleteTokenInternal(t);return}const a=await dbGet(t.firebaseDependencies);await deleteTokenInternal(t);t.vapidKey=(o=(n=a===null||a===void 0?void 0:a.subscriptionOptions)===null||n===void 0?void 0:n.vapidKey)!==null&&o!==void 0?o:l;await getTokenInternal(t)}async function onPush(e,t){const n=getMessagePayloadInternal(e);if(!n)return;t.deliveryMetricsExportedToBigQueryEnabled&&await stageLog(t,n);const o=await getClientList();if(hasVisibleClients(o))return sendMessagePayloadInternalToWindows(o,n);!n.notification||await showNotification(wrapInternalPayload(n));if(t&&!!t.onBackgroundMessageHandler){const e=externalizePayload(n);typeof t.onBackgroundMessageHandler==="function"?await t.onBackgroundMessageHandler(e):t.onBackgroundMessageHandler.next(e)}}async function onNotificationClick(e){var t,n;const o=(n=(t=e.notification)===null||t===void 0?void 0:t.data)===null||n===void 0?void 0:n[p];if(!o)return;if(e.action)return;e.stopImmediatePropagation();e.notification.close();const i=getLink(o);if(!i)return;const a=new URL(i,self.location.href);const s=new URL(self.location.origin);if(a.host!==s.host)return;let r=await getWindowClient(a);if(r)r=await r.focus();else{r=await self.clients.openWindow(i);await sleep(3e3)}if(r){o.messageType=y.NOTIFICATION_CLICKED;o.isFirebaseMessaging=true;return r.postMessage(o)}}function wrapInternalPayload(e){const t=Object.assign({},e.notification);t.data={[p]:e};return t}function getMessagePayloadInternal({data:e}){if(!e)return null;try{return e.json()}catch(e){return null}}
/**
 * @param url The URL to look for when focusing a client.
 * @return Returns an existing window client or a newly opened WindowClient.
 */async function getWindowClient(e){const t=await getClientList();for(const n of t){const t=new URL(n.url,self.location.href);if(e.host===t.host)return n}return null}
/**
 * @returns If there is currently a visible WindowClient, this method will resolve to true,
 * otherwise false.
 */function hasVisibleClients(e){return e.some((e=>e.visibilityState==="visible"&&!e.url.startsWith("chrome-extension://")))}function sendMessagePayloadInternalToWindows(e,t){t.isFirebaseMessaging=true;t.messageType=y.PUSH_RECEIVED;for(const n of e)n.postMessage(t)}function getClientList(){return self.clients.matchAll({type:"window",includeUncontrolled:true})}function showNotification(e){var t;const{actions:n}=e;const{maxActions:o}=Notification;n&&o&&n.length>o&&console.warn(`This browser only supports ${o} actions. The remaining actions will not be displayed.`);return self.registration.showNotification((t=e.title)!==null&&t!==void 0?t:"",e)}function getLink(e){var t,n,o;const i=(n=(t=e.fcmOptions)===null||t===void 0?void 0:t.link)!==null&&n!==void 0?n:(o=e.notification)===null||o===void 0?void 0:o.click_action;return i||(isConsoleMessage(e.data)?self.location.origin:null)}
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
 */function extractAppConfig(e){if(!e||!e.options)throw getMissingValueError("App Configuration Object");if(!e.name)throw getMissingValueError("App Name");const t=["projectId","apiKey","appId","messagingSenderId"];const{options:n}=e;for(const e of t)if(!n[e])throw getMissingValueError(e);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function getMissingValueError(e){return _.create("missing-app-config-values",{valueName:e})}
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
 */const SwMessagingFactory=e=>{const t=new MessagingService(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));self.addEventListener("push",(e=>{e.waitUntil(onPush(e,t))}));self.addEventListener("pushsubscriptionchange",(e=>{e.waitUntil(onSubChange(e,t))}));self.addEventListener("notificationclick",(e=>{e.waitUntil(onNotificationClick(e))}));return t};function registerMessagingInSw(){r(new e("messaging-sw",SwMessagingFactory,"PUBLIC"))}
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
 * Checks whether all required APIs exist within SW Context
 * @returns a Promise that resolves to a boolean.
 *
 * @public
 */async function isSwSupported(){return i()&&await a()&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}
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
 */function onBackgroundMessage$1(e,t){if(self.document!==void 0)throw _.create("only-available-in-sw");e.onBackgroundMessageHandler=t;return()=>{e.onBackgroundMessageHandler=null}}
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
 */function _setDeliveryMetricsExportedToBigQueryEnabled(e,t){e.deliveryMetricsExportedToBigQueryEnabled=t}
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
 */function getMessagingInSw(e=d()){isSwSupported().then((e=>{if(!e)throw _.create("unsupported-browser")}),(e=>{throw _.create("indexed-db-unsupported")}));return c(s(e),"messaging-sw").getImmediate()}
/**
 * Called when a message is received while the app is in the background. An app is considered to be
 * in the background if no active window is displayed.
 *
 * @param messaging - The {@link Messaging} instance.
 * @param nextOrObserver - This function, or observer object with `next` defined, is called when a
 * message is received and the app is currently in the background.
 *
 * @returns To stop listening for messages execute this returned function
 *
 * @public
 */function onBackgroundMessage(e,t){e=s(e);return onBackgroundMessage$1(e,t)}
/**
 * Enables or disables Firebase Cloud Messaging message delivery metrics export to BigQuery. By
 * default, message delivery metrics are not exported to BigQuery. Use this method to enable or
 * disable the export at runtime.
 *
 * @param messaging - The `FirebaseMessaging` instance.
 * @param enable - Whether Firebase Cloud Messaging should export message delivery metrics to
 * BigQuery.
 *
 * @public
 */function experimentalSetDeliveryMetricsExportedToBigQueryEnabled(e,t){e=s(e);return _setDeliveryMetricsExportedToBigQueryEnabled(e,t)}
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
 */registerMessagingInSw();export{experimentalSetDeliveryMetricsExportedToBigQueryEnabled,getMessagingInSw as getMessaging,isSwSupported as isSupported,onBackgroundMessage};

