import React, { Component } from 'react';

import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';

import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';

// import trackerReact from 'meteor/ultimatejs:tracker-react';
import { MediaCategories } from '../../../api/upload/MediaCategories.js';

export default class CategoryInput extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidUpdate() {
    this.inputMediaCat.focus();
  }
  onImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }
  onSubmit() {
    const name = this.inputMediaCat.state.value.trim();
    const description = this.inputMediaDesc.state.value.trim();

    MediaCategories.insert({
      name,
      description,
      createdAt: new Date(),
    });
    this.inputMediaCat.setState({ value: '' });
    this.inputMediaDesc.setState({ value: '' });
  }
  setUpdateMode() {
    const subHeaderTitle = document.getElementById('CategoryInputSubheader');
    subHeaderTitle.innerHTML = '카테고리 수정';
  }
  render() {
    return (
      <Paper
        style={{ display: 'inline-block', verticalAlign: 'top', height: '100%' }}
        zDepth={1}
        children={
          <div>
            <Subheader id="CategoryInputSubheader">
              카테고리 추가
            </Subheader>
            <Formsy.Form
              style={{ padding: '0px 20px 75px', verticalAlign: 'top' }}
              onSubmit={this.onSubmit}
            >
              <div>
                <img
                  alt="cover image"
                  src="/img/image.svg"
                  style={{ width: '120px', height: '120px' }}
                />              
                <input type="file" onChange={this.onImageChange} />
              </div>
              <FormsyText
                // id="media_cat"
                ref={(input) => this.inputMediaCat = input}
                name="media_cat"
                floatingLabelText="카테고리 명"
                required
                style={{ display: 'block' }}
              />
              <FormsyText
                // id="media_desc"
                ref={(input) => this.inputMediaDesc = input}
                name="media_desc"
                floatingLabelText="카테고리 설명"
                style={{ display: 'block' }}
              />
              <RaisedButton
                type="submit"
                label="등록"
                style={{ float: 'right', clear: 'right', marginTop: '15px' }}
              />
            </Formsy.Form>
          </div>
        }
      />
    );
  }
}
