import React, { useState } from 'react';
import { ExamState, Subject, Question, UserAnswer } from './types';
import { STATIC_QUESTIONS } from './data/questions';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { generateQuestionBySubject } from './services/geminiService';
import { Building2, Sparkles, Book, Layers, GraduationCap, ArrowRight, BrainCircuit, Loader2, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [examState, setExamState] = useState<ExamState>({
    status: 'idle',
    mode: 'notebook',
    currentQuestionIndex: 0,
    answers: {},
    startTime: null,
    questions: []
  });

  const [generatingSubject, setGeneratingSubject] = useState<Subject | null>(null);

  // Fisher-Yates shuffle
  const shuffleQuestions = (questions: Question[]) => {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Inicia um caderno específico (1, 2, 3 ou 4)
  const startNotebook = (notebookId: '1' | '2' | '3' | '4') => {
    const notebookQuestions = STATIC_QUESTIONS.filter(q => q.notebookId === notebookId);
    
    // Se não tiver questões suficientes no mock, usamos todas. Em prod, avisaríamos.
    const questionsToUse = shuffleQuestions(notebookQuestions);

    setExamState({
      status: 'running',
      mode: 'notebook',
      notebookTitle: `Caderno de Questões ${notebookId}`,
      currentQuestionIndex: 0,
      answers: {},
      startTime: Date.now(),
      questions: questionsToUse
    });
  };

  // Inicia a Prova Oficial (60 questões aleatórias de todos os cadernos)
  const startOfficialExam = () => {
    // Pega todas, embaralha e pega as primeiras 60
    const allQuestions = shuffleQuestions([...STATIC_QUESTIONS]);
    const officialSet = allQuestions.slice(0, 60);

    setExamState({
      status: 'running',
      mode: 'official',
      notebookTitle: 'Prova Oficial Caixa 2026',
      currentQuestionIndex: 0,
      answers: {},
      startTime: Date.now(),
      questions: officialSet
    });
  };

  const handleAnswer = (questionId: string, optionId: string, timeSpent: number) => {
    const question = examState.questions.find(q => q.id === questionId);
    if (!question) return;

    const answer: UserAnswer = {
      questionId,
      selectedOptionId: optionId,
      isCorrect: optionId === question.correctOptionId,
      timeSpentSeconds: timeSpent
    };

    setExamState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer }
    }));
  };

  const handleNext = () => {
    setExamState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1
    }));
  };

  const handleFinish = () => {
    setExamState(prev => ({
      ...prev,
      status: 'results'
    }));
  };

  // Lógica do Gerador IA (Mantida como extra)
  const handleGenerateQuestion = async (subject: Subject) => {
    setGeneratingSubject(subject);
    const newQuestion = await generateQuestionBySubject(subject);
    
    if (newQuestion) {
      // Adiciona temporariamente ao estado atual para o usuário ver na "Área de Testes"
      // Se não estiver rodando exame, não faz nada visualmente útil exceto log, 
      // idealmente abriria um modal, mas mantendo simples:
      alert(`Questão gerada!\n\n${newQuestion.text}\n\n(Adicionada ao console para dev)`);
      console.log(newQuestion);
    } 
    setGeneratingSubject(null);
  };

  const renderContent = () => {
    switch (examState.status) {
      case 'idle':
        return (
          <div className="max-w-6xl mx-auto p-6 animate-fade-in pb-20">
            <header className="text-center mb-12 pt-8">
              <div className="bg-gradient-to-tr from-blue-700 to-blue-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-200">
                <Building2 className="text-white" size={40} />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Simuladão Caixa <span className="text-blue-600">2026</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
                Plataforma completa de estudos baseada na metodologia Cesgranrio e FCC.
              </p>
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-2 font-semibold text-blue-800 bg-blue-100 px-4 py-2 rounded-full text-sm border border-blue-200 shadow-sm">
                  <CheckCircle2 size={18} className="text-blue-600" /> 
                  Banco de Questões: <strong>{STATIC_QUESTIONS.length} itens disponíveis</strong>
                </span>
              </div>
            </header>

            {/* Destaque: Prova Oficial */}
            <div className="mb-12">
               <div 
                  onClick={startOfficialExam}
                  className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl p-8 md:p-10 text-white shadow-2xl cursor-pointer hover:scale-[1.01] transition-transform relative overflow-hidden group"
               >
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
                 
                 <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                   <div>
                     <div className="flex items-center gap-2 text-yellow-400 font-bold mb-2 uppercase tracking-wide text-sm">
                       <Sparkles size={16} />
                       Modo Realista
                     </div>
                     <h2 className="text-3xl md:text-4xl font-bold mb-4">Simulado Oficial Completo</h2>
                     <p className="text-gray-300 max-w-lg text-lg">
                       Simulação exata do dia da prova. <strong>60 questões</strong> sorteadas aleatoriamente do nosso banco de dados, com cronômetro oficial e cálculo de nota final.
                     </p>
                   </div>
                   <button className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg flex items-center gap-2 whitespace-nowrap">
                     Iniciar Prova
                     <ArrowRight size={20} />
                   </button>
                 </div>
               </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Book size={24} className="text-blue-600"/>
              Estudar por Cadernos
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { id: '1', title: 'Caderno 1', sub: 'Foco Bancário', color: 'blue', count: STATIC_QUESTIONS.filter(q => q.notebookId === '1').length },
                { id: '2', title: 'Caderno 2', sub: 'Foco TI & Inovação', color: 'indigo', count: STATIC_QUESTIONS.filter(q => q.notebookId === '2').length },
                { id: '3', title: 'Caderno 3', sub: 'Foco Matemática', color: 'emerald', count: STATIC_QUESTIONS.filter(q => q.notebookId === '3').length },
                { id: '4', title: 'Caderno 4', sub: 'Geral & Inglês', color: 'orange', count: STATIC_QUESTIONS.filter(q => q.notebookId === '4').length }
              ].map((notebook) => (
                <div 
                  key={notebook.id}
                  onClick={() => startNotebook(notebook.id as any)}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
                >
                  <div className={`w-12 h-12 bg-${notebook.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Layers className={`text-${notebook.color}-600`} size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{notebook.title}</h3>
                  <p className="text-sm font-medium text-gray-500 mb-4">{notebook.sub}</p>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full bg-${notebook.color}-500 w-3/4`}></div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-xs text-gray-400">Base Cesgranrio</p>
                    <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-600">{notebook.count} Questões</span>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Section (Mantida menor) */}
            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                 <div className="bg-purple-100 p-3 rounded-full">
                    <BrainCircuit className="text-purple-600" size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-purple-900">Gerador de Questões IA (Beta)</h4>
                   <p className="text-purple-700 text-sm">Crie questões inéditas para complementar seu estudo.</p>
                 </div>
              </div>
              <div className="flex gap-2">
                 {Object.values(Subject).slice(0, 2).map(subject => (
                     <button 
                      key={subject}
                      onClick={() => handleGenerateQuestion(subject)}
                      disabled={generatingSubject !== null}
                      className="text-xs bg-white text-purple-700 border border-purple-200 px-3 py-2 rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-2"
                     >
                       {generatingSubject === subject ? <Loader2 size={12} className="animate-spin"/> : '+'} {subject}
                     </button>
                  ))}
              </div>
            </div>

          </div>
        );

      case 'running':
        return (
          <Quiz 
            question={examState.questions[examState.currentQuestionIndex]}
            questionIndex={examState.currentQuestionIndex}
            totalQuestions={examState.questions.length}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onFinish={handleFinish}
          />
        );

      case 'results':
        return (
          <Results 
            answers={examState.answers}
            questions={examState.questions}
            onRetry={() => setExamState({
              status: 'idle',
              mode: 'notebook',
              currentQuestionIndex: 0,
              answers: {},
              startTime: null,
              questions: []
            })}
            onReview={() => setExamState(prev => ({
               ...prev,
               status: 'review',
               currentQuestionIndex: 0
            }))}
          />
        );
      
      case 'review':
        return (
          <Quiz 
            question={examState.questions[examState.currentQuestionIndex]}
            questionIndex={examState.currentQuestionIndex}
            totalQuestions={examState.questions.length}
            onAnswer={() => {}} // No-op in review
            onNext={() => {
               if (examState.currentQuestionIndex < examState.questions.length - 1) {
                  setExamState(prev => ({...prev, currentQuestionIndex: prev.currentQuestionIndex + 1}));
               } else {
                  setExamState(prev => ({...prev, status: 'results'}));
               }
            }}
            onFinish={() => setExamState(prev => ({...prev, status: 'results'}))}
            existingAnswer={examState.answers[examState.questions[examState.currentQuestionIndex].id]}
            isReviewMode={true}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 flex flex-col">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
           <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-900 cursor-pointer" onClick={() => setExamState(prev => ({...prev, status: 'idle'}))}>
              <Building2 className="text-blue-600" />
              <span>Caixa<span className="text-blue-600">Simuladão</span></span>
           </div>
           {examState.status !== 'idle' && (
             <div className="flex items-center gap-3">
               <span className="hidden md:inline text-sm font-medium text-gray-500">
                 {examState.notebookTitle || 'Simulado'}
               </span>
               <button 
                onClick={() => setExamState(prev => ({...prev, status: 'idle'}))}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-gray-600"
               >
                 Sair
               </button>
             </div>
           )}
        </div>
      </nav>
      <main className="pb-10 flex-grow">
        {renderContent()}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500 mt-auto">
        <p>© 2024-2026 Simulado Caixa Econômica Federal. Baseado em provas anteriores.</p>
        <div className="flex justify-center items-center gap-2 mt-2 text-xs">
           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
           Sistema Online • v1.0.3 • Ambiente Seguro
        </div>
      </footer>
    </div>
  );
};

export default App;