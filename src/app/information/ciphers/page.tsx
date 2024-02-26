import Link from "next/link"
import { Tree } from "@/components/svg/Tree"
import AppBar from "@/components/AppBar"

const Page = () => {
  return (
    <div className="container">
      <AppBar>
        <Link href="/" className="button">
          Back
        </Link>
      </AppBar>
      <div className="information-container" style={{ display: "flex", justifyContent: "center" }}>
        <Tree />
      </div>
    </div>
  )
}

export default Page
