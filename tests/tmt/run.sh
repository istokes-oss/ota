#!/bin/bash

set -e

REPO_ROOT="$(git rev-parse --show-toplevel)"

cd "$REPO_ROOT"

node tools/validate-fixture.js tests/html/arbites.html
