import React from 'react';
import ReactDOM from 'react-dom';
import {EditorState, Entity, RichUtils, Modifier, AtomicBlockUtils, Editor, ContentState} from 'draft-js';
import getEntityAtCursor from '../lib/getEntityAtCursor';
import clearEntityForRange from '../lib/clearEntityForRange';
import {ENTITY_TYPE} from 'draft-js-utils';
import {hasCommandModifier} from 'draft-js/lib/KeyBindingUtil';

export function getFuncName(fn) {
    let functionName = this[fn];
    return functionName;
}

export function getCurrentBlockType() {
    let {editorState} = this.props;
    let selection = editorState.getSelection();

    return editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
}

export function toggleInlineStyle(inlineStyle) {
    this.props.onChange(
        RichUtils.toggleInlineStyle(
            this.props.editorState,
            inlineStyle
        )
    );
}

export function toggleBlockType(blockType) {
    this.props.onChange(
        RichUtils.toggleBlockType(
            this.props.editorState,
            blockType
        )
    );
}


export function handleOnKeyPress(setFuncOnEnter, event){
    if(event.key == 'Enter'){
        event.preventDefault();
        setFuncOnEnter(); //function passed on call, to be done on pressing Enter
    };
}

export function updateLinkInputValue(e) {
    this.setState({inputRef: e.target.value});
}

export function setLink() {
    let url = this.state.inputRef;
    let {editorState} = this.props;
    let selection = editorState.getSelection();
    let entityKey = Entity.create(ENTITY_TYPE.LINK, 'MUTABLE', {url});
    this.props.onChange(
        RichUtils.toggleLink(editorState, selection, entityKey)
    );
    this.togglePopover();
}

export function toggleLink(){
    this.togglePopover();
    let {editorState} = this.props;
    let entity = getEntityAtCursor(editorState);
    if (entity == null) {
        this.setState({inputRef: ''});
    };
}

export function removeLink() {
    let {editorState} = this.props;
    let entity = getEntityAtCursor(editorState);
    if (entity != null) {
        let {blockKey, startOffset, endOffset} = entity;
        this.props.onChange(
            clearEntityForRange(editorState, blockKey, startOffset, endOffset)
        );
    };
    this.setState({inputRef: ''});
}

export function getEntity() {
    let {editorState} = this.props;
    let entity = getEntityAtCursor(editorState);
    return (entity == null) ? null : Entity.get(entity.entityKey);
}

export function toggleColorsTrigger(key){
    this.setState({
        showPopover: true,
        popoverKey: key
    });
}

export function toggleInlineColorsStyle(inlineStyle) {
    let {editorState} = this.props;
    this.props.onChange( RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
        )
    );
    this.togglePopover();
}

export function toggleFillColorsStyle(inlineStyle) {
    let {editorState} = this.props;

    this.props.onChange( RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
        )
    );
    this.togglePopover();
}

export function undo() {
    let {editorState} = this.props;
    this.props.onChange(
        EditorState.undo(editorState)
    );
}

export function redo() {
    let {editorState} = this.props;
    this.props.onChange(
        EditorState.redo(editorState)
    );
}

export function addImageLink() {
    let url = this.state.inputRef;
    let {editorState} = this.props;
    const entityKey = Entity.create('atomic', 'IMMUTABLE', {src:url});
    this.props.onChange(AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
    ));
    this.togglePopover();
}

export function uploadImage(){
    this.refs.fileInput.click();
}

export function fileInput(e){
    const fileList = e.target.files;
    const file = fileList[0];
    this.insertImage(file);
}


export function insertImage(file) {
    let {editorState} = this.props;
    const entityKey = Entity.create('atomic', 'IMMUTABLE', {src: URL.createObjectURL(file)});
    this.props.onChange(AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
    ));
}

export function togglePopover(){
    let isShowing = this.state.showPopover;
    this.setState({showPopover: !isShowing})
}

export function closePopoverOnResize(){
    if(this.state.showPopover){
        this.togglePopover();
    }
}