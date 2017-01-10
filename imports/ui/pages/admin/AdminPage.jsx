import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
// import trackerReact from 'meteor/ultimatejs:tracker-react';

import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  appbar: {
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
  },
  tabs: {
    width: '450px',
  },
  tab: {
    height: '64px',
    color: 'white',
  },
  toolbar: {
    height: '64px',
    backgroundColor: 'transparent',
    padding: '0px',
  },
};

export default class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.onTabsChange = this.onTabsChange.bind(this);
    // this.state = this.getMeteorData();
    this.state = {
      isAuthenticated: false,
    };
    this.logout = this.logout.bind(this);
  }
  componentWillMount() {
    this.checkLoggedIn();
  }
  componentDidUpdate() {
    this.checkLoggedIn();
  }
  onTabsChange(value) {
    // console.log(value);
    // this.context.router.push(value);
    browserHistory.push(value);
  }
  checkLoggedIn() {
    const loggedin = Meteor.userId() !== null;
    if (this.state.isAuthenticated !== loggedin) {
      this.setState({
        isAuthenticated: loggedin,
      });
    }
  }
  logout(e) {
    e.preventDefault();
    Meteor.logout();
    this.setState({ isAuthenticated: false });
    // this.checkLoggedIn();
    browserHistory.push('/admin/signin');
  }
  renderLogin() {
    return (
      <FlatButton label="Login" />
    );
  }
  renderLogged() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="계정 수정" />
        <MenuItem primaryText="로그 아웃" onTouchTap={this.logout} />
      </IconMenu>
    );
  }
  render() {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       user: Meteor.user(),
     })
    );
    let currentPath = this.props.location.pathname;
    if (currentPath === '/admin') {
      currentPath = '/admin/upload';
    }
    return (
      <div className="root">
        <Title render={(previousTitle) => `관리페이지 - ${previousTitle}`} />
        <AppBar
          title="씨앗세상 관리자"
          titleStyle={{ cursor: 'pointer' }}
          style={styles.appbar}
          showMenuIconButton={false}
          // onTitleTouchTap={() => { this.context.router.push('/admin'); }}
          onTitleTouchTap={() => { browserHistory.push('/admin'); }}
        >
          <Toolbar style={styles.toolbar}>
            <ToolbarGroup>
              <Tabs
                onChange={this.onTabsChange}
                value={currentPath}
                style={styles.tabs}
                initialSelectedIndex={0}
              >
                <Tab label="동영상" value="/admin/video" />
                <Tab label="카테고리" value="/admin/category" />
                <Tab label="이미지" value="/admin/images" />
              </Tabs>
              {this.state.isAuthenticated ? this.renderLogged() : this.renderLogin()}
            </ToolbarGroup>
          </Toolbar>
        </AppBar>
        <Divider />
        <div className="detail">
          {childrenWithProps}
        </div>
      </div>
    );
  }
}

AdminPage.propTypes = {
  children: React.PropTypes.element,
  location: React.PropTypes.object,
};
