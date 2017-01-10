import React, { Component } from 'react';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import IconDelete from 'material-ui/svg-icons/action/delete-forever';
import IconButton from 'material-ui/IconButton';

import handleFormInputChange from '../../utils/handleFormInputChange';

export default class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.removeCategories = this.removeCategories.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.handleFormInputChange = handleFormInputChange.bind(this);
  }
  componentWillMount() {
    console.log('CategoryList componentWillMount');
    console.log('this.props.user', this.props.user);
  }
  componentDidUpdate() {
    // this.uncheckAll('chkCategories');
    // console.log('componentDidUpdate', this.chkCategories);
  }
  onCheck(e) {
    this.handleFormInputChange(e);
  }
  removeCategories() {
    this.props.removeCategories(this.state.chkCategories);
  }
  uncheckAll(elementName) {
    const checks = document.querySelectorAll(`input[name="${elementName}"]`);
    console.log('uncheckAll', checks);
    for (let i = 0; i < checks.length; i++) {
      const check = checks[i];
      if (!check.disabled) {
        check.checked = false;
        console.log('uncheck', i);
      }
    }
  }
  render() {
    const categories = this.props.categories;
    return (
      <Paper
        style={{ display: 'inline-block', verticalAlign: 'top' }}
        zDepth={1}
        children={
          <List>
            <Subheader>
              <span>카테고리 리스트</span>
              <span style={{ float: 'right' }}>
                {/*
                <InlineConfirmButton
                  className="btn btn-default"
                  textValues={['선택한 카테고리 삭제', '정말 삭제하시겠습니까?', '삭제중입니다.']}
                  showTimer
                  isExecuting={false}
                  onClick={this.removeCategories}
                >
                  <IconDelete
                    color="#FF5733"
                    style={{ verticalAlign: 'middle' }}
                  />
                </InlineConfirmButton>
                */}
                <IconButton
                  tooltip="선택한 카테고리 삭제"
                  touch
                  onTouchTap={this.removeCategories}
                >
                  <IconDelete
                    color="#FF5733"
                    style={{ verticalAlign: 'text-bottom' }}
                  />
                </IconButton>
              </span>
            </Subheader>
              {categories.map((cat, index) => (
                <ListItem
                  key={index}
                  id={cat._id}
                  primaryText={cat.name}
                  secondaryText={cat.description}
                  style={{ textAlign: 'left', minWidth: '296px' }}
                  leftCheckbox={
                    <Checkbox
                      name="chkCategories"
                      ref={(input) => this.chkCategories = input}
                      value={cat._id}
                      onCheck={this.onCheck}
                    />
                  }
                />
              ))}
          </List>
        }
      />
    );
  }
}

CategoryList.propTypes = {
  categories: React.PropTypes.array,
  removeCategories: React.PropTypes.func,
  user: React.PropTypes.object,
};
