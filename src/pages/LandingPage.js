import PokeGrid from './PokeGrid';
import { useState } from "react";
import { Button } from 'antd';

function LandingPage() {

  const [accessPokeGrid, setAccessPokeGrid] = useState(false);

  const handleButtonClick = () => {
    setAccessPokeGrid(true);
  }

  return (
    <div>
      {!accessPokeGrid && (
        <div class="background">
          <button className="button-landing" onClick={() => handleButtonClick()}>
            <span>Enter here</span>
            <svg viewBox="-5 -5 110 110" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0"/>
            </svg>
          </button>
        </div>
      )}
      {accessPokeGrid && <PokeGrid />}
    </div>
  )
}

export default LandingPage;
