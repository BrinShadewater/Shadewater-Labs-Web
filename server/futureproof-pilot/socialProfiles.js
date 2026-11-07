// Independently validate persisted input at the server boundary.
export function socialProfileUrl(value) {
    const raw = value.trim();
    if (!raw || /\s/.test(raw))
        return null;
    try {
        const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(raw) ? raw : raw.startsWith('//') ? 'https:' + raw : 'https://' + raw);
        if (url.protocol !== 'https:' || url.username || url.password || !url.hostname.includes('.') || url.href.length > 500)
            return null;
        return url.href;
    }
    catch {
        return null;
    }
}
