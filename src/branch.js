createBranch = (data) =>{
	
	const Branch = {
		address : {
			zip : data.bc_branch_zip,
			street : data.bc_branch_street1,
			coty : data.bc_branch_city,
			state : data.bc_branch_state,
		},
		coordinates : {
			latitude : parseFloat(data.bc_branch_location.split(',')[0]),
			longitude: parseFloat(data.bc_branch_location.split(',')[1])
		},
		branchId : data.bc_branch_id,
		firmId : data.bc_firm_id != undefined ? data.bc_firm_id : 'n/a',
	}

	return Branch;
}


module.exports = createBranch;
