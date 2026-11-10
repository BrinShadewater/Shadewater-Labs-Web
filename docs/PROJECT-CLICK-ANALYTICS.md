# Project click analytics

Open the SQL Editor for the Neon database connected to the Labs site and run this query. Access to the database is required.

```sql
SELECT day, action, source_page, clicks
FROM labs_analytics.project_clicks_daily
ORDER BY day DESC, action, source_page;
```

Days use UTC. The counter covers the BrineSpace play buttons, Try FishMail buttons, the homepage Browse open-source tools button, and the Projects links to the Futureproof case study. It counts clicks, including repeat clicks. The source page is the route that contains the button.

The private table holds daily totals. It stores no visitor identifiers, cookies, referrers, URL parameters, FishMail nicknames, or messages. The FishMail app has no analytics code. The counter covers the links that launch the demo.

## Tagged ChatGPT landings

Use the same private Neon SQL Editor to view the daily landing totals.

```sql
SELECT day, landing_page, visits
FROM labs_analytics.chatgpt_visits_daily
ORDER BY day DESC, landing_page;
```

The counter increments when someone opens a Labs page in a JavaScript-enabled browser with `utm_source=chatgpt.com`. The total counts landing visits, and each day uses UTC. The database stores only the day, canonical landing path, and count. Refreshes, browser history navigation, and visits inside the standalone FishMail app fall outside this count. A tagged URL can also be shared directly, so the totals reflect the tag as received.
