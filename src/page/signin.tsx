// src/components/SignIn.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInAsync } from "../app/slice/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import Spinner from "../components/Spinner";

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signInWithUsername = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signInAsync({ username: email, password: password }));
  };

  // Navigate to '/' if authenticated
  useEffect(() => {
    if (state.isAuthenticated) {
      navigate("/");
    }
  }, [state.isAuthenticated, navigate]);

  return (
    <div
      id="signin"
      className="w-full h-full flex flex-col items-center justify-center space-y-5"
    >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="md:mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-4"
            action="#"
            method="POST"
            onSubmit={signInWithUsername}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User name
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={state.isLoading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={state.isLoading}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center bg-linkedinShade px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-linkedinShadeDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={state.isLoading}
              >
                {state.isLoading ? <Spinner color="fill-white" /> : "Log in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
