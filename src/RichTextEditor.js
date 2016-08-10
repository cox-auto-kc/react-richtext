import React, {Component, PropTypes} from 'react';
import {CompositeDecorator, Editor, EditorState, Modifier, RichUtils, AtomicBlockUtils, ContentState} from 'draft-js';
import styles from '../assets/styles';
import styleMap from '../assets/styleMap';
import {ContentBlock} from 'draft-js';
import EditorValue from './lib/EditorValue';
import LinkDecorator from './lib/LinkDecorator';
import EditorToolbar from './lib/EditorToolbar';
import {EventEmitter} from 'events';
import ImageComponent from './lib/ImageComponent';
import {
    shouldHidePlaceholder,
    handleReturn,
    handleReturnSoftNewline,
    handleReturnEmptyListItem,
    handleReturnSpecialBlock,
    onTab,
    customKeyHandler,
    handleKeyCommand,
    onChange,
    focus,
    getBlockStyle} from './functions/RichTextEditorFunctions';


const MAX_LIST_DEPTH = 2;

var ChangeHandler = (value: EditorValue) => any;

let Props = {
    onChange : ChangeHandler,
}

export default class RichTextEditor extends Component {
    props:Props;

    constructor() {
        super(...arguments);
        this._keyEmitter = new EventEmitter();
        this._shouldHidePlaceholder = shouldHidePlaceholder.bind(this);
        this._handleReturn = handleReturn.bind(this);
        this._handleReturnSoftNewline = handleReturnSoftNewline.bind(this);
        this._handleReturnEmptyListItem = handleReturnEmptyListItem.bind(this);
        this._handleReturnSpecialBlock = handleReturnSpecialBlock.bind(this);
        this._onTab = onTab.bind(this);
        this._customKeyHandler = customKeyHandler.bind(this);
        this._handleKeyCommand = handleKeyCommand.bind(this);
        this._onChange = onChange.bind(this);
        this._focus = focus.bind(this);
        this._getBlockStyle = getBlockStyle.bind(this);
    }

    render():React.Element {
        let {props} = this;
        let editorState = props.value.getEditorState();

        let placeholder = props.placeholder ? props.placeholder : '';
        // If the user changes block type before entering any text, we can either
        // style the placeholder or hide it. Let's just hide it for now.

        return (
            <div style={richTextEditorStyles.richtext}>
                <EditorToolbar className="toolbar"
                               keyEmitter={this._keyEmitter}
                               editorState={editorState}
                               onChange={this._onChange}
                               focusEditor={this._focus}
                />

                <div style={richTextEditorStyles.editor}>
                    <Editor
                        blockRendererFn={this.blockRenderer}
                        blockStyleFn={this._getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleReturn={this._handleReturn}
                        keyBindingFn={this._customKeyHandler}
                        handleKeyCommand={this._handleKeyCommand}
                        onTab={this._onTab}
                        onChange={this._onChange}
                        placeholder={placeholder}
                        ref="editor"
                        spellCheck={true}
                    />
                </div>
            </div>
        );
    }

    blockRenderer = (block:ContentBlock) => {
        if (block.getType() === 'atomic') {
            return {
                component: ImageComponent
            };
        }
        return null;
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
    value : PropTypes.object,
};
