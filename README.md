# COGS121 Assignment 2 Spring 16
### Team "F" is for Friends

### DESIGN PRINCIPLES

Discoverability/Signifiers:
While the user is hovering over a dot, the dot will expand signifying that the dot can be clicked. Furthermore, there will be a green border around the dot to make it more obvious. 
When the user clicks on the dot, a card of information displaying Yelp data associated with the location will appear. On the card, a link to the Yelp page for the taqueria will appear and can be clicked. This is where the user can click and find the exact location and information on the place.

Learnability:
Once a user clicks on a node and receives information, they can easily recall what clicking on a node does, and thus they can continuously interact with different nodes in the same way. There is also an information button on the nav bar that leads to help documentation for new users. 

Feedback:
	The graph gives user feedback in the form of loading animations and displaying an information card. When a node is clicked on, a loading animation begins that informs the user that they made an action. When we receive information from the server, it loads text and an image related to the node that the user clicked, giving further feedback to the user action.

Natural Mapping/Mental Metaphors:
The graph is displayed using latitude and longitude, and the nodes are displayed in a such a way that it appears to be the city of San Diego on the California coast on an actual map. Users that have seen a map of San Diego/California before can connect that image with the data plot.

Constraints:
We incorporated the use of dots to limit where the user can hover because it is based on location. This ensures that the user has a sense of how far each location is from each other. Also, we have added the functionality that the user can click on a dot, then display a card on the right-hand side. This ensures that the user can still interact with the map, and gain insight on each location.

Error Prevention/Recovery:

### DESIGN DECISIONS

Decision to use Materialize:
We chose to use Materialize but not a whole template because of our design goal to make the user’s experience as minimal and simple as possible. Materialize supports this design goal with it’s minimalist design. It also incorporates easy to user components. 

Decision to name the application “Taco de Town”:
We chose the name “Taco de Town” because it accurately describes the content of the app (it displays all taco shops in San Diego). It is also a pun on the phrase “talk of the town”.

Decision to use a latitude and longitude graph to represent locations of taquerias:
We decided to measure the locations of the taquerias by latitude and longitude on a graph and represent each location as a dot. We decided to go this route instead of by address because we could easily plot points with latitude and longitude like a map. Also, since we already had experience with graphing based off points, it was easier for the team to integrate this style, especially since the limited time we had. This gives the user a sense of natural mapping, especially if they are local to San Diego because the latitude and longitude points begin to resemble the coast of San Diego.

Ability to click on each data point and see what taqueria it is, using Yelp:
In order to learn more about what the dot represents on the graph, we integrated the Yelp API to display various pieces of information that we thought might be important for an Uber or Lyft driver. We included the rating of the taqueria and the number of reviews, which we thought would correlate to how many people go to the taqueria. We also decided to make each data point clickable instead of hoverable in order to decrease the amount of network traffic from our location, thus making it more responsive. When the dots were hoverable, too many Yelp API GET requests were being made. This allows for better feedback for the users.

Decision to incorporate a Loading gif:
A loading gif is excellent user feedback. Instead of confusing the user and leaving them in the dark when something is loading, a loading gif tells the user that their action completed and is currently in progress. We want our users to have an interactive experience when using our application, so incorporating user feedback is a necessity. 

Decision to integrate Yelp data:
We decided to integrate and display Yelp data to give Uber and Lyft drivers a better look on the quality of taqueria that they are going to. We assume that the more reviews and the higher the rating of the restaurant, the more people will go and therefore need a ride, especially on Taco Tuesdays.

Decision to use Materialize Cards for Tooltip:
The card provides information to the user in a consolidated form factor that clearly separates the information for each taqueria from the background and the graph. 

### MEMBER CONTRIBUTION

Annie Park: Designed the logo, worked on designing the front page

Austin Chinn: Created latitude/longitude graph with nodes using DELPHI data and displayed relevant information from DELPHI database upon mouseover of nodes. Stylized graph.

Gabe Maze-Rogers: Worked on a D3 graph that ended up being too complicated (https://bl.ocks.org/mbostock/7881887) to integrate, worked on design and usability of the graph. 

Emily Shung: worked on designing the front page, tried to overlay google maps but decided against this design decision

Pedro Villaroman: Integrated Yelp API into application to determine the rating, review-count and image of a taqueria when clicking on a point on the map. Also worked on stylizing the dots to make them more interactive.

