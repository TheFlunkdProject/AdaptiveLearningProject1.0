
<?php

function findStringFromTable($search,$table) {
	$search = str_replace(" ", "%", $search);
	$jsonOut = array();
	
	// Create connection
	$con=mysqli_connect("localhost","learnfla_aplia","q23rp98U","learnfla_testdb");

	// Check connection
	if (mysqli_connect_errno()) {
	  $jsonOut['messages'] .= "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	$jsonOut['finalSearchString'] = $search;
	
	$i = 0;
	$numberOfResults = 5;
	
	/* $sqls = array();
	$sqls[] = "SELECT PID, Name, Description FROM $table WHERE PID LIKE '$search' LIMIT 0, $numberOfResults";
	$sqls[] = "SELECT PID, Name, Description FROM $table WHERE Name LIKE '$search%' LIMIT 0, $numberOfResults";
	$sqls[] = "SELECT * FROM $table WHERE Description LIKE '$search%' LIMIT 0, $numberOfResults";
	$sqls[] = "SELECT * FROM $table WHERE Name LIKE '%$search%' LIMIT 0, $numberOfResults";
	$sqls[] = "SELECT * FROM $table WHERE Description LIKE '%$search%' LIMIT 0, $numberOfResults"; */
	
	$sql = "
		SELECT
			*,
			IF (PID LIKE '$search', 1, 0) AS One,
			IF (Name LIKE '$search%', 1, 0) AS Two,
			IF (Description LIKE '$search%', 1, 0) AS Three,
			IF (Name LIKE '%$search%', 1, 0) AS Four,
			IF (Description LIKE '%$search%', 1, 0) AS Five
		FROM $table
			WHERE PID LIKE '$search' OR Name LIKE '%$search%' OR Description LIKE '%$search%'
		ORDER BY One DESC, Two DESC, Three DESC, Four DESC, Five DESC 
		LIMIT 0, $numberOfResults";
		
	//foreach($sqls as $sql) {
		$result = mysqli_query($con,$sql);
		while($row = mysqli_fetch_array($result)) {
			$jsonOut[$i] = $row;
			$i++;
		}
		//if ($i > $numberOfResults) break;
	//}

	return $jsonOut;

	mysqli_close($con);
}

?>