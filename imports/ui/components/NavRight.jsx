import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import { browserHistory } from 'react-router';

import FlipCard from 'react-flipcard';
import { NAV_RIGHT_WIDTH } from '../pages/constants.js';

const BUTTON_PADDING_TOP = '5px';

class NavRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }
  componentWillMount() {
    browserHistory.listen(location => {
      // const currentIndex = this.state.selectedIndex;
      let index = 0;
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
        case '/imageCategories':
          index = 3;
          break;
      }
      if (location.pathname.indexOf('/images') === 0) {
        index = 3;
      }
      this.select(index);
    });
  }
  select(index, url) {
    this.setState({ selectedIndex: index });
    if (url) {
      browserHistory.push(url);
    }
  }
  render() {
    // console.log(this.state.selectedIndex);
    return (
      this.state.selectedIndex > 0 ?
        <Drawer
          width={NAV_RIGHT_WIDTH}
          openSecondary
          open
          docked
          containerStyle={{
            backgroundColor: 'none',
            boxShadow: 'none',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          <div style={{ paddingTop: '50px' }}>
            <img src="/img/logo.app.png" alt="logo" />
            <div className="flipCard01" style={{ paddingTop: BUTTON_PADDING_TOP }}>
              <FlipCard >
                <div>
                  <img
                    src="/img/btn.goto.1.png"
                    alt="씨앗퀴즈"
                    onTouchTap={() => { browserHistory.push('/seedQuiz'); }}
                  />
                </div>
                <div>
                  <img
                    src="/img/btn.goto.1.v.png"
                    alt="씨앗퀴즈"
                    onTouchTap={() => { browserHistory.push('/seedQuiz'); }}
                  />
                </div>
              </FlipCard>
            </div>
            <div className="flipCard02" style={{ paddingTop: BUTTON_PADDING_TOP }}>
              <FlipCard >
                <div>
                  <img
                    src="/img/btn.goto.2.png"
                    alt="영상보기"
                    onTouchTap={() => { browserHistory.push('/videos'); }}
                  />
                </div>
                <div>
                  <img
                    src="/img/btn.goto.2.v.png"
                    alt="영상보기"
                    onTouchTap={() => { browserHistory.push('/videos'); }}
                  />
                </div>
              </FlipCard>
            </div>
            <div className="flipCard03" style={{ paddingTop: BUTTON_PADDING_TOP }}>
              <FlipCard >
                <div>
                  <img
                    src="/img/btn.goto.3.png"
                    alt="사진보기"
                    onTouchTap={() => { browserHistory.push('/imageCategories'); }}
                  />
                </div>
                <div>
                  <img
                    src="/img/btn.goto.3.v.png"
                    alt="사진보기"
                    onTouchTap={() => { browserHistory.push('/imageCategories'); }}
                  />
                </div>
              </FlipCard>
            </div>
            <div style={{ paddingTop: BUTTON_PADDING_TOP }}>
              <img src="/img/btn.goto.0.png" alt="Home" onTouchTap={() => { browserHistory.push('/home'); }} />
            </div>
          </div>
        </Drawer>
      :
        <div></div>
    );
  }
}

NavRight.propTypes = {
  user: React.PropTypes.object,
};

NavRight.contextTypes = {
  location: React.PropTypes.object,
  router: React.PropTypes.object,
};

export default NavRight;
