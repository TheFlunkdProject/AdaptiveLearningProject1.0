<!--<sql:setDataSource var="snapshot" driver="com.mysql.jdbc.Driver"
     url="jdbc:mysql://localhost/learnfla_testdb"
     user="learnfla_aplia"  password="q23rp98U"/>
	 -->
<?php
// Create connection
$con=mysqli_connect("localhost","learnfla_aplia","q23rp98U","learnfla_testdb");

// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}


// Create database
/* $sql="CREATE DATABASE my_db";
if (mysqli_query($con,$sql)) {
  echo "Database my_db created successfully";
} else {
  echo "Error creating database: " . mysqli_error($con);
} */


// Create table
$sql = "CREATE TABLE Persons 
(
PID INT NOT NULL AUTO_INCREMENT, 
PRIMARY KEY(PID),
FirstName CHAR(15),
LastName CHAR(15),
Age INT
)";

// Execute query
if (mysqli_query($con,$sql)) {
  echo "Table persons created successfully<br>";
} else {
  echo "Error creating table: " . mysqli_error($con);
}


mysqli_query($con,"INSERT INTO Persons (FirstName, LastName, Age)
VALUES ('Peter', 'Griffin',35)");

mysqli_query($con,"INSERT INTO Persons (FirstName, LastName, Age) 
VALUES ('Glenn', 'Quagmire',33)");




$result = mysqli_query($con,"SELECT * FROM Persons");

while($row = mysqli_fetch_array($result)) {
  echo $row['PID'] . $row['FirstName'] . " " . $row['LastName'] . $row['Age'] ;
  echo "<br>";
}



// Drop table
$sql="DROP TABLE Persons";

// Execute query
if (mysqli_query($con,$sql)) {
  echo "Table persons dropped successfully";
} else {
  echo "Error dropping table: " . mysqli_error($con);
}
?>




<?php
$con=mysqli_connect("localhost","learnfla_aplia","q23rp98U");

// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

mysqli_close($con);
?>