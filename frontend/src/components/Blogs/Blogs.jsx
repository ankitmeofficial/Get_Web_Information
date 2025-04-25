import React from "react";
import "./Blogs.css";

function Blogs() {
  return (
    <>
      <div className="blog-page-main">
        <div className="blog-container">
          {/* <h1>Latest Insights</h1> */}
          <div class="recent-hacking">
            <h1>
              Recent Hacking Incident: A Wake-Up <br /> Call for Cybersecurity
            </h1>
            <p>
              A recent high-profile hack targeted major organizations, sparking
              concerns and <br />
              calls for stronger cybersecurity measures
            </p>
          </div>

          <div className="blog-wrapper">
            {/* Blog 1 */}
            <div className="blog-card">
              <h2>Russia-Ukraine Cyber Conflict</h2>
              <p>
                Includes data erasures, ransomware, and infrastructure attacks,
                such as the Ukrainian group Sudo rm-rf targeting Russian TV
                servers.
              </p>
              <button className="blog-see-more-btn">See More</button>
            </div>

            {/* Blog 2 */}
            <div className="blog-card">
              <h2>Facebook Data Leak (2021)</h2>
              <p>
                Personal information of 533 million users was made available
                online, including phone numbers and email addresses.
              </p>
              <button className="blog-see-more-btn">See More</button>
            </div>

            {/* Blog 3 */}
            <div className="blog-card">
              <h2>
                Sony Pictures Hack <br />
                (2014)
              </h2>
              <p>
                North Korean hackers breached Sony Pictures, leaking
                confidential emails, employee information, and unreleased films.
              </p>
              <button className="blog-see-more-btn">See More</button>
            </div>
          </div>
          <button className="blog-see-all-btn">See more incidents</button>
        </div>
      </div>
    </>
  );
}

export default Blogs;
