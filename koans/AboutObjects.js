describe("About Objects", function () {

  describe("Properties", function () {
    var megalomaniac;

    beforeEach(function () {
       megalomaniac = {  mastermind: "Joker", henchwoman: "Harley" };
    });

    it("should confirm objects are collections of properties", function () {
      expect(megalomaniac.mastermind).toBe('Joker');
      // 변수 megalomaniac에 객체가 할당이 되어서 . 연산자를 사용하여 해당 객체의 프로퍼티에 접근하여 해당 값을 반환한다.
    });

    it("should confirm that properties are case sensitive", function () {
      expect(megalomaniac.henchwoman).toBe('Harley'); 
      // 객체의 프로퍼티 henchwoman 접근하여 해당 값을 반환한다.

      expect(megalomaniac.henchWoman).toBe(undefined);
      // 해당 객체의 henchWoman 프로퍼티가 없기 떄문에 undefined가 반환된다.
    });
  });


  it("should know properties that are functions act like methods", function () {
    var megalomaniac = {
      mastermind : "Brain",
      henchman: "Pinky",
      battleCry: function (noOfBrains) {
        return "They are " + this.henchman + " and the" +
          Array(noOfBrains + 1).join(" " + this.mastermind);
          // 해당 빈배열이 전달 받은 인자 + 1 만큼 length 로 생성
          // 해당 배열은 빈배열이므로 여기서 join(구분자) 메서드를 사용하면
          // 해당 문자열의 값은 "구분자 * 배열의 길이 - 1" 만큼 생성된다.
      }
    };

    var battleCry = megalomaniac.battleCry(4);
    // 변수에 해당 객체의 메서드를 호출하여 반환값이 할당된다. 
    // battleCry(4) 메서드는 Array(5).join(" " + "Brain");
    // 해당 배열의 빈배열이므로 구분자가 배열의 크기 - 1 만큼 반복된다. 
    // return "They are Pinky and the Brain Brain Brain Brain"

    expect("They are Pinky and the Brain Brain Brain Brain").toMatch(battleCry);
  });

  it("should confirm that when a function is attached to an object, 'this' refers to the object", function () {
    var currentDate = new Date();
    var currentYear = (currentDate.getFullYear());
    var megalomaniac = {
      mastermind: "James Wood",
      henchman: "Adam West",
      birthYear: 1970,
      calculateAge: function () {
        return currentYear - this.birthYear;
      }
    };

    expect(currentYear).toBe(2021); // 현재 년도 
    expect(megalomaniac.calculateAge()).toBe(2021-1970); // 현재 년도 - birthYear
    // 해당 객체의 메서드의 접근하여 반환값을 가져온다.
  });

  describe("'in' keyword", function () {
    var megalomaniac;
    beforeEach(function () {
      megalomaniac = {
        mastermind: "The Monarch",
        henchwoman: "Dr Girlfriend",
        theBomb: true
      };
    });

    it("should have the bomb", function () {

      var hasBomb = "theBomb" in megalomaniac;
      // 해당 객체의 프로퍼티 "theBomb"가 있으면 true를 반환한다.

      expect(hasBomb).toBe(true);
    });

    it("should not have the detonator however", function () {

      var hasDetonator = "theDetonator" in megalomaniac;
      // 해당 객체의 프로퍼티 "theDetonator" 가 없으므로 false 반환.

      expect(hasDetonator).toBe(false);
    });
  });

  it("should know that properties can be added and deleted", function () {
    var megalomaniac = { mastermind : "Agent Smith", henchman: "Agent Smith" };

    expect("secretary" in megalomaniac).toBe(false);
    // 해당 객체의 프로퍼티 "secretary" 가 없으므로 false 반환.

    megalomaniac.secretary = "Agent Smith"; // 객체의 프로퍼티 추가
    expect("secretary" in megalomaniac).toBe(true);
    // 해당 객체의 프로퍼티 "secretary" 가 있으므로 true 반환.

    delete megalomaniac.henchman; // 객체의 프로퍼티 삭제
    expect("henchman" in megalomaniac).toBe(false);
    // 해당 객체의 프로퍼티 "henchman" 가 없으므로 false 반환.

  });


  it("should use prototype to add to all objects", function () {
      function Circle(radius)
      {
        this.radius = radius;
      }

      var simpleCircle = new Circle(10); // 생성자 함수를 통해 객체 생성(radius : 10)
      var colouredCircle = new Circle(5); // // 생성자 함수를 통해 객체 생성(radius : 5)
      colouredCircle.colour = "red";  // 해당 객체의 프로퍼티 추가후 값 할당.

      expect(simpleCircle.colour).toBe(undefined); // 해당 객체에는 프로퍼티 'colour' 가 없으므로 undefined 반환
      expect(colouredCircle.colour).toBe('red'); // 해당 객체의 프로퍼틔 접근하여 값 반환

      Circle.prototype.describe = function () {
        return "This circle has a radius of: " + this.radius;
      };
      // 생성자 함수의 prototype 프로퍼티에 변수를 생성하여 해당 변수에 함수를 할당하여 메서드를 생성한다.

      expect(simpleCircle.describe()).toBe('This circle has a radius of: 10');
      expect(colouredCircle.describe()).toBe('This circle has a radius of: 5');
  });
});
