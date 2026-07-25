# LeetCode Progress Tracker

A simple web app that fetches a LeetCode user's public stats (via LeetCode's GraphQL API) and displays their progress across Easy, Medium, and Hard problems as animated circular progress rings, along with submission stat cards.

## Features

- Search any public LeetCode username
- Animated progress circles for Easy / Medium / Hard problems solved
- Submission stat cards (total, easy, medium, hard submissions)
- Input validation for usernames
- Graceful error handling with a "No Data Found" fallback state

## Demo

<img width="1277" height="528" alt="image" src="https://github.com/user-attachments/assets/44f06049-2d5b-4902-9a3c-fa1c9b81503f" />


## Tech Stack

- HTML5
- CSS3 (custom properties / `conic-gradient` for progress rings)
- Vanilla JavaScript (Fetch API, async/await)
- [LeetCode GraphQL API](https://leetcode.com/graphql/) (unofficial, via CORS proxy)

## Project Structure

```
leetcode-matrix/
├── index.html
├── leetProgressTracker.css
├── leetProgressTracker.js
└── README.md
```

## Getting Started

### Prerequisites

Since LeetCode's GraphQL endpoint doesn't send CORS headers for browser requests, you'll need a CORS proxy to run this locally. Options:

- Your own lightweight proxy (Cloudflare Worker, Vercel Edge Function, or a small Express server)
- A public proxy service (note: free public proxies are often rate-limited or temporarily locked)

Update the `PROXY_URL` variable in `leetProgressTracker.js` to point to your proxy before running the app.

## Usage

1. Enter a valid LeetCode username in the input field
2. Click **Search**
3. View the user's solved-problem progress and submission stats

### Enabling the CORS Proxy

This project uses `cors-anywhere.herokuapp.com` as a temporary CORS proxy to fetch data from LeetCode's GraphQL API. Since it's a public demo instance, it's locked by default and needs to be manually activated per browser session:

1. Open `leetProgressTracker.js` and copy the value of `proxyUrl`
2. Paste that URL into your browser's address bar and visit it
3. Click **"Request temporary access to the demo server"**
4. Return to the app and enter a LeetCode username to search

## Note: This access is temporary (usually ~1 hour) and tied to your current browser session. If searches start failing again with a `403 Forbidden` error, repeat these steps to re-activate access. This proxy is only recommended for local development/testing. For a production deployment, replace `proxyUrl` with your own CORS proxy (e.g. a Cloudflare Worker or small Express server) — see [Known Limitations](#known-limitations).

## Known Limitations

- Relies on an unofficial GraphQL endpoint that may change without notice
- Requires a working CORS proxy to function
- No caching — every search hits the API fresh

## Roadmap / Ideas

- [ ] Add loading skeletons instead of plain "searching..." text
- [ ] Cache recent searches in localStorage
- [ ] Add dark/light theme toggle
- [ ] Show contest rating and streak data
- [ ] Deploy a small serverless proxy alongside the app

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.


## License

https://github.com/saurabhshar4329
