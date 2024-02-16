import { BASE_URL } from "./constants";

async function checkServerResponse(res) {
  if (res.ok) {
    return res.json();
  } 
  const errorText = await res.text()
  throw new Error(`Ошибка соединения ${res.status}: ${errorText}`);
}

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    return checkServerResponse(res);
  })
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({email, password})
  })
    .then((res) =>{
      return checkServerResponse(res)
    })
}

export function getContent() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'
  })
  .then((res) => {
    return checkServerResponse(res);
  })
}