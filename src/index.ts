#!/usr/bin/env node
import shell from "shelljs";
import inquirer from "inquirer";

const commands = {
  Vite: "npx create-vite@latest",
  "Next.js": "npx create-next-app@latest",
};

const main = async () => {
  const answer: keyof typeof commands = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Which project do you want to start?",
      choices: Object.keys(commands),
    },
  ]);

  const command = commands[answer];
  if (shell.which("pbcopy")) {
    // macOS
    shell.echo(command).exec("pbcopy");
  } else if (shell.which("xclip")) {
    // Linux
    shell.echo(command).exec("xclip -selection clipboard");
  } else if (shell.which("clip")) {
    // Windows
    shell.echo(command).exec("clip");
  } else {
    console.log(
      "No clipboard command found. Please copy the following command manually."
    );
    console.log(command);
  }
};

main();
