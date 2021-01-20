# Coursera Learning Tracker 
*Do-It-Yourself Learning Tracker*

This is the `Node.js` backend and `JavaScript` widget used in 
**The Quantum of Choice: How learners' feedback monitoring decisions, goals and self-regulated learning skills are related** 
by Jivet, Wong, Scheffel, Valle Torre, Specht and Drachsler (LAK21).

The values of the indicators are extracted from Coursera and updated on a daily basis by our [Processing Module](https://github.com/mvallet91/coursera-tracker-processing).

## Node Server
The backend in `node_server` consists of the `Node.js` server, which uses [`winston`](https://github.com/winstonjs/winston) for logging, managed by [`pm2`](https://github.com/Unitech/pm2) in a Linux machine; a [`MongoDB`](https://www.mongodb.com/) database and [`nginx`](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/) to handle all app requests.  
- Every time a student accesses the widget via Coursera, it will request the learner's indicators using their `hashed_id`. 
- The `node` app will get all the indicator values from `mongo`, including the indicator selection of the given student.
- These values are returned to the widget for display.
- Whenever a student changes their indicator selection (or the first time) the `node` app will store these new values in `mongo`.

## DIY Widget
The widget in `app.js` is written in `JavaScript` with `JQuery`, with the whole structure in `learning_tracker.html` and custom style in `lt.css`.
