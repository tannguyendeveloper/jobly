import {useState} from 'react';

const useLocalStorage = (key) => {
  const [value, setValue] = useState(localStorage[key] ? localStorage[key] : null);
  function set(value) {
    console.log(key, value);
    localStorage.setItem(key, value);
    setValue(value);
  }
  function remove() {
    localStorage.removeItem(key);
    setValue();
  }
  return [value, {set, remove}];
}

export default useLocalStorage;