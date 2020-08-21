import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import userReducer from "./userReducer"
import createSagaMiddleware from 'redux-saga'
import { watchRequestFetchApi } from "./userSaga";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    userReducer
});

const store = createStore(
    reducer,
    compose(
        applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(watchRequestFetchApi);

export type RootState = ReturnType<typeof reducer>

export default store