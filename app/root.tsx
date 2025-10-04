import {
	data,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from 'react-router';
import { toast as notify, Toaster } from 'sonner';

import type { Route } from './+types/root';
import './styles/tailwind.css';
import type React from 'react';
import { useEffect } from 'react';
import { getToast } from 'remix-toast';
import { HoneypotProvider } from 'remix-utils/honeypot/react';
import GeneralErrorBoundary from '@/components/GeneralErrorBoundary';
import { honeypot } from '@/lib/honeypot.server';

export const links: Route.LinksFunction = () => [
	{
		rel: 'icon',
		href: '/favicon.ico',
		sizes: '32x32',
	},
	{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
];

export function meta() {
	return [
		{ title: '654 Tiro base!' },
		// { name: 'description', content: 'Welcome to React Router!' },
	];
}

export async function loader({ request }: Route.LoaderArgs) {
	const honeyProps = await honeypot.getInputProps();
	const { toast, headers } = await getToast(request);

	return data({
		honeyProps,
		toast,
		headers,
	});
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App({ loaderData }: Route.ComponentProps) {
	const data = useLoaderData<typeof loader>();
	const { toast } = loaderData;

	useEffect(() => {
		if (toast?.type === 'error') {
			notify.error(toast.message);
		}
		if (toast?.type === 'success') {
			notify.success(toast.message);
		}
	}, [toast]);

	return (
		<HoneypotProvider {...data.honeyProps}>
			<Outlet />
			<Toaster />
		</HoneypotProvider>
	);
}

export function ErrorBoundary(props: Route.ErrorBoundaryProps) {
	return <GeneralErrorBoundary {...props} />;
}
