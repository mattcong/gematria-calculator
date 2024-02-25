import { Philosophorum } from "@/components/svg/Philosophorum"
import Link from "next/link"

const Page = () => {
  return (
    <div className="container">
      <Link href="/" className="button">
        Back
      </Link>
      <div className="information-container">
        <Philosophorum />
      </div>
    </div>
  )
}

export default Page
