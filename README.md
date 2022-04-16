# Tooltips

Library

Import<br/>
`javascript
import { tooltips } from "./tooltips";`

Basic usage<br/>
`tooltips.bindTooltip("#box", "Hello");`

Other examples<br/>
`tooltips.bindTooltip("#yellow_box", "", { background: "yellow", textColor: "black" });`

`tooltips.bindTooltip(".colored_box", (target: HTMLElement, extra_data: tooltip.TooltipExtraData) =>
    "Tooltip for " + extra_data[target.dataset.id] + " box.",
    { extraData: { colors: ["tomato", "yellow", "limegreen", "aqua"] } });`
    
Function call<br/>
`bindTooltip(target: string | HTMLElement, content: TooltipContent, user_options?: TooltipOptions)`

`TooltipContent = string | ((target?: HTMLElement, extraData?: {}, tooltip?: HTMLElement) => string);`

`TooltipOptions` (optional)

| Option name         | Type                    | Default value     | Description                                             |
| ------------------- | ----------------------- |------------------ | ------------------------------------------------------- |
| addAsHtml           | boolean                 | false             | If true, adds content as HTML, else adds content as normal text. |
| arrowTarget         | HTMLElement \| ((target?: HTMLElement) => HTMLElement) | null | Target of tooltip arrow (different than target of tooltip). |
| callbackFunction    | Function                | null              | Function to call when tooltip is shown.                 |
| callbackFunctionArgs| Array<any>              | []                | Arguments for callbackFunction; can include elements "{target}" and/or "{tooltip}" in order to return target/tooltip element(s). |
| dataset             | { [key: string]: TooltipContent } | {}      | Additional data to set in HTML tooltip element.         |
| extraData           | { [key: string]: any }  | {}                | Data for other functions passed in options.             |
| background          | string                  | "#444"            | Color of tooltip background.                            |
| classNames          | Array<string>           | []                | Array of classes set in HTML tooltip element.           |
| textColor           | string                  | "eee"             | Color of text in tooltip.                               |
| eventShow           | string                  | "mouseenter"      | Event showing tooltip.                                  |
| maxHeight           | string                  | ""                | Max height of tooltip set in CSS.                       |
| maxWidth            | string                  | ""                | Max width of tooltip set in CSS.                        |
| permanent           | boolean                 | false             | If true, tooltip will never disappear.                  | 
  
