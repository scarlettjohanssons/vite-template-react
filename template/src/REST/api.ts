import fetch from 'cross-fetch';
import { jwtDecode } from 'jwt-decode';

type RequestParams = {
  endpoint: string;
  body?: any;
  direct?: boolean;
  headers?: any;
  unsafe?: boolean;
  query?: any;
};

export const api = {
  get: ({
    endpoint,
    direct = false,
    headers,
    unsafe = !!process.env.IS_STORYBOOK,
    query,
  }: RequestParams) => {
    const exec = unsafe ? fetchWithoutRefresh : fetchWithRefresh;

    return exec({
      endpoint,
      method: 'GET',
      body: null,
      direct,
      headers,
      query,
    });
  },

  post: ({
    endpoint,
    body,
    direct = false,
    headers,
    unsafe = !!process.env.IS_STORYBOOK,
  }: RequestParams) => {
    const exec = unsafe ? fetchWithoutRefresh : fetchWithRefresh;

    return exec({
      endpoint,
      method: 'POST',
      body,
      direct,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  },

  put: ({
    endpoint,
    body,
    direct = false,
    headers,
    query,
    unsafe = !!process.env.IS_STORYBOOK,
  }: RequestParams) => {
    const exec = unsafe ? fetchWithoutRefresh : fetchWithRefresh;

    return exec({
      endpoint,
      method: 'PUT',
      body,
      direct,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      query,
    });
  },

  patch: ({
    endpoint,
    body,
    direct = false,
    headers,
    query,
    unsafe = !!process.env.IS_STORYBOOK,
  }: RequestParams) => {
    const exec = unsafe ? fetchWithoutRefresh : fetchWithRefresh;

    return exec({
      endpoint,
      method: 'PATCH',
      body,
      direct,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      query,
    });
  },

  delete: ({
    endpoint,
    body,
    direct = false,
    headers,
    query,
    unsafe = !!process.env.IS_STORYBOOK,
  }: RequestParams) => {
    const exec = unsafe ? fetchWithoutRefresh : fetchWithRefresh;

    return exec({
      endpoint,
      method: 'DELETE',
      body,
      direct,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      query,
    });
  },
};

interface Token {
  name: string;
  exp: number;
}

type ExecArgs = {
  endpoint: string;
  method: string;
  body: any;
  direct: boolean;
  headers?: any;
  query?: any;
};

export const fetchWithRefresh = async ({
  endpoint,
  method,
  body,
  direct = false,
  headers,
  query,
}: ExecArgs) => {
  const tokenAccess = await getValidToken();
  const queryString = query ? '?' + query : '';

  const url = direct
    ? endpoint
    : `${process.env.reactAPP_API_URL}/${endpoint}${queryString}`;

  return fetch(url, {
    method,
    headers: {
      Authorization: 'Bearer ' + removeQuotes(tokenAccess!),
      ...headers,
    },
    body,
  });
};
// remove " from string
export const removeQuotes = (str: string) => str.replace(/^"(.*)"$/, '$1');

export function fetchWithoutRefresh({
  endpoint,
  method,
  body,
  direct = false,
  headers,
  query,
}: ExecArgs) {
  const queryString = query ? '?' + query : '';
  const url = direct
    ? endpoint
    : `${process.env.reactAPP_API_URL}/${endpoint}${queryString}`;

  return fetch(url, {
    method,
    body,
    headers,
  });
}

export const getAccessToken = () => {
  const remember = localStorage.getItem('remember');

  if (remember) {
    return localStorage.getItem('accessToken');
  }

  return sessionStorage.getItem('accessToken');
};

const getRefreshToken = () => {
  const remember = localStorage.getItem('remember');
  if (remember) {
    return localStorage.getItem('refreshToken');
  }

  return sessionStorage.getItem('refreshToken');
};

export const saveAccessToken = (newToken: any) => {
  const remember = localStorage.getItem('remember');
  if (remember) {
    localStorage.setItem('accessToken', removeQuotes(newToken.access));
  } else {
    sessionStorage.setItem('accessToken', removeQuotes(newToken.access));
  }
};

export const refreshToken = () => {
  const tokenRefresh = getRefreshToken();
  const formData = new FormData();
  formData.append('refresh', removeQuotes(tokenRefresh!));

  return fetch(`${process.env.reactAPP_API_URL}/auth/token/refresh/`, {
    method: 'POST',
    body: formData,
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  });
};

export const verifyToken = (token: string) => {
  const { exp } = jwtDecode<Token>(token);

  return Date.now() < exp * 1000;
};

export const getValidToken = async () => {
  let tokenAccess = getAccessToken();

  if (tokenAccess) {
    const { exp } = jwtDecode<Token>(tokenAccess);

    if (Date.now() >= exp * 1000) {
      try {
        const newToken = await refreshToken();
        saveAccessToken(newToken);
        tokenAccess = newToken.access;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('fetchWithRefresh error', error);
      }
    }
  }

  return tokenAccess;
};
