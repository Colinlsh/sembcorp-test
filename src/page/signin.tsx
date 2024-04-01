// src/components/SignIn.tsx
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import {
  sendPasswordResetEmailAsync,
  signInAsync,
  signInWithGoogleAsync,
} from "../app/slice/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    dispatch(signInWithGoogleAsync());
  };

  const signInWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signInAsync({ email: email, password: password }));
  };

  const sendResetEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(sendPasswordResetEmailAsync(email));

    // try {
    //   await sendPasswordResetEmail(auth, email, actionCodeSettings);

    //   dispatch(setModal({ show: true, message: "Email sent successfully" }));
    // } catch (error) {
    //   if (error instanceof FirebaseError) {
    //     // Handle FirebaseError specifically
    //     let error_message = getFirebaseAuthErrorMessage(error); // You can use error.code as well
    //     dispatch(setModal({ show: true, message: error_message }));
    //   } else {
    //     console.error(error);
    //   }
    // }
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
            onSubmit={signInWithEmail}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <button
                    className="font-semibold text-indigo-600 hover:text-indigo-500 bg-transparent border-0"
                    onClick={(e) => sendResetEmail(e)}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center bg-linkedinShade px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-linkedinShadeDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
        <div className="mt-4 space-y-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <label className="text-center flex w-full justify-center text-sm">
            Or continue with
          </label>
          <div className="flex w-full justify-center">
            <button
              type="submit"
              className="flex items-center justify-center w-full rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={signInWithGoogle}
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Continue with Google
            </button>
          </div>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500 space-x-2">
          <span>Not a member?</span>
          <button
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 border-0 bg-transparent"
            onClick={() => {
              // navigate
              navigate("/signup");
            }}
          >
            Create account here!
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
