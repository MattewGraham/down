import { exec } from "child_process";

function delay(ms = 1000*20) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const execute = async () => {
  for (let index = 0; index < 100000; index++) {
    try {
      exec(`rm -rf node_modules`);
      exec(`rm -rf pnpm-lock.yaml`);
      exec(`pnpm store prune`);
      exec(`pnpm install`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
          return;
        }
        return;
      });
      await delay();
    } catch (error) {}
  }
};
execute();