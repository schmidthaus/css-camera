export type ValueOf<T> = T[keyof T];

export type Matrix4x4 = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
];

export interface Offset {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface UpdateOption {
  property: CSSStyleDeclaration['transitionProperty'];
  timingFunction: CSSStyleDeclaration['transitionTimingFunction'];
  delay: CSSStyleDeclaration['transitionDelay'];
}
