const Jimp = require('jimp')

Jimp.read('src/assets/goutham.jpg')
  .then(img => img
    .resize(400, 400)
    .quality(82)
    .write('src/assets/goutham-opt.jpg', () => console.log('Done — src/assets/goutham-opt.jpg'))
  )
  .catch(console.error)
