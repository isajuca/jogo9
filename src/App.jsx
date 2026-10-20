import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Flame,
  Timer,
  Heart,
  RotateCcw,
  Trash2,
  X,
  Check,
  ArrowRight,
  UserPlus
} from 'lucide-react';
import { INITIAL_QUESTIONS } from './data/questions';

const QUESTION_TIME = 25; // segundos por pergunta
const MAX_LIVES = 3;
const QUESTIONS_PER_MATCH = 10; // 10 perguntas sorteadas por partida (1/10 a 10/10)

const SCENES = {
  welcome: '/assets/scene_welcome.jpg',
  question: '/assets/scene_question.jpg',
  correct: '/assets/scene_correct.jpg',
  wrong: '/assets/scene_wrong.jpg'
};

// Embaralhamento Fisher-Yates para sortear questões variadas do banco de 50 questões
function getRandomQuestions(pool, count = QUESTIONS_PER_MATCH) {
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

// Folhinha decorativa em SVG para os cantos do card pergaminho
function CornerLeafSVG({ size = 46 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M54 10C34 10 16 24 12 48C36 44 50 28 54 10Z"
        fill="url(#leafGrad1)"
        stroke="#1e6b24"
        strokeWidth="2"
      />
      <path
        d="M12 48C24 36 38 24 54 10"
        stroke="#b9f59c"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M16 26C10 18 14 8 24 6C28 16 24 24 16 26Z"
        fill="url(#leafGrad2)"
      />
      <defs>
        <linearGradient id="leafGrad1" x1="12" y1="10" x2="54" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#86ef5a" />
          <stop offset="1" stopColor="#268c29" />
        </linearGradient>
        <linearGradient id="leafGrad2" x1="10" y1="6" x2="28" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a3f77b" />
          <stop offset="1" stopColor="#38a832" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Ícone de broto verde (duas folhas) no topo do card de pergunta
function SproutIconSVG() {
  return (
    <svg width="46" height="40" viewBox="0 0 56 48" fill="none">
      <path
        d="M28 42C28 26 16 12 4 12C4 26 14 38 28 42Z"
        fill="url(#sproutLeft)"
      />
      <path
        d="M28 42C28 24 42 8 54 8C54 24 42 38 28 42Z"
        fill="url(#sproutRight)"
      />
      <path d="M28 46V26" stroke="#1b7a2e" strokeWidth="3.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="sproutLeft" x1="4" y1="12" x2="28" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6ee755" />
          <stop offset="1" stopColor="#1b842c" />
        </linearGradient>
        <linearGradient id="sproutRight" x1="54" y1="8" x2="28" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#88f26b" />
          <stop offset="1" stopColor="#239636" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Ícone da Lâmpada 3D iluminada para a caixa de dica
function LightbulbSVG() {
  return (
    <svg width="42" height="42" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="26" r="22" fill="rgba(250, 204, 21, 0.25)" />
      <path
        d="M32 8C22.06 8 14 16.06 14 26C14 32.3 17.25 37.85 22.15 41.05C23.6 42 24.5 43.6 24.75 45.35L25 47H39L39.25 45.35C39.5 43.6 40.4 42 41.85 41.05C46.75 37.85 50 32.3 50 26C50 16.06 41.94 8 32 8Z"
        fill="url(#bulbGlow)"
        stroke="#d97706"
        strokeWidth="2"
      />
      <path
        d="M24 20C25.5 16.5 28.5 14.5 32 14.5"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="25" y="47" width="14" height="5" rx="2.5" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
      <rect x="26.5" y="52" width="11" height="4" rx="2" fill="#64748b" stroke="#475569" strokeWidth="1.5" />
      <path d="M29 56C29 57.65 30.35 59 32 59C33.65 59 35 57.65 35 56H29Z" fill="#475569" />
      <defs>
        <radialGradient id="bulbGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(28 22) rotate(55) scale(26)">
          <stop stopColor="#fef08a" />
          <stop offset="0.55" stopColor="#facc15" />
          <stop offset="1" stopColor="#eab308" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function App() {
  // Telas: 'home' | 'playing' | 'result'
  const [screen, setScreen] = useState('home');
  // Modal do Ranking
  const [showRankingModal, setShowRankingModal] = useState(false);

  // Dados obrigatórios do aluno (Nome e Turma: '9º A' ou '9º B')
  const [playerName, setPlayerName] = useState('');
  const [playerClass, setPlayerClass] = useState('');
  const [formError, setFormError] = useState('');

  // Ranking separado por turma (inicia 100% limpo)
  const [ranking, setRanking] = useState(() => {
    localStorage.removeItem('astrolearn_ranking_v2');
    localStorage.removeItem('ecomissao_ranking_v1');
    localStorage.removeItem('astrolearn_ranking_clean_v1');
    const saved = localStorage.getItem('astrolearn_ranking_turmas_v1');
    return saved ? JSON.parse(saved) : [];
  });

  // Estados da partida
  const [gameQuestions, setGameQuestions] = useState(() => getRandomQuestions(INITIAL_QUESTIONS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [planetHealth, setPlanetHealth] = useState(70);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // true | false | 'timeout' | null
  const [isAnswered, setIsAnswered] = useState(false);

  const timerRef = useRef(null);

  // Pré-carregar as 4 ilustrações de fundo para transição instantânea
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

  // Validar Nome e Turma e iniciar o jogo
  const startGame = () => {
    const trimmedName = playerName.trim();
    if (!trimmedName && !playerClass) {
      setFormError('Por favor, digite seu nome e escolha sua turma (9º A ou 9º B) para começar!');
      return;
    }
    if (!trimmedName) {
      setFormError('Por favor, digite seu nome antes de começar!');
      return;
    }
    if (!playerClass) {
      setFormError('Por favor, selecione sua turma (9º A ou 9º B) antes de começar!');
      return;
    }

    setFormError('');
    setGameQuestions(getRandomQuestions(INITIAL_QUESTIONS, QUESTIONS_PER_MATCH));
    setCurrentIndex(0);
    setScore(0);
    setLives(MAX_LIVES);
    setPlanetHealth(70);
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setTimeLeft(QUESTION_TIME);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScreen('playing');
  };

  // Verificar resposta
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
      setPlanetHealth((prev) => Math.min(100, prev + 8));
    } else {
      setStreak(0);
      setLives((prev) => Math.max(0, prev - 1));
      setPlanetHealth((prev) => Math.max(10, prev - 15));
    }
  };

  // Ir para a próxima pergunta
  const nextQuestion = () => {
    const outOfLives = lives <= 0;
    const isLast = currentIndex + 1 >= gameQuestions.length;

    if (outOfLives || isLast) {
      finishGame();
    } else {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(QUESTION_TIME);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  // Concluir partida e registrar no Ranking da respectiva turma
  const finishGame = () => {
    const newEntry = {
      id: Date.now(),
      name: playerName.trim(),
      turma: playerClass,
      score,
      planetHealth,
      correct: correctCount
    };

    const updated = [...ranking, newEntry].sort((a, b) => b.score - a.score);
    setRanking(updated);
    setScreen('result');

    if (lives > 0 && correctCount >= Math.ceil(gameQuestions.length * 0.6)) {
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 }
      });
    }
  };

  // Limpar ranking de uma turma específica ou de ambas
  const clearClassRanking = (turmaAlvo) => {
    setRanking((prev) => prev.filter((item) => item.turma !== turmaAlvo));
  };

  // Filtrar rankings separados para 9º A e 9º B
  const ranking9A = ranking.filter((r) => r.turma === '9º A');
  const ranking9B = ranking.filter((r) => r.turma === '9º B');

  // Determinar qual dos 4 cenários ilustrados exibir no fundo
  const currentQ = gameQuestions[currentIndex];
  const isCurrentCorrect = isAnswered && currentQ && selectedAnswer === currentQ.correta;

  let activeBg = SCENES.welcome;
  if (screen === 'playing') {
    if (!isAnswered) {
      activeBg = SCENES.question;
    } else if (isCurrentCorrect) {
      activeBg = SCENES.correct;
    } else {
      activeBg = SCENES.wrong;
    }
  } else if (screen === 'result') {
    activeBg = lives > 0 ? SCENES.correct : SCENES.wrong;
  }

  const progressPercentage =
    gameQuestions.length > 0
      ? Math.max(12, Math.round(((currentIndex + 1) / gameQuestions.length) * 100))
      : 30;

  return (
    <div
      className="astro-stage"
      style={{
        backgroundImage: `url('${activeBg}')`
      }}
    >
      {/* Barra superior com indicadores de Jogo + Botão de Rankings */}
      <header className="astro-topbar">
        {screen === 'playing' && (
          <>
            <div className="hud-pill-floating" title="Jogador e Turma">
              <span>👤 {playerName} ({playerClass})</span>
            </div>

            <div className="hud-pill-floating" title="Vidas restantes">
              {[...Array(MAX_LIVES)].map((_, i) => (
                <Heart
                  key={i}
                  size={18}
                  fill={i < lives ? '#22c55e' : 'transparent'}
                  color={i < lives ? '#16a34a' : '#94a3b8'}
                />
              ))}
            </div>

            <div className="hud-pill-floating" title="Saúde do Planeta">
              <span>🌍 Saúde: {planetHealth}%</span>
            </div>

            <div className="hud-pill-floating" title="Combo de respostas certas seguidas">
              <Flame size={17} color={streak >= 2 ? '#f97316' : '#64748b'} />
              <span>Combo: {streak}x</span>
            </div>

            <div className="hud-pill-floating" title="Tempo restante para responder">
              <Timer size={17} color={timeLeft <= 6 ? '#ef4444' : '#6c38f8'} />
              <span style={{ color: timeLeft <= 6 ? '#dc2626' : '#1d224c' }}>{timeLeft}s</span>
            </div>

            <div className="hud-pill-floating" title="Pontuação atual">
              <Trophy size={17} color="#eab308" />
              <span>{score} pts</span>
            </div>
          </>
        )}

        <button
          className="btn-top-icon"
          onClick={() => setShowRankingModal(true)}
          title="Ver Rankings do 9º A e 9º B"
        >
          <Trophy size={16} color="#facc15" />
          <span>Rankings (9º A / 9º B)</span>
        </button>
      </header>

      {/* ÁREA CENTRAL / DIREITA DO PALCO */}
      <main className="stage-content">
        <div className="right-panel-wrapper">
          {/* TELA 1: INÍCIO ("Verdadeiro ou Falso?") */}
          {screen === 'home' && (
            <div className="paper-card home-card">
              <div className="corner-leaf top-left">
                <CornerLeafSVG size={48} />
              </div>
              <div className="corner-leaf top-right">
                <CornerLeafSVG size={48} />
              </div>
              <div className="corner-leaf bottom-left">
                <CornerLeafSVG size={42} />
              </div>

              <h1 className="title-vf">
                Verdadeiro
                <br />
                ou <span className="falso-word">Falso?</span>
              </h1>

              <p className="subtitle-vf">
                Teste seus conhecimentos sobre
                <br />
                meio ambiente e sustentabilidade!
              </p>

              <div className="paper-divider" />

              <p className="instruction-vf">
                Leia as afirmativas e escolha se
                <br />
                são verdadeiras ou falsas.
              </p>

              {/* Campos obrigatórios de Nome e Turma (9º A ou 9º B) */}
              <div className="player-mini-inputs">
                <input
                  type="text"
                  className="input-pill"
                  placeholder="Digite seu nome *"
                  value={playerName}
                  onChange={(e) => {
                    setPlayerName(e.target.value);
                    if (formError) setFormError('');
                  }}
                  maxLength={24}
                  style={{
                    width: '210px',
                    borderColor: formError && !playerName.trim() ? '#ef4444' : undefined
                  }}
                />
                <select
                  className="input-pill"
                  value={playerClass}
                  onChange={(e) => {
                    setPlayerClass(e.target.value);
                    if (formError) setFormError('');
                  }}
                  style={{
                    borderColor: formError && !playerClass ? '#ef4444' : undefined,
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Escolha a turma *</option>
                  <option value="9º A">9º A</option>
                  <option value="9º B">9º B</option>
                </select>
              </div>

              {formError && (
                <p
                  style={{
                    color: '#dc2626',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    marginTop: '0.35rem',
                    background: 'rgba(254, 226, 226, 0.9)',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '12px',
                    border: '1px solid #f87171'
                  }}
                >
                  ⚠️ {formError}
                </p>
              )}

              <button onClick={startGame} className="btn-purple-3d btn-home-overlap">
                <span>Começar</span>
                <ArrowRight size={24} strokeWidth={3} />
              </button>
            </div>
          )}

          {/* TELA 2: PERGUNTA EM ANDAMENTO */}
          {screen === 'playing' && !isAnswered && currentQ && (
            <>
              {/* Barra de Progresso 1/10 a 10/10 idêntica ao layout */}
              <div className="progress-capsule">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="progress-counter">
                  {currentIndex + 1}/{gameQuestions.length}
                </span>
              </div>

              {/* Card Pergaminho da Afirmativa */}
              <div className="paper-card">
                <div className="corner-leaf top-right">
                  <CornerLeafSVG size={48} />
                </div>

                <div className="sprout-top-icon">
                  <SproutIconSVG />
                </div>

                <p className="question-statement">{currentQ.afirmativa}</p>

                <div className="vf-buttons-row">
                  <button
                    className="btn-answer-3d btn-true-3d"
                    onClick={() => handleAnswer(true)}
                  >
                    <Check size={28} strokeWidth={3.5} />
                    <span>Verdadeiro</span>
                  </button>

                  <button
                    className="btn-answer-3d btn-false-3d"
                    onClick={() => handleAnswer(false)}
                  >
                    <X size={28} strokeWidth={3.5} />
                    <span>Falso</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* TELAS 3 E 4: FEEDBACK ("Isso mesmo!" ou "Ops! Essa não é a resposta correta.") */}
          {screen === 'playing' && isAnswered && currentQ && (
            <div className="paper-card feedback-card">
              <div className="corner-leaf top-right">
                <CornerLeafSVG size={44} />
              </div>

              {/* Medalha Circular Verde (✓) ou Vermelha (✕) no topo do card */}
              <div className={`status-circle-badge ${isCurrentCorrect ? 'correct' : 'wrong'}`}>
                {isCurrentCorrect ? (
                  <Check size={36} strokeWidth={3.8} />
                ) : (
                  <X size={36} strokeWidth={3.8} />
                )}
              </div>

              <h2 className={`feedback-title ${isCurrentCorrect ? 'correct' : 'wrong'}`}>
                {isCurrentCorrect ? (
                  'Isso mesmo!'
                ) : selectedAnswer === 'timeout' ? (
                  'Ops! O tempo acabou.'
                ) : (
                  <>
                    Ops! Essa não é a resposta
                    <br />
                    correta.
                  </>
                )}
              </h2>

              <p className="feedback-body-text">{currentQ.explicacao}</p>

              {/* Caixa com Lâmpada 3D e resumo educativo */}
              <div className={`lightbulb-box ${isCurrentCorrect ? 'correct' : 'wrong'}`}>
                <div className="bulb-icon-wrap">
                  <LightbulbSVG />
                </div>
                <p className="lightbulb-text">{currentQ.dica}</p>
              </div>

              {/* Botão Roxo "Próxima pergunta ->" sobreposto no canto inferior direito */}
              <button onClick={nextQuestion} className="btn-purple-3d btn-next-overlap">
                <span>
                  {lives <= 0 || currentIndex + 1 >= gameQuestions.length
                    ? 'Ver resultado'
                    : 'Próxima pergunta'}
                </span>
                <ArrowRight size={22} strokeWidth={3} />
              </button>
            </div>
          )}

          {/* TELA DE RESULTADO FINAL */}
          {screen === 'result' && (
            <div className="paper-card feedback-card">
              <div className="corner-leaf top-left">
                <CornerLeafSVG size={46} />
              </div>
              <div className="corner-leaf top-right">
                <CornerLeafSVG size={46} />
              </div>

              <div className={`status-circle-badge ${lives > 0 ? 'correct' : 'wrong'}`}>
                <Trophy size={32} />
              </div>

              <h2 className={`feedback-title ${lives > 0 ? 'correct' : 'wrong'}`}>
                {lives > 0 ? 'Parabéns! Missão Concluída!' : 'Fim das Vidas! Continue Tentando!'}
              </h2>

              <p className="feedback-body-text">
                <strong>{playerName}</strong> (Turma <strong>{playerClass}</strong>), você acertou{' '}
                <strong>
                  {correctCount} de {gameQuestions.length}
                </strong>{' '}
                afirmativas, conquistou <strong>{score} pontos</strong> (maior sequência:{' '}
                <strong>{maxStreak}x</strong>) e deixou a saúde do planeta em{' '}
                <strong>{planetHealth}%</strong>!
              </p>

              <div className="lightbulb-box correct" style={{ marginBottom: '1.2rem' }}>
                <div className="bulb-icon-wrap">
                  <LightbulbSVG />
                </div>
                <p className="lightbulb-text">
                  Sua pontuação já foi registrada no <strong>Ranking do {playerClass}</strong>!
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={startGame}
                  className="btn-purple-3d"
                  style={{ fontSize: '1.1rem', padding: '0.7rem 1.4rem' }}
                >
                  <RotateCcw size={18} />
                  <span>Jogar Novamente</span>
                </button>

                <button
                  onClick={() => {
                    setPlayerName('');
                    setPlayerClass('');
                    setFormError('');
                    setScreen('home');
                  }}
                  className="btn-answer-3d btn-false-3d"
                  style={{ fontSize: '1.1rem', padding: '0.7rem 1.4rem' }}
                >
                  <UserPlus size={18} />
                  <span>Novo Jogador</span>
                </button>

                <button
                  onClick={() => setShowRankingModal(true)}
                  className="btn-answer-3d btn-true-3d"
                  style={{ fontSize: '1.1rem', padding: '0.7rem 1.4rem' }}
                >
                  <Trophy size={18} />
                  <span>Ver Rankings</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MODAL COM OS DOIS RANKINGS SEPARADOS (9º A e 9º B) */}
      {showRankingModal && (
        <div className="modal-backdrop" onClick={() => setShowRankingModal(false)}>
          <div
            className="modal-paper"
            style={{ maxWidth: '880px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.6rem' }}>
                <Trophy size={26} color="#eab308" />
                Rankings por Turma • 9º A e 9º B
              </h2>
              <button
                onClick={() => setShowRankingModal(false)}
                className="btn-top-icon"
                style={{ background: '#1c224d' }}
              >
                <X size={18} /> Fechar
              </button>
            </div>

            <div className="rankings-two-cols">
              {/* Coluna 1: Ranking 9º A */}
              <div className="ranking-column-box">
                <div className="ranking-col-header">
                  <h3>🏆 Ranking 9º A</h3>
                  {ranking9A.length > 0 && (
                    <button
                      onClick={() => clearClassRanking('9º A')}
                      className="btn-top-icon"
                      style={{ background: '#dc2626', padding: '0.28rem 0.65rem', fontSize: '0.76rem' }}
                    >
                      <Trash2 size={13} /> Limpar 9º A
                    </button>
                  )}
                </div>

                {ranking9A.length === 0 ? (
                  <p className="empty-ranking-msg">
                    Nenhum aluno do 9º A jogou ainda.
                  </p>
                ) : (
                  ranking9A.map((r, i) => (
                    <div key={r.id} className={`ranking-row ${i === 0 ? 'first' : ''}`}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 900, width: '28px' }}>
                          {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}º`}
                        </span>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '1rem' }}>{r.name}</div>
                          <div style={{ fontSize: '0.78rem', opacity: 0.75, fontWeight: 700 }}>
                            Acertos: {r.correct}/{QUESTIONS_PER_MATCH} • Planeta: {r.planetHealth}%
                          </div>
                        </div>
                      </div>
                      <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#1f7a34' }}>
                        {r.score} pts
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Coluna 2: Ranking 9º B */}
              <div className="ranking-column-box">
                <div className="ranking-col-header">
                  <h3>🏆 Ranking 9º B</h3>
                  {ranking9B.length > 0 && (
                    <button
                      onClick={() => clearClassRanking('9º B')}
                      className="btn-top-icon"
                      style={{ background: '#dc2626', padding: '0.28rem 0.65rem', fontSize: '0.76rem' }}
                    >
                      <Trash2 size={13} /> Limpar 9º B
                    </button>
                  )}
                </div>

                {ranking9B.length === 0 ? (
                  <p className="empty-ranking-msg">
                    Nenhum aluno do 9º B jogou ainda.
                  </p>
                ) : (
                  ranking9B.map((r, i) => (
                    <div key={r.id} className={`ranking-row ${i === 0 ? 'first' : ''}`}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 900, width: '28px' }}>
                          {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}º`}
                        </span>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '1rem' }}>{r.name}</div>
                          <div style={{ fontSize: '0.78rem', opacity: 0.75, fontWeight: 700 }}>
                            Acertos: {r.correct}/{QUESTIONS_PER_MATCH} • Planeta: {r.planetHealth}%
                          </div>
                        </div>
                      </div>
                      <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#1f7a34' }}>
                        {r.score} pts
                      </div>
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
