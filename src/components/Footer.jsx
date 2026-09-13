export default function Footer() {
  return (
    <footer>
      <div className="legend">
        <span><span className="pill free">FREE</span> no paywall found</span>
        <span><span className="pill paid">PAID</span> behind a paywall</span>
        <span><span className="pill unknown">?</span> access unclear from source</span>
        <span><span className="rec-star">★</span> our pick for that topic</span>
        <span>
          <span className="tilde">~</span> URL reconstructed from the site's pattern, not confirmed on the page
        </span>
      </div>
      <div>
        Free/paid status reflects what was visible on each site at collection time and can change — check the source
        before you commit an evening to it.
      </div>
      <div className="foot-gh">
        Built & maintained by{' '}
        <a href="https://github.com/MohitGupta14/SystemDesign" target="_blank" rel="noopener noreferrer">
          Mohit Gupta · github.com/MohitGupta14/SystemDesign
        </a>
      </div>
    </footer>
  )
}