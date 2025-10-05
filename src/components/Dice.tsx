import React, { useEffect, useRef } from 'react';

const Dice: React.FC = () => {
  const cubeRef = useRef<HTMLDivElement>(null);
  const min = 1;
  const max = 24;

  const getRandom = (max: number, min: number): number => {
    return (Math.floor(Math.random() * (max - min)) + min) * 90;
  };

  const roll = (): void => {
    if (!cubeRef.current) return;

    const xRand = getRandom(max, min);
    const yRand = getRandom(max, min);

    cubeRef.current.style.transform = `rotateX(${xRand}deg) rotateY(${yRand}deg)`;
  };

  useEffect(() => {
    console.log('rolling dice...', cubeRef.current);

    if (cubeRef.current) {
      roll();
    }
  }, []);

  const onClick = (): void => {
    roll();
  };

  return (
    <section className="w-[200px] h-[200px] relative mx-auto mb-10 border-0" style={{ perspective: '1000px', perspectiveOrigin: '50% 100%' }}>
      <div
        role="none"
        ref={cubeRef}
        onClick={onClick}
        className="absolute w-full h-full cursor-pointer transition-transform duration-[6s] hover:cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front face - 1 dot */}
        <div className="bg-[#FF4544] block absolute w-[200px] h-[200px] border-2 border-[#ab1a1a] mx-auto py-[50px]" style={{ transform: 'translateZ(100px)' }}>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[85px] left-[85px]"></span>
        </div>

        {/* Back face - 2 dots */}
        <div className="bg-[#FF4544] block absolute w-[200px] h-[200px] border-2 border-[#ab1a1a] mx-auto py-[50px]" style={{ transform: 'rotateX(-180deg) translateZ(100px)' }}>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[45px] left-[45px]"></span>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[125px] left-[125px]"></span>
        </div>

        {/* Right face - 3 dots */}
        <div className="bg-[#FF4544] block absolute w-[200px] h-[200px] border-2 border-[#ab1a1a] mx-auto py-[50px]" style={{ transform: 'rotateY(90deg) translateZ(100px)' }}>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[45px] left-[45px]"></span>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[85px] left-[85px]"></span>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[125px] left-[125px]"></span>
        </div>

        {/* Left face - 4 dots */}
        <div className="bg-[#FF4544] block absolute w-[200px] h-[200px] border-2 border-[#ab1a1a] mx-auto py-[50px]" style={{ transform: 'rotateY(-90deg) translateZ(100px)' }}>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[45px] left-[45px]"></span>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[45px] left-[125px]"></span>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[125px] left-[45px]"></span>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[125px] left-[125px]"></span>
        </div>

        {/* Top face - 5 dots */}
        <div className="bg-[#FF4544] block absolute w-[200px] h-[200px] border-2 border-[#ab1a1a] mx-auto py-[50px]" style={{ transform: 'rotateX(90deg) translateZ(100px)' }}>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[45px] left-[45px]"></span>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[45px] left-[125px]"></span>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[85px] left-[85px]"></span>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[125px] left-[45px]"></span>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[125px] left-[125px]"></span>
        </div>

        {/* Bottom face - 6 dots */}
        <div className="bg-[#FF4544] block absolute w-[200px] h-[200px] border-2 border-[#ab1a1a] mx-auto py-[50px]" style={{ transform: 'rotateX(-90deg) translateZ(100px)' }}>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[45px] left-[45px]"></span>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[45px] left-[85px]"></span>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[45px] left-[125px]"></span>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[125px] left-[45px]"></span>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[125px] left-[85px]"></span>
          <span className="block absolute w-[30px] h-[30px] bg-white rounded-[15px] top-[125px] left-[125px]"></span>
        </div>
      </div>
    </section>
  );
};

export default Dice;