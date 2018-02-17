createBrokerCheck = () =>{

	const BrokerCheck = {

		endpoint : 'https://doppler.finra.org/doppler-lookup/api/v1/search/',
		createBrokerage : require('./broker.js'),
		rawParameters : {},
		translateParameters : (prettyParameters) =>{

			const rawParameters = {
				query : prettyParameters.query,
				city : prettyParameters.city,
				state : prettyParameters.state,
				nrows : prettyParameters.limit > 0 ? prettyParameters.limit : 10,
				r : prettyParameters.radius > 0 ? prettyParameters.radius : 25,
				sort : prettyParameters.sortBy != undefined ? prettyParameters.sortBy : 'score+desc',
			} 
			
			for(key in rawParameters){
				if(rawParameters[key] === undefined){
					delete rawParameters[key];
				}
			}

			return rawParameters;

		},

		generateQueryURL : (parameters,searchType,queryURL) =>{
			queryURL += searchType + '?';
			for(key in parameters){
				queryURL += key + '=' + parameters[key] + '&';
			}

			return queryURL;
		},
		queryFirms : function(parameters, callback) {

			const Request = require('request');	
			const rawParameters = this.translateParameters(parameters);
			const queryURL =  this.generateQueryURL(rawParameters,'firms',this.endpoint);
			
			Request(queryURL, (error, response, data) =>{

				if(error){
					console.log('An error occurred when using the following queryurl:\n' + queryURL);
					console.log('Error: ' + error);
					console.log('Response: ' + response);
					return;
				}
				else{
					console.log(queryURL);
					if(data!=null){
	
						const rawResultArray = JSON.parse(data).results.BROKER_CHECK_FIRM.results;
						const parsedBrokers = rawResultArray.map((broker) => { return createBrokerage(broker.fields)});
						callback(parsedBrokers);
					}
					else{
						console.log('No results found');
					}

				}

			});

		}


	}

	return BrokerCheck;

}

module.exports = createBrokerCheck;


