import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import styles from './App.module.scss';

const App = () => {
	const [counter, setCounter] = useState(0);

	const increment = () => setCounter((prevCounter) => ++prevCounter);
	const decrement = () => setCounter((prevCounter) => --prevCounter);

	if (__ENV__ === 'development') {
		console.log('DEV MODE');
		// addDevTools();
	}

	return (
		<div className={styles.container}>
			<nav className={styles.nav}>
				<Link className={styles.link} to={'/about'}>
					About
				</Link>
				<Link className={styles.link} to={'/shop'}>
					Shop
				</Link>
			</nav>
			<section>
				<span>PLATFORM={__PLATFORM__}</span>
			</section>
			<section className={styles.counter}>
				<h1>{counter}</h1>
				<button className={styles.button} type='button' onClick={increment}>
					+
				</button>
				<button className={styles.button} type='button' onClick={decrement}>
					-
				</button>
			</section>
			<Outlet />
		</div>
	);
};

export default App;
