# DjangoReactDashboard
A simple web app that displays historical weather data in a line chart (Plotly) and allows the user to select the date range, temperature units and data granularity (daily/monthly).  The frontend uses React, with the backend powered by Django with Pandas used for data transformation.
This example can be quickly expanded to handle multiple data sets and provide more complex data visualization.

## Motivation:
Data exploration and analysis is often done in Python using the popular Pandas library, while Plotly is often a go-to tool for visualization.  When we want to turn this work into a persistent report, Django is a good choice, as it allows us to keep using Python and even re-use much of the existing code that relies on Pandas.
React can then present the results to the end user in an efficient manner and allows for interactive components.
Plotly JavaScript syntax will be familiar enough to anyone who has used it in Python, and any given chart can be quickly integrated into a React component.
