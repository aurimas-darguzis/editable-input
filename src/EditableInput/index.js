import React, { useState, useRef, useEffect, useCallback } from "react";
import checkIcon from "../assets/check.svg";
import loadingIcon from "../assets/loading.svg";
import errorIcon from "../assets/error.svg";
import "./editableInput.css";

export default function EditableInput() {
  const editableEl = useRef(null);
  const [data, setData] = useState("Hello World");
  const [previousData, setPreviousData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [editable, setEditable] = useState(false);

  // make error message disappear
  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 2000);
    }
  }, [error]);

  // make success message disappear
  useEffect(() => {
    if (success) {
      setTimeout(() => setSuccess(null), 2000);
    }
  }, [success]);

  const handleSubmit = useCallback(() => {
    if (!data || !editable) return;
    if (previousData === data) {
      setEditable(false);
      return;
    }
    setLoading(true);
    new Promise(saveData)
      .then(() => {
        setSuccess(true);
        setData(data);
        setError(null);
      })
      .catch((reason) => {
        setData(previousData);
        setError(reason);
      })
      .finally(() => {
        setEditable(false);
        setLoading(false);
      });
  }, [data, editable, previousData]);

  const handleContainerClick = useCallback(
    (e) => {
      if (editableEl.current.contains(e.target)) {
        // click happened inside input element
        return;
      } else {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleContainerClick);
    return () => {
      document.removeEventListener("mousedown", handleContainerClick);
    };
  }, [data, editable, handleContainerClick]);

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && editable) {
      handleSubmit();
    }
  };

  const handleOnInputClick = () => {
    setPreviousData(data);
    setError(false);
    setEditable(true);
  };

  const handleInputChange = (e) => {
    setData(e.target.value);
  };

  return (
    <div ref={editableEl} className='editable-input-container'>
      <div onClick={handleOnInputClick}>
        {editable ? (
          <input
            type='text'
            value={data}
            onChange={handleInputChange}
            onKeyDown={handleEnterPress}
          />
        ) : (
          <span>{data}</span>
        )}
      </div>
      <div className='indicator-icon'>
        {loading ? (
          <img
            src={loadingIcon}
            alt='loading spinner'
            className='loading-logo'
          />
        ) : (
          <></>
        )}
        {success ? (
          <img src={checkIcon} alt='check icon' className='success-logo' />
        ) : (
          <></>
        )}
        {error ? (
          <>
            <img src={errorIcon} alt='error icon' />
            <div className='error-message'>{error}</div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

const success = true;
function saveData(resolve, reject) {
  try {
    setTimeout(() => {
      try {
        if (!success) {
          throw new Error();
        }
      } catch (e) {
        reject("Oops! Something has gone terribly wrong");
      }
      resolve("Success");
      return;
    }, 1000);
  } catch (error) {
    reject(error);
  }
  return;
}
