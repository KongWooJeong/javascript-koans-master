describe("About Arrays", function() {

  //We shall contemplate truth by testing reality, via spec expectations.
  it("should create arrays", function() {
    var emptyArray = [];
    expect(typeof(emptyArray)).toBe('object'); //A mistake? - http://javascript.crockford.com/remedial.html
    expect(emptyArray.length).toBe(0);

    var multiTypeArray = [0, 1, "two", function () { return 3; }, {value1: 4, value2: 5}, [6, 7]];
    expect(multiTypeArray[0]).toBe(0); // 배열 인덱스 0 은 0
    expect(multiTypeArray[2]).toBe('two'); // 배열 인덱스 2 는 'two'
    expect(multiTypeArray[3]()).toBe(3); // 배열 인덱스 3에 해당 함수 실행해서 반환값은 3
    expect(multiTypeArray[4].value1).toBe(4); // 배열 인덱스 4의 프로퍼티 value1 값 은 4
    expect(multiTypeArray[4]["value2"]).toBe(5); // 배열 인덱스 4의 프로퍼티 value2 값은 5
    expect(multiTypeArray[5][0]).toBe(6); // 해당 배열 인덱스 5의 배열에 인덱스 0 값은 6
  });

  it("should understand array literals", function () {
    var array = [];
    expect(array).toEqual([]); // 빈배열

    array[0] = 1; // 배열 인덱스 0에 1 할당
    expect(array).toEqual([1]); // 해당 배열 [1]

    array[1] = 2; // 해당 인덱스 1에 2 할당
    expect(array).toEqual([1, 2]); // 해당 배열 [1, 2]

    array.push(3); // 해당 배열의 끝에 3 할당
    expect(array).toEqual([1, 2, 3]); // 해당 배열 [1, 2, 3]
  });

  it("should understand array length", function () {
    var fourNumberArray = [1, 2, 3, 4];

    expect(fourNumberArray.length).toBe(4); // 배열의 길이가 4
    fourNumberArray.push(5, 6); // 배열에 5, 6 추가
    expect(fourNumberArray.length).toBe(6); // 배열의 길이가 6

    var tenEmptyElementArray = new Array(10); // 배열의 크기를 10으로 지정하여 생성
    expect(tenEmptyElementArray.length).toBe(10); // 배열의 길이가 10

    tenEmptyElementArray.length = 5; // 배열이 길이 할당
    expect(tenEmptyElementArray.length).toBe(5); // 배열의 길이 5
  });

  it("should slice arrays", function () {
    var array = ["peanut", "butter", "and", "jelly"];

    expect(array.slice(0, 1)).toEqual(['peanut']); // 인덱스 0 부터 인덱스 1-1 까지 반환
    expect(array.slice(0, 2)).toEqual(['peanut', 'butter']); // 인덱스 0 부터 인덱스 2-1 까지 반환
    expect(array.slice(2, 2)).toEqual([]); // 인덱스 2 부터 인덱스 2-1까지 반환이 안되므로 빈 배열 반환
    expect(array.slice(2, 20)).toEqual(['and', 'jelly']); // 인덱스 2 부터 두번쨰 인덱스가 배열의 길이보다 클경우엔 해당 배열의 길이 값이 들어간다.
    expect(array.slice(3, 0)).toEqual([]); // 해당 두번쨰 인덱스가 0-1 음수이므로 빈 배열 반환
    expect(array.slice(3, 100)).toEqual(['jelly']); // 인덱스 3 부터 배열의 끝까지 반환
    expect(array.slice(5, 1)).toEqual([]); // 인덱스 5부터인데 인덱스 5가 없으므로 빈배열 반환
  });

  it("should know array references", function () {
    var array = [ "zero", "one", "two", "three", "four", "five" ];

    function passedByReference(refArray) {
        refArray[1] = "changed in function"; // 배열 인덱스 1의 값을 초기화
    }
    passedByReference(array); // 해당 배열의 인덱스 값을 초기화 하는 함수 실행
    expect(array[1]).toBe('changed in function'); // 배열 인덱스 1의 값은 초기화 된 값

    var assignedArray = array; // 해당 배열을 새로운 변수에 복사
    assignedArray[5] = "changed in assignedArray";  // 해당 변수에 할당된 배열의 인덱스 5의 값을 변경
    expect(array[5]).toBe('changed in assignedArray'); // 원본 배열 인덱스 5의 값도 변경
    // 해당 배열은 참조 타입으로 복사가 된 배열은 같은 주소값을 가지기 때문에 복사된 배열의 값이 바뀌면 원본 배열의 값도 바뀐다.

    var copyOfArray = array.slice(); // slice()의 매개변수가 없으면 해당 배열 자체를 반환한다.
    copyOfArray[3] = "changed in copyOfArray"; // 복사된 배열의 값을 변경
    expect(array[3]).toBe('three'); // slice()는 새로운 배열 자체를 반환되기 때문에 해당 배열의 값이 변경이되어 원본 배열이 영향을 미치지 않는다.
  });

  it("should push and pop", function () {
    var array = [1, 2];
    array.push(3); // 배열 끝에 3 추가

    expect(array).toEqual([1, 2, 3]); // 해당 배열은 [1, 2, 3]

    var poppedValue = array.pop(); // 해당 배열의 끝 인덱스의 값은 추출
    expect(poppedValue).toBe(3); // 배열의 끝 인덱스의 값은 3
    expect(array).toEqual([1, 2]); // 배열의 끝 값을 추출 했기 때문에 [1, 2]가 남는다.
  });

  it("should know about shifting arrays", function () {
    var array = [1, 2];

    array.unshift(3); // 배열의 첫번째 인덱스의 값 3 추가
    expect(array).toEqual([3, 1, 2]);

    var shiftedValue = array.shift(); // 배열의 첫번째 인덱스 값을 추출하고 해당 값을 반환
    expect(shiftedValue).toEqual(3); // 해당 배열의 첫번째 인덱스의 값은 3
    expect(array).toEqual([1, 2]); // 첫번째 인덱스의 값을 추출하고 남은 배열이다 [1, 2]
  });
});
