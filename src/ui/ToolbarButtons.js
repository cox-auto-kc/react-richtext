import React, {Component,PropTypes} from 'react';

import {
    getFuncName,
    getCurrentBlockType,
    toggleInlineStyle,
    toggleBlockType } from '../functions/editorMethods';

import {
    INLINE_STYLE_BUTTONS,
    BLOCK_TYPE_BUTTONS,
    MASTER_EDITOR,
} from './../lib/EditorToolbarConfig';

import Button from './Button';


class ToolbarButtons extends Component{
    constructor(props) {
        super(props);
        //Helper function
        this.getFuncName = getFuncName.bind(this);
        this.getCurrentBlockType = getCurrentBlockType.bind(this);
        this.toggleInlineStyle = toggleInlineStyle.bind(this);
        this.toggleBlockType = toggleBlockType.bind(this);
    }

    buttons() {
        let self = this;
        let {
            basicButtonsSrc,
            editorState
        } = this.props;

        let Buttons = basicButtonsSrc.map(function(v, key){

            let buttonsConfig = v.config;
            let buttonsStyle = v.draftStyle;
            let buttonsBlockMethod = v.blockMethod;
            let buttonsChangeMethod = v.changeMethod;
            let ButtonKey = key;

            let blockType = self.getFuncName(buttonsBlockMethod)();
            let currentStyle = editorState.getCurrentInlineStyle();
            let toggleStyles = self.getFuncName(buttonsChangeMethod);

            let Buttons =
                buttonsConfig.map((type, index) => (

                <Button
                    key={String(index)}
                    isActive={(buttonsStyle ==='inline')? currentStyle.has(type.style) :(buttonsStyle==='block')? (type.style) === blockType : ''}
                    onToggle={toggleStyles}
                    styles={type.style}
                    label={type.label}
                    customColor={''}
                />
            ));

            return (
                <span key={ButtonKey}>{Buttons}</span>
            );
        });

        return Buttons;
    };

    render(){
        let renderButtons = this.buttons();

        return (
            <div >
                {renderButtons}
            </div>
    );
    }
}

ToolbarButtons.propTypes = {
    basicButtonsSrc: PropTypes.array,
    editorState: PropTypes.object,
};
ToolbarButtons.defaultProps = {
    basicButtonsSrc: MASTER_EDITOR.basicButtons,
};

export default ToolbarButtons;