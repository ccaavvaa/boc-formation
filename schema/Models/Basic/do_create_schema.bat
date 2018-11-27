REM Basic
curl -v -H "Content-Type: application/json" --data @Person.json "%1/odata/$entities"
curl -v -H "Content-Type: application/json" --data @Project.json "%1/odata/$entities"
