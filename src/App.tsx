import { useState } from 'react'
import './App.css'

type Operation = '+' | '-' | '*' | '/' | null

function App() {
  const [num1, setNum1] = useState<string>('')
  const [num2, setNum2] = useState<string>('')
  const [operation, setOperation] = useState<Operation>(null)
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string>('')

  const handleCalculate = () => {
    setError('')
    setResult(null)

    const a = parseFloat(num1)
    const b = parseFloat(num2)

    if (isNaN(a) || isNaN(b)) {
      setError('Unesite validne brojeve.')
      return
    }

    if (operation === null) {
      setError('Izaberite operaciju.')
      return
    }

    let res: number

    switch (operation) {
      case '+':
        res = a + b
        break
      case '-':
        res = a - b
        break
      case '*':
        res = a * b
        break
      case '/':
        if (b === 0) {
          setError('Deljenje nulom nije moguće.')
          return
        }
        res = a / b
        break
    }

    setResult(res)
  }

  const handleReset = () => {
    setNum1('')
    setNum2('')
    setOperation(null)
    setResult(null)
    setError('')
  }

  const operations: { label: string; value: Operation }[] = [
    { label: '+', value: '+' },
    { label: '−', value: '-' },
    { label: '×', value: '*' },
    { label: '÷', value: '/' },
  ]

  return (
    <div className="calculator-wrapper">
      <div className="calculator">
        <h1 className="calc-title">Kalkulator</h1>

        <div className="inputs">
          <div className="input-group">
            <label htmlFor="num1">Broj 1</label>
            <input
              id="num1"
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="input-group">
            <label htmlFor="num2">Broj 2</label>
            <input
              id="num2"
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="operations">
          {operations.map((op) => (
            <button
              key={op.value}
              className={`op-btn ${operation === op.value ? 'active' : ''}`}
              onClick={() => setOperation(op.value)}
              type="button"
            >
              {op.label}
            </button>
          ))}
        </div>

        <div className="actions">
          <button className="calc-btn primary" onClick={handleCalculate} type="button">
            Izračunaj
          </button>
          <button className="calc-btn secondary" onClick={handleReset} type="button">
            Resetuj
          </button>
        </div>

        <div className="result-box">
          {error && <p className="error">{error}</p>}
          {result !== null && !error && (
            <p className="result">
              <span className="result-label">Rezultat</span>
              <span className="result-value">{result}</span>
            </p>
          )}
          {result === null && !error && (
            <p className="placeholder">Rezultat će se prikazati ovde</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
