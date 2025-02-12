'use client';

export default function RotatingCube() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Left Cube */}
            <div className="cube-wrapper-left">
                <div className="cube">
                    <div className="cube-face front"></div>
                    <div className="cube-face back"></div>
                    <div className="cube-face right"></div>
                    <div className="cube-face left"></div>
                    <div className="cube-face top"></div>
                    <div className="cube-face bottom"></div>
                </div>
            </div>

            {/* Right Cube */}
            <div className="cube-wrapper-right">
                <div className="cube">
                    <div className="cube-face front"></div>
                    <div className="cube-face back"></div>
                    <div className="cube-face right"></div>
                    <div className="cube-face left"></div>
                    <div className="cube-face top"></div>
                    <div className="cube-face bottom"></div>
                </div>
            </div>
        </div>
    );
} 