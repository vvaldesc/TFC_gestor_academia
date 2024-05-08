import React, { useState, useEffect } from 'react';

const Text_animated = ({ texts }) => {
    const [currentPhrase, setCurrentPhrase] = useState(texts[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentIndex = texts.indexOf(currentPhrase);
            const nextIndex = (currentIndex + 1) % texts.length;
            setCurrentPhrase(texts[nextIndex]);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentPhrase, texts]);

    return (
        <div className="container">
            <h2>{currentPhrase}</h2>
        </div>
    );
};

export default Text_animated;