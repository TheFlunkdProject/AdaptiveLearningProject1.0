<?php
function getURLImageExtension($image_url)
{
    $ch = curl_init();
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt ($ch, CURLOPT_URL, $image_url);
	curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 20);
	curl_setopt ($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
	curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($ch, CURLOPT_HEADER, true); 
	curl_setopt($ch, CURLOPT_NOBODY, true);

	curl_exec ($ch);
	$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

    curl_close($ch);
	
	return getExtensionFromImageType($contentType);
	
	
	
}

function getExtensionFromImageType($contentType) {
	$ext;
	switch($contentType) {
		case "image/gif":
			$ext = ".gif";
			break;
		case "image/jpeg":
		case "image/pjpeg":
			$ext = ".jpg";
			break;
		case "image/x-png":
		case "image/png":
			$ext = ".png";
			break;
	}
	return $ext;
}

function remote_file_size($url){
	# Get all header information
	$data = get_headers($url, true);
	# Look up validity
	if (isset($data['Content-Length']))
		# Return file size
		return (int) $data['Content-Length'];
}

function download_image1($image_url, $image_path){
	
	$ch = curl_init($image_url);
	$fp = fopen($image_path, 'wb');
	curl_setopt($ch, CURLOPT_FILE, $fp);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_exec($ch);
	curl_close($ch);
	fclose($fp);
	
}

function grabLiveImage($imgUrl,$pathToSave,$filename='')
{
    $data = file_get_contents($imgUrl);
    if($filename == '')
        $filename = getFilename($imgUrl);
    $fp  = fopen($pathToSave.$filename, 'w+');  
    fputs($fp, $data);
    fclose($fp);    
    return $filename;
}
function getFilename($url)
{
    $basename = basename($url);
    $temp = explode('?',$basename);
    return $temp[0];
}

function getImageNameFromPath($path) {
	$lastSlashPos = strrpos($path,"/");
	$lastDotPos = strrpos($path,".");
	$nameLength = $lastDotPos - $lastSlashPos - 1;
	return substr($path, $lastSlashPos+1, $nameLength);
}

function getImangeExtensionFromPath($path) {
	$lastDotPos = strrpos($path,".");
	return substr($path,$lastDotPos,5);
}

function saveImageFromURL($url,$data) {
	if(strpos($url, "craigsmaths.com")) {
		$data['StoredPath'] = 'url';
	} else {
	
		$data['imageType'] = getURLImageExtension($url);
		$imageExtension = getURLImageExtension($url);
		if ($imageExtension) {
		
			$imageName = getImageNameFromPath($url);
			$data['fileSize'] = remote_file_size($url);
			if ($data['fileSize'] < 2000000) {
				download_image1($url,$_SERVER['DOCUMENT_ROOT']."/upload/".$imageName.$imageExtension);
				$data['StoredPath'] = '/upload/' . $imageName.$imageExtension;
			} else {
				$data['errorMessage'] .= 'File size is too large';
			}
		} else {
			$data['errorMessage'] .= 'File is not an image';
		}
	}
	return $data;
}

?>