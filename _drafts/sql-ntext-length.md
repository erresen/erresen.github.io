---
layout: post
title: "Getting the length of an ntext field in T-SQL (MSSQL)"
date: 2020-06-04 13:05:44
categories: sql
comments: true
---

## Problem

You can't use `LEN()` on an `ntext` field.

```sql
SELECT
    COUNT(0)
FROM
    CustomerReview
WHERE
    LEN(Comments) > 5
```

Will give you the following error:

```
Argument data type ntext is invalid for argument 1 of len function.
```

## Solution

To get the length of an `ntext` field, use `DATALENGTH()` instead of `LEN()`. Note that DATALENGTH will return the number of bytes, not the number of characters in the string. Each character in an ntext field is 2 bytes, so you need to take this into account when writing your query.

```sql
SELECT
    COUNT(0)
FROM
    CustomerReview
WHERE
    DATALENGTH(Comments) > 10
```

Note that the predicate is now `DATALENGTH(Comments) > 10` as there's 2 bytes per character.
