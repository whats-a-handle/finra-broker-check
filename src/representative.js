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
