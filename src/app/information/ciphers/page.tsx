import Link from "next/link"
import { Tree } from "@/components/svg/Tree"

const Page = () => {
  return (
    <div className="container">
      <Link href="/" className="button">
        Back
      </Link>
      <div className="information-container" style={{ display: "flex", justifyContent: "center" }}>
        <Tree />
      </div>
    </div>
  )
}

export default Page
