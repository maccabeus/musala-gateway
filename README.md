# A simple Gateway Management Server
This is a `Simple Gateway Management` API section of our application. The application utilizes Javascript / Nodejs framework , while using `MongoDB` for database management.

The default application `port` is `4001`.

## Setting up local database
To setup local database for the project, please check the `./resource/db` folder for sample `mongo` documents.
The names of these documents corresponds to the name used within this `application`. The `mongodb` database name must be `musala`.

Also, check the `/.env` file to see the `Environment variables` used within the application.

## Running Automated build during development
This application uses `typescript`,  `watchman`, and `babel` to setup an automated build `environment`
To automate the `build process`, while developing,  run the following `command` in your `CLI` before you start code editing.

```bash
npm run tsc 

```

## Running application locally
You can deploy the application locally by following te following steps. 

### Creating a local Docker Image
To create an image of our application locally, run the following command:
```bash
docker build -t musala/musala/gateway:1.0.0 --target=prod .
```
Note: that we specifically targeted the `prod` build section of our `Dockerfile`. To create a test image, run the following command:
```bash
docker build -t musala/musala/gateway:1.0.0 --target=test .
```
The above will create a test image that can also be run with test entries.

#### Running the Docker Image
To run application, enter the following command. Please `note` that you must have installed `Docker Desktop` before you can perform these steps. 
```bash
docker run -dp 4001:40001  musala/musala/gateway:1.0.0
```

### Run application without creating docker image
Run the following commands to install dependencies
```bash
npm install
```
Then run the command below to start the `gateway` server
```bash
npm start
```

Once the application starts, you can check the following URL to ensure that the server is working:
 - [link]http://localhost:4001/api/v1

## Available API

The following API are available within the application. Don't forget to use your local development server path 
if you are running application locally.

 ### Gateway API
 - return the list of all gateways added
 - [link]http://localhost:4001/api/v1/gateway
  
 - Get the information about a specified gateway using the `gatewayId`
 - [link]http://localhost:4001/api/v1/gateway/:gatewayId

 - To add a new gateway, make a `POST` request to the link with the following data in the post body
 - [link]http://localhost:4001/api/v1/gateway
  
 ```js
 const postData= {
     gatewayName: "Gateway Name",
        serialNumber: "Serial Number",
        ip: "valid IPV4 address"
 }
 ```
 - Delete an existing gateway using the provided  `gatewayId`
 - [link]http://localhost:4001/api/v1/gateway/delete/:gatewayId
  
  ### Devices API
 - Returns the list of all `devices` added to a specific `Gateway` using the `gatewayId` provided
 - [link]http://localhost:4001/api/v1/devices/:gatewayId
  
 - Get the details of  a specific `device` added to a  `Gateway`. We must provide the `gatewayId` and the `deviceId` of the device to retrieve
 - [link]http://localhost:4001/api/v1/devices/find/:gatewayId/device/:deviceId
  
 - Add a new `device` to a `gateway`. This is a `POST` method and requires the following `post body`:
```js
 const postData= {
     vendor: "Device Vendor Name",
    status: "Device Status", // "online" | "offline"
 }
 ```

 - Delete a `device` from a `gateway`. Use the `HTTP` method `DELETE`
 - [link]http://localhost:4001/api/v1/devices/delete/:gatewayId/device/:deviceId