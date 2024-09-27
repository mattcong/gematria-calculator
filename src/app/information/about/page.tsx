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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Philosophorum />
        </div>
        <div className="information-wrap">
          <p>
            Gematria is a system assigning numerical values to letters. It is both a spiritual
            practice and hermeneutic method used to uncover additional meaning in texts, revealing
            correspondences between seemingly unrelated concepts.
            <br />
            <br />
            It is primarily a method of interpreting scripture associated with Jewish mysticism,
            particularly Kabbalah, also influencing Christian mystics and Western occult traditions.
            The kind of multilayered understanding of texts accessible via numerological
            correspondences is best exemplified in the Kabbalistic exegetical practice of Pardes,
            which describes four levels of interpretation: Peshat (literal meaning), Remez (hint or
            allegorical meaning), Derash (homiletical or midrashic meaning) and Sod (mystical or
            secret meaning). Gematria, along with other Kabbalistic techniques such as Notarikon and
            Temurah, primarily operates within the realm of Sod, providing tools to uncover bridges
            between the exoteric and esoteric: the seen/literal and the unseen/symbolic. Through an
            appropriate framework such as Kabbalah, these obscured connections offer insight into
            the divine structures that give form to reality.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
