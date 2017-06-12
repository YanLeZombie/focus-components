'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mixin = exports.component = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _translation = require('focus-core/translation');

var _isReactClassComponent = require('../../utils/is-react-class-component');

var _infiniteScroll = require('../mixin/infinite-scroll');

var _referenceProperty = require('../../common/mixin/reference-property');

var _referenceProperty2 = _interopRequireDefault(_referenceProperty);

var _mdlBehaviour = require('../../common/mixin/mdl-behaviour');

var _mdlBehaviour2 = _interopRequireDefault(_mdlBehaviour);

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // Dependencies

//Add a ref to the props if the component is not pure add nothing in the other case.


// Table class.
var TABLE_CSS_CLASS = 'mdl-data-table mdl-js-data-table mdl-shadow--2dp ';
var TABLE_CELL_CLASS = 'mdl-data-table__cell--non-numeric';

// Mixins

// Components

var tableMixin = {
    /**
     * React tag name.
     */
    displayName: 'Table',

    /**
     * Mixin dependancies.
     */
    mixins: [_infiniteScroll.mixin, _referenceProperty2.default, _mdlBehaviour2.default],
    /** inheriteddoc */
    getDefaultProps: function getDefaultProps() {
        return {
            data: [],
            idField: 'id',
            isLoading: false,
            operationList: [],
            isSelectable: false
        };
    },

    /** inheriteddoc */
    proptypes: {
        data: (0, _types2.default)('array'),
        isSelectable: (0, _types2.default)('bool'),
        onLineClick: (0, _types2.default)('func'),
        idField: (0, _types2.default)('string'),
        lineComponent: (0, _types2.default)('func').isRequired,
        operationList: (0, _types2.default)('array'),
        columns: (0, _types2.default)('object'),
        sortColumn: (0, _types2.default)('func'),
        isloading: (0, _types2.default)('bool'),
        loader: (0, _types2.default)('func')
    },
    /**
     * Render the table header.
     * @return {Component} - Render the table header.
     */
    _renderTableHeader: function _renderTableHeader() {
        var columns = this.props.columns;

        return _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
                'tr',
                null,
                (0, _lodash.reduce)(columns, this._renderColumnHeader, [])
            )
        );
    },

    /**
     * Build a function which is called when there is a click on a table column.
     * @param  {string} column - Column name.
     * @param  {string} order  - The order config.
     * @return {function} - The function to be called when there is a click on it.
     */
    _sortColumnAction: function _sortColumnAction(column, order) {
        var currentComponent = this;
        return function (event) {
            event.preventDefault();
            currentComponent.props.sortColumn(column, order);
        };
    },

    /**
     * Render the column header.
     * @param {array} accumulator - The array co,ntaining the accumulating component.
     * @param  {object} colProperties - The column properties.
     * @param  {string} name - The column name.
     * @return {Component} - The component header.
     */
    _renderColumnHeader: function _renderColumnHeader(accumulator, colProperties, name) {
        var sort = void 0;
        if (!this.props.isEdit && !colProperties.noSort) {
            var order = colProperties.sort ? colProperties.sort : 'asc';
            var iconName = 'asc' === order ? 'arrow_drop_up' : 'arrow_drop_down';
            var icon = _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                iconName
            );
            sort = _react2.default.createElement(
                'a',
                { className: 'sort', 'data-bypass': true, 'data-name': name, href: '#', onClick: this._sortColumnAction(name, 'asc' === order ? 'desc' : 'asc') },
                icon
            );
        }
        accumulator.push(_react2.default.createElement(
            'th',
            { className: TABLE_CELL_CLASS, key: colProperties.label },
            (0, _translation.translate)(colProperties.label),
            sort
        ));
        return accumulator;
    },

    /**
     * Render the tbody tag and the content.
     * @return {Component} - The component containing the tbody.
     */
    _renderTableBody: function _renderTableBody() {
        var _this = this;

        var _props = this.props,
            data = _props.data,
            TableLineComponent = _props.LineComponent,
            idField = _props.idField;

        var reference = this._getReference();
        return _react2.default.createElement(
            'tbody',
            null,
            data.map(function (line, idx) {
                var _props2 = _this.props,
                    data = _props2.data,
                    otherLineProps = _objectWithoutProperties(_props2, ['data']);

                var tableBodyFinalProps = (0, _isReactClassComponent.addRefToPropsIfNotPure)(TableLineComponent, _extends({
                    className: TABLE_CELL_CLASS,
                    data: line,
                    key: line[idField],
                    reference: reference
                }, otherLineProps), '' + _isReactClassComponent.LINE + idx);
                return _react2.default.createElement(TableLineComponent, tableBodyFinalProps);
            })
        );
    },

    /**
     * Render the loading table
     * @return {Component} - The table in the loading mode.
     */
    _renderLoading: function _renderLoading() {
        var _props3 = this.props,
            isLoading = _props3.isLoading,
            loader = _props3.loader;

        if (isLoading) {
            if (loader) {
                return loader();
            }
            return _react2.default.createElement(
                'tbody',
                { className: 'table-loading' },
                _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                        'td',
                        null,
                        '' + (0, _translation.translate)('list.loading')
                    )
                )
            );
        }
    },

    /**
     * Render the manual fetch mode for the table.
     * @return {Component} - The footer component when the mode is manual fetch , a show mode button is shown.
     */
    _renderManualFetch: function _renderManualFetch() {
        var _props4 = this.props,
            isManualFetch = _props4.isManualFetch,
            hasMoreData = _props4.hasMoreData;

        if (isManualFetch && hasMoreData) {
            return _react2.default.createElement(
                'tfoot',
                { className: 'table-manual-fetch' },
                _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                        'td',
                        { colSpan: (0, _lodash.keys)(this.props.columns).length },
                        _react2.default.createElement(_button2.default, { handleOnClick: this.fetchNextPage, label: 'list.button.showMore', type: 'button' })
                    )
                )
            );
        }
    },


    /**
     * Render the list.
     * @return {XML} the render of the table list.
     */
    render: function render() {
        var SELECTABLE_CSS = this.props.isSelectable ? 'mdl-data-table--selectable' : '';
        return _react2.default.createElement(
            'table',
            { className: TABLE_CSS_CLASS + ' ' + SELECTABLE_CSS, role: 'presentation' },
            this._renderTableHeader(),
            this._renderTableBody(),
            this._renderLoading(),
            this._renderManualFetch()
        );
    }
};

var builtComp = (0, _builder2.default)(tableMixin);
var component = builtComp.component,
    mixin = builtComp.mixin;
exports.component = component;
exports.mixin = mixin;
exports.default = builtComp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJUQUJMRV9DU1NfQ0xBU1MiLCJUQUJMRV9DRUxMX0NMQVNTIiwidGFibGVNaXhpbiIsImRpc3BsYXlOYW1lIiwibWl4aW5zIiwiZ2V0RGVmYXVsdFByb3BzIiwiZGF0YSIsImlkRmllbGQiLCJpc0xvYWRpbmciLCJvcGVyYXRpb25MaXN0IiwiaXNTZWxlY3RhYmxlIiwicHJvcHR5cGVzIiwib25MaW5lQ2xpY2siLCJsaW5lQ29tcG9uZW50IiwiaXNSZXF1aXJlZCIsImNvbHVtbnMiLCJzb3J0Q29sdW1uIiwiaXNsb2FkaW5nIiwibG9hZGVyIiwiX3JlbmRlclRhYmxlSGVhZGVyIiwicHJvcHMiLCJfcmVuZGVyQ29sdW1uSGVhZGVyIiwiX3NvcnRDb2x1bW5BY3Rpb24iLCJjb2x1bW4iLCJvcmRlciIsImN1cnJlbnRDb21wb25lbnQiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiYWNjdW11bGF0b3IiLCJjb2xQcm9wZXJ0aWVzIiwibmFtZSIsInNvcnQiLCJpc0VkaXQiLCJub1NvcnQiLCJpY29uTmFtZSIsImljb24iLCJwdXNoIiwibGFiZWwiLCJfcmVuZGVyVGFibGVCb2R5IiwiVGFibGVMaW5lQ29tcG9uZW50IiwiTGluZUNvbXBvbmVudCIsInJlZmVyZW5jZSIsIl9nZXRSZWZlcmVuY2UiLCJtYXAiLCJsaW5lIiwiaWR4Iiwib3RoZXJMaW5lUHJvcHMiLCJ0YWJsZUJvZHlGaW5hbFByb3BzIiwiY2xhc3NOYW1lIiwia2V5IiwiX3JlbmRlckxvYWRpbmciLCJfcmVuZGVyTWFudWFsRmV0Y2giLCJpc01hbnVhbEZldGNoIiwiaGFzTW9yZURhdGEiLCJsZW5ndGgiLCJmZXRjaE5leHRQYWdlIiwicmVuZGVyIiwiU0VMRUNUQUJMRV9DU1MiLCJidWlsdENvbXAiLCJjb21wb25lbnQiLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FB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V0FBckIsRUFBa0M7QUFDOUIsbUJBQ0k7QUFBQTtBQUFBLGtCQUFPLFdBQVUsb0JBQWpCO0FBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLDBCQUFJLFNBQVMsa0JBQUssS0FBS2pDLEtBQUwsQ0FBV0wsT0FBaEIsRUFBeUJ1QyxNQUF0QztBQUNJLDBFQUFRLGVBQWUsS0FBS0MsYUFBNUIsRUFBMkMsT0FBTSxzQkFBakQsRUFBd0UsTUFBSyxRQUE3RTtBQURKO0FBREo7QUFESixhQURKO0FBU0g7QUFDSixLQXBJYzs7O0FBc0lmOzs7O0FBSUFDLFVBMUllLG9CQTBJTjtBQUNMLFlBQU1DLGlCQUFpQixLQUFLckMsS0FBTCxDQUFXVixZQUFYLEdBQTBCLDRCQUExQixHQUF5RCxFQUFoRjtBQUNBLGVBQ0k7QUFBQTtBQUFBLGNBQU8sV0FBY1YsZUFBZCxTQUFpQ3lELGNBQXhDLEVBQTBELE1BQUssY0FBL0Q7QUFDSyxpQkFBS3RDLGtCQUFMLEVBREw7QUFFSyxpQkFBS21CLGdCQUFMLEVBRkw7QUFHSyxpQkFBS1ksY0FBTCxFQUhMO0FBSUssaUJBQUtDLGtCQUFMO0FBSkwsU0FESjtBQVFIO0FBcEpjLENBQW5COztBQXdKQSxJQUFNTyxZQUFZLHVCQUFReEQsVUFBUixDQUFsQjtJQUNPeUQsUyxHQUFvQkQsUyxDQUFwQkMsUztJQUFXQyxLLEdBQVNGLFMsQ0FBVEUsSztRQUdkRCxTLEdBQUFBLFM7UUFDQUMsSyxHQUFBQSxLO2tCQUVXRixTIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlcGVuZGVuY2llc1xyXG5cclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmltcG9ydCB0eXBlcyBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGtleXMsIHJlZHVjZSB9IGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQge3RyYW5zbGF0ZX0gZnJvbSAnZm9jdXMtY29yZS90cmFuc2xhdGlvbic7XHJcbi8vQWRkIGEgcmVmIHRvIHRoZSBwcm9wcyBpZiB0aGUgY29tcG9uZW50IGlzIG5vdCBwdXJlIGFkZCBub3RoaW5nIGluIHRoZSBvdGhlciBjYXNlLlxyXG5pbXBvcnQgeyBhZGRSZWZUb1Byb3BzSWZOb3RQdXJlLCBMSU5FIH0gZnJvbSAnLi4vLi4vdXRpbHMvaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50JztcclxuXHJcbi8vIFRhYmxlIGNsYXNzLlxyXG5jb25zdCBUQUJMRV9DU1NfQ0xBU1MgPSAnbWRsLWRhdGEtdGFibGUgbWRsLWpzLWRhdGEtdGFibGUgbWRsLXNoYWRvdy0tMmRwICc7XHJcbmNvbnN0IFRBQkxFX0NFTExfQ0xBU1MgPSAnbWRsLWRhdGEtdGFibGVfX2NlbGwtLW5vbi1udW1lcmljJztcclxuXHJcbi8vIE1peGluc1xyXG5cclxuaW1wb3J0IHttaXhpbiBhcyBpbmZpbml0ZVNjcm9sbE1peGlufSBmcm9tICcuLi9taXhpbi9pbmZpbml0ZS1zY3JvbGwnO1xyXG5pbXBvcnQgcmVmZXJlbmNlTWl4aW4gZnJvbSAnLi4vLi4vY29tbW9uL21peGluL3JlZmVyZW5jZS1wcm9wZXJ0eSc7XHJcbmltcG9ydCBtZGxCZWhhdmlvdXIgZnJvbSAnLi4vLi4vY29tbW9uL21peGluL21kbC1iZWhhdmlvdXInO1xyXG5cclxuLy8gQ29tcG9uZW50c1xyXG5cclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2J1dHRvbic7XHJcblxyXG5jb25zdCB0YWJsZU1peGluID0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFjdCB0YWcgbmFtZS5cclxuICAgICAqL1xyXG4gICAgZGlzcGxheU5hbWU6ICdUYWJsZScsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNaXhpbiBkZXBlbmRhbmNpZXMuXHJcbiAgICAgKi9cclxuICAgIG1peGluczogW2luZmluaXRlU2Nyb2xsTWl4aW4sIHJlZmVyZW5jZU1peGluLCBtZGxCZWhhdmlvdXJdLFxyXG4gICAgLyoqIGluaGVyaXRlZGRvYyAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRhdGE6IFtdLFxyXG4gICAgICAgICAgICBpZEZpZWxkOiAnaWQnLFxyXG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb25MaXN0OiBbXSxcclxuICAgICAgICAgICAgaXNTZWxlY3RhYmxlOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqIGluaGVyaXRlZGRvYyAqL1xyXG4gICAgcHJvcHR5cGVzOiB7XHJcbiAgICAgICAgZGF0YTogdHlwZXMoJ2FycmF5JyksXHJcbiAgICAgICAgaXNTZWxlY3RhYmxlOiB0eXBlcygnYm9vbCcpLFxyXG4gICAgICAgIG9uTGluZUNsaWNrOiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIGlkRmllbGQ6IHR5cGVzKCdzdHJpbmcnKSxcclxuICAgICAgICBsaW5lQ29tcG9uZW50OiB0eXBlcygnZnVuYycpLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgb3BlcmF0aW9uTGlzdDogdHlwZXMoJ2FycmF5JyksXHJcbiAgICAgICAgY29sdW1uczogdHlwZXMoJ29iamVjdCcpLFxyXG4gICAgICAgIHNvcnRDb2x1bW46IHR5cGVzKCdmdW5jJyksXHJcbiAgICAgICAgaXNsb2FkaW5nOiB0eXBlcygnYm9vbCcpLFxyXG4gICAgICAgIGxvYWRlcjogdHlwZXMoJ2Z1bmMnKVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIHRoZSB0YWJsZSBoZWFkZXIuXHJcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gUmVuZGVyIHRoZSB0YWJsZSBoZWFkZXIuXHJcbiAgICAgKi9cclxuICAgIF9yZW5kZXJUYWJsZUhlYWRlcigpIHtcclxuICAgICAgICBjb25zdCB7Y29sdW1uc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiA8dGhlYWQ+PHRyPntyZWR1Y2UoY29sdW1ucywgdGhpcy5fcmVuZGVyQ29sdW1uSGVhZGVyLCBbXSl9PC90cj48L3RoZWFkPjtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEJ1aWxkIGEgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIHdoZW4gdGhlcmUgaXMgYSBjbGljayBvbiBhIHRhYmxlIGNvbHVtbi5cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gY29sdW1uIC0gQ29sdW1uIG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IG9yZGVyICAtIFRoZSBvcmRlciBjb25maWcuXHJcbiAgICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlcmUgaXMgYSBjbGljayBvbiBpdC5cclxuICAgICAqL1xyXG4gICAgX3NvcnRDb2x1bW5BY3Rpb24oY29sdW1uLCBvcmRlcikge1xyXG4gICAgICAgIGxldCBjdXJyZW50Q29tcG9uZW50ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRDb21wb25lbnQucHJvcHMuc29ydENvbHVtbihjb2x1bW4sIG9yZGVyKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIHRoZSBjb2x1bW4gaGVhZGVyLlxyXG4gICAgICogQHBhcmFtIHthcnJheX0gYWNjdW11bGF0b3IgLSBUaGUgYXJyYXkgY28sbnRhaW5pbmcgdGhlIGFjY3VtdWxhdGluZyBjb21wb25lbnQuXHJcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGNvbFByb3BlcnRpZXMgLSBUaGUgY29sdW1uIHByb3BlcnRpZXMuXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IG5hbWUgLSBUaGUgY29sdW1uIG5hbWUuXHJcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gVGhlIGNvbXBvbmVudCBoZWFkZXIuXHJcbiAgICAgKi9cclxuICAgIF9yZW5kZXJDb2x1bW5IZWFkZXIoYWNjdW11bGF0b3IsIGNvbFByb3BlcnRpZXMsIG5hbWUpIHtcclxuICAgICAgICBsZXQgc29ydDtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuaXNFZGl0ICYmICFjb2xQcm9wZXJ0aWVzLm5vU29ydCkge1xyXG4gICAgICAgICAgICBjb25zdCBvcmRlciA9IGNvbFByb3BlcnRpZXMuc29ydCA/IGNvbFByb3BlcnRpZXMuc29ydCA6ICdhc2MnO1xyXG4gICAgICAgICAgICBjb25zdCBpY29uTmFtZSA9ICdhc2MnID09PSBvcmRlciA/ICdhcnJvd19kcm9wX3VwJyA6ICdhcnJvd19kcm9wX2Rvd24nO1xyXG4gICAgICAgICAgICBjb25zdCBpY29uID0gPGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucyc+e2ljb25OYW1lfTwvaT47XHJcbiAgICAgICAgICAgIHNvcnQgPSA8YSBjbGFzc05hbWU9J3NvcnQnIGRhdGEtYnlwYXNzIGRhdGEtbmFtZT17bmFtZX0gaHJlZj0nIycgb25DbGljaz17dGhpcy5fc29ydENvbHVtbkFjdGlvbihuYW1lLCAoJ2FzYycgPT09IG9yZGVyID8gJ2Rlc2MnIDogJ2FzYycpKX0+e2ljb259PC9hPjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYWNjdW11bGF0b3IucHVzaCg8dGggY2xhc3NOYW1lPXtUQUJMRV9DRUxMX0NMQVNTfSBrZXk9e2NvbFByb3BlcnRpZXMubGFiZWx9Pnt0cmFuc2xhdGUoY29sUHJvcGVydGllcy5sYWJlbCl9e3NvcnR9PC90aD4pO1xyXG4gICAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgdGJvZHkgdGFnIGFuZCB0aGUgY29udGVudC5cclxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBUaGUgY29tcG9uZW50IGNvbnRhaW5pbmcgdGhlIHRib2R5LlxyXG4gICAgICovXHJcbiAgICBfcmVuZGVyVGFibGVCb2R5KCkge1xyXG4gICAgICAgIGNvbnN0IHtkYXRhLCBMaW5lQ29tcG9uZW50OiBUYWJsZUxpbmVDb21wb25lbnQsIGlkRmllbGR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCByZWZlcmVuY2UgPSB0aGlzLl9nZXRSZWZlcmVuY2UoKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICB7ZGF0YS5tYXAoKGxpbmUsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtkYXRhLCAuLi5vdGhlckxpbmVQcm9wc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhYmxlQm9keUZpbmFsUHJvcHMgPSBhZGRSZWZUb1Byb3BzSWZOb3RQdXJlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUYWJsZUxpbmVDb21wb25lbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogVEFCTEVfQ0VMTF9DTEFTUyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGxpbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGxpbmVbaWRGaWVsZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5vdGhlckxpbmVQcm9wc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBgJHtMSU5FfSR7aWR4fWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8VGFibGVMaW5lQ29tcG9uZW50IHsuLi50YWJsZUJvZHlGaW5hbFByb3BzfSAvPjtcclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIGxvYWRpbmcgdGFibGVcclxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBUaGUgdGFibGUgaW4gdGhlIGxvYWRpbmcgbW9kZS5cclxuICAgICAqL1xyXG4gICAgX3JlbmRlckxvYWRpbmcoKSB7XHJcbiAgICAgICAgY29uc3Qge2lzTG9hZGluZywgbG9hZGVyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKGlzTG9hZGluZykge1xyXG4gICAgICAgICAgICBpZiAobG9hZGVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9hZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzc05hbWU9eyd0YWJsZS1sb2FkaW5nJ30+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e2Ake3RyYW5zbGF0ZSgnbGlzdC5sb2FkaW5nJyl9YH08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgbWFudWFsIGZldGNoIG1vZGUgZm9yIHRoZSB0YWJsZS5cclxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBUaGUgZm9vdGVyIGNvbXBvbmVudCB3aGVuIHRoZSBtb2RlIGlzIG1hbnVhbCBmZXRjaCAsIGEgc2hvdyBtb2RlIGJ1dHRvbiBpcyBzaG93bi5cclxuICAgICAqL1xyXG4gICAgX3JlbmRlck1hbnVhbEZldGNoKCkge1xyXG4gICAgICAgIGNvbnN0IHtpc01hbnVhbEZldGNoLCBoYXNNb3JlRGF0YX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChpc01hbnVhbEZldGNoICYmIGhhc01vcmVEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8dGZvb3QgY2xhc3NOYW1lPSd0YWJsZS1tYW51YWwtZmV0Y2gnPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49e2tleXModGhpcy5wcm9wcy5jb2x1bW5zKS5sZW5ndGh9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBoYW5kbGVPbkNsaWNrPXt0aGlzLmZldGNoTmV4dFBhZ2V9IGxhYmVsPSdsaXN0LmJ1dHRvbi5zaG93TW9yZScgdHlwZT0nYnV0dG9uJyAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICA8L3Rmb290PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIGxpc3QuXHJcbiAgICAgKiBAcmV0dXJuIHtYTUx9IHRoZSByZW5kZXIgb2YgdGhlIHRhYmxlIGxpc3QuXHJcbiAgICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBTRUxFQ1RBQkxFX0NTUyA9IHRoaXMucHJvcHMuaXNTZWxlY3RhYmxlID8gJ21kbC1kYXRhLXRhYmxlLS1zZWxlY3RhYmxlJyA6ICcnO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9e2Ake1RBQkxFX0NTU19DTEFTU30gJHtTRUxFQ1RBQkxFX0NTU31gfSByb2xlPSdwcmVzZW50YXRpb24nPlxyXG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlclRhYmxlSGVhZGVyKCl9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyVGFibGVCb2R5KCl9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyTG9hZGluZygpfVxyXG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlck1hbnVhbEZldGNoKCl9XHJcbiAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5jb25zdCBidWlsdENvbXAgPSBidWlsZGVyKHRhYmxlTWl4aW4pO1xyXG5jb25zdCB7Y29tcG9uZW50LCBtaXhpbn0gPSBidWlsdENvbXA7XHJcblxyXG5leHBvcnQge1xyXG4gICAgY29tcG9uZW50LFxyXG4gICAgbWl4aW5cclxufVxyXG5leHBvcnQgZGVmYXVsdCBidWlsdENvbXA7Il19