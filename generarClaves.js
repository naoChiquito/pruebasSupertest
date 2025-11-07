const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const dir = path.join(__dirname, 'auth', 'keys');
fs.mkdirSync(dir, { recursive: true });

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

fs.writeFileSync(path.join(dir, 'private.key'), privateKey);
fs.writeFileSync(path.join(dir, 'public.key'), publicKey);

console.log('✅ Claves generadas en auth/keys');