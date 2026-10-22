import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  RotateCcw,
  Trash2,
  X,
  Check,
  ChevronRight,
  Home,
  Timer,
  AlertCircle,
  User,
  Award
} from 'lucide-react';
import { INITIAL_QUESTIONS } from './data/questions';

const QUESTION_TIME = 30; // segundos por pergunta
const QUESTIONS_PER_MATCH = 10; // 10 perguntas sorteadas por partida (1/10 a 10/10)

const SCENES = {
  welcome: '/assets/scene_welcome.jpg',
  howto: '/assets/scene_howto.jpg',
  question: '/assets/scene_question.jpg',
  correct: '/assets/scene_correct.jpg',
  wrong: '/assets/scene_wrong.jpg',
  result: '/assets/scene_result.jpg'
};

// Embaralhamento Fisher-Yates para sortear 10 questões variadas do banco
function getRandomQuestions(pool, count = QUESTIONS_PER_MATCH) {
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

// Logo oficial "AstroLearn" usando a imagem enviada pela usuária
function AstroLearnBrandLogo() {
  return (
    <div className="astro-brand-logo">
      <div className="astro-logo-img-wrap">
        <img
          src="/assets/logo_astrolearn.jpg"
          alt="Logo AstroLearn"
          className="astro-official-logo-img"
        />
      </div>
      <span className="astro-logo-text">
        <strong>Astro</strong>Learn
      </span>
    </div>
  );
}

// Ícone de Planeta Anelado 3D no topo do card de pergunta
function QuestionPlanetSVG() {
  return (
    <svg width="56" height="44" viewBox="0 0 68 52" fill="none" className="question-planet-svg">
      <defs>
        <linearGradient id="qPlanetGrad" x1="20" y1="8" x2="48" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60a5fa" />
          <stop offset="0.55" stopColor="#6366f1" />
          <stop offset="1" stopColor="#312e81" />
        </linearGradient>
        <linearGradient id="qRingGrad" x1="6" y1="36" x2="62" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="0.5" stopColor="#818cf8" />
          <stop offset="1" stopColor="#e879f9" />
        </linearGradient>
      </defs>
      <circle cx="34" cy="26" r="15" fill="url(#qPlanetGrad)" />
      <ellipse
        cx="34"
        cy="27"
        rx="26"
        ry="7.5"
        transform="rotate(-20 34 27)"
        stroke="url(#qRingGrad)"
        strokeWidth="3.2"
        fill="none"
      />
    </svg>
  );
}

// Estrela 3D Dourada da Tela de Jogo Concluído
function GoldStarSVG() {
  return (
    <svg width="46" height="46" viewBox="0 0 56 56" fill="none" className="gold-star-svg">
      <defs>
        <linearGradient id="starGoldGrad" x1="12" y1="6" x2="44" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fef08a" />
          <stop offset="0.5" stopColor="#facc15" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <path
        d="M28 5L34.9 19.1L50.5 21.3L39.2 32.3L41.9 47.8L28 40.5L14.1 47.8L16.8 32.3L5.5 21.3L21.1 19.1L28 5Z"
        fill="url(#starGoldGrad)"
        stroke="#fef9c3"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Brilho vetorial de 4 pontas (sem emoji)
function SparkleStarSVG({ size = 18, color = '#67e8f9', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
        fill={color}
      />
    </svg>
  );
}

export default function App() {
  // Telas: 'home' | 'howto' | 'playing' | 'result'
  const [screen, setScreen] = useState('home');
  const [showRankingModal, setShowRankingModal] = useState(false);

  // Dados obrigatórios do aluno (Nome e Turma: '9º A' ou '9º B')
  const [playerName, setPlayerName] = useState('');
  const [playerClass, setPlayerClass] = useState('');
  const [formError, setFormError] = useState('');

  // Ranking separado por turma (9º A e 9º B)
  const [ranking, setRanking] = useState(() => {
    const saved = localStorage.getItem('astrolearn_ranking_turmas_v1');
    return saved ? JSON.parse(saved) : [];
  });

  // Estados da partida
  const [gameQuestions, setGameQuestions] = useState(() => getRandomQuestions(INITIAL_QUESTIONS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // true | false | 'timeout' | null
  const [isAnswered, setIsAnswered] = useState(false);

  const timerRef = useRef(null);

  // Pré-carregar todas as 6 cenas espaciais para transição instantânea
  useEffect(() => {
    Object.values(SCENES).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('astrolearn_ranking_turmas_v1', JSON.stringify(ranking));
  }, [ranking]);

  // Cronômetro por pergunta
  useEffect(() => {
    if (screen !== 'playing' || isAnswered || showRankingModal) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAnswer('timeout');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [screen, isAnswered, currentIndex, showRankingModal]);

  // Validar Nome e Turma na Tela 1 e avançar para a Tela 2 ("COMO FUNCIONA?")
  const handleGoToHowTo = () => {
    const trimmedName = playerName.trim();
    if (!trimmedName && !playerClass) {
      setFormError('Digite seu nome e escolha sua turma (9º A ou 9º B) para começar.');
      return;
    }
    if (!trimmedName) {
      setFormError('Por favor, digite seu nome antes de começar.');
      return;
    }
    if (!playerClass) {
      setFormError('Por favor, selecione sua turma (9º A ou 9º B).');
      return;
    }

    setFormError('');
    setScreen('howto');
  };

  // Iniciar as 10 perguntas após clicar em "ENTENDI! >"
  const startGame = () => {
    setGameQuestions(getRandomQuestions(INITIAL_QUESTIONS, QUESTIONS_PER_MATCH));
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setTimeLeft(QUESTION_TIME);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScreen('playing');
  };

  // Verificar resposta escolhida (Verdadeiro ou Falso)
  const handleAnswer = (answer) => {
    if (isAnswered) return;
    clearInterval(timerRef.current);
    setIsAnswered(true);
    setSelectedAnswer(answer);

    const currentQ = gameQuestions[currentIndex];
    const isCorrect = answer === currentQ.correta;

    if (isCorrect) {
      const newStreak = streak + 1;
      const multiplier = Math.min(4, 1 + Math.floor(newStreak / 2));
      const timeBonus = Math.round(timeLeft * 4);
      const earned = (100 + timeBonus) * multiplier;

      setScore((prev) => prev + earned);
      setStreak(newStreak);
      setMaxStreak((prev) => Math.max(prev, newStreak));
      setCorrectCount((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  // Avançar para a próxima pergunta ou concluir o jogo
  const nextQuestion = () => {
    const isLast = currentIndex + 1 >= gameQuestions.length;

    if (isLast) {
      finishGame();
    } else {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(QUESTION_TIME);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  // Concluir partida e salvar no Ranking da turma (9º A ou 9º B)
  const finishGame = () => {
    const newEntry = {
      id: Date.now(),
      name: playerName.trim(),
      turma: playerClass,
      score,
      correct: correctCount
    };

    const updated = [...ranking, newEntry].sort((a, b) => {
      if (b.correct !== a.correct) return b.correct - a.correct;
      return b.score - a.score;
    });
    setRanking(updated);
    setScreen('result');

    if (correctCount >= Math.ceil(gameQuestions.length * 0.6)) {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const clearClassRanking = (turmaAlvo) => {
    setRanking((prev) => prev.filter((item) => item.turma !== turmaAlvo));
  };

  const ranking9A = ranking.filter((r) => r.turma === '9º A');
  const ranking9B = ranking.filter((r) => r.turma === '9º B');

  const currentQ = gameQuestions[currentIndex];
  const isCurrentCorrect = isAnswered && currentQ && selectedAnswer === currentQ.correta;

  // Seleciona o cenário exato entre os 6 painéis da referência
  let activeBg = SCENES.welcome;
  if (screen === 'howto') {
    activeBg = SCENES.howto;
  } else if (screen === 'playing') {
    if (!isAnswered) {
      activeBg = SCENES.question;
    } else if (isCurrentCorrect) {
      activeBg = SCENES.correct;
    } else {
      activeBg = SCENES.wrong;
    }
  } else if (screen === 'result') {
    activeBg = SCENES.result;
  }

  const progressPercentage =
    gameQuestions.length > 0
      ? Math.max(10, Math.round(((currentIndex + 1) / gameQuestions.length) * 100))
      : 30;

  return (
    <div
      className={`astro-stage ${screen === 'howto' ? 'bg-right-character' : 'bg-left-character'}`}
      style={{
        backgroundImage: `url('${activeBg}')`
      }}
    >
      {/* BARRA SUPERIOR */}
      <header className="astro-topbar">
        <div className="topbar-left">
          {screen !== 'home' && (
            <button
              className="btn-circle-home"
              onClick={() => setScreen('home')}
              title="Voltar ao Início"
            >
              <Home size={22} />
            </button>
          )}
        </div>

        {/* Barra de Progresso Central (Ex: 3/10) idêntica à referência na tela de pergunta */}
        {screen === 'playing' && !isAnswered && (
          <div className="astro-progress-header">
            <div className="astro-progress-track">
              <div
                className="astro-progress-fill"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="astro-progress-text">
              {currentIndex + 1}/{gameQuestions.length}
            </span>
          </div>
        )}

        <div className="topbar-right">
          {screen === 'playing' && !isAnswered && (
            <div className="hud-space-pill" title="Tempo restante">
              <Timer size={16} color={timeLeft <= 6 ? '#f43f5e' : '#38bdf8'} />
              <span style={{ color: timeLeft <= 6 ? '#fda4af' : '#e0f2fe' }}>{timeLeft}s</span>
            </div>
          )}

          <button
            className="btn-space-ranking"
            onClick={() => setShowRankingModal(true)}
            title="Ver Rankings do 9º A e 9º B"
          >
            <Trophy size={16} color="#facc15" />
            <span>Rankings (9º A / 9º B)</span>
          </button>
        </div>
      </header>

      {/* PALCO PRINCIPAL */}
      <main
        className={`stage-content ${
          screen === 'howto' ? 'align-left-panel' : 'align-right-panel'
        }`}
      >
        {/* =======================================================
            TELA 1: INÍCIO ("VERDADEIRO OU FALSO" + Botão COMEÇAR >)
           ======================================================= */}
        {screen === 'home' && (
          <div className="astro-panel-column home-column">
            <AstroLearnBrandLogo />

            <div className="astro-glass-card home-glass-card">
              <h1 className="astro-title-vf">
                <span className="cyan-word">VERDADEIRO</span>
                <br />
                OU FALSO
              </h1>

              <p className="astro-subtitle">
                Teste seus conhecimentos
                <br />e explore o universo!
              </p>

              {/* Identificação do Aluno (Nome e Turma 9º A / 9º B) */}
              <div className="astro-login-inputs">
                <input
                  type="text"
                  className="astro-input-field"
                  placeholder="Digite seu nome *"
                  value={playerName}
                  onChange={(e) => {
                    setPlayerName(e.target.value);
                    if (formError) setFormError('');
                  }}
                  maxLength={24}
                />

                <select
                  className="astro-input-field"
                  value={playerClass}
                  onChange={(e) => {
                    setPlayerClass(e.target.value);
                    if (formError) setFormError('');
                  }}
                >
                  <option value="">Turma (9º A ou 9º B) *</option>
                  <option value="9º A">9º A</option>
                  <option value="9º B">9º B</option>
                </select>
              </div>

              {formError && (
                <div className="astro-error-msg">
                  <AlertCircle size={16} />
                  <span>{formError}</span>
                </div>
              )}
            </div>

            <button onClick={handleGoToHowTo} className="btn-astro-gradient btn-start-large">
              <span>COMEÇAR</span>
              <ChevronRight size={26} strokeWidth={3} className="btn-chevron-icon" />
            </button>
          </div>
        )}

        {/* =======================================================
            TELA 2: COMO FUNCIONA? (Card à Esquerda, Mascote à Direita)
           ======================================================= */}
        {screen === 'howto' && (
          <div className="astro-panel-column howto-column">
            <div className="astro-glass-card howto-glass-card">
              <h2 className="howto-title">
                COMO <span className="pink-word">FUNCIONA?</span>
              </h2>

              <div className="howto-steps-list">
                <div className="howto-step-item">
                  <div className="howto-icon-box blue-box">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                      <rect x="4" y="3" width="16" height="18" rx="3" stroke="#67e8f9" strokeWidth="2" />
                      <path d="M8 8H16M8 12H16M8 16H12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p>
                    Leia as afirmações
                    <br />
                    com atenção.
                  </p>
                </div>

                <div className="howto-step-item">
                  <div className="howto-icon-box purple-box">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                      <path d="M6 18L18 6" stroke="#f0abfc" strokeWidth="2.2" strokeLinecap="round" />
                      <path d="M5 8L7 10L11 6" stroke="#6ee7b7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M14 15L18 19M18 15L14 19" stroke="#fda4af" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p>
                    Escolha se a afirmação
                    <br />é verdadeira ou falsa.
                  </p>
                </div>

                <div className="howto-step-item">
                  <div className="howto-icon-box star-box">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3L14.8 8.7L21 9.6L16.5 14L17.6 20.2L12 17.3L6.4 20.2L7.5 14L3 9.6L9.2 8.7L12 3Z"
                        fill="#facc15"
                        stroke="#fef08a"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  <p>
                    Acerte o máximo de respostas
                    <br />e conquiste sua pontuação!
                  </p>
                </div>
              </div>

              <button onClick={startGame} className="btn-astro-gradient btn-howto-understand">
                <span>ENTENDI!</span>
                <ChevronRight size={24} strokeWidth={3} className="btn-chevron-icon" />
              </button>
            </div>
          </div>
        )}

        {/* =======================================================
            TELA 3: PERGUNTA EM ANDAMENTO (VERDADEIRO / FALSO)
           ======================================================= */}
        {screen === 'playing' && !isAnswered && currentQ && (
          <div className="astro-panel-column question-column">
            <div className="astro-glass-card question-glass-card">
              <div className="question-planet-top">
                <QuestionPlanetSVG />
              </div>

              <p className="astro-question-text">{currentQ.afirmativa}</p>

              <div className="astro-vf-buttons">
                <button
                  type="button"
                  className="btn-neon-vf btn-neon-true"
                  onClick={() => handleAnswer(true)}
                >
                  <span className="vf-icon-circle">
                    <Check size={20} strokeWidth={3.5} />
                  </span>
                  <span>VERDADEIRO</span>
                </button>

                <button
                  type="button"
                  className="btn-neon-vf btn-neon-false"
                  onClick={() => handleAnswer(false)}
                >
                  <span className="vf-icon-circle">
                    <X size={20} strokeWidth={3.5} />
                  </span>
                  <span>FALSO</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =======================================================
            TELAS 4 E 5: FEEDBACK ("ACERTOU!" ou "OPS!")
           ======================================================= */}
        {screen === 'playing' && isAnswered && currentQ && (
          <div className="astro-panel-column feedback-column">
            <div
              className={`astro-glass-card feedback-glass-card ${
                isCurrentCorrect ? 'card-correct' : 'card-wrong'
              }`}
            >
              {/* Ícone Circular Brilhante no Topo do Card */}
              <div
                className={`feedback-top-orb ${
                  isCurrentCorrect ? 'orb-correct' : 'orb-wrong'
                }`}
              >
                {isCurrentCorrect ? (
                  <Check size={40} strokeWidth={3.8} />
                ) : (
                  <X size={40} strokeWidth={3.8} />
                )}
              </div>

              {/* Estrelinhas vetoriais decorativas quando acerta (sem emoji) */}
              {isCurrentCorrect && (
                <>
                  <span className="sparkle-deco left-top">
                    <SparkleStarSVG size={20} color="#f9a8d4" />
                  </span>
                  <span className="sparkle-deco left-bottom">
                    <SparkleStarSVG size={15} color="#fde047" />
                  </span>
                  <span className="sparkle-deco right-mid">
                    <SparkleStarSVG size={18} color="#67e8f9" />
                  </span>
                </>
              )}

              <h2
                className={`astro-feedback-heading ${
                  isCurrentCorrect ? 'heading-correct' : 'heading-wrong'
                }`}
              >
                {isCurrentCorrect ? 'ACERTOU!' : 'OPS!'}
              </h2>

              <p className="astro-feedback-sub">
                {isCurrentCorrect
                  ? 'Muito bem!'
                  : selectedAnswer === 'timeout'
                  ? 'O tempo acabou nesta pergunta.'
                  : 'Essa não é a resposta correta.'}
              </p>

              {/* Explicação pedagógica concisa */}
              <div className="astro-explanation-box">
                <p>{currentQ.explicacao}</p>
              </div>

              <button onClick={nextQuestion} className="btn-astro-gradient btn-next-question">
                <span>
                  {currentIndex + 1 >= gameQuestions.length
                    ? 'VER PONTUAÇÃO'
                    : 'PRÓXIMA PERGUNTA'}
                </span>
                <ChevronRight size={22} strokeWidth={3} className="btn-chevron-icon" />
              </button>
            </div>
          </div>
        )}

        {/* =======================================================
            TELA 6: JOGO CONCLUÍDO! (8/10 + JOGAR NOVAMENTE / VOLTAR)
           ======================================================= */}
        {screen === 'result' && (
          <div className="astro-panel-column result-column">
            <div className="astro-glass-card result-glass-card">
              <h2 className="result-heading">JOGO CONCLUÍDO!</h2>
              <p className="result-sub-label">Sua pontuação foi:</p>

              <div className="result-score-hero">
                <GoldStarSVG />
                <span className="result-big-fraction">
                  {correctCount}/{gameQuestions.length}
                </span>
              </div>

              <p className="result-encouragement">
                Mandou muito bem!
                <br />
                Continue explorando o universo
                <br />
                do conhecimento!
              </p>

              <div className="result-student-badge">
                <User size={15} />
                <span>
                  <strong>{playerName}</strong> ({playerClass}) • <strong>{score} pts</strong> salvos no Ranking
                </span>
              </div>

              <div className="result-actions-row">
                <button onClick={startGame} className="btn-result-again">
                  <RotateCcw size={18} strokeWidth={2.6} />
                  <span>JOGAR NOVAMENTE</span>
                </button>

                <button
                  onClick={() => {
                    setScreen('home');
                  }}
                  className="btn-result-back"
                >
                  <Home size={18} strokeWidth={2.6} />
                  <span>VOLTAR</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL COM OS DOIS RANKINGS SEPARADOS (9º A e 9º B) */}
      {showRankingModal && (
        <div className="modal-backdrop" onClick={() => setShowRankingModal(false)}>
          <div
            className="astro-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="astro-modal-header">
              <h2>
                <Trophy size={26} color="#facc15" />
                <span>Rankings AstroLearn • 9º A e 9º B</span>
              </h2>
              <button
                onClick={() => setShowRankingModal(false)}
                className="btn-space-ranking"
              >
                <X size={18} /> Fechar
              </button>
            </div>

            <div className="rankings-two-cols">
              {/* Coluna 1: Ranking 9º A */}
              <div className="ranking-column-box">
                <div className="ranking-col-header">
                  <h3>
                    <Award size={19} color="#67e8f9" />
                    <span>Turma 9º A</span>
                  </h3>
                  {ranking9A.length > 0 && (
                    <button
                      onClick={() => clearClassRanking('9º A')}
                      className="btn-clear-rank"
                    >
                      <Trash2 size={13} /> Limpar 9º A
                    </button>
                  )}
                </div>

                {ranking9A.length === 0 ? (
                  <p className="empty-ranking-msg">Nenhum aluno do 9º A jogou ainda.</p>
                ) : (
                  ranking9A.map((r, i) => (
                    <div key={r.id} className={`ranking-row ${i === 0 ? 'first' : ''}`}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                        <span className={`rank-position-badge pos-${i + 1}`}>
                          {i + 1}º
                        </span>
                        <div>
                          <div className="rank-student-name">{r.name}</div>
                          <div className="rank-student-meta">
                            {r.correct}/{QUESTIONS_PER_MATCH} acertos
                          </div>
                        </div>
                      </div>
                      <div className="rank-student-pts">{r.score} pts</div>
                    </div>
                  ))
                )}
              </div>

              {/* Coluna 2: Ranking 9º B */}
              <div className="ranking-column-box">
                <div className="ranking-col-header">
                  <h3>
                    <Award size={19} color="#67e8f9" />
                    <span>Turma 9º B</span>
                  </h3>
                  {ranking9B.length > 0 && (
                    <button
                      onClick={() => clearClassRanking('9º B')}
                      className="btn-clear-rank"
                    >
                      <Trash2 size={13} /> Limpar 9º B
                    </button>
                  )}
                </div>

                {ranking9B.length === 0 ? (
                  <p className="empty-ranking-msg">Nenhum aluno do 9º B jogou ainda.</p>
                ) : (
                  ranking9B.map((r, i) => (
                    <div key={r.id} className={`ranking-row ${i === 0 ? 'first' : ''}`}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                        <span className={`rank-position-badge pos-${i + 1}`}>
                          {i + 1}º
                        </span>
                        <div>
                          <div className="rank-student-name">{r.name}</div>
                          <div className="rank-student-meta">
                            {r.correct}/{QUESTIONS_PER_MATCH} acertos
                          </div>
                        </div>
                      </div>
                      <div className="rank-student-pts">{r.score} pts</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
