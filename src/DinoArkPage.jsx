import React from 'react';
import './css/Dino.css';

const DinoArkPage = () => {
  return (
    <div className="dinoArkPage">
      <h2>
        Witaj w naszym niesamowitym sklepie DinoArk! 🦖
      </h2>
      <div className="text-container">
        <p>
          To nie jest zwykły sklep. To miejsce, gdzie dinokraje stają się rzeczywistością, a przygoda z grą Ark nabiera nowego, prehistorycznego smaku! 
          Nasza historia zaczęła się jako projekt zaliczeniowy z przedmiotu WDai, ale szybko przekształciła się w coś znacznie większego - sklep pełen 
          dinozaurów, gotowych do podbicia wirtualnego świata.
        </p>
        <p>
          Nasza ekipa entuzjastów gier postanowiła nie tylko zdobyć zaliczenie, ale również zarobić na przerwę zimową, aby uciec od szarości budynku 
          D17 i polecieć jak najdalej w krainę dinozaurów. W rezultacie powstał DinoArk - sklep, który przenosi Cię z biurowego światka do fascynującego 
          uniwersum, gdzie dinozaury rządzą grą Ark Survival Evolved.
        </p>
        <img src="src/jpg/miandino.png" alt="DinoArk" className="dinoArkImg" />
        <p>
          <strong>Dlaczego wybrać nasz sklep?</strong>
        </p>
        <ul>
          <li>🌋 Epicentrum Przygód: Nasze dinozaury nie są zwykłymi stworzeniami - są to prawdziwe bestie Ark, gotowe do podjęcia się każdej przygody w wirtualnym świecie gry.</li>
          <li>🎮 Odkryj Nowe Życie w Ark: Każdy dinozaur w naszym sklepie ma unikalne cechy. Odkryj je i wybierz swojego ulubionego towarzysza dla swojej wirtualnej podróży.</li>
          <li>🚀 Ucieczka od D17: Naszym celem jest nie tylko sprzedaż dinozaurów, ale także zaliczenie przedmiotu by nie musiec męczyć się z poprawkami - Pomoż nam!!!</li>
        </ul>
        <p>
          Dołącz do naszej społeczności DinoArk i rozpocznij swoją przygodę już dziś. Niech dinozaury zagoszczą w Twojej grze Ark, a zarazem pomogą nam spełnić marzenie o zimowej ucieczce! 🚁🌴
        </p>
      </div>
    </div>
  );
};

export default DinoArkPage;