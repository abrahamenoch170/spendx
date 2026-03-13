const https = require('https');

https.get('https://spendx-seven.vercel.app', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(data);
  });
});
