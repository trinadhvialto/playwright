@mytrip
Feature: Mytrips Trip Creation

    Scenario: create trip
        Given Login to MyTrips Application
        Then Verify vialto logo, mytrips logo, Travel Overview, Trip History, Account Settings, Support and Sign Out are displayed in Navpane
        When select Home and Destinatio countires and select departure and Arrival dates
        # Then verify trip created successfully

