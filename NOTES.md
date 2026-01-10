# Project Notes (Simple Summary)

## What I did and why (2-3 key steps)
1) Added page navigation so the app has a Home page and a Profile page.
2) Built a Profile layout with a user sidebar and a full list of items.
3) Connected the add/delete buttons to a simple mock server so items can be saved and removed.

## Challenges and how I fixed them (1-2)
- The add button did nothing because the image link was not a valid URL. Fix: use a full link like `https://...`.
- The mock server was not installed or running. Fix: install `json-server` and run it in a second terminal.

## AI use and how I used it responsibly
- I used AI to explain steps, spot errors, and make small code changes.
- I reviewed each change and kept it small to avoid breaking the project.

## Results
- The header links now go to Home and Profile.
- The Profile page shows user info and all items.
- Items can be added and deleted through the mock server.

## Lessons learned
- The app needs a running server to save and load items.
- Simple mistakes like invalid URLs can block a form.
- Separating UI into components makes the app easier to grow.

## Possible improvements
- Add a confirmation step before deleting items.
- Show a loading message while data is fetching.
- Add better error messages when the server is off.
