Keycloak-node.js integration 
---------------------------
Realm: Rythmos-RESTAPI
Client: Store-transactions

Roles: admin, customer, product 

Admin controls: admin, user, product CRUD operations
http://localhost:3000/admin

Customer controls: Product get operation
http://localhost:3000/customer

run index.js using npm run start-watch
http://localhost:3000

run keycloak server keycloak-10.0.2/bin/standalone.sh
http://localhost:8080
