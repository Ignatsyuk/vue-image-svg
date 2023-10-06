import Image from './components/Image.vue'

export { Image }

export default {
  install: (app, options) => {
    return app.component('Image', Image)
  }
}