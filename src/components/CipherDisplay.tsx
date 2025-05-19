import { calculate } from '@/lib/calculate'
import { Alphabet } from '@/types/Alphabet'

export const CipherDisplay = ({ letters, cipher }: { letters: string[]; cipher: Alphabet }) => {
  return (
    <div className="cipher-display-wrap">
      {letters.map((letter, i) => (
        <div className="cipher-display-tile-wrap" key={`${letter}-${i}`}>
          <div className="cipher-display-tile">
            <p style={{ margin: 0 }}>{letter.toUpperCase()}</p>
          </div>
          <div className="cipher-display-tile">
            <p style={{ margin: 0 }}>{calculate(letter, cipher)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
