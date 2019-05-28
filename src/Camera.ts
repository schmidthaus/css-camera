import { mat4 } from 'gl-matrix';
import Transform from './Transform';
import { getElement, applyCSS, getTransformMatrix } from './utils/helper';
import DEFAULT from './constants/default';


abstract class Camera {
  private _element: HTMLElement;
  private _viewport: HTMLElement;
  private _camera: HTMLElement;

  private _transform: Transform;

  private _fov: number;
  private _orthographic: boolean;

  public get transform() { return this._transform; }
  public get element() { return this._element; }

  constructor(el: string | HTMLElement, isOrthoGraphic: boolean = DEFAULT.ORTHOGRAPHIC) {
    this._element = getElement(el);
    this._fov = DEFAULT.FOV;
    this._orthographic = isOrthoGraphic;
    this._transform = new Transform(0, 0, 0);

    const element = this._element;
    const viewport = document.createElement('div');
    applyCSS(viewport, DEFAULT.STYLE_VIEWPORT);

    const camera = viewport.cloneNode() as HTMLElement;
    viewport.appendChild(camera);

    this._viewport = viewport;
    this._camera = camera;

    // EL's PARENT -> VIEWPORT -> CAMERA -> EL
    element.parentElement!.insertBefore(viewport, element);
    camera.appendChild(element);

    this._init();
  }

  public focus(el: HTMLElement) {
    const elements = [];
    while (el) {
      elements.push(el);
      if (el === this._element) break;
      el = el.parentElement!;
    }

    let matrix = mat4.create();
    elements.reverse().forEach(element => {
      matrix = mat4.mul(matrix, matrix, getTransformMatrix(element)) ;
    });

    const invMatrix = mat4.create();
    mat4.invert(invMatrix, matrix);
    this._camera.style.transform = mat4.str(invMatrix).replace(/mat4/, 'matrix3d');
  }

  public setFOV(fov: number) {
    this._fov = fov;

    this._updatePerspective();
  }

  private _init() {
    this._updatePerspective();
    this._listenResize();
  }

  private _updatePerspective() {
    const perspective = Math.abs(0.25 * this._element.getBoundingClientRect().height /  Math.tan(this._fov * 0.5));
    console.log('PERS', perspective);

    applyCSS(this._viewport, { perspective: `${perspective}px` });
  }

  private _listenResize() {
    window.addEventListener('resize', () => {
      this._updatePerspective();
    });
  }
}

export default Camera;
