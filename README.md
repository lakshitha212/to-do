## Installation
with docker

1. Clone the repo
   ```sh
   git clone https://github.com/lakshitha212/to-do.git
   ```
2. ``` cd to-do ```
3. ``` docker image prune -f  ```
4. ``` docker-compose up --force-recreate --build -d  ```


## Front End Info

- Exposed port 3000
 </br> URL : http://localhost:3000/
 </br> Demo login credentials : Email-eve.holt@reqres.in  Password-cityslicka
 </br> Other accounts : george.bluth@reqres.in / janet.weaver@reqres.in / emma.wong@reqres.in / charles.morris@reqres.in / tracey.ramos@reqres.in
 </br> Read user credentials from https://reqres.in/
 </br> Front-end language ReactJs

## Back End Service Info

- Exposed port 8082
  </br> URL : http://localhost:8082/
  </br> Development language Nodejs (Used Clean Architecture of Uncle Bob)
  </br> Datasource : MongoDB

## mongoDB Info

- Exposed port 27017

## UI Framework
- Material-UI
