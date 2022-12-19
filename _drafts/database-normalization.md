---
layout: post
title: "Database Normalization - 1NF, 2NF, 3NF, 4NF, 5NF, 6NF"
date: 2022-11-30 00:00:00
tags: sql databases
comments: true
excerpt_separator: <!--more-->
---

Database normalization is the process of organizing a database in such a way that it minimizes redundancy and dependency. It is an important aspect of database design, as a properly normalized database will generally be easier to maintain over time as well as being more flexible. Normalization of an existing database typically involves dividing any large, unwieldy tables into smaller and more manageable tables with defined relationships between them.

There are several key rules (known as "normal forms") that are followed when normalizing a database. These rules provide a set of guidelines for ensuring that a database is properly organized. <!--more--> The most commonly used normal forms are:

- [First Normal Form (1NF)](#first-normal-form-1nf): All values in a column must be atomic (indivisible). In other words, each cell in a column must contain a single value and cannot contain multiple values or a combination of values.
- [Second Normal Form (2NF)](#second-normal-form-2nf): A table must be in first normal form and all columns that are not dependent on the primary key must be removed. In other words, the table must be organized in such a way that each column depends on the primary key for its meaning and significance.
- [Third Normal Form (3NF)](#third-normal-form-3nf): A table must be in second normal form and all columns that are not directly dependent on the primary key must be removed. This means that no transitive dependencies are allowed, and each column must depend only on the primary key.

There are other normal forms beyond third, but they're not generally used except in special circumstances.

## First Normal Form (1NF)

First normal form (1NF): All values in a column must be atomic (indivisible). In other words, each cell in a column must contain a single value and cannot contain multiple values or a combination of values.

Below is a table of people and their cars, but it DOES NOT comply with first normal form:

|Name|Age|Car|
|---|---|---|
|John|30|Red Ford|
|Jane|28|Black Subaru|
|Jack|32|Blue Nissan, White Honda|
|Jill|30|Green Toyota|

Why isn't the table above in first normal form?

- Jack has two cars, but they're listed together in one cell.
- The car column contains both the car manufacturer and the car's color.

|Name|Age|Car|Paint|
|---|---|---|---|
|John|30|Ford|Red|
|Jane|28|Subaru|Black|
|Jack|32|Nissan|Blue|
|Jack|32|Honda|White|
|Jill|30|Toyota|Green|

In the updated example above, the table is now in first normal form because all values in each column are atomic. The Name column contains a single name for each person, the Age column contains a single age for each person, the Car column contains a single manufacturer per row and the paint column contains a single color per row.

In order for a table to be in first normal form, each column must contain only one value, and that value must be indivisible. This means that a column cannot contain multiple values or a combination of values. For example, if the Name column contained both first and last names, or if the Age column contained both the age and the date of birth, the table would not be in first normal form.

## Second Normal Form (2NF)



## Third Normal Form (3NF)

lorem

## Forth Normal Form (4NF)

lorem

## Fifth Normal Form (5NF)

lorem

## Sixth Normal Form (6NF)

lorem