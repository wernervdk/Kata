# Kata refactoring

**Inital setup**

For refactoring the typescript example, i created an typescript setup and changed the test tool to jest. 

I took the typescript code and tests from the repo and added those to my solution.

The code is added to the folder app and the tests are added to the folder tests.

In the requirements it is stated:

* do not alter the Item class or Items property 

For this reason the typescript configuration (tsconfig) has an entry of  "strict": false .

**Refactoring howto steps**

After reading the requirements i could find different kind of items what needed specific handling. These are

+ "Aged Brie" 
  
+   "Sulfuras"


+ "Backstage passes"
+ "Conjured"
+ the other items

Based on these 'items' i can make baseline unittests for the exising code base. These tests can later be used to check the refactored results.

steps:

* create unittests
* refactor code base on the specific types




