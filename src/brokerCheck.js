createBrokerCheck = () =>{

	const BrokerCheck = {
		endpoint : 'https://doppler.finra.org/doppler-lookup/api/v1/search/',
		//firmEndpoint : 'https://doppler.finra.org/doppler-lookup/api/v1/search/firms?',
		//locationEndpoint : 'https://doppler.finra.org/doppler-lookup/api/v1/lookup?',
		//indivudalEndpoint : 'https://doppler.finra.org/doppler-lookup/api/v1/search/individuals?',

		searchType : {
			firms : 'firms',
			individuals : 'individuals',
			lookup : 'lookup'
		},

		parameters : {

				lat:34.146829,
				lon:-118.138157,
				nrows:12,
				query:'scottrade',
				r:25,
				sort:'score+desc',
			
		},

		query : (endpoint,searchType,parameters) =>{

			const BrokerCheck = this;
			const Request = require('request');
			let queryURL = endpoint + searchType + '?';

			for(key in parameters){
				queryURL += key + '=' + parameters[key] + '&';
			}

			

			Request(queryURL, (error, response, data) =>{

				if(error){
					console.log('An error occurred when using the following queryurl:\n' + queryUrl);
					console.log('Error: ' + error);
					console.log('Response: ' + response);
					return;
				}
				else{
					console.log(queryURL);
					console.log('------------------------------------');
					console.log(JSON.parse(data).results.BROKER_CHECK_FIRM.results);
				}

			});



		}


	}

	return BrokerCheck;

}

const BrokerCheck = createBrokerCheck();

BrokerCheck.query(BrokerCheck.endpoint,BrokerCheck.searchType.firms,BrokerCheck.parameters);


//module.exports = createBrokerCheck;


