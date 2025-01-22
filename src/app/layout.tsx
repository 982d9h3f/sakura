//src/app/layout.tsx
'use client';

import './globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const ogImage = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/sakura/bg2.webp`;
	const pageMetadata = {
		title: 'SAKURA',
		description: '記念コインの販売',
		image: ogImage,
		url: 'https://sakura-sigma.vercel.app/',
		type: 'website',
	};
	return (
		<html lang="en">
			<Head>
				<title>{pageMetadata.title}</title>
				<meta name="description" content="記念コインを企画・作製し、ブランディングを行います。" />
				<meta name="robots" content="index, follow" />
				<meta name="keywords" content="" />
				<meta property="og:title" content={pageMetadata.title} />
				<meta property="og:description" content={pageMetadata.description} />
				<meta property="og:image" content={pageMetadata.image} />
				<meta property="og:url" content={pageMetadata.url} />
				<meta property="og:type" content={pageMetadata.type} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={pageMetadata.title} />
				<meta name="twitter:description" content={pageMetadata.description} />
				<meta name="twitter:image" content={pageMetadata.image} />
				<meta name="twitter:url" content={pageMetadata.url} />
				<script type="application/ld+json">
					{JSON.stringify({
						"@context": "https://schema.org",
						"@type": "website",
						"headline": pageMetadata.title,
						"description": pageMetadata.description,
						"image": pageMetadata.image,
						"author": {
							"@type": "Person",
							"name": 'SAKURA',
						},
						"publisher": {
							"@type": "Organization",
							"name": "SAKURA",
							"logo": {
								"@type": "ImageObject",
								"url": `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL || ''}/sakura/logo1.png`,
							},
						},
						"datePublished": new Date().toISOString(),
						"dateModified": new Date().toISOString(),
					})}
				</script>
			</Head>
			<body>
				<ChakraProvider>{children}</ChakraProvider>
			</body>
		</html>
	);
}
