/* @flow */
import React, {Component} from 'react';
import RichTextEditor, {createEmptyValue} from './RichTextEditor';
import {convertToRaw} from 'draft-js';
import autobind from 'class-autobind';

import type {EditorValue} from './RichTextEditor';


type State = {
  value: EditorValue;
  format: string;
};
const styles={
  display:{
    color: '#0585c8',
    paddingTop:10,
    },
  row:{
    height:100,
    width: '100%',
    borderColor:'#ddd',
    resize: 'none',
  },
  log:{
    float:'right',
    marginTop:10,
    color: '#0585c8',
    paddingRight:5,
  }

};
export default class EditorDemo extends Component {
  props: Props;
  state: State;

  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      value: createEmptyValue(),
      format: 'html',
    };
  }

  render(): React.Element {
    let {value, format} = this.state;
    return (
      <div className="editor-demo">
         <div className="row">
          <RichTextEditor
            value={value}
            onChange={this._onChange}
           //toolbarColor={'#DDA0DD'}
            placeholder="Type here ..."
          />
        </div>

          <label className="radio-item" >
            <input
                style={styles.display}
                type="radio"
                name="format"
                value="html"
                checked={format === 'html'}
                onChange={this._onChangeFormat}
            />
            <span className="label">HTML</span>
          </label>
          <label className="radio-item">
            <input
                style={styles.display}
                type="radio"
                name="format"
                value="markdown"
                checked={format === 'markdown'}
                onChange={this._onChangeFormat}
            />

            <span className="label">Markdown</span>
          </label>
            <span className="btn-row" style={styles.log} onClick={this._logState} >Log State</span>

        <div className="row">
          <textarea
              className="source"
              placeholder="Editor Source"
              value={value.toString(format)}
              onChange={this._onChangeSource}
              style={styles.row}
          />
        </div>

      </div>
    );
  }

  _logState() {
    let editorState = this.state.value.getEditorState();
    let contentState = window.contentState = editorState.getCurrentContent().toJS();
    console.log(contentState);
  }

  _logStateRaw() {
    let editorState = this.state.value.getEditorState();
    let contentState = editorState.getCurrentContent();
    let rawContentState = window.rawContentState = convertToRaw(contentState);
    console.log(JSON.stringify(rawContentState));
  }

  _onChange(value: EditorValue) {
    this.setState({value});
  }

  _onChangeSource(event: Object) {
    let source = event.target.value;
    let oldValue = this.state.value;
    this.setState({
      value: oldValue.setContentFromString(source, this.state.format),
    });
  }

  _onChangeFormat(event: Object) {
    this.setState({format: event.target.value});
  }
}
