const https = require('https');

https.get('https://localx-beta.vercel.app', (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    console.log('HTML length:', html.length);
    const vids = html.match(/https?:\/\/[^"' ]+\.(mp4|webm)/gi) || [];
    console.log('HTML direct vids:', vids);
    const jsFiles = html.match(/\/assets\/[^"']+\.js/g) || [];
    console.log('JS files:', jsFiles);
    for (const j of jsFiles) {
      https.get('https://localx-beta.vercel.app' + j, (r2) => {
        let js = '';
        r2.on('data', c => js += c);
        r2.on('end', () => {
          const v = js.match(/https?:\/\/[^"' ]+\.(mp4|webm)/gi) || [];
          if (v.length > 0) {
            console.log('Found in', j, ':', [...new Set(v)]);
          }
          const manus = js.match(/https:\/\/files\.manuscdn\.com\/[^"' ]+/gi) || [];
          if (manus.length > 0) {
            console.log('Manus files in', j, ':', [...new Set(manus)]);
          }
        });
      });
    }
  });
});
