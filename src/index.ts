#!/usr/bin/env node
import shell from "shelljs";
import inquirer from "inquirer";

const commands = {
  Vite: "npx create-vite@latest",
  "Next.js": "npx create-next-app@latest",
  Svelte: "npm create svelte@latest",
  Vue: "npm create vue@latest",
};

type Answers = { framework: keyof typeof commands };

const main = async () => {
  const answer: Answers = await inquirer.prompt({
    type: "list",
    name: "framework",
    message: "Which project do you want to start?",
    choices: Object.keys(commands),
  });

  const command = commands[answer.framework];
  if (shell.which("pbcopy")) {
    // macOS
    console.log(`=== Command copied to clipboard ===`);
    shell.echo(command).exec("pbcopy");
    console.log(`=== Paste to run ===`);
  } else if (shell.which("xclip")) {
    // Linux
    console.log(`=== Command copied to clipboard ===`);
    shell.echo(command).exec("xclip -selection clipboard");
    console.log(`=== Paste to run ===`);
  } else if (shell.which("clip")) {
    // Windows
    console.log(`=== Command copied to clipboard ===`);
    shell.echo(command).exec("clip");
    console.log(`=== Paste to run ===`);
  } else {
    console.log(
      "No clipboard command found. Please copy the following command manually."
    );
    console.log(command);
  }
};

main();
