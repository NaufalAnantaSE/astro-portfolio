

export const API_BASE_URL = (import.meta as any).env?.PUBLIC_API_SERVER_URL ?
    `${(import.meta as any).env.PUBLIC_API_SERVER_URL}/api` :
    '/api';
export const API_SERVER_URL = (import.meta as any).env?.PUBLIC_API_SERVER_URL; // Base server URL for static assets

// Utility function to get full URL for avatar and other assets
export const getAssetUrl = (path: string): string => {
    if (!path) {
        return '';
    }

    // If path is already a full URL, return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // If path starts with /, it's absolute from server root
    if (path.startsWith('/')) {
        return `${API_SERVER_URL}${path}`;
    }

    // If path is relative, assume it's from server root
    return `${API_SERVER_URL}/${path}`;
};


export const getApiHeaders = () => {

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const token = localStorage.getItem('admin_token');
        return {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })
        };
    }


    return {
        'Content-Type': 'application/json'
    };
};


export interface Project {
    id: string;
    title: string;
    description: string;
    year: number;
    image: string;
    githubUrl?: string;
    websiteUrl?: string;
    alt: string;
    status: 'draft' | 'published';
    order: number;
    createdAt: string;
    updatedAt: string;
}

export interface TechStack {
    id: string;
    name: string;
    icon: string;
    color: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PersonalInfo {
    id: string;
    name: string;
    title: string;
    bio: string;
    email: string;
    phone?: string;
    location: string;
    avatar: string;
    socialMedia: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        instagram?: string;
    };
    updatedAt: string;
}

export interface SEOSettings {
    id: string;
    siteTitle: string;
    siteDescription: string;
    keywords: string[];
    ogImage: string;
    twitterCard: 'summary' | 'summary_large_image';
    favicon: string;
    updatedAt: string;
}


export async function fetchProjects(): Promise<Project[]> {
    try {

        const response = await fetch(`${API_BASE_URL}/projects`, { cache: 'no-store' });

        if (!response.ok) {
            handleAPIError(new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`), response);
            throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();


        return Array.isArray(data) ? data : (data.data || []);
    } catch (error) {
        console.error('Error fetching projects from API:', error);
        throw error;
    }
}

export async function fetchTechStacks(): Promise<TechStack[]> {
    try {

        const response = await fetch(`${API_BASE_URL}/tech-stacks`, { cache: 'no-store' });

        if (!response.ok) {
            handleAPIError(new Error(`Failed to fetch tech stacks: ${response.status} ${response.statusText}`), response);
            throw new Error(`Failed to fetch tech stacks: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();


        return Array.isArray(data) ? data : (data.data || []);
    } catch (error) {
        console.error('Error fetching tech stacks from API:', error);
        throw error;
    }
}

export async function fetchPersonalInfo(): Promise<PersonalInfo> {
    try {

        const response = await fetch(`${API_BASE_URL}/personal-info`, { cache: 'no-store' });

        if (!response.ok) {
            handleAPIError(new Error(`Failed to fetch personal info: ${response.status} ${response.statusText}`), response);
            throw new Error(`Failed to fetch personal info: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();


        return data?.data || data;
    } catch (error) {
        console.error('Error fetching personal info from API:', error);
        throw error;
    }
}

export async function fetchSEOSettings(): Promise<SEOSettings> {
    try {

        const response = await fetch(`${API_BASE_URL}/seo-settings`, { cache: 'no-store' });

        if (!response.ok) {
            throw new Error(`Failed to fetch SEO settings: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();


        return (data?.data || data || null) as SEOSettings;
    } catch (error) {
        console.error('Error fetching SEO settings from API:', error);
        throw error;
    }
}




export async function getPublishedProjects(options: { page?: number; limit?: number; getAll?: boolean; status?: 'all' | 'published' | 'draft' } = {}): Promise<{ data: Project[]; total?: number; page?: number; limit?: number }> {
    const { page = 1, limit = 10, getAll = false, status } = options;

    const params = new URLSearchParams();
    if (getAll) {
        params.set('all', 'true');
    } else {
        params.set('page', String(page));
        params.set('limit', String(limit));
    }
    if (status) {
        params.set('status', status);
    }
    const url = `${API_BASE_URL}/projects?${params.toString()}`;

    try {
        const response = await fetch(url, { cache: 'no-store' });

        if (!response.ok) {
            handleAPIError(new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`), response);
            throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();


        return {
            data: Array.isArray(data) ? data : (data.data || []),
            total: data.total,
            page: data.page,
            limit: data.limit
        };
    } catch (error) {
        console.error('Error fetching published projects:', error);
        throw error;
    }
}


export async function getActiveTechStacks(): Promise<TechStack[]> {
    return await fetchTechStacks();
}


export async function getPersonalInfo(): Promise<PersonalInfo> {
    return await fetchPersonalInfo();
}


export async function getSEOSettings(): Promise<SEOSettings> {
    return await fetchSEOSettings();
}


function handleAPIError(error: Error, response?: Response) {
    switch (response?.status) {
        case 401:

            console.error('Unauthorized access');
            break;

        case 403:

            console.error('Access denied');
            break;

        case 400:

            console.error('Validation failed:', error.message);
            break;

        case 404:

            console.error('Resource not found');
            break;

        case 500:

            console.error('Server error occurred');
            break;

        default:
            console.error('API Error:', error);
    }
}


export const getAuthToken = (): string | null => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        return localStorage.getItem('admin_token');
    }
    return null;
};

export const setAuthToken = (token: string) => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('admin_token', token);
    }
};

export const removeAuthToken = () => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.removeItem('admin_token');
    }
};


export const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};
