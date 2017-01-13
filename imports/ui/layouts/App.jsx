import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Title from 'react-title-component';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
// import Navbar from '../components/Navbar.jsx';
import { green100, green500, green700 } from 'material-ui/styles/colors';
// import { StickyContainer } from 'react-sticky';
// import './App.css';
// import NavBottom from '../components/NavBottom.jsx';
import NavRight from '../components/NavRight.jsx';
import IdleTimer from 'react-idle-timer';
import { browserHistory } from 'react-router';

const CONNECTION_ISSUE_TIMEOUT = 1000;

const muiThemeGreen = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green100,
  },
}, {
  avatar: {
    borderColor: null,
  },
  // userAgent: req.headers['user-agent'],
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
    };
    this.onIdleAction = this.onIdleAction.bind(this);
  }
  getChildContext() {
    return {
      muiTheme: muiThemeGreen,
      location: this.props.location,
      // router: this.props.router,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ showConnectionIssue: true });
    }, CONNECTION_ISSUE_TIMEOUT);
  }
  onIdleAction() {
    const currentPathname = this.props.location.pathname;
    // console.log('idle!', currentPath);
    if (currentPathname !== '/' && currentPathname !== '/videos' && currentPathname.indexOf('/admin') !== 0) {
      browserHistory.push('/');
    }
  }
  render() {
    const { showConnectionIssue } = this.state;
    const {
      user,
      connected,
      children,
    } = this.props;
    const idleTimeout =
      Meteor.settings.public.idleTimeout ?
      Meteor.settings.public.idleTimeout :
      5 * 60 * 1000;
    return (
      <IdleTimer
        ref="idleTimer"
        element={document}
        idleAction={this.onIdleAction}
        timeout={idleTimeout}
        format="MM-DD-YYYY HH:MM:ss.SSS"
      >
        <MuiThemeProvider muiTheme={muiThemeGreen}>
          <div>
            <Title render="Kiosk Seed" />
            <div className="detail">
              {this.props.children}
            </div>
            <NavRight
              ref="navRightMenu"
              user={this.props.user}
              currentPathname={this.props.location.pathname}
            />
          </div>
        </MuiThemeProvider>
      </IdleTimer>
    );
  }
}

App.propTypes = {
  connected: React.PropTypes.bool,
  user: React.PropTypes.object,
  children: React.PropTypes.element,
  location: React.PropTypes.object,
  // router: React.PropTypes.func,
};

App.childContextTypes = {
  muiTheme: React.PropTypes.object, // .isRequired,
  location: React.PropTypes.object,
  // router: React.PropTypes.func,
};

export default App;
