"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

type UserType = {
  name: string;
  phone: string;
  address: string;
  age: number;
  gender: "male" | "female";
};

export default function Home() {
  const ref = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<UserType[]>();

  function getData() {
    fetch("http://localhost:3001/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setState(res.data);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.currentTarget;
    const name = (target["name"] as any).value as string;
    const age = target["age"].value;
    const address = target["address"].value;
    const gender = target["gender"].checked ? "male" : "female";
    console.log({ name, address, age, gender });
    const body = { name, address, age, gender };

    fetch("http://localhost:3001/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setState(res.data);
      });
  }

  return (
    <main className={styles.main}>
      <form ref={ref} onSubmit={handleSubmit}>
        <input name="name" placeholder="name" />
        <input name="age" placeholder="age" />
        <input name="address" placeholder="address" />
        <select name="gender">
          <option>male</option>
          <option>female</option>
        </select>

        <button type="submit">Submit</button>
      </form>
      <div className={styles.users}>
        {state?.map((item, index) => {
          return (
            <div key={index} className={styles.userItem}>
              <p>name: {item.name}</p>
              <p>gender: {item.gender}</p>
              <p>address: {item.address}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
