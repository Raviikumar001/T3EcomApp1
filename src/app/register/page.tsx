"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useState, useRef } from "react";
import { Header } from "../_components/header";
import toast, { Toaster } from "react-hot-toast";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import MessageComponent from "../_components/MessageComponent";
// type SignupMutationOutput = RouterOutputs["auth"]["signup"];
import verifyGif from "../../../public/image/verify.gif";
import Image from "next/image";

let currentOtpIndex = 0;
const Register: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(8).fill(""));
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const signupMutation = api.auth.signup.useMutation();
  const verifyOtpMutation = api.auth.verifyOTP.useMutation();
  const router = useRouter();
  const formattedEmail = (email: string) => {
    const [username, domain] = email.split("@");
    const firstThreeChars = username?.slice(0, 3);
    if (username) {
      const maskedUsername = firstThreeChars?.padEnd(username.length, "*");
      return `${maskedUsername}@${domain}`;
    }
    return null;
  };

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
    if (key === "Backspace") {
      setActiveOTPIndex(currentOtpIndex - 1);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  const handleNextSlide = () => {
    console.log("running, 1");

    setTimeout(() => setCurrentSlide(1), 100);
  };

  const handleRedirectSlide = () => {
    console.log("running, ");

    setTimeout(() => setCurrentSlide(2), 100);
  };

  // const handlePrevSlide = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  // ) => {
  //   console.log("running, 0");
  //   e.preventDefault();
  //   setCurrentSlide(0);
  // };

  console.log(currentSlide);

  async function handleOtpForm(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setMessage("");
      if (otp.every((digit) => digit.trim() !== "")) {
        setLoading(true);
        console.log(otp);
        const otpString = otp.join("");
        console.log(otpString);

        const result = await verifyOtpMutation.mutateAsync({
          otp: otpString,
          email,
          name,
        });

        if (result) {
          setLoading(false);
          console.log(result, "result");
          const { message, token, user } = result;
          if (message == "OTP verified successfully") {
            toast.success(message);
            if (token) {
              localStorage.setItem("token", token);
              localStorage.setItem("user", JSON.stringify(user));
            }
            handleRedirectSlide();
            setTimeout(() => {
              router.push("/app");
            }, 1000);
          } else {
            setMessage(message);
          }

          // handleNextSlide();
        }
      } else {
        setMessage("Please fill the OTP fields");
      }
    } catch (error) {}
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      setMessage("");
      const emptyFields = [];
      if (!name || name.trim() === "") {
        emptyFields.push("Name");
      }
      if (!email || email.trim() === "") {
        emptyFields.push("Email");
      }
      if (!password || password.trim() === "") {
        emptyFields.push("Password");
      }

      if (emptyFields.length > 0) {
        setMessage(`Please fill in the fields!`);
        return;
      }

      // Password length check
      if (password.length < 4) {
        setMessage("Password must be at least 4 characters long!");
        return;
      }
      setLoading(true);
      const result = await signupMutation.mutateAsync({
        name,
        email,
        password,
      });
      if (result) {
        setLoading(false);
        console.log(result, "result");
        const { message, userExists } = result;

        if (result.message === "User already Exists") {
          setMessage(message);
        } else {
          toast.success(message);
          handleNextSlide();
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast("There seems to be an error 😌, try again!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  }

  console.log(message);
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <div className="relative h-screen w-full overflow-hidden">
        <div
          className={`absolute inset-0 h-full w-full transition-transform duration-500 ${
            currentSlide === 0 ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-5 ml-[35%] mr-[35%] mt-10 rounded-xl border border-gray-300 pb-5 pl-12 pr-12 pt-5 lg:ml-[35%] lg:mr-[35%]">
            <form onSubmit={handleFormSubmit}>
              <h2 className="text-center text-3xl font-semibold">
                Create your account
              </h2>

              <div className="mt-5">
                <label>Name</label>
                <br />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="text"
                  placeholder="Enter"
                />

                <br />
                <label>Email</label>
                <br />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="email"
                  placeholder="Enter"
                />
                <br />
                <label>Password</label>
                <br />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="password"
                  placeholder="Enter"
                />
                <MessageComponent message={message} />
                <button
                  type="submit"
                  // onClick={handleNextSlide}
                  disabled={loading}
                  className="mt-5 w-full rounded-md bg-black p-3 text-center font-medium text-white disabled:bg-gray-800"
                >
                  {loading && (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="me-3 inline h-4 w-4 animate-spin text-gray-200 dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                  )}
                  {loading ? "Submitting..." : `CREATE ACCOUNT`}
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
        </div>

        <div
          className={`absolute inset-0 h-full w-full transition-transform duration-500 ${
            currentSlide === 1 ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="custom-div">
            <form onSubmit={handleOtpForm}>
              <h2 className="text-center text-3xl font-semibold">
                {" "}
                Verify you email{" "}
              </h2>
              <p className=" mt-3 text-center ">
                {" "}
                Enter the 8 digit code you have received on{" "}
              </p>
              <p className="mt-3 text-center font-semibold">
                {formattedEmail(email)}
              </p>
              <div className="mt-5">
                <label>Code</label>
                <br />
                <div
                  // className={` mb-5 mt-5 flex  flex-wrap items-center justify-center gap-3`}

                  className={`${currentSlide == 1 ? "block" : "hidden"} mb-5 mt-5 flex  flex-wrap items-center justify-center gap-3`}
                >
                  {otp.map((_, index) => {
                    return (
                      <div key={index}>
                        <input
                          ref={index === activeOTPIndex ? inputRef : null}
                          type="number"
                          onChange={hangleOnChange}
                          onKeyDown={(e) => handleOnKeyDown(e, index)}
                          value={otp[index]}
                          className="spin-button-none h-12 w-12 rounded border-2 border-gray-400 bg-transparent text-center text-xl font-semibold text-gray-400 outline-none transition focus:border-gray-700 focus:text-gray-700"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* <button
                  onClick={handlePrevSlide}
                  className="mb-5 mt-5 w-full rounded-md bg-black p-3 text-center font-medium text-white"
                >
                  VERIFY
                </button> */}
                <MessageComponent message={message} />
                <button
                  type="submit"
                  // onClick={handleNextSlide}
                  disabled={loading}
                  className="mt-5 w-full rounded-md bg-black p-3 text-center font-medium text-white disabled:bg-gray-800"
                >
                  {loading && (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="me-3 inline h-4 w-4 animate-spin text-gray-200 dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                  )}
                  {loading ? "Verifying..." : `VERIFY`}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div
          className={`absolute inset-0 h-full w-full transition-transform duration-500 ${
            currentSlide === 2 ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-5 ml-[35%] mr-[35%] mt-10 grid justify-items-center rounded-xl border border-gray-300 pb-5 pl-12 pr-12 pt-5">
            <Image src={verifyGif} alt="verifyimage" className="text-center" />
            <h2 className="text-center text-xl font-bold">
              Your Account is Verified!
            </h2>
            <p className=" text-center font-semibold">
              You are being redirected....{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
