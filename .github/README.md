# Scheduled Website Opener

This repository contains a GitHub Actions workflow designed to access a specific website at a regular, semi-random interval.

## How It Works

- A workflow is scheduled to run every **10 minutes**.
- When triggered, the job waits for a random duration of **0 to 8 minutes**.
- After the delay, it uses `curl` to send a request to the target URL specified in the workflow file.

## Purpose

This is intended as a demonstration of GitHub Actions scheduling, random delays, and basic web requests.

## Configuration

The target URL can be changed by editing the `TARGET_URL` environment variable in the `.github/workflows/open-website.yml` file.
