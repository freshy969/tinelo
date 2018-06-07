<?php
$queries = file_get_contents("sql-1.2.sql");
$mysqli->multi_query($queries);
while ($mysqli->next_result()) {
    if (!$mysqli->more_results()){
        break;
    } 
}
?>