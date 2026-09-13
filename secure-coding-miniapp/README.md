# Secure Coding Mini App

> **Type:** Secure coding remediation project  
> **Stack:** Express, MySQL, sessions  
> **Focus:** CSRF, SQL injection, XSS, and session handling

I worked on a small web app that intentionally used unsafe patterns. The point was to fix the security problems without breaking the normal account flow.

## Problems in the original app

* State changing actions could be triggered too easily.
* SQL strings included user input.
* User controlled values were displayed without enough output handling.
* Some protected actions depended too much on what the browser sent.

## CSRF changes

I moved state changing actions to POST requests and required:

* an authenticated session
* a session CSRF token
* server side token verification

That made account update and delete actions harder to trigger from another site.

## SQL injection changes

I replaced string built SQL with placeholders.

The app sends the SQL structure and the user values separately so the values stay data instead of becoming part of the query.

I used that pattern for login, registration, and account update logic.

## XSS changes

I used output encoding for user controlled values and validated expected formats such as email addresses.

The goal was to make browser output treat the value as text instead of executable markup.

## Session changes

Protected routes check the server side session, and the cookie settings use HTTP only and SameSite behavior.

## Proof I kept

I retained the secure coding version of the application logic.

A sanitized excerpt is published here:

[security-fix-excerpt.js](security-fix-excerpt.js)

The public sample removes local database settings, test credentials, and other values that do not belong in GitHub.
