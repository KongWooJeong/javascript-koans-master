/* 생성자 함수 선언 */
function Muppet(age, hobby) {
  this.age = age;
  this.hobby = hobby;

  this.answerNanny = function(){
	return "Everything's cool!";
  }
}

function SwedishChef(age, hobby, mood) {
  Muppet.call(this, age, hobby); // this : call 함수를 호출한 객체 즉, Muppet을 의미한다. 두개의 전달 받은 인자는 해당 객체의 프로퍼틔 값으로 할당되는 것 같다.
  this.mood = mood;

  this.cook = function() {
    return "Mmmm soup!";
  }
}

SwedishChef.prototype = new Muppet(); // SwedishChef 객체의 프로퍼티인 prototype 에 객체를 생성하여 할당한다. 

describe("About inheritance", function() {
  beforeEach(function(){
    this.muppet = new Muppet(2, "coding"); // muppet 변수에 객체를 생성하여 할당한다.
	this.swedishChef = new SwedishChef(2, "cooking", "chillin"); // swedishChef 변수에 객체를 생성하여 할당한다. 
  });

  it("should be able to call a method on the derived object", function() {
    expect(this.swedishChef.cook()).toEqual('Mmmm soup!'); // 객체의 메서드를 호출하여 반환값을 할당한다.
  });

  it("should be able to call a method on the base object", function() {
    expect(this.swedishChef.answerNanny()).toEqual("Everything's cool!");
    // SwedishChef 생성자 함수의 프로퍼티 prototype에 Muppet 객체를 생성하여 할당하였기때문에 해당 메서드에 접근이 가능하다.

  });

  it("should set constructor parameters on the base object", function() {
    
    /* 생성자 함수에 call 함수를 사용하였기 때문에 접근이 가능하다고 본다. */
    expect(this.swedishChef.age).toEqual(2);
    expect(this.swedishChef.hobby).toEqual('cooking');
    console.log(this.swedishChef); // swedishChef 객체의 프로퍼티 age, hobby 가 포함되어 있는걸 볼 수 있다. 
  });

  it("should set constructor parameters on the derived object", function() {
    expect(this.swedishChef.mood).toEqual('chillin');
    
  });
});

// http://javascript.crockford.com/prototypal.html
/* 모든 객체의 부모가 되는 Object 프로퍼티 prototype 에 프로퍼티인 beget에 함수를 할당한다. */
Object.prototype.beget = function () {
  function F() {} // 생성자 함수 선언
  F.prototype = this; // 해당 함수 prototype에 this를 할당한다. 여기서 this는 해당 함수를 호출하는 객체를 의미하게 된다.
  return new F(); // 해당 생성자 함수로 사용하여 객체를 생성하여 해당 객체를 반환한다.
}

function Gonzo(age, hobby, trick) {
  Muppet.call(this, age, hobby); // Muppet 객체의 프로퍼티 age hobby를 해당 생성자 함수의 프로퍼티로 할당한다. .... this : 해당 생성자 함수를 호출한 객체
  this.trick = trick; // 프로퍼티 추가 ... this : 해당 생성자 함수를 호출한 객체

  // 해당 생성자 함수의 메서드 추가 
  this.doTrick = function() {
    return this.trick;
  }
}

//no longer need to call the Muppet (base type) constructor
Gonzo.prototype = Muppet.prototype.beget(); // 생성자 함수 prototype에 Muppet의 prototype의 함수를 할당한다.
                                            // beget()은 모든 객체의 부모인 Object의 prototype의 프로퍼티로 추가가 되어 있어 접근이 가능하다고 본다.

describe("About Crockford's inheritance improvement", function() {
  beforeEach(function(){
  this.gonzo = new Gonzo(3, "daredevil performer", "eat a tire"); // 생성자 함수의 전달받은 인자롤 사용하여 객체를 생성하여 변수에 할당한다. 
  });

  it("should be able to call a method on the derived object", function() {
    expect(this.gonzo.doTrick()).toEqual('eat a tire'); // 객체의 메서드에 접근하여 반환값으르 할당한다. 
  });

  it("should be able to call a method on the base object", function() {
    expect(this.gonzo.answerNanny()).toEqual("Everything's cool!"); // 해당 객체에서 call 메서드를 사용하여 해당 객체의 프로퍼티로 추가가 되었기때문에 접근이 가능하다.
  });

  it("should set constructor parameters on the base object", function() {
    expect(this.gonzo.age).toEqual(3); 
    expect(this.gonzo.hobby).toEqual('daredevil performer');
  });

  it("should set constructor parameters on the derived object", function() {
    expect(this.gonzo.trick).toEqual('eat a tire');
  });
});
