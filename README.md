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
import { createApp } from 'vue';

import Image from 'vue-image-svg';
import 'vue-image-svg/dist/style.css'; // for SVG coloring

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

#### - `alternative-src`
An alternate path for the image in case of a loading error

```html
<Image src="/image.png" alternative-src="/image-2.png" alt="Application Logo" />
```

## License

MIT License