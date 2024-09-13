import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchQuestionByIdQuery, useFetchAnswersByQuestionIdQuery } from '../utils/api';
import Question from '../components/questions/question-item';
import Answers from '../components/answers/answers';
import LoadingSkeleton from '../components/ui/loading-skeleton';

const QuestionDetailPage: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();

  const {
    data: questionDetail,
    isLoading: isQuestionLoading,
    isError: isQuestionError,
  } = useFetchQuestionByIdQuery(questionId ?? '');

  const {
    data: answers,
    isLoading: isAnswersLoading,
    isError: isAnswersError,
  } = useFetchAnswersByQuestionIdQuery(questionId ?? '');

  if (isQuestionLoading || isAnswersLoading) {
    return (
      <div className="container mx-auto p-5">
        <div className="max-w-6xl mx-auto">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (isQuestionError || isAnswersError || !questionDetail) {
    return <p className="text-center text-red-500">Error fetching question details.</p>;
  }

  return (
    <div className="container mx-auto p-5">
      <div className="max-w-6xl mx-auto">
        <div className="mt-5 mb-5">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded"
          >
            <span className="mr-2">←</span>
            Back to Search Results
          </button>
        </div>

        <Question questionDetail={questionDetail} />

        <Answers answers={answers || []} />
      </div>
    </div>
  );
};

export default QuestionDetailPage;
