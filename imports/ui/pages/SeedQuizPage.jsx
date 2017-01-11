import React, { PureComponent } from 'react';
import Title from 'react-title-component';
import { MARGIN_RIGHT_WIDTH, STYLE_CONTENT_CONTAINER, STYLE_CONTENT_TITLE } from './constants.js';

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
          <div style={STYLE_CONTENT_TITLE}>
            <img src="/img/seedQuiz.title.png" alt="씨앗퀴즈" />
          </div>
          <div style={STYLE_CONTENT_CONTAINER}>
            <iframe
              src="http://www.genebank.go.kr/seedquiz/"
              frameBorder="0"
              scrolling="no"
              style={{
                marginTop: '40px',
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
