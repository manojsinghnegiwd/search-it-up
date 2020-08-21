import { call, put, takeLatest } from 'redux-saga/effects'
import { User } from '../types';

export const FETCH_API_REQUEST = 'FETCH_API_REQUEST';
export const FETCH_API_SUCCESS = 'FETCH_API_SUCCESS';
export const FETCH_API_FAIL = 'FETCH_API_FAIL';

export function fetchFromApi(): Promise<User[]> {
    return fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
}

export function* requestFetchFromApi() {
    try {
        const data = yield call(fetchFromApi);
        yield put(fetchApiSuccess(data));
    } catch (error) {
        yield put(fetchApiFail(error));
    }
}

export function fetchApiRequest() {
    return {
      type: FETCH_API_REQUEST,
    }
}

export function fetchApiSuccess(data: User[]) {
    return {
        type: FETCH_API_SUCCESS,
        data
    };
}

export function fetchApiFail(error: any) {
    return {
        type: FETCH_API_FAIL,
        error
    };
}

export function* watchRequestFetchApi() {
    yield takeLatest(FETCH_API_REQUEST, requestFetchFromApi);
}