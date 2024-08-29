import core from "@actions/core";
import github from "@actions/github";
import { context } from "@actions/github";

(async () => {
  const token = core.getInput("github_token", { required: true });
  const octokit = github.getOctokit(token);

  const issue_number = context.payload.issue.number;
  const { owner, repo } = context.repo;

  const body = context.payload.issue.body.trim();

  // this is about to be real ugly

  // detect command with regex
  const matches = body.match(/\.([a-zA-Z]+)\n```yaml\n([\S\s]*?)\n```/gm);

  core.info(matches);
  if (!matches) {
    core.info("❌ No commands found in issue body, gettin' outta here");
    return;
  }

  core.info("✅ Found commands in issue body, let's do this");
})();
