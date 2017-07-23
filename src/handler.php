<?php

	$_POST = json_decode(file_get_contents('php://input'), true); 

    // $link = mysqli_connect("s3.ho.ua", "suvorovs88", "D7Gb9mzRhg", "suvorovs88");
    $link = mysqli_connect("localhost", "suvorovs88", "", "testEpicenter");
    mysqli_set_charset($link, "utf8");


    if (isset($_GET['id'])) {
    	$id = $_GET['id'];


	    if ($link) {
	    	$items = [];
	    	$itemQuery = $link->query(" SELECT * FROM `items` WHERE `id` = '$id' ");
	    	$row = mysqli_fetch_assoc($itemQuery);
	        $items = $row;
	        
	        $item_colors = [];
	        $color_labels = [];
	        $itemColorsQuerry = $link->query(" SELECT `color`, `colorDescription` FROM `item_color` WHERE `item_id` = '$id' ");

	    	for($i = 0; $i < mysqli_num_rows($itemColorsQuerry); $i++){
	            $row = mysqli_fetch_assoc($itemColorsQuerry);
	            $item_colors[$i] = $row['color'];
	            $color_labels[$i] = $row['colorDescription'];
	        }
	    
	        $item_img_urls = [];
	        $itemImgUrlQuerry = $link->query(" SELECT `url`, `color_type` FROM `item_img` WHERE `item_id` = '$id' ");
	    	for ($i=0; $i < mysqli_num_rows($itemImgUrlQuerry) ; $i++) { 
	    		$row = mysqli_fetch_assoc($itemImgUrlQuerry);
	    		$item_img_urls[$i] = $row;
	    	}
	    	$test =[];

	    	for ($i=0; $i < count($item_colors); $i++) { 
				$counter = -1;
	    		for ($k=0; $k < count($item_img_urls); $k++) {
					$counter = $counter + 1;
	        		
	        		if ($item_colors[$i] === $item_img_urls[$k]['color_type']) {
	        			// echo $counter;
	        			$test[$i][$counter] = $item_img_urls[$k]['url'];
	        		}
	        		else{
	        			$counter = -1;
	        		}
	    		}
	    	}
	    
	    	$items['color'] = $item_colors;
	    	$items['colorDescription'] = $color_labels;
	    	$items['img'] = $test;

	   		echo json_encode($items);
   		}

    }
	if (isset($_POST['type']) && isset($_POST['user_vote']) && isset($_POST['item_id']) ) {
		if ($_POST['type'] === 'ratingVote') {
			$item_id = (int)$_POST['item_id'];
			$itemQuery = $link->query(" SELECT `rating`, `valuation`, `totalVotes` FROM `items` WHERE `id` = '$item_id' ");
			$itemArr = mysqli_fetch_assoc($itemQuery);
			$valuation = (int)$itemArr['valuation'];
			$user_vote = (int)$_POST['user_vote'];
			$totalVotes = (int)$itemArr['totalVotes'];
			$resultRating = round(( $valuation + $user_vote ) / ( $totalVotes + 1), 2);
			

			$valuationToUpdate = $valuation+$user_vote;
			$totalVotesToUpdate = (int)$itemArr['totalVotes'] + 1;
			$itemQuery = $link->query(" 
				UPDATE `items` SET `rating` = '$resultRating', `valuation` = '$valuationToUpdate', `totalVotes` = '$totalVotesToUpdate' WHERE `id` = '$item_id' ");
			echo json_encode($resultRating, 1111);
		}
	}
	if (isset($_POST['type']) && isset($_POST['order'])) {
		if ($_POST['type'] === 'addToCard') {
			
			echo json_encode($_POST);
		}
	}
?>