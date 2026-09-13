# OWASP WebGoat

> **Type:** Local web security training  
> **Main areas:** SQL injection and CSRF

I used WebGoat to practice web security in an intentionally vulnerable local environment.

The notes I kept focus on why a request worked or failed, not on saving every challenge answer.

## SQL injection

I worked through:

* string input
* numeric input
* boolean conditions
* UNION queries
* blind injection
* stacked statements
* dynamic `ORDER BY`
* prepared statements

The part that mattered most was learning that two fields on the same page can reach completely different backend logic.

My notes are here:

[SQL Injection Notes](sql-injection-notes.md)

## CSRF

The CSRF work made more sense once I compared the forged request with the real authenticated request.

I checked:

* request method
* form parameters
* cookies
* session state
* CSRF values
* content type

One failed attempt was useful because I had missed a server generated validation value. Comparing the normal request with my forged request showed exactly what was missing.

Sanitized examples:

* [CSRF review form](csrf-review-demo.html)
* [JSON and content type CSRF form](csrf-json-content-type-demo.html)

## Testing process

1. Send a normal request.
2. Inspect it in the browser or Burp.
3. Identify the value I control.
4. Change one thing.
5. Compare the response.
6. Confirm the effect.
7. Write down the fix.

## Fixes I practiced

### SQL injection

Prepared statements, allowlists for identifiers, least privilege database accounts, and safer errors.

### CSRF

Session bound tokens, appropriate SameSite cookies, Origin or Referer checks where useful, and reauthentication for sensitive actions.

All testing on this page was done against my local WebGoat instance.
