import { Widget } from "@lumino/widgets";

export class TutorialWidget extends Widget {
  constructor() {
    super();
    this.img = document.createElement('img');
    this.img.src = 'https://picsum.photos/600/400'
    this.node.appendChild(this.img);
  }

  img: HTMLImageElement;
}