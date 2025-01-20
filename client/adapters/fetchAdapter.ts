import axios from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const fetchAdapter = async ({
  method,
  path,
  body,
  headers,
}: {
  method: HttpMethod;
  path: string;
  body?: Record<any, any>;
  headers?: Record<string, string>;
}) => {
  const res = await axios({
    method,
    baseURL: "http://localhost:5555/" + path,
    data: body,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  const responses = {
    data: res.data,
    status: res.status,
    statusText: res.statusText,
  };
  return responses;
};
