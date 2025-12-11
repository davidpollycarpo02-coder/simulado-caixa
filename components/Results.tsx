import React from 'react';
import { UserAnswer, Question } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Award, RefreshCcw, BookOpen, CheckCircle, XCircle } from 'lucide-react';

interface ResultsProps {
  answers: Record<string, UserAnswer>;
  questions: Question[];
  onRetry: () => void;
  onReview: () => void;
}

const COLORS = ['#10b981', '#ef4444', '#f59e0b']; // Green, Red, Amber

const Results: React.FC<ResultsProps> = ({ answers, questions, onRetry, onReview }) => {
  // Calculate Stats
  const totalQuestions = questions.length;
  const correctCount = Object.values(answers).filter((a: UserAnswer) => a.isCorrect).length;
  const incorrectCount = totalQuestions - correctCount;
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  
  // Lógica de Aprovação (Simplificada: 50% de acerto)
  const isPassed = percentage >= 50;

  // Stats by Subject
  const statsBySubject: Record<string, { total: number; correct: number }> = {};
  
  questions.forEach(q => {
    if (!statsBySubject[q.subject]) {
      statsBySubject[q.subject] = { total: 0, correct: 0 };
    }
    statsBySubject[q.subject].total++;
    if (answers[q.id]?.isCorrect) {
      statsBySubject[q.subject].correct++;
    }
  });

  const chartData = Object.keys(statsBySubject).map(subject => ({
    name: subject,
    Acertos: statsBySubject[subject].correct,
    Erros: statsBySubject[subject].total - statsBySubject[subject].correct,
  }));

  const pieData = [
    { name: 'Corretas', value: correctCount },
    { name: 'Incorretas', value: incorrectCount },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-fade-in-up">
      
      {/* Banner de Status (Aprovado/Reprovado) */}
      <div className={`
        rounded-2xl p-6 text-center text-white shadow-lg transform transition-all
        ${isPassed ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-red-600 to-pink-700'}
      `}>
        <div className="flex items-center justify-center gap-3 mb-2">
          {isPassed ? <CheckCircle size={40} /> : <XCircle size={40} />}
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest">
            {isPassed ? 'APROVADO' : 'REPROVADO'}
          </h2>
        </div>
        <p className="text-lg opacity-90">
          {isPassed 
            ? 'Parabéns! Você atingiu a pontuação necessária.' 
            : 'Não desanime! Revise os comentários dos professores e tente novamente.'}
        </p>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Resumo de Desempenho</h2>
      </div>

      {/* Main Score Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left: Score */}
          <div className={`
            flex-1 p-10 flex flex-col items-center justify-center text-white
            ${isPassed ? 'bg-emerald-500' : 'bg-red-500'}
          `}>
            <span className="text-xl opacity-90 font-medium mb-2">Nota Final</span>
            <span className="text-8xl font-bold tracking-tighter">{percentage}%</span>
            <span className="mt-2 opacity-90">{correctCount} de {totalQuestions} questões</span>
          </div>

          {/* Right: Pie Chart */}
          <div className="flex-1 p-6 h-64 md:h-auto min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Desempenho por Matéria</h3>
        <div className="h-80 w-full">
           <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 12}} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Acertos" stackId="a" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
              <Bar dataKey="Erros" stackId="a" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 pb-10">
        <button
          onClick={onReview}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-bold hover:border-blue-500 hover:text-blue-600 transition-colors"
        >
          <BookOpen size={20} />
          Ver Comentários
        </button>
        <button
          onClick={onRetry}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all hover:-translate-y-1"
        >
          <RefreshCcw size={20} />
          Voltar ao Menu
        </button>
      </div>
    </div>
  );
};

export default Results;