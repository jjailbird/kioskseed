import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppContainer from '../../ui/layouts/AppContainer.jsx';
import HomePage from '../../ui/pages/HomePage.jsx';
import SeedQuizPage from '../../ui/pages/SeedQuizPage.jsx';
import VideoPage from '../../ui/pages/VideoPage.jsx';
import ImagePage from '../../ui/pages/ImagePage.jsx';
import ImageCategoryPage from '../../ui/pages/ImageCategoryPage.jsx';

import SignInPage from '../../ui/pages/SignInPage.jsx';
import SignUpPage from '../../ui/pages/SignUpPage.jsx';

// import FileUploadPage from '../../ui/pages/admin/FileUploadPage.jsx';
import FileCategoryPage from '../../ui/pages/admin/FileCategoryPage.jsx';
import FileImagePage from '../../ui/pages/admin/FileImagePage.jsx';
import FileVideoPage from '../../ui/pages/admin/FileVideoPage.jsx';

import AdminPage from '../../ui/pages/admin/AdminPage.jsx';
// import FileView from '../../ui/components/FileView.js';

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/admin/signin',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={HomePage} />
      <Route path="home" component={HomePage} />
      <Route path="seedQuiz" component={SeedQuizPage} />
      <Route path="videos" component={VideoPage} />
      <Route path="images(/:cat)" component={ImagePage} />
      <Route path="imageCategories" component={ImageCategoryPage} />

      <Route path="admin" component={AdminPage}>
        <IndexRoute component={FileVideoPage} onEnter={requireAuth} />
        <Route path="video" component={FileVideoPage} onEnter={requireAuth} />
        <Route path="category" component={FileCategoryPage} onEnter={requireAuth} />
        <Route path="images" component={FileImagePage} onEnter={requireAuth} />
        <Route path="signin" component={SignInPage} />
        <Route path="signup" component={SignUpPage} />
      </Route>
    </Route>
  </Router>
);
