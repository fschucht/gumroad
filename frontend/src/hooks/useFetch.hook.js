import _useFetch from "react-fetch-hook";

  // TODO: Read url from environment during build
const BASE_URL = 'http://localhost:3001/api/v1'

export const useFetch = (path, options) => {
  return _useFetch(`${BASE_URL}${path}`, options)
}