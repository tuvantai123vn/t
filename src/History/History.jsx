import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DetailHistory from './Component/DetailHistory';
import MainHistory from './Component/MainHistory';

function History(props) {
	return (
		<Routes>
			<Route exact path='/history' component={MainHistory} />

			<Route path='/history/:id' component={DetailHistory} />
		</Routes>
	);
}

export default History;
