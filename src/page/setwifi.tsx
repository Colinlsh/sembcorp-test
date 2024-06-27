import React, { useEffect } from "react";
import {
  setWiFiForm,
  postWiFiFormAsync,
  getScanWiFiAsync,
  setWiFiFormIsTimeoutSuccess,
} from "../app/slice/uiSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const SetWiFi = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { wifiModel } = useAppSelector((state) => state.ui);
  const { ssid_list, wifiForm } = wifiModel;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      setWiFiForm({
        ...wifiForm,
        [name]: value,
      })
    );
  };

  const handleSelectInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(
      setWiFiForm({
        ...wifiForm,
        [name]: value,
      })
    );
  };

  const handleSubmit = () => {
    dispatch(postWiFiFormAsync(wifiForm));
  };

  useEffect(() => {
    if (wifiForm.isTimeoutSuccess) {
      dispatch(setWiFiFormIsTimeoutSuccess(false));
      navigate("/");
    }
  }, [dispatch, navigate, wifiForm.isTimeoutSuccess]);

  useEffect(() => {
    dispatch(getScanWiFiAsync({}));
  }, [dispatch]);

  return (
    <div className="flex justify-center flex-col items-center gap-y-5">
      <h1 className="font-bold">Set Wifi Form</h1>
      <form className="w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-username"
            >
              SSID
            </label>
          </div>
          <div className="md:w-2/3">
            {ssid_list === undefined ? (
              <input
                disabled={wifiForm.isLoading}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-username"
                type="text"
                placeholder="SSID"
                name="ssid"
                onChange={handleInputChange}
              />
            ) : (
              <select
                disabled={wifiForm.isLoading}
                className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="ssid-select"
                name="ssid"
                onChange={handleSelectInput}
                value={wifiForm.ssid}
              >
                {ssid_list.map((ssid, index) => (
                  <option key={index} value={ssid.SSID}>
                    {ssid.SSID} {ssid.Signal}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              disabled={wifiForm.isLoading}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-password"
              type="password"
              name="password"
              placeholder="******************"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              disabled={wifiForm.isLoading}
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleSubmit}
            >
              {wifiForm.isLoading ? <Spinner color="fill-white" /> : "Set Wifi"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SetWiFi;
