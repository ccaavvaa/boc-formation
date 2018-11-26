* clone https://github.com/ccaavvaa/boc-formation.git
* switch local git:  tag 'lesson01' et créer une branche
* install une base MDR dans http://localhost/MDR/Basic
* installer les paquets:
````
yarn install
````

* lancer le script de création des tables dans MDR:
````
cd schema\Models\Basic
create_schema.bat
````

* compiler et lancer les tests
````
gulp test
````

* lancer couverture des tests
````
npm run coverage
````
