import { exec } from "child_process";
import { platform } from "os";
import fs from "fs";
import path from "path";

// Accept a file path (absolute or relative). Resolve relative paths against cwd.
const filePath = process.argv[2];
if (!filePath) {
  console.error("> ファイルを指定してください。");
  process.exit(1);
}

const resolvedPath = path.isAbsolute(filePath)
  ? filePath
  : path.resolve(process.cwd(), filePath);

if (!fs.existsSync(resolvedPath)) {
  console.error(`> 指定されたファイルが存在しません: ${resolvedPath}`);
  process.exit(1);
}

// Quote the path when passing to the shell to handle spaces and special chars.
const quoted = `"${resolvedPath}"`;

// Helper to run a shell command and return a promise resolved with whether it succeeded
const run = (cmd) =>
  new Promise((resolve) => {
    exec(cmd, (err) => {
      resolve(!err);
    });
  });

const openFile = async () => {
  switch (platform()) {
    case "darwin":
      await run(`open ${quoted}`);
      break;
    case "win32":
      // Prefer opening with a browser. Build file:// URL for browser protocols.
      const fileUrl = `file:///${resolvedPath.replace(/\\/g, "/")}`;
      // Try Edge protocol, then common browser commands, then fallback to default app
      const fileUrlQuoted = `"${fileUrl}"`;
      // The user requested Chrome only. Try to open the file in Chrome directly.
      // This uses the 'start' helper so the command works from PowerShell/cmd.
      const chromeCmd = `start "" chrome ${fileUrlQuoted}`;
      const ok = await run(chromeCmd);
      if (!ok) {
        console.error(`failed to open with Chrome via command: ${chromeCmd}`);
      }
      break;
    case "linux":
      await run(`xdg-open ${quoted}`);
      break;
    default:
      console.error("Unsupported OS");
      process.exit(1);
  }

  console.log(`> Opening in default app (or browser): ${resolvedPath}`);
};

openFile();
