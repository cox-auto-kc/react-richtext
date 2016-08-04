import React, {Component, PropTypes} from 'react';
import {CompositeDecorator, Editor, EditorState, Modifier, RichUtils, AtomicBlockUtils, ContentState} from 'draft-js';
import getDefaultKeyBinding from 'draft-js/lib/getDefaultKeyBinding';
import changeBlockDepth from './lib/changeBlockDepth';
import changeBlockType from './lib/changeBlockType';
import insertBlockAfter from './lib/insertBlockAfter';
import isListItem from './lib/isListItem';
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';
import EditorToolbar from './lib/EditorToolbar';
import EditorValue from './lib/EditorValue';
import LinkDecorator from './lib/LinkDecorator';
import {EventEmitter} from 'events';
import {BLOCK_TYPE} from 'draft-js-utils';
import ImageComponent from './lib/ImageComponent';
import styles from '../assets/styles';
import styleMap from '../assets/styleMap';
import {ContentBlock} from 'draft-js';


let richTextEditorStyles = styles.richTextEditorStyles;

const MAX_LIST_DEPTH = 2;

export default class RichTextEditor extends Component {

  constructor() {
    super(...arguments);
    this._keyEmitter = new EventEmitter();
    }

  render(): React.Element {
    let {props} = this;
    let editorState = props.value.getEditorState();

    let placeholder = props.placeholder ? props.placeholder : '';
    // If the user changes block type before entering any text, we can either
    // style the placeholder or hide it. Let's just hide it for now.

    return (
      <div style={richTextEditorStyles.richtext}>
        <EditorToolbar className="toolbar"
          //keyEmitter={this._keyEmitter}
          editorState={editorState}
          onChange={this._onChange.bind(this)}
          //focusEditor={this._focus.bind(this)}
        />

        <div style={richTextEditorStyles.editor}>
          <Editor
            blockRendererFn={this._blockRenderer}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleReturn={this._handleReturn.bind(this)}
            keyBindingFn={this._customKeyHandler.bind(this)}
            handleKeyCommand={this._handleKeyCommand}
            onTab={this._onTab.bind(this)}
            onChange={this._onChange.bind(this)}
            placeholder={placeholder}
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }

  _shouldHidePlaceholder(): boolean {
    let editorState = this.props.value.getEditorState();
    let contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        return true;
      }
    }
    return false;
  }

  _handleReturn(event: Object): boolean {
    if (this._handleReturnSoftNewline(event)) {
      return true;
    }
    if (this._handleReturnEmptyListItem()) {
      return true;
    }
    if (this._handleReturnSpecialBlock()) {
      return true;
    }
    return false;
  }

  // `shift + return` should insert a soft newline.
  _handleReturnSoftNewline(event: Object): boolean {
    let editorState = this.props.value.getEditorState();
    if (isSoftNewlineEvent(event)) {
      let selection = editorState.getSelection();
      if (selection.isCollapsed()) {
        this._onChange(RichUtils.insertSoftNewline(editorState));
      } else {
        let content = editorState.getCurrentContent();
        let newContent = Modifier.removeRange(content, selection, 'forward');
        let newSelection = newContent.getSelectionAfter();
        let block = newContent.getBlockForKey(newSelection.getStartKey());
        newContent = Modifier.insertText(
          newContent,
          newSelection,
          '\n',
          block.getInlineStyleAt(newSelection.getStartOffset()),
          null
        );
        this._onChange(
          EditorState.push(editorState, newContent, 'insert-fragment')
        );
      }
      return true;
    }
    return false;
  }

  // If the cursor is in an empty list item when return is pressed, then the
  // block type should change to normal (end the list).
  _handleReturnEmptyListItem(): boolean {
    let editorState = this.props.value.getEditorState();
    let selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      let contentState = editorState.getCurrentContent();
      let blockKey = selection.getStartKey();
      let block = contentState.getBlockForKey(blockKey);
      if (isListItem(block) && block.getLength() === 0) {
        let depth = block.getDepth();
        let newState = (depth === 0) ?
          changeBlockType(editorState, blockKey, BLOCK_TYPE.UNSTYLED) :
          changeBlockDepth(editorState, blockKey, depth - 1);
        this._onChange(newState);
        return true;
      }
    }
    return false;
  }

  // If the cursor is at the end of a special block (any block type other than
  // normal or list item) when return is pressed, new block should be normal.
  _handleReturnSpecialBlock(): boolean {
    let editorState = this.props.value.getEditorState();
    let selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      let contentState = editorState.getCurrentContent();
      let blockKey = selection.getStartKey();
      let block = contentState.getBlockForKey(blockKey);
      if (!isListItem(block) && block.getType() !== BLOCK_TYPE.UNSTYLED) {
        // If cursor is at end.
        if (block.getLength() === selection.getStartOffset()) {
          let newEditorState = insertBlockAfter(
            editorState,
            blockKey,
            BLOCK_TYPE.UNSTYLED
          );
          this._onChange(newEditorState);
          return true;
        }
      }
    }
    return false;
  }

  _onTab(event: Object){
    let editorState = this.props.value.getEditorState();
    let newEditorState = RichUtils.onTab(event, editorState, MAX_LIST_DEPTH);
    if (newEditorState !== editorState) {
      this._onChange(newEditorState);
    }
  }

  _customKeyHandler(event: Object) {
    // Allow toolbar to catch key combinations.
    let eventFlags = {};
    this._keyEmitter.emit('keypress', event, eventFlags);
    if (eventFlags.wasHandled) {
      return null;
    } else {
      return getDefaultKeyBinding(event);
    }
  }

  _handleKeyCommand(command: string): boolean {
    let editorState = this.props.value.getEditorState();
    let newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (newEditorState) {
      this._onChange(newEditorState);
      return true;
    } else {
      return false;
    }
  }

  _onChange(editorState: EditorState) {
    let {onChange,value } = this.props;
    if (onChange != null) {
      let newValue = value.setEditorState(editorState);
      onChange(newValue);
    }
  }
  _focus() {
    this.refs.editor.focus();
  }

  _blockRenderer = (block: ContentBlock) => {
  if (block.getType() === 'atomic') {
    return {
      component: ImageComponent
    };
  }
  return null;
}
}

function getBlockStyle(block: ContentBlock): string {
  let result = richTextEditorStyles.block;
  switch (block.getType()) {
    case 'unstyled':
      return (result, richTextEditorStyles.paragraph);
    case 'blockquote':
      return (result, richTextEditorStyles.blockquote);
    case 'code-block':
      return (result, richTextEditorStyles.codeBlock);
    default:
      return result;
  }
}

const decorator = new CompositeDecorator([LinkDecorator]);

function createEmptyValue(): EditorValue {
  return EditorValue.createEmpty(decorator);
}

function createValueFromString(markup: string, format: string): EditorValue {
  return EditorValue.createFromString(markup, format, decorator);
}

export {EditorValue, decorator, createEmptyValue, createValueFromString};

RichTextEditor.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  toolbarColor: PropTypes.string,
  onChange: PropTypes.func,
};

RichTextEditor.defaultProps = {
  toolbarColor: '#0585c8'
};
