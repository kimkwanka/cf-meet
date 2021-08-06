Feature: Show / hide an events details

Scenario: User can show an event's details
Given the event's details are hidden
When the user clicks on the event's Show Details button
Then the event's details will be shown

Scenario: User can hide an event's details
Given the event's details are shown
When the user clicks on the event's Hide Details button
Then the event's details will be shown