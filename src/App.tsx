import { useState, useEffect } from "react";
import "./App.css";
// 파이어베이서 파일에서 import 해온 db
import { db } from "./config/firebase-config";
// db에 접근해서 데이터를 꺼내게 도와줄 친구들
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

interface UserType {
  id: string;
  age: number;
  name: string;
}

function App() {
  // 이따가 users 추가하고 삭제하는거 진행을 도와줄 state
  const [users, setUsers] = useState<Array<UserType>>([]);
  // db의 users 컬렉션을 가져옴
  const usersCollectionRef = collection(db, "users");
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [isChanged, setIsChanged] = useState(true);

  // 시작될때 한번만 실행
  useEffect(() => {
    // 비동기로 데이터 받을준비
    const getUsers = async () => {
      try {
        // getDocs로 컬렉션안에 데이터 가져오기
        const data = await getDocs(usersCollectionRef);
        // users에 data안의 자료 추가. 객체에 id 덮어씌우는거
        const list = data.docs;

        if (list.length > 0) {
          setUsers(
            list.map((d) => {
              const u = d.data() as UserType;
              return { ...u, id: d.id };
            })
          );
        }
      } catch (err) {
        console.error("Get user error ", err);
      }
    };

    if (isChanged) {
      getUsers();
      setIsChanged(false);
    }
  }, [isChanged, usersCollectionRef]);

  // 띄워줄 데이터 key값에 고유ID를 넣어준다.
  const showUsers = users.map((value: UserType) => (
    <div key={value.id}>
      <h1>Name: {value.name}</h1>
      <h1>Age: {value.age}</h1>
      <button onClick={() => updateUser(value.id, value.age)}>
        Increase Age
      </button>
      <button onClick={() => deleteUser(value.id)}>Delete User</button>
    </div>
  ));

  // 생성 - C
  const createUsers = async () => {
    // addDoc을 이용해서 내가 원하는 collection에 내가 원하는 key로 값을 추가한다.
    if (validCheck()) {
      try {
        await addDoc(usersCollectionRef, {
          name: newName,
          age: Number(newAge),
        });
        setNewAge("");
        setNewName("");
        setIsChanged(true);
      } catch (err) {
        console.error("Add doc error ==> ", err);
      }
    }
  };

  // 업데이트 - U
  const updateUser = async (id: string, age: number) => {
    if (validCheck()) {
      // 내가 업데이트 하고자 하는 db의 컬렉션의 id를 뒤지면서 내가 수정하고자 하는 id랑 같은 id값을 가진 데이터를 찾는다
      const userDoc = doc(db, "users", id);
      // 내가 업데이트 하고자 하는 key를 어떻게 업데이트할지 준비,, 중요한점이 db에는 문자열로 저장되어있다. 그래서 createUsers()함수안에서 age를 생성할때 숫자열로 형변환 해줘야한다
      const newField = { age: Number(age) + 1 };

      try {
        // updateDoc()을 이용해서 업데이트
        await updateDoc(userDoc, newField);
        setIsChanged(true);
      } catch (err) {
        console.error("Update user error => ", err);
      }
    }
  };

  // 삭제 - D
  const deleteUser = async (id: string) => {
    // 내가 삭제하고자 하는 db의 컬렉션의 id를 뒤지면서 데이터를 찾는다
    const userDoc = doc(db, "users", id);

    try {
      // deleteDoc을 이용해서 삭제
      await deleteDoc(userDoc);
      setIsChanged(true);
    } catch (err) {
      console.error("Delete user error => ", err);
    }
  };

  // validation check
  const validCheck = () => {
    const krNameReg = /^[가-힣]{2,4}$/;

    if (!newName) {
      alert("이름을 입력해 주세요.");
      return false;
    }

    if (!krNameReg.test(newName)) {
      alert("한글 이름을 형식에 맞게 입력해 주세요.");
      return false;
    }

    if (!newAge) {
      alert("나이를 입력해 주세요.");
      return false;
    }

    return true;
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="name..."
        value={newName}
        maxLength={12}
        onChange={(e) => {
          setNewName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="age..."
        value={newAge}
        maxLength={3}
        onChange={(e) => {
          const inputValue = e.target.value;
          // 숫자 이외의 값은 제거하고 숫자만 남깁니다.
          const numericValue = inputValue.replace(/[^0-9]/g, "");
          setNewAge(numericValue);
        }}
      />
      <button onClick={createUsers}>Create User</button>
      {showUsers}
    </div>
  );
}

export default App;
