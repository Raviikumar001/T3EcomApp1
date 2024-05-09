"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useState, useRef } from "react";
import { Header } from "../_components/header";

let currentOtpIndex: number = 0;
const Register: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(8).fill(""));
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);

  const hangleOnChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    newOTP[currentOtpIndex] = value.substring(value.length - 1);
    setActiveOTPIndex(currentOtpIndex + 1);
    if (!value) {
      setActiveOTPIndex(currentOtpIndex - 1);
    } else {
      setActiveOTPIndex(currentOtpIndex + 1);
    }

    setOtp(newOTP);
  };

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    currentOtpIndex = index;
    if (key === "Backspacke") {
      setActiveOTPIndex(currentOtpIndex - 1);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  console.log(otp);
  return (
    <div>
      <Header />
      {
        <div className="mb-5 ml-[35%] mr-[35%]   mt-10 rounded-xl border border-gray-300 pb-5 pl-12 pr-12 pt-5">
          <form>
            <h2 className="text-center text-3xl font-semibold">
              Create your account
            </h2>

            <div className="mt-5">
              <label>Name</label>
              <br />
              <input
                className="mt-2 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                type="text"
                placeholder="Enter"
              />

              <br />
              <label>Email</label>
              <br />
              <input
                className="mt-2 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                type="email"
                placeholder="Enter"
              />
              <br />
              <label>Password</label>
              <br />
              <input
                className="mt-2 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                type="password"
                placeholder="Enter"
              />
              <button className="mt-5 w-full rounded-md bg-black p-3 text-center font-medium text-white">
                CREATE ACCOUNT
              </button>

              <p className="mt-5 text-center text-gray-700">
                {" "}
                Have an Account?{" "}
                <span className="text-black">
                  <Link href="/login">LOGIN </Link>{" "}
                </span>
              </p>
            </div>
          </form>
        </div>
      }
      {/* <div className="mb-5 ml-[35%] mr-[35%] mt-10 rounded-xl border border-gray-300 pb-5 pl-12 pr-12 pt-5">
        <form>
          <h2 className="text-center text-3xl font-semibold">
            {" "}
            Verify you email{" "}
          </h2>
          <p className=" mt-3 text-center ">
            {" "}
            Enter the 8 digit code you have received on{" "}
          </p>
          <p className=" mt-3 text-center font-semibold ">swa***@gmail.com</p>
          <div className="mt-5">
            <label>Code</label>
            <br />
            <div className="mb-5 mt-5  flex flex-wrap items-center justify-center gap-3">
              {otp.map((_, index) => {
                return (
                  <React.Fragment key={index}>
                    <input
                      ref={index === activeOTPIndex ? inputRef : null}
                      type="number"
                      onChange={hangleOnChange}
                      onKeyDown={(e) => handleOnKeyDown(e, index)}
                      value={otp[index]}
                      className="spin-button-none h-12 w-12 rounded border-2 border-gray-400 bg-transparent text-center text-xl font-semibold text-gray-400 outline-none transition focus:border-gray-700 focus:text-gray-700"
                    />
                  </React.Fragment>
                );
              })}
            </div>
            <button className="mb-5 mt-5 w-full rounded-md bg-black p-3 text-center font-medium text-white">
              VERIFY
            </button>
          </div>
        </form>
      </div> */}
    </div>
  );
};
export default Register;
