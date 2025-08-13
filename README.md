# Take-Home Assignment: Implement a Table in React

### Natalie Rekai

For this assignment I have made two tables - the one is built using React's AG Grid library and the other was custom built by me without component libraries. I chose to include both because the first demonstrates efficient problem solving - finding the most efficient solution to the assignment that checks all the boxes - and the second lets me highlight my own hard-coding skills.

To create the data I used FakerJS, but I implemented data retrieval in two different ways. 

### Table One
Built using [AG Grid](https://www.ag-grid.com/) this Table fulfills all the requirements of the assignment:
- All requested column values (including non-persistent Full Name and calculated DSR)
- Infinite Scroll
- Drag and Drop column-ordering
- Sortable rows using each column
- 500+ rows of data

I chose AG Grid because it offered drag and drop columns and infinite scroll in it's basic features, as well as many other customizations. Unfortunately AG Grid library does not allow column sorting function while using infinite scroll, so I implemented a checkbox to toggle between infinite rows and paginated rows with sortable columns.

Infinite scroll is usually implemented to reduce load time when fetching data. To better demonstrate this functionality I added a pre-populated API/data.json file using data from Faker, to more accurately recreate the environment a table like this would be used.

### Table Two
Built without any component libraries, each component was written by me. It does not meet all the requirements of the assignment, but it includes:
- All requested column values (including non-persistent Full Name and calculated DSR)
- Pagination with optional row-count display
- Sortable rows using each column
- 500+ rows of data

Despite it not fulfilling the brief I chose to include it because I wanted to demonstrate my abilities working with limited tools. Instead of infinite scroll I included pagination to manage large datasets. In this example I fetch the table data calling Faker directly.