import React from 'react';

import ReactPng from '@/assets/react.png';
import ReactJpg from '@/assets/react.jpg';
import ReactSvg from '@/assets/react.svg';

import styles from './About.module.scss';

function About() {
	return (
		<div className={styles.wrapper}>
			<h1>About Lazy Page</h1>
			<div className={styles.images}>
				<figure>
					<img src={ReactPng} alt='react logo' width={100} />
					<figcaption>.png</figcaption>
				</figure>

				<figure>
					<img src={ReactJpg} alt='react logo' width={100} />
					<figcaption>.jpg</figcaption>
				</figure>

				<figure>
					<ReactSvg color={'red'} width={100} height={89.47} />
					<figcaption>.svg</figcaption>
				</figure>
			</div>
		</div>
	);
}

export default About;
