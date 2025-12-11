import React, { useState, useEffect } from 'react';
import { Question, Option, UserAnswer, Subject } from '../types';
import { Clock, AlertCircle, CheckCircle, XCircle, BrainCircuit } from 'lucide-react';
import { getAIExplanation } from '../services/geminiService';

interface QuizProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (questionId: string, optionId: string, timeSpent: number) => void;
  onNext: () => void;
  onFinish: () => void;
  existingAnswer?: UserAnswer;
  isReviewMode?: boolean;
}

const Quiz: React.FC<QuizProps> = ({ 
  question, 
  questionIndex, 
  totalQuestions, 
  onAnswer, 
  onNext, 
  onFinish,
  existingAnswer,
  isReviewMode = false
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(existingAnswer?.selectedOptionId || null);
  const [timer, setTimer] = useState(0);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    if (!isReviewMode) {
      setSelectedOption(null);
      setTimer(0);
    } else {
      setSelectedOption(existingAnswer?.selectedOptionId || null);
    }
    setAiExplanation(null);
  }, [question.id, isReviewMode, existingAnswer]);

  // Timer logic
  useEffect(() => {
    if (isReviewMode) return;
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [question.id, isReviewMode]);

  const handleOptionClick = (optionId: string) => {
    if (isReviewMode) return;
    setSelectedOption(optionId);
  };

  const handleConfirm = () => {
    if (selectedOption) {
      onAnswer(question.id, selectedOption, timer);
      if (questionIndex < totalQuestions - 1) {
        onNext();
      } else {
        onFinish();
      }
    }
  };

  const handleAskAI = async () => {
    setLoadingAi(true);
    const explanation = await getAIExplanation(question, selectedOption);
    setAiExplanation(explanation);
    setLoadingAi(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getOptionStyle = (optionId: string) => {
    const baseStyle = "p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 flex items-center gap-3";
    
    if (isReviewMode) {
      if (optionId === question.correctOptionId) {
        return `${baseStyle} border-green-500 bg-green-50 text-green-900`;
      }
      if (optionId === selectedOption && optionId !== question.correctOptionId) {
        return `${baseStyle} border-red-500 bg-red-50 text-red-900`;
      }
      return `${baseStyle} border-gray-200 opacity-60`;
    }

    if (selectedOption === optionId) {
      return `${baseStyle} border-blue-600 bg-blue-50 shadow-md`;
    }
    return `${baseStyle} border-gray-200 hover:border-blue-300 hover:bg-gray-50`;
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-100 px-2 py-1 rounded">
            {question.subject}
          </span>
          {question.isAiGenerated && (
             <span className="ml-2 text-xs font-bold tracking-wider text-purple-600 uppercase bg-purple-100 px-2 py-1 rounded">
             Gerada por IA
           </span>
          )}
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-2">
            Questão {questionIndex + 1} <span className="text-gray-400 text-lg">/ {totalQuestions}</span>
          </h2>
        </div>
        {!isReviewMode && (
          <div className="flex items-center gap-2 text-gray-600 bg-white px-3 py-1.5 rounded-full shadow-sm border">
            <Clock size={18} />
            <span className="font-mono font-medium">{formatTime(timer)}</span>
          </div>
        )}
      </div>

      {/* Question Text */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <p className="text-gray-800 text-lg leading-relaxed">{question.text}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {question.options.map((option) => (
          <div 
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            className={getOptionStyle(option.id)}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0
              ${isReviewMode && option.id === question.correctOptionId ? 'bg-green-500 text-white' : 
                isReviewMode && option.id === selectedOption && option.id !== question.correctOptionId ? 'bg-red-500 text-white' :
                selectedOption === option.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
            `}>
              {option.id.toUpperCase()}
            </div>
            <span className="flex-1 font-medium">{option.text}</span>
            {isReviewMode && option.id === question.correctOptionId && <CheckCircle className="text-green-600" size={20} />}
            {isReviewMode && option.id === selectedOption && option.id !== question.correctOptionId && <XCircle className="text-red-500" size={20} />}
          </div>
        ))}
      </div>

      {/* Footer / Actions */}
      <div className="flex flex-col gap-4">
        {!isReviewMode ? (
          <button
            onClick={handleConfirm}
            disabled={!selectedOption}
            className={`
              w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg
              ${selectedOption 
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 hover:-translate-y-0.5' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
          >
            {questionIndex === totalQuestions - 1 ? 'Finalizar Simulado' : 'Confirmar e Próxima'}
          </button>
        ) : (
          <div className="space-y-4">
            {/* Standard Explanation */}
            <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
              <h3 className="font-bold text-blue-900 flex items-center gap-2 mb-2">
                <AlertCircle size={18} />
                Comentário do Professor
              </h3>
              <p className="text-blue-800">{question.explanation}</p>
            </div>

            {/* AI Tutor */}
            <div className="bg-purple-50 border border-purple-100 p-5 rounded-xl">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-purple-900 flex items-center gap-2">
                  <BrainCircuit size={18} />
                  Tutor IA
                </h3>
                {!aiExplanation && (
                  <button 
                    onClick={handleAskAI}
                    disabled={loadingAi}
                    className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700 disabled:opacity-50"
                  >
                    {loadingAi ? 'Pensando...' : 'Explicar detalhadamente'}
                  </button>
                )}
              </div>
              
              {aiExplanation ? (
                 <div className="prose prose-sm prose-purple max-w-none text-gray-700 whitespace-pre-wrap">
                   {aiExplanation}
                 </div>
              ) : (
                <p className="text-purple-800 text-sm opacity-70">
                  Precisa de uma explicação mais profunda? Peça para o Tutor IA analisar esta questão para você.
                </p>
              )}
            </div>

            <div className="flex justify-between pt-4">
               <button 
                  onClick={() => questionIndex > 0 ? onAnswer(question.id, existingAnswer?.selectedOptionId || '', 0) : null} // Hacky way to nav back in review needs parent support usually
                  className="px-6 py-2 rounded-lg border border-gray-300 font-medium hover:bg-gray-50"
               >
                 Anterior
               </button>
               <button 
                  onClick={onNext}
                  className="px-6 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800"
               >
                 {questionIndex === totalQuestions - 1 ? 'Voltar ao Menu' : 'Próxima Questão'}
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;