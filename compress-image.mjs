import sharp from 'sharp'

await sharp('src/assets/goutham.jpg')
  .resize(400, 400, { fit: 'cover', position: 'top' })
  .jpeg({ quality: 82, progressive: true })
  .toFile('src/assets/goutham-opt.jpg')

console.log('Image compressed to src/assets/goutham-opt.jpg')
