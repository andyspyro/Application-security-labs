# Application Security Labs

This repo is where I keep my web security labs and secure coding work.

I do not use it as a list of challenge answers. I keep the request flow, the vulnerable behavior, the source code connection when I have it, and the fix.

## Project map

| Project | What I actually did | Proof in repo |
|---|---|---|
| [OWASP WebGoat](webgoat/README.md) | Worked through SQL injection and CSRF labs, inspected requests, compared cookies and tokens, and practiced prepared statements and safer request handling | SQL notes plus sanitized CSRF demo files |
| [OWASP Juice Shop](juice-shop/README.md) | Ran Semgrep and SonarQube Cloud, tested SQL injection locally, reviewed TypeScript query code, applied bound parameters, rebuilt the app, and retested | Lab writeup plus sanitized TypeScript fix sample |
| [Secure Coding Mini App](secure-coding-miniapp/README.md) | Fixed CSRF, SQL injection, XSS, session checks, and unsafe state changing routes in a small Express/MySQL app | Sanitized fix excerpt |

## My normal workflow

```text
normal request
    |
    v
inspect request and response
    |
    v
find controlled input
    |
    v
test one assumption
    |
    v
confirm impact
    |
    v
trace the source
    |
    v
fix the logic
    |
    v
retest
```

## Tools I used

Burp Suite, browser developer tools, WebGoat, Juice Shop, Semgrep, SonarQube Cloud, SQL, TypeScript, JavaScript, PowerShell, HTTP requests, cookies, sessions, CSRF tokens, prepared statements, output encoding, and input validation.

## Scope

Everything here comes from intentionally vulnerable local labs or controlled coursework applications.

I leave out real credentials, scanner tokens, private data, password hashes, and reusable secrets.
