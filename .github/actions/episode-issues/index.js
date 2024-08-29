import core from "@actions/core";
import github from "@actions/github";
import { context } from "@actions/github";

(async () => {
  const token = core.getInput("github_token", { required: true });
  const octokit = github.getOctokit(token);

  core.setOutput("changed", false);

  const issue_number = context.payload.issue.number;
  const { owner, repo } = context.repo;

  const body = context.payload.issue.body;

  // this is about to be real ugly
  // detect command with regex
  const regex =
    /\.([a-zA-Z]+) (s[0-9]+e[0-9]+)[\r\n]+```yaml[\r\n]+([\S\s]*?)[\r\n]+[\s]*?```/;
  const matches = body.match(regex);

  if (!matches) {
    core.notice("❌ No commands found in issue body, gettin' outta here");
  }

  const command = matches[1].toLowerCase();
  const identifier = matches[2];
  const yaml = matches[3];
  core.notice(`✅ Found command in issue body, command is ${command}`);

  switch (command) {
    case "createepisode":
      core.notice(`🎉 Creating episode '${identifier}'`);
      // create file "src/content/${identifier}.yaml" with yaml content
      const fs = require("fs");
      const path = require("path");

      const contentPath = path.join("src", "content", `${identifier}.yaml`);
      fs.writeFileSync(contentPath, yaml);

      // reply to issue with success message
      await octokit.issues.createComment({
        owner,
        repo,
        issue_number,
        body: `✅ Recognized command, created episode '${identifier}'.`,
      });
      core.setOutput("changed", true);

      core.notice("✅ Done creating episode");
      break;

    default:
      core.notice("❌ Command not recognized, gettin' outta here");
  }
})();
