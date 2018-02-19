createRepresentative = (data) => {

	const Representative = {
		createBranch : require('./branch.js'),
		firstName : data.bc_firstname,
		lastName :  data.bc_lastname,
		middleName : data.bc_middlename,
		primaryEmployer : JSON.parse(data.bc_default_employment),
		sourceID : parseInt(data.bc_source_id),
		currentEmployerRegistrationDate : new Date(data.bc_industry_cal_date),
		hasDisclosures : data.bc_disclosure_fl === 'Y' ? true: false, 
		currentEmployments : data.bc_current_employments.map((branch) =>{return createBranch(branch)}),
	}


	return Representative;
}

module.exports = createRepresentative;
//STATE BASED QUERY EXAMPLE

/*
hl:true
includePrevious:true
json.wrf:angular.callbacks._2
nrows:12
r:25
sort:score desc
state:CA
wt:json

*/

//RESPONSE
/*
 {
"bc_firstname": "JOHN",
"bc_default_employment": "{\"bc_branch_city\":\"GALT\",\"bc_branch_zip\":\"95632\",\"bc_firm_name\":\"NORTHWESTERN MUTUAL INVESTMENT SERVICES, LLC\",\"bc_branch_state\":\"CA\",\"bc_firm_id\":2881,\"bc_branch_id\":\"246490\"}",
"bc_employments_count": 1,
"bc_ia_scope": "NotInScope",
"bc_source_id": "1180417",
"bc_lastname": "FIGLAR",
"bc_industry_cal_date": 433483200000,
"bc_approved_finra_registration_count": 1,
"bc_middlename": "PAUL",
"bc_scope": "Active",
"bc_disclosure_fl": "N"
"bc_current_employments": [
{
"bc_reg_begin_date": 433569600000, //epoch time MS
"bc_branch_zip": "95632",
"bc_branch_street1": "729 KILLEBREW WAY",
"bc_branch_state": "CA",
"bc_firm_name": "NORTHWESTERN MUTUAL INVESTMENT SERVICES, LLC",
"bc_branch_city_alias": [
"GALT"
],
"bc_ia_only": "N",
"bc_branch_city": "GALT",
"bc_firm_bc_scope": "ACTIVE",
"bc_branch_location": "38.273407,-121.224374",
"bc_firm_ia_scope": "ACTIVE",
"bc_branch_id": "246490",
"bc_firm_id": "2881"
}
],
\
},
"highlightedFields": {}
*/