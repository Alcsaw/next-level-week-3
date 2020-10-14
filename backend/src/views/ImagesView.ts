import Image from '../models/Image';

export default {
  render(image: Image) {
    //TODO: change URL using .env
    // https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`
    };
  },

  renderMany(images: Image[]) {
    return images.map(image => this.render(image));
  }
};
