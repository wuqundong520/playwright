# class: ChromiumBrowserContext
* extends: [BrowserContext]

Chromium-specific features including background pages, service worker support, etc.

```js
const backgroundPage = await context.waitForEvent('backgroundpage');
```

## event: ChromiumBrowserContext.backgroundpage
- type: <[Page]>

Emitted when new background page is created in the context.

:::note
Only works with persistent context.
:::

## event: ChromiumBrowserContext.serviceworker
- type: <[Worker]>

Emitted when new service worker is created in the context.

## method: ChromiumBrowserContext.backgroundPages
- returns: <[Array]<[Page]>>

All existing background pages in the context.

## async method: ChromiumBrowserContext.newCDPSession
- returns: <[CDPSession]>

Returns the newly created session.

### param: ChromiumBrowserContext.newCDPSession.page
- `page` <[Page]>

Page to create new session for.

## method: ChromiumBrowserContext.serviceWorkers
- returns: <[Array]<[Worker]>>

All existing service workers in the context.
