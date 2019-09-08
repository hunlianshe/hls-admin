import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import '../common/styles/common.css';
import Routers from './router/router.js';

const start = () => {
	let token = sessionStorage.getItem('token');
	console.log('token:', token);
	ReactDOM.render((
		<HashRouter>
			<Switch>
				{ Routers.map((item, index) => {
					return <Route key={index} path={item.path} exact render={props =>
						(!item.auth
							? (<item.component {...props} />)
							: (sessionStorage.getItem('token')
								? <item.component {...props} />
								: <Redirect to={'/login'} />)
						)} />		
					})
				}
			</Switch>
    </HashRouter>
	), document.getElementById('app'));
};

start();
