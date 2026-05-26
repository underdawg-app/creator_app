#!/bin/bash
set -e

# Only run when archiving / producing a dSYM bundle (Release).
if [ "${CONFIGURATION}" != "Release" ]; then
  echo "[hermes-dsym] Skipping — CONFIGURATION=${CONFIGURATION}"
  exit 0
fi

if [ -z "${DWARF_DSYM_FOLDER_PATH}" ]; then
  echo "[hermes-dsym] DWARF_DSYM_FOLDER_PATH is unset; skipping."
  exit 0
fi

HERMES_FRAMEWORK="${CONFIGURATION_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}/hermes.framework"
HERMES_BINARY="${HERMES_FRAMEWORK}/hermes"
HERMES_DSYM="${DWARF_DSYM_FOLDER_PATH}/hermes.framework.dSYM"

if [ ! -f "${HERMES_BINARY}" ]; then
  echo "[hermes-dsym] hermes binary not found at ${HERMES_BINARY}; nothing to do."
  exit 0
fi

if [ -d "${HERMES_DSYM}" ]; then
  echo "[hermes-dsym] dSYM already present at ${HERMES_DSYM}; nothing to do."
  exit 0
fi

mkdir -p "${DWARF_DSYM_FOLDER_PATH}"
echo "[hermes-dsym] Generating dSYM for hermes via dsymutil…"
dsymutil "${HERMES_BINARY}" -o "${HERMES_DSYM}"
echo "[hermes-dsym] Wrote ${HERMES_DSYM}"
