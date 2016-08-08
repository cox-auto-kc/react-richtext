const styles={
    baseStyles: {
        baseContainer: {
            display: 'inline-block',
            verticalAlign: 'top',
        },
        basePopoverTrigger: {
            position: 'relative',
            display: 'inline-block'
        },
        basePopoverContainer: {
            position:'absolute',
            zIndex: 2,
            background: '#fdfdfd',
            borderRadius: 0,
            boxSizing: 'border-box',
            boxShadow: '0 5px 10px rgba(0,0,0,.2)',
            border: '1px solid rgba(0, 0, 0, .1)',
        },
        basePopoverLabel: {
            color: '#999',
            fontSize: '14px',
            lineHeight: '20px',
            padding: '2px 0',
        },
        basePopoverBackdrop: {
            position: 'fixed',
            zIndex: 1,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(0, 0, 0, .01)',
        },
    },
    buttonStyles: {
        button: {
            display: 'inline-block',
            margin: '0px 5px 0px 0px',
            padding: '3px 8px',
            height: 32,
            lineHeight: 1.5,
            boxSizing: 'border-box',
            border: '1px solid #0585c8',
            borderRadius: 3,
            color: '#0585c8',
            textDecoration: 'none',
            fontSize: 13,
            fontFamily: '"Roboto Condensed",sans-serif',
            whiteSpace: ' nowrap',
            fontWeight: 400,
            marginBottom: 5,
            marginRight: 5,
        },
        icon: {
            fill: '#0585c8',
            paddingRight: 5,
            paddingLeft: 5,
        },
    },
    richTextEditorStyles: {
        richtext: {
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: '3px',
            fontFamily: 'Roboto Condensed,sans-serif',
            fontSize: '14px',
            padding: '10px',
        },
        editor: {
            borderTop: '1px solid #ddd',
            cursor: 'text',
            fontSize: '16px',
            marginTop: '10px',
            height: '110px',
            overflow: 'auto',
        },

        paragraph:{
            margin: '14px 0',
        },
        blockquote: {
            borderLeft: '5px solid #eee',
            color: '#666',
            fontFamily: 'Hoefler Text, Georgia, serif',
            fontStyle: 'italic',
            margin: '16px 0',
            padding: '10px 20px',
        },
        codeBlock: {
            backgroundColor: '#f3f3f3',
            fontFamily: 'Inconsolata, Menlo, Consolas, monospace',
            fontSize: '16px',
            /* This should collapse with the margin around the parent <pre>. */
            margin: '14px 0',
            padding: '20px',
        },
    },
    editorToolbarStyles: {
        toolbarContainer: {
            fontFamily: '"Roboto Condensed",sans-serif',
            fontSize: '14px',
            marginBottom: '-5px',
            userSelect: 'none',
        },
    },
    toolbarButtonsStyles: {
    },
    iconButtonStyles: {
        icon:{
            fill:'#0585c8',
            paddingRight:5,
            paddingLeft:5,
        }
    },
    popoverColorsStyles: {
        basePopoverContainer: {
            position:'absolute',
            zIndex: 2,
            fontSize: '14px',
            background: '#fdfdfd',
            borderRadius: 0,
            boxSizing: 'border-box',
            boxShadow: '0 5px 10px rgba(0,0,0,.2)',
            border: '1px solid rgba(0,0,0,.2)',
        },
        popoverContainer: {
            padding: '0 12px 0 16px',
            width: 190,
        },
        popoverColorButtons: {
            display:'inline-block',
            height: 16,
            width: 16,
            marginTop: 0,
            marginRight: 4,
            marginBottom: 4,
            padding: 0,
            lineHeight: 1.5,
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 0,
            color: '#0585c8',
            textDecoration:'none',
            fontSize: 13,
            whiteSpace:' nowrap',
            cursor: 'pointer',
        },
    },
    popoverLinkStyles: {
        popoverContainer: {
            padding: '0px 8px',
            minWidth: '300px',
        },
        inner:{
            display:'flex',
        },
        input: {
            display: 'block',
            flex: '1 0 auto',
            height: '30px',
            background: 'none white',
            border: '1px solid  #0585c8',
            borderRadius: '2px',
            boxSizing: 'border-box',
            padding: '2px 6px',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            lineHeight: '24px',
            margin: '5px',
        },
        buttonGroup: {
            display: 'inline-block',
        },
        formButtons: {
            height: '30px',
            color: '#0585c8',
            marginTop: 4,
            marginRight: 4,
        },
    },
    basicDropdownsStyles: {
        dropdownContainer: {
            display: 'inline-block',
            verticalAlign: 'top',
        },
        dropdown: {
            display: 'inline-block',
            margin: '0 5px 5px 0',
        }
    },
    dropdownStyles: {
        root: {
            display: 'inline-block',
            position: 'relative',


            lineHeight: '22px',
            verticalAlign: 'top',
            borderColor: '#0585c8',
            borderRadius: '3px',
            border: '1px solid #0585c8'
        },
        select: {
            position: 'relative',
            zIndex: 2,
            display: 'inline-block',
            boxSizing: 'border-box',
            height: '30px',
            lineHeight: 'inherit',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            margin: 0,
            padding: 0,
            border: '4px solid transparent',
            borderRightWidth: '10px',
            borderLeftWidth: '5px',
            background: 'none transparent',
            opacity: 0,
            cursor: 'pointer',
            paddingRight: '10px'
        },

        value: {
            display: 'block',
            position: 'absolute',
            zIndex: 1,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            lineHeight: '1.5',
            border: '1px solid inherit',
            borderRadius: '3px',
            fontWeight: 400,
            fontSize: '16px',
            color: '#0585c8',
            padding: '3px',
            paddingRight: '15px',
            paddingLeft: '12px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
        icon:{
            position: 'absolute',
            right: 5,

        },
    },


};

export default styles;
