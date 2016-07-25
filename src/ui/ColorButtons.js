/* @flow */

import React, {Component} from 'react';
import Button from './Button';
//import ButtonWrap from './ButtonWrap';


// $FlowIssue - Flow doesn't understand CSS Modules

let colorsStyle={
    display:'inline-block',
    margin: '0 5px 0 0',
    padding: '8px 8px',
    height: 20,
    width:20,
    lineHeight: 1.5,
    boxSizing: 'border-box',
    border: '1px solid #0585c8',
    borderRadius: 3,
    color: '#0585c8',
    textDecoration:'none',
    fontSize: 13,
    whiteSpace:' nowrap',
    cursor: 'pointer',
    paddingLeft:5,
    paddingRight:5,
};
// TODO: Use a more specific type here.
type ReactNode = any;

type Props = {
    iconName: string;
isActive?: boolean;
children?: ReactNode;
className?: string;
label?: string;
colors?:boolean;
};

export default class ColorButtons extends Component {
    props: Props;

    render(): React.Element {
        let {props} = this;
        let {className, iconName, label, children, ...otherProps} = props;
        return (
            <Button>
            {this._rendercolorstobuttons()}
        {children}
    </Button>
    );
    }

    _rendercolorstobuttons(){
        let {className, iconName, label, children, ...otherProps} = this.props;
        let displaycolor= (iconName=='red')?'#FF0000':(iconName=='black')?'#000000':(iconName=='gray')?'#808080':
            (iconName=='green')?'#00FF00':(iconName=='blue')?'#0000FF':(iconName=='yellow')?'#FFFF00':(iconName=='coral')?'#FF7F50':(iconName=='aqua')?'#00FFFF':
                (iconName=='white')?'#FFFFFF':(iconName=='orchid')?'#DA70D6':(iconName=='darkmagenta')?'#8B008B':(iconName=='lightskybule')?'#87CEFA':
                    (iconName=='greenyellow')?'#ADFF2F':(iconName=='slateblue')?'#6A5ACD':(iconName=='turquoise')?'#40E0D0':(iconName=='turquoise')?'#40E0D0':
                        (iconName=='sienna')?'#A0522D':(iconName=='plum')?'#DDA0DD':(iconName=='peachpuff')?'#FFDAB9':(iconName=='palegreen')?'#98FB98':(iconName=='paleturquoise')?'#AFEEEE':
                            (iconName=='olive')?'#808000':(iconName=='peru')?'#CD853F':(iconName=='salmon')?'#FA8072':(iconName=='navy')?'#000080':(iconName=='moccasin')?'#FFE4B5':'';
        let currentStyle= Object.assign({},{background:displaycolor},colorsStyle);
        return(
            <span style={currentStyle}{...otherProps} title={label}  />
    );
    };
}

