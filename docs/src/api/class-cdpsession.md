# class: CDPSession
* extends: [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

The `CDPSession` instances are used to talk raw Chrome Devtools Protocol:
* protocol methods can be called with `session.send` method.
* protocol events can be subscribed to with `session.on` method.

Useful links:
* Documentation on DevTools Protocol can be found here: [DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/).
* Getting Started with DevTools Protocol: https://github.com/aslushnikov/getting-started-with-cdp/blob/master/README.md

```js
const client = await page.context().newCDPSession(page);
await client.send('Animation.enable');
client.on('Animation.animationCreated', () => console.log('Animation created!'));
const response = await client.send('Animation.getPlaybackRate');
console.log('playback rate is ' + response.playbackRate);
await client.send('Animation.setPlaybackRate', {
  playbackRate: response.playbackRate / 2
});
```

## async method: CDPSession.detach

Detaches the CDPSession from the target. Once detached, the CDPSession object won't emit any events and can't be used to
send messages.

## async method: CDPSession.send
- returns: <[Object]>

### param: CDPSession.send.method
- `method` <[string]>

protocol method name

### param: CDPSession.send.params
- `params` <[Object]>

Optional method parameters
