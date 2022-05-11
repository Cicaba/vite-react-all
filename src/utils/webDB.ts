import cookie from 'js-cookie';
/**
 * @description 获取数据
 * @author Cicaba
 * @date 01/06/2021
 * @param {string} [storage='localStorage']
 * @param {*} DBname
 * @return {*} webDB
 */
export function getDB(DBname: string, storage = 'localStorage') {
  let DB = null;
  if ('localStorage' === storage) {
    DB = localStorage.getItem(DBname);
  } else if ('sessionStorage' === storage) {
    DB = sessionStorage.getItem(DBname);
  } else if ('cookie' === storage) {
    DB = cookie.get(DBname);
  } else {
    DB = localStorage.getItem(DBname);
  }
  if (DB != 'undefined') {
    return JSON.parse(DB);
  } else {
    return null;
  }
}

/**
 * @description 设置数据
 * @author Cicaba
 * @date 01/06/2021
 * @param {string} [storage='localStorage']
 * @param {*} DBname
 * @param {*} DBdata
 * @return {*}  webDB
 */
export function setDB(DBname: string, DBdata: IObject<any> | string, storage = 'localStorage') {
  DBdata = JSON.stringify(DBdata);
  if ('localStorage' === storage) {
    return localStorage.setItem(DBname, DBdata);
  } else if ('sessionStorage' === storage) {
    return sessionStorage.setItem(DBname, DBdata);
  } else if ('cookie' === storage) {
    return cookie.set(DBname, DBdata);
  } else {
    return localStorage.setItem(DBname, DBdata);
  }
}

/**
 * @description 删除数据
 * @author Cicaba
 * @date 01/06/2021
 * @param {string} [storage='localStorage']
 * @param {*} DBname
 * @return {*}  webDB
 */
export function removeDB(DBname: string, storage = 'localStorage') {
  if ('localStorage' === storage) {
    return localStorage.removeItem(DBname);
  } else if ('sessionStorage' === storage) {
    return sessionStorage.clear();
  } else if ('cookie' === storage) {
    return cookie.remove(DBname);
  } else {
    return localStorage.removeItem(DBname);
  }
}
