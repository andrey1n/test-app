import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './_app';
import './index.css';
import QuestionDetailPage from './pages/question.page';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/test-app">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/questions/:questionId" element={<QuestionDetailPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
