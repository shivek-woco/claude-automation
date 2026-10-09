# Dependency Audit Report — 2026-10-09

**Command requested:** `npm run audit` — this fails: `package.json` has no `audit` script (`npm error Missing script: "audit"`).
**Command actually run:** `npm audit --json` (npm's built-in audit, against `package-lock.json`).

## Summary

| Severity | Count |
|---|---|
| Critical | 0 |
| **High** | **8** |
| Moderate | 0 |
| Low | 0 |
| **Total** | **8** |

Dependencies scanned: 403 (16 prod, 349 dev, 66 optional).

All 8 packages are rated **high**. They are listed from most to least severe. Ties are broken by: CVSS score first, then whether the package ships to production, then how many advisories it has.

## Findings (most severe first)

| # | Package | Installed | Severity | Highest CVSS | Prod/Dev | Direct? | Fix |
|---|---|---|---|---|---|---|---|
| 1 | `source-map-js` | 1.2.1 | High | 7.5 | Prod (via `next`) | No | Upgrade to ≥ 1.2.2 (`npm audit fix`) |
| 2 | `braces` | 3.0.3 | High | 7.5 | Dev | No | No patched version yet (range `<=3.0.3`) |
| 3 | `next` | 16.3.6 | High | 6.5 (6 advisories) | Prod | **Yes** | Upgrade to **16.4.0** (non-breaking) |
| 4 | `sharp` | 0.35.4 | High | n/a | Prod (optional, via `next`) | No | Upgrade to ≥ 0.35.5 (`npm audit fix`) |
| 5 | `micromatch` | 4.0.8 | High | inherited from `braces` | Dev | No | Depends on `braces` |
| 6 | `fast-glob` | 3.3.1 | High | inherited | Dev | No | Depends on `braces` |
| 7 | `@next/eslint-plugin-next` | — | High | inherited | Dev | No | Depends on `braces` |
| 8 | `eslint-config-next` | 16.3.6 | High | inherited | Dev | **Yes** | npm suggests a downgrade to 14.2.35. **Don't apply it** (see notes) |

### 1. `source-map-js` — High, CVSS 7.5
- **GHSA-68fv-2mgg-jv7q**: offsets in an indexed source-map section can cause an event-loop denial of service. Affected: `>=1.0.0 <1.2.2`.
- https://github.com/advisories/GHSA-68fv-2mgg-jv7q

### 2. `braces` — High, CVSS 7.5
- **GHSA-vfj7-8cjw-p6xm**: deeply nested patterns can exhaust the stack and cause a denial of service (CWE-674). Affected: `<=3.0.3`.
- https://github.com/advisories/GHSA-vfj7-8cjw-p6xm
- This is the root cause of findings 5–8, through the chain `braces → micromatch → fast-glob → @next/eslint-plugin-next → eslint-config-next`. It is lint tooling only and is not part of the shipped app.

### 3. `next` — High, 6 advisories (all fixed in 16.3.8+; latest is 16.4.0)
| Severity | CVSS | Advisory |
|---|---|---|
| High | 6.5 | [GHSA-cjq9-62q9-8jv4](https://github.com/advisories/GHSA-cjq9-62q9-8jv4): Server-Side Request Forgery in Image Optimization |
| Moderate | 5.3 | [GHSA-4jqv-mc3x-m676](https://github.com/advisories/GHSA-4jqv-mc3x-m676): cache poisoning of SSG/ISR pages (self-hosted) |
| Moderate | 5.3 | [GHSA-f87g-xv8r-7p7x](https://github.com/advisories/GHSA-f87g-xv8r-7p7x): info disclosure in App Router metadata image routes via a `dynamicParams` bypass |
| Moderate | 4.8 | [GHSA-mcj8-r9mp-w47p](https://github.com/advisories/GHSA-mcj8-r9mp-w47p): SSG/ISR cache poisoning that serves one user's content to another, plus persistent DoS |
| Moderate | 4.2 | [GHSA-3w37-wq28-93x7](https://github.com/advisories/GHSA-3w37-wq28-93x7): a pending `use cache` fill can leak Draft Mode content into normal responses |
| Low | 5.4 | [GHSA-39w2-rjm5-chcv](https://github.com/advisories/GHSA-39w2-rjm5-chcv): info disclosure in the dev server's MCP endpoint |

`next` is a direct production dependency, so this is the most important item to act on.

### 4. `sharp` — High (no CVSS published)
- **GHSA-wq5f-xc86-pv6w**: vulnerability in the bundled `librsvg` dependency (CVE-2026-96889). Affected: `<0.35.5`.
- https://github.com/advisories/GHSA-wq5f-xc86-pv6w

### 5–8. `micromatch`, `fast-glob`, `@next/eslint-plugin-next`, `eslint-config-next`
These have no advisories of their own. They are flagged only because they depend on the vulnerable `braces` (finding 2), and all of them are dev/lint tooling.

## Recommended actions
1. **Upgrade `next` and `eslint-config-next` together from 16.3.6 to 16.4.0.** This fixes all 6 Next.js advisories. It will probably also pull in patched `sharp` and `source-map-js` through `next`. Then run `npm audit fix` for any remaining transitive fixes.
2. **Do not run `npm audit fix --force`.** It would downgrade `eslint-config-next` to 14.2.35, which doesn't match Next 16.
3. `braces` has no patched release yet. It only affects lint tooling, so it is low practical risk. Re-check on the next run.
4. Optional: add `"audit": "npm audit"` to `package.json` scripts so that `npm run audit` works. This needs approval, because project rules forbid editing `package.json` without it.

_No dependency changes were made in this run. Per CLAUDE.md, `package.json` and `package-lock.json` are not to be edited._
