import core from "@actions/core";
import github from "@actions/github";
import { context } from "@actions/github";

core.notice("Hello from episode-issues action!");

(async () => {
  const token = core.getInput("github_token", { required: true });
  const octokit = github.getOctokit(token);

  const issue_number = context.payload.issue.number;
  const { owner, repo } = context.repo;

  const body = context.payload.issue.body.trim();

  // for debugging
  core.info(`Issue number: ${issue_number}`);
  core.info(`Owner: ${owner}`);
  core.info(`Repo: ${repo}`);
  core.info(`Comment body: ${body}`);

  core.info("Fuck off");
})();
