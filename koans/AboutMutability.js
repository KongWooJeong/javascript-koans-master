describe("About Mutability", function() {

  it("should expect object properties to be public and mutable", function () {
    var aPerson = {firstname: "John", lastname: "Smith" };
    aPerson.firstname = "Alan"; // 해당 객체의 프로퍼티 추가

    expect(aPerson.firstname).toBe('Alan'); // 객체의 프로퍼티 접근 하여 해당 값을 반환한다.
  });

  it("should understand that constructed properties are public and mutable", function () {
    function Person(firstname, lastname)
    {
      this.firstname = firstname;
      this.lastname = lastname;
    }
    var aPerson = new Person ("John", "Smith"); // 생성자 함수로 통해 생성된 객체 {firstname : 'John', lastnamme : 'Smith'}가 생성된다.
    aPerson.firstname = "Alan"; // 해당 firstname 프로퍼티의 값을 할당한다.

    expect(aPerson.firstname).toBe('Alan'); // 객체의 프로퍼티 접근 하여 해당 값을 반환한다.
  });

  it("should expect prototype properties to be public and mutable", function () {
    function Person(firstname, lastname)
    {
      this.firstname = firstname;
      this.lastname = lastname;
    }
    Person.prototype.getFullName = function () {
      return this.firstname + " " + this.lastname;
    };

    var aPerson = new Person ("John", "Smith"); // 생성자 함수를 사용하여 객체 { firstname : 'John', lastname : 'Smith' } 가 생성된다.
    expect(aPerson.getFullName()).toBe('John Smith'); // 해당 객체의 메서드를 접근하여 반환값을 가져온다. ... 'John Smith'

    aPerson.getFullName = function () {
      return this.lastname + ", " + this.firstname;
    };

    expect(aPerson.getFullName()).toBe('Smith, John'); // 해당 객체의 메서드를 접근하여 반환값을 가져온다. ... 'Smith, John'
  });

  it("should know that variables inside a constructor and constructor args are private", function () {
    function Person(firstname, lastname)
    {
      var fullName = firstname + " " + lastname;

      this.getFirstName = function () { return firstname; };
      this.getLastName = function () { return lastname; };
      this.getFullName = function () { return fullName; };
    }
    var aPerson = new Person ("John", "Smith"); // 생성자 함수를 통하여 전달받은 인자를 사용하여 객체가 생성된다.

    aPerson.firstname = "Penny"; // 객체의 프로퍼티의 값 할당
    aPerson.lastname = "Andrews";
    aPerson.fullName = "Penny Andrews";

    /* 해당 객체를 생성했을때 이미 전달받은 인자를 사용하여 메서드의 return 값이 정해짐*/
    /* 그래서 이미 메서드의 값이 정해진 다음에 각 프로퍼티를 값이 초기화 되었기때문에 해당 메서드에는 처음에 인자로 전달받은 값으로 할당이 되어있다. */
    expect(aPerson.getFirstName()).toBe('John'); 
    expect(aPerson.getLastName()).toBe('Smith');
    expect(aPerson.getFullName()).toBe('John Smith');

    aPerson.getFullName = function () {
      return aPerson.lastname + ", " + aPerson.firstname;
    };

    // 해당 메서드는 객체를 생성한후 프로퍼티 값을 초기화 후 생성된 메서드이므로 초기화된 값이 해당 메서드의 return 값으로 사용된다.
    expect(aPerson.getFullName()).toBe('Andrews, Penny');
  });

});
