import React, { PureComponent } from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';
import { MARGIN_RIGHT_WIDTH } from './constants.js';

class SeedQuizPage extends PureComponent {
  render() {
    return (
      <div
        className="root fill"
        style={{
          backgroundImage: 'url("/img/seedQuiz.bg_mini.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      >
        <div style={{ marginRight: `${MARGIN_RIGHT_WIDTH}px` }}>
          <Title render={(previousTitle) => `씨앗퀴즈 - ${previousTitle}`} />
          <div style={{ paddingTop: '10px', paddingBottom: '20px' }}>
            <img src="/img/seedQuiz.title.png" alt="씨앗퀴즈" />
          </div>
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '25px',
              paddingTop: '40px',
              paddingBottom: '40px',
            }}
          >
            <iframe
              src="http://www.genebank.go.kr/seedquiz/"
              frameBorder="0"
              scrolling="no"
              style={{
                border: 'none',
                width: '920px',
                height: '749px',
                overflow: 'hidden',
                display: 'inline-block',
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SeedQuizPage;
