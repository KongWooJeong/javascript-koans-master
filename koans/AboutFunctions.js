describe("About Functions", function() {

  it("should declare functions", function() {
    
    // 해당 함수는 전달받은 두개의 인자를 사용하여 더한 값은 반환한다.
    function add(a, b) {
      return a + b;
    }

    expect(add(1, 2)).toBe(3); // 1, 2의 더한 값은 3을 반환한값이 들어가야 한다.
  });

  it("should know internal variables override outer variables", function () {
    var message = "Outer";

    // 변수 message 를 반환한다.
    function getMessage() {
      return message;
    }

    // 해당 함수내의 새로운 변수를 선언 및 초기화 하여 해당 지역 변수를 반환한다.
    function overrideMessage() {
      var message = "Inner";
      return message;
    }

    expect(getMessage()).toBe('Outer'); // Outer 반환
    expect(overrideMessage()).toBe('Inner'); // 해당 변수의 우선순위는 함수내에 선어된 변수가 먼저 인식된다.
    expect(message).toBe('Outer'); // overrideMessage 함수내의 변수는 해당 함수내에서만 실행되므로 해당 함수 외부에 있는 'Outer'가 할당되어 있는 변수가 들어간다.
  });

  it("should have lexical scoping", function () {
    var variable = "top-level";
    function parentfunction() {
      var variable = "local";
      function childfunction() {
        return variable;
      }
      return childfunction();
    }
    expect(parentfunction()).toBe('local');
    // 함수 실행 순서 : 1. parentfunction 함수 실행 되어 변수 variable 선언 및 초기화
    //               2. return childfunction()에서 childfunction 함수 실행 되어 함수 내에 변수가 반환되어서 'local' 반환
  });

  it("should use lexical scoping to synthesise functions", function () {

    function makeMysteryFunction(makerValue)
    {
      var newFunction = function doMysteriousThing(param)
      {
        return makerValue + param;
      };
      return newFunction;
    }

    var mysteryFunction3 = makeMysteryFunction(3); 
    // makeMysteryFunction(3)은 doMysteriousThing(param) { return 3 + param }과 같은 함수 형태이므로
    
    var mysteryFunction5 = makeMysteryFunction(5);
    // makeMysteryFunction(5)은 doMysteriousThing(param) { return 5 + param }과 같은 함수 형태이므로

    expect(mysteryFunction3(10) + mysteryFunction5(5)).toBe(23);
    // mysteryFunction3(10)은 doMysteriousThing(3) { return 3 + 10 }이므로 반환되는 값은 13이다. 
    // mysteryFunction5(5)은 doMysteriousThing(3) { return 5 + 5 }이므로 반환되는 값은 10이다.
    // 그래서 두개의 함수의 반환값인 13 + 10 인 23이 된다.
  });

  it("should allow extra function arguments", function () {

    function returnFirstArg(firstArg) {
      return firstArg;
    }

    expect(returnFirstArg("first", "second", "third")).toBe('first');
    // 해당 함수의 매개변수가 한개 선언되어 있기때문에 해당 함수를 호출할때 어려개의 인자들을 넘겨도 첫번째로 전달된 인자만 인식하여 반환된다. 

    function returnSecondArg(firstArg, secondArg) {
      return secondArg;
    }

    expect(returnSecondArg("only give first arg")).toBe(undefined);
    // 해당 함수의 매개변수가 두개로 선언이 되었는데 해당 함수를 호출할때 인자 한개만 호출하였기때문에 두번째 인자가 없어서 undefined가 반환된다.

    function returnAllArgs() {
      var argsArray = [];

      // 인자로 넘겨온 갯수 만큼 반복된다.
      for (var i = 0; i < arguments.length; i += 1) {
        argsArray.push(arguments[i]); // 해당 인자를 배열에 추가한다.
      }
      return argsArray.join(","); // 해당 전달되 인자로 생성된 배열을 구분자 ,로 통해 문자열로 반환된다.
    }

    expect(returnAllArgs("first", "second", "third")).toBe('first,second,third');
    // 배열['fisrt', 'second', 'third']가 생성이 되고
    // join을 통해 구분자 , 기준으로 문자열 'fisrt,second,third'가 반환된다.
  });

  it("should pass functions as values", function () {

    var appendRules = function (name) {
      return name + " rules!";
    };

    var appendDoubleRules = function (name) {
      return name + " totally rules!";
    };

    var praiseSinger = { givePraise: appendRules };
    // 해당 객체의 givePraise의 값으로 함수 appendRules 가 할당된다.

    expect(praiseSinger.givePraise("John")).toBe('John rules!');
    // 해당 함수의 인자를 전달 받아 John rules! 가 반환된다.

    praiseSinger.givePraise = appendDoubleRules;
    // 해당 객체의 givePraise의 값으로 함수 appendDoubleRules 가 할당된다.

    expect(praiseSinger.givePraise("Mary")).toBe('Mary totally rules!');
    // 해당 함수의 인자를 전달 받아 Mary totally rules! 가 반환된다.

  });
});
