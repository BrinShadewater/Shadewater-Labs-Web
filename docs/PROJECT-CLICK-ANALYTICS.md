# Project click analytics

Open the SQL Editor for the Neon database connected to the Labs site and run this query. Access to the database is required.

```sql
SELECT day, action, source_page, clicks
FROM labs_analytics.project_clicks_daily
ORDER BY day DESC, action, source_page;
```

Days use UTC. The counter covers the BrineSpace play buttons, Try FishMail buttons, the homepage Browse open-source tools button, and the Projects links to the Futureproof case study. It counts clicks, including repeat clicks. The source page is the route that contains the button.

The private table holds daily totals. It stores no visitor identifiers, cookies, referrers, URL parameters, FishMail nicknames, or messages. The FishMail app has no analytics code. The counter covers the links that launch the demo.
