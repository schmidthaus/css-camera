import { UpdateOption, Options } from './types';
declare class CSSCamera {
    private _element;
    private _viewportEl;
    private _cameraEl;
    private _worldEl;
    private _position;
    private _scale;
    private _rotation;
    private _perspective;
    private _rotateOffset;
    private _updateTimer;
    static readonly VERSION: string;
    readonly element: HTMLElement;
    readonly viewportEl: HTMLElement;
    readonly cameraEl: HTMLElement;
    readonly worldEl: HTMLElement;
    position: number[];
    scale: number[];
    rotation: number[];
    quaternion: number[];
    perspective: number;
    rotateOffset: number;
    readonly cameraCSS: string;
    readonly worldCSS: string;
    constructor(el: string | HTMLElement, options?: Partial<Options>);
    focus(el: string | HTMLElement): this;
    translateLocal(x?: number, y?: number, z?: number): this;
    translate(x?: number, y?: number, z?: number): this;
    rotate(x?: number, y?: number, z?: number): this;
    update(duration?: number, option?: Partial<UpdateOption>): Promise<this>;
    private _getFocusMatrix;
}
export default CSSCamera;