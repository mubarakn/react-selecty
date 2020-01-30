'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".index_ReactSelect-control__205TF {\r\n    background-color: #FFF;\r\n}\r\n\r\n.index_ReactSelect-input__2wZuH {\r\n    border: none;\r\n    padding: 4px;\r\n}\r\n\r\n.index_ReactSelect-input__2wZuH:focus {\r\n    outline: none;\r\n}\r\n\r\n.index_ReactSelect-item__2q7YI {\r\n    padding: 4px;\r\n}\r\n\r\n.index_ReactSelect-item__2q7YI:hover {\r\n    background-color: #EEE;\r\n    cursor: pointer;\r\n}\r\n\r\n.index_ReactSelect-selected__35h6W {\r\n    background-color: hsl(197, 78%, 52%);\r\n    color: #FFF;\r\n}";
styleInject(css);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

function Selective(_ref) {
    var _ref$height = _ref.height,
        height = _ref$height === undefined ? 300 : _ref$height,
        _ref$itemHeight = _ref.itemHeight,
        itemHeight = _ref$itemHeight === undefined ? 30 : _ref$itemHeight,
        _ref$source = _ref.source,
        source = _ref$source === undefined ? [] : _ref$source,
        _ref$renderAhead = _ref.renderAhead,
        renderAhead = _ref$renderAhead === undefined ? 2 : _ref$renderAhead,
        _ref$hideColumns = _ref.hideColumns,
        hideColumns = _ref$hideColumns === undefined ? [] : _ref$hideColumns,
        _ref$classPrefix = _ref.classPrefix,
        classPrefix = _ref$classPrefix === undefined ? 'ReactSelect' : _ref$classPrefix,
        _ref$placeholder = _ref.placeholder,
        placeholder = _ref$placeholder === undefined ? "Search" : _ref$placeholder,
        onSelect = _ref.onSelect,
        textColumn = _ref.textColumn,
        _ref$textValue = _ref.textValue,
        textValue = _ref$textValue === undefined ? "100" : _ref$textValue;

    var controlRef = React.useRef();
    var inputRef = React.useRef();
    var scrollRef = React.useRef();

    var _useState = React.useState(0),
        _useState2 = slicedToArray(_useState, 2),
        scrollTop = _useState2[0],
        setScrollTop = _useState2[1];

    var _useState3 = React.useState(0),
        _useState4 = slicedToArray(_useState3, 2),
        selectedNode = _useState4[0],
        setSelectedNode = _useState4[1];

    var _useState5 = React.useState(''),
        _useState6 = slicedToArray(_useState5, 2),
        query = _useState6[0],
        setQuery = _useState6[1];

    var _useState7 = React.useState(false),
        _useState8 = slicedToArray(_useState7, 2),
        showList = _useState8[0],
        setShowList = _useState8[1];

    var _useState9 = React.useState(''),
        _useState10 = slicedToArray(_useState9, 2),
        presetValue = _useState10[0],
        setPresetValue = _useState10[1];

    var onScroll = function onScroll(e) {
        setScrollTop(e.target.scrollTop);
    };

    var onDocumentClick = function onDocumentClick(e) {
        var targetElement = e.target;

        do {
            if (targetElement === controlRef.current) {
                return;
            }

            targetElement = targetElement.parentNode;
        } while (targetElement);

        setShowList(false);
    };

    React.useEffect(function () {
        inputRef.current.focus();
        document.addEventListener('click', onDocumentClick);
        return function () {
            return document.removeEventListener('click', onDocumentClick);
        };
    }, []);

    React.useEffect(function () {
        if (showList) {
            scrollRef.current.scrollTop = selectedNode * itemHeight;
            offsetY = selectedNode * itemHeight;

            if (query === textValue) {
                findAndScroll(textValue);
            }

            scrollRef.current.addEventListener('scroll', onScroll);
            return function () {
                if (scrollRef.current) {
                    scrollRef.current.removeEventListener('scroll', onScroll);
                }
            };
        }
    }, [showList]);

    var startNode = Math.floor(scrollTop / itemHeight);
    var offsetY = itemHeight * startNode;

    var visibleNodeCount = Math.ceil(height / itemHeight);
    visibleNodeCount = Math.min(source.length - startNode, visibleNodeCount);

    var scrollHeight = itemHeight * source.length;

    var rows = source.slice(startNode, startNode + visibleNodeCount + renderAhead);

    var handleKeyDown = function handleKeyDown(e) {
        if (e.keyCode === 38) {
            //up
            if (!showList) {
                setShowList(true);
                return;
            }

            var newSelectedNode = selectedNode - 1;
            if (newSelectedNode >= 0) {
                setSelectedNode(newSelectedNode);
                if (newSelectedNode < startNode) {
                    var itemCountToScroll = startNode - newSelectedNode;
                    var newScrollTop = scrollTop - itemCountToScroll * itemHeight;
                    scrollRef.current.scrollTop = newScrollTop;
                }
            }
            e.preventDefault();
        } else if (e.keyCode === 40) {
            //down
            if (!showList) {
                setShowList(true);
                return;
            }

            var _newSelectedNode = selectedNode + 1;
            if (_newSelectedNode < source.length) {
                setSelectedNode(_newSelectedNode);
                var visibleMaxIndex = startNode + visibleNodeCount;
                if (_newSelectedNode >= visibleMaxIndex) {
                    var _itemCountToScroll = _newSelectedNode - visibleMaxIndex + 1;
                    var _newScrollTop = scrollTop + _itemCountToScroll * itemHeight;
                    scrollRef.current.scrollTop = _newScrollTop;
                } else if (_newSelectedNode < startNode) {
                    var _newScrollTop2 = _newSelectedNode * itemHeight;
                    scrollRef.current.scrollTop = _newScrollTop2;
                }
            }
            e.preventDefault();
        } else if (e.keyCode === 13) {
            //enter
            var elem = source[selectedNode];
            setText(elem);
            setShowList(false);
        }
    };

    var setText = function setText(elem) {
        if (typeof elem === 'string') {
            setQuery(elem);
        } else {
            var obj = Object(elem);
            setQuery(obj[textColumn]);
        }

        if (onSelect) {
            onSelect(elem);
        }
    };

    var handleChange = function handleChange(e) {
        var value = e.target.value;
        findAndScroll(value);
    };

    var findAndScroll = function findAndScroll(value) {
        setQuery(value);

        var newStartNode = source.findIndex(function (d) {
            if (typeof d === 'string') {
                return d.toUpperCase().includes(String(value).toUpperCase());
            } else if ((typeof d === 'undefined' ? 'undefined' : _typeof(d)) === 'object') {
                var obj = Object(d);
                var keys = Object.keys(obj).filter(function (k) {
                    return !hideColumns.includes(k);
                });
                for (var i = 0; i < keys.length; i++) {
                    var k = keys[i];
                    return String(obj[k]).toUpperCase().includes(String(value).toUpperCase());
                }
            }
            return false;
        });
        setSelectedNode(newStartNode);
        if (scrollRef.current) {
            scrollRef.current.scrollTop = newStartNode * itemHeight;
        }
    };

    var handleFocus = function handleFocus(e) {
        setShowList(true);
        inputRef.current.setSelectionRange(0, inputRef.current.value.length);
    };

    return React__default.createElement(
        'div',
        { style: { position: 'relative' }, ref: controlRef },
        React__default.createElement('input', {
            ref: inputRef,
            type: 'text',
            placeholder: placeholder,
            onKeyDown: handleKeyDown,
            onChange: handleChange,
            onFocus: handleFocus,
            value: query,
            className: classPrefix + '-input'
        }),
        showList && React__default.createElement(
            'div',
            { style: { height: height, overflow: 'auto', position: 'absolute', top: '100%', width: '100%' }, ref: scrollRef, className: classPrefix + '-control' },
            React__default.createElement(
                'div',
                { style: { overflow: 'hidden', height: scrollHeight, position: 'relative' } },
                React__default.createElement(
                    'div',
                    { style: { willChange: 'transform', transform: 'translateY(' + offsetY + 'px)' } },
                    rows.map(function (row, index) {
                        if (index + startNode !== selectedNode) {
                            return React__default.createElement(
                                'div',
                                {
                                    key: index,
                                    style: { height: itemHeight },
                                    className: classPrefix + '-item',
                                    onClick: function onClick(e) {
                                        if (onSelect) {
                                            onSelect(row);
                                            setShowList(false);
                                            setText(row);
                                            setSelectedNode(index + startNode);
                                        }
                                    } },
                                row
                            );
                        } else {
                            return React__default.createElement(
                                'div',
                                {
                                    key: index,
                                    style: { height: itemHeight },
                                    className: classPrefix + '-selected ' + classPrefix + '-item',
                                    onClick: function onClick(e) {
                                        if (onSelect) {
                                            onSelect(row);
                                            setShowList(false);
                                            setText(row);
                                            setSelectedNode(index + startNode);
                                        }
                                    } },
                                row
                            );
                        }
                    })
                )
            )
        )
    );
}

module.exports = Selective;
//# sourceMappingURL=index.js.map
