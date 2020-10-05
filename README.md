## Installation

Run `yarn` or `npm install` in the root directory. Then run `yarn start` or `npm start`

## Description

Created component to edit values inline. This component should appear as a normal text on the page, editable when clicked and displaying result of the action triggered by edit.

**NOTE:**
It's not using any back end service and response is mocked using promises

### Wireframe

![Wireframe/Algorithm](InlineEdit_Wireframe_Algorithm.jpg)

## The way app works

- Static text displays current value
- Clicking on static text will make it editable
- Clicking out of the field or pressing Enter will confirm the change
- Status indicator will display beside the text to notify user
  - Loading - change has been submitted
  - Success - change accepted
  - Error - change refused
- On error a message will display under the text
