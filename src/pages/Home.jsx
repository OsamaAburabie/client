import React, { useEffect, useRef, useState } from 'react';

export default function Home() {
  const myRef = useRef(null);
  let newInputIndex = 0;

  const inputFeilds = Array(4).fill(null);
  const [otp, setOtp] = React.useState({
    0: '',
    1: '',
    2: '',
    3: '',
  });
  const [nextInputIndex, setNextInputIndex] = useState(0);

  const handleChange = (e, index) => {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(0, 1);
    }
    const newOtp = { ...otp };
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    if (e.target.value.length === 0) {
      newInputIndex = index === 0 ? 0 : index - 1;
    } else {
      const lastInputIndex = inputFeilds.length - 1;
      newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
    }
    setNextInputIndex(newInputIndex);
  };

  useEffect(() => {
    myRef.current.focus();
  }, [nextInputIndex]);

  //function to convert otp object to number
  const otpToString = () => {
    let otpString = '';
    for (let i = 0; i < inputFeilds.length; i++) {
      otpString += otp[i];
    }
    return otpString;
  };

  // console.log(otpToString());

  const submitForm = (e) => {
    e.preventDefault();
    if (otpToString().length < 4) {
      alert('Please enter valid OTP');
    }
  };

  return (
    <div className='bg-white h-screen w-screen flex flex-col justify-center items-center'>
      <span className=' text-4xl font-bold'>Enter Your Verification Code!</span>
      <div className='flex  m-4'>
        <form onSubmit={submitForm}>
          {inputFeilds.map((input, index) => (
            <input
              placeholder='-'
              value={otp[index]}
              key={index}
              type='number'
              onChange={(e) => handleChange(e, index)}
              className='w-24 h-24 rounded-xl text-4xl  font-bold text-center m-2 '
              ref={nextInputIndex === index ? myRef : null}
            />
          ))}
          <button className='hidden'>submit</button>
        </form>
      </div>
    </div>
  );
}
