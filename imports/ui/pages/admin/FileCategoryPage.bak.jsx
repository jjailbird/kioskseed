import { Meteor } from 'meteor/meteor';
import React, { PureComponent } from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';

import trackerReact from 'meteor/ultimatejs:tracker-react';
import { MediaCategories } from '../../../api/upload/MediaCategories.js';

import CategoryList from '../../components/categories/CategoryList.jsx';
import CategoryInput from '../../components/categories/CategoryInput.jsx';
import confirm from '../../utils/confirm';

export default class FileCategoryPageBak extends trackerReact(PureComponent) {
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        category: Meteor.subscribe('media.categories'),
      },
    };
    // this.onSubmit = this.onSubmit.bind(this);
  }
  removeCategories(catIds) {
    confirm('선택한 카테고리들을 삭제하시겠습니까?').then(() => {
      Meteor.call('Categories.Remove', catIds, (err, res) => {
        if (err) {
          console.log('Meteor.call error', err);
        }
      });
      // console.log('confirm', 'deleted!');
    }, () => {
      console.log('confirm', 'canceled!');
    });
  }
  render() {
    const categories = MediaCategories.find({}, { sort: { createdAt: -1 } }).fetch();
    return (
      <div className="root">
        <Title render={(previousTitle) => `카테고리 - ${previousTitle}`} />
        <h4>카테고리 편집</h4>
        <Divider />
        <div style={{ padding: '10px' }}>
          <CategoryInput style={{ marginRight: '10px' }} />
          <CategoryList
            categories={categories}
            removeCategories={this.removeCategories}
            user={this.props.user}
          />
        </div>
      </div>
    );
  }
}

FileCategoryPageBak.propTypes = {
  user: React.PropTypes.object,
};

