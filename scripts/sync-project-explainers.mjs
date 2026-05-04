import { spawnSync } from 'node:child_process';
import path from 'node:path';

const repoRoot = process.cwd();
const generatorPath = path.join(repoRoot, 'scripts', 'generate_explainer_pdfs.py');
const candidates =
  process.platform === 'win32'
    ? [
        { command: 'python', args: [] },
        { command: 'py', args: ['-3'] },
        { command: 'python3', args: [] },
      ]
    : [
        { command: 'python3', args: [] },
        { command: 'python', args: [] },
      ];

function run(candidate) {
  return spawnSync(candidate.command, [...candidate.args, generatorPath], {
    cwd: repoRoot,
    shell: false,
    stdio: 'inherit',
  });
}

function main() {
  for (const candidate of candidates) {
    const version = spawnSync(candidate.command, [...candidate.args, '--version'], {
      cwd: repoRoot,
      shell: false,
      stdio: 'ignore',
    });

    if (version.status !== 0) {
      continue;
    }

    const result = run(candidate);
    process.exit(result.status ?? 0);
  }

  console.log('[sync:explainers] Skipping explainer PDF sync because Python is not available.');
}

main();
