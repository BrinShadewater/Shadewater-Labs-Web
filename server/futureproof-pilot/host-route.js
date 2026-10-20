// Preserve history cursors when Vercel rewrites the pilot API to one function.
export function rewritePilotUrl(input, override) {
    const url = new URL(input ?? '/', 'https://shadewaterlabs.com');
    const route = url.searchParams.get('pilotPath') || (typeof override === 'string' ? override : '');
    if (!route)
        return input ?? '/';
    url.searchParams.delete('pilotPath');
    return '/api/futureproof-pilot/' + route.replace(/^\/+/, '') + (url.searchParams.size ? '?' + url.searchParams.toString() : '');
}
