const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
    const token = core.getInput('GITHUB_TOKEN', {required: true});
    const event = core.getInput('EVENT_TYPE', {required: true});
    const message = core.getInput('MESSAGE');

    if (!pullRequest) {
        core.setFailed('🐢 This action isn\'t pull requests. Please run this action on: pull_request');
        process.exit(1);
    }

    if (!['COMMENT','REQUEST_CHANGES'].includes(eventType) && !message) {
        core.setFailed('🐢 EVENT_TYPE is a COMMENT or REQUEST_CHANGES required a MESSAGE.');
        process.exit(1);
    }

    pullRequestReview({
        token,
        prNumber,
        message,
        event,
    });
} catch(e) {
    core.error(err);
    core.setFailed(err.message);
}

function pullRequestReview({token, prNumber, message, event}) {
    let config = {
      method: 'POST',
      data: {
        body: message,
        event: event,
      },
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Token ${token}`,
      },
      url: `https://api.github.com/repos/${github.context.repo.owner}/${github.context.repo.repo}/pulls/${prNumber}/reviews`,
    }
    
    axios(config)
    .then(() => {
      core.info(`Done. PR #${prNumber} 🎉`)
    })
    .catch((err) => {
      core.error(err)
      core.setFailed(err.message)
    })
}