# ChatIn Client

## Production Update Process

When a developer pushes changes to the master branch, perform the following steps to update the project on the server:

1. Open a terminal or command prompt and execute the following command to connect to the server instance: ssh -i "chatin-client.pem" ubuntu@13.53.97.68

2. Once connected, navigate to the `/home/ubuntu/client` directory: cd /home/ubuntu/client

3. Pull the latest changes from the remote repository: git pull origin

4. Build the project by running the following command: npm run build

5. After a successful build, copy the files from the `/dist/client` directory to the `/var/www/client` directory: cp -r /home/ubuntu/client/dist/client/* /var/www/client

6. After updating the project, restart Nginx using the following command: sudo service nginx restart

