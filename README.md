# finra-broker-check

Programmatically run searches against FINRA's Brokercheck database with this API wrapper. I didn't see any documentation for their API, so I figured I'd try my hand at making my own wrapper for their search tool. Users are able to run queries using the BrokerCheck API to look up Firms as well as Registered and Licensed Reps. 

<strong>Prior to performing any searches against FINRA's Broker Check API, be sure to read the Broker Check Terms of Use/Agreement</strong> which can be found here to ensure you are in compliance with their terms found on the actual Broker Check site: https://brokercheck.finra.org/

## Currently Working
1. Query Firms and related branches
2. Query Registered Representatives - (not yet including Disclosures/Licenses)

## Coming Soon
1. Disclosures/Complaints with details
2. Licenses per Rep
3. Detailed Contact Information for main branch

## Getting Started
This is a work in progress, so please be considerate.
Not all of the query parameters are available. I've listed what I've currently tested out.

### Prerequisites and Installation
1. Node.js
2. NPM

```
npm install finra-broker-check --save
```

### Import into your code
```
//returns a function definition that creates a BrokerCheck object
const createBrokerCheck = require('finra-broker-check'); 

//returns a BrokerCheck object
const brokerCheck = createBrokerCheck();
```
## API

### Setting Up Your Query

```
Current Available Parameters:
-query : string  "Firm or Representative Name"

-city : string  "Los Angeles"

-state : 2 letter abbreviation: "CA"

-radius : Number of miles to search around e.g. 10

-limit : Number of results per query

-offset : Number (starts at 0)

//Example of structuring your parameter object when passing into the query function
//Not all parameters are necessary

	parameters = {
		query : 'Firm or Represenative Name',
		state : 'CA',
		radius : 10,
		limit : 15,
		offset : 0
	}

```

### Searching for Registered Representatives
You can currently search Representatives to get top-level information such as the current Firm, other firms at which they work and whether
or not they have any complaints. The complaint/disclosure data is accessible, but I have not yet parsed that out, as it requires a different API query.

You can also retrieve the current licenses held, but that is also found in a separate API query. This will also be worked on soon.

```
//import createBrokerCheck function
const createBrokerCheck = require('finra-broker-check');

//create and return a new BrokerCheck object
const BrokerCheck = createBrokerCheck();

//This query will return any representatives with a similar name within California
//It will return them 10 at a time
BrokerCheck.queryIndividuals({query : 'Rep Name',state:'CA', radius : 25, limit: 10},(results) =>{
 	results.map((representative) => {console.log(representative)})
 });



```

### Example of Individual Query Result
```
const Representative = {
		firstName : First Name,
		lastName :  Last Name,
		middleName : Middle Name,
		primaryEmployer : Main/Primary Broker Dealer (?),
		sourceID : FINRA Broker Check ID,
		currentEmployerRegistrationDate : Date First Registered with primary Brokerage,
		hasDisclosures : Disclosures Filed - True or False, 
		currentEmployments : Array of Branch Objects,
	}
```

### Searching for Firms

You can currently only search via 2 letter state abbreviation or City, but I will be adding Postal/ZipCode soon. 
The FINRA BrokerCheck converts ZipCodes to latitude/longitude coords and then does a similarity search of the query string against firms in the area.

The below snippet shows how to import the module's function, create a new BrokerCheck object and run a query and print its results.

```
//import createBrokerCheck function
const createBrokerCheck = require('finra-broker-check');

//create and return a new BrokerCheck object
const BrokerCheck = createBrokerCheck();

//run our query and print out the results
BrokerCheck.queryFirms({query:'FirmName',city:'Los Angeles', radius : 10},(results) =>{
 	results.map((brokerage) => {console.log(brokerage)})
 });



```

### Example of Broker Query Result

```
//This is returned by our queryFirm function.
// Question marks note that I'm not sure what this piece of data means.
//Please feel free to clarify if you have any ideas

const Broker = {
		secNumber : SEC ID number,
		score : score given to the firm by FINRA (?),
		numberOfBranches : Number of branches,
		sourceId : FINRA Broker Check ID,
		name : Name of the firm,
		otherNames : Firm aliases or other names (will always include firm name),
		finraApprovedRegistrationCount : (?),
		branchLocations : Array of Branch Objects
	}

```

### Branch Object
Branches are offices/places of employment. I've parsed them into Branch objects for easy utilization. 
Note that Firm Queries do not return a firmId but Individual Queries do.

Below is how Branches are returned.
```
const Branch = {
		address : {
			zip : Zip/Postal Code
			street : Street 1,
			city : City,
			state : State,
		},
		coordinates : {
			latitude : Latitude Coordinates
			longitude: Longitude Coordinates
		},
		branchId : Branch ID
		firmId : Firm ID (only returned on Individual Rep Queries)
	}
```

## Authors

* **Will aka whats-a-handle** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


