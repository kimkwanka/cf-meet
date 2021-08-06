Feature: Specifiy the number of events shown

Scenario: The default number of events shown is 32
Given the list of events has been loaded
When the user has not changed the number of events shown
Then the number of event items visible in the list is 32

Scenario: User can change the number of events visible
Given the list of events has been loaded
When the user changes number of events shown
Then the number of event items visible changes according to the user's input