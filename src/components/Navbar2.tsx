import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import Logo from "../assets/curiousoft_white.svg";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";
import { signOutAsync } from "../app/slice/authSlice";

const Navbar: React.FC = () => {
  const state = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Disclosure as="nav" className="bg-linkedinShadeDark">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-cente">
                <div
                  className="flex-shrink-0 cursor-pointer items-center justify-center flex"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  {/* <img
                    className="h-4 w-fit bg-transparent"
                    src={Logo}
                    alt="Your Company"
                  /> */}
                  {/* <svg className="h-4 w-fit fill-current" viewBox="0 0 60 60">
                    <path d={Logo} />
                  </svg> */}
                  <div
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <img
                      src={Logo}
                      alt="curiousoft"
                      className="h-4 w-fit bg-transparent"
                    />
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    <button
                      className="rounded-md px-3 py-2 text-sm font-medium text-white bg-transparent border-0"
                      onClick={() => {
                        navigate("/dashboard");
                      }}
                    >
                      Dashboard
                    </button>
                    {state.isAuthenticated ? (
                      <>
                        <button
                          className="rounded-md bg-transparent border-0 px-3 py-2 text-sm font-medium text-white"
                          onClick={() => {
                            navigate("/invoices");
                          }}
                        >
                          Invoices
                        </button>
                        <button
                          className="rounded-md bg-transparent border-0 px-3 py-2 text-sm font-medium text-white"
                          onClick={() => {
                            navigate("/clients");
                          }}
                        >
                          Clients
                        </button>
                        <button
                          className="rounded-md bg-transparent border-0 px-3 py-2 text-sm font-medium text-white"
                          onClick={() => {
                            navigate("/calendar");
                          }}
                        >
                          Calendar
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 border-0">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {state.isAuthenticated ? (
                          <img
                            className="h-8 w-8 rounded-full"
                            src={`${state.user?.photoURL}`}
                            alt="/"
                          />
                        ) : (
                          <IoLogInOutline className="h-full w-8 rounded-full bg-transparent border-0" />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {state.isAuthenticated ? (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? "bg-gray-100" : ""}
                                block px-4 py-2 text-sm text-gray-700 border-0 w-full text-left bg-transparent
                              `}
                                  onClick={() => {
                                    navigate("/profile");
                                  }}
                                >
                                  Your Profile
                                </button>
                              )}
                            </Menu.Item>
                            {/* <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? "bg-gray-100" : ""}
                                block px-4 py-2 text-sm text-gray-700 border-0 w-full text-left bg-transparent
                              `}
                                  onClick={() => {
                                    navigate("/rainbowHistory");
                                  }}
                                >
                                  Rainbow History
                                </button>
                              )}
                            </Menu.Item> */}
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? "bg-gray-100" : ""}
                                block px-4 py-2 text-sm text-gray-700 border-0 w-full text-left bg-transparent
                              `}
                                  onClick={() => {
                                    dispatch(signOutAsync());
                                  }}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </>
                        ) : (
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${active ? "bg-gray-100" : ""}
                                block px-4 py-2 text-sm text-gray-700 border-0 w-full text-left bg-transparent
                              `}
                                onClick={() => {
                                  navigate("/signin");
                                }}
                              >
                                Sign in
                              </button>
                            )}
                          </Menu.Item>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset  border-0">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FaXmark
                      className="block h-6 w-6 border-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <FaBars className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Dashboard
              </Disclosure.Button>
              {state.isAuthenticated ? (
                <>
                  <Disclosure.Button
                    as="a"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={() => {
                      navigate("/invoices");
                    }}
                  >
                    Invoices
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={() => {
                      navigate("/clients");
                    }}
                  >
                    Clients
                  </Disclosure.Button>
                </>
              ) : null}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div
                className={`${
                  state.isAuthenticated ? "lex items-center px-5" : "hidden"
                }`}
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`${state.user?.photoURL}`}
                    alt="/"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {state.user?.displayName}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {state.user?.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {state.isAuthenticated ? (
                  <>
                    <Disclosure.Button
                      as="a"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      Your Profile
                    </Disclosure.Button>
                    {/* <Disclosure.Button
                      as="a"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      onClick={() => {
                        navigate("/rainbowHistory");
                      }}
                    >
                      Rainbow History
                    </Disclosure.Button> */}
                    <Disclosure.Button
                      as="a"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      onClick={() => {
                        dispatch(signOutAsync());
                        navigate("/");
                      }}
                    >
                      Sign out
                    </Disclosure.Button>
                  </>
                ) : (
                  <Disclosure.Button
                    as="a"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    Sign in
                  </Disclosure.Button>
                )}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
