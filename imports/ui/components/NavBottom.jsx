import React, { Component } from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconImages from 'material-ui/svg-icons/image/burst-mode';
import IconVideos from 'material-ui/svg-icons/av/video-library';
import IconSeed from 'material-ui/svg-icons/action/opacity';
import IconHome from 'material-ui/svg-icons/action/home';
import { browserHistory } from 'react-router';

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class NavBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }
  componentDidMount() {
    browserHistory.listen(location => {
      let index = 0;
      const currentIndex = this.state.selectedIndex;
      switch (location.pathname) {
        default: // case '/home':
          index = 0;
          break;
        case '/seedQuiz':
          index = 1;
          break;
        case '/videos':
          index = 2;
          break;
        case '/images':
          index = 3;
          break;
      }
      if (index !== currentIndex) {
        this.select(index);
      }
      // console.log('browserHistory', index);
      // console.log('currentIndex', currentIndex);
    });
  }
  select(index, url) {
    this.setState({ selectedIndex: index });
    if (url) {
      this.context.router.push(url);
    }
  }
  render() {
    // console.log('selectedIndex', this.state.selectedIndex);
    return (
      this.state.selectedIndex > 0 ?
        <Paper
          zDepth={1}
          style={{
            left: 0, bottom: 4, position: 'fixed', width: '100%',
            padding: 10,
          }}
        >
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Home"
              icon={<IconHome />}
              onTouchTap={() => this.select(0, '/home')}
            />
            <BottomNavigationItem
              label="씨앗 퀴즈"
              icon={<IconSeed />}
              onTouchTap={() => this.select(1, '/seedQuiz')}
            />
            <BottomNavigationItem
              label="영상 보기"
              icon={<IconVideos />}
              onTouchTap={() => this.select(2, '/videos')}
            />
            <BottomNavigationItem
              label="사진 보기"
              icon={<IconImages />}
              onTouchTap={() => this.select(3, '/images')}
            />
          </BottomNavigation>
        </Paper>
      :
        <div></div>
    );
  }
}

NavBottom.propTypes = {
  user: React.PropTypes.object,
};

NavBottom.contextTypes = {
  location: React.PropTypes.object,
  router: React.PropTypes.object,
};

export default NavBottom;
