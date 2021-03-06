import { doc, setDoc } from "@firebase/firestore/lite";
import Api from "../Api";
import { firestore } from "../firebase";

export const CREATE = "api-reudx-pack/CREATE";
export const FETCH = "api-reudx-pack/FETCH";
export const FETCH_LIST = "api-reudx-pack/FETCH_LIST";
export const UPDATE = "api-reudx-pack/UPDATE";
export const RESET = "api-reudx-pack/RESET";
export const DELETE = "api-reudx-pack/DELETE";

export default (resourceName, key = "id") => ({
  collection: (params = {}, meta = {}) => ({
    type: FETCH_LIST,
    promise: Api.get(resourceName, { params }),
    meta: {
      ...meta,
      resourceName,
      key,
    },
  }),
  member: (id, params = {}, meta = {}) => ({
    type: FETCH,
    promise: Api.get(`${resourceName}/${id}`, { params }),
    meta: {
      ...meta,
      resourceName,
      key,
    },
  }),
  create: (data, params = {}, meta = {}) => ({
    type: CREATE,
    // promise: Api.post(resourceName, data, { params }),
    promise: setDoc(doc(firestore, resourceName, data), meta),
    meta: {
      ...meta,
      resourceName,
      key,
    },
  }),
  update: (id, data, params = {}, meta = {}) => ({
    type: UPDATE,
    promise: Api.put(`${resourceName}/${id}`, data, { params }),
    meta: {
      ...meta,
      resourceName,
      key,
    },
  }),
  reset: () => ({
    type: RESET,
    meta: { resourceName },
  }),
  remove: (id, meta = {}) => ({
    type: DELETE,
    promise: Api.delete(`${resourceName}/${id}`),
    meta: {
      ...meta,
      resourceName,
      key,
    },
  }),
});
