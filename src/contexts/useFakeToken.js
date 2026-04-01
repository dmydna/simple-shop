import { useState } from "react";

export const useFakeToken= () => {

  const [token, setToken] = useState('');

  const generateToken = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let t = '';
    for (let i = 0; i < 32; i++) {
      t += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setToken(`fake_${t}`);
  };

  return({
    token, setToken, generateToken
  })


}