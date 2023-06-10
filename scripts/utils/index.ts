import cmd from "child_process";
import path from "path";
import colors from "colors";
import type { PromptObject } from "prompts";

import prompts = require("prompts");

export async function promptTask (params: PromptObject[], cb: (_: Record<string, any>) => any|Promise<any>) {
  let canceled = false;
  const response = await prompts(params, {
    onCancel: () => {
      console.log(colors.red("Program canceled"));
      canceled = true;
    }
  });

  if (!canceled) {
    await cb(response);
  }
}

export function getAbsolutePath (...s: string[]) {
  return path.join(__dirname, "..", "..", ...s);
}

export function getRebuildPath (...s: string[]) {
  return getAbsolutePath("public", "rebuild", ...s);
}

export function getDistPath (...s: string[]) {
  return getAbsolutePath(".output", "public", ...s);
}

export async function runCmd (command: string) {
  return await new Promise<void>((resolve, reject) => {
    cmd.exec(command, {
      maxBuffer: 1024 * 1024 * 5
    }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    }).stdout?.pipe(process.stdout);
  });
}

export function nbLog (s: string, head = "generate") {
  // eslint-disable-next-line no-console
  console.log(`[${colors.blue.bold(head)}] ${colors.green(s)}`);
}

export type ImgMap = Record<string, {
  newUrl: string,
  appearIn: string[]
}>

export * from "./encrypt";
export * from "./rss";
