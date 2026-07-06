const http = require('http');

const options = {
  hostname: 'localhost',
  port: process.env.PORT || 5000,
  path: '/api/health',
  method: 'GET',
  timeout: 5000
};

console.log('Verifying deployment...');

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✓ Health check passed');
      console.log('Response:', data);
      process.exit(0);
    } else {
      console.error('✗ Health check failed');
      console.error('Status:', res.statusCode);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('✗ Deployment verification failed:', error.message);
  process.exit(1);
});

req.on('timeout', () => {
  req.destroy();
  console.error('✗ Request timeout');
  process.exit(1);
});

req.end();
