export const INLINE_STYLE_BUTTONS = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'underline', style: 'UNDERLINE'},
  {label: 'Strikethrough', style: 'STRIKETHROUGH'},
  {label: 'Monospace', style: 'CODE'},
  {label: 'LeftIndent', style: 'leftindent'},
  {label: 'RightIndent', style: 'rightindent'},
 ];

export const BLOCK_TYPE_DROPDOWN = [
  {label: '', style: ''},
  {label: 'Normal', style: 'unstyled'},
  {label: 'Heading 1', style: 'header-one'},
  {label: 'Heading 2', style: 'header-two'},
  {label: 'Heading 3', style: 'header-three'},
];

export const BLOCK_TYPE_BUTTONS = [
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Blockquote', style: 'blockquote'},
];

export const INLINE_TYPE_FONTDROPDOWN = [
  {label: '', style: ''},
  {label: 'Arial', style: 'ARIAL'},
  {label: 'Courier New', style: 'COURIER'},
  {label: 'Georgia', style: 'GEORGIA'},
  {label: 'Tahoma', style: 'TAHOMA'},
  {label: 'Times New Roman', style: 'TIMES'},
  {label: 'Trebuchet', style: 'HELVETICA'},
  {label: 'Verdana', style: 'VERDANA'},
];

export const INLINE_TYPE_FONTSIZEDROPDOWN = [
  {label: '', style: ''},
  {label: '8', style: 'FONTSIZE8px'},
  {label: '9', style: 'FONTSIZE9px'},
  {label: '10', style: 'FONTSIZE10px'},
  {label: '11', style: 'FONTSIZE11px'},
  {label: '12', style: 'FONTSIZE12px'},
  {label: '14', style: 'FONTSIZE14px'},
  {label: '16', style: 'FONTSIZE16px'},
  {label: '18', style: 'FONTSIZE18px'},
  {label: '20', style: 'FONTSIZE20px'},
  {label: '22', style: 'FONTSIZE22px'},
];

export const INLINE_TYPE_COLORDROPDOWN = [
  {label: 'Black', style: 'BLACK'},
  {label: 'Gray', style: 'GRAY'},
  {label: 'Red', style: 'RED'},
  {label: 'Green', style: 'GREEN'},
  {label: 'Blue', style: 'BLUE'},
  {label: 'Yellow', style: 'YELLOW'},
  {label: 'Aqua', style: 'AQUA'},
  {label: 'Coral', style: 'CORAL'},
  {label: 'White', style: 'WHITE'},
  {label: 'Orchid', style: 'ORCHID'},
  {label: 'DarkMagenta', style: 'DARKMAGENTA'},
  {label: 'LightSkyBlue', style: 'LIGHTSKYBULE'},
  {label: 'GreenYellow', style: 'GREENYELLOW'},
  {label: 'SlateBlue', style: 'SLATEBLUE'},
  {label: 'Turquoise', style: 'TURQUOISE'},
  {label: 'Sienna', style: 'SIENNA'},
  {label: 'Plum', style: 'PLUM'},
  {label: 'PeachPuff', style: 'PEACHPUFF'},
  {label: 'PaleGreen ', style: 'PALEGREEN'},
  {label: 'PaleTurquoise', style: 'PALETURQUOISE'},
  {label: 'Olive', style: 'OLIVE'},
  {label: 'Peru', style: 'PERU'},
  {label: 'Salmon', style: 'SALMON'},
  {label: 'Navy', style: 'NAVY'},
  {label: 'Moccasin', style: 'MOCCASIN'},
  ];

export const MASTER_EDITOR = {
  basicDropdowns: [
    {label: 'Paragraph', config: BLOCK_TYPE_DROPDOWN, blockMethod: 'getCurrentBlockType', changeMethod: 'toggleBlockType' },
    {label: 'Font', config: INLINE_TYPE_FONTDROPDOWN, blockMethod: 'getCurrentBlockType', changeMethod: 'toggleInlineStyle' },
    {label: 'Size', config: INLINE_TYPE_FONTSIZEDROPDOWN, blockMethod: 'getCurrentBlockType', changeMethod: 'toggleInlineStyle' },
  ],
  basicButtons: [
    { draftStyle:'inline', config: INLINE_STYLE_BUTTONS, blockMethod: 'getCurrentBlockType',changeMethod: 'toggleInlineStyle', },
    { draftStyle:'block', config:  BLOCK_TYPE_BUTTONS, blockMethod: 'getCurrentBlockType',changeMethod: 'toggleBlockType', },
  ]
};

export default {
  INLINE_STYLE_BUTTONS,
  BLOCK_TYPE_DROPDOWN,
  BLOCK_TYPE_BUTTONS,
  INLINE_TYPE_FONTDROPDOWN,
  INLINE_TYPE_FONTSIZEDROPDOWN,
  INLINE_TYPE_COLORDROPDOWN,
  MASTER_EDITOR,
};
