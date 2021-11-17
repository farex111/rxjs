"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
// შევქმნათ მესამე ობსერვებლი c$, რომელზე საბსქრაიბის შემდეგაც
// stream ში მივიღებთ a$-ს და b$-ს გაერთიანებულ სტრიმს, სადაც რიცხვები იქნება
// 10-ჯერ მეტი ორიგინალზე, და სტრინგები იქნება გაორმაგებული (1 => 10, 'aa' => 'aaaa').
var a$ = (0, rxjs_1.of)(1, "aa", 3);
var b$ = (0, rxjs_1.of)(4, 5, "bb");
var c$ = (0, rxjs_1.concat)(a$, b$).pipe(
  (0, rxjs_1.map)(function (x) {
    if (typeof x === "number") {
      return x * 10;
    } else {
      return "" + x + x;
    }
  })
);
c$.subscribe(function (x) {
  return console.log(x);
});
// როდესაც ამ დაბრუნებულ Observable-ს დავუსაბსქრაიბდები, უნდა მომივიდეს სტრიმი შემდეგი სახით:
// სტრიმში უნდა იყოს მხოლოდ 18 წელს გადაცილებული ხალხი;
function getUsers() {
  return (0, rxjs_1.of)([
    {
      firstName: "giorgi",
      lastName: "faradashvili",
      age: 25,
    },
    {
      firstName: "temo",
      lastName: "tabatadze",
      age: 17,
    },
    {
      firstName: "levani",
      lastName: "burduli",
      age: 20,
    },
    {
      firstName: "misho",
      lastName: "abuladze",
      age: 27,
    },
    {
      firstName: "alex",
      lastName: "jibuti",
      age: 18,
    },
  ]).pipe(
    (0, rxjs_1.delay)(5000),
    (0, rxjs_1.map)(function (x) {
      return x.filter(function (users) {
        return users.age > 18;
      });
    })
  );
}
getUsers().subscribe(function (x) {
  return x.map(function (x) {
    console.log(x.firstName + " " + x.lastName + ", " + x.age + " years old");
  });
});
// შექმენით უსასრულო stream, სადაც ყოველ ლუწ მნიშვნელობაზე ამ რიცხვს გააორმაგებთ,
// კენტ მნიშვნელობას კი გამოტოვებთ, არ აჩვენებთ.
var interval$ = (0, rxjs_1.interval)(500).pipe(
  (0, rxjs_1.filter)(function (x) {
    return x % 2 === 0;
  }),
  (0, rxjs_1.map)(function (x) {
    return x * 2;
  })
);
interval$.subscribe(function (x) {
  return console.log(x);
});
