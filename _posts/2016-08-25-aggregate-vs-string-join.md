---
layout: post
title:  "Linq Aggregate vs String.Join"
date:   2016-08-25 21:04:53
categories: csharp linq strings
comments: true
---
A task I seem to do fairly regularly is joining id’s into a single, comma separated string. These id’s tend to come from collection of objects, so I use linq’s Select method to convert them into a collection of id strings.

```csharp
// create a collection of objects to play with
var myEntities = Enumerable.Range(0, 5).Select(x => new {Id = x});

// extract the IDs from the entities
var idStrings = myEntities.Select(e => e.Id.ToString());

// idStrings: "0", "1", "2", "3", "4"
```

From here, I’ll often chain another linq method, `Aggregate`, to concatenate the strings into a single, comma separated string.

```csharp
var myEntities = Enumerable.Range(0, 5).Select(x => new {Id = x});

// extract the IDs from the entities, then join them into a single string
var idString = myEntities.Select(e => e.Id.ToString()).Aggregate((c, n) => $"{c},{n}");

// idString: "0,1,2,3,4"
```

This is all well and good, but as I discovered today, `Aggregate` will throw an Invalid Operation Exception if the entity collection is empty.
Entity collections tend to be pulled from a database in real life. Depending on the data and the query, they can sometimes be returned empty.

```csharp
// create an empty collection using Enumerable.Range(0, 0) 
var myEntities = Enumerable.Range(0, 0).Select(x => new {Id = x});

// extract the IDs from the entities
var idStrings = myEntities.Select(e => e.Id.ToString());

// throws System.InvalidOperationException - Sequence contains no elements
var idString = idStrings.Aggregate((c, n) => $"{c},{n}");
```

You can prevent this exception by providing the `Aggregate` function with a `seed` string, but this has it's own issues.

```csharp
// create an empty collection using Enumerable.Range(0, 0) 
var noEntities = Enumerable.Range(0, 0).Select(x => new {Id = x});

// string.Empty seed string prevents the exception
var seed = string.Empty;
var emptyIdString = noEntities.Select(e => e.Id.ToString()).Aggregate(seed, (c, n) => $"{c},{n}");

// emptyIdString: ""

// BUT if you have items in your collection...
var myEntities = Enumerable.Range(0, 5).Select(x => new {Id = x});

// then you end up with a comma at the beginning of your string
var idString = myEntities.Select(e => e.Id.ToString()).Aggregate(seed, (c, n) => $"{c},{n}");

// idString: ",0,1,2,3,4"
```

Obviously, you could use something like `.TrimStart(',')` to remove the preceeding comma, but it all starts to get a bit ugly.
Luckily `string.Join` doesn't care if you pass it an empty collection.

```csharp
// create an empty collection using Enumerable.Range(0, 0) 
var myEntities = Enumerable.Range(0, 0).Select(x => new { Id = x });

// extract the IDs from the entities
var idStrings = myEntities.Select(e => e.Id.ToString());

// join the strings
var idString = string.Join(",", idStrings);

// idString: ""
```

While I prefer the style of the original `Select.Aggregate` chain, I personally think this is nicer than `Select.Aggregate(seed).TrimStart` chain.
You do lose deferred execution using `string.Join`, so if that’s important to you, stick with `Aggregate`. 
