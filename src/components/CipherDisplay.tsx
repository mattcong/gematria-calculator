import { calculate } from '@/lib/calculate'
import { Alphabet } from '@/types/Alphabet'

const CipherDisplay = ({ letters, cipher }: { letters: string[]; cipher: Alphabet }) => {
  return (
    <div className="cipher-display-wrap">
      {letters.map((letter) => (
        <div className="cipher-display-tile-wrap" key={letter}>
          <div className="cipher-display-tile">
            <p style={{ margin: 0 }}>{letter}</p>
          </div>
          <div className="cipher-display-tile">
            <p style={{ margin: 0 }}>{calculate(letter, cipher)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CipherDisplay
