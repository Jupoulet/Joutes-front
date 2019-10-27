const { Client } = require('pg');
const url = 'postgres://zclgjoulxlbvvv:ab0d17eb0bce1e3c11ffd2a8b267f96a6e7b88e13f4b26fc7680ed0ea43f3f72@ec2-174-129-253-125.compute-1.amazonaws.com:5432/d12amj2r6icmao'

const client = new Client({
  connectionString: process.env.DATABASE_URL || url,
  ssl: true,
});

console.log('COUCOU');
client.connect();