import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const Dashboard = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [urlsPerDay, setUrlsPerDay] = useState(0);
  const [urlsPerMonth, setUrlsPerMonth] = useState(0);

  useEffect(() => {
    // Fetch statistics when the component mounts
    async function fetchStatistics() {
      try {
        const response = await fetch(
          "https://urlshort-et75.onrender.com/api/urlshort/statistics"
        );
        const data = await response.json();
        const { urlsPerDay, urlsPerMonth, clickCounts } = data;

        setUrlsPerDay(urlsPerDay);
        setUrlsPerMonth(urlsPerMonth);

        // Update the click count for each URL
        const updatedUrls = urls.map((url) => {
          const clickCount = clickCounts.find(
            (item) => item.shortUrl === url.shortUrl
          );
          return {
            ...url,
            clickCount: clickCount ? clickCount.clickCount : 0,
          };
        });

        setUrls(updatedUrls);
      } catch (error) {
        console.error(error);
      }
    }

    fetchStatistics(); // Run once when the component mounts
  }, []);

  const handleShorten = async () => {
    try {
      const response = await fetch(
        "https://urlshort-et75.onrender.com/api/urlshort/shorten",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ longUrl }),
        }
      );
      const data = await response.json();
      setShortUrl(data.shortUrl);
      const newUrl = {
        longUrl,
        shortUrl: data.shortUrl,
        clickCount: 0, // Initialize click count for the new URL
      };
      setUrls([...urls, newUrl]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h2>Dashboard</h2>
      <div className="mb-3">
        <label htmlFor="longUrl" className="form-label">
          Enter a Long URL
        </label>
        <input
          type="text"
          className="form-control"
          id="longUrl"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleShorten}>
        Shorten URL
      </button>
      {shortUrl && (
        <div className="mt-3">
          <strong>Short URL:</strong> {shortUrl}
        </div>
      )}
      <div className="mt-4">
        <h4>Statistics:</h4>
        <p>Total URLs Created Today: {urlsPerDay}</p>
        <p>Total URLs Created This Month: {urlsPerMonth}</p>
      </div>
      <div className="mt-4">
        <h4>Created URLs:</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>Click Count</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url, index) => (
              <tr key={index}>
                <td>{url.longUrl}</td>
                <a href={url.longUrl} target="_blank" rel="noopener noreferrer">
                  {url.shortUrl}
                </a>
                <td>{url.clickCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Dashboard;
