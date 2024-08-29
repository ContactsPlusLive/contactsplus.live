import core from "@actions/core";
import github from "@actions/github";
import { context } from "@actions/github";

const token = core.getInput("github_token", { required: true });
const octokit = github.getOctokit(token);

const issue_number = context.payload.issue.number;
const { owner, repo } = context.repo;

const body = context.payload.issue.body;
const str = `awdawd
.createEpisodeaw
\`\`\`yaml
---
season: 4
episode: 60
title: Dementia, Pineapple on Pizza, and Headless Lounge Love??
description: In this episode, some returning guests and our resident blue wolf play some old and brand new games around the classic "Whose Line Is It Anyway?" format.
format: whoseLine
airDate: 2024-05-25
duration: "02:03:17"
ytID: 1qqVYa4d9Wg
tags:
  - game show
crew:
  - name: Wolf Seisenbacher
    role: host
  - name: GlitchFlux
    role: cohost
  - name: NootSponge
    role: producer
  - name: Matorin Talfax
    role: cameraSwitcher
  - name: RaspberryKitty1
    role: cohost
guests:
  - Defhammer
  - Namogod
  - SlyTheFloof
  - Cloud_striker
  - Cerealbowl
  - Beethoven
\`\`\`
awdawd`;

core.info(body);
core.info(str);

const regex = /\.([a-zA-Z]+)\n```yaml\n([\S\s]*?)\n[\s]*?```/;

core.info(JSON.stringify(body.match(regex)));

// this is about to be real ugly
// detect command with regex
// const regex = /\.([a-zA-Z]+)\n```yaml\n([\S\s]*?)\n```/gm;
// const matches = regex.exec(body);

// core.info(matches);
// if (!matches) {
//   core.info("❌ No commands found in issue body, gettin' outta here");
// }

// core.info("✅ Found commands in issue body, let's do this");
