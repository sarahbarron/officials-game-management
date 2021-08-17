/*
Persistance of store data after a refresh of page by saving to the writable store and to local storage
code used from the tutorial Working with Svelte stores: 
https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores#using_the_store_contract_to_persist_our_todos
*/
import { writable } from 'svelte/store';

export const localStore = (key, initial) => {                 // receives the key of the local storage and an initial value
  try {
    const toString = (value) => JSON.stringify(value, null, 2)  // helper function
    const toObj = JSON.parse                                    // helper function

    if (localStorage.getItem(key) === null) {                   // item not present in local storage
      localStorage.setItem(key, toString(initial))              // initialize local storage with initial value
    }

    const saved = toObj(localStorage.getItem(key))              // convert to object

    const { subscribe, set, update } = writable(saved)          // create the underlying writable store


    return {

      subscribe,
      set: (value) => {
        try {
          // remove any keys that are already stored under the same key locally and 
          // set it again with the new value in order not to exceed the memory quota
          if (localStorage.getItem != null) {
            localStorage.removeItem(key);
          }
          localStorage.setItem(key, toString(initial));
          localStorage.setItem(key, toString(value))              // save also to local storage as a string

          return set(value)
        } catch (e) { console.log("localStorage setItem " + e); }
      },
      update
    }

  } catch (e) {
    console.log("localStore exception: " + e);
    return
  }
}