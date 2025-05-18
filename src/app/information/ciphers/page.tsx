import Link from 'next/link'
import { Tree } from '@/components/svg/Tree'
import { AppBar } from '@/components/AppBar'
import { CipherDisplay } from '@/components/CipherDisplay'
import { ciphers } from '@/lib/ciphers'

const Page = () => {
  const letters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]

  return (
    <div className="container">
      <AppBar>
        <Link href="/" className="button">
          Back
        </Link>
      </AppBar>
      <div className="information-container" style={{ flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tree />
        </div>
        <div>
          <p>Standard Gematria</p>
          <CipherDisplay letters={letters} cipher={ciphers['Standard Gematria']} />
        </div>
        <div>
          <p>Pythagorean Gematria</p>
          <CipherDisplay letters={letters} cipher={ciphers['Pythagorean Gematria']} />
        </div>
        <div>
          <p>Reverse Pythagorean Gematria</p>
          <CipherDisplay letters={letters} cipher={ciphers['Reverse Pythagorean Gematria']} />
        </div>
        <div>
          <p>Simple Gematria</p>
          <CipherDisplay letters={letters} cipher={ciphers['Simple Gematria']} />
        </div>
        <div>
          <p>Multiple 6 Gematria</p>
          <CipherDisplay letters={letters} cipher={ciphers['Multiple 6 Gematria']} />
        </div>
        <div>
          <p>Alphanumeric Qabbala</p>
          <CipherDisplay letters={letters} cipher={ciphers['Alphanumeric Qabbala']} />
        </div>
      </div>
    </div>
  )
}

export default Page
