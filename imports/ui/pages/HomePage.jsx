import React, { PureComponent } from 'react';
import Title from 'react-title-component';
import FlipCard from 'react-flipcard';

class HomePage extends PureComponent {
  render() {
    return (
      <div className="root">
        <Title render={(previousTitle) => `HOME - ${previousTitle}`} />
        {/*
        <h2>Home</h2>
        <Divider />
        */}
        <div
          className="container-table fill"
          style={{
            backgroundImage: 'url("/img/home.bg.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
          }}
        >
          <div className="row row-vertical">
            <div className="col-md-12">
              <img src="/img/home.title.png" alt="씨앗의 가치로 만드는 행복한 세상" />
            </div>
            <div className="col-md-12">
              <div style={{ margin: '40px' }}>&nbsp;</div>
              <div className="flipCard01" style={{ display: 'inline-block', padding: '20px' }}>
                <FlipCard>
                  <div>
                    <img
                      src="/img/btn.goto.1.png"
                      alt="씨앗퀴즈"
                      onTouchTap={() => { this.context.router.push('/seedQuiz'); }}
                    />
                  </div>
                  <div>
                    <img
                      src="/img/btn.goto.1.png"
                      alt="씨앗퀴즈"
                      onTouchTap={() => { this.context.router.push('/seedQuiz'); }}
                    />
                  </div>
                </FlipCard>
              </div>
              <div className="flipCard02" style={{ display: 'inline-block', padding: '20px' }}>
                <FlipCard >
                  <div>
                    <img
                      src="/img/btn.goto.2.png"
                      alt="영상보기"
                      onTouchTap={() => { this.context.router.push('/videos'); }}
                    />
                  </div>
                  <div>
                    <img
                      src="/img/btn.goto.2.png"
                      alt="영상보기"
                      onTouchTap={() => { this.context.router.push('/videos'); }}
                    />
                  </div>
                </FlipCard>
              </div>
              <div className="flipCard03" style={{ display: 'inline-block', padding: '20px' }}>
                <FlipCard >
                  <div>
                    <img
                      src="/img/btn.goto.3.png"
                      alt="사진보기"
                      onTouchTap={() => { this.context.router.push('/imageCategories'); }}
                    />
                  </div>
                  <div>
                    <img
                      src="/img/btn.goto.3.png"
                      alt="사진보기"
                      onTouchTap={() => { this.context.router.push('/imageCategories'); }}
                    />
                  </div>
                </FlipCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.contextTypes = {
  location: React.PropTypes.object,
  router: React.PropTypes.object,
};

export default HomePage;
