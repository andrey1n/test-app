import React from 'react';
import QuestionsList from './components/questions-list';
import Tags from './components/tags';
import Navbar from './components/navbar';

const App: React.FC = () => {
  return (
    <div className="text-center">
      <Navbar />
      <Tags />
      <QuestionsList />
    </div>
  );
};

export default App;
