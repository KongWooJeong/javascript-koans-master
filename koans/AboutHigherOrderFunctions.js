var _; //globals

/* This section uses a functional extension known as Underscore.js - http://documentcloud.github.com/underscore/
     "Underscore is a utility-belt library for JavaScript that provides a lot of the functional programming support
      that you would expect in Prototype.js (or Ruby), but without extending any of the built-in JavaScript objects.
      It's the tie to go along with jQuery's tux."
 */
describe("About Higher Order Functions", function () {

  it("should use filter to return array items that meet a criteria", function () {
    var numbers = [1,2,3];
    var odd = _(numbers).filter(function (x) { return x % 2 !== 0 });
    //_ 언더스코어란 자바스크립트의 코딩을 도와주는 라이브러리라고 생각을 하였다. 
    // filter는 해당 대상에 어떠한 기준이 true 인것만 반환된다.
    // 기준은 x % 2 !== 0 은 x를 2로 나누었을때 나머지가 0 이 아닌 경우, 즉 홀수 이다.
    // [1, 3]

    expect(odd).toEqual([1, 3]);
    expect(odd.length).toBe(2);
    expect(numbers.length).toBe(3); // 원본 배열은 바뀌지 않는다
  });

  it("should use 'map' to transform each element", function () {
    var numbers = [1, 2, 3];
    var numbersPlus1 = _(numbers).map(function(x) { return x + 1 });
    // 어떠한 조건을 실행하는 새로운 배열 반환.
    // 해당 조건 x + 1
    // [2, 3, 4] 가 반환된다.

    expect(numbersPlus1).toEqual([2, 3, 4]);
    expect(numbers).toEqual([1, 2, 3]); // 원본 배열은 바뀌지 않는다
  });

  it("should use 'reduce' to update the same result on each iteration", function () {
    var numbers = [1, 2, 3];
    var reduction = _(numbers).reduce(
            function(/* result from last call */ memo, /* current */ x) { return memo + x }, /* initial */ 0);
      // reduce는 해당 리스트 즉, 배열을 어떠한 기준을 실행하고 모든 배열을 모두 할당하여 실행하여서 값을 반환한다. 
      // 1 + 2 = 3
      // 3 + 3 = 6
      // 6

    expect(reduction).toBe(6);
    expect(numbers).toEqual([1, 2, 3]); // 원본 배열은 바뀌지 않는다
  });

  it("should use 'forEach' for simple iteration", function () {
    var numbers = [1,2,3];
    var msg = "";
    var isEven = function (item) {
      msg += (item % 2) === 0;
    };

    _(numbers).forEach(isEven);
    // 배열의 foreach는 각 배열의 값을 전달받은 인자를 하나하나 다 실행 한다
    // 1 => msg += 1 % 2 === 0 => msg += 1 === 0 => msg += false 
    // 2 => msg += 2 % 2 === 0 => msg += 0 === 0 => msg += true
    // 3 => msg += 3 % 2 === 0 => msg += 1 === 0 => msg += false
    // msg = 'falsetruefalse'

    expect(msg).toEqual('falsetruefalse');
    expect(numbers).toEqual([1, 2, 3]); // 원본 배열은 바뀌지 않는다
  });

  it("should use 'all' to test whether all items pass condition", function () {
    var onlyEven = [2,4,6];
    var mixedBag = [2,4,5,6];

    var isEven = function(x) { return x % 2 === 0 }; // 짝수일 경우

    /* all() 해당 배열의 모든 값들이 조건이 맞아야 true 반환 */
    /* 아무리 찾아도 all()가 나오지가 않아서 every() 함수로 이름 변경 된 듯 한다 */
    expect(_(onlyEven).all(isEven)).toBe(true); // 해당 배열이 모두 짝수 이므로 true
    expect(_(mixedBag).all(isEven)).toBe(false); // 해당 배열중 홀수 5 하나가 포함되어있으므로 false
  });

  it("should use 'any' to test if any items passes condition" , function () {
    var onlyEven = [2,4,6];
    var mixedBag = [2,4,5,6];

    var isEven = function(x) { return x % 2 === 0 }; // 짝수일 경우

    /* any() 해당 배열중에서 조건이 하나라도 맞으면 true 반환 */
    /* any() 찾아도 나오지가 않아 some()으로 이름이 변경 된 듯 하다 */
    expect(_(onlyEven).any(isEven)).toBe(true); // 배열 값중에 짝수가 하나라도 있어서 true 반환
    expect(_(mixedBag).any(isEven)).toBe(true); // 배열 값중에 짝수가 하나라도 있어서 true 반환
  });

  it("should use range to generate an array", function() {
      
      /* range(start, stop, step) */
      /* range(first) : 인자가 한개이면 해당 인자가 배열의 값이 0 부턴 배열의 인자 - 1만큼 배열 생성  */
      /* range(first, second) : 인자가 두개이면 첫번재 인자가 값이 시작 값이 되고 두번재 인자 - 1 이 끝 인덱스 값이 된다. */
      /* range(start, stop, step) : 인자가 세개이면 배열의 값 범위는 start ~ stop - 1 이고 step 만큼 증가되어 배열이 생성된다*/
      expect(_.range(3)).toEqual([0, 1, 2]); // [0, 1, 2]
      expect(_.range(1, 4)).toEqual([1, 2, 3]); // [1, 2, 3]
      expect(_.range(0, -4, -1)).toEqual([0, -1, -2, -3]); // [0, -1, -2, -3]
  });

  it("should use flatten to make nested arrays easy to work with", function() {
      expect(_([ [1, 2], [3, 4] ]).flatten()).toEqual([1, 2, 3, 4]);
      // flatten : 배열의 depth를 모두 제거한다.  ... [1, 2, 3, 4]
  });

  it("should use chain() ... .value() to use multiple higher order functions", function() {
      
    /* chain() : 해당 배열을 래핑한 객체로 반환 */
    /* 예) [1, [1,2]].chain() => { 0 : 1, 1 : [2, 3] }*/
    /* flatten() : depth 모두 제거 */
    /* map() : 해당 인자를 실행하는 새로운 배열 생성 */
    /* reduce() : 해당 조건을 배열 값 모두 실행하여 해당 값을 반환(재귀함수) */
    /* value() : 값을 반환 */
    var result = _([ [0, 1], 2 ]).chain() // Array { 0 : [0, 1], 1 : 2 } 
                       .flatten() // Array { 0 : 0, 1 : 1, 2 : 2 }
                       .map(function(x) { return x+1 } ) // Array { 0 : 1, 1 : 2, 2 : 3 }
                       .reduce(function (sum, x) { return sum + x }) // 1 + 2 => 3 ..... 3 + 3 = 6 .... 6
                       .value(); // 6


      expect(result).toEqual(6);
  });

});

