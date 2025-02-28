import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from '@/components/App';
import { AboutPage } from '@/pages/About';
import { ShopPage } from '@/pages/Shop';

const root = document.getElementById('root');
if (!root) {
	throw Error('App Mounting Error');
}

const container = createRoot(root);

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/about',
				element: (
					<Suspense fallback={<i>Loading...</i>}>
						<AboutPage />
					</Suspense>
				)
			},
			{
				path: '/shop',
				element: (
					<Suspense fallback={<i>Loading...</i>}>
						<ShopPage />
					</Suspense>
				)
			}
		]
	}
]);

container.render(<RouterProvider router={router} />);
