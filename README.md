# Tooltips

TypeScript light-weight library for showing tooltips.


![tooltips-mix](https://user-images.githubusercontent.com/24278460/163706288-5a281caf-9432-4c19-9811-589930733876.png)


Import
```typescript
import { tooltips } from "./tooltips";
// or
<script src="./tooltips.js"></script>
```

Basic usage<br/>
```typescript
tooltips.bindTooltip("#box", "Hello");
```

Examples
```typescript
// #1 Tooltip with HTML content
tooltips.bindTooltip("#html_tooltip", "<h1>HELLO!</h1>", { addAsHtml: true });

// #2 Tooltip with styling
tooltips.bindTooltip("#tomato", "I'm a tomato!", { background: "tomato", textColor: "black" });

// #3 Tooltip with content depending on target attributes
tooltips.bindTooltip(".animal_tooltip", (t) => "I'm a " + t.dataset.name + "!");

// #4 Tooltip with content depending on target attributes and extra data
tooltip.bindTooltip(".colored_box", (t, d) =>
   `<span style="border-bottom: 2px solid ${d.colors[t.dataset.id]};"> Status: ${t.textContent} </span>`,
   { addAsHtml: true, extraData: { colors: { ok: "limegreen", warn: "orange", err: "red" } } });
```
   
Bind tooltip to HTML element(s)
```typescript
tooltips.bindTooltip(target: string | HTMLElement, content: TooltipContent, user_options?: TooltipOptions)
TooltipContent = string | ((target?: HTMLElement, extraData?: {}, tooltip?: HTMLElement) => string);
```


`TooltipOptions` &ndash; object (optional)

| Option name         | Type                      | Default value       | Description                                             |
| ------------------- | ------------------------- | ------------------  | ------------------------------------------------------- |
| addAsHtml           | `boolean`                 | `false`             | If true, adds content as HTML, else adds content as normal text. |
| arrowTarget         | `HTMLElement` or `((target?: HTMLElement) => HTMLElement)` | `null` | Attachment point of tooltip arrow (if different than target of tooltip). |
| callbackFunction    | `Function`                | `null`              | Function to call when tooltip is shown.                 |
| callbackFunctionArgs| `Array<any>`              | `[]`                | Arguments for callbackFunction; can include elements "{target}" and/or "{tooltip}" in order to provide access to target/tooltip elements. |
| dataset             | `{ [key: string]: TooltipContent }` | `{}`      | Additional data to set in HTML tooltip element.         |
| extraData           | `{ [key: string]: any }`  | `{}`                | Data for function creating content (see example #4).    |
| background          | `string`                  | `"#444"`            | Color of tooltip background.                            |
| classNames          | `Array<string>`           | `[]`                | Array of classes set in HTML tooltip element.           |
| textColor           | `string`                  | `"#eee"`            | Color of text in tooltip.                               |
| eventShow           | `string`                  | `"mouseenter"`      | Event showing tooltip.                                  |
| maxHeight           | `string`                  | `""`                | Max height of tooltip set in CSS.                       |
| maxWidth            | `string`                  | `""`                | Max width of tooltip set in CSS.                        |
| permanent           | `boolean`                 | `false`             | If true, tooltip will never disappear.                  | 
  

Force all tooltips to hide
```typescript
tooltips.hideTooltip(show_animation: boolean)
```
    
Change tooltip permanent state
```typescript
tooltips.setPermanentState(element: HTMLElement, state: boolean)
```    
    
