import * as tf from '@tensorflow/tfjs';

class Model {
  async init() {
    this.model = await tf.loadLayersModel('model/model.json');
  }

  async predict(pic) {
    const data = new Array();
    for (var i = 0; i < pic.data.length; i += 4) {
      var R = pic.data[i];
      var G = pic.data[i + 1];
      var B = pic.data[i + 2];
      var gray = R * 0.299 + G * 0.587 + B * 0.114;
      data.push(gray / 255);
    }
    const input = tf.tensor1d(data).reshape([1, 48, 48, 1]);
    const res = await this.model.predict(input).data();
    var arr = new Array();
    for (var i = 0; i < 7; i++) arr.push(res[i]);
    return arr;
  }
}

const model = new Model();
model.init();

export default model;
