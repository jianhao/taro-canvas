export type DrawType = 'text' | 'image' | 'block' | 'line';

export interface Block {
  type?: DrawType
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
  type?: DrawType
  x?: number;
  y?: number;
  text: string | Text [];
  fontSize?: number;
  color?: string;
  opacity?: 1 | 0;
  lineHeight?: number;
  lineNum?: number;
  width?: number;
  marginTop?: number;
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
  type?: DrawType
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
  type?: DrawType
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  width: number;
  color?: string;
  zIndex?: number;
}

export type DrawConfig = {
  width: number,
  height: number,
  backgroundColor?: string,
  debug?: boolean,
  blocks?: Block[],
  texts?: Text[],
  images?: Image[],
  lines?: Line[],
}

