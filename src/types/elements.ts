export type ElementType = 'text' | 'image' | 'rectangle' | 'circle';

export interface CanvasElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  style?: {
    color?: string;
    fontSize?: number;
    backgroundColor?: string;
  };
}