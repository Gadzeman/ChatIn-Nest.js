# ChatIn Server

## Production Update Process

When a developer pushes changes to the master branch, perform the following steps to update the project on the server:

1. Open a terminal or command prompt and execute the following command to connect to the server instance: `ssh -i "chatin-server.pem" ubuntu@13.50.228.84`

2. Once connected, navigate to the `/home/ubuntu/server` directory: `cd /home/ubuntu/server`

3. Pull the latest changes from the remote repository: `git pull origin`

4. Run `docker-compose -f docker-compose.server.yml up -d --build` to run updated server in docker container

# ChatIn DB

## Running

Chatin database is running on a separated ec2 instance with private subnet by docker compose (docker-compose.db.yml this file is located in server folder)

If you need to update a docker-compose.db.yml file then you need:

1. Open a terminal or command prompt and execute the following command to connect to the server instance: `ssh -i "chatin-server.pem" ubuntu@13.50.228.84`

2. Once connected, navigate to the `/home/ubuntu` directory: `cd /home/ubuntu`

3. Connect to local instance: `ssh -i "chatin-db.pem" ubuntu@10.0.2.60`

4. Then you will see docker-compose.db.yml file in `/home/ubuntu`

5. If you need to update this file you should to run `docker-compose down`

6. Run `exit` to back to server instance

7. Navigate to `/home/ubuntu` and run `scp -i chatin-db.pem server/docker-compose.db.yml ubuntu@10.0.2.60`  

8. Connect to local instance: `ssh -i "chatin-db.pem" ubuntu@10.0.2.60`

9. Then you will see docker-compose.db.yml file in `/home/ubuntu`

10. Run `docker-compose -f docker-compose.db.yml up -d --build`
