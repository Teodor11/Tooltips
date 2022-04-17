# Tooltips

TypeScript library for showing tooltips. 

![tooltips](https://user-images.githubusercontent.com/24278460/163690336-dcb9946e-24b2-4dc6-b4db-c092a33ad815.png)


Import<br/>
```typescript
import { tooltips } from "./tooltips";
```

Basic usage<br/>
```typescript
tooltips.bindTooltip("#box", "Hello");
```

Examples
```typescript

tooltips.bindTooltip("#html_tooltip", "<h1>HELLO!</h1>", { addAsHtml: true });

tooltips.bindTooltip("#tomato", "I'm a tomato!", { background: "tomato", textColor: "black" });

tooltips.bindTooltip(".animal_tooltip", (t) => "I'm a " + t.dataset.name + "!");
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
| arrowTarget         | `HTMLElement \| ((target?: HTMLElement) => HTMLElement)` | `null` | Target of tooltip arrow (different than target of tooltip). |
| callbackFunction    | `Function`                | `null`              | Function to call when tooltip is shown.                 |
| callbackFunctionArgs| `Array<any>`              | `[]`                | Arguments for callbackFunction; can include elements "{target}" and/or "{tooltip}" in order to return target/tooltip element(s). |
| dataset             | `{ [key: string]: TooltipContent }` | `{}`      | Additional data to set in HTML tooltip element.         |
| extraData           | `{ [key: string]: any }`  | `{}`                | Data for other functions passed in options.             |
| background          | `string`                  | `"#444"`            | Color of tooltip background.                            |
| classNames          | `Array<string>`           | `[]`                | Array of classes set in HTML tooltip element.           |
| textColor           | `string`                  | `"#eee"`             | Color of text in tooltip.                               |
| eventShow           | `string`                  | `"mouseenter"`      | Event showing tooltip.                                  |
| maxHeight           | `string`                  | `""`                | Max height of tooltip set in CSS.                       |
| maxWidth            | `string`                  | `""`                | Max width of tooltip set in CSS.                        |
| permanent           | `boolean`                 | `false`             | If true, tooltip will never disappear.                  | 
  

Force tooltip hide
```typescript
tooltips.hideTooltip(show_animation: boolean)
```
    
Change tooltip permanent state
```typescript
tooltips.setPermanentState(element: HTMLElement, state: boolean)
```    
    
