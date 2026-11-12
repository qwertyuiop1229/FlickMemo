import { forceWebSockets } from 'firebase/database';

export function configureDatabaseTransport(restrictedWebView) {
    // A saved WebSocket failure makes Firebase start with script/iframe polling.
    // The desktop CSP deliberately forbids executing remote polling scripts.
    // Use the supported socket transport without weakening that policy.
    if (restrictedWebView) forceWebSockets();
}
