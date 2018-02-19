const createBranch = require('./branch.js');

createBroker = (data) => {

	const Broker = {
		secNumber : parseInt(data.bc_sec_number),
		score : data.score,
		numberOfBranches : data.bc_branches_count,
		sourceId : parseInt(data.bc_source_id),
		name : data.bc_firm_name,
		otherNames : data.bc_other_names,
		finraApprovedRegistrationCount : data.bc_approved_finra_registration_count,
		branchLocations : data.bc_branches.map((branch)=>{return createBranch(branch)}),
	}

	return Broker;
}



module.exports = createBroker;


