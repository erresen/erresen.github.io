---
layout: post
title: "Using Linq in C#"
date: 2015-09-20 18:53:44
categories: jekyll csharp linq
comments: true
---

Linq syntax can be difficult to grasp when you see it for the first time, but once you wrap your head around it it's actually quite simple. To start with you need a collection of stuff; anything that implements IEnumerable\<T\>, in this case an integer array.

```csharp
int[] someNumbers = { 1, 4, 5, 6, 3, 3, 56, 6, 23, 4 };

// Let's extract the numbers that are greater than 10 using a foreach loop.
List<int> largeNumbers = new List<int>();
foreach (int num in someNumbers)
{
    if (num > 10)
        largeNumbers.Add(num);
}
// { 56, 23 }

// This can also be done much more concisely using Linq.
List<int> bigNumbers = someNumbers.Where(num => num > 10).ToList();
// { 56, 23 }
```

[msdn-deferred-execution]: https://msdn.microsoft.com/en-us/library/bb943859.aspx

The Linq statement and the foreach loop above can be considered effectively equivalent\*, in fact ReSharper is suggesting converting it into Linq as I type this in Visual Studio. (\* - see [Deferred Execution][msdn-deferred-execution])

![Resharper suggestion]({{ site.url }}/assets/images/20150820loop2linq.jpg)

## Choice of syntax

Linq can be written syntactically in a couple of ways; Query syntax and Method syntax.

```csharp
// Query syntax
var queryNumbers = from num in someNumbers
                   where num % 2 == 0
                   select num; // returns { 4, 6, 56, 6, 4 }
var methodNumbers = someNumbers.Where(n => n % 2 == 0);
// { 4, 6, 56, 6, 4 }
```

[msdn-syntaxes]: https://msdn.microsoft.com/en-us/library/vstudio/bb397947.aspx

Both of these syntaxes are semantically identical, which you choose to use is generally preference although [not all queries can be expressed in query syntax.][msdn-syntaxes] In the example above, both syntaxes just call the Where extention method of the Enumerable class, as shown below.

```csharp
var whatsHappening = Enumerable.Where(someNumbers,
    delegate(int i) { return i % 2 == 0; });
// { 4, 6, 56, 6, 4 }
```

## Methods

[msdn-ienumerable]: https://msdn.microsoft.com/en-us/library/9eekhta0(v=vs.110).aspx
[msdn-iqueryable]: https://msdn.microsoft.com/en-us/library/bb351562(v=vs.110).aspx

Linq is really just a bunch of extention methods that operate on classes that implement [IEnumerable\<T\>][msdn-ienumerable] and / or [IQueryable\<T\>][msdn-iqueryable]

The Where method used in the examples above is for filtering (only return values greater than 10 in the first example, and only even numbers in the second). The Select method, on the other hand, can be used to transform data.

```csharp
// Let's multiply all the ints by 2.5
IEnumerable<double> someDoubles = someNumbers.Select(x => x * 2.5);
// returns { 2.5, 10.0, 12.5, 15.0, 7.5, 7.5, 140.0, 15.0, 57.5, 10.0 }
```

Notice the type of collection has now changed from a IEnumerable\<int\> to IEnumerable\<double\>, to match the result type of the predicate (the lambda between the parens).
The transformation carried out by Select doesn't just have to be a mathematical one. A collection of strings, names in this case, can be transformed into a collection of Person objects, where Person takes a name string as the parameter in it's constructor.

```csharp
string[] names = {
                    "James",
                    "Kelly",
                    "Jemma",
                    "Toby",
                    "Rebekah",
                    "Joey",
                    "Tom",
                    "Emma" };

IEnumerable<Person> people = names.Select(x => new Person(x));
```

These Linq methods can also be chained together.
Let's make a collection of Person objects, but only for people who's name begin with 'J'

```csharp
IEnumerable<Person> peopleWithJNames =
    names.Where(x => x.StartsWith("J")).Select(x => new Person(x));
```

Two other useful Linq methods are Any and All. Any will evaluate the collection, checking if any item satisfies the predicate.

```csharp
// Check if any item in the IEnumerable<Person> collection people, has a Name
// property equal to "Toby"
bool containsToby = people.Any(x => x.Name == "Toby");
// true

// The All method is similar to the Any method, but checks if all the items
// satisfy the predicate.
bool allPeopleAreToby = people.All(x => x.Name == "Toby");
// false
```

Obviously Toby is in the collection, so containsToby is true, but not all people are Toby so allPeopleAreToby is false.

There's also the Contains method, that will return whether a collection contains a specific item. Contains is overloaded. The default uses the standard equality operator, so is useful for simple equality checks.

```csharp
bool jamesInArray = names.Contains("James");
// true
```

[msdn-iequalitycomparer]: https://msdn.microsoft.com/en-us/library/bb339118(v=vs.110).aspx

The overloaded Contains method takes value of the source type, and an [IEqualityComparer][msdn-iequalitycomparer]. This allows for comparisons on complex objects.

Concatenation (joining one collection onto the end of another) is achieved throught the Concat operator.

```csharp
int[] someInts = { 1, 2, 3, 4, 5 };
int[] moreInts = { 6, 7, 8, 9, 10 };
var allTheInts = someInts.Concat(moreInts);
// { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 }
```

Distinct is another useful Linq method. It returns a collection of only distinct items.

```csharp
int[] repeatInts = { 1, 2, 3, 1, 2, 3 };
var distinctInts = repeatInts.Distinct();
// { 1, 2, 3 }
```

Min, Max and Average methods do what you'd expect.

```csharp
var min = repeatInts.Min();
// 1

var max = repeatInts.Max();
// 3

var average = repeatInts.Average();
// 2.0

```

The First and Last methods return the first and last items, respectively, which satisfy the predicate.

```csharp
Person[] morePeople =
    {
        new Person("Martin") { Age = 30 },
        new Person("Dave") { Age = 26 },
        new Person("Paul") { Age = 19 },
        new Person("Dave") { Age = 45 },
        new Person("Frank") { Age = 61 },
        new Person("Paul") { Age = 32 }
    };

// Get the age of the first person named Paul
int paulsAge = morePeople.First(x => x.Name == "Paul").Age;
// 19

// Get the name of the first person aged over 30
string over30 = morePeople.First(x => x.Age > 30).Name;
// "Dave"

// Get the age of the last person named Dave
int davesAge = morePeople.Last(x => x.Name == "Dave").Age;
// 45

// Get the name of the last person aged under 30
string under30 = morePeople.Last(x => x.Age < 30).Name;
// "Paul"
```

There's quite a few more Linq methods that you can use, but I think the ones above are probably the ones I've used most frequently. For the full list, with examples, [check out the MSDN docs][msdn-ienumerable]
