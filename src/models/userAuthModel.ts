import { useState,useCallback } from "react";

export default () => {
  const [phone,setPhone] = useState('');
  const [email,setEmail] = useState('');
  const [authority,setAuthority] = useState('');

  const changePhone = useCallback((val: string = '初始电话') => {
    setPhone((pre) => val)
  }, [])
  const changeEmail = useCallback((val: string = '初始电话') => {
    setEmail((pre) => val)
  }, [])
  const changeAuthority = useCallback((val: string = '初始电话') => {
    setAuthority((pre) => val)
  }, [])
  return {
    phone,
    email,
    authority,
    changePhone,
    changeEmail,
    changeAuthority
  }
}