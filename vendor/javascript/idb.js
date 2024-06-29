const instanceOfAny=(e,t)=>t.some((t=>e instanceof t));let e;let t;function getIdbProxyableTypes(){return e||(e=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function getCursorAdvanceMethods(){return t||(t=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const n=new WeakMap;const r=new WeakMap;const o=new WeakMap;function promisifyRequest(e){const t=new Promise(((t,n)=>{const unlisten=()=>{e.removeEventListener("success",success);e.removeEventListener("error",error)};const success=()=>{t(wrap(e.result));unlisten()};const error=()=>{n(e.error);unlisten()};e.addEventListener("success",success);e.addEventListener("error",error)}));o.set(t,e);return t}function cacheDonePromiseForTransaction(e){if(n.has(e))return;const t=new Promise(((t,n)=>{const unlisten=()=>{e.removeEventListener("complete",complete);e.removeEventListener("error",error);e.removeEventListener("abort",error)};const complete=()=>{t();unlisten()};const error=()=>{n(e.error||new DOMException("AbortError","AbortError"));unlisten()};e.addEventListener("complete",complete);e.addEventListener("error",error);e.addEventListener("abort",error)}));n.set(e,t)}let s={get(e,t,r){if(e instanceof IDBTransaction){if(t==="done")return n.get(e);if(t==="store")return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return wrap(e[t])},set(e,t,n){e[t]=n;return true},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")||t in e}};function replaceTraps(e){s=e(s)}function wrapFunction(e){return getCursorAdvanceMethods().includes(e)?function(...t){e.apply(unwrap(this),t);return wrap(this.request)}:function(...t){return wrap(e.apply(unwrap(this),t))}}function transformCachableValue(e){if(typeof e==="function")return wrapFunction(e);e instanceof IDBTransaction&&cacheDonePromiseForTransaction(e);return instanceOfAny(e,getIdbProxyableTypes())?new Proxy(e,s):e}function wrap(e){if(e instanceof IDBRequest)return promisifyRequest(e);if(r.has(e))return r.get(e);const t=transformCachableValue(e);if(t!==e){r.set(e,t);o.set(t,e)}return t}const unwrap=e=>o.get(e)
/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */;function openDB(e,t,{blocked:n,upgrade:r,blocking:o,terminated:s}={}){const a=indexedDB.open(e,t);const i=wrap(a);r&&a.addEventListener("upgradeneeded",(e=>{r(wrap(a.result),e.oldVersion,e.newVersion,wrap(a.transaction),e)}));n&&a.addEventListener("blocked",(e=>n(e.oldVersion,e.newVersion,e)));i.then((e=>{s&&e.addEventListener("close",(()=>s()));o&&e.addEventListener("versionchange",(e=>o(e.oldVersion,e.newVersion,e)))})).catch((()=>{}));return i}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */function deleteDB(e,{blocked:t}={}){const n=indexedDB.deleteDatabase(e);t&&n.addEventListener("blocked",(e=>t(e.oldVersion,e)));return wrap(n).then((()=>{}))}const a=["get","getKey","getAll","getAllKeys","count"];const i=["put","add","delete","clear"];const c=new Map;function getMethod(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t==="string"))return;if(c.get(t))return c.get(t);const n=t.replace(/FromIndex$/,"");const r=t!==n;const o=i.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(o||a.includes(n)))return;const method=async function(e,...t){const s=this.transaction(e,o?"readwrite":"readonly");let a=s.store;r&&(a=a.index(t.shift()));return(await Promise.all([a[n](...t),o&&s.done]))[0]};c.set(t,method);return method}replaceTraps((e=>({...e,get:(t,n,r)=>getMethod(t,n)||e.get(t,n,r),has:(t,n)=>!!getMethod(t,n)||e.has(t,n)})));const u=["continue","continuePrimaryKey","advance"];const d={};const p=new WeakMap;const l=new WeakMap;const f={get(e,t){if(!u.includes(t))return e[t];let n=d[t];n||(n=d[t]=function(...e){p.set(this,l.get(this)[t](...e))});return n}};async function*iterate(...e){let t=this;t instanceof IDBCursor||(t=await t.openCursor(...e));if(!t)return;t;const n=new Proxy(t,f);l.set(n,t);o.set(n,unwrap(t));while(t){yield n;t=await(p.get(n)||t.continue());p.delete(n)}}function isIteratorProp(e,t){return t===Symbol.asyncIterator&&instanceOfAny(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&instanceOfAny(e,[IDBIndex,IDBObjectStore])}replaceTraps((e=>({...e,get(t,n,r){return isIteratorProp(t,n)?iterate:e.get(t,n,r)},has(t,n){return isIteratorProp(t,n)||e.has(t,n)}})));export{deleteDB,openDB,unwrap,wrap};
