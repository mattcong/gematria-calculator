import Link from "next/link"

const Footer = ({ toggleTheme, theme }: { toggleTheme: () => void; theme: string }) => {
  return (
    <div className="footer">
      <div>
        <Link href="/information/about">About</Link>
      </div>
      <div>
        <Link href="/information/ciphers">Ciphers</Link>
      </div>
      <div />
      <button onClick={toggleTheme} style={{ all: "unset", cursor: "pointer", textAlign: "right" }}>
        {theme === "light" ? <LightIcon /> : <DarkIcon />}
      </button>
    </div>
  )
}

const LightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34783 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20L10 10L10 0Z"
      fill="#EB0909"
    />
    <circle cx="10" cy="10" r="9" transform="rotate(-90 10 10)" stroke="#EB0909" strokeWidth="2" />
  </svg>
)

const DarkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 2.00233e-07 7.34783 0 10C-2.00233e-07 12.6522 1.05357 15.1957 2.92893 17.0711C4.80429 18.9464 7.34783 20 10 20L10 10L10 0Z"
      fill="#3EA13B"
    />
    <circle cx="10" cy="10" r="9" transform="rotate(-90 10 10)" stroke="#3EA13B" strokeWidth="2" />
  </svg>
)

export default Footer
