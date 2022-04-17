export var tooltips;
(function (tooltips_1) {
    const defaultTooltipOptions = {
        addAsHtml: false,
        arrowTarget: null,
        callbackFunction: null,
        callbackFunctionArgs: [],
        dataset: {},
        extraData: {},
        background: "#444",
        classNames: [],
        textColor: "#eee",
        eventShow: "mouseenter",
        maxHeight: "",
        maxWidth: "",
        permanent: false,
    };
    /**
    * @param target string - query selector | HTMLElement - reference to a target element
    * @param content string - text or HTML | (target:HTMLElement, extraData: {} => string) - function that returns text depending on target and provided extraData
    */
    function bindTooltip(target, content, user_options) {
        const options = Object.assign(Object.assign({}, defaultTooltipOptions), user_options);
        let elements;
        if (typeof target == "string") {
            elements = document.querySelectorAll(target);
            if (elements) {
                for (let i = 0; i < elements.length; i++) {
                    elements[i].addEventListener(options.eventShow, (e) => { showTooltip(e, content, options); });
                }
            }
        }
        else {
            target.addEventListener(options.eventShow, (e) => { showTooltip(e, content, options); });
        }
    }
    tooltips_1.bindTooltip = bindTooltip;
    function showTooltip(e, content, options) {
        setTimeout(() => { showTooltip_afterTimeout(e, content, options); }, 100);
    }
    function showTooltip_afterTimeout(e, content, options) {
        const getNextTooltipId = () => { const elements = document.getElementsByClassName("tooltip"); return elements ? (elements.length + 1) : 1; };
        let cursorOnTooltip = false;
        e.stopPropagation();
        hideTooltip(false);
        const newTooltip = document.createElement("div");
        const newArrow = document.createElement("div");
        const target = e.target;
        /////////////////////////////////
        if (typeof content != "string") {
            content = content(target, options.extraData, newTooltip);
        }
        newArrow.textContent = " ";
        if (options.addAsHtml) {
            newTooltip.innerHTML = content;
        }
        else {
            newTooltip.textContent = content;
        }
        const id = getNextTooltipId();
        newTooltip.id = "tooltip-" + id;
        newArrow.id = "tooltip_arrow-" + id;
        newTooltip.classList.add("tooltip");
        if (options.permanent) {
            newTooltip.classList.add("tooltip_permanent");
        }
        newArrow.classList.add("tooltip_arrow");
        newTooltip.classList.add(...options.classNames);
        newTooltip.style.color = options.textColor;
        newTooltip.style.background = options.background;
        newArrow.style.borderColor = options.background + " transparent transparent transparent";
        newTooltip.style.maxHeight = options.maxHeight || "";
        newTooltip.style.maxWidth = options.maxWidth || "";
        for (const key in options.dataset) {
            const val = options.dataset[key];
            if (typeof val != "string") {
                newTooltip.dataset[key] = val(target, options.extraData);
            }
            else {
                newTooltip.dataset[key] = val;
            }
        }
        document.body.append(newTooltip);
        newTooltip.appendChild(newArrow);
        /////////////////////////////////
        newTooltip.addEventListener("mouseenter", () => { cursorOnTooltip = true; });
        newTooltip.addEventListener("mouseleave", () => { cursorOnTooltip = false; hideTooltip(true); });
        newTooltip.addEventListener("cick", (e) => { e.stopPropagation(); cursorOnTooltip = true; });
        target.addEventListener("mouseleave", () => { window.setTimeout(() => { if (!cursorOnTooltip) {
            hideTooltip(true);
        } }, 100); }, { once: true });
        /////////////////////////////////
        if (options.callbackFunction) {
            const args_copy = options.callbackFunctionArgs.slice();
            for (let i = 0; i < args_copy.length; i++) {
                const arg = args_copy[i];
                if (arg == "{target}") {
                    args_copy[i] = target;
                }
                else if (/{tooltip(\..{1,50}){0,4}}/gm.test(arg)) {
                    const arg_list = arg.substring(1, arg.length - 1).split(".");
                    arg_list.shift();
                    let tooltip_ref = newTooltip;
                    for (let j = 0; j < arg_list.length; j++) {
                        tooltip_ref = tooltip_ref[arg_list[j]];
                    }
                    args_copy[i] = tooltip_ref;
                }
            }
            options.callbackFunction(...args_copy);
        }
        /////////////////////////////////
        const arrowTarget = typeof options.arrowTarget == "function" ? options.arrowTarget(target) : (options.arrowTarget || target);
        const elPosition = arrowTarget.getBoundingClientRect();
        //element position is relative to window scroll
        //tooltip position is absolute (relative to body)
        const tooltipPosition = document.getElementById("tooltip-" + id).getBoundingClientRect();
        let tooltipLeft = elPosition.left + window.scrollX + elPosition.width / 2 - tooltipPosition.width / 2;
        let tooltipTop = elPosition.top + window.scrollY - tooltipPosition.height - 10;
        const tooltipOffset = (window.scrollX + window.innerWidth) - (tooltipLeft + tooltipPosition.width) - 8;
        /////////////////////////////////
        if (tooltipOffset < 0) {
            tooltipLeft += tooltipOffset;
            newArrow.style.left = ((elPosition.left + window.scrollX + elPosition.width / 2) - tooltipLeft).toString() + "px";
        }
        if (tooltipLeft < 8) {
            tooltipLeft = 8;
            newArrow.style.left = ((elPosition.left + window.scrollX + elPosition.width / 2) - tooltipLeft).toString() + "px";
        }
        /////////////////////////////////
        newTooltip.style.left = tooltipLeft.toString() + "px";
        newTooltip.style.top = tooltipTop.toString() + "px";
    }
    function setPermanentState(element, state) {
        if (state) {
            element.classList.add("tooltip_permanent");
        }
        else {
            element.classList.remove("tooltip_permanent");
        }
    }
    tooltips_1.setPermanentState = setPermanentState;
    function hideTooltip(show_animation) {
        const tooltips = document.querySelectorAll(".tooltip");
        if (tooltips) {
            for (let i = 0; i < tooltips.length; i++) {
                let el = tooltips[i];
                if (!el.classList.contains("tooltip_permanent")) {
                    if (show_animation) {
                        el.classList.add("tooltip_fade_out");
                        setTimeout(() => { el.remove(); }, 280);
                    }
                    else {
                        el.remove();
                    }
                }
            }
        }
    }
    tooltips_1.hideTooltip = hideTooltip;
})(tooltips || (tooltips = {}));
