import crypto from "crypto";

const secret = '7SvvsRSZSJ4lcMsFP3dLjtk+ie3as/eI';
const algorithm = 'aes-256-ctr';

const encrypt = (text: string) => {
  const initializationVector = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secret, initializationVector);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
      initializationVector: initializationVector.toString('hex'),
      content: encrypted.toString('hex')
  };
};

const decrypt = (hash: string, initializationVector: string) => {
  const decipher = crypto.createDecipheriv(algorithm, secret, Buffer.from(initializationVector, 'hex'));
  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);
  return decrpyted.toString();
};


const result = encrypt("teste");

console.log(result)
console.log(decrypt(result.content, result.initializationVector))