"use client";

import React, { useState } from "react";
import { Header } from "../_components/header";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import MessageComponent from "../_components/MessageComponent";
import { api } from "~/trpc/react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const loginMutation = api.auth.login.useMutation();
  const router = useRouter();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      setMessage("");
      const emptyFields = [];
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
      if (password.length < 4) {
        setMessage("Password must be at least 4 characters long!");
        return;
      }
      setLoading(true);
      const result = await loginMutation.mutateAsync({
        email,
        password,
      });
      if (result) {
        setLoading(false);
        const { message, token, user } = result;
        if (message === "Login successful") {
          toast.success(message);
          if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
          }
          setTimeout(() => {
            router.push("/app");
          }, 800);
        } else {
          setMessage(message);
        }
      }
      console.log(result);
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

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <div className="mb-5 ml-[34%] mr-[34%]  mt-10 rounded-xl  border border-gray-300 pb-5 pl-12  pr-12 pt-5">
        <form onSubmit={handleLoginSubmit}>
          <h2 className=" text-center text-3xl font-semibold">Login</h2>
          <p className="mt-4 text-center text-xl font-medium">
            Welcome back to ECOMMERCE
          </p>
          <p className=" mt-3 text-center ">
            The next gen business marketplace
          </p>

          <div className="mt-5">
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
            <div className="relative">
              <input
                className="mt-2 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-2 pr-3 underline"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {/* <button className="mt-5 w-full rounded-md bg-black p-3 text-center font-medium text-white">
              LOGIN
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
              {loading ? "Singing in..." : `LOGIN`}
            </button>
            <div className="mt-5 h-[2px] w-full  bg-gray-300"></div>
            <p className="mt-5 text-center text-gray-700">
              {" "}
              Don&apos;t have an Account?{" "}
              <span className="text-black">
                {" "}
                <Link href="/register">SIGN UP </Link>{" "}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
