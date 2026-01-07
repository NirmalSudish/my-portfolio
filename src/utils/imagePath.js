export const resolvePath = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    const base = import.meta.env.BASE_URL;
    // Remove leading slash from path if present to avoid double slash with base
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    // Ensure base ends with slash (Vite provides it with slash usually)
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    return `${cleanBase}${cleanPath}`;
};
