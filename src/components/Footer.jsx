import React from 'react';

const Footer = () => {
  return (
    <footer className="relative py-6 bg-neutral-900 z-20 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Fish animation */}
        <div 
          className="absolute right-0 bottom-[7.5%] h-12 w-16 bg-[#fe9e20] rounded-full" 
          style={{
            animation: "swimming 4s infinite",
            position: "absolute",
          }}
        >
          {/* Fish eye */}
          <div 
            className="absolute w-2 h-2 bg-[#333] rounded-full top-4 left-2"
            style={{
              boxShadow: "0 0 0 0.1rem rgba(146, 46, 46, 1), 0 0 0 0.25rem #fff"
            }}
          ></div>
          
          {/* Fish tail */}
          <div 
            className="absolute -right-4"
            style={{
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "1.5rem 2rem 1.5rem 0",
              borderColor: "transparent #fe9e20"
            }}
          ></div>
        </div>
        
        <p className="text-center text-neutral-400 font-normal tracking-wider text-sm md:text-base relative z-10">
          &copy; 2025 Pacific Pool. Designed with 
          <span className="inline-block mx-1 text-red-400 animate-pulse">♥</span> 
          by Numan
        </p>
      </div>
      
      {/* Add these keyframes to your global CSS or use a styled-components approach */}
      <style jsx>{`
        @keyframes swimming {
          0% {
            transform: rotateY(0deg) rotate(-50deg) translateX(0);
          }
          5% {
            transform: rotateY(15deg) rotate(-10deg) translateX(-5vw);
          }
          10% {
            transform: rotateY(30deg) rotate(-20deg) translateX(-10vw);
          }
          15% {
            transform: rotateY(15deg) rotate(-15deg) translateX(-15vw);
          }
          20% {
            transform: rotateY(0deg) rotate(-10deg) translateX(-20vw);
          }
          25% {
            transform: rotateY(15deg) rotate(-5deg) translateX(-25vw);
          }
          30% {
            transform: rotateY(30deg) rotate(0deg) translateX(-30vw);
          }
          35% {
            transform: rotateY(15deg) rotate(5deg) translateX(-35vw);
          }
          40% {
            transform: rotateY(5deg) rotate(10deg) translateX(-40vw);
          }
          45% {
            transform: rotateY(15deg) rotate(5deg) translateX(-45vw);
          }
          50% {
            transform: rotateY(30deg) rotate(0deg) translateX(-50vw);
          }
          55% {
            transform: rotateY(15deg) rotate(-5deg) translateX(-55vw);
          }
          60% {
            transform: rotateY(0deg) rotate(0deg) translateX(-60vw);
          }
          70% {
            transform: rotateY(15deg) rotate(5deg) translateX(-70vw);
          }
          80% {
            transform: rotateY(30deg) rotate(0deg) translateX(-80vw);
          }
          90% {
            transform: rotateY(15deg) rotate(0deg) translateX(-90vw);
          }
          100% {
            transform: rotateY(0deg) rotate(0deg) translateX(-100vw);
          }
        }
        
        @media (orientation: landscape) {
          @keyframes swimming {
            0% {
              transform: rotateY(0deg) rotate(-50deg) translateX(0);
            }
            5% {
              transform: rotateY(15deg) rotate(-10deg) translateX(-5vmax);
            }
            10% {
              transform: rotateY(30deg) rotate(-20deg) translateX(-10vmax);
            }
            15% {
              transform: rotateY(15deg) rotate(-15deg) translateX(-15vmax);
            }
            20% {
              transform: rotateY(0deg) rotate(-10deg) translateX(-20vmax);
            }
            25% {
              transform: rotateY(15deg) rotate(-5deg) translateX(-25vmax);
            }
            30% {
              transform: rotateY(30deg) rotate(0deg) translateX(-30vmax);
            }
            35% {
              transform: rotateY(15deg) rotate(5deg) translateX(-35vmax);
            }
            40% {
              transform: rotateY(5deg) rotate(10deg) translateX(-40vmax);
            }
            45% {
              transform: rotateY(15deg) rotate(5deg) translateX(-45vmax);
            }
            50% {
              transform: rotateY(30deg) rotate(0deg) translateX(-50vmax);
            }
            55% {
              transform: rotateY(15deg) rotate(-5deg) translateX(-55vmax);
            }
            60% {
              transform: rotateY(0deg) rotate(0deg) translateX(-60vmax);
            }
            70% {
              transform: rotateY(15deg) rotate(5deg) translateX(-70vmax);
            }
            80% {
              transform: rotateY(30deg) rotate(0deg) translateX(-80vmax);
            }
            90% {
              transform: rotateY(15deg) rotate(-5deg) translateX(-90vmax);
            }
            100% {
              transform: rotateY(0deg) rotate(0deg) translateX(-100vmax);
            }
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;