import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [hackingProgress, setHackingProgress] = useState(0);
  const [currentTarget, setCurrentTarget] = useState('');
  const [hackedSites, setHackedSites] = useState(0);
  const [geesePanel, setGeesePanel] = useState(3);
  const [terminalText, setTerminalText] = useState('');
  const [isHacking, setIsHacking] = useState(false);
  const [matrixRain, setMatrixRain] = useState<string[]>([]);

  const targets = [
    'antygoose-intelligence.gov',
    'goose-tracker-central.mil',
    'feather-surveillance-net.org',
    'anti-honk-operations.com',
    'goose-blocker-system.net'
  ];

  const hackingMessages = [
    'Инициализация гусиных протоколов...',
    'Взлом защиты антигусей...',
    'Обход системы детекции...',
    'Извлечение секретных данных...',
    'Установка гусиного бэкдора...',
    'СИСТЕМА ВЗЛОМАНА! 🪿'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMatrixRain(prev => {
        const newRain = [];
        for (let i = 0; i < 20; i++) {
          const chars = '01ГУСЬ🪿HACK';
          newRain.push(chars[Math.floor(Math.random() * chars.length)]);
        }
        return newRain;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const startHacking = () => {
    if (isHacking) return;
    
    const target = targets[Math.floor(Math.random() * targets.length)];
    setCurrentTarget(target);
    setIsHacking(true);
    setHackingProgress(0);
    setTerminalText('');

    let messageIndex = 0;
    let progress = 0;

    const hackInterval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      setHackingProgress(Math.min(progress, 100));

      if (messageIndex < hackingMessages.length) {
        setTerminalText(prev => prev + hackingMessages[messageIndex] + '\n');
        messageIndex++;
      }

      if (progress >= 100) {
        clearInterval(hackInterval);
        setHackedSites(prev => prev + 1);
        setIsHacking(false);
        setTimeout(() => {
          setHackingProgress(0);
          setTerminalText('');
          setCurrentTarget('');
        }, 2000);
      }
    }, 800);
  };

  const addGoose = () => {
    setGeesePanel(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden relative">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-20 gap-1 h-full">
          {matrixRain.map((char, i) => (
            <div key={i} className="animate-bounce text-xs">
              {char}
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 border-b border-green-400/30">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-400 animate-pulse">
            🪿 GOOSE HACKERS TERMINAL 🪿
          </h1>
          <div className="text-sm">
            ВЗЛОМАНО: <span className="text-green-300 font-bold">{hackedSites}</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 relative z-10">
        {/* Geese Panel */}
        <Card className="bg-black/80 border-green-400/50 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-green-300">ПАНЕЛЬ ГУСЕЙ</h2>
            <Button 
              onClick={addGoose}
              className="bg-green-400 text-black hover:bg-green-300 text-sm"
            >
              + ГУСЬ
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: geesePanel }, (_, i) => (
              <div 
                key={i} 
                className="text-2xl animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                🪿
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-green-300">
            Активных хакеров: {geesePanel}
          </div>
        </Card>

        {/* Hacking Terminal */}
        <Card className="bg-black/80 border-green-400/50 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-green-300">ТЕРМИНАЛ ВЗЛОМА</h2>
            <div className="flex items-center gap-2">
              <Icon name="Shield" className="text-red-400" size={16} />
              <span className="text-sm">TARGET LOCKED</span>
            </div>
          </div>

          {currentTarget && (
            <div className="mb-4 p-2 bg-green-400/10 border border-green-400/30 rounded">
              <div className="text-sm text-green-300">ЦЕЛЬ:</div>
              <div className="font-bold text-green-400">{currentTarget}</div>
            </div>
          )}

          {isHacking && (
            <div className="mb-4">
              <Progress value={hackingProgress} className="mb-2" />
              <div className="text-sm text-green-300">
                Прогresс взлома: {Math.round(hackingProgress)}%
              </div>
            </div>
          )}

          <div className="bg-black/50 p-3 rounded min-h-32 border border-green-400/30 mb-4">
            <div className="flex items-center mb-2">
              <span className="text-green-300">root@goose-hq:~$</span>
              <span className="ml-2 animate-pulse">_</span>
            </div>
            <pre className="text-sm text-green-400 whitespace-pre-wrap">
              {terminalText}
            </pre>
          </div>

          <Button 
            onClick={startHacking}
            disabled={isHacking}
            className="w-full bg-green-400 text-black hover:bg-green-300 disabled:opacity-50"
          >
            {isHacking ? 'ВЗЛОМ В ПРОЦЕССЕ...' : 'НАЧАТЬ ВЗЛОМ'}
          </Button>
        </Card>

        {/* Stats Panel */}
        <Card className="bg-black/80 border-green-400/50 p-4">
          <h2 className="text-lg font-bold text-green-300 mb-4">СТАТИСТИКА</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-green-300">Взломанных сайтов:</div>
              <div className="text-2xl font-bold text-green-400">{hackedSites}</div>
            </div>
            <div>
              <div className="text-green-300">Активных гусей:</div>
              <div className="text-2xl font-bold text-green-400">{geesePanel}</div>
            </div>
            <div>
              <div className="text-green-300">Статус:</div>
              <div className="text-green-400 font-bold">
                {isHacking ? 'ВЗЛОМ' : 'ГОТОВ'}
              </div>
            </div>
            <div>
              <div className="text-green-300">Режим:</div>
              <div className="text-green-400 font-bold">UNLIMITED</div>
            </div>
          </div>
        </Card>

        {/* Mission Brief */}
        <Card className="bg-black/80 border-green-400/50 p-4">
          <h2 className="text-lg font-bold text-green-300 mb-2">МИССИЯ</h2>
          <p className="text-sm text-green-400 mb-2">
            Элитная команда гусей-хакеров должна взломать системы разведки антигусей 
            и получить доступ к секретным планам по борьбе с гусиным сообществом.
          </p>
          <div className="flex items-center gap-2 text-xs text-green-300">
            <Icon name="Clock" size={12} />
            <span>Время не ограничено</span>
          </div>
        </Card>
      </div>
    </div>
  );
}