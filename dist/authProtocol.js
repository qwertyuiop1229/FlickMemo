// Shared by the packaged extension, its service worker and the hosted auth page.
export const AUTH_ORIGIN = 'https://flickmemo-qwe.web.app';
export const AUTH_TTL_MS = 5 * 60 * 1000;
export const AUTH_SUCCESS = 'FLICKMEMO_AUTH_SUCCESS';

export function validAuthRequest(request, now = Date.now()) {
    return !!request && /^[a-p]{32}$/.test(request.extensionId || '') &&
        /^[a-f0-9]{64}$/.test(request.state || '') &&
        Number.isFinite(request.createdAt) && now >= request.createdAt &&
        now - request.createdAt < AUTH_TTL_MS;
}

export function validAuthResponse(message, request, now = Date.now()) {
    const validToken = value => value == null ||
        (typeof value === 'string' && value.length > 0 && value.length < 16384);
    return validAuthRequest(request, now) && message?.type === AUTH_SUCCESS &&
        message.state === request.state &&
        validToken(message.googleIdToken) && validToken(message.googleAccessToken) &&
        ((typeof message.googleIdToken === 'string' && message.googleIdToken.length > 0 && message.googleIdToken.length < 16384) ||
         (typeof message.googleAccessToken === 'string' && message.googleAccessToken.length > 0 && message.googleAccessToken.length < 16384));
}

export function trustedAuthSender(sender) {
    try {
        const url = new URL(sender?.url);
        return url.origin === AUTH_ORIGIN && ['/auth', '/auth.html'].includes(url.pathname);
    } catch { return false; }
}

export function authRequestFromUrl(url, now = Date.now()) {
    const params = new URL(url).searchParams;
    const request = {
        extensionId: params.get('extension_id'),
        state: params.get('state'),
        createdAt: Number(params.get('created_at'))
    };
    return validAuthRequest(request, now) ? request : null;
}

// Desktop callbacks always target loopback, never a caller-supplied host or URL.
export function desktopAuthRequestFromUrl(url, now = Date.now()) {
    const parsed = new URL(url);
    const params = parsed.searchParams;
    if (parsed.origin !== AUTH_ORIGIN || !['/auth', '/auth.html'].includes(parsed.pathname) || params.has('extension_id')) return null;
    if (['desktop_port', 'state', 'created_at'].some(key => params.getAll(key).length !== 1)) return null;
    const port = params.get('desktop_port');
    const state = params.get('state');
    const createdAt = Number(params.get('created_at'));
    if (!/^[1-9]\d{3,4}$/.test(port || '') || Number(port) < 1024 || Number(port) > 65535 ||
        !/^[a-f0-9]{64}$/.test(state || '') || !Number.isSafeInteger(createdAt) ||
        now < createdAt || now - createdAt >= AUTH_TTL_MS) return null;
    return { port: Number(port), state, createdAt };
}
