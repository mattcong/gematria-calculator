import { Philosophorum } from "@/components/svg/Philosophorum"
import AppBar from "@/components/AppBar"
import Link from "next/link"

const Page = () => {
  return (
    <div className="container">
      <AppBar>
        <Link href="/" className="button">
          Back
        </Link>
      </AppBar>
      <div className="information-container">
        <Philosophorum />
        <div className="information-wrap">
          <p></p>
        </div>
      </div>
    </div>
  )
}

export default Page
