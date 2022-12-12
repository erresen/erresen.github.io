---
layout: post
title: "Database Normalization - 1NF, 2NF, 3NF, 4NF, 5NF, 6NF"
date: 2022-11-30 00:00:00
categories: sql databases
comments: true
excerpt_separator: <!--more-->
---

Database normalization is the process of organizing a database in such a way that it minimizes redundancy and dependency. It is a crucial aspect of database design, as a well-normalized database can be more flexible and easier to maintain over time. The process of normalization typically involves dividing a large, unwieldy table into smaller, more manageable tables and defining relationships between them. This allows for more efficient data storage and retrieval, as well as the ability to easily update and manipulate the data.

There are several key rules that are followed when normalizing a database. These rules, known as normal forms, provide a set of guidelines for ensuring that a database is properly organized. <!--more--> The most commonly used normal forms are:

    First normal form (1NF): All values in a column must be atomic (indivisible). In other words, each cell in a column must contain a single value and cannot contain multiple values or a combination of values.

    Second normal form (2NF): A table must be in first normal form and all columns that are not dependent on the primary key must be removed. In other words, the table must be organized in such a way that each column depends on the primary key for its meaning and significance.

    Third normal form (3NF): A table must be in second normal form and all columns that are not directly dependent on the primary key must be removed. This means that no transitive dependencies are allowed, and each column must depend only on the primary key.

    Boyce-Codd normal form (BCNF): A table must be in third normal form and all functional dependencies must be preserved. This means that if one attribute determines another, then the two must be kept together in the same table.

By following these normal forms, a database can be organized in a way that minimizes redundancy and dependency, allowing for more efficient data storage and retrieval.

Normalization is an important concept to understand when designing a database. By following the rules of normalization, you can create a well-organized and flexible database that can be easily maintained over time.



- [First Normal Form (1NF)](#first-normal-form-1nf)
- [Second Normal Form (2NF)](#second-normal-form-2nf)
- [Third Normal Form (3NF)](#third-normal-form-3nf)
- [Forth Normal Form (4NF)](#forth-normal-form-4nf)
- [Fifth Normal Form (5NF)](#fifth-normal-form-5nf)
- [Sixth Normal Form (6NF)](#sixth-normal-form-6nf)

## First Normal Form (1NF)

First normal form (1NF): All values in a column must be atomic (indivisible). In other words, each cell in a column must contain a single value and cannot contain multiple values or a combination of values.

ID	Name	Age	Gender
1	John Doe	30	Male
2	Jane Doe	28	Female
3	Jack Smith	32	Male
4	Jill Smith	30	Female

In this example, the table is in first normal form because all values in each column are atomic. The ID column contains a unique identifier for each row, the Name column contains a single name for each person, the Age column contains a single age for each person, and the Gender column contains a single gender for each person.

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