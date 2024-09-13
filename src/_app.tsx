import React from 'react';
import QuestionsList from './components/questions/questions-list';
import Tags from './components/tags/tags';
import Navbar from './components/ui/navbar';

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
