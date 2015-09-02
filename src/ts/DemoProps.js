var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../typings/react/react.d.ts" />
var React = require('react');
var DemoProps = (function () {
    function DemoProps() {
    }
    return DemoProps;
})();
var Demo = (function (_super) {
    __extends(Demo, _super);
    function Demo(props) {
        _super.call(this, props);
        this.foo = 42;
        console.log('hi');
    }
    Demo.prototype.render = function () {
        return (React.createElement("div", null, "Hello world!"));
    };
    return Demo;
})(React.Component);
