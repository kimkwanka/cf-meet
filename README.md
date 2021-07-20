## cf-meet
Serverless, progressive web application (PWA) with React using a test-driven
development (TDD) technique. The application uses the Google Calendar API to fetch
upcoming events.


## Built With
- React

## User Stories / Gherkin Scenarios

### Feature 1

_As a user, I would like to be able to filter events by city so that I can see the list of events
that take place in that city._

**Scenario:** User filter event by city

**Given** the list of events has been loaded

**When** user enters a city

**Then** the events list shows only events pertaining to that city

### Feature 2

_As a user,
I would like to be able expand / collapse an event
so that I can see more or less of its details._

**Scenario:** User can expand / collapse an event

**Given** the list of events has been loaded

**When** user clicks on "Toggle details" button for an event

**Then** the event element will be expanded or collapsed to show / hide the even details

### Feature 3

_As a user,
I would like to be able to change the number of events visible
so that I can see more or fewer events at once._

**Scenario:** User can change the number of events visible (default: 32)

**Given** the list of events has been loaded

**When** user changes the number of events in the corresponding text field

**Then** the number of visible events in the list changes accordingly

### Feature 4

_As a user,
I would like to be able to use the app offline
so that I can still use it **When** there is no internet connection._


**Scenario:** User can use the app offline

**Given** the user has no internet connection

**When** there is previously cached data available

**Then** show the cached data

**When** the user attempts to change settings (city, time range)

**Then** show an error message


### Feature 5

_As a user,
I would like to be able to see a chart with the number of upcoming events in each city
so that I know about each city's events._

**Scenario:** User can see a chart of upcoming events in each city

**Given** the list of events has been loaded

**When** the user clicks on the "more" button

**Then** a chart of all upcoming events is shown