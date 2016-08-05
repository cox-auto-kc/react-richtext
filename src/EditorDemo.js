import React, {PropTypes,Component} from 'react';
import RichTextEditor, {createEmptyValue} from './RichTextEditor';
import {convertToRaw} from 'draft-js';
import {EditorValue} from './RichTextEditor';


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

class EditorDemo extends React.Component {
  constructor(props, context) {
    super(props, context);

   this. state = {
      value: createEmptyValue(),
      format: 'html',
    };
  };


render()
{
  return (
    <div className="editor-demo">
      <div className="row">
        <RichTextEditor
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          //toolbarColor={'#00FF00'}
          placeholder="Type here ..."
        />
      </div>

      <label className="radio-item" >
        <input
          style={styles.display}
          type="radio"
          name="format"
          value="html"
          checked={this.state.format === 'html'}
          onChange={this.onChangeFormat.bind(this)}
        />
        <span className="label">HTML</span>
      </label>
      <label className="radio-item">
        <input
          style={styles.display}
          type="radio"
          name="format"
          value="markdown"
          checked={this.state.format === 'markdown'}
          onChange={this.onChangeFormat.bind(this)}
        />

        <span className="label">Markdown</span>
      </label>
      <span className="btn-row" style={styles.log} onClick={this.logState.bind(this)} >Log State</span>

      <div className="row">
          <textarea
            className="source"
            placeholder="Editor Source"
            value={this.state.value.toString(this.state.format)}
            onChange={this.onChangeSource.bind(this)}
            style={styles.row}
          />
      </div>
    </div>

  );
}
  logState() {
    console.log(this.state.value);
    let editorState = this.state.value.getEditorState();
    let contentState = window.contentState = editorState.getCurrentContent().toJS();
    console.log(contentState);
  }

  logStateRaw() {
    let editorState = this.state.value.getEditorState();
    let contentState = editorState.getCurrentContent();
    let rawContentState = window.rawContentState = convertToRaw(contentState);
    console.log(JSON.stringify(rawContentState));
  }

  onChange(value: EditorValue) {
    this.setState({value});
  }

  onChangeSource(event: Object) {
    let source = event.target.value;
    let oldValue = this.state.value;
    this.setState({
      value: oldValue.setContentFromString(source, this.state.format),
    });
  }

  onChangeFormat(event: Object) {
    this.setState({format: event.target.value});
  }
};

export default EditorDemo;
