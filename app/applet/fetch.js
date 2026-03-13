const https = require('https');
const fs = require('fs');

https.get('https://spendx-seven.vercel.app/assets/index-B04aiD40.js', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // extract strings that look like JSX classNames or text
    const matches = data.match(/className:"[^"]+"/g);
    if (matches) {
      fs.writeFileSync('classes.txt', matches.join('\n'));
    }
    const textMatches = data.match(/"([^"]{10,100})"/g);
    if (textMatches) {
      fs.writeFileSync('text.txt', textMatches.join('\n'));
    }
    console.log("Done");
  });
});
