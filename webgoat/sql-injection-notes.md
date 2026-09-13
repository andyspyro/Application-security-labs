# SQL Injection Notes

> **Source:** My local WebGoat SQL injection labs  
> **Goal:** Keep the reasoning, not the challenge answers

## Boolean conditions

A vulnerable query can let input change the logic of the SQL statement.

A basic test value is:

```sql
' OR '1'='1
```

The important question is whether the application treats the value as SQL syntax or as data.

## Numeric input

Numeric fields can be injectable too when the application drops the value directly into the query.

One lab was useful because one field rejected my test while another field remained vulnerable. That forced me to stop treating every input box the same way.

## UNION

A UNION query only works when the result sets are compatible.

I had to pay attention to:

* column count
* data types
* which returned columns were visible

A failed UNION attempt still gave me information about the shape of the original query.

## Blind SQL injection

The application does not have to print database rows for injection to leak information.

If the response changes when a condition is true versus false, that difference can become a side channel.

## Stacked statements

Some database and application combinations allow more than one SQL statement from the same input.

That can turn a read problem into an integrity or availability problem.

## Dynamic ORDER BY

Prepared statements are designed for values, not arbitrary identifiers such as column names.

For a user selected sort field, I practiced mapping the user choice to an application controlled allowlist.

```java
String sortColumn = switch (requestedSort) {
    case "name" -> "name";
    case "status" -> "status";
    case "created" -> "created_at";
    default -> "name";
};
```

## Prepared statements

The main defensive pattern I practiced was parameterized SQL.

```java
PreparedStatement pstmt =
    conn.prepareStatement("SELECT * FROM users WHERE name = ?");

pstmt.setString(1, username);
ResultSet rs = pstmt.executeQuery();
```

The query structure stays separate from the input value.

That is the main boundary I wanted to remember from the lab: user data should stay data.
