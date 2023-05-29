# Internship Manager
A web application to manage applicants and its roles in the summer internship of a company.

## Prerequisites

 - Docker: [Installation Guide](https://docs.docker.com/get-docker/)
 
 ## Getting Started
 
 1. Clone the repository:
 ```bash
 git clone https://github.com/jogui2143/Redlight_Internship.git
 cd Redlight_Internship
  ```
  
2. Build and start the application:
  ```bash
  docker-compose up --build
   ```
   This command will download the necessary Docker images, build the application and start the containers.

3. Build Database and seed it:
   ```bash
   docker-compose exec web bash
   rails db:create db:migrate db:seed
   ```
   This command creates the Database and loads it with predefined applicants and roles.

4. Access the application:
	With the containers running, you should be able to access the application on http://localhost:3001 .

5. If you want to stop the application:
	```
	docker-compose down
	```
	or use ctrl + c in the terminal that is running the docker .

	
