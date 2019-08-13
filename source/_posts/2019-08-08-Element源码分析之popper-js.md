---
title: Element源码分析之popper.js
date: 2019-08-08 11:13:52
tags: [element,vue,javascript]
categories: 前端
---
## 说明
element code version:2.10.1
element组件中如Tooltip、Popover、cascader、select类似于这种弹窗跟随目前移动的都是基于popper.js实现的。所以打算分析popper的实现，便于分析这些组件的具体思路。
打算先分析code的具体实现，最后总结实现思路
源代码加上注释有一千多行，还是蛮长的，这里就贴出主要代码，先从代码的入口构造函数开始吧
```javascript
    var root = window;
    // default options
    var DEFAULTS = {
        // 默认popper元素放置在reference元素的下面
        placement: 'bottom',

        gpuAcceleration: true,
        // 偏移量，popper元素在reference元素的左边或右边：offset为正就是popper往上偏移，为负往下偏移；
        //如果popper在reference的上边或者下边，为正就是右偏移，负数就是做偏移
        offset: 0,

        // 边界元素
        boundariesElement: 'viewport',

        //界和弹出框之间最小距离的像素大小
        boundariesPadding: 5,

        // popper will try to prevent overflow following this order,
        // by default, then, it could overflow on the left and on top of the boundariesElement
        preventOverflowOrder: ['left', 'right', 'top', 'bottom'],

        // the behavior used by flip to change the placement of the popper
        flipBehavior: 'flip',

        arrowElement: '[x-arrow]',

        arrowOffset: 0,

        // list of functions used to modify the offsets before they are applied to the popper
        modifiers: [ 'shift', 'offset', 'preventOverflow', 'keepTogether', 'arrow', 'flip', 'applyStyle'],

        modifiersIgnored: [],

        forceAbsolute: false
    };
    function Popper(reference, popper, options) {
        this._reference = reference.jquery ? reference[0] : reference;
        this.state = {};

        //如果popper元素是对象定义的或者没有定义，那就生成一个吧！
        var isNotDefined = typeof popper === 'undefined' || popper === null;
        var isConfig = popper && Object.prototype.toString.call(popper) === '[object Object]';
        if (isNotDefined || isConfig) {
            this._popper = this.parse(isConfig ? popper : {});
        }
        // otherwise, use the given HTMLElement as popper
        else {
            this._popper = popper.jquery ? popper[0] : popper;
        }

        // 自定义和默认的options进行合并
        this._options = Object.assign({}, DEFAULTS, options);

        // refactoring modifiers' list 将忽略的修改器从列表中移除掉，
        //在修改器等于applyStyle,给popper设置x-placement属性，popper和箭头的一些一些样式是通过属性选择器应用的
        this._options.modifiers = this._options.modifiers.map(function(modifier){
            // remove ignored modifiers
            if (this._options.modifiersIgnored.indexOf(modifier) !== -1) return;

            // set the x-placement attribute before everything else because it could be used to add margins to the popper
            // margins needs to be calculated to get the correct popper offsets
            if (modifier === 'applyStyle') {
                this._popper.setAttribute('x-placement', this._options.placement);
            }

            // return predefined modifier identified by string or keep the custom one
            return this.modifiers[modifier] || modifier;
        }.bind(this));

        //  确定popper元素定位是fixed还是absolute，然后给popper设置样式
        this.state.position = this._getPosition(this._popper, this._reference);
        setStyle(this._popper, { position: this.state.position, top: 0 });

        // 这个方法厉害了，一系列的坐标运算，最后再按照顺序循环调用modifiers方法。
        this.update();

        // setup event listeners, they will take care of update the position in specific situations
        this._setupEventListeners();
        return this;
    }

```
 
```javascript
    //生成popper元素以及箭头
    Popper.prototype.parse = function(config) {
        var defaultConfig = {
            tagName: 'div',
            classNames: [ 'popper' ],
            attributes: [],
            parent: root.document.body,
            content: '',
            contentType: 'text',
            arrowTagName: 'div',
            arrowClassNames: [ 'popper__arrow' ],
            arrowAttributes: [ 'x-arrow']
        };
        config = Object.assign({}, defaultConfig, config);

        var d = root.document;
        //生成popper元素，添加样式和属性
        var popper = d.createElement(config.tagName);
        addClassNames(popper, config.classNames);
        addAttributes(popper, config.attributes);
        //根据contentType将content添加到popper元素中
        if (config.contentType === 'node') {
            popper.appendChild(config.content.jquery ? config.content[0] : config.content);
        }else if (config.contentType === 'html') {
            popper.innerHTML = config.content;
        } else {
            popper.textContent = config.content;
        }

        //如果有箭头元素那就创建一个吧！再设置下样式和属性
        if (config.arrowTagName) {
            var arrow = d.createElement(config.arrowTagName);
            addClassNames(arrow, config.arrowClassNames);
            addAttributes(arrow, config.arrowAttributes);
            popper.appendChild(arrow);
        }

        //popper的父元素默认为body，这里对popper的父元素做了一些校验，如果类型字符串那就获取元素；有多个元素就获取第一个，没有就抛错
        var parent = config.parent.jquery ? config.parent[0] : config.parent;

        if (typeof parent === 'string') {
            parent = d.querySelectorAll(config.parent);
            if (parent.length > 1) {
                console.warn('WARNING: the given `parent` query(' + config.parent + ') matched more than one element, the first one will be used');
            }
            if (parent.length === 0) {
                throw 'ERROR: the given `parent` doesn\'t exists!';
            }
            parent = parent[0];
        }
        // if the given parent is a DOM nodes list or an array of nodes with more than one element,
        // the first one will be used as parent
        if (parent.length > 1 && parent instanceof Element === false) {
            console.warn('WARNING: you have passed as parent a list of elements, the first one will be used');
            parent = parent[0];
        }

        // 将popper添加进父元素
        parent.appendChild(popper);

        return popper;

        function addClassNames(element, classNames) {
            classNames.forEach(function(className) {
                element.classList.add(className);
            });
        }

        function addAttributes(element, attributes) {
            attributes.forEach(function(attribute) {
                element.setAttribute(attribute.split(':')[0], attribute.split(':')[1] || '');
            });
        }

    };
```
 
```javascript
    //这个方法是用来确定popper的定位是用fixed还是absolute
    //如果没有强制为absolute，那就看看引用元素的父元素是不是fixed。是popper定位为fixed，不是就absolute
    Popper.prototype._getPosition = function(popper, reference) {
        //这里这个container根本就没有用到
        var container = getOffsetParent(reference);

        if (this._options.forceAbsolute) {
            return 'absolute';
        }
        var isParentFixed = isFixed(reference, container);
        return isParentFixed ? 'fixed' : 'absolute';
    };
    //这里递归判断position是不是fixed
    //从引用元素的父元素开始往上层元素开始查找
   function isFixed(element) {
        if (element === root.document.body) {
            return false;
        }
        if (getStyleComputedProperty(element, 'position') === 'fixed') {
            return true;
        }
        return element.parentNode ? isFixed(element.parentNode) : element;
    }
    function getStyleComputedProperty(element, property) {
        var css = root.getComputedStyle(element, null);
        return css[property];
    }
```
 
```javascript
    //HTMLElement.offsetParent 一个对象引用，当前元素相对于该对象偏移
    //MDN：是一个只读属性，返回一个指向最近的（closest，指包含层级上的最近）包含该元素的定位元素。
    //如果没有定位的元素，则 offsetParent 为最近的 table, table cell 或根元素。
    //当元素的 style.display 设置为 "none" 时，offsetParent 返回 null。
    function getOffsetParent(element) {
        var offsetParent = element.offsetParent;
        return offsetParent === root.document.body || !offsetParent ? root.document.documentElement : offsetParent;
    }
```

```javascript
    Popper.prototype.update = function() {
        var data = { instance: this, styles: {} };
        // store placement inside the data object, modifiers will be able to edit `placement` if needed
        // and refer to _originalPlacement to know the original value
        data.placement = this._options.placement;
        data._originalPlacement = this._options.placement;

        // 这个方法计算popper和reference的坐标信息 offsets:{popper:{popper的坐标信息},reference:{引用元素的坐标信息}}
        data.offsets = this._getOffsets(this._popper, this._reference, data.placement);
        //
        data.boundaries = this._getBoundaries(data, this._options.boundariesPadding, this._options.boundariesElement);

        data = this.runModifiers(data, this._options.modifiers);

        //钩子函数
        if (typeof this.state.updateCallback === 'function') {
            this.state.updateCallback(data);
        }
    };
```

```javascript
//计算reference和popper的位置信息
Popper.prototype._getOffsets = function(popper, reference, placement) {
        //placement可能带有‘-start | -end‘，这里取上下左右大方向
        placement = placement.split('-')[0];
        var popperOffsets = {};

        popperOffsets.position = this.state.position;
        var isParentFixed = popperOffsets.position === 'fixed';

        //获取reference元素偏移信息，相对于popper.offsetParent的位置
        var referenceOffsets = getOffsetRectRelativeToCustomParent(reference, getOffsetParent(popper), isParentFixed);
        //获取popper轮廓大小，自身的大小加上margin
        var popperRect = getOuterSizes(popper);

        //这里根据placement计算popper的上下偏移量，使popper位置根据placement放置在reference上
        if (['right', 'left'].indexOf(placement) !== -1) {
            //使popper在左右位置上，popper和reference元素的中心点水平对齐
            popperOffsets.top = referenceOffsets.top + referenceOffsets.height / 2 - popperRect.height / 2;
            if (placement === 'left') {
                popperOffsets.left = referenceOffsets.left - popperRect.width;
            } else {
                popperOffsets.left = referenceOffsets.right;
            }
        } else {
            //在上下位置上，popper和reference元素的中心点垂直对齐
            popperOffsets.left = referenceOffsets.left + referenceOffsets.width / 2 - popperRect.width / 2;
            if (placement === 'top') {
                popperOffsets.top = referenceOffsets.top - popperRect.height;
            } else {
                popperOffsets.top = referenceOffsets.bottom;
            }
        }
        // Add width and height to our offsets object
        popperOffsets.width   = popperRect.width;
        popperOffsets.height  = popperRect.height;
        return {
            popper: popperOffsets,
            reference: referenceOffsets
        };
    };

    //获取reference元素相对于popper.offsetParent的位置
    //因为popper默认父元素为body，这里也可以理解为reference元素相对body的位置
    function getOffsetRectRelativeToCustomParent(element, parent, fixed) {
        var elementRect = getBoundingClientRect(element);
        var parentRect = getBoundingClientRect(parent);

        if (fixed) {
            var scrollParent = getScrollParent(parent);
            parentRect.top += scrollParent.scrollTop;
            parentRect.bottom += scrollParent.scrollTop;
            parentRect.left += scrollParent.scrollLeft;
            parentRect.right += scrollParent.scrollLeft;
        }

        var rect = {
            top: elementRect.top - parentRect.top ,
            left: elementRect.left - parentRect.left ,
            bottom: (elementRect.top - parentRect.top) + elementRect.height,
            right: (elementRect.left - parentRect.left) + elementRect.width,
            width: elementRect.width,
            height: elementRect.height
        };
        return rect;
    }
    //方法返回元素的大小及其相对于视口的位置
    function getBoundingClientRect(element) {
        //对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。
        //除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。
        var rect = element.getBoundingClientRect();

        // whether the IE version is lower than 11
        var isIE = navigator.userAgent.indexOf("MSIE") != -1;

        // fix ie document bounding top always 0 bug
        var rectTop = isIE && element.tagName === 'HTML'
            ? -element.scrollTop
            : rect.top;

        return {
            left: rect.left,
            top: rectTop,
            right: rect.right,
            bottom: rect.bottom,
            width: rect.right - rect.left,
            height: rect.bottom - rectTop
        };
    }
    //计算popper加上margin的大小
    function getOuterSizes(element) {
        //骚操作，隐藏占位计算大小
        var _display = element.style.display, _visibility = element.style.visibility;
        element.style.display = 'block'; element.style.visibility = 'hidden';
        var calcWidthToForceRepaint = element.offsetWidth;

        // original method
        var styles = root.getComputedStyle(element);
        var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
        var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
        var result = { width: element.offsetWidth + y, height: element.offsetHeight + x };

        // reset element styles
        element.style.display = _display; element.style.visibility = _visibility;
        return result;
    }
```
```javascript
    //获取边界元素的大小范围
    //如果边界元素是window：body或者html左上角到内容的右下角
    Popper.prototype._getBoundaries = function(data, padding, boundariesElement) {
        // NOTE: 1 DOM access here
        var boundaries = {};
        var width, height;
        if (boundariesElement === 'window') {
            var body = root.document.body,
                html = root.document.documentElement;

            height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
            width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );

            boundaries = {
                top: 0,
                right: width,
                bottom: height,
                left: 0
            };
        } else if (boundariesElement === 'viewport') {
            var offsetParent = getOffsetParent(this._popper);
            var scrollParent = getScrollParent(this._popper);
            var offsetParentRect = getOffsetRect(offsetParent);

            // Thanks the fucking native API, `document.body.scrollTop` & `document.documentElement.scrollTop`
            var getScrollTopValue = function (element) {
                return element == document.body ? Math.max(document.documentElement.scrollTop, document.body.scrollTop) : element.scrollTop;
            }
            var getScrollLeftValue = function (element) {
                return element == document.body ? Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) : element.scrollLeft;
            }

            // if the popper is fixed we don't have to substract scrolling from the boundaries
            var scrollTop = data.offsets.popper.position === 'fixed' ? 0 : getScrollTopValue(scrollParent);
            var scrollLeft = data.offsets.popper.position === 'fixed' ? 0 : getScrollLeftValue(scrollParent);
            boundaries = {
                top: 0 - (offsetParentRect.top - scrollTop),
                right: root.document.documentElement.clientWidth - (offsetParentRect.left - scrollLeft),
                bottom: root.document.documentElement.clientHeight - (offsetParentRect.top - scrollTop),
                left: 0 - (offsetParentRect.left - scrollLeft)
            };
        } else {
            if (getOffsetParent(this._popper) === boundariesElement) {
                boundaries = {
                    top: 0,
                    left: 0,
                    right: boundariesElement.clientWidth,
                    bottom: boundariesElement.clientHeight
                };
            } else {
                boundaries = getOffsetRect(boundariesElement);
            }
        }
        boundaries.left += padding;
        boundaries.right -= padding;
        boundaries.top = boundaries.top + padding;
        boundaries.bottom = boundaries.bottom - padding;
        return boundaries;
    };
```
```javascript
   //placement如果有end或start就调整一下popper的位置
   Popper.prototype.modifiers.shift = function(data) {
        var placement = data.placement;
        var basePlacement = placement.split('-')[0];
        var shiftVariation = placement.split('-')[1];

        // if shift shiftVariation is specified, run the modifier
        if (shiftVariation) {
            var reference = data.offsets.reference;
            var popper = getPopperClientRect(data.offsets.popper);

            var shiftOffsets = {
                y: {
                    start:  { top: reference.top },
                    end:    { top: reference.top + reference.height - popper.height }
                },
                x: {
                    start:  { left: reference.left },
                    end:    { left: reference.left + reference.width - popper.width }
                }
            };

            var axis = ['bottom', 'top'].indexOf(basePlacement) !== -1 ? 'x' : 'y';

            data.offsets.popper = Object.assign(popper, shiftOffsets[axis][shiftVariation]);
        }

        return data;
    };
    //根据自定义的offset，调整一下popper的位置，left就往上偏移。rigth往下偏移，top往左偏移，bottom往右偏移
    Popper.prototype.modifiers.offset = function(data) {
        var offset = this._options.offset;
        var popper  = data.offsets.popper;

        if (data.placement.indexOf('left') !== -1) {
            popper.top -= offset;
        }
        else if (data.placement.indexOf('right') !== -1) {
            popper.top += offset;
        }
        else if (data.placement.indexOf('top') !== -1) {
            popper.left -= offset;
        }
        else if (data.placement.indexOf('bottom') !== -1) {
            popper.left += offset;
        }
        return data;
    };
    //确保popper不会从边界溢出，确保popper元素在边界内
    Popper.prototype.modifiers.preventOverflow = function(data) {
        // preventOverflowOrder: ['left', 'right', 'top', 'bottom'],
        var order = this._options.preventOverflowOrder;
        var popper = getPopperClientRect(data.offsets.popper);

        var check = {
            left: function() {
                var left = popper.left;
                if (popper.left < data.boundaries.left) {
                    left = Math.max(popper.left, data.boundaries.left);
                }
                return { left: left };
            },
            right: function() {
                var left = popper.left;
                if (popper.right > data.boundaries.right) {
                    left = Math.min(popper.left, data.boundaries.right - popper.width);
                }
                return { left: left };
            },
            top: function() {
                var top = popper.top;
                if (popper.top < data.boundaries.top) {
                    top = Math.max(popper.top, data.boundaries.top);
                }
                return { top: top };
            },
            bottom: function() {
                var top = popper.top;
                if (popper.bottom > data.boundaries.bottom) {
                    top = Math.min(popper.top, data.boundaries.bottom - popper.height);
                }
                return { top: top };
            }
        };

        order.forEach(function(direction) {
            data.offsets.popper = Object.assign(popper, check[direction]());
        });

        return data;
    };
    //让popper元素跟随reference元素
    Popper.prototype.modifiers.keepTogether = function(data) {
        var popper  = getPopperClientRect(data.offsets.popper);
        var reference = data.offsets.reference;
        var f = Math.floor;

        if (popper.right < f(reference.left)) {
            data.offsets.popper.left = f(reference.left) - popper.width;
        }
        if (popper.left > f(reference.right)) {
            data.offsets.popper.left = f(reference.right);
        }
        if (popper.bottom < f(reference.top)) {
            data.offsets.popper.top = f(reference.top) - popper.height;
        }
        if (popper.top > f(reference.bottom)) {
            data.offsets.popper.top = f(reference.bottom);
        }

        return data;
    };
    //
    Popper.prototype.modifiers.arrow = function(data) {
        var arrow  = this._options.arrowElement;
        var arrowOffset = this._options.arrowOffset;

        // if the arrowElement is a string, suppose it's a CSS selector
        if (typeof arrow === 'string') {
            arrow = this._popper.querySelector(arrow);
        }

        // if arrow element is not found, don't run the modifier
        if (!arrow) {
            return data;
        }

        // the arrow element must be child of its popper
        if (!this._popper.contains(arrow)) {
            console.warn('WARNING: `arrowElement` must be child of its popper element!');
            return data;
        }

        // arrow depends on keepTogether in order to work
        if (!this.isModifierRequired(this.modifiers.arrow, this.modifiers.keepTogether)) {
            console.warn('WARNING: keepTogether modifier is required by arrow modifier in order to work, be sure to include it before arrow!');
            return data;
        }

        var arrowStyle  = {};
        var placement   = data.placement.split('-')[0];
        var popper      = getPopperClientRect(data.offsets.popper);
        var reference   = data.offsets.reference;
        var isVertical  = ['left', 'right'].indexOf(placement) !== -1;

        var len         = isVertical ? 'height' : 'width';
        var side        = isVertical ? 'top' : 'left';
        var translate   = isVertical ? 'translateY' : 'translateX';
        var altSide     = isVertical ? 'left' : 'top';
        var opSide      = isVertical ? 'bottom' : 'right';
        var arrowSize   = getOuterSizes(arrow)[len];

        //上面是一些arrow元素的判断，
        //下面这个两个判断就是当reference元素要从边界元素消失的时候，调整popper的位置
        // top/left side
        if (reference[opSide] - arrowSize < popper[side]) {
            data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowSize);
        }
        // bottom/right side
        if (reference[side] + arrowSize > popper[opSide]) {
            data.offsets.popper[side] += (reference[side] + arrowSize) - popper[opSide];
        }

        // compute center of the popper
        var center = reference[side] + (arrowOffset || (reference[len] / 2) - (arrowSize / 2));

        var sideValue = center - popper[side];

        // prevent arrow from being placed not contiguously to its popper
        sideValue = Math.max(Math.min(popper[len] - arrowSize - 8, sideValue), 8);
        arrowStyle[side] = sideValue;
        arrowStyle[altSide] = ''; // make sure to remove any old style from the arrow

        data.offsets.arrow = arrowStyle;
        data.arrowElement = arrow;

        return data;
    };
    Popper.prototype.modifiers.applyStyle = function(data) {
        
        // apply the final offsets to the popper
        // NOTE: 1 DOM access here
        var styles = {
            position: data.offsets.popper.position
        };

        // round top and left to avoid blurry text
        var left = Math.round(data.offsets.popper.left);
        var top = Math.round(data.offsets.popper.top);

        // if gpuAcceleration is set to true and transform is supported, we use `translate3d` to apply the position to the popper
        // we automatically use the supported prefixed version if needed
        var prefixedProperty;
        if (this._options.gpuAcceleration && (prefixedProperty = getSupportedPropertyName('transform'))) {
            styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
            styles.top = 0;
            styles.left = 0;
        }
        // othwerise, we use the standard `left` and `top` properties
        else {
            styles.left =left;
            styles.top = top;
        }

        // any property present in `data.styles` will be applied to the popper,
        // in this way we can make the 3rd party modifiers add custom styles to it
        // Be aware, modifiers could override the properties defined in the previous
        // lines of this modifier!
        Object.assign(styles, data.styles);

        setStyle(this._popper, styles);

        // set an attribute which will be useful to style the tooltip (use it to properly position its arrow)
        // NOTE: 1 DOM access here
        this._popper.setAttribute('x-placement', data.placement);

        // if the arrow modifier is required and the arrow style has been computed, apply the arrow style
        if (this.isModifierRequired(this.modifiers.applyStyle, this.modifiers.arrow) && data.offsets.arrow) {
            setStyle(data.arrowElement, data.offsets.arrow);
        }

        return data;
    };
```

 
```css
//element的css都带有’el-‘前缀这里就省略了，并且使用了sass的写法
.popper{
  //这一部分都是那个小箭头的样式,用伪元素边框显示了一个三角形，不管在上下左右它的位置都是居中的
  .popper__arrow,
  .popper__arrow::after {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }

  .popper__arrow {
    border-width: 6px;
    filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03))
  }

  .popper__arrow::after {
    content: " ";
    border-width: 6px;
  }

  &[x-placement^="top"] {
    margin-bottom: 12px;
  }

  &[x-placement^="top"] .popper__arrow {
    bottom: -6px;
    left: 50%;
    margin-right: 3px;
    border-top-color: #EBEEF5;
    border-bottom-width: 0;

    &::after {
        bottom: 1px;
        margin-left: -6px;
        border-top-color: #fff;
        border-bottom-width: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 12px;
  }

  &[x-placement^="bottom"] .popper__arrow {
    top: -6px;
    left: 50%;
    margin-right: 3px;
    border-top-width: 0;
    border-bottom-color: #EBEEF5;

    &::after {
      top: 1px;
      margin-left: -6px;
      border-top-width: 0;
      border-bottom-color: #FFFFFF;
    }
  }

  &[x-placement^="right"] {
    margin-left: 12px;
  }

  &[x-placement^="right"] .popper__arrow {
    top: 50%;
    left: -6px;
    margin-bottom: 3px;
    border-right-color: #EBEEF5;
    border-left-width: 0;

    &::after {
      bottom: -6px;
      left: 1px;
      border-right-color: #FFFFFF;
      border-left-width: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 12px;
  }

  &[x-placement^="left"] .popper__arrow {
    top: 50%;
    right: -6px;
    margin-bottom: 3px;
    border-right-width: 0;
    border-left-color: #EBEEF5;

    &::after {
      right: 1px;
      bottom: -6px;
      margin-left: -6px;
      border-right-width: 0;
      border-left-color: #FFFFFF;
    }
  }
}



```