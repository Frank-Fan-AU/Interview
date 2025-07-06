# JavaScript 函数类型面试题 / JavaScript Function Types Interview Questions

## 1. What is a first class function? / 什么是一等函数？

**English Answer:**
A first-class function is a function that can be treated like any other variable. It can be:
- Assigned to a variable
- Passed as an argument to another function
- Returned from another function
- Stored in data structures

**中文回答：**
一等函数是指可以像其他变量一样被处理的函数。它可以：
- 被赋值给变量
- 作为参数传递给另一个函数
- 从另一个函数中返回
- 存储在数据结构中

**Example / 示例：**
```javascript
// 1. Assigned to variable / 赋值给变量
const greet = function(name) {
    return `Hello, ${name}!`;
};

// 2. Passed as argument / 作为参数传递
function processFunction(fn, value) {
    return fn(value);
}

// 3. Returned from function / 从函数返回
function createGreeter(greeting) {
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}

// 4. Stored in data structure / 存储在数据结构中
const functions = {
    greet: function(name) { return `Hello, ${name}!`; },
    farewell: function(name) { return `Goodbye, ${name}!`; }
};
```

---

## 2. What is a first order function? / 什么是一阶函数？

**English Answer:**
A first-order function is a function that:
- Takes only primitive data types as parameters
- Returns only primitive data types
- Does not accept functions as parameters
- Does not return functions

**中文回答：**
一阶函数是指：
- 只接受基本数据类型作为参数
- 只返回基本数据类型
- 不接受函数作为参数
- 不返回函数

**Example / 示例：**
```javascript
// First-order function / 一阶函数
function add(a, b) {
    return a + b;
}

function multiply(x, y) {
    return x * y;
}

function isEven(num) {
    return num % 2 === 0;
}

// These are NOT first-order functions / 这些不是一阶函数
function higherOrder(fn) {  // Takes function as parameter
    return fn(5);
}

function returnFunction() {  // Returns a function
    return function(x) { return x * 2; };
}
```

---

## 3. What is a higher order function? / 什么是高阶函数？

**English Answer:**
A higher-order function is a function that:
- Takes one or more functions as arguments, OR
- Returns a function as its result

Higher-order functions enable functional programming patterns like composition, currying, and partial application.

**中文回答：**
高阶函数是指：
- 接受一个或多个函数作为参数，或者
- 返回一个函数作为结果

高阶函数支持函数式编程模式，如组合、柯里化和部分应用。

**Example / 示例：**
```javascript
// 1. Takes function as argument / 接受函数作为参数
function map(array, fn) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(fn(array[i]));
    }
    return result;
}

const numbers = [1, 2, 3, 4];
const doubled = map(numbers, x => x * 2); // [2, 4, 6, 8]

// 2. Returns function / 返回函数
function multiplyBy(factor) {
    return function(number) {
        return number * factor;
    };
}

const multiplyByTwo = multiplyBy(2);
console.log(multiplyByTwo(5)); // 10

// 3. Both - takes function and returns function / 两者都有
function compose(f, g) {
    return function(x) {
        return f(g(x));
    };
}

const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const addOneThenMultiplyByTwo = compose(multiplyByTwo, addOne);
console.log(addOneThenMultiplyByTwo(3)); // 8
```

---

## 4. What is a unary function? / 什么是一元函数？

**English Answer:**
A unary function is a function that takes exactly one argument/parameter. It's the simplest form of function that operates on a single input value.

**中文回答：**
一元函数是指只接受一个参数/参数的函数。它是操作单个输入值的最简单函数形式。

**Example / 示例：**
```javascript
// Unary functions / 一元函数
function square(x) {
    return x * x;
}

const double = x => x * 2;
const isPositive = x => x > 0;
const toString = x => String(x);

// These are NOT unary / 这些不是一元函数
function add(a, b) {  // Binary function
    return a + b;
}

function greet(name, age, city) {  // Ternary function
    return `Hello ${name}, you are ${age} years old from ${city}`;
}

function noParams() {  // Nullary function
    return "Hello";
}
```

---

## 5. What is currying function? / 什么是柯里化函数？

**English Answer:**
Currying is a technique where a function that takes multiple arguments is transformed into a sequence（顺序） of functions that each take a single argument. It allows you to partially apply a function by fixing some of its arguments.

**中文回答：**
柯里化是一种技术，将接受多个参数的函数转换为一系列每个只接受一个参数的函数。它允许你通过固定某些参数来部分应用函数。

**Example / 示例：**
```javascript
// Non-curried function / 非柯里化函数
function add(a, b, c) {
    return a + b + c;
}

// Curried version / 柯里化版本
function curryAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

// Using curried function / 使用柯里化函数
const add5 = curryAdd(5);
const add5And3 = add5(3);
console.log(add5And3(2)); // 10

// Modern ES6 currying / 现代ES6柯里化
const modernCurry = a => b => c => a + b + c;

// Partial application / 部分应用
const addTen = modernCurry(10);
const addTenAndFive = addTen(5);
console.log(addTenAndFive(3)); // 18

// Practical example / 实际例子
const multiply = a => b => a * b;
const multiplyByTwo = multiply(2);
const multiplyByTen = multiply(10);

console.log(multiplyByTwo(5)); // 10
console.log(multiplyByTen(5)); // 50
```

---

## 6. What is a pure function? / 什么是纯函数？

**English Answer:**
A pure function is a function that:
- Always returns the same output for the same input (deterministic)
- Has no side effects (doesn't modify external state, variables, or data)
- Doesn't depend on external state (global variables, database, etc.)
- Is predictable and testable

**中文回答：**
纯函数是指：
- 对于相同的输入总是返回相同的输出（确定性）
- 没有副作用（不修改外部状态、变量或数据）
- 不依赖外部状态（全局变量、数据库等）
- 可预测且可测试

**Example / 示例：**
```javascript
// Pure functions / 纯函数
function add(a, b) {
    return a + b;
}

function square(x) {
    return x * x;
}

function greet(name) {
    return `Hello, ${name}!`;
}

// Impure functions / 非纯函数
let counter = 0;
function increment() {
    counter++; // Side effect - modifies external state
    return counter;
}

function getRandomNumber() {
    return Math.random(); // Not deterministic
}

function logMessage(message) {
    console.log(message); // Side effect - I/O operation
}

// Pure function with objects / 处理对象的纯函数
function updateUser(user, newName) {
    return {
        ...user,
        name: newName
    };
}

// Impure version / 非纯版本
function updateUserImpure(user, newName) {
    user.name = newName; // Mutates original object
    return user;
}
```

---

## 7. What are the benefits of pure function? / 纯函数有什么好处？

**English Answer:**
1. **Predictability**: Same input always produces same output
2. **Testability**: Easy to test with no external dependencies
3. **Caching/Memoization**: Results can be cached based on input
4. **Parallelization**: Can be safely executed in parallel
5. **Referential Transparency**: Can be replaced with its result
6. **Debugging**: Easier to debug due to lack of side effects
7. **Composability**: Easy to combine and compose with other functions

**中文回答：**
1. **可预测性**：相同输入总是产生相同输出
2. **可测试性**：易于测试，没有外部依赖
3. **缓存/记忆化**：可以根据输入缓存结果
4. **并行化**：可以安全地并行执行
5. **引用透明性**：可以用其结果替换
6. **调试**：由于没有副作用，更容易调试
7. **可组合性**：易于与其他函数组合

**Example / 示例：**
```javascript
// Benefits demonstration / 好处演示

// 1. Predictability / 可预测性
function pureAdd(a, b) {
    return a + b;
}
console.log(pureAdd(2, 3)); // Always 5

// 2. Testability / 可测试性
function pureGreet(name) {
    return `Hello, ${name}!`;
}
// Easy to test: expect(pureGreet("John")).toBe("Hello, John!")

// 3. Caching / 缓存
const cache = new Map();
function expensiveCalculation(x) {
    if (cache.has(x)) {
        return cache.get(x);
    }
    const result = x * x + 2 * x + 1; // Pure calculation
    cache.set(x, result);
    return result;
}

// 4. Composability / 可组合性
const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const addOneThenMultiply = x => multiplyByTwo(addOne(x));
console.log(addOneThenMultiply(3)); // 8

// 5. Referential Transparency / 引用透明性
const result1 = addOne(5);
const result2 = addOne(5);
// result1 and result2 are always equal
```

---

## 8. What are lambda expressions or arrow functions? / 什么是lambda表达式或箭头函数？

**English Answer:**
Arrow functions (also called lambda expressions) are a concise way to write function expressions in JavaScript, introduced in ES6. They provide:
- Shorter syntax
- Lexical `this` binding (inherits `this` from enclosing scope)
- Implicit return for single expressions
- Cannot be used as constructors
- No `arguments` object

**中文回答：**
箭头函数（也称为lambda表达式）是ES6引入的JavaScript中编写函数表达式的简洁方式。它们提供：
- 更短的语法
- 词法`this`绑定（从封闭作用域继承`this`）
- 单个表达式的隐式返回
- 不能用作构造函数
- 没有`arguments`对象

**Example / 示例：**
```javascript
// Traditional function / 传统函数
function add(a, b) {
    return a + b;
}

// Arrow function / 箭头函数
const addArrow = (a, b) => a + b;

// Single parameter / 单个参数
const square = x => x * x;
// Equivalent to: const square = function(x) { return x * x; }

// No parameters / 无参数
const getRandom = () => Math.random();

// Multiple parameters / 多个参数
const multiply = (a, b, c) => a * b * c;

// Multiple lines / 多行
const processData = (data) => {
    const filtered = data.filter(item => item > 0);
    const doubled = filtered.map(item => item * 2);
    return doubled.reduce((sum, item) => sum + item, 0);
};

// Object return / 返回对象
const createUser = (name, age) => ({ name, age });

// Array methods with arrow functions / 数组方法与箭头函数
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Lexical this / 词法this
class Timer {
    constructor() {
        this.seconds = 0;
    }
    
    start() {
        // Arrow function preserves 'this' context
        setInterval(() => {
            this.seconds++;
            console.log(this.seconds);
        }, 1000);
    }
}

// vs traditional function / 对比传统函数
class TimerTraditional {
    constructor() {
        this.seconds = 0;
    }
    
    start() {
        // Traditional function loses 'this' context
        setInterval(function() {
            this.seconds++; // 'this' is undefined
            console.log(this.seconds);
        }, 1000);
    }
}
```

---

## 总结 / Summary

这些函数类型概念是JavaScript函数式编程的基础，在面试中经常被问到。理解它们的区别和用途对于编写更好的代码和回答技术问题都很重要。

These function type concepts are fundamental to functional programming in JavaScript and are frequently asked in interviews. Understanding their differences and use cases is important for writing better code and answering technical questions.