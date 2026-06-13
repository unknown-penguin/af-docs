import { rmSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distPath = path.resolve(appRoot, '.next');
const require = createRequire(import.meta.url);
const nextBin = require.resolve('next/dist/bin/next');
const args = process.argv.slice(2);

if (args[0] === '--') args.shift();

if (!distPath.startsWith(`${appRoot}${path.sep}`)) {
  throw new Error(`Refusing to clean Next distDir outside docs app: ${distPath}`);
}

rmSync(distPath, { recursive: true, force: true });

const child = spawn(process.execPath, [nextBin, 'dev', ...args], {
  cwd: appRoot,
  env: process.env,
  stdio: 'inherit',
});

const stop = (signal) => {
  if (!child.killed) child.kill(signal);
};

process.on('SIGINT', () => stop('SIGINT'));
process.on('SIGTERM', () => stop('SIGTERM'));

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
