import core from "@actions/core";
import github from "@actions/github";
import { context } from "@actions/github";

const token = core.getInput("github_token", { required: true });
const octokit = github.getOctokit(token);

const issue_number = context.payload.issue.number;
const { owner, repo } = context.repo;

const body = context.payload.issue.body.trim();

// test case
const regex = /\.([a-zA-Z]+)\n```yaml\n([\S\s]*?)\n[\s]*?```/gm;
const m = regex.exec(body);

core.info(m);

// this is about to be real ugly
// detect command with regex
// const regex = /\.([a-zA-Z]+)\n```yaml\n([\S\s]*?)\n```/gm;
const matches = regex.exec(body);

core.info(body);

core.info(matches);
if (!matches) {
  core.info("❌ No commands found in issue body, gettin' outta here");
}

core.info("✅ Found commands in issue body, let's do this");
