import { concat, delay, filter, interval, map, Observable, of } from "rxjs";

// შევქმნათ მესამე ობსერვებლი c$, რომელზე საბსქრაიბის შემდეგაც
// stream ში მივიღებთ a$-ს და b$-ს გაერთიანებულ სტრიმს, სადაც რიცხვები იქნება
// 10-ჯერ მეტი ორიგინალზე, და სტრინგები იქნება გაორმაგებული (1 => 10, 'aa' => 'aaaa').

const a$ = of(1, "aa", 3);
const b$ = of(4, 5, "bb");
const c$ = concat(a$, b$).pipe(
  map((x: string | number) => {
    if (typeof x === "number") {
      return x * 10;
    } else {
      return `${x}${x}`;
    }
  })
);
c$.subscribe((x) => console.log(x));

// შექმენით ფუნქცია getUsers(), რომელიც დააბრუნებს Observable<User[]>
// ობიექტს 5 წამში (setTimeout-ის გარეშე) (Api-ს იმიტაცია), სადაც იქნება შენახული რამდენიმე იუზერის ობიექტი.

interface User {
  firstName: string;
  lastName: string;
  age: number;
}
// როდესაც ამ დაბრუნებულ Observable-ს დავუსაბსქრაიბდები, უნდა მომივიდეს სტრიმი შემდეგი სახით:
// სტრიმში უნდა იყოს მხოლოდ 18 წელს გადაცილებული ხალხი;

function getUsers(): Observable<User[]> {
  return of<User[]>([
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
    delay(5000),
    map((x) => x.filter((users) => users.age > 18))
  );
}

getUsers().subscribe((x) =>
  x.map((x) => {
    console.log(`${x.firstName} ${x.lastName}, ${x.age} years old`);
  })
);

// შექმენით უსასრულო stream, სადაც ყოველ ლუწ მნიშვნელობაზე ამ რიცხვს გააორმაგებთ,
// კენტ მნიშვნელობას კი გამოტოვებთ, არ აჩვენებთ.

const interval$ = interval(500).pipe(
  filter((x) => x % 2 === 0),
  map((x) => x * 2)
);
interval$.subscribe((x) => console.log(x));
