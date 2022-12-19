---
layout: post
title: "Getting the length of an ntext field in T-SQL (MSSQL)"
date: 2020-06-04 00:00:00
tags: sql
comments: true
excerpt_separator: <!--more-->
permalink: "/windows/hardware/2016/09/01/safe-mode.html"
---

When querying the length of a string field in SQL, the normal go-to is the `LEN()` function. If the field you're querying has the datatype `ntext` you'll likely run into the following error:

```
Argument data type ntext is invalid for argument 1 of len function.
```
<!--more-->
## Problem

You can't use `LEN()` on an `ntext` field.

In the query below, the `Comments` column has the datatype `ntext`.

If you run this query...

```sql
SELECT
    COUNT(0)
FROM
    CustomerReview
WHERE
    LEN(Comments) > 5
```

You'll get the following error:

```
Argument data type ntext is invalid for argument 1 of len function.
```

## Solution

To get the length of an `ntext` field, use `DATALENGTH()` instead of `LEN()`. Note that `DATALENGTH` will return the number of bytes, not the number of characters in the string. Each character in an `ntext` field is 2 bytes, so you need to take this into account when writing your query.

```sql
SELECT
    COUNT(0)
FROM
    CustomerReview
WHERE
    DATALENGTH(Comments) > 10
```

Note that the predicate is now `DATALENGTH(Comments) > 10` as there's 2 bytes per character, so you have to double the length in the predicate.
