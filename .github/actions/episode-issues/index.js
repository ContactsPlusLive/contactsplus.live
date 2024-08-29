import core from "@actions/core";
import github from "@actions/github";
import { context } from "@actions/github";

async () => {
  try {
    const token = core.getInput("repo-token", { required: true });
    const octokit = github.getOctokit(token);

    const issue_number = context.payload.issue.number;
    const { owner, repo } = context.repo;

    const body = context.payload.comment.body.trim();

    // for debugging
    core.info(`Issue number: ${issue_number}`);
    core.info(`Owner: ${owner}`);
    core.info(`Repo: ${repo}`);
    core.info(`Comment body: ${body}`);

    return;
  } catch (error) {
    core.setFailed(error.message);
  }
};
