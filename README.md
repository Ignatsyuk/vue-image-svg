# Vue Image SVG

Universal Vue 3 component for images and SVGs with inline mode.

## Install

### NPM

```bash
npm install vue-image-svg
```

Register locally in your component
```js
import { Image } from 'vue-image-svg';

export default {
    components: {
        Image
    }
};
```

Or register globally
```js
import Image from 'vue-image-svg';
import { createApp } from 'vue';

const app = createApp(App);

app.use(Image);
```

## Usage

```html
<Image 
    src="image.svg" 
    alt="Best image ever!"
></Image>
``` 

### props
#### - `src`
Path to image file

```html
<Image src="/image.svg" />
```

#### - `alt`
An alternate text for an image, if the image cannot be displayed

```html
<Image src="/image.svg" alt="Application Logo" />
```

## License

MIT License