const https = require('https');

const target = 'https://localx-hazel.vercel.app';

https.get(target, (res) => {
  console.log('Status of localx-hazel:', res.statusCode);
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    const jsFiles = html.match(/\/assets\/[^"']+\.js/g) || [];
    console.log('JS files on localx-hazel:', jsFiles);
    if (jsFiles[0]) {
      https.get(target + jsFiles[0], (r2) => {
        let js = '';
        r2.on('data', c => js += c);
        r2.on('end', () => {
          const mp4s = js.match(/https:\/\/[^"' ]+\.mp4/g) || [];
          console.log('MP4 files on localx-hazel:');
          console.log([...new Set(mp4s)]);

          const manus = js.match(/https:\/\/files\.manuscdn\.com\/[^"' ]+/g) || [];
          console.log('Manus files on localx-hazel:');
          console.log([...new Set(manus)]);

          const imgs = js.match(/https:\/\/images\.unsplash\.com\/[^"' ]+/g) || [];
          console.log('Unsplash images on localx-hazel:');
          console.log([...new Set(imgs)].slice(0, 10));

          const allUrls = js.match(/https?:\/\/[^"' ]+\.(mp4|webm|jpg|jpeg|png|svg|webp)/gi) || [];
          console.log('All media URLs:');
          console.log([...new Set(allUrls)]);
        });
      });
    }
  });
});
