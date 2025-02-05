# class: Accessibility

The Accessibility class provides methods for inspecting Chromium's accessibility tree. The accessibility tree is used by
assistive technology such as [screen readers](https://en.wikipedia.org/wiki/Screen_reader) or
[switches](https://en.wikipedia.org/wiki/Switch_access).

Accessibility is a very platform-specific thing. On different platforms, there are different screen readers that might
have wildly different output.

Blink - Chromium's rendering engine - has a concept of "accessibility tree", which is then translated into different
platform-specific APIs. Accessibility namespace gives users access to the Blink Accessibility Tree.

Most of the accessibility tree gets filtered out when converting from Blink AX Tree to Platform-specific AX-Tree or by
assistive technologies themselves. By default, Playwright tries to approximate this filtering, exposing only the
"interesting" nodes of the tree.

## async method: Accessibility.snapshot
- returns: <[null]|[Object]>
  - `role` <[string]> The [role](https://www.w3.org/TR/wai-aria/#usage_intro).
  - `name` <[string]> A human readable name for the node.
  - `value` <[string]|[float]> The current value of the node, if applicable.
  - `description` <[string]> An additional human readable description of the node, if applicable.
  - `keyshortcuts` <[string]> Keyboard shortcuts associated with this node, if applicable.
  - `roledescription` <[string]> A human readable alternative to the role, if applicable.
  - `valuetext` <[string]> A description of the current value, if applicable.
  - `disabled` <[boolean]> Whether the node is disabled, if applicable.
  - `expanded` <[boolean]> Whether the node is expanded or collapsed, if applicable.
  - `focused` <[boolean]> Whether the node is focused, if applicable.
  - `modal` <[boolean]> Whether the node is [modal](https://en.wikipedia.org/wiki/Modal_window), if applicable.
  - `multiline` <[boolean]> Whether the node text input supports multiline, if applicable.
  - `multiselectable` <[boolean]> Whether more than one child can be selected, if applicable.
  - `readonly` <[boolean]> Whether the node is read only, if applicable.
  - `required` <[boolean]> Whether the node is required, if applicable.
  - `selected` <[boolean]> Whether the node is selected in its parent node, if applicable.
  - `checked` <[boolean]|"mixed"> Whether the checkbox is checked, or "mixed", if applicable.
  - `pressed` <[boolean]|"mixed"> Whether the toggle button is checked, or "mixed", if applicable.
  - `level` <[int]> The level of a heading, if applicable.
  - `valuemin` <[float]> The minimum value in a node, if applicable.
  - `valuemax` <[float]> The maximum value in a node, if applicable.
  - `autocomplete` <[string]> What kind of autocomplete is supported by a control, if applicable.
  - `haspopup` <[string]> What kind of popup is currently being shown for a node, if applicable.
  - `invalid` <[string]> Whether and in what way this node's value is invalid, if applicable.
  - `orientation` <[string]> Whether the node is oriented horizontally or vertically, if applicable.
  - `children` <[Array]<[Object]>> Child nodes, if any, if applicable.

Captures the current state of the accessibility tree. The returned object represents the root accessible node of the
page.

:::note
The Chromium accessibility tree contains nodes that go unused on most platforms and by most screen readers.
Playwright will discard them as well for an easier to process tree, unless [`option: interestingOnly`] is set to
`false`.
:::

An example of dumping the entire accessibility tree:

```js
const snapshot = await page.accessibility.snapshot();
console.log(snapshot);
```

An example of logging the focused node's name:

```js
const snapshot = await page.accessibility.snapshot();
const node = findFocusedNode(snapshot);
console.log(node && node.name);

function findFocusedNode(node) {
  if (node.focused)
    return node;
  for (const child of node.children || []) {
    const foundNode = findFocusedNode(child);
    return foundNode;
  }
  return null;
}
```

### option: Accessibility.snapshot.interestingOnly
- `interestingOnly` <[boolean]>

Prune uninteresting nodes from the tree. Defaults to `true`.

### option: Accessibility.snapshot.root
- `root` <[ElementHandle]>

The root DOM element for the snapshot. Defaults to the whole page.
