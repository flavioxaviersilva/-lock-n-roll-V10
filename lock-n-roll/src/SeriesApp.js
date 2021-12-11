import React from 'react';
import Router from './Router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';


import { composeWithDevTools } from 'remote-redux-devtools';

import rootReducer from './reducers';

//const store = createStore(rootReducer, composeWithDevTools(
//     applyMiddleware(reduxThunk)


// ));

//import { createStore } from 'redux';
//import devToolsEnhancer from 'remote-redux-devtools';
//import { devToolsEnhancer } from 'redux-devtools-extension';

// const enhance = composeWithDevTools  ({
//     realtime: true,
//     host: '192.168.0.18',
//     port: 8000
//     });

//const store = createStore(rootReducer, enhance(applyMiddleware()));


//const store = createStore (rootReducer, devToolsEnhancer());

//const store = createStore( rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );
const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000, hostname: '192.168.0.18' });

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), composeEnhancers(
	applyMiddleware(reduxThunk)
));
// comandos:  yarn add remotedev-server
// yarn run remotedev --port=8000


//Aqui é apenas um funcional component que renderia o router e o router é toda a logica de roteamento
const SeriesApp = prop => (
    <Provider store = {store}>
         <Router /> 
    </Provider>
                        
);




export default SeriesApp;

