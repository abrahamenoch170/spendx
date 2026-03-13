import https from 'https';
import fs from 'fs';

https.get('https://spendx-seven.vercel.app/assets/index-B04aiD40.js', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync('/app/applet/index.js', data);
    console.log('Downloaded index.js');
  });
});
