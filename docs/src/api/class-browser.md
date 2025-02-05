# class: Browser
* extends: [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

A Browser is created via [`method: BrowserType.launch`]. An example of using a [Browser] to create a [Page]:

```js
const { firefox } = require('playwright');  // Or 'chromium' or 'webkit'.

(async () => {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await browser.close();
})();
```

## event: Browser.disconnected

Emitted when Browser gets disconnected from the browser application. This might happen because of one of the following:
* Browser application is closed or crashed.
* The [`method: Browser.close`] method was called.

## async method: Browser.close

In case this browser is obtained using [`method: BrowserType.launch`], closes the browser and all of its pages (if any
were opened).

In case this browser is connected to, clears all created contexts belonging to this
browser and disconnects from the browser server.

The [Browser] object itself is considered to be disposed and cannot be used anymore.

## method: Browser.contexts
- returns: <[Array]<[BrowserContext]>>

Returns an array of all open browser contexts. In a newly created browser, this will return zero browser contexts.

```js
const browser = await pw.webkit.launch();
console.log(browser.contexts().length); // prints `0`

const context = await browser.newContext();
console.log(browser.contexts().length); // prints `1`
```

## method: Browser.isConnected
- returns: <[boolean]>

Indicates that the browser is connected.

## async method: Browser.newContext
- returns: <[BrowserContext]>

Creates a new browser context. It won't share cookies/cache with other browser contexts.

```js
(async () => {
  const browser = await playwright.firefox.launch();  // Or 'chromium' or 'webkit'.
  // Create a new incognito browser context.
  const context = await browser.newContext();
  // Create a new page in a pristine context.
  const page = await context.newPage();
  await page.goto('https://example.com');
})();
```

### option: Browser.newContext.-inline- = %%-shared-context-params-list-%%

### option: Browser.newContext.proxy = %%-context-option-proxy-%%

### option: Browser.newContext.storageState = %%-context-option-storage-state-%%

## async method: Browser.newPage
- returns: <[Page]>

Creates a new page in a new browser context. Closing this page will close the context as well.

This is a convenience API that should only be used for the single-page scenarios and short snippets. Production code and
testing frameworks should explicitly create [`method: Browser.newContext`] followed by the [`method:
BrowserContext.newPage`] to control their exact life times.

### option: Browser.newPage.-inline- = %%-shared-context-params-list-%%

### option: Browser.newPage.proxy = %%-context-option-proxy-%%

### option: Browser.newPage.storageState = %%-context-option-storage-state-%%

## method: Browser.version
- returns: <[string]>

Returns the browser version.
