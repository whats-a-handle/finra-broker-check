# finra-broker-check

I wanted to see if it was possible to programmatically run searches against FINRA's Brokercheck database for academic purposes (learning to work with APIs). I didn't see any documentation for their API, so I figured I'd try my hand at making my own sort of wrapper for their search tool. The goal is for a user to be able to run queries using the BrokerCheck API to look up Firms as well as Registered and Licensed Reps. This tool was created in the academic context for learning purposes only. You use it at your own risk with no gurantee from the author and no guarantee that the data you're receiving is correct. Prior to performing any searches against FINRA's Broker Check API, be sure to read the Broker Check Terms of Use/Agreement which can be found here to ensure you are in compliance with their terms found on the actual Broker Check site: https://brokercheck.finra.org/



## Getting Started

Please note that this is a work in progress. You can only search Firms at this time. 
Not all of the query parameters are available. I've listed what I've currently tested out.

### Prerequisites


```
Node.js
NPM "Request" module
```


## API

### Setting Up Your Query

```
Current Available Parameters:
-query 
	-string  "Firm Name"

-city 
	-string  "Los Angeles"

-state 
	-string  "CA"

-radius 
	-Number of miles to search around e.g. 10

-limit 
	number of results per query. 

-offset 
	-search records following the records at this position

//Example of structuring your parameter object when passing into the query function
//Not all parameters are necessary
parameters = {
	query : 'Firm Name',
	city : 'Los Angeles',
	radius : 10,
	limit : 15,
	offset : 0
}

```

### Searching for Firms

You can currently only search via 2 letter state abbreviation or City, but I will be adding Postal/ZipCode soon. 
The FINRA BrokerCheck converts ZipCodes to latitude/longitude coords and then does a similarity search of the query string against firms in the area.

The below snippet shows how to import the module's function, create a new BrokerCheck object and run a query and print its results.

```
//import module's function
const createBrokerCheck = require('./src/brokerCheck.js');

//create and return a new BrokerCheck object
const BrokerCheck = createBrokerCheck();

//run our query and print out the results
BrokerCheck.queryFirms({query:'FirmName',city:'Los Angeles', radius : 10},(results) =>{
 	results.map((brokerage) => {console.log(brokerage)})
 });



```

### (WIP) Searching Representatives 


## Authors

* **Will aka whats-a-handle** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


