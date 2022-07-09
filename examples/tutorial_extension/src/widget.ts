import { Widget } from "@lumino/widgets";
import { requestAPI } from "./handler";

export class TutorialWidget extends Widget {
  constructor() {
    super();
    this.img = document.createElement('img');
    this.img.src = ''
    this.node.appendChild(this.img);
    this.load_image()
  }

  load_image() {
    // This is an example API call to the server extension associated with
    // this jupyterlab extension. It uses the generated handler.ts utility
    requestAPI<any>('image')
      .then(data => {
        console.log(data);
        this.img.src = data.image_url
      })
      .catch(reason => {
        console.error(
          `The tutorial_extension server extension appears to be missing.\n${reason}`
        );
      });
  }

  img: HTMLImageElement;
}