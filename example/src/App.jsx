import React from 'react';
const App = () => {
  console.log(1);
  const change = () => {
    try {
      console.log('true');
      throw new Error('sdasd');
    } catch (error) {
      console.log(error);
    }
  };
  return <div onClick={change}>this is a react app</div>;
};
export default App;
