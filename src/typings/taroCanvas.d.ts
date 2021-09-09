
export interface Config {
  width: number;
  height: number;
  backgroundColor?: string;
  debug?: boolean;
  pixelRatio?: number;
  preload?: boolean;
  'hide-loading'?: boolean;
  blocks?: Block[];
  texts?: Text[];
  images?: Image[];
  lines?: Line[];
}


export interface Block {
  x: number;
  y: number;
  width?: number;
  height: number;
  paddingLeft?: number;
  paddingRight?: number;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  text?: Text;
  opacity?: number;
  zIndex?: number;
}

export interface Text {
  x: number;
  y: number;
  text: string | {
    text: string;
    marginLeft: number;
    marginRight: number;
  };
  fontSize: number;
  color?: string;
  opacity?: 1 | 0;
  lineHeight?: number;
  lineNum?: number;
  width?: number;
  marginLeft?: number;
  marginRight?: number;
  textDecoration?: 'line-through' | 'none';
  baseLine?: 'top' | 'middle' | 'bottom';
  textAlign?: 'left' | 'center' | 'right';
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  zIndex?: number;
}

export interface Image {
  x: number;
  y: number;
  url: string;
  width: number;
  height: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  zIndex?: number;
}

export interface Line {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  width: number;
  color?: string;
  zIndex?: number;
}

export type DrawType = 'text' | 'image' | 'block' | 'line';

export type DrawArrayItem = {
  type?: DrawType;
} & (Line | Image | Block | Text);
