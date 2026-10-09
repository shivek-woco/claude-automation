# Dependency Audit Report — 2026-10-09

**Command requested:** `npm run audit`
**Result:** failed — `package.json` has no `audit` script (`npm error Missing script: "audit"`).
The report below was produced with the built-in `npm audit` against `package-lock.json` instead.

## Summary

| Severity | Count |
|---|---|
| Critical | 0 |
| **High** | **8** |
| Moderate | 0 |
| Low | 0 |
| **Total** | **8** (of 403 dependencies: 16 prod, 349 dev) |

All 8 packages are rated **high** by npm. Within that tier, packages are ordered below by their highest
advisory CVSS score, then by impact (production runtime before dev-only tooling).

## Findings (highest risk first)

| # | Package | Installed | Severity | Max CVSS | Direct? | Prod/Dev | Fix |
|---|---|---|---|---|---|---|---|
| 1 | `next` | 16.3.6 | high | 6.5 (SSRF) + 5 others | Yes | prod | Upgrade to **16.3.8+** (latest 16.4.0), non-breaking |
| 2 | `source-map-js` | 1.2.1 | high | 7.5 | No (via `postcss`) | prod | `npm audit fix` → 1.2.2+ |
| 3 | `sharp` | 0.35.4 | high | n/a (librsvg CVE) | No (optional dep of `next`) | prod (optional) | `npm audit fix` → 0.35.5+ |
| 4 | `braces` | 3.0.3 | high | 7.5 | No | dev | Root of the eslint chain below |
| 5 | `micromatch` | 4.0.8 | high | — (via `braces`) | No | dev | Via chain |
| 6 | `fast-glob` | 3.3.1 | high | — (via `micromatch`) | No | dev | Via chain |
| 7 | `@next/eslint-plugin-next` | — | high | — (via `fast-glob`) | No | dev | Via chain |
| 8 | `eslint-config-next` | 16.3.6 | high | — (via plugin) | Yes | dev | See note — do **not** apply npm's suggested fix |

## Details

### 1. `next` 16.3.6 — direct, production (6 advisories, fixed in 16.3.8)
| Severity | CVSS | Advisory | Title |
|---|---|---|---|
| high | 6.5 | [GHSA-cjq9-62q9-8jv4](https://github.com/advisories/GHSA-cjq9-62q9-8jv4) | Server-Side Request Forgery in Image Optimization |
| moderate | 5.3 | [GHSA-4jqv-mc3x-m676](https://github.com/advisories/GHSA-4jqv-mc3x-m676) | Cache poisoning of SSG and ISR pages in self-hosted apps |
| moderate | 5.3 | [GHSA-f87g-xv8r-7p7x](https://github.com/advisories/GHSA-f87g-xv8r-7p7x) | Info disclosure in App Router metadata image routes via dynamicParams bypass |
| moderate | 4.8 | [GHSA-mcj8-r9mp-w47p](https://github.com/advisories/GHSA-mcj8-r9mp-w47p) | SSG/ISR cache poisoning → cross-user content substitution / persistent DoS |
| moderate | 4.2 | [GHSA-3w37-wq28-93x7](https://github.com/advisories/GHSA-3w37-wq28-93x7) | Pending `use cache` fill can leak Draft Mode content |
| low | 5.4 | [GHSA-39w2-rjm5-chcv](https://github.com/advisories/GHSA-39w2-rjm5-chcv) | Info disclosure in dev server's MCP endpoint |

**Action:** bump `next` (and `eslint-config-next` to match) to 16.3.8 or later. This is the most important fix — it is the only directly-shipped runtime package and carries an SSRF.

### 2. `source-map-js` 1.2.1 — transitive via `postcss`
- high, CVSS 7.5 — [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q): event-loop DoS via indexed source-map section offsets (affects `>=1.0.0 <1.2.2`).
- **Action:** `npm audit fix` (in-range bump, `postcss` allows `^1.2.1`).

### 3. `sharp` 0.35.4 — optional dependency of `next`
- high — [GHSA-wq5f-xc86-pv6w](https://github.com/advisories/GHSA-wq5f-xc86-pv6w): vulnerability in bundled librsvg (CVE-2026-96889), affects `<0.35.5`.
- **Action:** `npm audit fix` (in-range bump, `next` allows `^0.35.4`). Relevant to image optimization.

### 4–8. ESLint chain — dev-only
`eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob@3.3.1` → `micromatch@4.0.8` → `braces@3.0.3`
- Root cause: `braces` — high, CVSS 7.5 — [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm): stack-exhaustion DoS through deeply nested patterns (`<=3.0.3`).
- Dev tooling only; not shipped to production. Exposure is limited to lint runs on untrusted glob patterns.
- **Note:** npm's suggested fix is `eslint-config-next@14.2.35`, flagged as a semver-major change — that is a **downgrade** two majors behind `next@16` and should not be applied. Wait for a patched `braces`/`fast-glob` upstream (or a newer `eslint-config-next`), or use an `overrides` entry once a fixed `braces` is published.

## Recommended next steps
1. Upgrade `next` + `eslint-config-next` to ≥16.3.8 (requires editing `package.json`/lockfile — needs maintainer approval per repo rules).
2. Run `npm audit fix` (without `--force`) to pick up `source-map-js` and `sharp`.
3. Re-run lint, `npx tsc --noEmit`, and `npm run build`.
4. Optionally add `"audit": "npm audit"` to `package.json` scripts so the scheduled `npm run audit` command works.
