# OWASP Juice Shop Security Analysis

> **Type:** Application security and static analysis lab  
> **Environment:** Local OWASP Juice Shop instance  
> **Status:** Testing and SQL injection remediation verified

I used Juice Shop to connect three things that are easy to treat separately: scanner findings, real application behavior, and source code fixes.

## What I verified from my retained assignment

I ran Semgrep and SonarQube Cloud against the local Juice Shop source.

### Semgrep

The retained report shows:

| Item | Result |
|---|---:|
| Files scanned | 1,048 |
| Rules run | 302 |
| Blocking findings | 42 |

The findings included SQL injection, shell injection, hardcoded secrets, JWT exposure, unsafe `eval`, path traversal concerns, XXE, open redirects, prototype pollution, possible XSS, and directory listing.

### SonarQube Cloud

The retained dashboard recorded:

| Item | Result |
|---|---:|
| Security issues | 79 |
| Reliability issues | 90 |
| Maintainability issues | 914 |
| Security hotspots | 109 |
| Code duplication | 10.7% |

Those are scan results from an intentionally vulnerable training app, not claims about code I wrote from scratch.

## SQL injection testing

I tested the login path locally and confirmed that SQL injection could bypass the normal password check.

I also tested the product search path with a UNION based query and observed account information being returned from another table.

That gave me a direct connection between the static analysis finding and what the running application actually did.

## Source review and TypeScript fix

I worked in the Juice Shop TypeScript routes, including `login.ts` and `search.ts`.

For the login query, I replaced unsafe query construction with bound values.

A sanitized sample of that fix is here:

[login-query-fix.ts](login-query-fix.ts)

The important change was keeping the SQL structure separate from the email and password values.

## Retesting

My process was:

1. Confirm the vulnerable behavior.
2. Find the route that built the query.
3. Change the query handling.
4. Rebuild the application.
5. Repeat the original injection test.
6. Confirm that normal login still worked.
7. Rerun the scanners.

## XSS

My broader web security coursework also included XSS testing and countermeasures. In the Juice Shop scan, Semgrep reported possible XSS findings.

I am not claiming a specific manual Juice Shop XSS challenge here unless I have retained evidence for that exact challenge. The public page keeps the verified Juice Shop work separate from my broader XSS coursework.

## Why I keep this project

This is one of the better examples of how I work through AppSec because I did not stop at "scanner found a problem." I traced the issue into the application, tested the impact, changed the code, and retested it.
