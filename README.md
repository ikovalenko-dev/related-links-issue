# related-links-issue
Repository to test related links change event issue

# Steps to reproduce issue
* Install extension to organization
* Open work item form
* Add some related items with any link type
* Save work item
* Open development console (F12 for chrome browser)
* Try to remove any relation
* Console log will show, that result provided to onFieldChanged event handler differs from result returned from getWorkItemRelations function

# Expected behavior
getWorkItemRelations function should return current work item relations when removing related items 

# Notes
If relations are added/removing within one work session (without saving current work item), than results are correct. The issue could be found only when removing some related items after work item save.

# Build
* ```npm run build``` - to build solution
* ```npm run watch``` - to watch and build

# Create extension package
* ```npm run pack``` - .vsix package will be created and stored to ./bin folder
* ```npm run pack:dev``` - package for local development
