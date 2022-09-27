import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Get method
 * @param url
 * @returns {Promise<R>}
 */
const get = async (url, options = {}, request) => {

  let authHeader = await AsyncStorage.getItem('authToken')

  return new Promise((resolve, reject) => {

    fetch(url, {
      ...options,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
        Authorization: authHeader ? `Bearer ${authHeader}` : "",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(`${request}-response: `, result)
        if (result.code == 200) {
          resolve(result);
        } else {
          reject(result?.message)
        }
      }).catch((error) => {
        console.log(`${request}-error`, error)
        reject(error);
        return error;
      });
  });
};

/**
 * Post method
 * @param url
 * @param data
 * @param method
 * @returns {Promise<R>}
 */


const post = async (url, data, request, method = 'POST') => {
  let authHeader = await AsyncStorage.getItem('authToken')

  return new Promise((resolve, reject) => {


    // console.log("Url: ", url)
    // console.log("authHeader: ", authHeader)
    // console.log("body: ", data)
    // console.log("type: ", type)

    fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        Authorization: authHeader ? `Bearer ${authHeader}` : "",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((res) => res.json())
      .then((result) => {
        console.log(`${request} response:`, result)
        if (result.code == 200) {
          resolve(result);
        } else {
          reject(result?.message)
        }
      }).catch((error) => {
        console.log(`${request}-error`, error)
        reject(error);
      });
  });
};

export default {
  get,
  post,
};
