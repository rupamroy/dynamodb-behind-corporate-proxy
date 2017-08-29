# Overview 

This repository shows how to connect and use dynamodb from behind the corporate proxy with custom certificate. This uses the same examples as shown in the [getting stared aws tutorial for Nodejs and dynamodb](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.html).

This process is tested for Linux and Osx , not guaranteed to work in windows.

# Quick start

Clone the repository and npm install

```bash
git clone https://github.com/rupamroy/dynamodb-behind-corporate-proxy.git
cd dynamodb-behind-corporate-proxy
npm install
```

## configuration when when using dynamodb in AWS
Change the AWS Endpoint in the file config.js 

if behind a corporate network with proxy in the config.js file

- provide the proxy url
- provide the proxy authentication (`user:password`), try this only if simple proxy gives you `proxy authentication failed` error
- certs - You need to provide the certificate files for your proxy
    - Obtain your certificate files for the proxy from your system engineering team. Normally these files are .pem files , usually there is a root , issuer and proxy certificate but may vary as per your network configuration.
    - under the `ca` key in the config.js file provide the paths to the certificate files.
- update your dynamodb region and the endpoint url

## configuration when using local dynamodb

You can run a local version of the dynamodb in a docker container for that 

run the docker container

```bash
docker-compose up -d
```

and then replace the contents of the `config,js` with the following

```js
module.exports = {
    region: 'us-east-1',
    endpoint: 'http://localhost:8000'
}
```

##  run the application

```bash
npm install
node src/MoviesCreateTable.js # Creates a table Movie in dynamodb
node src/MoviesLoadData.js # inserts 10 movies of the moviedata.json file
node src/item/MoviesItemOps0* # various operations- look at individual file.
```

## clean up

To stop and kill the container

```bash
docker-compose down 
```

# Tips

To find the count of items in a table

```bash
aws dynamodb scan --table-name Movies
```

To use the dynamodb aws-cli when custom certs are involved then you need to create a ca-bundle and configure the AWS_CA_BUNDLE env variable. 

Taking the example of the three certs as mentioned earlier we can create the `ca-bundle` file by concatenating them into one file

```bash
cat proxy.pem issuer.pem root.pem > company.ca-bundle
```

Then 
```bash
export AWS_CA_BUNDLE=/Users/user_name/Documents/certs/company.ca-bundle
```