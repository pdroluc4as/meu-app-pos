"use client"; // necessario para interatividade

import { useState } from "react";

// fução que representa um quadradinho
function Square({ value, onSquareClick}: { value:string | null, onSquareClick: () => void}) {
  const textColor = value === 'X' ? 'text-blue-600' : 'text-red-600';

  return <button className={`w-16 h-16 bg-white border border-gray-400 text-4xl font-bold flex items-center justify-center hover:bg-gray-100 transition-colors m-[-1px] ${textColor}`} 
  onClick={onSquareClick}>
    {value}
  </button>
}


// é a principal função que o react vai renderizar na tela
export default function Board() {

  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [squares, setSquares] = useState<Array<string | null>>(Array(9).fill(null));

  const winner = calculateWinner(squares);

  let status;
  if (winner) {
    status = "Vencedor: " + winner;
  } else {
    status = "Próximo a jogar: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i: number) {

    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // cria uma copia da lista para não alterar a lista original diretamente
    const nextSquares = squares.slice();

    
    
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    // Atualiza o estado do tabuleiro com a nova lista
    setSquares(nextSquares);

    // muda o turno
    setXIsNext(!xIsNext);

  }

  function resetGame() {
    // Volta a colocar os 9 quadrados como nulos (vazios)
    setSquares(Array(9).fill(null)); 
    // O 'X' volta a ser o primeiro a jogar
    setXIsNext(true); 
  }

  return (
      <div className="flex flex-col items-center mt-12">
      

      <div className={`mb-6 text-2xl font-semibold ${winner ? 'text-green-600' : 'text-gray-700'}`}>
        {status}
      </div>

      {/* O Tabuleiro do Jogo */}
      <div className="flex flex-col">
        <div className="flex">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="flex">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="flex">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      
      <button 
        onClick={resetGame} 
        className="mt-12 border border-gray-400 hover:bg-gray-100 transition-colors m-[-1px]"
      >
        Reiniciar Jogo
      </button>
    </div>
  );
}

function calculateWinner(squares: Array<string | null>) {
  // Matriz com todas as posições vencedoras possíveis (linhas, colunas e diagonais)
  const lines = [
    [0, 1, 2], // Linha superior
    [3, 4, 5], // Linha do meio
    [6, 7, 8], // Linha inferior
    [0, 3, 6], // Coluna da esquerda
    [1, 4, 7], // Coluna do meio
    [2, 5, 8], // Coluna da direita
    [0, 4, 8], // Diagonal principal
    [2, 4, 6]  // Diagonal secundária
  ];
  
  // Percorre todas as combinações
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]; // Desestrutura a combinação atual. Ex: a=0, b=1, c=2
    
    // Verifica se a primeira posição não é nula E se as três posições têm exatamente o mesmo valor ('X' ou 'O')
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Devolve o vencedor ('X' ou 'O')
    }
  }
  
  return null; // Se não houver vencedor, devolve nulo
}