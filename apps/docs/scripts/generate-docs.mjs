import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { generateFiles } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';

const scriptPath = fileURLToPath(import.meta.url);
const docsRoot = path.resolve(path.dirname(scriptPath), '..');
const apiResPath = process.env.API_RES_PATH || 'openapi';
const openapiPath = path.join(docsRoot, 'openapi', 'af-api.json');
const outputPath = `./content/docs/${apiResPath}/(generated)`;
const absoluteOutputPath = path.resolve(docsRoot, outputPath);

const resolveApiRoot = () => {
  const configuredRoot = process.env.AF_API_ROOT || '../../../af_api';

  return path.resolve(docsRoot, configuredRoot);
};

const resolvePython = (apiRoot) => {
  if (process.env.AF_API_PYTHON) return process.env.AF_API_PYTHON;

  const windowsVenvPython = path.join(apiRoot, '.venv', 'Scripts', 'python.exe');
  if (existsSync(windowsVenvPython)) return windowsVenvPython;

  const unixVenvPython = path.join(apiRoot, '.venv', 'bin', 'python');
  if (existsSync(unixVenvPython)) return unixVenvPython;

  return process.platform === 'win32' ? 'python' : 'python3';
};

const exportAfOpenApi = () => {
  if (process.env.AF_OPENAPI_SKIP_EXPORT === 'true') {
    console.info('Skipped AF OpenAPI export; using existing openapi/af-api.json.');
    return;
  }

  const apiRoot = resolveApiRoot();
  const python = resolvePython(apiRoot);
  const exporter = path.join(docsRoot, 'scripts', 'export-af-openapi.py');

  if (!existsSync(apiRoot)) {
    throw new Error(`AF API root was not found at ${apiRoot}. Set AF_API_ROOT to the backend path.`);
  }

  const result = spawnSync(python, [exporter], {
    cwd: docsRoot,
    env: {
      ...process.env,
      AF_API_ROOT: apiRoot,
      AF_OPENAPI_OUTPUT: openapiPath,
    },
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    throw new Error(`AF OpenAPI export failed with exit code ${result.status ?? 'unknown'}.`);
  }
};

const run = async () => {
  exportAfOpenApi();

  await rm(absoluteOutputPath, { recursive: true, force: true });
  console.info(`Cleared generated OpenAPI docs at ${absoluteOutputPath}\n`);

  const openapi = createOpenAPI({
    input: [openapiPath],
  });

  await generateFiles({
    input: openapi,
    output: outputPath,
    includeDescription: true,
  });
};

run().catch((error) => {
  console.error('Failed to build AF OpenAPI docs', error);
  process.exitCode = 1;
});
