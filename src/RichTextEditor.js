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
import {shouldHidePlaceholder, handleReturn, handleReturnSoftNewline,handleReturnEmptyListItem,handleReturnSpecialBlock, onTab,
    customKeyHandler, handleKeyCommand,onChange,focus,getBlockStyle,createEmptyValue,createValueFromString} from './functions/RichTextEditorFunctions';

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
        this.onChange = onChange.bind(this);
        this.shouldHidePlaceholder = shouldHidePlaceholder.bind(this);
        this.handleReturn = handleReturn.bind(this);
        this.handleReturnSoftNewline = handleReturnSoftNewline.bind(this);
        this.handleReturnEmptyListItem = handleReturnEmptyListItem.bind(this);
        this.handleReturnSpecialBlock = handleReturnSpecialBlock.bind(this);
        this.onTab = onTab.bind(this);
        this.customKeyHandler = customKeyHandler.bind(this);
        this.handleKeyCommand = handleKeyCommand.bind(this);
        this.focus = focus.bind(this);
        this.getBlockStyle = getBlockStyle.bind(this);
        this.createEmptyValue = createEmptyValue.bind(this);
        this.createValueFromString = createValueFromString.bind(this);
    }

    render():React.Element {
        let {props} = this;
        let {richTextEditorStyles} = props;
        let editorState = props.value.getEditorState();


        let placeholder = props.placeholder ? props.placeholder : '';
        // If the user changes block type before entering any text, we can either
        // style the placeholder or hide it. Let's just hide it for now.

        return (
            <div style={richTextEditorStyles.richtext}>
                <EditorToolbar className="toolbar"
                               keyEmitter={this._keyEmitter}
                               editorState={editorState}
                               onChange={this.onChange}
                               focusEditor={this.focus}
                />

                <div style={richTextEditorStyles.editor}>
                    <Editor
                        blockRendererFn={this.blockRenderer}
                        blockStyleFn={this.getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleReturn={this.handleReturn}
                        keyBindingFn={this.customKeyHandler}
                        handleKeyCommand={this.handleKeyCommand}
                        onTab={this.onTab}
                        onChange={this.onChange}
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

export {EditorValue, decorator, createEmptyValue, createValueFromString};

RichTextEditor.propTypes = {
    richTextEditorStyles: PropTypes.object,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    toolbarColor: PropTypes.string,
    value : PropTypes.object,
};

RichTextEditor.defaultProps = {
    richTextEditorStyles: styles.richTextEditorStyles,
}
