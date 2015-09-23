---
layout: post
title:  "Location, Location, Location"
date:   2015-09-21 17:20:43
categories: jekyll update
---

What do you think of when you hear the word "optimization?" Do you think of replacing a <i>O(n<sup>2</sup>)</i> algorithm with a <i>O(n log n)</i> one? Do you think of twiddling bits? Do you think of condensing your program down to the smallest number of instructions possible and squeezing every last CPU cycle out of your computer?

Well, you shouldn't. Not at first, anyway. When it comes to performance tuning, Donald Knuth said it best: premature optimization is the root of all evil.

Of course, the seasoned programmers among you will know this, so what's the real message about optimization? What's the real deciding factor when determining whether your program will fly by or slow to a grind?

Location.

By location, of course, I mean locations in memory - how best to organize your data to take full advantage of modern hardware. Programs today utilize complex data structures - lists, trees, graphs - to implement beautiful abstract algorithms in code. But at the end of the day, the only way the computer knows how to organize data is in contiguous blocks. So why is this important? To answer that question, we have to talk a little bit about <i>caches</i>.

When a computer encounters a memory lookup (e.g. reading from an array), it will first check to see if that value is in one of its registers. If not, it has to make a relatively expensive (~100 nanoseconds) round trip to main memory to fetch it. This may not seem like a lot, but a register access only takes a few hundred <i>picoseconds</i>, which is several orders of magnitude faster. In addition, 100-nanosecond memory reads require hundreds of CPU cycles to complete, cycles which could otherwise be spent doing useful work.

To address this problem, chip designers began incorporating caches into processors that would store frequently-accessed data in a piece of small, fast memory. Now, if the CPU needs an address, it can first check the fast cache to see if the data is there before proceeding to the slower main memory. Modern computers tend to come with multiple levels of caches, typically denoted L1, L2, etc. To give you an idea of the differences in size and access time of various memories, here's a diagram with specs from the Intel i7-2637 processor from 2011:

![Memory Hierarchy]({{site.url}}/memory-hierarchy.png "Memory Hierarchy")

The main takeaway here is that memory is organized in a hierarchy which trades access time for storage size the further down you go.

So what does this mean in the context of performance? As you might have guessed, if we keep our data in the faster memories like registers and caches, we can expect faster access times (and therefore faster running times) than if we kept our data in the slower memories like RAM and disk. So how do we ensure our data gets in the faster memories? By taking advantage of the <i>prefetcher</i>.

Normally, when you access a location in memory, that value is moved to a cache so that future references to that value can be retrieved faster. The prefetcher is a special process (implemented in either software or hardware) that fetches multiple contiguous locations around the target and stores those in the cache as well. This means that if you are iterating through a contiguous list, for example, the next element will also be in the cache. That is, <b>accessing memory will be faster if we do so in a contiguous fashion</b>.

Let's see an example of this in action. Suppose I want to allocate a large two-dimensional array and populate it with zeros. Remember, there's no such thing as two-dimensional arrays at the hardware level - everything is in a single, contiguous block. So, we'll have to store the data in a one-dimensional array and then translate row-column pairs to a single index. Here's an example in C:

{% highlight c %}
/*
 * First Example
 */

#include <stdio.h>
#include <stdlib.h>

#define WIDTH  10000
#define HEIGHT 10000

int idx(int r, int c)
{
    return r*WIDTH + c;
}

int main()
{
    int r, c;

    int* big = malloc(sizeof(int) * WIDTH*HEIGHT);

    for (r = 0; r < HEIGHT; r++)
       for (c = 0; c < WIDTH; c++)
          big[idx(c,r)] = 0;

   return 0; 
}
{% endhighlight %}

Ignoring the bad practice of not checking the result of `malloc` (and not subsequently freeing it), we can see that we allocate an array of size WIDTH times HEIGHT to represent our two-dimensional array. The nested `for` loops iterate through the data as though it were a two-dimensional array of size WIDTH by HEIGHT.

As an aside, it's important to note that data in C is stored in <i>row-major order</i>. This means that consecutive elements in a single <i>row</i> are stored contiguously in memory, as opposed to <i>column-major order</i>, where elements in a <i>column</i> are stored contiguously. Here's a visual comparison:

![Orderings]({{site.url}}/orderings.png "Orderings")

Now, look closely at how we're accessing the data: since we access the element at `(c,r)`, we're actually accessing the elements in column-major order. Because C stores consecutive elements in row-major order, this means that we're not accessing the underlying memory in a contiguous fashion. This makes our prefetcher all but worthless and results in cache thrashing.

With this in mind, let's revisit our example:

{% highlight c %}
/*
 * Second Example
 */

#include <stdio.h>
#include <stdlib.h>

#define WIDTH  10000
#define HEIGHT 10000

int idx(int r, int c)
{
    return r*WIDTH + c;
}

int main()
{
    int r, c;

    int* big = malloc(sizeof(int) * WIDTH*HEIGHT);

    for (r = 0; r < HEIGHT; r++)
       for (c = 0; c < WIDTH; c++)
          big[idx(r,c)] = 0;

   return 0; 
}
{% endhighlight %}

Notice that the only difference between the first and second example is that I am accessing the value at `(r,c)` in each iteration, instead of at `(c,r)`. This seemingly innocuous change results in a surprisingly big performance boost: On my machine, running the first example takes 1.45 seconds, while the second example takes 0.50 seconds.

This may not seem like a lot, but think about it: by swapping <i>two characters</i> in our code that control memory access patterns, we made the program run <i>three times faster</i>. Our programs are logically identical, but by changing <i>the order in which we iterate</i> we've improved the performance threefold. In fact, we can take this idea even further: the presence of the prefetcher means that, if we access our data contiguously, we are essentially extending our cache infinitely, since the prefetcher is always going to be a few steps ahead of us in placing the next items in the cache.

The fact that it's the <i>data</i>, rather than the code, that impacts performance here is not necessarily intuitive at first glance; after all, a byte is a byte, whether it's at address `0x4000` or `0x8000`. But it's important nonetheless to understand that <i>where</i> you store something can sometimes be more important than what you're storing in the first place. After all, it's all about location, location, location.

<i>If you want to learn more about this phenomenon, I highly recommend checking out [Herb Sutter's talk on modern C++](https://channel9.msdn.com/Events/Build/2014/2-661). The post with the example that he mentions [can be found here](http://gameprogrammingpatterns.com/data-locality.html).</i>
