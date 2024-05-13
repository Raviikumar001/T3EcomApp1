"use client";

import Link from "next/link";
import cart from "../../../public/image/Cart.png";
import search from "../../../public/image/Search.svg";
import LArrow from "../../../public/image/LArrow.svg";
import RArrow from "../../../public/image/RArrow.svg";
import Logout from "../../../public/image/logout.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const headerLinks = [
  "Categories",
  "Sale",
  "Clearance",
  "New stock",
  "Trending",
];

export function Header() {
  const [name, setName] = useState("");
  const router = useRouter();
  function getUserFromLocaStorage() {
    if (typeof window !== "undefined") {
      // @ts-expect-error
      let a = JSON.parse(localStorage.getItem("user"));

      if (a?.name) {
        setName(a?.name);
      }
    }
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setTimeout(() => {
      router.push("/login");
    }, 800);
  }

  useEffect(() => {
    getUserFromLocaStorage();
  }, []);
  return (
    <>
      <header>
        <div className="flex justify-end gap-3 pr-5 pt-2 text-sm  ">
          <Link href="#">
            {" "}
            <h2>Help</h2>{" "}
          </Link>
          <Link href="#">
            <h2>Orders & Returns</h2>
          </Link>
          {name && (
            <Link href="#">
              <h2>Hi, {name}</h2>
            </Link>
          )}
        </div>

        <div className="mt-5 flex justify-between pl-5 pr-5">
          <div>
            <h2 className="cursor-pointer text-2xl font-bold">
              <Link href="/">ECOMMERCE</Link>
            </h2>
          </div>
          <div className="flex gap-4">
            {headerLinks.map((item, index) => (
              <Link href="#" key={index}>
                <span className="cursor-pointer font-bold" key={index}>
                  {item}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex gap-3 ">
            <Image className="cursor-pointer" src={search} alt="search" />
            <Image className="cursor-pointer" src={cart} alt="cart" />
            {name && (
              <button onClick={logout}>
                <Image
                  className="cursor-pointer"
                  height={20}
                  src={Logout}
                  alt="cart"
                />
              </button>
            )}
          </div>
        </div>
        <div className="mt-3 h-10 content-center bg-[#f4f4f4]">
          <div className="flex items-center justify-center gap-3">
            <div>
              <Image src={LArrow} alt="Left arrow" />
            </div>

            <h2 className="cursor-pointer">Get 10% off on business sign up</h2>

            <div>
              <Image src={RArrow} alt="Right arrow" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
