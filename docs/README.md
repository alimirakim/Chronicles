
# Iris Isle

## Description
Original Inspiration Reference: Fallen London https://www.fallenlondon.com/


## Technologies
* JavaScript
* Python 3
* PostgreSQL
* Flask
* SqlAlchemy
* Alembic
* Marshmallow-SQLAlchemy
* WTForms/Flask-WTF
* React
* HTML/CSS/Sass
* Visual Studio Code

## Feature List
### MVP Features
* User accounts - signup, signing, signout
* CRUD: tale/chronicle, character, material, location, thread, effects, locks
* Threads can cause 'effects' that change the state of various things ()
* Threads can have branching 'actions' to choose from.
* Actions can be 'locked' with various requirements.
* Content can be viewed in short-summary-card galleries.
* Tales can be viewed in chronological galleries showing threads, connecting actions, effects, and locks.



### Stretch Goal Feature 1: Playable Text Adventure
* CRUD: abilities, statuses
* Tales can be 'shared'; a user can start a Tale, create or be given a starting character.
* Tales can be bookmarked, with character and state saved for the user per action.
* Can create a Playable Character for a Tale.
* Navigatable map with locations. Players can change location state, based on accessibility, or be moved by story effects.
* 
* Stores can be created by designating a location, availability, shopkeeper(s), inventory schedule, inventory, and prices.

## Models & Schema

* users
* tales
* threads
* effects - how to connect effects of different kinds? ex. material effect, state effect, location effect...
* actions
* locks - same as for effect
* characters - many joins? characters have many materials, many states, many abilities...
* locations
* materials
* states
* abilities
* tags

* character_materials
* character_states
* character_abilities


databases
blockers - database
today 
build databases

## Routes
### Frontend Routes

| GET | `/` | Splash/Home |
| GET | `/tales/create` | Creation form for tales | -- +characters, locations, materials, threads, choices, abilities, actions, traits, statuses,
| GET | `/tales | 


### Backend Routes
`/users/<int:uid>/


## Wireframes, Templates, Components, Styling
### Theme & Style


### Wireframe Thumbnails



## User Story
User sees splash page describing the purpose, functionality and how to use the app. Can login or signup.
Starts with a default 'Tale'. 
Can choose to create new: location, character, etc..
Any entities can have custom fields added. The field can have a label and a body. The body can be text, number, boolean, image, link, ability
Can create threads and actions, then link threads and actions together. Can add effects to threads and locks to actions.





| COLUMN | CONSTRAINTS |
|--------|-------------|
| id     | SERIAL, PK  |
| story_id |  
| title  |
| body   |
| type   | 
| image  |
| prev   | |
| trial_level |


| effects |
| requirements |



* User accounts
* Can create and save:
  * associations
  * characters
  * locations
  * assets
  * events
  * trials
  * creature - beastiary
  * plant - 
  * dictionary
  * job
  * spell
  * history
  * threads
* Can designate details of a thing's 'dynamic state'
* Create a 'Thread'. One single scene/event description, with potential prev state and following states. The Thread can grant certain changes in state, assets, etc.
* Create a 'Tale'. A tale comes with
* Create 'Experiences', milestones of story that can then be checked for and used as conditionals for other things happening or not.



category name - types of books like biography, map, spellbook, dictionary, beastiary, etc., tarot cards
user
story
name
tag words
appearance
description
image
links


# users
| COLUMN | CONSTRAINTS |
|--------|-------------|
| id     | SERIAL, PK  |
| username | |
| email    |
| hashword |
| birthday |


### characters
| 


## Required Seeder Data