---
layout: post
title: "Midpoint Rounding Options in C#"
date: 2016-08-30 21:53:24
tags: csharp syntax dotnet math
comments: true
permalink: "/csharp/syntax/dotnet/math/2016/08/30/decimal-midpoint-rounding.html"
---

Decimal midpoint rounding options in C# default to **To Even**. This was a head scratching moment for me at first, as the way us humans have been taught to round is generally **Away From Zero**.

**Away From Zero** rounds 2.5 to 3; the way most of us were taught rounding at school.

```csharp
var needsRounding = 2.5M;
var rounded = Math.Round(needsRounding, MidpointRounding.AwayFromZero);

Console.WriteLine(rounded);

// prints "3"
```

**To Even** rounds 2.5 to 2. This is often known as **Banker's Rounding**..

```csharp
var needsRounding = 2.5M;
var rounded = Math.Round(needsRounding, MidpointRounding.ToEven);

Console.WriteLine(rounded);

// prints "2"
```

## Banker's Rounding

[msdn]: https://msdn.microsoft.com/en-us/library/system.math.round(v=vs.110).aspx

According to [MSDN][msdn]:

> (Banker's Rounding) conforms to IEEE Standard 754, section 4. When used in multiple rounding operations, it reduces the rounding error that is caused by consistently rounding midpoint values in a single direction. In some cases, this rounding error can be significant.

Rounding multiple numbers using **Away From Zero** compounds errors, whereas **To Even** _(Banker's Rounding)_ will round up half the time and round down the other half, so the rounding errors cancel each other out.

Check this out for yourself by summing a load of random numbers:

```csharp
// instantiate some variables to store our sums
decimal actualTotal = 0;
decimal awayFromZeroTotal = 0;
decimal toEvenTotal = 0;

// generate 1,000,000 random numbers; round and sum them
var random = new Random();
for (int i = 0; i < 1000000; i++)
{
    // generate a random int from 0 to 1000 and divide it by 1000M (decimal)
    // this gives us random decimals to 3 decimal places between 0 and 1
    var next = random.Next(1000) / 1000M;

    // keep track of our actual total
    actualTotal += next;

    // round the 3 decimal place numbers to 2 places using the different rounding options
    // add the rounded numbers to their respective totals
    awayFromZeroTotal += Math.Round(next, 2, MidpointRounding.AwayFromZero);
    toEvenTotal += Math.Round(next, 2, MidpointRounding.ToEven);
}

// print out our summed results
Console.WriteLine($"Actual total: {actualTotal}");
Console.WriteLine($"Away from zero: {awayFromZeroTotal}");
Console.WriteLine($"To even: {toEvenTotal}");

// Actual total: 499507.199
// Away from zero: 500008.41
// To even: 499510.54
```

The results are pretty much as you'd expect. We're summing 1,000,000 numbers between 0 and 1, so you'd expect the result to be around 500,000... which it is.

The actual total (for this particular run-through) was `499507.199`.
**To Even** rounding result gave us `499510.54`; pretty close.
**Away From Zero** rounding gave us `500008.41`, about 500 above actual.

500 is fairly consitent between runs and is due to the size of the population and the rounding precision. Changing the population or precision would yield a different, but none-the-less consitent compounded error.

## Conclusion

So, yeah... banker's rounding makes sense in this case, and likely in a lot of other cases where the rounded number is used in a later calculation. I can see why it's the default... just a shame we weren't taught this way at school!
