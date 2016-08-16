import React, {Component, PropTypes} from 'react';
import Dropdown from './Dropdown';

import {
    getFuncName,
    getCurrentBlockType,
    toggleBlockType,
    toggleInlineStyle } from '../functions/editorMethods';

/*MASTER_EDITOR references the other DROPDOWN objects,
 they're not explicitly named in this file, only referenced via variables*/
import {
    BLOCK_TYPE_DROPDOWN,
    INLINE_TYPE_FONTDROPDOWN,
    INLINE_TYPE_FONTSIZEDROPDOWN,
    MASTER_EDITOR,
} from '../lib/EditorToolbarConfig';

import styles from '../assets/styles';

class BasicDropdowns extends Component {

    constructor(props) {
        super(props);

        //Helper function
        this.getFuncName = getFuncName.bind(this);

        this.getCurrentBlockType = getCurrentBlockType.bind(this);
        this.toggleBlockType = toggleBlockType.bind(this);
        this.toggleInlineStyle = toggleInlineStyle.bind(this);

    }

    dropdowns() {
        let self = this;
        let {
            basicDropdownSrc,
            basicDropdownsStyles,
            } = this.props;

        let dropdowns = basicDropdownSrc.map(function(v, key){

            let dropdownConfig = v.config;
            let dropdownLabel = v.label;
            let dropdownBlockMethod = v.blockMethod;
            let dropdownChangeMethod = v.changeMethod;
            let dropdownKey = key;
            let choices = new Map(
                dropdownConfig.map((type) => [type.style, type.label ])
            );

            let blockType = self.getFuncName(dropdownBlockMethod)();
            let toggleInlineStyles = self.getFuncName(dropdownChangeMethod);

            return (
                <div key={dropdownKey} style={basicDropdownsStyles.dropdown}>
                    <Dropdown
                        dropdownTitle={dropdownLabel}
                        choices={choices}
                        selectedKey={blockType}
                        onChange={toggleInlineStyles}
                    />
                </div>
            );
        });
        return dropdowns;
    };

    render(){
        let {
            basicDropdownSrc,
            basicDropdownsStyles,
            } = this.props;
        let renderDropdowns = this.dropdowns();
        return (
            <div style={basicDropdownsStyles.dropdownContainer}>
                {renderDropdowns}
            </div>
        );
    }
}

BasicDropdowns.propTypes = {

    basicDropdownSrc: PropTypes.array,
    basicDropdownsStyles: PropTypes.object,

    //Records from parent
    editorState: PropTypes.object,
    onChange: PropTypes.func,
};


BasicDropdowns.defaultProps = {

    basicDropdownSrc: MASTER_EDITOR.basicDropdowns,
    basicDropdownsStyles: styles.basicDropdownsStyles,
};

export default BasicDropdowns;

