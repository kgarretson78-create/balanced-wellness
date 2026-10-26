# Approved Balanced website release

Kelli approved the Balanced website design and requested production publication on October 26, 2026. This release preserves the exact frontend artifact recovered from the final private preview (Sites source commit d849392a1eb58c46cb1d6f4e3286bac50be3a8d9), rather than rebuilding the older React source at PR38 head c7f08ea and silently losing final preview changes.

`npm run build` verifies the SHA-256 manifest, copies this approved client into dist, and compiles the existing Express API server. All booking links and API paths come from the approved client. No credentials or preview authentication are copied. The server still uses production runtime credentials.

The original editable React source is retained but predates final preview changes; `npm run build:source` builds that development source. Before the next frontend change, reconcile that source against this approved artifact and restore the normal source build. Do not overwrite this release with the earlier source build. This explicit artifact promotion keeps the production design identical to the approved preview and future builds reproducible.

Publication exception: the updated Shelly portrait was blocked by automatic approval review. The release uses her existing public-repository portrait under the expected URL, retaining layout while avoiding new image disclosure.
