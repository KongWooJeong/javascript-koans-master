var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products; // 변수 선언

  beforeEach(function () {

    /* 해당 변수에 배열을 할당하고 해당 배열에는 각 객체가 값으로 할당되어 있다. */
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = []; // 배열 생성하여 변수에 할당.

    /* 배열의 길이만큼 반복된다. */
    for (i = 0; i < products.length; i+=1) {

        /* products[i] = 각 객체... products[i].containsNuts 값이 false인경우 코드 실행 */
        if (products[i].containsNuts === false) {
            hasMushrooms = false; // 변수에 false 할당

            /* 배열의 각 value 값인 객체의 프로퍼티 ingredients 배열의 길이만큼 반복된다. */
            for (j = 0; j < products[i].ingredients.length; j+=1) {

              // 해당 프로퍼티 ingredients 배열의 값중에 mushrooms 이 존재하면 코드 실행
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true; // 변수에 true 할당
               }
            }

            // 변수 hasMushrooms가 false 일때 배열 productsICanEat에 배열 products의 값중에 mushrooms가 없고 containsNuts가 false 인 배열의 객체를 배열에 추가한다.
            // productsICanEat = [{ name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false }]
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1); // 해당 배열의 value 가 객체 하나만 들어있다.
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = []; // 배열 생성하여 변수에 할당.

      /* solve using filter() & all() / any() */
      /* containsNuts: false 그리고 mushrooms이 포함되지 않는 product */
      productsICanEat = _(products).filter(function(x){               // 해당 배열에서 특정 조건을 만족하는 배열 걸러내기
                          return _(x.ingredients).all(function(y) {   // products의 각 ingredients 배열의 값중에서 muchrooms 없는 걸러내기
                            return y !== "mushrooms";
                            }) && x.containsNuts === false;           // products의 containsNuts이 false 인것만 걸러내기
                          });                                         // 위 두조건을 모두 만족하는 배열의 값을 새로운 배열로 만들어 productsICanEat 할당.

      // console.log(productsICanEat)

      expect(productsICanEat.length).toBe(1); // 배열의초기화 되었기때문에 배열의 길이는 0 이다.
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;

    /* 1 부터 999 까지 반복 */
    for(var i=1; i<1000; i+=1) {

      // 변수 i가 3의 배수 이거나 5의 배수 일때 변수 sum에 계속 값을 더한다. 
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    // _.ranage(1, 1000) 으로 했을때 계속 233169가 나와서 도대체 왜 그런지 모르겠다 아직은 계속 공부가 더 필요한 것 같다. 
    // _.ranage(0, 1000) 으로 했을땐 정상적으로 잘 된다.
    var sum = (_.range(0, 1000)).reduce(function(add,x) { if(x % 3 === 0 || x % 5 === 0) {add += x} return add; });    /* try chaining range() and reduce() */
    
    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    // products 배열 길이만큼 반복된다.
    for (i = 0; i < products.length; i+=1) {
        
        // 배열의 각 value의 ingredients의 길이 만큼 반복된다.
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
            // 해당 배열에 products 배열의 ingredients의 값들이 종류별로 각각 몇개씩 들어가있는가를 count를 센다 
            // (ingredientCount[products[i].ingredients[j]] || 0) 는 ingredientCount[products[i].ingredients[j]]의 값을 반환한다.
            // 그래서 거기에다가 + 1 를 해준다.
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2); // mushrooms이 총 두개이다.
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    ingredientCount = _(products).chain() // 해당 배열를 래핑한 객체로 반환
                                .map(function(x){return x.ingredients}) // 각 배열의 인덱스 위치에 있는 객체의 프로퍼티 중에서 ingredients 프로퍼티만 찾아서 객체로 변환
                                .flatten() // 해당 각 객체를 뎁스를 없애고 하나의 객체로 만듦
                                .reduce( function(obj, i) {
                                  obj[i] = (obj[i] || 0) + 1; return obj; // 이전코드를 동일하게 사용하여 해당 재귀함수에서 리턴값을 객체를 반환함
                                }, ingredientCount) // 초기값을 객체 ingredientCount 할당함.
                                  .value(); // value() 쓰지 않으면 아래 코드 값이 undefiend 가 나온다.

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  /*
  it("should find the largest prime factor of a composite number", function () {

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {


  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

  });

  it("should find the 10001st prime", function () {

  });
  */
});
