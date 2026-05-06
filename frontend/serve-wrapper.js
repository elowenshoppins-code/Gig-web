#!/usr/bin/env node

// Custom serve wrapper that runs yarn start
const { spawn } = require('child_process');

console.log('🚀 Starting GigZipFinder frontend with yarn start...');

const start = spawn('yarn', ['start'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PORT: process.env.PORT || '3000' }
});

start.on('close', (code) => {
  process.exit(code);
});
