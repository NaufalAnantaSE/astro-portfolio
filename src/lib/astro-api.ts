// Astro-compatible API utility untuk SSR
import { type SEOSettings } from './api';

// API Server URL for processing relative paths (absolute for meta tags)
// Prefer env var so it matches what you use in Postman/production
const API_SERVER_URL = (import.meta as any).env?.PUBLIC_API_SERVER_URL || 'http://localhost:3000';

// Utility function untuk convert relative URLs to absolute for meta tags
const processImageUrl = (url: string): string => {
    if (!url) {
        return '';
    }

    // If already absolute URL, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }

    // If starts with /, it's absolute from server root
    if (url.startsWith('/')) {
        return `${API_SERVER_URL}${url}`;
    }

    // Otherwise, assume relative from server root
    return `${API_SERVER_URL}/${url}`;
};




async function safeFetchSEOSettings(): Promise<SEOSettings | null> {
    try {

        if (typeof window === 'undefined') {

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            try {
                const response = await fetch(`${API_SERVER_URL}/api/seo-settings`, {
                    cache: 'no-store',
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    return null;
                }

                const json = await response.json();

                return (json && json.data) ? json.data : json;
            } catch (fetchError) {
                clearTimeout(timeoutId);
                return null;
            }
        }

        return null;
    } catch (error) {

        return null;
    }
}

export async function getSEOData(): Promise<SEOSettings> {
    const apiData = await safeFetchSEOSettings();

    if (apiData) {

        return {
            ...apiData,
            ogImage: processImageUrl(apiData.ogImage),
            favicon: processImageUrl(apiData.favicon)
        };
    }


    throw new Error('SEO settings not available from API');
}

export async function getPersonalInfoForSSR() {
    try {
        const isServer = typeof window === 'undefined';
        const url = isServer
            ? `${API_SERVER_URL}/api/personal-info`
            : '/api/personal-info';
        const response = await fetch(url, { cache: 'no-store' });

        if (!response.ok) {
            throw new Error(`Failed to fetch personal info: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('SSR: Unable to fetch personal info from API:', error);
        throw error;
    }
}
