import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const GAME_TIME = 30;

const App = () => {
  const [screen, setScreen] = useState('start');
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const gameContainerRef = useRef(null);

  useEffect(() => {
    let timer;
    if (screen === 'game') {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setScreen('end');
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [screen, setTimeLeft]);

  const handleStart = () => {
    setScore(0); // Сбрасываем счет при старте новой игры
    setTimeLeft(GAME_TIME); // Сбрасываем время при старте новой игры
    setScreen('select');
  };

  const handleSweetSelect = (sweet) => {
    setSelectedSweet(sweet);
    setScreen('game');
  };

  const handleSweetClick = (event) => {
    setScore(score + 1); 
    event.target.remove();
    // Задержка для createSweet
    setTimeout(createSweet, 100); 
  };

  const createSweet = () => {
    const sweet = document.createElement('img');
    sweet.src = selectedSweet;
    sweet.className = 'sweet';
    sweet.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
    sweet.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
    sweet.alt='Вкусняшка'
    sweet.addEventListener('click', handleSweetClick);
    gameContainerRef.current.appendChild(sweet);
  };

  useEffect(() => {
    if (screen === 'game') {
      // Создаем первую сладость
      createSweet(); 
    }
  }, [screen]);

  return (
    <div className='app'>
      {screen === 'start' && (
        <div className="screen visible">
          <h2>Игра: "Съешь вкусняшку"</h2>
          <button className="btn" onClick={handleStart}>
            Начать игру
          </button>
        </div>
      )}

      {screen === 'select' && (
        <div className="screen visible">
          <h2>Выбери вкусняшку</h2>
          <ul className="sweet_list">
            <li>
              <button
                className="choose_sweet_btn"
                onClick={() => handleSweetSelect('/images/ponchik-transformed.png')}
              >
                <p>Пончик</p>
                <img src="/images/ponchik-transformed.png" alt="Пончик" />
              </button>
            </li>
            <li>
              <button
                className="choose_sweet_btn"
                onClick={() => handleSweetSelect('/images/pechenka-transformed.png')}
              >
                <p>Печенька</p>
                <img src="/images/pechenka-transformed.png" alt="Печенька" />
              </button>
            </li>
            <li>
              <button
                className="choose_sweet_btn"
                onClick={() => handleSweetSelect('/images/pirog-transformed.png')}
              >
                <p>Пирог</p>
                <img src="/images/pirog-transformed.png" alt="Пирог" />
              </button>
            </li>
          </ul>
        </div>
      )}

      {screen === 'game' && (
        <div className="screen game_container visible" ref={gameContainerRef}>
          <h3 className="time">Время: {timeLeft}</h3>
          <h3 className="score">Счет: {score}</h3>
        </div>
      )}

      {screen === 'end' && (
        <div className="screen visible">
          <h2>Игра окончена!</h2>
          <h3>Ваш счет: {score}</h3>
          <button className="btn" onClick={handleStart}>
            Играть снова
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
