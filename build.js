'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      searchText: '',
      users: [],
      submit: false
    };
    return _this;
  }

  _createClass(App, [{
    key: 'onChangeHandle',
    value: function onChangeHandle(event) {
      this.setState({ searchText: event.target.value });
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(event) {
      var _this2 = this;

      event.preventDefault();
      var searchText = this.state.searchText;

      var url = 'https://api.github.com/search/users?q=' + searchText;
      fetch(url).then(function (response) {
        return response.json();
      }).then(function (responseJson) {
        return _this2.setState({ users: responseJson.items, submit: true });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'header',
          { className: 'header' },
          React.createElement(
            'div',
            { className: 'header__container' },
            React.createElement(
              'div',
              { className: 'header__logo' },
              React.createElement('img', { className: 'logo__picture', src: 'img/git.png' }),
              React.createElement(
                'div',
                null,
                React.createElement(
                  'h1',
                  { className: 'logo__title' },
                  'GitHub User Finder'
                ),
                React.createElement(
                  'p',
                  { className: 'logo__describe' },
                  'Search users via ',
                  React.createElement(
                    'a',
                    { href: 'https://developer.github.com/v3/', target: 'blank', className: 'logo__link' },
                    'the GitHub Api'
                  )
                )
              )
            ),
            React.createElement(
              'form',
              { onSubmit: function onSubmit(event) {
                  return _this3.onSubmit(event);
                } },
              React.createElement(
                'label',
                { htmlFor: 'searchText' },
                'Search by user name'
              ),
              React.createElement('input', {
                type: 'text',
                id: 'searchText',
                placeholder: 'Search',
                onChange: function onChange(event) {
                  return _this3.onChangeHandle(event);
                },
                value: this.state.searchText })
            )
          )
        ),
        React.createElement(
          'main',
          { className: 'users' },
          this.state.submit ? React.createElement(
            'h2',
            { className: 'users__title' },
            'Found ',
            this.state.users.length,
            ' results for ',
            React.createElement(
              'span',
              { className: 'users__title--color' },
              this.state.searchText
            )
          ) : null,
          React.createElement(UsersList, { users: this.state.users })
        )
      );
    }
  }]);

  return App;
}(React.Component);

var UsersList = function (_React$Component2) {
  _inherits(UsersList, _React$Component2);

  function UsersList() {
    _classCallCheck(this, UsersList);

    return _possibleConstructorReturn(this, (UsersList.__proto__ || Object.getPrototypeOf(UsersList)).apply(this, arguments));
  }

  _createClass(UsersList, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'users__container' },
        this.users
      );
    }
  }, {
    key: 'users',
    get: function get() {
      return this.props.users.map(function (user) {
        return React.createElement(User, { key: user.id, user: user });
      });
    }
  }]);

  return UsersList;
}(React.Component);

var User = function (_React$Component3) {
  _inherits(User, _React$Component3);

  function User() {
    _classCallCheck(this, User);

    return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
  }

  _createClass(User, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'users__item' },
        React.createElement(
          'a',
          { href: this.props.user.html_url, className: 'users__link--photo', target: '_blank' },
          ' ',
          React.createElement('img', { className: 'users__photo', src: this.props.user.avatar_url }),
          ' ',
          React.createElement(
            'div',
            { className: 'users__layer' },
            React.createElement(
              'p',
              null,
              'See profile'
            )
          ),
          ' '
        ),
        React.createElement(
          'a',
          { href: this.props.user.html_url, className: 'users__link--name', target: '_blank' },
          this.props.user.login
        )
      );
    }
  }]);

  return User;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
