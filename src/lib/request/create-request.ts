// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { cookies } from 'next/headers';
// // import { z } from 'zod';

// // import { generatePath, ParamParseKey } from './_utils';
// // import { createRequestBody } from './create-request-body';
// // import { requestError } from './error-types';

// // type RequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// // export type RequestType = 'json' | 'file';

// // type RequestInput<Path extends string> = {
// //   headers?: Headers;
// //   body?: Record<string, any>;
// //   params?: Record<ParamParseKey<Path>, string>;
// //   query?: URLSearchParams;
// //   withoutAuth?: boolean;
// //   requestInit?: RequestInit;
// //   type?: RequestType;
// // };
// // const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

// // export const createRequest = <Path extends string>(method: RequestMethods, url: Path) => {
// //   return async <T extends z.ZodSchema<any, any>>(
// //     input: RequestInput<Path>,
// //     schema?: T
// //   ): Promise<T['_output']> => {
// //     const cookieStore = await cookies();

// //     const accessToken = cookieStore.get('access-token')?.value;

// //     const headers = new Headers(input.headers);

// //     const inputType = input.type ?? 'json';

// //     if (inputType === 'json') {
// //       headers.set('Content-Type', 'application/json');
// //     }

// //     if (accessToken && !input.withoutAuth) {
// //       headers.set('Authorization', `Bearer ${accessToken}`);
// //     }

// //     const body = createRequestBody(input.body, inputType);

// //     const requestInit = {
// //       method,
// //       body,
// //       credentials: 'include' as const,
// //       headers,
// //       ...input.requestInit,
// //       next: {
// //         revalidate: 0,
// //       },
// //     };

// //     const apiUrl = input.params ? generatePath(url, input.params) : url;

// //     const fullUrl = input.query
// //       ? `${API_BASE_URL}${apiUrl}?${input.query}`
// //       : `${API_BASE_URL}${apiUrl}`;

// //     const res = await fetch(fullUrl, requestInit);
// //     try {
// //       const res = await fetch(input.query ? `${apiUrl}?${input.query}` : apiUrl, requestInit);

// //       if (res.status >= 500) {
// //         const error = await res.json();

// //         throw requestError({
// //           type: 'server',
// //           message: error.detail,
// //           errors: error.errors,
// //         });
// //       }

// //       if (res.status >= 400) {
// //         const error = await res.json();

// //         throw requestError({
// //           type: 'client',
// //           message: error.detail,
// //           errors: error.errors,
// //         });
// //       }

// //       if (schema) {
// //         const json = await res.json();

// //         const parsed = schema.safeParse(json);

// //         if (!parsed.success) {
// //           const { error } = parsed;
// //           const errorMessages = error.issues.map((issue) => issue.message).join(', ');

// //           throw requestError({
// //             type: 'decode_error',
// //             message: errorMessages,
// //           });
// //         }

// //         return parsed.data;
// //       }

// //       return res.json();
// //     } catch (error) {
// //       if (error instanceof TypeError) {
// //         throw requestError({
// //           type: 'network',
// //           ...error,
// //         });
// //       }

// //       throw error;
// //     }
// //   };
// // };

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { z } from 'zod';
// import { generatePath, ParamParseKey } from './_utils';
// import { createRequestBody } from './create-request-body';
// import { requestError } from './error-types';

// type RequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
// export type RequestType = 'json' | 'file';

// type RequestInput<Path extends string> = {
//   headers?: Headers;
//   body?: Record<string, any>;
//   params?: Record<ParamParseKey<Path>, string>;
//   query?: URLSearchParams;
//   withoutAuth?: boolean;
//   requestInit?: RequestInit;
//   type?: RequestType;
// };

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

// export const createRequest = <Path extends string>(method: RequestMethods, url: Path) => {
//   return async <T extends z.ZodSchema<any, any>>(
//     input: RequestInput<Path>,
//     schema?: T
//   ): Promise<T['_output']> => {
//     const headers = new Headers(input.headers);
//     const inputType = input.type ?? 'json';

//     if (inputType === 'json') {
//       headers.set('Content-Type', 'application/json');
//     }

//     // If your backend issues JWT cookies, you don't need manual Authorization
//     if (!input.withoutAuth) {
//       const token = typeof window !== 'undefined' ? localStorage.getItem('access-token') : null;
//       if (token) headers.set('Authorization', `Bearer ${token}`);
//     }

//     const body = createRequestBody(input.body, inputType);

//     const requestInit: RequestInit = {
//       method,
//       body,
//       credentials: 'include',
//       headers,
//       ...input.requestInit,
//     };

//     const apiUrl = input.params ? generatePath(url, input.params) : url;
//     const fullUrl = input.query
//       ? `${API_BASE_URL}${apiUrl}?${input.query}`
//       : `${API_BASE_URL}${apiUrl}`;

//     try {
//       const res = await fetch(fullUrl, requestInit);
//       const json = await res.json(); // read response **once**

//       // handle HTTP errors based on status
//       if (res.status >= 500) {
//         throw requestError({ type: 'server', message: json.detail, errors: json.errors });
//       }
//       if (res.status >= 400) {
//         throw requestError({ type: 'client', message: json.detail, errors: json.errors });
//       }

//       // handle optional zod schema parsing
//       if (schema) {
//         const parsed = schema.safeParse(json);
//         if (!parsed.success) {
//           const errorMessages = parsed.error.issues.map((i) => i.message).join(', ');
//           throw requestError({ type: 'decode_error', message: errorMessages });
//         }
//         return parsed.data;
//       }

//       return json;
//     } catch (error) {
//       if (error instanceof TypeError) {
//         throw requestError({ type: 'network', ...error });
//       }
//       throw error;
//     }
//   };
// };

import { z } from 'zod';
import { generatePath, ParamParseKey } from './_utils';
import { createRequestBody } from './create-request-body';
import { requestError } from './error-types';

// Helper function to read a specific cookie from the browser
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') {
    return null; // Return null if not in a browser environment
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

type RequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type RequestType = 'json' | 'file';

type RequestInput<Path extends string> = {
  headers?: Headers;
  body?: Record<string, any>;
  params?: Record<ParamParseKey<Path>, string>;
  query?: URLSearchParams;
  withoutAuth?: boolean;
  requestInit?: RequestInit;
  type?: RequestType;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export const createRequest = <Path extends string>(method: RequestMethods, url: Path) => {
  return async <T extends z.ZodSchema<any, any>>(
    input: RequestInput<Path>,
    schema?: T
  ): Promise<T['_output']> => {
    const headers = new Headers(input.headers);
    const inputType = input.type ?? 'json';

    if (inputType === 'json') {
      headers.set('Content-Type', 'application/json');
    }

    // --- MODIFIED AUTH LOGIC ---
    // If the request needs authentication, read the token from cookies and set the header.
    if (!input.withoutAuth) {
      const token = getCookie('access-token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }
    // --- END OF MODIFIED LOGIC ---

    const body = createRequestBody(input.body, inputType);

    const requestInit: RequestInit = {
      method,
      credentials: 'include', // Important: sends cookies along with the request
      headers,
      ...input.requestInit,
    };

    // The body should only be included for relevant methods
    if (method !== 'GET' && method !== 'DELETE') {
      requestInit.body = body;
    }

    const apiUrl = input.params ? generatePath(url, input.params) : url;
    const fullUrl = input.query
      ? `${API_BASE_URL}${apiUrl}?${input.query}`
      : `${API_BASE_URL}${apiUrl}`;

    try {
      const res = await fetch(fullUrl, requestInit);

      // Handle responses that might not have a JSON body, e.g., 204 No Content
      if (res.status === 204) {
        return null as any;
      }

      const json = await res.json(); // Read response body ONCE

      if (!res.ok) {
        const errorType = res.status >= 500 ? 'server' : 'client';
        // --- THIS IS THE CHANGE ---
        // Add the HTTP status code to the error object we throw
        throw requestError({
          type: errorType,
          message: json.detail || json.message, // Check for .detail or .message
          errors: json.errors,
          status: res.status, // <-- Add this line
        });
      }

      if (schema) {
        const parsed = schema.safeParse(json);
        if (!parsed.success) {
          const errorMessages = parsed.error.issues.map((i) => i.message).join(', ');
          throw requestError({ type: 'decode_error', message: errorMessages });
        }
        return parsed.data;
      }

      return json;
    } catch (error) {
      if (error instanceof TypeError) {
        // This catches network errors (e.g., failed to fetch)
        throw requestError({ type: 'network', ...error });
      }
      throw error; // Re-throw custom errors from above
    }
  };
};
