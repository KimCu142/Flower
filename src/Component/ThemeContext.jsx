import React, { useState, useEffect } from 'react';

const themes = {
  dark: {
    backgroundImage: 'url(/assets/tinkerbell.jpg)',  // Đường dẫn ảnh nền
  backgroundColor: '#f0f0f0',  // Màu nền cho chế độ sáng
    color: 'black'
  },
  light: {
    backgroundImage: 'url(/assets/everyone_get_scared.jpg)',  // Đường dẫn ảnh nền
      backgroundColor: '#1e1e1e',  // Màu nền cho chế độ tối
    color: 'white'
  }
};


const initialState = {
  dark: false,
  theme: themes.light,
  toggle: () => {}
};

const ThemeContext = React.createContext(initialState);

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  // Lấy trạng thái từ localStorage khi component được mount
  useEffect(() => {
    const isDark = localStorage.getItem('dark') === 'true';
    setDark(isDark);
  }, []);

  // Hàm toggle giữa dark và light mode
  const toggle = () => {
    setDark(prevDark => {
      const newDark = !prevDark;
      localStorage.setItem('dark', JSON.stringify(newDark));  // Lưu lại trạng thái vào localStorage
      return newDark;
    });
  };

  const theme = dark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ theme, dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
